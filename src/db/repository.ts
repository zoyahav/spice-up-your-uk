/**
 * Clean Repository Layer over Dexie IndexedDB.
 * Encapsulates all local persistence, atomic outbox enqueueing, and incoming sync merging.
 */

import { createDefaultAppSettings, db, type SpiceUpUkDB } from './schema';
import type {
  AnsweredQuestionRecord,
  AppSettings,
  ChapterId,
  CoupleChallengeRecord,
  CustomContentRecord,
  DailyActivityRecord,
  GameScoreRecord,
  MiniGameId,
  PracticeQuestion,
  ProfileId,
  QuestionStatRecord,
  SrsCardState,
  SrsRating,
  SyncTableName,
  TestSessionMode,
  TestSessionRecord,
  UserProfile,
} from '../types/domain';
import { createInitialSrsState, makeProfileEntityKey, scheduleNextSrsReview } from '../services/srs';
import { formatLocalDateYYYYMMDD } from '../services/streaks';
import {
  compactOutboxMutations,
  exchangeWithAppsScript,
  type FetchLike,
  type PairingPayload,
  shouldAcceptIncomingRecord,
  type SyncRemoteRecord,
} from '../services/sync';

export async function ensureAppSettings(database: SpiceUpUkDB = db): Promise<AppSettings> {
  const existing = await database.appConfig.get('app');
  if (existing) return existing;
  const defaults = createDefaultAppSettings();
  await database.appConfig.put(defaults);
  return defaults;
}

export async function updateAppSettings(
  patch: Partial<Omit<AppSettings, 'id'>>,
  database: SpiceUpUkDB = db,
): Promise<AppSettings> {
  const current = await ensureAppSettings(database);
  const updated: AppSettings = { ...current, ...patch, id: 'app' };
  await database.appConfig.put(updated);
  return updated;
}

export async function applyPairingPayload(
  payload: PairingPayload,
  database: SpiceUpUkDB = db,
): Promise<AppSettings> {
  const current = await ensureAppSettings(database);
  const nowIso = new Date().toISOString();
  const nextProfiles = { ...current.profiles };
  if (payload.partnerAName || payload.partnerAAvatar) {
    nextProfiles.partner_a = {
      ...nextProfiles.partner_a,
      ...(payload.partnerAName ? { displayName: payload.partnerAName } : {}),
      ...(payload.partnerAAvatar ? { avatarEmoji: payload.partnerAAvatar } : {}),
      updatedAt: nowIso,
    };
  }
  if (payload.partnerBName || payload.partnerBAvatar) {
    nextProfiles.partner_b = {
      ...nextProfiles.partner_b,
      ...(payload.partnerBName ? { displayName: payload.partnerBName } : {}),
      ...(payload.partnerBAvatar ? { avatarEmoji: payload.partnerBAvatar } : {}),
      updatedAt: nowIso,
    };
  }
  return updateAppSettings(
    {
      onboarded: true,
      scriptUrl: payload.scriptUrl,
      passcode: payload.passcode,
      activeProfileId: payload.suggestedProfile ?? 'partner_b',
      examDate: payload.examDate ?? current.examDate,
      profiles: nextProfiles,
    },
    database,
  );
}

async function enqueueOutbox(
  database: SpiceUpUkDB,
  table: SyncTableName,
  recordKey: string,
  payload: object,
  updatedAt: string,
): Promise<void> {
  await database.syncOutbox.add({
    table,
    recordKey,
    payload: payload as Record<string, unknown>,
    updatedAt,
    createdAt: new Date().toISOString(),
  });
}

export async function updateUserProfile(
  profileId: ProfileId,
  patch: Partial<Omit<UserProfile, 'id' | 'updatedAt'>>,
  database: SpiceUpUkDB = db,
): Promise<UserProfile> {
  const nowIso = new Date().toISOString();
  const settings = await ensureAppSettings(database);
  const existing = settings.profiles[profileId];
  const nextProfile: UserProfile = {
    ...existing,
    ...patch,
    id: profileId,
    updatedAt: nowIso,
  };

  await database.transaction('rw', database.appConfig, database.syncOutbox, async () => {
    await database.appConfig.put({
      ...settings,
      profiles: {
        ...settings.profiles,
        [profileId]: nextProfile,
      },
    });
    await enqueueOutbox(database, 'profiles', profileId, nextProfile, nowIso);
  });

  return nextProfile;
}

export async function addDailyXpAndCounts(
  database: SpiceUpUkDB,
  profileId: ProfileId,
  deltas: {
    xp?: number;
    cardsReviewed?: number;
    questionsAnswered?: number;
    gamesPlayed?: number;
  },
  now: Date = new Date(),
): Promise<DailyActivityRecord> {
  const dateStr = formatLocalDateYYYYMMDD(now);
  const key = makeProfileEntityKey(profileId, dateStr);
  const nowIso = now.toISOString();
  const prev = await database.dailyActivity.get(key);

  const next: DailyActivityRecord = {
    key,
    profileId,
    date: dateStr,
    xp: (prev?.xp ?? 0) + (deltas.xp ?? 0),
    cardsReviewed: (prev?.cardsReviewed ?? 0) + (deltas.cardsReviewed ?? 0),
    questionsAnswered: (prev?.questionsAnswered ?? 0) + (deltas.questionsAnswered ?? 0),
    gamesPlayed: (prev?.gamesPlayed ?? 0) + (deltas.gamesPlayed ?? 0),
    freezeUsed: prev?.freezeUsed ?? false,
    updatedAt: nowIso,
  };

  await database.dailyActivity.put(next);
  await enqueueOutbox(database, 'dailyActivity', key, next, nowIso);
  return next;
}

export async function recordFlashcardReview(
  profileId: ProfileId,
  cardId: string,
  rating: SrsRating,
  database: SpiceUpUkDB = db,
  now: Date = new Date(),
): Promise<SrsCardState> {
  const key = makeProfileEntityKey(profileId, cardId);
  const xpEarned = rating === 'again' ? 2 : rating === 'hard' ? 4 : 6;

  return database.transaction(
    'rw',
    database.srsProgress,
    database.dailyActivity,
    database.syncOutbox,
    async () => {
      const prev = await database.srsProgress.get(key);
      const next = scheduleNextSrsReview(prev, profileId, cardId, rating, now);
      await database.srsProgress.put(next);
      await enqueueOutbox(database, 'srsProgress', key, next, next.updatedAt);
      await addDailyXpAndCounts(database, profileId, { xp: xpEarned, cardsReviewed: 1 }, now);
      return next;
    },
  );
}

/**
 * Records a 4-way choice SM-2 review, updating both SM-2 spaced repetition and question accuracy stats.
 */
export async function recordSmartQuestionReview(
  profileId: ProfileId,
  question: PracticeQuestion,
  rating: SrsRating,
  isCorrect: boolean,
  database: SpiceUpUkDB = db,
  now: Date = new Date(),
): Promise<SrsCardState> {
  const nowIso = now.toISOString();
  const srsKey = makeProfileEntityKey(profileId, question.id);
  const statKey = makeProfileEntityKey(profileId, question.id);
  const xpEarned = isCorrect ? (rating === 'hard' ? 4 : 6) : 2;

  return database.transaction(
    'rw',
    [database.srsProgress, database.questionStats, database.dailyActivity, database.syncOutbox],
    async () => {
      const prevSrs = await database.srsProgress.get(srsKey);
      const nextSrs = scheduleNextSrsReview(prevSrs, profileId, question.id, rating, now);
      await database.srsProgress.put(nextSrs);
      await enqueueOutbox(database, 'srsProgress', srsKey, nextSrs, nextSrs.updatedAt);

      const prevStat = await database.questionStats.get(statKey);
      const nextStat: QuestionStatRecord = {
        key: statKey,
        profileId,
        questionId: question.id,
        chapterId: question.chapterId,
        subtopicId: question.subtopicId,
        attempts: (prevStat?.attempts ?? 0) + 1,
        correct: (prevStat?.correct ?? 0) + (isCorrect ? 1 : 0),
        lastWrong: !isCorrect,
        lastAttemptAt: nowIso,
        updatedAt: nowIso,
      };
      await database.questionStats.put(nextStat);
      await enqueueOutbox(database, 'questionStats', statKey, nextStat, nowIso);

      await addDailyXpAndCounts(
        database,
        profileId,
        { xp: xpEarned, cardsReviewed: 1, questionsAnswered: 1 },
        now,
      );
      return nextSrs;
    },
  );
}

export async function toggleStudyGuideSectionRead(
  profileId: ProfileId,
  sectionId: string,
  forceRead?: boolean,
  database: SpiceUpUkDB = db,
): Promise<void> {
  const current = await ensureAppSettings(database);
  const existing = new Set(current.readGuideIds?.[profileId] ?? []);
  const shouldBeRead = forceRead !== undefined ? forceRead : !existing.has(sectionId);
  if (shouldBeRead) {
    existing.add(sectionId);
  } else {
    existing.delete(sectionId);
  }
  await updateAppSettings(
    {
      readGuideIds: {
        ...(current.readGuideIds ?? {}),
        [profileId]: Array.from(existing),
      },
    },
    database,
  );
}

/**
 * Boosts a card into the immediate review queue (e.g. from "Boost in Flashcards" on a missed exam question).
 */
export async function boostConceptCardInSrs(
  profileId: ProfileId,
  cardId: string,
  database: SpiceUpUkDB = db,
): Promise<void> {
  const nowIso = new Date().toISOString();
  const key = makeProfileEntityKey(profileId, cardId);

  await database.transaction('rw', database.srsProgress, database.syncOutbox, async () => {
    const prev = await database.srsProgress.get(key);
    const base = prev ?? createInitialSrsState(profileId, cardId, nowIso);
    const boostedState: SrsCardState = {
      ...base,
      boosted: true,
      dueAt: nowIso,
      updatedAt: nowIso,
    };
    await database.srsProgress.put(boostedState);
    await enqueueOutbox(database, 'srsProgress', key, boostedState, nowIso);
  });
}

export async function recordCompletedTestSession(params: {
  profileId: ProfileId;
  mode: TestSessionMode;
  examNumber?: number;
  chapterId?: ChapterId;
  challengeId?: string;
  questions: readonly PracticeQuestion[];
  answers: readonly AnsweredQuestionRecord[];
  durationSec: number;
  database?: SpiceUpUkDB;
}): Promise<TestSessionRecord> {
  const database = params.database ?? db;
  const now = new Date();
  const nowIso = now.toISOString();
  const score = params.answers.filter((a) => a.isCorrect).length;
  const total = params.questions.length;
  const passRatio = total > 0 ? score / total : 0;
  const passed = passRatio >= 0.75;

  const session: TestSessionRecord = {
    sessionId: `sess-${now.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
    profileId: params.profileId,
    mode: params.mode,
    examNumber: params.examNumber,
    chapterId: params.chapterId,
    challengeId: params.challengeId,
    score,
    total,
    passed,
    durationSec: params.durationSec,
    answers: params.answers,
    completedAt: nowIso,
    updatedAt: nowIso,
  };

  const qById = new Map(params.questions.map((q) => [q.id, q]));
  const xpEarned = score * 3 + (passed ? 20 : 5);

  await database.transaction(
    'rw',
    [
      database.testSessions,
      database.questionStats,
      database.dailyActivity,
      database.challenges,
      database.syncOutbox,
    ],
    async () => {
      await database.testSessions.put(session);
      await enqueueOutbox(database, 'testSessions', session.sessionId, session, nowIso);

      for (const ans of params.answers) {
        const q = qById.get(ans.questionId);
        if (!q) continue;
        const statKey = makeProfileEntityKey(params.profileId, q.id);
        const prev = await database.questionStats.get(statKey);
        const nextStat: QuestionStatRecord = {
          key: statKey,
          profileId: params.profileId,
          questionId: q.id,
          chapterId: q.chapterId,
          subtopicId: q.subtopicId,
          attempts: (prev?.attempts ?? 0) + 1,
          correct: (prev?.correct ?? 0) + (ans.isCorrect ? 1 : 0),
          lastWrong: !ans.isCorrect,
          lastAttemptAt: nowIso,
          updatedAt: nowIso,
        };
        await database.questionStats.put(nextStat);
        await enqueueOutbox(database, 'questionStats', statKey, nextStat, nowIso);
      }

      if (params.challengeId) {
        const existingChallenge = await database.challenges.get(params.challengeId);
        if (existingChallenge) {
          const updatedChallenge: CoupleChallengeRecord =
            params.profileId === 'partner_a'
              ? {
                  ...existingChallenge,
                  partnerAScore: score,
                  partnerATimeSec: params.durationSec,
                  updatedAt: nowIso,
                }
              : {
                  ...existingChallenge,
                  partnerBScore: score,
                  partnerBTimeSec: params.durationSec,
                  updatedAt: nowIso,
                };
          await database.challenges.put(updatedChallenge);
          await enqueueOutbox(
            database,
            'challenges',
            updatedChallenge.challengeId,
            updatedChallenge,
            nowIso,
          );
        }
      }

      await addDailyXpAndCounts(
        database,
        params.profileId,
        { xp: xpEarned, questionsAnswered: total },
        now,
      );
    },
  );

  return session;
}

export async function recordMiniGameScore(params: {
  profileId: ProfileId;
  gameId: MiniGameId;
  score: number;
  combo: number;
  xpEarned: number;
  database?: SpiceUpUkDB;
}): Promise<GameScoreRecord> {
  const database = params.database ?? db;
  const now = new Date();
  const nowIso = now.toISOString();
  const key = makeProfileEntityKey(params.profileId, params.gameId);

  return database.transaction(
    'rw',
    database.gameScores,
    database.dailyActivity,
    database.syncOutbox,
    async () => {
      const prev = await database.gameScores.get(key);
      const next: GameScoreRecord = {
        key,
        profileId: params.profileId,
        gameId: params.gameId,
        bestScore: Math.max(prev?.bestScore ?? 0, params.score),
        bestCombo: Math.max(prev?.bestCombo ?? 0, params.combo),
        plays: (prev?.plays ?? 0) + 1,
        updatedAt: nowIso,
      };
      await database.gameScores.put(next);
      await enqueueOutbox(database, 'gameScores', key, next, nowIso);
      await addDailyXpAndCounts(
        database,
        params.profileId,
        { xp: params.xpEarned, gamesPlayed: 1 },
        now,
      );
      return next;
    },
  );
}

export async function createCoupleChallenge(params: {
  createdBy: ProfileId;
  title: string;
  questionIds: readonly string[];
  database?: SpiceUpUkDB;
}): Promise<CoupleChallengeRecord> {
  const database = params.database ?? db;
  const nowIso = new Date().toISOString();
  const challenge: CoupleChallengeRecord = {
    challengeId: `chal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: params.title,
    createdBy: params.createdBy,
    questionIds: params.questionIds,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  await database.transaction('rw', database.challenges, database.syncOutbox, async () => {
    await database.challenges.put(challenge);
    await enqueueOutbox(database, 'challenges', challenge.challengeId, challenge, nowIso);
  });

  return challenge;
}

export async function saveImportedCustomRecords(
  records: readonly CustomContentRecord[],
  database: SpiceUpUkDB = db,
): Promise<void> {
  if (records.length === 0) return;
  await database.transaction('rw', database.customContent, database.syncOutbox, async () => {
    for (const r of records) {
      await database.customContent.put(r);
      await enqueueOutbox(database, 'customContent', r.itemId, r, r.updatedAt);
    }
  });
}

/**
 * Bulk-caches standard exam pack records locally in IndexedDB on install without bloating syncOutbox.
 */
export async function cacheLocalStandardPackRecords(
  records: readonly CustomContentRecord[],
  database: SpiceUpUkDB = db,
): Promise<void> {
  if (records.length === 0) return;
  await database.transaction('rw', database.customContent, async () => {
    const existingStdKeys = await database.customContent
      .where('itemId')
      .startsWith('std18-')
      .primaryKeys();
    if (existingStdKeys.length > 0) {
      await database.customContent.bulkDelete(existingStdKeys);
    }
    await database.customContent.bulkPut(records as CustomContentRecord[]);
  });
}

/**
 * Executes a full bidirectional sync cycle with the paired Google Apps Script Web App.
 */
export async function runFullSync(
  database: SpiceUpUkDB = db,
  fetchImpl: FetchLike = fetch,
): Promise<{ pushed: number; pulled: number; syncedAt: string }> {
  const settings = await ensureAppSettings(database);
  if (!settings.scriptUrl || !settings.passcode) {
    throw new Error('Google Sheet sync is not configured yet.');
  }

  const rawOutbox = await database.syncOutbox.toArray();
  const compacted = compactOutboxMutations(rawOutbox);
  const outboxSeqs = rawOutbox.map((i) => i.seq).filter((s): s is number => typeof s === 'number');

  const activeProfile = settings.profiles[settings.activeProfileId];

  const response = await exchangeWithAppsScript(
    settings.scriptUrl,
    {
      passcode: settings.passcode,
      profileId: settings.activeProfileId,
      profile: activeProfile,
      since: settings.lastSyncAt,
      mutations: compacted.map((m) => ({
        table: m.table,
        recordKey: m.recordKey,
        updatedAt: m.updatedAt,
        payload: m.payload,
      })),
    },
    fetchImpl,
  );

  let pulledCount = 0;

  await database.transaction(
    'rw',
    [
      database.appConfig,
      database.srsProgress,
      database.questionStats,
      database.testSessions,
      database.dailyActivity,
      database.gameScores,
      database.challenges,
      database.customContent,
      database.syncOutbox,
    ],
    async () => {
      // Clear acknowledged outbox entries
      if (outboxSeqs.length > 0) {
        await database.syncOutbox.bulkDelete(outboxSeqs);
      }

      const freshSettings = await ensureAppSettings(database);
      if (!freshSettings.scriptUrl || !freshSettings.passcode) {
        return;
      }
      const updatedProfiles = { ...freshSettings.profiles };

      for (const rec of response.updates) {
        const applied = await applyIncomingRemoteRecord(database, rec, updatedProfiles);
        if (applied) pulledCount += 1;
      }

      await database.appConfig.put({
        ...freshSettings,
        profiles: updatedProfiles,
        lastSyncAt: response.serverTime,
      });
    },
  );

  return {
    pushed: compacted.length,
    pulled: pulledCount,
    syncedAt: response.serverTime,
  };
}

async function applyIncomingRemoteRecord(
  database: SpiceUpUkDB,
  rec: SyncRemoteRecord,
  profilesAcc: Record<ProfileId, UserProfile>,
): Promise<boolean> {
  const p = rec.payload;
  switch (rec.table) {
    case 'profiles': {
      const id = rec.recordKey as ProfileId;
      if (id !== 'partner_a' && id !== 'partner_b') return false;
      const existing = profilesAcc[id];
      if (shouldAcceptIncomingRecord(existing?.updatedAt, rec.updatedAt)) {
        profilesAcc[id] = {
          ...(existing ?? {}),
          ...(p as unknown as UserProfile),
          id,
          updatedAt: rec.updatedAt,
        };
        return true;
      }
      return false;
    }
    case 'srsProgress': {
      const local = await database.srsProgress.get(rec.recordKey);
      if (shouldAcceptIncomingRecord(local?.updatedAt, rec.updatedAt)) {
        await database.srsProgress.put({ ...(p as unknown as SrsCardState), key: rec.recordKey });
        return true;
      }
      return false;
    }
    case 'questionStats': {
      const local = await database.questionStats.get(rec.recordKey);
      if (shouldAcceptIncomingRecord(local?.updatedAt, rec.updatedAt)) {
        await database.questionStats.put({
          ...(p as unknown as QuestionStatRecord),
          key: rec.recordKey,
        });
        return true;
      }
      return false;
    }
    case 'testSessions': {
      const local = await database.testSessions.get(rec.recordKey);
      if (shouldAcceptIncomingRecord(local?.updatedAt, rec.updatedAt)) {
        await database.testSessions.put({
          ...(p as unknown as TestSessionRecord),
          sessionId: rec.recordKey,
        });
        return true;
      }
      return false;
    }
    case 'dailyActivity': {
      const local = await database.dailyActivity.get(rec.recordKey);
      if (shouldAcceptIncomingRecord(local?.updatedAt, rec.updatedAt)) {
        await database.dailyActivity.put({
          ...(p as unknown as DailyActivityRecord),
          key: rec.recordKey,
        });
        return true;
      }
      return false;
    }
    case 'gameScores': {
      const local = await database.gameScores.get(rec.recordKey);
      if (shouldAcceptIncomingRecord(local?.updatedAt, rec.updatedAt)) {
        await database.gameScores.put({
          ...(p as unknown as GameScoreRecord),
          key: rec.recordKey,
        });
        return true;
      }
      return false;
    }
    case 'challenges': {
      const local = await database.challenges.get(rec.recordKey);
      if (shouldAcceptIncomingRecord(local?.updatedAt, rec.updatedAt)) {
        await database.challenges.put({
          ...(p as unknown as CoupleChallengeRecord),
          challengeId: rec.recordKey,
        });
        return true;
      }
      return false;
    }
    case 'customContent': {
      const local = await database.customContent.get(rec.recordKey);
      if (shouldAcceptIncomingRecord(local?.updatedAt, rec.updatedAt)) {
        await database.customContent.put({
          ...(p as unknown as CustomContentRecord),
          itemId: rec.recordKey,
        });
        return true;
      }
      return false;
    }
    default:
      return false;
  }
}

export async function resetLocalDeviceData(database: SpiceUpUkDB = db): Promise<void> {
  await database.transaction(
    'rw',
    [
      database.appConfig,
      database.srsProgress,
      database.questionStats,
      database.testSessions,
      database.dailyActivity,
      database.gameScores,
      database.challenges,
      database.customContent,
      database.syncOutbox,
    ],
    async () => {
      const prevSettings = await database.appConfig.get('app');
      await Promise.all([
        database.srsProgress.clear(),
        database.questionStats.clear(),
        database.testSessions.clear(),
        database.dailyActivity.clear(),
        database.gameScores.clear(),
        database.challenges.clear(),
        database.syncOutbox.clear(),
      ]);

      const allCustomKeys = await database.customContent.toCollection().primaryKeys();
      const nonStdKeys = allCustomKeys.filter((k) => !String(k).startsWith('std18-'));
      if (nonStdKeys.length > 0) {
        await database.customContent.bulkDelete(nonStdKeys);
      }

      const remainingStdCount = allCustomKeys.length - nonStdKeys.length;
      const freshDefaults = createDefaultAppSettings();
      await database.appConfig.put({
        ...freshDefaults,
        theme: prevSettings?.theme ?? freshDefaults.theme,
        onboarded: false,
        standardPackHydrated: remainingStdCount > 0,
      });
    },
  );

  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('spiceupuk_install_dismissed');
      sessionStorage.removeItem('spiceupuk_banner_dismissed');
    }
  } catch {
    // Ignore storage errors
  }
}

export async function exportFullLocalBackupJson(database: SpiceUpUkDB = db): Promise<string> {
  const [
    appConfig,
    srsProgress,
    questionStats,
    testSessions,
    dailyActivity,
    gameScores,
    challenges,
    customContent,
  ] = await Promise.all([
    database.appConfig.toArray(),
    database.srsProgress.toArray(),
    database.questionStats.toArray(),
    database.testSessions.toArray(),
    database.dailyActivity.toArray(),
    database.gameScores.toArray(),
    database.challenges.toArray(),
    database.customContent.toArray(),
  ]);

  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      app: 'spice-up-your-uk',
      version: 1,
      data: {
        appConfig: appConfig.map((c) => ({ ...c, scriptUrl: '', passcode: '' })), // Strip secrets from backup export
        srsProgress,
        questionStats,
        testSessions,
        dailyActivity,
        gameScores,
        challenges,
        customContent,
      },
    },
    null,
    2,
  );
}
