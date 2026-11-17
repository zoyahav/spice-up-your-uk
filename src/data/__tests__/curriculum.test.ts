import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../syllabus';
import { BUILT_IN_FLASHCARDS } from '../flashcards';
import { BUILT_IN_QUESTIONS, TOTAL_MOCK_EXAMS } from '../questions';
import { STUDY_SECTIONS } from '../studyGuides';

describe('Built-in Life in the UK Curriculum Integrity', () => {
  const validChapters = new Set(CHAPTERS.map((c) => c.id));
  const validSubtopics = new Set(CHAPTERS.flatMap((c) => c.subtopics.map((s) => s.id)));

  it('includes comprehensive study guide sections across all 5 chapters with memory hooks', () => {
    expect(STUDY_SECTIONS.length).toBeGreaterThanOrEqual(16);
    for (const ch of CHAPTERS) {
      expect(STUDY_SECTIONS.some((s) => s.chapterId === ch.id)).toBe(true);
    }
    for (const sec of STUDY_SECTIONS) {
      expect(sec.memoryHook.trim().length).toBeGreaterThan(10);
      expect(sec.keyFacts.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('ships 250+ unique flashcards with valid taxonomy and non-empty memory hooks', () => {
    expect(BUILT_IN_FLASHCARDS.length).toBeGreaterThanOrEqual(250);
    const ids = new Set<string>();
    for (const card of BUILT_IN_FLASHCARDS) {
      expect(ids.has(card.id), `Duplicate flashcard ID: ${card.id}`).toBe(false);
      ids.add(card.id);
      expect(validChapters.has(card.chapterId)).toBe(true);
      expect(validSubtopics.has(card.subtopicId)).toBe(true);
      expect(card.front.trim().length).toBeGreaterThan(5);
      expect(card.back.trim().length).toBeGreaterThan(1);
      expect(card.memoryHook.trim().length).toBeGreaterThan(8);
    }
  });

  it('ships 408+ unique practice questions organized into 17 full 24-question Mock Exams with explanations & memory hooks', () => {
    expect(BUILT_IN_QUESTIONS.length).toBeGreaterThanOrEqual(408);

    const ids = new Set<string>();
    for (const q of BUILT_IN_QUESTIONS) {
      expect(ids.has(q.id), `Duplicate question ID: ${q.id}`).toBe(false);
      ids.add(q.id);
      expect(validChapters.has(q.chapterId)).toBe(true);
      expect(validSubtopics.has(q.subtopicId)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correctIndices.length).toBeGreaterThanOrEqual(1);
      for (const idx of q.correctIndices) {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(q.options.length);
      }
      expect(q.explanation.trim().length).toBeGreaterThan(10);
      expect(q.memoryHook.trim().length).toBeGreaterThan(8);
    }

    for (let examNum = 1; examNum <= TOTAL_MOCK_EXAMS; examNum++) {
      const examQs = BUILT_IN_QUESTIONS.filter((q) => q.examNumber === examNum);
      expect(examQs.length, `Exam #${examNum} must have 24 questions`).toBe(24);
    }
  });
});
