import { SRSCard, SRSGrade } from '../types/srs';

export const DEFAULT_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

/**
 * Pure function implementing the SM-2 Spaced Repetition Algorithm.
 * @param card Current card state
 * @param grade Score from 1 (complete blackout) to 5 (perfect response)
 * @param now Current date reference (defaults to new Date())
 * @returns Updated card state with new interval, easeFactor, and dueDate
 */
export function calculateSM2(
  card: SRSCard,
  grade: SRSGrade,
  now: Date = new Date()
): SRSCard {
  let repetitions = card.repetitions || 0;
  let interval = card.interval || 0;
  let easeFactor = card.easeFactor || DEFAULT_EASE_FACTOR;

  if (grade < 3) {
    // Incorrect / Reset
    repetitions = 0;
    interval = 1;
  } else {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const qDiff = 5 - grade;
  easeFactor = easeFactor + (0.1 - qDiff * (0.08 + qDiff * 0.02));
  if (easeFactor < MIN_EASE_FACTOR) {
    easeFactor = MIN_EASE_FACTOR;
  }
  // Round ease factor to 2 decimals
  easeFactor = Math.round(easeFactor * 100) / 100;

  // Calculate new due date
  const nextDue = new Date(now.getTime());
  nextDue.setDate(nextDue.getDate() + interval);
  // Set to start of day for clean day-based intervals
  nextDue.setHours(4, 0, 0, 0);

  return {
    ...card,
    repetitions,
    interval,
    easeFactor,
    dueDate: nextDue.toISOString(),
    lastReviewed: now.toISOString(),
  };
}

/**
 * Check if a card is due for review
 */
export function isDue(card: SRSCard, now: Date = new Date()): boolean {
  if (!card.dueDate) return true;
  return new Date(card.dueDate).getTime() <= now.getTime();
}

/**
 * Factory for a new card
 */
export function createInitialCard(
  data: Omit<SRSCard, 'repetitions' | 'interval' | 'easeFactor' | 'dueDate'>
): SRSCard {
  const now = new Date();
  return {
    ...data,
    repetitions: 0,
    interval: 0,
    easeFactor: DEFAULT_EASE_FACTOR,
    dueDate: now.toISOString(),
  };
}
