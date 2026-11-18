/**
 * SM-2 Spaced Repetition Scheduler & Subject Mastery Calculator.
 * Pure, deterministic functions with zero side effects for rock-solid unit testing.
 */

import type {
  ChapterId,
  Flashcard,
  MasteryTier,
  PracticeQuestion,
  ProfileId,
  QuestionStatRecord,
  SrsCardState,
  SrsRating,
  SubjectMasterySummary,
  SubtopicId,
} from '../types/domain';

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;
const MS_PER_MINUTE = 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function makeProfileEntityKey(profileId: ProfileId, entityId: string): string {
  return `${profileId}:${entityId}`;
}

export function createInitialSrsState(
  profileId: ProfileId,
  cardId: string,
  nowIso: string = new Date().toISOString(),
): SrsCardState {
  return {
    key: makeProfileEntityKey(profileId, cardId),
    profileId,
    cardId,
    easeFactor: DEFAULT_EASE_FACTOR,
    intervalDays: 0,
    repetitions: 0,
    dueAt: nowIso,
    lastReviewedAt: nowIso,
    lapses: 0,
    boosted: false,
    updatedAt: nowIso,
  };
}

/**
 * Computes the next SM-2 scheduling state given a rating ('again' | 'hard' | 'good' | 'easy').
 */
export function scheduleNextSrsReview(
  prev: SrsCardState | undefined,
  profileId: ProfileId,
  cardId: string,
  rating: SrsRating,
  now: Date = new Date(),
): SrsCardState {
  const nowIso = now.toISOString();
  const base = prev ?? createInitialSrsState(profileId, cardId, nowIso);

  let easeFactor = base.easeFactor;
  let repetitions = base.repetitions;
  let intervalDays = base.intervalDays;
  let lapses = base.lapses;
  let dueAtMs = now.getTime();

  switch (rating) {
    case 'again': {
      repetitions = 0;
      intervalDays = 0;
      lapses += 1;
      easeFactor = Math.max(MIN_EASE_FACTOR, Number((easeFactor - 0.2).toFixed(2)));
      // Resurface in 10 minutes (or immediately in current session queue)
      dueAtMs = now.getTime() + 10 * MS_PER_MINUTE;
      break;
    }
    case 'hard': {
      if (repetitions === 0) {
        intervalDays = 1;
        repetitions = 1;
      } else {
        intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
        repetitions += 1;
      }
      easeFactor = Math.max(MIN_EASE_FACTOR, Number((easeFactor - 0.15).toFixed(2)));
      dueAtMs = now.getTime() + intervalDays * MS_PER_DAY;
      break;
    }
    case 'good': {
      if (repetitions === 0) {
        intervalDays = 1;
      } else if (repetitions === 1) {
        intervalDays = 3;
      } else {
        intervalDays = Math.max(2, Math.round(intervalDays * easeFactor));
      }
      repetitions += 1;
      dueAtMs = now.getTime() + intervalDays * MS_PER_DAY;
      break;
    }
    case 'easy': {
      if (repetitions === 0) {
        intervalDays = 4;
      } else if (repetitions === 1) {
        intervalDays = 7;
      } else {
        intervalDays = Math.max(4, Math.round(intervalDays * easeFactor * 1.3));
      }
      repetitions += 1;
      easeFactor = Number((easeFactor + 0.15).toFixed(2));
      dueAtMs = now.getTime() + intervalDays * MS_PER_DAY;
      break;
    }
  }

  return {
    key: makeProfileEntityKey(profileId, cardId),
    profileId,
    cardId,
    easeFactor,
    intervalDays,
    repetitions,
    dueAt: new Date(dueAtMs).toISOString(),
    lastReviewedAt: nowIso,
    lapses,
    boosted: false,
    updatedAt: nowIso,
  };
}

/**
 * Human-readable preview label for next review interval shown on rating buttons.
 */
export function previewIntervalLabel(
  prev: SrsCardState | undefined,
  profileId: ProfileId,
  cardId: string,
  rating: SrsRating,
): string {
  if (rating === 'again') return '10m';
  const next = scheduleNextSrsReview(prev, profileId, cardId, rating);
  return `${next.intervalDays}d`;
}

/**
 * Selects due + boosted + unseen flashcards for a study session.
 */
export function selectStudyQueue<
  T extends { readonly id: string; readonly chapterId: ChapterId; readonly subtopicId: SubtopicId },
>(
  allCards: readonly T[],
  srsMap: ReadonlyMap<string, SrsCardState>,
  profileId: ProfileId,
  options: {
    chapterId?: ChapterId;
    subtopicId?: SubtopicId;
    mode: 'smart' | 'due-only' | 'cram';
    maxNewCards?: number;
    limit?: number;
  },
  now: Date = new Date(),
): T[] {
  const maxNew = options.maxNewCards ?? 15;
  const limit = options.limit ?? 30;
  const nowMs = now.getTime();

  const filtered = allCards.filter((c) => {
    if (options.chapterId && c.chapterId !== options.chapterId) return false;
    if (options.subtopicId && c.subtopicId !== options.subtopicId) return false;
    return true;
  });

  if (options.mode === 'cram') {
    return [...filtered].slice(0, limit);
  }

  const boosted: T[] = [];
  const due: { card: T; dueMs: number }[] = [];
  const unseen: T[] = [];

  for (const card of filtered) {
    const state = srsMap.get(makeProfileEntityKey(profileId, card.id));
    if (!state) {
      unseen.push(card);
    } else if (state.boosted) {
      boosted.push(card);
    } else {
      const dueMs = Date.parse(state.dueAt);
      if (dueMs <= nowMs) {
        due.push({ card, dueMs });
      }
    }
  }

  due.sort((a, b) => a.dueMs - b.dueMs);
  const dueCards = due.map((d) => d.card);

  if (options.mode === 'due-only') {
    return [...boosted, ...dueCards].slice(0, limit);
  }

  const chosenNew = unseen.slice(0, maxNew);
  return [...boosted, ...dueCards, ...chosenNew].slice(0, limit);
}

export function masteryTierFromPercent(percent: number): MasteryTier {
  if (percent >= 90) return 'Crown';
  if (percent >= 75) return 'Gold';
  if (percent >= 50) return 'Silver';
  if (percent >= 15) return 'Bronze';
  return 'Uncharted';
}

/**
 * Computes combined Subject Mastery (0..100%) from flashcard SRS maturity & practice question accuracy.
 */
export function computeSubjectMastery(params: {
  id: ChapterId | SubtopicId;
  title: string;
  cards: readonly Flashcard[];
  questions: readonly PracticeQuestion[];
  srsMap: ReadonlyMap<string, SrsCardState>;
  questionStatsMap: ReadonlyMap<string, QuestionStatRecord>;
  profileId: ProfileId;
}): SubjectMasterySummary {
  const { id, title, cards, questions, srsMap, questionStatsMap, profileId } = params;

  const hasLegacyCardSrs = cards.some((c) => srsMap.has(makeProfileEntityKey(profileId, c.id)));
  const srsPool: readonly { readonly id: string }[] = hasLegacyCardSrs
    ? cards
    : questions.length > 0
      ? questions
      : cards;

  let cardsSeen = 0;
  let cardMaturitySum = 0;

  for (const item of srsPool) {
    const st = srsMap.get(makeProfileEntityKey(profileId, item.id));
    if (st) {
      cardsSeen += 1;
      // Score each item 0..1 based on repetitions & interval
      if (st.repetitions === 0) {
        cardMaturitySum += 0.2;
      } else if (st.intervalDays >= 7) {
        cardMaturitySum += 1.0;
      } else if (st.intervalDays >= 3) {
        cardMaturitySum += 0.8;
      } else {
        cardMaturitySum += 0.55;
      }
    }
  }

  const cardRetentionPercent =
    srsPool.length > 0 ? Math.round((cardMaturitySum / srsPool.length) * 100) : 0;

  let questionsAttempted = 0;
  let totalCorrectRatioSum = 0;

  for (const q of questions) {
    const qs = questionStatsMap.get(makeProfileEntityKey(profileId, q.id));
    if (qs && qs.attempts > 0) {
      questionsAttempted += 1;
      const ratio = qs.correct / qs.attempts;
      // Penalize slightly if the most recent attempt was wrong
      const adjusted = qs.lastWrong ? ratio * 0.65 : Math.min(1, ratio * 0.85 + 0.15);
      totalCorrectRatioSum += adjusted;
    }
  }

  const questionAccuracyPercent =
    questionsAttempted > 0
      ? Math.round((totalCorrectRatioSum / questionsAttempted) * 100)
      : 0;

  // Coverage factor ensures answering 1 lucky question doesn't yield 100% mastery
  const questionCoverage =
    questions.length > 0 ? Math.min(1, questionsAttempted / Math.min(questions.length, 16)) : 0;
  const weightedQuestionScore = questionAccuracyPercent * (0.4 + 0.6 * questionCoverage);

  let masteryPercent = 0;
  if (srsPool.length > 0 && questions.length > 0) {
    masteryPercent = Math.round(cardRetentionPercent * 0.4 + weightedQuestionScore * 0.6);
  } else if (questions.length > 0) {
    masteryPercent = Math.round(weightedQuestionScore);
  } else {
    masteryPercent = cardRetentionPercent;
  }

  masteryPercent = Math.min(100, Math.max(0, masteryPercent));

  return {
    id,
    title,
    masteryPercent,
    tier: masteryTierFromPercent(masteryPercent),
    cardsSeen,
    totalCards: srsPool.length,
    cardRetentionPercent,
    questionsAttempted,
    totalQuestions: questions.length,
    questionAccuracyPercent,
  };
}
