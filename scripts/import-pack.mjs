#!/usr/bin/env node
/**
 * CLI Normalizer for External Life in the UK Question / Flashcard Packs.
 * Usage:
 *   node scripts/import-pack.mjs path/to/input.json path/to/output-pack.json
 */

import fs from 'node:fs';
import path from 'node:path';

const [, , inputPath, outputPath] = process.argv;

if (!inputPath) {
  console.error('Usage: node scripts/import-pack.mjs <input.json|input.csv> [output.json]');
  process.exit(1);
}

const raw = fs.readFileSync(path.resolve(inputPath), 'utf8').trim();
const outFile = outputPath ? path.resolve(outputPath) : path.resolve('normalized-pack.json');

let items = [];
if (raw.startsWith('[') || raw.startsWith('{')) {
  const parsed = JSON.parse(raw);
  items = Array.isArray(parsed)
    ? parsed
    : parsed.questions || parsed.items || parsed.flashcards || [];
} else {
  items = raw
    .split(/\r?\n/)
    .filter((l) => l.trim() && !l.startsWith('#'))
    .map((line) => {
      const sep = line.includes('\t') ? '\t' : ',';
      const [front = '', back = '', memoryHook = ''] = line.split(sep);
      return { front: front.trim(), back: back.trim(), memoryHook: memoryHook.trim() };
    });
}

fs.writeFileSync(outFile, JSON.stringify(items, null, 2), 'utf8');
console.log(`Normalized ${items.length} item(s) -> ${outFile}`);
console.log('Paste the generated JSON into Spice Up Your UK -> Us -> Import Custom Deck!');
