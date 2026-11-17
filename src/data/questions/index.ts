import type { PracticeQuestion } from '../../types/domain';
import { QUESTIONS_EXAMS_01_06 } from './exams_01_06';
import { QUESTIONS_EXAMS_07_12 } from './exams_07_12';
import { QUESTIONS_EXAMS_13_17 } from './exams_13_17';

export const BUILT_IN_QUESTIONS: readonly PracticeQuestion[] = [
  ...QUESTIONS_EXAMS_01_06,
  ...QUESTIONS_EXAMS_07_12,
  ...QUESTIONS_EXAMS_13_17,
];

export const TOTAL_MOCK_EXAMS = 17;

export function getQuestionsForMockExam(
  allQuestions: readonly PracticeQuestion[],
  examNumber: number,
): PracticeQuestion[] {
  return allQuestions.filter((q) => q.examNumber === examNumber);
}
