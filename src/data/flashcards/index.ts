import type { Flashcard } from '../../types/domain';
import { FLASHCARDS_CH1_2_4_5 } from './ch1_2_4_5';
import { FLASHCARDS_CH3 } from './ch3_history';

export const BUILT_IN_FLASHCARDS: readonly Flashcard[] = [
  ...FLASHCARDS_CH1_2_4_5,
  ...FLASHCARDS_CH3,
];
