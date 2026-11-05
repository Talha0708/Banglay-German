export interface SRSCard {
  id: string; // usually word.id or sentence-id
  type: 'word' | 'sentence';
  front: string; // German
  back: string; // Bengali
  pronunciationBn?: string;
  article?: 'der' | 'die' | 'das' | null;
  pos?: string;
  example_de?: string;
  example_bn?: string;
  repetitions: number;
  interval: number; // in days
  easeFactor: number; // starts at 2.5
  dueDate: string; // ISO string
  lastReviewed?: string;
}

export type SRSGrade = 1 | 2 | 3 | 4 | 5;
// 1 = Complete Blackout / Again
// 2 = Incorrect response / Hard
// 3 = Correct response with serious difficulty
// 4 = Correct response after a hesitation / Good
// 5 = Perfect response / Easy
