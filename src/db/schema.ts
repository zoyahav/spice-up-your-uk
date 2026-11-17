/**
 * Typed IndexedDB schema powered by Dexie.
 * Stores 100% of user progress, partner sync snapshots, custom decks, and the offline outbox queue.
 */

import Dexie, { type Table } from 'dexie';
import type {
  AppSettings,
  CoupleChallengeRecord,
  CustomContentRecord,
  DailyActivityRecord,
  GameScoreRecord,
  QuestionStatRecord,
  SrsCardState,
  SyncOutboxItem,
  TestSessionRecord,
} from '../types/domain';

export class SpiceUpUkDB extends Dexie {
  appConfig!: Table<AppSettings, 'app'>;
  srsProgress!: Table<SrsCardState, string>;
  questionStats!: Table<QuestionStatRecord, string>;
  testSessions!: Table<TestSessionRecord, string>;
  dailyActivity!: Table<DailyActivityRecord, string>;
  gameScores!: Table<GameScoreRecord, string>;
  challenges!: Table<CoupleChallengeRecord, string>;
  customContent!: Table<CustomContentRecord, string>;
  syncOutbox!: Table<SyncOutboxItem, number>;

  constructor(dbName: string = 'SpiceUpYourUkDB') {
    super(dbName);
    this.version(1).stores({
      appConfig: 'id',
      srsProgress: 'key, profileId, cardId, dueAt, updatedAt',
      questionStats: 'key, profileId, questionId, chapterId, subtopicId, updatedAt',
      testSessions: 'sessionId, profileId, mode, completedAt, updatedAt',
      dailyActivity: 'key, profileId, date, updatedAt',
      gameScores: 'key, profileId, gameId, updatedAt',
      challenges: 'challengeId, createdAt, updatedAt',
      customContent: 'itemId, kind, chapterId, active, updatedAt',
      syncOutbox: '++seq, table, recordKey, createdAt',
    });
  }
}

export const db = new SpiceUpUkDB();

export function createDefaultAppSettings(): AppSettings {
  const nowIso = new Date().toISOString();
  return {
    id: 'app',
    onboarded: false,
    activeProfileId: 'partner_a',
    profiles: {
      partner_a: {
        id: 'partner_a',
        displayName: 'Player 1 (Cuppa)',
        spiceAlias: 'Posh Study',
        avatarEmoji: '🐰',
        updatedAt: nowIso,
      },
      partner_b: {
        id: 'partner_b',
        displayName: 'Player 2 (Biscuit)',
        spiceAlias: 'Sporty Study',
        avatarEmoji: '😎',
        updatedAt: nowIso,
      },
    },
    scriptUrl: '',
    passcode: '',
    lastSyncAt: null,
    dailyGoalXp: 50,
    examDate: null,
    theme: 'dark',
    reminders: {
      enabled: false,
      timeHHMM: '08:15',
      daysOfWeek: [1, 2, 3, 4, 5],
      browserNotificationsEnabled: false,
      streakRescueEmailOptIn: false,
    },
  };
}
