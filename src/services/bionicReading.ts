/**
 * Pure Bionic Reading tokenizer.
 * Highlights the opening fixation prefix of each word so readers can scan
 * study notes, questions, and explanations more comfortably.
 */

import type { BionicFixationStyle } from '../types/domain';

export interface BionicSegment {
  readonly bold: string;
  readonly rest: string;
}

const WORD_TOKEN_RE = /[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['’][A-Za-zÀ-ÖØ-öø-ÿ]+)*/g;
const SHORT_ACRONYM_RE = /^[A-Z]{2,3}$/;

export function getFixationLength(
  word: string,
  style: BionicFixationStyle = 'adaptive',
): number {
  const len = word.length;
  if (len <= 1) return len;

  if (style === 'two-letters') {
    return len === 2 ? 1 : 2;
  }

  // Adaptive fixation: scales gently from 1 letter on short words up to 5 on long words
  if (len <= 3) return 1;
  if (len <= 5) return 2;
  if (len <= 8) return 3;
  if (len <= 11) return 4;
  return 5;
}

export function tokenizeBionicText(
  text: string,
  style: BionicFixationStyle = 'adaptive',
): readonly BionicSegment[] {
  if (!text) return [];

  const segments: BionicSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(WORD_TOKEN_RE)) {
    const start = match.index ?? 0;
    const word = match[0];

    if (start > lastIndex) {
      segments.push({ bold: '', rest: text.slice(lastIndex, start) });
    }

    if (SHORT_ACRONYM_RE.test(word)) {
      segments.push({ bold: '', rest: word });
    } else {
      const apostropheIdx = word.search(/['’]/);
      const stem = apostropheIdx >= 2 ? word.slice(0, apostropheIdx) : word;
      const fixLen = Math.min(word.length, getFixationLength(stem, style));
      segments.push({
        bold: word.slice(0, fixLen),
        rest: word.slice(fixLen),
      });
    }

    lastIndex = start + word.length;
  }

  if (lastIndex < text.length) {
    segments.push({ bold: '', rest: text.slice(lastIndex) });
  }

  return segments;
}
