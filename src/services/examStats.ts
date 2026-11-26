/**
 * Aggregates per-exam mock test statistics and calm mock-only Exam Readiness
 * from recent mock exam performance.
 */

import type { ProfileId, TestSessionRecord } from '../types/domain';

export interface MockExamStats {
  readonly examNumber: number;
  readonly latest: TestSessionRecord;
  readonly best: TestSessionRecord;
  readonly attempts: number;
}

export type ExamReadinessTier = 'warming-up' | 'building' | 'on-track' | 'ready';

export interface RecentMockChip {
  readonly sessionId: string;
  readonly label: string;
  readonly score: number;
  readonly total: number;
  readonly passed: boolean;
}

export interface ExamReadinessSummary {
  readonly tier: ExamReadinessTier;
  readonly tierLabel: string;
  readonly headline: string;
  readonly detail: string;
  readonly totalMocksTaken: number;
  readonly warmupTarget: number;
  readonly recentCount: number;
  readonly recentPassedCount: number;
  readonly recentAvgPercent: number;
  readonly recentAvgOutOf24: number;
  readonly recentChips: readonly RecentMockChip[];
}

const WARMUP_MOCKS_REQUIRED = 3;
const ROLLING_WINDOW_SIZE = 5;

function toEpochMs(iso: string): number {
  const parsed = Date.parse(iso);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function scoreRatio(session: TestSessionRecord): number {
  return session.total > 0 ? session.score / session.total : 0;
}

function shortMockLabel(examNumber?: number): string {
  if (!examNumber) return 'Rand';
  if (examNumber > 100) return `S#${examNumber - 100}`;
  return `#${examNumber}`;
}

function formatOutOf24(val: number): string {
  const rounded = Math.round(val * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(1);
}

export function buildMockExamStatsByNumber(
  sessions: readonly TestSessionRecord[],
  profileId: ProfileId,
): Map<number, MockExamStats> {
  const result = new Map<number, MockExamStats>();

  for (const session of sessions) {
    if (
      session.profileId !== profileId ||
      session.mode !== 'mock' ||
      typeof session.examNumber !== 'number'
    ) {
      continue;
    }

    const existing = result.get(session.examNumber);
    if (!existing) {
      result.set(session.examNumber, {
        examNumber: session.examNumber,
        latest: session,
        best: session,
        attempts: 1,
      });
      continue;
    }

    const sessionTime = toEpochMs(session.completedAt);
    const existingLatestTime = toEpochMs(existing.latest.completedAt);
    const latest = sessionTime >= existingLatestTime ? session : existing.latest;

    const candidateRatio = scoreRatio(session);
    const bestRatio = scoreRatio(existing.best);
    const best =
      candidateRatio > bestRatio ||
      (candidateRatio === bestRatio && session.score > existing.best.score) ||
      (candidateRatio === bestRatio &&
        session.score === existing.best.score &&
        sessionTime > toEpochMs(existing.best.completedAt))
        ? session
        : existing.best;

    result.set(session.examNumber, {
      examNumber: session.examNumber,
      latest,
      best,
      attempts: existing.attempts + 1,
    });
  }

  return result;
}

export function summarizeExamSet(
  examNumbers: readonly number[],
  statsByExam: ReadonlyMap<number, MockExamStats>,
): {
  readonly attemptedCount: number;
  readonly passedLatestCount: number;
  readonly nextSuggestedExam: number;
} {
  let attemptedCount = 0;
  let passedLatestCount = 0;
  let firstUnpassed: number | null = null;

  for (const num of examNumbers) {
    const stat = statsByExam.get(num);
    if (stat) {
      attemptedCount += 1;
      if (stat.latest.passed) {
        passedLatestCount += 1;
      } else if (firstUnpassed === null) {
        firstUnpassed = num;
      }
    } else if (firstUnpassed === null) {
      firstUnpassed = num;
    }
  }

  return {
    attemptedCount,
    passedLatestCount,
    nextSuggestedExam: firstUnpassed ?? examNumbers[0] ?? 1,
  };
}

/**
 * Computes a calm, low-stress Exam Readiness tier purely from completed mock exams.
 * Uses a 3-exam warmup before evaluating a rolling window of the most recent 5 mock exams.
 */
export function computeExamReadiness(
  sessions: readonly TestSessionRecord[],
  profileId: ProfileId,
): ExamReadinessSummary {
  const mockSessions = sessions
    .filter((s) => s.profileId === profileId && s.mode === 'mock' && s.total > 0)
    .sort((a, b) => toEpochMs(b.completedAt) - toEpochMs(a.completedAt));

  const totalMocksTaken = mockSessions.length;
  const recentNewestFirst = mockSessions.slice(0, ROLLING_WINDOW_SIZE);
  const recentCount = recentNewestFirst.length;
  const recentPassedCount = recentNewestFirst.filter((s) => s.passed).length;

  const avgRatio =
    recentCount > 0
      ? recentNewestFirst.reduce((sum, s) => sum + scoreRatio(s), 0) / recentCount
      : 0;
  const recentAvgPercent = Math.round(avgRatio * 100);
  const recentAvgOutOf24 = Math.round(avgRatio * 24 * 10) / 10;

  // Chronological order (oldest -> newest) so the chips read left-to-right like a trend
  const recentChips: RecentMockChip[] = [...recentNewestFirst]
    .reverse()
    .map((s) => ({
      sessionId: s.sessionId,
      label: shortMockLabel(s.examNumber),
      score: s.score,
      total: s.total,
      passed: s.passed,
    }));

  if (totalMocksTaken < WARMUP_MOCKS_REQUIRED) {
    const remaining = WARMUP_MOCKS_REQUIRED - totalMocksTaken;
    return {
      tier: 'warming-up',
      tierLabel: 'Warming Up',
      headline:
        totalMocksTaken === 0
          ? 'Take 3 mock exams to unlock Exam Readiness'
          : `${totalMocksTaken}/${WARMUP_MOCKS_REQUIRED} warmup mocks done`,
      detail:
        totalMocksTaken === 0
          ? 'Based purely on your last 5 mock exam scores once you have tried 3 full exams.'
          : `Finish ${remaining} more mock exam${remaining === 1 ? '' : 's'} to see your readiness tier (no pressure while learning).`,
      totalMocksTaken,
      warmupTarget: WARMUP_MOCKS_REQUIRED,
      recentCount,
      recentPassedCount,
      recentAvgPercent,
      recentAvgOutOf24,
      recentChips,
    };
  }

  const avgLabel = formatOutOf24(recentAvgOutOf24);
  const minPassesForReady = recentCount >= 5 ? 4 : 3;

  if (recentPassedCount >= minPassesForReady && recentAvgPercent >= 83) {
    return {
      tier: 'ready',
      tierLabel: 'Test-Day Ready',
      headline: `Averaging ${avgLabel}/24 (${recentAvgPercent}%) across your last ${recentCount} mocks`,
      detail: `${recentPassedCount} of your last ${recentCount} passed, comfortably above the 18/24 (75%) pass mark.`,
      totalMocksTaken,
      warmupTarget: WARMUP_MOCKS_REQUIRED,
      recentCount,
      recentPassedCount,
      recentAvgPercent,
      recentAvgOutOf24,
      recentChips,
    };
  }

  if (recentAvgPercent >= 75 || recentPassedCount >= Math.ceil(recentCount * 0.6)) {
    return {
      tier: 'on-track',
      tierLabel: 'On Track',
      headline: `Averaging ${avgLabel}/24 (${recentAvgPercent}%) across your last ${recentCount} mocks`,
      detail: `${recentPassedCount}/${recentCount} passed. Aim for 20+/24 consistently for a comfortable test-day cushion.`,
      totalMocksTaken,
      warmupTarget: WARMUP_MOCKS_REQUIRED,
      recentCount,
      recentPassedCount,
      recentAvgPercent,
      recentAvgOutOf24,
      recentChips,
    };
  }

  const gap = Math.max(1, Math.ceil(18 - recentAvgOutOf24));
  return {
    tier: 'building',
    tierLabel: 'Building Momentum',
    headline: `Averaging ${avgLabel}/24 (${recentAvgPercent}%) across your last ${recentCount} mocks`,
    detail: `Just ${gap} more right answer${gap === 1 ? '' : 's'} per exam reaches the 18/24 (75%) pass mark.`,
    totalMocksTaken,
    warmupTarget: WARMUP_MOCKS_REQUIRED,
    recentCount,
    recentPassedCount,
    recentAvgPercent,
    recentAvgOutOf24,
    recentChips,
  };
}
