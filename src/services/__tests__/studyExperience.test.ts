import { describe, expect, it } from 'vitest';
import { STUDY_SECTIONS } from '../../data/studyGuides';
import { buildLessonPages } from '../studyGuidePages';
import { buildMockExamStatsByNumber, summarizeExamSet } from '../examStats';
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

describe('Mock Exam Latest & Best Stats', () => {
  const makeSession = (
    id: string,
    examNumber: number,
    score: number,
    completedAt: string,
    profileId: 'partner_a' | 'partner_b' = 'partner_a',
  ): TestSessionRecord => ({
    sessionId: id,
    profileId,
    mode: 'mock',
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
});

describe('Bionic Reading Tokenizer', () => {
  it('reconstructs exact source strings while applying fixation lengths and preserving acronyms & contractions', () => {
    const sample = "In 1066, William's victory reshaped the UK and BBC history.";
    const segments = tokenizeBionicText(sample);
    const rebuilt = segments.map((s) => `${s.bold}${s.rest}`).join('');
    expect(rebuilt).toBe(sample);

    // Contraction / possessive keeps apostrophe tail unbolded
    const williams = segments.find((s) => `${s.bold}${s.rest}` === "William's");
    expect(williams).toEqual({ bold: 'Will', rest: "iam's" });

    // Short all-caps acronyms stay intact
    const ukSeg = segments.find((s) => s.rest === 'UK');
    expect(ukSeg).toEqual({ bold: '', rest: 'UK' });

    const bbcSeg = segments.find((s) => s.rest === 'BBC');
    expect(bbcSeg).toEqual({ bold: '', rest: 'BBC' });

    expect(getFixationLength('a')).toBe(1);
    expect(getFixationLength('of')).toBe(1);
    expect(getFixationLength('the')).toBe(2);
    expect(getFixationLength('Parliament')).toBe(5);
  });
});
