/**
 * Splits a StudySection into bite-sized, mobile-friendly pages so each card fits on screen
 * with minimal or zero scrolling.
 */

import type { StudySection } from '../types/domain';

export interface LessonPage {
  readonly kind: 'overview' | 'facts' | 'recap';
  readonly label: string;
  readonly summary?: string;
  readonly facts: readonly string[];
  readonly memoryHook?: string;
  readonly isFinal: boolean;
}

const OVERVIEW_CHAR_BUDGET = 380;
const FACT_PAGE_CHAR_BUDGET = 340;
const MAX_FACTS_PER_PAGE = 2;
const RECAP_MERGE_CHAR_BUDGET = 340;

export function buildLessonPages(section: StudySection): readonly LessonPage[] {
  const rawPages: Omit<LessonPage, 'isFinal'>[] = [];
  const facts = [...section.keyFacts];
  let factIdx = 0;

  // Page 1: Big-picture summary, paired with the first fact if both fit comfortably
  if (section.summary && section.summary.trim().length > 0) {
    const summaryText = section.summary.trim();
    const firstFact = facts[0];
    if (
      firstFact &&
      facts.length >= 2 &&
      summaryText.length + firstFact.length <= OVERVIEW_CHAR_BUDGET
    ) {
      rawPages.push({
        kind: 'overview',
        label: 'The Big Picture',
        summary: summaryText,
        facts: [firstFact],
      });
      factIdx = 1;
    } else {
      rawPages.push({
        kind: 'overview',
        label: 'The Big Picture',
        summary: summaryText,
        facts: [],
      });
    }
  }

  // Middle pages: pack 1 to 2 concise facts per page within the character budget
  while (factIdx < facts.length) {
    const pageFacts: string[] = [facts[factIdx]!];
    let chars = facts[factIdx]!.length;
    factIdx += 1;

    while (
      factIdx < facts.length &&
      pageFacts.length < MAX_FACTS_PER_PAGE &&
      chars + facts[factIdx]!.length <= FACT_PAGE_CHAR_BUDGET
    ) {
      pageFacts.push(facts[factIdx]!);
      chars += facts[factIdx]!.length;
      factIdx += 1;
    }

    rawPages.push({
      kind: 'facts',
      label: 'Key Takeaways',
      facts: pageFacts,
    });
  }

  // Final wrap-up: attach memoryHook to a short trailing facts page or give it its own recap card
  if (section.memoryHook && section.memoryHook.trim().length > 0) {
    const hookText = section.memoryHook.trim();
    const lastPage = rawPages[rawPages.length - 1];
    const lastPageFactChars = lastPage
      ? lastPage.facts.reduce((sum, f) => sum + f.length, 0)
      : 0;

    if (
      lastPage &&
      lastPage.kind === 'facts' &&
      lastPage.facts.length === 1 &&
      lastPageFactChars + hookText.length <= RECAP_MERGE_CHAR_BUDGET
    ) {
      rawPages[rawPages.length - 1] = {
        ...lastPage,
        kind: 'recap',
        label: 'Key Takeaway & Exam Tip',
        memoryHook: hookText,
      };
    } else {
      rawPages.push({
        kind: 'recap',
        label: 'Exam Trap & Practice',
        facts: [],
        memoryHook: hookText,
      });
    }
  }

  if (rawPages.length === 0) {
    rawPages.push({
      kind: 'recap',
      label: 'Lesson Summary',
      facts: [],
    });
  }

  return rawPages.map((page, index) => ({
    ...page,
    isFinal: index === rawPages.length - 1,
  }));
}
