import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSM2, createInitialCard, isDue, DEFAULT_EASE_FACTOR } from './srs';
import { SRSCard } from '../types/srs';

test('createInitialCard initializes defaults properly', () => {
  const card = createInitialCard({
    id: 'w_hallo',
    type: 'word',
    front: 'Hallo',
    back: 'হ্যালো',
  });

  assert.equal(card.repetitions, 0);
  assert.equal(card.interval, 0);
  assert.equal(card.easeFactor, DEFAULT_EASE_FACTOR);
  assert.equal(isDue(card), true);
});

test('calculateSM2 resets repetitions on grade < 3', () => {
  const baseCard: SRSCard = {
    id: 'test',
    type: 'word',
    front: 'Danke',
    back: 'ধন্যবাদ',
    repetitions: 4,
    interval: 15,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
  };

  const updated = calculateSM2(baseCard, 2);
  assert.equal(updated.repetitions, 0);
  assert.equal(updated.interval, 1);
  assert.ok(updated.easeFactor < 2.5, 'Ease factor should drop on poor grade');
});

test('calculateSM2 handles first correct step (rep 0 -> interval 1)', () => {
  const baseCard = createInitialCard({
    id: 'test',
    type: 'word',
    front: 'Tschüss',
    back: 'বিদায়',
  });

  const updated = calculateSM2(baseCard, 4);
  assert.equal(updated.repetitions, 1);
  assert.equal(updated.interval, 1);
});

test('calculateSM2 handles second correct step (rep 1 -> interval 6)', () => {
  const baseCard: SRSCard = {
    id: 'test',
    type: 'word',
    front: 'Tschüss',
    back: 'বিদায়',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
  };

  const updated = calculateSM2(baseCard, 4);
  assert.equal(updated.repetitions, 2);
  assert.equal(updated.interval, 6);
});

test('calculateSM2 handles subsequent steps multiplying by EF', () => {
  const baseCard: SRSCard = {
    id: 'test',
    type: 'word',
    front: 'Wasser',
    back: 'পানি',
    repetitions: 2,
    interval: 6,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
  };

  const updated = calculateSM2(baseCard, 5); // perfect
  assert.equal(updated.repetitions, 3);
  assert.equal(updated.interval, 15); // 6 * 2.5 = 15
  assert.ok(updated.easeFactor >= 2.5);
});
