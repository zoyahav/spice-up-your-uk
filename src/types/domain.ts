/**
 * Core domain models for Spice Up Your UK.
 * Pure TypeScript definitions with zero framework or storage dependencies.
 */

export type ChapterId = 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'ch5';

export type SubtopicId =
  | 'ch1-principles'
  | 'ch1-citizenship'
  | 'ch2-nations'
  | 'ch2-symbols'
  | 'ch2-territories'
  | 'ch3-early-roman'
  | 'ch3-anglo-norman'
  | 'ch3-middle-ages'
  | 'ch3-tudors-stuarts'
  | 'ch3-empire-industry'
  | 'ch3-world-wars'
  | 'ch3-modern-britain'
  | 'ch4-religion-customs'
  | 'ch4-sports'
  | 'ch4-arts-culture'
  | 'ch4-landmarks'
  | 'ch5-democracy-constitution'
  | 'ch5-parliament-elections'
  | 'ch5-devolution'
  | 'ch5-courts-police-role';

export type VisualAidId =
  | 'union-jack'
  | 'uk-map'
  | 'national-emblems'
  | 'parliament-courts'
  | 'history-timeline';

export type ProfileId = 'partner_a' | 'partner_b';

export interface UserProfile {
  readonly id: ProfileId;
  readonly displayName: string;
  readonly spiceAlias: string;
  readonly avatarEmoji: string;
  readonly updatedAt: string;
}

export interface ChapterMeta {
  readonly id: ChapterId;
  readonly number: 1 | 2 | 3 | 4 | 5;
  readonly title: string;
  readonly shortTitle: string;
  readonly spiceTagline: string;
  readonly examWeightHint: string;
  readonly accentColor: string;
  readonly subtopics: readonly SubtopicMeta[];
}

export interface SubtopicMeta {
  readonly id: SubtopicId;
  readonly chapterId: ChapterId;
  readonly title: string;
  readonly summary: string;
}

export interface StudySection {
  readonly id: string;
  readonly chapterId: ChapterId;
  readonly subtopicId: SubtopicId;
  readonly title: string;
  readonly keyFacts: readonly string[];
  readonly memoryHook: string;
  readonly visualId?: VisualAidId;
}

export interface Flashcard {
  readonly id: string;
  readonly chapterId: ChapterId;
  readonly subtopicId: SubtopicId;
  readonly front: string;
  readonly back: string;
  readonly memoryHook: string;
  readonly visualId?: VisualAidId;
  readonly isCustom?: boolean;
}

export type QuestionType = 'single' | 'multiple' | 'boolean';

export interface PracticeQuestion {
  readonly id: string;
  readonly examNumber?: number; // 1..17 for structured mock exams
  readonly chapterId: ChapterId;
  readonly subtopicId: SubtopicId;
  readonly type: QuestionType;
  readonly prompt: string;
  readonly options: readonly string[];
  readonly correctIndices: readonly number[];
  readonly explanation: string;
  readonly memoryHook: string;
  readonly visualId?: VisualAidId;
  readonly isCustom?: boolean;
}

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface SrsCardState {
  readonly key: string; // `${profileId}:${cardId}`
  readonly profileId: ProfileId;
  readonly cardId: string;
  readonly easeFactor: number;
  readonly intervalDays: number;
  readonly repetitions: number;
  readonly dueAt: string; // ISO timestamp
  readonly lastReviewedAt: string; // ISO timestamp
  readonly lapses: number;
  readonly boosted?: boolean;
  readonly updatedAt: string;
}

export interface QuestionStatRecord {
  readonly key: string; // `${profileId}:${questionId}`
  readonly profileId: ProfileId;
  readonly questionId: string;
  readonly chapterId: ChapterId;
  readonly subtopicId: SubtopicId;
  readonly attempts: number;
  readonly correct: number;
  readonly lastWrong: boolean;
  readonly lastAttemptAt: string;
  readonly updatedAt: string;
}

export type TestSessionMode = 'mock' | 'topic' | 'mistakes' | 'challenge';

export interface AnsweredQuestionRecord {
  readonly questionId: string;
  readonly selectedIndices: readonly number[];
  readonly isCorrect: boolean;
}

export interface TestSessionRecord {
  readonly sessionId: string;
  readonly profileId: ProfileId;
  readonly mode: TestSessionMode;
  readonly examNumber?: number;
  readonly chapterId?: ChapterId;
  readonly challengeId?: string;
  readonly score: number;
  readonly total: number;
  readonly passed: boolean;
  readonly durationSec: number;
  readonly answers: readonly AnsweredQuestionRecord[];
  readonly completedAt: string;
  readonly updatedAt: string;
}

export interface DailyActivityRecord {
  readonly key: string; // `${profileId}:${date}`
  readonly profileId: ProfileId;
  readonly date: string; // YYYY-MM-DD local date
  readonly xp: number;
  readonly cardsReviewed: number;
  readonly questionsAnswered: number;
  readonly gamesPlayed: number;
  readonly freezeUsed: boolean;
  readonly updatedAt: string;
}

export type MiniGameId = 'timeline-sort' | 'tube-blitz' | 'fact-match';

export interface GameScoreRecord {
  readonly key: string; // `${profileId}:${gameId}`
  readonly profileId: ProfileId;
  readonly gameId: MiniGameId;
  readonly bestScore: number;
  readonly bestCombo: number;
  readonly plays: number;
  readonly updatedAt: string;
}

export interface CoupleChallengeRecord {
  readonly challengeId: string;
  readonly title: string;
  readonly createdBy: ProfileId;
  readonly questionIds: readonly string[];
  readonly createdAt: string;
  readonly partnerAScore?: number;
  readonly partnerATimeSec?: number;
  readonly partnerBScore?: number;
  readonly partnerBTimeSec?: number;
  readonly updatedAt: string;
}

export interface CustomContentRecord {
  readonly itemId: string;
  readonly kind: 'flashcard' | 'question';
  readonly chapterId: ChapterId;
  readonly subtopicId: SubtopicId;
  readonly payloadJson: string;
  readonly active: boolean;
  readonly updatedAt: string;
}

export interface ReminderSettings {
  readonly enabled: boolean;
  readonly timeHHMM: string; // e.g. "08:15"
  readonly daysOfWeek: readonly number[]; // 0=Sun..6=Sat
  readonly browserNotificationsEnabled: boolean;
  readonly streakRescueEmailOptIn: boolean;
}

export type ThemePreference = 'dark' | 'light' | 'system';

export interface AppSettings {
  readonly id: 'app';
  readonly onboarded: boolean;
  readonly activeProfileId: ProfileId;
  readonly profiles: Record<ProfileId, UserProfile>;
  readonly scriptUrl: string;
  readonly passcode: string;
  readonly lastSyncAt: string | null;
  readonly dailyGoalXp: number;
  readonly examDate: string | null;
  readonly theme: ThemePreference;
  readonly reminders: ReminderSettings;
}

export type SyncTableName =
  | 'profiles'
  | 'srsProgress'
  | 'questionStats'
  | 'testSessions'
  | 'dailyActivity'
  | 'gameScores'
  | 'challenges'
  | 'customContent';

export interface SyncOutboxItem {
  readonly seq?: number;
  readonly table: SyncTableName;
  readonly recordKey: string;
  readonly payload: Record<string, unknown>;
  readonly updatedAt: string;
  readonly createdAt: string;
}

export type MasteryTier = 'Uncharted' | 'Bronze' | 'Silver' | 'Gold' | 'Crown';

export interface SubjectMasterySummary {
  readonly id: ChapterId | SubtopicId;
  readonly title: string;
  readonly masteryPercent: number;
  readonly tier: MasteryTier;
  readonly cardsSeen: number;
  readonly totalCards: number;
  readonly cardRetentionPercent: number;
  readonly questionsAttempted: number;
  readonly totalQuestions: number;
  readonly questionAccuracyPercent: number;
}
