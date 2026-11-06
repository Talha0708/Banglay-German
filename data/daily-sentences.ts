// data/daily-sentences.ts
import dailyData from './daily-sentences.json';

export interface DailySentence {
  id: string;
  category_id: string;
  category_bn: string;
  category_de: string;
  category_icon: string;
  de: string;
  bn: string;
  pronunciation_bn: string;
  highlight_de: string;
  note_bn: string;
  level: string;
}

export interface SentenceCategory {
  id: string;
  name_bn: string;
  name_de: string;
  icon: string;
}

export const DAILY_SENTENCES: DailySentence[] = dailyData.sentences as DailySentence[];
export const SENTENCE_CATEGORIES: SentenceCategory[] = dailyData.categories as SentenceCategory[];

export function getSentencesByCategory(categoryId?: string): DailySentence[] {
  if (!categoryId || categoryId === 'all') return DAILY_SENTENCES;
  return DAILY_SENTENCES.filter((s) => s.category_id === categoryId);
}

export function searchDailySentences(query: string, categoryId?: string): DailySentence[] {
  const q = query.trim().toLowerCase();
  const pool = getSentencesByCategory(categoryId);
  if (!q) return pool;

  return pool.filter((s) => {
    return (
      s.de.toLowerCase().includes(q) ||
      s.bn.toLowerCase().includes(q) ||
      s.pronunciation_bn.toLowerCase().includes(q) ||
      s.category_bn.toLowerCase().includes(q) ||
      s.note_bn.toLowerCase().includes(q)
    );
  });
}
