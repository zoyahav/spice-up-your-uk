import { describe, expect, it } from 'vitest';
import {
  fetchAndParseRemotePack,
  hydrateCustomContent,
  parseImportedContent,
} from '../contentImporter';

describe('External JSON / CSV / Remote URL Content Importer', () => {
  it('parses open-source exams.json wrapper format preserving examNumber', () => {
    const sampleJson = JSON.stringify({
      exams: [
        {
          id: 1,
          questions: [
            {
              question: 'Who is the patron saint of Wales?',
              options: ['St David', 'St George', 'St Andrew', 'St Patrick'],
              answer: 'St David',
              explanation: 'St David is celebrated on 1 March.',
            },
          ],
        },
      ],
    });

    const result = parseImportedContent(sampleJson, 'ch2');
    expect(result.questionsAdded).toBe(1);
    const hydrated = hydrateCustomContent(result.records);
    expect(hydrated.questions[0]?.examNumber).toBe(1);
    expect(hydrated.questions[0]?.correctIndices).toEqual([0]);
    expect(hydrated.questions[0]?.isCustom).toBe(true);
  });

  it('parses Anki/CSV flashcard lines cleanly', () => {
    const csv = `Front,Back,MemoryHook,Chapter\n"When was the Magna Carta?","1215","12:15 lunch at Runnymede!","3"`;
    const res = parseImportedContent(csv);
    expect(res.flashcardsAdded).toBe(1);
    const hydrated = hydrateCustomContent(res.records);
    expect(hydrated.flashcards[0]?.chapterId).toBe('ch3');
    expect(hydrated.flashcards[0]?.memoryHook).toContain('Runnymede');
  });

  it('fetches and parses remote HTTPS JSON packs', async () => {
    const res = await fetchAndParseRemotePack(
      'https://example.com/exams.json',
      'ch5',
      async () =>
        new Response(
          JSON.stringify([
            {
              prompt: 'How many MPs sit in the House of Commons?',
              options: ['650', '500', '129', '90'],
              correctIndex: 0,
            },
          ]),
          { status: 200 },
        ),
    );
    expect(res.questionsAdded).toBe(1);
  });

  it('parses standard 18-exam dictionary format with object answers and reference text', () => {
    const dictJson = JSON.stringify({
      metadata: { lastUpdated: '2026-03-22' },
      exams: {
        '1': [
          {
            id: 1,
            question: 'What are two responsibilities of UK residents?',
            reference: 'Respect and obey the law and treat others with fairness.',
            answers: [
              { text: 'Respect and obey the law', isCorrect: true },
              { text: 'Treat others with fairness', isCorrect: true },
              { text: 'Buy property', isCorrect: false },
              { text: 'Vote daily', isCorrect: false },
            ],
          },
        ],
      },
    });
    const parsed = parseImportedContent(dictJson, 'ch1', '2026-11-17T00:00:00.000Z', 'std18');
    expect(parsed.questionsAdded).toBe(1);
    const hydrated = hydrateCustomContent(parsed.records);
    expect(hydrated.questions[0]?.id.startsWith('std18-q-ex01-')).toBe(true);
    expect(hydrated.questions[0]?.type).toBe('multiple');
    expect(hydrated.questions[0]?.correctIndices).toEqual([0, 1]);
    expect(hydrated.questions[0]?.explanation).toContain('Respect and obey');
  });
});
