import test from 'node:test';
import assert from 'node:assert/strict';
import { isAnswerCorrect, normalizeGerman, computeSentenceDiff } from './sentence-diff';

test('normalizeGerman handles ß and ss equivalency', () => {
  assert.equal(normalizeGerman('Ich heiße'), normalizeGerman('Ich heisse'));
});

test('normalizeGerman handles umlauts and extra spaces', () => {
  assert.equal(normalizeGerman('  Guten   Tag!  '), 'guten tag');
  assert.equal(normalizeGerman('Tschüss'), normalizeGerman('Tschuess'));
});

test('isAnswerCorrect accepts punctuation and case tolerance', () => {
  const result = isAnswerCorrect('wie geht es dir?', 'Wie geht es dir?');
  assert.equal(result.isCorrect, true);
  assert.equal(result.isExact, false);
});

test('computeSentenceDiff detects word differences', () => {
  const diff = computeSentenceDiff('Ich heisse Peter', 'Ich heiße Hans');
  assert.equal(diff[0].type, 'match'); // Ich
  assert.equal(diff[1].type, 'match'); // heisse = heiße
  assert.equal(diff[2].type, 'changed'); // Peter -> Hans
});
