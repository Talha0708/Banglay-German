import { Word } from '../../types/vocabulary';

import greetings from './greetings.json';
import basicsPersonal from './basics_personal.json';
import familyPeople from './family_people.json';
import homeLiving from './home_living.json';
import foodDrinks from './food_drinks.json';
import dailyRoutineTime from './daily_routine_time.json';
import cityTransportTravel from './city_transport_travel.json';
import workOfficeEducation from './work_office_education.json';
import healthBody from './health_body.json';
import hobbiesLeisureSports from './hobbies_leisure_sports.json';
import clothingShoppingColors from './clothing_shopping_colors.json';
import numbersMoneyQuantities from './numbers_money_quantities.json';
import essentialVerbs from './essential_verbs.json';
import essentialAdjectives from './essential_adjectives.json';
import prepositionsConjunctions from './prepositions_conjunctions.json';
import goetheExamWords from './goethe_exam_words.json';

export interface TopicInfo {
  id: string;
  label_bn: string;
  label_en: string;
  icon: string;
  count: number;
}

export const TOPIC_METADATA: Record<string, { label_bn: string; label_en: string; icon: string }> = {
  greetings: { label_bn: 'শুভেচ্ছা ও শিষ্টাচার', label_en: 'Greetings & Courtesy', icon: '👋' },
  basics_personal: { label_bn: 'মৌলিক কথা ও পরিচয়', label_en: 'Basics & Personal Info', icon: '👤' },
  family_people: { label_bn: 'পরিবার ও মানুষ', label_en: 'Family & People', icon: '👨‍👩‍👦' },
  home_living: { label_bn: 'বাড়ি ও বসবাস', label_en: 'Home & Living', icon: '🏠' },
  food_drinks: { label_bn: 'খাবার ও পানীয়', label_en: 'Food & Drinks', icon: '🍲' },
  daily_routine_time: { label_bn: 'দৈনন্দিন রুটিন ও সময়', label_en: 'Daily Routine & Time', icon: '⏰' },
  city_transport_travel: { label_bn: 'শহর, যাতায়াত ও ভ্রমণ', label_en: 'City, Transport & Travel', icon: '🚆' },
  work_office_education: { label_bn: 'কাজ, অফিস ও শিক্ষা', label_en: 'Work & Education', icon: '💼' },
  health_body: { label_bn: 'স্বাস্থ্য ও শরীর', label_en: 'Health & Body', icon: '🏥' },
  hobbies_leisure_sports: { label_bn: 'শখ, বিনোদন ও খেলাধুলা', label_en: 'Hobbies & Sports', icon: '⚽' },
  clothing_shopping_colors: { label_bn: 'পোশাক, কেনাকাটা ও রং', label_en: 'Clothing & Shopping', icon: '🛍️' },
  numbers_money_quantities: { label_bn: 'সংখ্যা, টাকা ও পরিমাপ', label_en: 'Numbers & Money', icon: '🔢' },
  essential_verbs: { label_bn: 'প্রয়োজনীয় ক্রিয়াপদ (ভার্ব)', label_en: 'Essential Verbs', icon: '⚡' },
  essential_adjectives: { label_bn: 'প্রয়োজনীয় বিশেষণ', label_en: 'Essential Adjectives', icon: '✨' },
  prepositions_conjunctions: { label_bn: 'অব্যয় ও সংযোজক', label_en: 'Prepositions & Connectors', icon: '🔗' },
  goethe_exam_words: { label_bn: 'গ্যোয়েটে A1 পরীক্ষার শব্দসম্ভার', label_en: 'Goethe A1 Exam Words', icon: '🎯' },
};

export const VOCAB_REGISTRY: Record<string, Word[]> = {
  greetings: greetings as unknown as Word[],
  basics_personal: basicsPersonal as unknown as Word[],
  family_people: familyPeople as unknown as Word[],
  home_living: homeLiving as unknown as Word[],
  food_drinks: foodDrinks as unknown as Word[],
  daily_routine_time: dailyRoutineTime as unknown as Word[],
  city_transport_travel: cityTransportTravel as unknown as Word[],
  work_office_education: workOfficeEducation as unknown as Word[],
  health_body: healthBody as unknown as Word[],
  hobbies_leisure_sports: hobbiesLeisureSports as unknown as Word[],
  clothing_shopping_colors: clothingShoppingColors as unknown as Word[],
  numbers_money_quantities: numbersMoneyQuantities as unknown as Word[],
  essential_verbs: essentialVerbs as unknown as Word[],
  essential_adjectives: essentialAdjectives as unknown as Word[],
  prepositions_conjunctions: prepositionsConjunctions as unknown as Word[],
  goethe_exam_words: goetheExamWords as unknown as Word[],
};

// Aggregated flattened list of all 1,400+ Goethe A1 words (1,485 total)
export const ALL_WORDS: Word[] = Object.values(VOCAB_REGISTRY).flat();

export function getAllWords(): Word[] {
  return ALL_WORDS;
}

export function getWordsByTopic(topic: string): Word[] {
  if (topic === 'all') return ALL_WORDS;
  return VOCAB_REGISTRY[topic] || [];
}

export function getTopics(): TopicInfo[] {
  return Object.keys(VOCAB_REGISTRY).map((topicId) => {
    const meta = TOPIC_METADATA[topicId] || {
      label_bn: topicId,
      label_en: topicId,
      icon: '📖',
    };
    return {
      id: topicId,
      label_bn: meta.label_bn,
      label_en: meta.label_en,
      icon: meta.icon,
      count: VOCAB_REGISTRY[topicId]?.length || 0,
    };
  });
}

export function getWordById(id: string): Word | undefined {
  return ALL_WORDS.find((w) => w.id === id);
}

export function searchWords(query: string, topic = 'all'): Word[] {
  const pool = getWordsByTopic(topic);
  if (!query.trim()) return pool;
  const q = query.toLowerCase().trim();
  return pool.filter(
    (w) =>
      w.german.toLowerCase().includes(q) ||
      w.bengali.toLowerCase().includes(q) ||
      w.english.toLowerCase().includes(q) ||
      w.pronunciationBn.toLowerCase().includes(q)
  );
}

export function getNouns(): Word[] {
  return ALL_WORDS.filter((w) => w.pos === 'noun' && (w.article === 'der' || w.article === 'die' || w.article === 'das'));
}

export function getVerbs(): Word[] {
  return ALL_WORDS.filter((w) => w.pos === 'verb');
}

export function getAdjectives(): Word[] {
  return ALL_WORDS.filter((w) => w.pos === 'adjective');
}

export function getRandomWords(count: number, topic = 'all'): Word[] {
  const pool = getWordsByTopic(topic);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
