/**
 * External Deck & Content Importer.
 * Parses JSON arrays (both SpiceUpUK native format and common open-source GitHub `exams.json` schemas)
 * as well as CSV / TSV Anki-style flashcard exports into validated CustomContentRecord rows.
 * Also supports one-time "Fetch from JSON URL" so Phone A can import an external pack and sync it
 * to Phone B via Google Sheets (`Custom_Content`) with zero files committed to GitHub!
 */

import type {
  ChapterId,
  CustomContentRecord,
  Flashcard,
  PracticeQuestion,
  QuestionType,
  SubtopicId,
} from '../types/domain';
import type { FetchLike } from './sync';

const VALID_CHAPTERS = new Set<ChapterId>(['ch1', 'ch2', 'ch3', 'ch4', 'ch5']);

const DEFAULT_SUBTOPIC_FOR_CHAPTER: Record<ChapterId, SubtopicId> = {
  ch1: 'ch1-principles',
  ch2: 'ch2-nations',
  ch3: 'ch3-modern-britain',
  ch4: 'ch4-religion-customs',
  ch5: 'ch5-parliament-elections',
};

function normalizeChapterId(raw: unknown): ChapterId {
  if (typeof raw === 'string') {
    const trimmed = raw.trim().toLowerCase();
    if (VALID_CHAPTERS.has(trimmed as ChapterId)) {
      return trimmed as ChapterId;
    }
    if (/^[1-5]$/.test(trimmed)) {
      return `ch${trimmed}` as ChapterId;
    }
  }
  if (typeof raw === 'number' && raw >= 1 && raw <= 5) {
    return `ch${raw}` as ChapterId;
  }
  return 'ch3';
}

function stableSlugHash(text: string): string {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

export interface ImportResult {
  readonly records: CustomContentRecord[];
  readonly flashcardsAdded: number;
  readonly questionsAdded: number;
  readonly warnings: string[];
}

/**
 * Fetches a remote JSON/CSV pack URL once and parses it into validated CustomContentRecord rows.
 */
export async function fetchAndParseRemotePack(
  url: string,
  defaultChapter: ChapterId = 'ch3',
  fetchImpl: FetchLike = fetch,
): Promise<ImportResult> {
  const trimmedUrl = url.trim();
  if (!trimmedUrl.startsWith('https://')) {
    return {
      records: [],
      flashcardsAdded: 0,
      questionsAdded: 0,
      warnings: ['URL must start with https://'],
    };
  }

  const response = await fetchImpl(trimmedUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch pack (${response.status})`);
  }
  const rawText = await response.text();
  return parseImportedContent(rawText, defaultChapter);
}

/**
 * Parses JSON or CSV/TSV text into validated CustomContentRecord items.
 */
export function parseImportedContent(
  rawText: string,
  defaultChapter: ChapterId = 'ch3',
  nowIso: string = new Date().toISOString(),
): ImportResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { records: [], flashcardsAdded: 0, questionsAdded: 0, warnings: ['Empty input.'] };
  }

  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    return parseJsonImport(trimmed, defaultChapter, nowIso);
  }
  return parseDelimitedImport(trimmed, defaultChapter, nowIso);
}

function parseJsonImport(
  jsonText: string,
  defaultChapter: ChapterId,
  nowIso: string,
): ImportResult {
  const warnings: string[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err) {
    return {
      records: [],
      flashcardsAdded: 0,
      questionsAdded: 0,
      warnings: [`Invalid JSON: ${(err as Error).message}`],
    };
  }

  // Unwrap `{ questions: [...] }`, `{ exams: [...] }`, `{ exam_1: [...] }`, or flat array
  let items: Record<string, unknown>[] = [];
  if (Array.isArray(parsed)) {
    // Check if array of exam objects `[{ exam: 1, questions: [...] }]` vs flat array of questions
    const looksLikeExamWrappers =
      parsed.length > 0 &&
      parsed.every(
        (el) =>
          el &&
          typeof el === 'object' &&
          Array.isArray((el as Record<string, unknown>)['questions']),
      );
    if (looksLikeExamWrappers) {
      parsed.forEach((ex, exIdx) => {
        const exObj = ex as Record<string, unknown>;
        const exNum =
          typeof exObj['examNumber'] === 'number'
            ? exObj['examNumber']
            : typeof exObj['id'] === 'number'
              ? exObj['id']
              : exIdx + 1;
        for (const q of exObj['questions'] as unknown[]) {
          if (q && typeof q === 'object') {
            items.push({ ...(q as Record<string, unknown>), examNumber: exNum });
          }
        }
      });
    } else {
      items = parsed.filter((x): x is Record<string, unknown> => Boolean(x && typeof x === 'object'));
    }
  } else if (parsed && typeof parsed === 'object') {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj['items'])) {
      items = obj['items'] as Record<string, unknown>[];
    } else if (Array.isArray(obj['questions'])) {
      items = obj['questions'] as Record<string, unknown>[];
    } else if (Array.isArray(obj['flashcards'])) {
      items = obj['flashcards'] as Record<string, unknown>[];
    } else if (Array.isArray(obj['exams'])) {
      (obj['exams'] as unknown[]).forEach((ex, exIdx) => {
        if (ex && typeof ex === 'object') {
          const exObj = ex as Record<string, unknown>;
          const exNum =
            typeof exObj['examNumber'] === 'number'
              ? exObj['examNumber']
              : typeof exObj['id'] === 'number'
                ? exObj['id']
                : exIdx + 1;
          if (Array.isArray(exObj['questions'])) {
            for (const q of exObj['questions'] as unknown[]) {
              if (q && typeof q === 'object') {
                items.push({ ...(q as Record<string, unknown>), examNumber: exNum });
              }
            }
          }
        }
      });
    }
  }

  const records: CustomContentRecord[] = [];
  let flashcardsAdded = 0;
  let questionsAdded = 0;

  items.forEach((row, idx) => {
    const chapterId = row['chapterId']
      ? normalizeChapterId(row['chapterId'])
      : row['chapter']
        ? normalizeChapterId(row['chapter'])
        : defaultChapter;
    const subtopicId =
      typeof row['subtopicId'] === 'string' && row['subtopicId'].startsWith(chapterId)
        ? (row['subtopicId'] as SubtopicId)
        : DEFAULT_SUBTOPIC_FOR_CHAPTER[chapterId];

    // Check if flashcard (`front` & `back`)
    if (typeof row['front'] === 'string' && typeof row['back'] === 'string') {
      const front = row['front'].trim();
      const back = row['back'].trim();
      if (!front || !back) return;
      const id =
        typeof row['id'] === 'string' && row['id'].trim()
          ? `custom-fc-${row['id'].trim()}`
          : `custom-fc-${stableSlugHash(front + back)}`;
      const card: Flashcard = {
        id,
        chapterId,
        subtopicId,
        front,
        back,
        memoryHook:
          typeof row['memoryHook'] === 'string' && row['memoryHook'].trim()
            ? row['memoryHook'].trim()
            : 'Custom deck card: lock this key fact in!',
        isCustom: true,
      };
      records.push({
        itemId: id,
        kind: 'flashcard',
        chapterId,
        subtopicId,
        payloadJson: JSON.stringify(card),
        active: true,
        updatedAt: nowIso,
      });
      flashcardsAdded += 1;
      return;
    }

    // Check if question (`prompt` or `question` + `options` or `choices`)
    const promptRaw = row['prompt'] ?? row['question'];
    const optionsRaw = row['options'] ?? row['choices'] ?? row['answers'];
    if (typeof promptRaw === 'string' && Array.isArray(optionsRaw) && optionsRaw.length >= 2) {
      const prompt = promptRaw.trim();
      const options = optionsRaw.map((o) => String(o).trim()).filter(Boolean);
      if (!prompt || options.length < 2) return;

      let correctIndices: number[] = [];
      if (Array.isArray(row['correctIndices'])) {
        correctIndices = row['correctIndices']
          .map(Number)
          .filter((n) => Number.isInteger(n) && n >= 0 && n < options.length);
      } else if (Array.isArray(row['answer'])) {
        for (const a of row['answer'] as unknown[]) {
          if (typeof a === 'number' && a >= 0 && a < options.length) {
            correctIndices.push(a);
          } else if (typeof a === 'string') {
            const mIdx = options.findIndex(
              (o) => o.toLowerCase() === a.trim().toLowerCase(),
            );
            if (mIdx >= 0) correctIndices.push(mIdx);
          }
        }
      } else if (typeof row['correctIndex'] === 'number') {
        correctIndices = [row['correctIndex']];
      } else if (typeof row['answer'] === 'number') {
        correctIndices = [row['answer']];
      } else if (typeof row['answer'] === 'string') {
        const matchIdx = options.findIndex(
          (o) => o.toLowerCase() === String(row['answer']).trim().toLowerCase(),
        );
        if (matchIdx >= 0) correctIndices = [matchIdx];
      }

      if (correctIndices.length === 0) {
        warnings.push(`Skipped question #${idx + 1}: missing valid correct answer index.`);
        return;
      }

      const qType: QuestionType =
        correctIndices.length > 1
          ? 'multiple'
          : options.length === 2 && options.some((o) => /^(true|yes)$/i.test(o))
            ? 'boolean'
            : 'single';

      const assignedExamNum =
        typeof row['examNumber'] === 'number' && row['examNumber'] > 0
          ? row['examNumber']
          : Math.floor(questionsAdded / 24) + 1;

      const id =
        typeof row['id'] === 'string' && row['id'].trim()
          ? `custom-q-${row['id'].trim()}`
          : `custom-q-${stableSlugHash(`${assignedExamNum}:${prompt}`)}`;

      const question: PracticeQuestion = {
        id,
        examNumber: assignedExamNum,
        chapterId,
        subtopicId,
        type: qType,
        prompt,
        options,
        correctIndices,
        explanation:
          typeof row['explanation'] === 'string' && row['explanation'].trim()
            ? row['explanation'].trim()
            : `Correct answer: ${correctIndices.map((i) => options[i]).join(', ')}.`,
        memoryHook:
          typeof row['memoryHook'] === 'string' && row['memoryHook'].trim()
            ? row['memoryHook'].trim()
            : 'Imported pack practice: spot the keyword and lock it in!',
        isCustom: true,
      };

      records.push({
        itemId: id,
        kind: 'question',
        chapterId,
        subtopicId,
        payloadJson: JSON.stringify(question),
        active: true,
        updatedAt: nowIso,
      });
      questionsAdded += 1;
      return;
    }

    warnings.push(`Skipped item #${idx + 1}: unrecognized schema.`);
  });

  return { records, flashcardsAdded, questionsAdded, warnings };
}

function parseDelimitedImport(
  text: string,
  defaultChapter: ChapterId,
  nowIso: string,
): ImportResult {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith('#'));
  const records: CustomContentRecord[] = [];
  const warnings: string[] = [];
  let flashcardsAdded = 0;

  lines.forEach((line, idx) => {
    const delimiter = line.includes('\t') ? '\t' : ',';
    const cols = splitDelimitedLine(line, delimiter);
    if (idx === 0 && /^front|question$/i.test(cols[0] ?? '')) {
      return;
    }
    const front = (cols[0] ?? '').trim();
    const back = (cols[1] ?? '').trim();
    if (!front || !back) {
      warnings.push(`Skipped line #${idx + 1}: expected Front and Back columns.`);
      return;
    }
    const hook = (cols[2] ?? '').trim() || 'Custom flashcard: keep the Spice streak going!';
    const chapterId = cols[3] ? normalizeChapterId(cols[3]) : defaultChapter;
    const subtopicId = DEFAULT_SUBTOPIC_FOR_CHAPTER[chapterId];
    const id = `custom-fc-${stableSlugHash(front + back)}`;

    const card: Flashcard = {
      id,
      chapterId,
      subtopicId,
      front,
      back,
      memoryHook: hook,
      isCustom: true,
    };

    records.push({
      itemId: id,
      kind: 'flashcard',
      chapterId,
      subtopicId,
      payloadJson: JSON.stringify(card),
      active: true,
      updatedAt: nowIso,
    });
    flashcardsAdded += 1;
  });

  return { records, flashcardsAdded, questionsAdded: 0, warnings };
}

function splitDelimitedLine(line: string, delimiter: string): string[] {
  const out: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!;
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      out.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  out.push(current);
  return out;
}

export function hydrateCustomContent(records: readonly CustomContentRecord[]): {
  flashcards: Flashcard[];
  questions: PracticeQuestion[];
} {
  const flashcards: Flashcard[] = [];
  const questions: PracticeQuestion[] = [];

  for (const r of records) {
    if (!r.active) continue;
    try {
      const obj = JSON.parse(r.payloadJson);
      if (r.kind === 'flashcard') {
        flashcards.push(obj as Flashcard);
      } else if (r.kind === 'question') {
        questions.push(obj as PracticeQuestion);
      }
    } catch {
      // Ignore malformed custom record
    }
  }

  return { flashcards, questions };
}
