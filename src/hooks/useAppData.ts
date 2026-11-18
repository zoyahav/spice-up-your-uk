/**
 * Reactive Application State Facade over Dexie IndexedDB, Network Connectivity & Sync.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { createDefaultAppSettings, db } from '../db/schema';
import {
  applyPairingPayload,
  cacheLocalStandardPackRecords,
  ensureAppSettings,
  runFullSync,
  updateAppSettings,
} from '../db/repository';
import { BUILT_IN_FLASHCARDS } from '../data/flashcards';
import { BUILT_IN_QUESTIONS } from '../data/questions';
import { CHAPTERS } from '../data/syllabus';
import {
  fetchAndParseRemotePack,
  hydrateCustomContent,
  STANDARD_18_EXAMS_URL,
} from '../services/contentImporter';
import { computeSubjectMastery, makeProfileEntityKey } from '../services/srs';
import {
  computeCoupleStreak,
  computeIndividualStreak,
  computeTotalXp,
  computeUnlockedBadgeIds,
} from '../services/streaks';
import { extractPairingPayloadFromHash } from '../services/sync';
import type { ProfileId, SubjectMasterySummary } from '../types/domain';

export type SyncBadgeState =
  | 'unpaired'
  | 'offline'
  | 'pending'
  | 'syncing'
  | 'synced'
  | 'error';

export function useAppData() {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [pairingNotice, setPairingNotice] = useState<string | null>(null);
  const [hydratingStandardPack, setHydratingStandardPack] = useState(false);
  const syncInFlightRef = useRef(false);
  const stdHydrationStartedRef = useRef(false);

  const settings = useLiveQuery(() => db.appConfig.get('app'), [], undefined);
  const srsList = useLiveQuery(() => db.srsProgress.toArray(), [], []);
  const questionStatsList = useLiveQuery(() => db.questionStats.toArray(), [], []);
  const testSessions = useLiveQuery(
    () => db.testSessions.orderBy('completedAt').reverse().toArray(),
    [],
    [],
  );
  const dailyActivity = useLiveQuery(() => db.dailyActivity.toArray(), [], []);
  const gameScores = useLiveQuery(() => db.gameScores.toArray(), [], []);
  const challenges = useLiveQuery(
    () => db.challenges.orderBy('createdAt').reverse().toArray(),
    [],
    [],
  );
  const customRecords = useLiveQuery(() => db.customContent.toArray(), [], []);
  const outboxCount = useLiveQuery(() => db.syncOutbox.count(), [], 0);

  const hydrateStandardPack = useCallback(async (force: boolean = false) => {
    if (stdHydrationStartedRef.current) return;
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;

    if (!force) {
      const numberedCount = await db.customContent
        .where('itemId')
        .startsWith('std18-q-ex01-01-')
        .count();
      if (numberedCount > 0) {
        return;
      }
    }

    stdHydrationStartedRef.current = true;
    setHydratingStandardPack(true);
    try {
      const parsed = await fetchAndParseRemotePack(
        STANDARD_18_EXAMS_URL,
        'ch3',
        fetch,
        'std18',
      );
      if (parsed.records.length > 0) {
        await cacheLocalStandardPackRecords(parsed.records, db);
        await updateAppSettings({ standardPackHydrated: true }, db);
      }
    } catch {
      // Will retry automatically next time online or on manual retry
    } finally {
      stdHydrationStartedRef.current = false;
      setHydratingStandardPack(false);
    }
  }, []);

  const triggerSync = useCallback(async () => {
    if (syncInFlightRef.current) return;
    const cfg = await ensureAppSettings(db);
    if (!cfg.scriptUrl || !cfg.passcode) return;
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;

    syncInFlightRef.current = true;
    setIsSyncing(true);
    setSyncError(null);
    try {
      await runFullSync(db);
    } catch (err) {
      setSyncError((err as Error).message);
    } finally {
      syncInFlightRef.current = false;
      setIsSyncing(false);
    }
  }, []);

  const consumePairingHashIfPresent = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !window.location.hash.includes('pair=')) {
      return false;
    }
    const payload = extractPairingPayloadFromHash(window.location.hash);
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    );
    if (!payload) return false;
    await applyPairingPayload(payload, db);
    setPairingNotice('Paired with your shared Google Sheet! Syncing now...');
    void triggerSync();
    return true;
  }, [triggerSync]);

  // Initialize default settings & auto-import `#pair=...` link if scanned via phone camera!
  useEffect(() => {
    void (async () => {
      await ensureAppSettings(db);
      await consumePairingHashIfPresent();
      await hydrateStandardPack();
    })();
  }, [consumePairingHashIfPresent, hydrateStandardPack]);

  // Online / Offline / Hashchange listeners (handles installed PWAs resumed via QR intent!)
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      void hydrateStandardPack();
      void triggerSync();
    };
    const handleOffline = () => setIsOnline(false);
    const handleHashChange = () => {
      void consumePairingHashIfPresent();
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void consumePairingHashIfPresent();
        if (navigator.onLine) {
          void hydrateStandardPack();
          void triggerSync();
        }
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [consumePairingHashIfPresent, hydrateStandardPack, triggerSync]);

  // Auto-drain outbox shortly after mutations when online & paired
  useEffect(() => {
    if (!isOnline || outboxCount === 0) return;
    if (!settings?.scriptUrl || !settings?.passcode) return;
    const timer = window.setTimeout(() => {
      void triggerSync();
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [isOnline, outboxCount, settings?.scriptUrl, settings?.passcode, triggerSync]);

  const effectiveSettings = settings ?? createDefaultAppSettings();
  const activeProfileId: ProfileId = effectiveSettings.activeProfileId;
  const partnerProfileId: ProfileId =
    activeProfileId === 'partner_a' ? 'partner_b' : 'partner_a';

  const { allFlashcards, allQuestions } = useMemo(() => {
    const custom = hydrateCustomContent(customRecords);
    return {
      allFlashcards: [...BUILT_IN_FLASHCARDS, ...custom.flashcards],
      allQuestions: [...BUILT_IN_QUESTIONS, ...custom.questions],
    };
  }, [customRecords]);

  const srsMap = useMemo(() => new Map(srsList.map((s) => [s.key, s])), [srsList]);
  const questionStatsMap = useMemo(
    () => new Map(questionStatsList.map((q) => [q.key, q])),
    [questionStatsList],
  );

  const computeMasteriesForProfile = useCallback(
    (pid: ProfileId): {
      chapters: SubjectMasterySummary[];
      subtopics: SubjectMasterySummary[];
      overallPercent: number;
    } => {
      const chapters = CHAPTERS.map((ch) =>
        computeSubjectMastery({
          id: ch.id,
          title: ch.shortTitle,
          cards: allFlashcards.filter((c) => c.chapterId === ch.id),
          questions: allQuestions.filter((q) => q.chapterId === ch.id),
          srsMap,
          questionStatsMap,
          profileId: pid,
        }),
      );

      const subtopics = CHAPTERS.flatMap((ch) =>
        ch.subtopics.map((sub) =>
          computeSubjectMastery({
            id: sub.id,
            title: sub.title,
            cards: allFlashcards.filter((c) => c.subtopicId === sub.id),
            questions: allQuestions.filter((q) => q.subtopicId === sub.id),
            srsMap,
            questionStatsMap,
            profileId: pid,
          }),
        ),
      );

      const overallPercent =
        chapters.length > 0
          ? Math.round(
              chapters.reduce((acc, c) => acc + c.masteryPercent, 0) / chapters.length,
            )
          : 0;

      return { chapters, subtopics, overallPercent };
    },
    [allFlashcards, allQuestions, srsMap, questionStatsMap],
  );

  const myMastery = useMemo(
    () => computeMasteriesForProfile(activeProfileId),
    [computeMasteriesForProfile, activeProfileId],
  );
  const partnerMastery = useMemo(
    () => computeMasteriesForProfile(partnerProfileId),
    [computeMasteriesForProfile, partnerProfileId],
  );

  const myStreak = useMemo(
    () =>
      computeIndividualStreak(
        dailyActivity,
        activeProfileId,
        effectiveSettings.dailyGoalXp,
      ),
    [dailyActivity, activeProfileId, effectiveSettings.dailyGoalXp],
  );
  const partnerStreak = useMemo(
    () =>
      computeIndividualStreak(
        dailyActivity,
        partnerProfileId,
        effectiveSettings.dailyGoalXp,
      ),
    [dailyActivity, partnerProfileId, effectiveSettings.dailyGoalXp],
  );
  const coupleStreak = useMemo(() => computeCoupleStreak(dailyActivity), [dailyActivity]);

  const myTotalXp = useMemo(
    () => computeTotalXp(dailyActivity, activeProfileId),
    [dailyActivity, activeProfileId],
  );
  const partnerTotalXp = useMemo(
    () => computeTotalXp(dailyActivity, partnerProfileId),
    [dailyActivity, partnerProfileId],
  );

  const myUnlockedBadges = useMemo(
    () =>
      computeUnlockedBadgeIds({
        profileId: activeProfileId,
        individualStreak: myStreak,
        coupleStreak,
        testSessions,
        srsStates: srsList,
        gameScores,
        totalXp: myTotalXp,
      }),
    [activeProfileId, myStreak, coupleStreak, testSessions, srsList, gameScores, myTotalXp],
  );

  const dueFlashcardCount = useMemo(() => {
    const nowMs = Date.now();
    let due = 0;
    for (const q of allQuestions) {
      const st = srsMap.get(makeProfileEntityKey(activeProfileId, q.id));
      if (st && (st.boosted || Date.parse(st.dueAt) <= nowMs)) {
        due += 1;
      }
    }
    return due;
  }, [allQuestions, srsMap, activeProfileId]);

  const missedQuestionIds = useMemo(() => {
    return allQuestions
      .filter((q) => {
        const st = questionStatsMap.get(makeProfileEntityKey(activeProfileId, q.id));
        return Boolean(st?.lastWrong);
      })
      .map((q) => q.id);
  }, [allQuestions, questionStatsMap, activeProfileId]);

  const syncBadge: SyncBadgeState = useMemo(() => {
    if (!effectiveSettings.scriptUrl || !effectiveSettings.passcode) return 'unpaired';
    if (!isOnline) return 'offline';
    if (isSyncing) return 'syncing';
    if (syncError) return 'error';
    if (outboxCount > 0) return 'pending';
    return 'synced';
  }, [
    effectiveSettings.scriptUrl,
    effectiveSettings.passcode,
    isOnline,
    isSyncing,
    syncError,
    outboxCount,
  ]);

  return {
    isLoaded: settings !== undefined,
    settings: effectiveSettings,
    activeProfileId,
    partnerProfileId,
    activeProfile: effectiveSettings.profiles[activeProfileId],
    partnerProfile: effectiveSettings.profiles[partnerProfileId],
    allFlashcards,
    allQuestions,
    srsMap,
    questionStatsMap,
    testSessions,
    dailyActivity,
    gameScores,
    challenges,
    customRecords,
    outboxCount,
    myMastery,
    partnerMastery,
    myStreak,
    partnerStreak,
    coupleStreak,
    myTotalXp,
    partnerTotalXp,
    myUnlockedBadges,
    dueFlashcardCount,
    missedQuestionIds,
    isOnline,
    syncBadge,
    syncError,
    clearSyncError: () => setSyncError(null),
    hydratingStandardPack,
    retryStandardPack: () => hydrateStandardPack(true),
    pairingNotice,
    clearPairingNotice: () => setPairingNotice(null),
    triggerSync,
  };
}
