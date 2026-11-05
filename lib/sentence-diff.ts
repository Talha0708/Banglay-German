/**
 * Sentence normalization and comparison logic for German typing exercises.
 * Tolerant of:
 * - Leading/trailing and multiple internal spaces
 * - German punctuation (.,?!:;)
 * - Case differences (optional / soft warning)
 * - ß <-> ss equivalency (e.g. "heißt" vs "heisst")
 * - ä <-> ae, ö <-> oe, ü <-> ue equivalency for mobile keyboards without umlauts
 */

export function normalizeGerman(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[.,?!:;'"()\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue');
}

export function isAnswerCorrect(
  userInput: string,
  targetAnswer: string,
  acceptedAnswers: string[] = []
): { isCorrect: boolean; isExact: boolean } {
  const normUser = normalizeGerman(userInput);
  const normTarget = normalizeGerman(targetAnswer);
  const isExact = userInput.trim() === targetAnswer.trim();

  if (normUser === normTarget) {
    return { isCorrect: true, isExact };
  }

  for (const alt of acceptedAnswers) {
    if (normalizeGerman(alt) === normUser) {
      return { isCorrect: true, isExact: userInput.trim() === alt.trim() };
    }
  }

  return { isCorrect: false, isExact: false };
}

export interface DiffPart {
  type: 'match' | 'added' | 'missing' | 'changed';
  text: string;
}

/**
 * Computes word-level diff between user input and target German sentence
 */
export function computeSentenceDiff(userInput: string, targetAnswer: string): DiffPart[] {
  const userWords = userInput.trim().split(/\s+/).filter(Boolean);
  const targetWords = targetAnswer.trim().split(/\s+/).filter(Boolean);

  const diff: DiffPart[] = [];
  const maxLen = Math.max(userWords.length, targetWords.length);

  for (let i = 0; i < maxLen; i++) {
    const u = userWords[i];
    const t = targetWords[i];

    if (u && t) {
      if (normalizeGerman(u) === normalizeGerman(t)) {
        diff.push({ type: 'match', text: t });
      } else {
        diff.push({ type: 'changed', text: `${u} → ${t}` });
      }
    } else if (t) {
      diff.push({ type: 'missing', text: t });
    } else if (u) {
      diff.push({ type: 'added', text: u });
    }
  }

  return diff;
}
