import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_WORDS, getTopics, getNouns, getVerbs } from '../data/vocabulary';

test('Vocabulary dataset contains over 1,200 CEFR A1 words', () => {
  assert.ok(ALL_WORDS.length >= 1200, `Expected at least 1200 words, got ${ALL_WORDS.length}`);
});

test('All words conform to required schema and quality standards', () => {
  const allowedArticles = new Set(['der', 'die', 'das', null]);
  for (const w of ALL_WORDS) {
    assert.ok(w.id, 'Word missing id');
    assert.ok(w.german, `Word ${w.id} missing german text`);
    assert.ok(w.bengali, `Word ${w.id} missing bengali translation`);
    assert.ok(w.english, `Word ${w.id} missing english translation`);
    assert.ok(w.pronunciationBn, `Word ${w.id} missing Bengali pronunciation guide`);
    assert.ok(w.topic, `Word ${w.id} missing topic`);
    assert.strictEqual(w.level, 'A1');
    assert.ok(allowedArticles.has(w.article), `Invalid article ${w.article} on word ${w.id}`);

    if (w.pos === 'noun') {
      assert.ok(['der', 'die', 'das'].includes(w.article || ''), `Noun ${w.german} (${w.id}) missing der/die/das article`);
    }
  }
});

test('16 topic categories are properly registered with words', () => {
  const topics = getTopics();
  assert.strictEqual(topics.length, 16, `Expected 16 topics, got ${topics.length}`);
  for (const t of topics) {
    assert.ok(t.count > 0, `Topic ${t.id} has 0 words`);
  }
});

test('Noun and verb helper queries function properly', () => {
  const nouns = getNouns();
  const verbs = getVerbs();
  assert.ok(nouns.length >= 400, `Expected at least 400 nouns, got ${nouns.length}`);
  assert.ok(verbs.length >= 100, `Expected at least 100 verbs, got ${verbs.length}`);
});
