import { describe, expect, it } from 'vitest';
import {
  computeSubjectMastery,
  createInitialSrsState,
  scheduleNextSrsReview,
  selectStudyQueue,
} from '../srs';
import type { Flashcard, PracticeQuestion, QuestionStatRecord, SrsCardState } from '../../types/domain';

describe('SM-2 Spaced Repetition & Subject Mastery', () => {
  const fixedNow = new Date('2026-11-17T10:00:00.000Z');

  it('progresses intervals on repeated "good" reviews and boosts ease on "easy"', () => {
    const first = scheduleNextSrsReview(undefined, 'partner_a', 'fc-1', 'good', fixedNow);
    expect(first.intervalDays).toBe(1);
    expect(first.repetitions).toBe(1);
    expect(first.easeFactor).toBe(2.5);

    const second = scheduleNextSrsReview(first, 'partner_a', 'fc-1', 'good', fixedNow);
    expect(second.intervalDays).toBe(3);
    expect(second.repetitions).toBe(2);

    const third = scheduleNextSrsReview(second, 'partner_a', 'fc-1', 'easy', fixedNow);
    expect(third.intervalDays).toBeGreaterThanOrEqual(8);
    expect(third.easeFactor).toBeGreaterThan(2.5);
  });

  it('resets repetitions on "again", increments lapses, and never drops easeFactor below 1.3', () => {
    let state: SrsCardState | undefined = createInitialSrsState(
      'partner_a',
      'fc-hard',
      fixedNow.toISOString(),
    );
    for (let i = 0; i < 12; i++) {
      state = scheduleNextSrsReview(state, 'partner_a', 'fc-hard', 'again', fixedNow);
    }
    expect(state?.repetitions).toBe(0);
    expect(state?.intervalDays).toBe(0);
    expect(state?.lapses).toBe(12);
    expect(state?.easeFactor).toBe(1.3);
  });

  it('prioritizes boosted and due cards ahead of unseen cards in smart queue', () => {
    const cards: Flashcard[] = [
      { id: 'c1', chapterId: 'ch1', subtopicId: 'ch1-principles', front: 'Q1', back: 'A1', memoryHook: 'M1' },
      { id: 'c2', chapterId: 'ch1', subtopicId: 'ch1-principles', front: 'Q2', back: 'A2', memoryHook: 'M2' },
      { id: 'c3', chapterId: 'ch1', subtopicId: 'ch1-principles', front: 'Q3', back: 'A3', memoryHook: 'M3' },
      { id: 'c4', chapterId: 'ch1', subtopicId: 'ch1-principles', front: 'Q4', back: 'A4', memoryHook: 'M4' },
    ];

    const srsMap = new Map<string, SrsCardState>([
      [
        'partner_a:c2',
        {
          ...createInitialSrsState('partner_a', 'c2'),
          dueAt: '2026-11-16T00:00:00.000Z', // overdue
        },
      ],
      [
        'partner_a:c3',
        {
          ...createInitialSrsState('partner_a', 'c3'),
          dueAt: '2026-11-25T00:00:00.000Z', // future, BUT boosted!
          boosted: true,
        },
      ],
      [
        'partner_a:c4',
        {
          ...createInitialSrsState('partner_a', 'c4'),
          dueAt: '2026-11-25T00:00:00.000Z', // future, not due
        },
      ],
    ]);

    const queue = selectStudyQueue(
      cards,
      srsMap,
      'partner_a',
      { mode: 'smart', maxNewCards: 5 },
      fixedNow,
    );

    expect(queue.map((c) => c.id)).toEqual(['c3', 'c2', 'c1']);
  });

  it('computes independent subject mastery per partner profile', () => {
    const cards: Flashcard[] = [
      { id: 'c1', chapterId: 'ch2', subtopicId: 'ch2-nations', front: 'F', back: 'B', memoryHook: 'H' },
    ];
    const questions: PracticeQuestion[] = [
      {
        id: 'q1',
        chapterId: 'ch2',
        subtopicId: 'ch2-nations',
        type: 'single',
        prompt: 'Capital of Wales?',
        options: ['Cardiff', 'Swansea'],
        correctIndices: [0],
        explanation: 'Cardiff is the capital.',
        memoryHook: 'Cardiff Castle!',
      },
    ];

    const srsMap = new Map<string, SrsCardState>([
      [
        'partner_a:c1',
        {
          ...createInitialSrsState('partner_a', 'c1'),
          repetitions: 3,
          intervalDays: 10,
        },
      ],
    ]);

    const qStats = new Map<string, QuestionStatRecord>([
      [
        'partner_a:q1',
        {
          key: 'partner_a:q1',
          profileId: 'partner_a',
          questionId: 'q1',
          chapterId: 'ch2',
          subtopicId: 'ch2-nations',
          attempts: 2,
          correct: 2,
          lastWrong: false,
          lastAttemptAt: fixedNow.toISOString(),
          updatedAt: fixedNow.toISOString(),
        },
      ],
    ]);

    const aMastery = computeSubjectMastery({
      id: 'ch2',
      title: 'What is the UK?',
      cards,
      questions,
      srsMap,
      questionStatsMap: qStats,
      profileId: 'partner_a',
    });
    const bMastery = computeSubjectMastery({
      id: 'ch2',
      title: 'What is the UK?',
      cards,
      questions,
      srsMap,
      questionStatsMap: qStats,
      profileId: 'partner_b',
    });

    expect(aMastery.masteryPercent).toBe(100);
    expect(aMastery.tier).toBe('Crown');
    expect(bMastery.masteryPercent).toBe(0);
    expect(bMastery.tier).toBe('Uncharted');
  });
});
