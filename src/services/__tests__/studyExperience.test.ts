import { describe, expect, it } from 'vitest';
import { STUDY_SECTIONS } from '../../data/studyGuides';
import { buildLessonPages } from '../studyGuidePages';
import {
  buildMockExamStatsByNumber,
  computeExamReadiness,
  summarizeExamSet,
} from '../examStats';
import { getFixationLength, tokenizeBionicText } from '../bionicReading';
import type { TestSessionRecord } from '../../types/domain';

describe('Study Guide Bite-Sized Pagination', () => {
  it('splits every lesson into >= 2 compact pages while preserving 100% of summaries, facts, and tips', () => {
    expect(STUDY_SECTIONS.length).toBe(20);
    for (const sec of STUDY_SECTIONS) {
      const pages = buildLessonPages(sec);
      expect(pages.length, `Lesson ${sec.id} should paginate into multiple cards`).toBeGreaterThanOrEqual(2);
      expect(pages[pages.length - 1]?.isFinal).toBe(true);
      expect(pages.slice(0, -1).every((p) => !p.isFinal)).toBe(true);

      const emittedFacts = pages.flatMap((p) => p.facts);
      expect(emittedFacts).toEqual(sec.keyFacts);

      const emittedSummary = pages.find((p) => p.summary)?.summary;
      expect(emittedSummary).toBe(sec.summary?.trim());

      const emittedHook = pages.find((p) => p.memoryHook)?.memoryHook;
      expect(emittedHook).toBe(sec.memoryHook?.trim());

      for (const pg of pages) {
        if (pg.facts.length > 1) {
          const totalChars = pg.facts.reduce((s, f) => s + f.length, 0);
          expect(totalChars).toBeLessThanOrEqual(340);
        }
      }
    }
  });
});

describe('Mock Exam Latest, Best & Calm Exam Readiness', () => {
  const makeSession = (
    id: string,
    examNumber: number,
    score: number,
    completedAt: string,
    profileId: 'partner_a' | 'partner_b' = 'partner_a',
    mode: TestSessionRecord['mode'] = 'mock',
  ): TestSessionRecord => ({
    sessionId: id,
    profileId,
    mode,
    examNumber,
    score,
    total: 24,
    passed: score >= 18,
    durationSec: 600,
    answers: [],
    completedAt,
    updatedAt: completedAt,
  });

  it('tracks latest attempt by completedAt separately from best attempt and counts retries', () => {
    const sessions: TestSessionRecord[] = [
      makeSession('s1', 1, 21, '2026-11-20T10:00:00.000Z'),
      makeSession('s2', 1, 16, '2026-11-24T12:00:00.000Z'), // newer, lower score
      makeSession('s3', 2, 19, '2026-11-22T09:00:00.000Z'),
      makeSession('s4', 1, 24, '2026-11-25T15:00:00.000Z', 'partner_b'), // different player
    ];

    const stats = buildMockExamStatsByNumber(sessions, 'partner_a');
    expect(stats.size).toBe(2);

    const ex1 = stats.get(1)!;
    expect(ex1.latest.sessionId).toBe('s2');
    expect(ex1.latest.score).toBe(16);
    expect(ex1.latest.passed).toBe(false);
    expect(ex1.best.sessionId).toBe('s1');
    expect(ex1.best.score).toBe(21);
    expect(ex1.attempts).toBe(2);

    const summary = summarizeExamSet([1, 2, 3], stats);
    expect(summary.attemptedCount).toBe(2);
    expect(summary.passedLatestCount).toBe(1); // Exam 2 latest passed; Exam 1 latest failed
    expect(summary.nextSuggestedExam).toBe(1);
  });

  it('uses a 3-exam warmup and rolling last-5 mock average across calm readiness tiers', () => {
    // 2 mocks + 1 topic drill -> still warming up (ignores non-mock drills)
    const warmup = computeExamReadiness(
      [
        makeSession('m1', 1, 14, '2026-11-20T10:00:00.000Z'),
        makeSession('m2', 2, 16, '2026-11-21T10:00:00.000Z'),
        makeSession('d1', 3, 24, '2026-11-22T10:00:00.000Z', 'partner_a', 'topic'),
      ],
      'partner_a',
    );
    expect(warmup.tier).toBe('warming-up');
    expect(warmup.totalMocksTaken).toBe(2);

    // 3 mocks below 75% -> building
    const building = computeExamReadiness(
      [
        makeSession('m1', 1, 14, '2026-11-20T10:00:00.000Z'),
        makeSession('m2', 2, 16, '2026-11-21T10:00:00.000Z'),
        makeSession('m3', 3, 17, '2026-11-22T10:00:00.000Z'),
      ],
      'partner_a',
    );
    expect(building.tier).toBe('building');
    expect(building.recentPassedCount).toBe(0);

    // Passing around 75-80% -> on-track
    const onTrack = computeExamReadiness(
      [
        makeSession('m1', 1, 18, '2026-11-20T10:00:00.000Z'),
        makeSession('m2', 2, 19, '2026-11-21T10:00:00.000Z'),
        makeSession('m3', 3, 19, '2026-11-22T10:00:00.000Z'),
      ],
      'partner_a',
    );
    expect(onTrack.tier).toBe('on-track');

    // Old low scores fall off rolling last-5 window once recent 5 are strong -> ready
    const ready = computeExamReadiness(
      [
        makeSession('old1', 1, 10, '2026-11-10T10:00:00.000Z'),
        makeSession('old2', 2, 12, '2026-11-11T10:00:00.000Z'),
        makeSession('r1', 3, 21, '2026-11-20T10:00:00.000Z'),
        makeSession('r2', 4, 22, '2026-11-21T10:00:00.000Z'),
        makeSession('r3', 5, 20, '2026-11-22T10:00:00.000Z'),
        makeSession('r4', 6, 21, '2026-11-23T10:00:00.000Z'),
        makeSession('r5', 7, 22, '2026-11-24T10:00:00.000Z'),
      ],
      'partner_a',
    );
    expect(ready.tier).toBe('ready');
    expect(ready.recentCount).toBe(5);
    expect(ready.recentPassedCount).toBe(5);
    expect(ready.recentAvgPercent).toBeGreaterThanOrEqual(83);
    expect(ready.recentChips.map((c) => c.label)).toEqual(['#3', '#4', '#5', '#6', '#7']);
  });
});

describe('Bionic Reading Tokenizer', () => {
  it('supports both gentle adaptive fixation and strict first-2-letters mode while preserving acronyms and contractions', () => {
    const sample = "In 1066, William's responsibilities reshaped the UK and BBC history.";

    const adaptiveSegs = tokenizeBionicText(sample, 'adaptive');
    expect(adaptiveSegs.map((s) => `${s.bold}${s.rest}`).join('')).toBe(sample);
    expect(adaptiveSegs.find((s) => `${s.bold}${s.rest}` === "William's")).toEqual({
      bold: 'Wil',
      rest: "liam's",
    });
    expect(adaptiveSegs.find((s) => `${s.bold}${s.rest}` === 'responsibilities')).toEqual({
      bold: 'respo',
      rest: 'nsibilities',
    });
    expect(adaptiveSegs.find((s) => s.rest === 'UK')).toEqual({ bold: '', rest: 'UK' });
    expect(adaptiveSegs.find((s) => s.rest === 'BBC')).toEqual({ bold: '', rest: 'BBC' });

    const twoLetterSegs = tokenizeBionicText(sample, 'two-letters');
    expect(twoLetterSegs.map((s) => `${s.bold}${s.rest}`).join('')).toBe(sample);
    expect(twoLetterSegs.find((s) => `${s.bold}${s.rest}` === 'responsibilities')).toEqual({
      bold: 're',
      rest: 'sponsibilities',
    });
    expect(twoLetterSegs.find((s) => `${s.bold}${s.rest}` === "William's")).toEqual({
      bold: 'Wi',
      rest: "lliam's",
    });

    expect(getFixationLength('a', 'adaptive')).toBe(1);
    expect(getFixationLength('the', 'adaptive')).toBe(1);
    expect(getFixationLength('the', 'two-letters')).toBe(2);
    expect(getFixationLength('Parliament', 'adaptive')).toBe(4);
    expect(getFixationLength('Parliament', 'two-letters')).toBe(2);
  });
});
