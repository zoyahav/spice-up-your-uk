/**
 * Aggregates per-exam mock test statistics so UI views consistently display
 * completion status, latest score, attempt counts, and best score.
 */

import type { ProfileId, TestSessionRecord } from '../types/domain';

export interface MockExamStats {
  readonly examNumber: number;
  readonly latest: TestSessionRecord;
  readonly best: TestSessionRecord;
  readonly attempts: number;
}

function toEpochMs(iso: string): number {
  const parsed = Date.parse(iso);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function scoreRatio(session: TestSessionRecord): number {
  return session.total > 0 ? session.score / session.total : 0;
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
