/**
 * External Deck & Standard 18-Exam Bank Importer.
 * Parses:
 * - Standard community `exams.json` (`{ exams: { "1": [{ id, question, reference, answers: [{ text, isCorrect }] }] } }`)
 * - Array/wrapper JSON (`{ exams: [{ id, questions }] }` or flat arrays)
 * - CSV / TSV Anki-style flashcard exports
 */

import type {
  ChapterId,
  CustomContentRecord,
  Flashcard,
  PracticeQuestion,
  QuestionType,
  SubtopicId,
  VisualAidId,
} from '../types/domain';
import type { FetchLike } from './sync';

export const STANDARD_18_EXAMS_URL =
  'https://raw.githubusercontent.com/DHKLeung/life-in-the-uk-test/master/exams.json';

const VALID_CHAPTERS = new Set<ChapterId>(['ch1', 'ch2', 'ch3', 'ch4', 'ch5']);

const DEFAULT_SUBTOPIC_FOR_CHAPTER: Record<ChapterId, SubtopicId> = {
  ch1: 'ch1-principles',
  ch2: 'ch2-nations',
  ch3: 'ch3-modern-britain',
  ch4: 'ch4-religion-customs',
  ch5: 'ch5-parliament-elections',
};

function sanitizeText(s: string): string {
  return s.replace(/\u00a0/g, ' ').replace(/\s*—\s*/g, ': ').trim();
}

function classifyQuestionTaxonomy(text: string): {
  chapterId: ChapterId;
  subtopicId: SubtopicId;
  visualId?: VisualAidId;
} {
  const t = text.toLowerCase();

  if (/\bunion flag\b|\bunion jack\b|\bst george\b.*\bcross\b|\bwelsh dragon\b/.test(t)) {
    return { chapterId: 'ch2', subtopicId: 'ch2-symbols', visualId: 'union-jack' };
  }
  if (/\bpatron saint\b|\bst david\b|\bst patrick\b|\bst andrew\b|\bthistle\b|\bdaffodil\b|\bshamrock\b|\btudor rose\b/.test(t)) {
    return { chapterId: 'ch2', subtopicId: 'ch2-symbols', visualId: 'national-emblems' };
  }
  if (/\bcrown dependenc|\bchannel islands|\bisle of man|\btynwald|\boverseas territor|\bfalkland|\bgibraltar|\bst helena/.test(t)) {
    return { chapterId: 'ch2', subtopicId: 'ch2-territories', visualId: 'uk-map' };
  }
  if (/\bgreat britain\b|\bcapital city\b|\bbelfast\b|\bcardiff\b|\bedinburgh\b|\bjohn o'groats\b|\bland's end\b/.test(t)) {
    return { chapterId: 'ch2', subtopicId: 'ch2-nations', visualId: 'uk-map' };
  }

  if (/\boath of allegiance\b|\bcitizenship ceremony\b|\b24 questions\b|\bpermanent resident\b/.test(t)) {
    return { chapterId: 'ch1', subtopicId: 'ch1-citizenship' };
  }
  if (/\bfundamental principle|\brule of law\b|\btolerance\b|\bindividual liberty\b|\bforced marriage\b|\bfgm\b/.test(t)) {
    return { chapterId: 'ch1', subtopicId: 'ch1-principles' };
  }

  if (/\bsenedd\b|\bstormont\b|\bholyrood\b|\bscottish parliament\b|\bwelsh parliament\b|\bnorthern ireland assembly\b|\bdevolved\b|\bcommonwealth\b|\bunited nations\b|\bnato\b|\bcouncil of europe\b/.test(t)) {
    return { chapterId: 'ch5', subtopicId: 'ch5-devolution', visualId: 'parliament-courts' };
  }
  if (/\bmagistrates\b|\bcrown court\b|\bsheriff court\b|\bsmall claims\b|\byouth court\b|\bjury\b|\bpolice\b|\bnational lottery\b|\bmot\b|\btv licence\b|\bcouncil tax\b|\bnational insurance\b|\bschool governor/.test(t)) {
    return { chapterId: 'ch5', subtopicId: 'ch5-courts-police-role', visualId: 'parliament-courts' };
  }
  if (/\bhouse of commons\b|\bhouse of lords\b|\b650\b|\bfirst past the post\b|\bprime minister\b|\bcabinet\b|\bshadow cabinet\b|\bspeaker\b|\bhansard\b|\bby-election\b|\bgeneral election\b|\belectoral register\b/.test(t)) {
    return { chapterId: 'ch5', subtopicId: 'ch5-parliament-elections', visualId: 'parliament-courts' };
  }
  if (/\bconstitutional monarchy\b|\bunwritten constitution\b|\bhead of state\b|\bking's speech\b|\bqueen's speech\b|\broyal assent\b/.test(t)) {
    return { chapterId: 'ch5', subtopicId: 'ch5-democracy-constitution', visualId: 'parliament-courts' };
  }

  if (/\bolympic|\bparalympic|\bwimbledon|\bsix nations|\bgrand national|\broyal ascot|\bworld cup|\bbobby moore|\bbannister|\bchris hoy|\bmo farah|\bandy murray|\bredgrave|\btorvill|\bwiggins|\bennis|\bgolf\b|\brugby\b|\bcricket\b/.test(t)) {
    return { chapterId: 'ch4', subtopicId: 'ch4-sports' };
  }
  if (/\bdiwali\b|\beid\b|\bhanukkah\b|\bvaisakhi\b|\bhogmanay\b|\bbonfire night\b|\bremembrance day\b|\blent\b|\beaster\b|\bchristmas\b|\bboxing day\b|\bvalentine|\bapril fool|\bchurch of england\b|\bchurch of scotland\b|\bpresbyterian\b/.test(t)) {
    return { chapterId: 'ch4', subtopicId: 'ch4-religion-customs' };
  }
  if (/\beden project\b|\bgiant's causeway\b|\blake district\b|\bsnowdonia\b|\bloch lomond\b|\bbig ben\b|\belizabeth tower\b|\blondon eye\b|\bnational trust\b/.test(t)) {
    return { chapterId: 'ch4', subtopicId: 'ch4-landmarks', visualId: 'uk-map' };
  }
  if (/\bnovel|\bpoet|\bpainter|\bsculptor|\barchitect|\bcomposer|\btheatre|\bbooker prize|\bturner prize|\bmercury prize|\bolivier|\bbrit awards|\bbafta|\bproms\b|\binvented\b|\bjet engine\b|\bradar\b|\bworld wide web\b|\bdolly the sheep\b|\bhovercraft\b/.test(t)) {
    return { chapterId: 'ch4', subtopicId: 'ch4-arts-culture' };
  }

  if (/\bstone age\b|\bskara brae\b|\bstonehenge\b|\bbronze age\b|\biron age\b|\bjulius caesar\b|\bclaudius\b|\bboudicca\b|\bhadrian's wall\b|\broman/.test(t)) {
    return { chapterId: 'ch3', subtopicId: 'ch3-early-roman', visualId: 'history-timeline' };
  }
  if (/\banglo-saxon|\bsutton hoo|\bst augustine|\bst columba|\bviking|\bdanelaw|\balfred the great|\b1066\b|\bhastings\b|\bwilliam the conqueror|\bbayeux|\bdomesday/.test(t)) {
    return { chapterId: 'ch3', subtopicId: 'ch3-anglo-norman', visualId: 'history-timeline' };
  }
  if (/\b1215\b|\bmagna carta\b|\bbannockburn\b|\brobert the bruce\b|\bblack death\b|\b1348\b|\bhundred years|\bagincourt\b|\bwars of the roses\b|\bbosworth\b|\bchaucer\b|\bcaxton\b/.test(t)) {
    return { chapterId: 'ch3', subtopicId: 'ch3-middle-ages', visualId: 'history-timeline' };
  }
  if (/\bhenry viii\b|\banne boleyn\b|\belizabeth i\b|\bspanish armada\b|\b1588\b|\bshakespeare\b|\bgunpowder plot\b|\bcharles i\b|\bcavaliers\b|\broundheads\b|\bcromwell\b|\brestoration\b|\bgreat fire\b|\b1666\b|\bglorious revolution\b|\b1688\b|\bbill of rights\b/.test(t)) {
    return { chapterId: 'ch3', subtopicId: 'ch3-tudors-stuarts', visualId: 'history-timeline' };
  }
  if (/\b1707\b|\bact of union\b|\bwalpole\b|\bculloden\b|\bindustrial revolution\b|\barkwright\b|\bjames watt\b|\bbrunel\b|\bwilberforce\b|\bslave|\btrafalgar\b|\bnelson\b|\bwaterloo\b|\bwellington\b|\bqueen victoria\b|\bcrimean|\bflorence nightingale\b|\bsuffragette|\bpankhurst\b/.test(t)) {
    return { chapterId: 'ch3', subtopicId: 'ch3-empire-industry', visualId: 'history-timeline' };
  }
  if (/\bfirst world war|\bsecond world war|\bsomme\b|\b1918\b|\beaster rising\b|\bfleming\b|\bpenicillin\b|\bchurchill\b|\bdunkirk\b|\bbattle of britain\b|\bblitz\b|\bd-day\b/.test(t)) {
    return { chapterId: 'ch3', subtopicId: 'ch3-world-wars', visualId: 'history-timeline' };
  }

  return { chapterId: 'ch3', subtopicId: 'ch3-modern-britain' };
}

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

export async function fetchAndParseRemotePack(
  url: string,
  defaultChapter: ChapterId = 'ch3',
  fetchImpl: FetchLike = fetch,
  idPrefix: string = 'custom',
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
  return parseImportedContent(rawText, defaultChapter, new Date().toISOString(), idPrefix);
}

export function parseImportedContent(
  rawText: string,
  defaultChapter: ChapterId = 'ch3',
  nowIso: string = new Date().toISOString(),
  idPrefix: string = 'custom',
): ImportResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { records: [], flashcardsAdded: 0, questionsAdded: 0, warnings: ['Empty input.'] };
  }

  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    return parseJsonImport(trimmed, defaultChapter, nowIso, idPrefix);
  }
  return parseDelimitedImport(trimmed, defaultChapter, nowIso, idPrefix);
}

function parseJsonImport(
  jsonText: string,
  defaultChapter: ChapterId,
  nowIso: string,
  idPrefix: string,
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

  let items: Record<string, unknown>[] = [];
  if (Array.isArray(parsed)) {
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
    } else if (obj['exams'] && typeof obj['exams'] === 'object') {
      // Dictionary format `{ exams: { "1": [...], "2": [...] } }`
      const examsDict = obj['exams'] as Record<string, unknown>;
      for (const [examKey, examList] of Object.entries(examsDict)) {
        const exNum = Number(examKey) || 1;
        if (Array.isArray(examList)) {
          for (const q of examList) {
            if (q && typeof q === 'object') {
              items.push({ ...(q as Record<string, unknown>), examNumber: exNum });
            }
          }
        }
      }
    }
  }

  const records: CustomContentRecord[] = [];
  let flashcardsAdded = 0;
  let questionsAdded = 0;

  items.forEach((row, idx) => {
    // Check if flashcard (`front` & `back`)
    if (typeof row['front'] === 'string' && typeof row['back'] === 'string') {
      const front = sanitizeText(row['front']);
      const back = sanitizeText(row['back']);
      if (!front || !back) return;
      const chapterId = row['chapterId']
        ? normalizeChapterId(row['chapterId'])
        : row['chapter']
          ? normalizeChapterId(row['chapter'])
          : defaultChapter;
      const subtopicId =
        typeof row['subtopicId'] === 'string' && row['subtopicId'].startsWith(chapterId)
          ? (row['subtopicId'] as SubtopicId)
          : DEFAULT_SUBTOPIC_FOR_CHAPTER[chapterId];
      const id =
        typeof row['id'] === 'string' && row['id'].trim()
          ? `${idPrefix}-fc-${row['id'].trim()}`
          : `${idPrefix}-fc-${stableSlugHash(front + back)}`;
      const card: Flashcard = {
        id,
        chapterId,
        subtopicId,
        front,
        back,
        memoryHook:
          typeof row['memoryHook'] === 'string' && row['memoryHook'].trim()
            ? sanitizeText(row['memoryHook'])
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

    // Check if question (`prompt` or `question` + `options` / `choices` / `answers`)
    const promptRaw = row['prompt'] ?? row['question'];
    const optionsRaw = row['options'] ?? row['choices'] ?? row['answers'];
    if (typeof promptRaw === 'string' && Array.isArray(optionsRaw) && optionsRaw.length >= 2) {
      const prompt = sanitizeText(promptRaw);
      let options: string[] = [];
      let correctIndices: number[] = [];

      // Support `{ text: string, isCorrect: boolean }[]` option objects!
      const isObjectAnswers =
        typeof optionsRaw[0] === 'object' &&
        optionsRaw[0] !== null &&
        'text' in (optionsRaw[0] as Record<string, unknown>);

      if (isObjectAnswers) {
        optionsRaw.forEach((optObj, optIdx) => {
          const rec = optObj as Record<string, unknown>;
          const txt = sanitizeText(String(rec['text'] ?? ''));
          options.push(txt);
          if (rec['isCorrect'] === true) {
            correctIndices.push(optIdx);
          }
        });
      } else {
        options = optionsRaw.map((o) => sanitizeText(String(o))).filter(Boolean);
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
      }

      if (!prompt || options.length < 2 || correctIndices.length === 0) {
        warnings.push(`Skipped question #${idx + 1}: incomplete prompt/options/answer.`);
        return;
      }

      const refText =
        typeof row['explanation'] === 'string' && row['explanation'].trim()
          ? sanitizeText(row['explanation'])
          : typeof row['reference'] === 'string' && row['reference'].trim()
            ? sanitizeText(row['reference'])
            : '';

      const classified = classifyQuestionTaxonomy(`${prompt} ${refText}`);
      const chapterId = row['chapterId']
        ? normalizeChapterId(row['chapterId'])
        : row['chapter']
          ? normalizeChapterId(row['chapter'])
          : classified.chapterId;
      const subtopicId =
        typeof row['subtopicId'] === 'string' && row['subtopicId'].startsWith(chapterId)
          ? (row['subtopicId'] as SubtopicId)
          : classified.chapterId === chapterId
            ? classified.subtopicId
            : DEFAULT_SUBTOPIC_FOR_CHAPTER[chapterId];

      const qType: QuestionType =
        correctIndices.length > 1
          ? 'multiple'
          : options.length === 2 && options.some((o) => /^(true|false|yes|no)$/i.test(o))
            ? 'boolean'
            : 'single';

      const assignedExamNum =
        typeof row['examNumber'] === 'number' && row['examNumber'] > 0
          ? row['examNumber']
          : Math.floor(questionsAdded / 24) + 1;

      const id = `${idPrefix}-q-ex${String(assignedExamNum).padStart(2, '0')}-${stableSlugHash(prompt)}`;
      const rightSummary = correctIndices.map((i) => options[i]).join(' + ');

      const question: PracticeQuestion = {
        id,
        examNumber: assignedExamNum,
        chapterId,
        subtopicId,
        type: qType,
        prompt:
          qType === 'multiple' && !/choose two|two /i.test(prompt)
            ? `${prompt} (Choose ${correctIndices.length})`
            : prompt,
        options,
        correctIndices,
        explanation: refText || `Correct answer: ${rightSummary}.`,
        memoryHook:
          typeof row['memoryHook'] === 'string' && row['memoryHook'].trim()
            ? sanitizeText(row['memoryHook'])
            : `Lock in the exact match: "${rightSummary}"!`,
        visualId: classified.visualId,
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
  idPrefix: string,
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
    const front = sanitizeText(cols[0] ?? '');
    const back = sanitizeText(cols[1] ?? '');
    if (!front || !back) {
      warnings.push(`Skipped line #${idx + 1}: expected Front and Back columns.`);
      return;
    }
    const hook = sanitizeText(cols[2] ?? '') || 'Custom flashcard: keep the Spice streak going!';
    const chapterId = cols[3] ? normalizeChapterId(cols[3]) : defaultChapter;
    const subtopicId = DEFAULT_SUBTOPIC_FOR_CHAPTER[chapterId];
    const id = `${idPrefix}-fc-${stableSlugHash(front + back)}`;

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
