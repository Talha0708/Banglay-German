import { Lesson, Unit, PatternPracticeItem } from '../../types/curriculum';
import level0_1 from './level0_alphabet.json';
import level0_2 from './level0_special_letters.json';
import level0_3 from './level0_combinations.json';
import level0_4 from './level0_numbers.json';
import level0_5 from './level0_time_colors.json';
import unit1 from './unit1_greetings.json';
import unit2 from './unit2_family.json';
import unit3 from './unit3_nouns.json';
import unit4 from './unit4_food.json';
import unit5 from './unit5_routine.json';
import unit6 from './unit6_home.json';
import unit7 from './unit7_hobbies.json';
import unit8 from './unit8_past.json';
import unit9 from './unit9_health.json';
import unit10 from './unit10_writing.json';

export const UNITS: Unit[] = [
  {
    id: 'level_0',
    level: '0',
    title_bn: 'লেভেল ০: একদম বর্ণমালা থেকে শুরু',
    title_en: 'Level 0: Absolute Basics & Phonetics',
    description_bn: 'বর্ণমালা, বিশেষ উমলউট (ä, ö, ü, ß), উচ্চারণসূত্র, সংখ্যা এবং সময়',
    description_en: 'Alphabet, Umlauts, Digraphs, Numbers, Days & Colors',
    color: '#0f766e',
    lessons: [
      level0_1 as unknown as Lesson,
      level0_2 as unknown as Lesson,
      level0_3 as unknown as Lesson,
      level0_4 as unknown as Lesson,
      level0_5 as unknown as Lesson,
    ],
  },
  {
    id: 'unit_1',
    level: '1',
    title_bn: 'ইউনিট ১: শুভেচ্ছা ও আত্মপরিচয়',
    title_en: 'Unit 1: Greetings & Introductions',
    description_bn: 'Hallo, Wie heißt du?, Ich komme aus..., sein ও W-Fragen',
    description_en: 'Greetings, personal pronouns, regular verbs & questions',
    color: '#0284c7',
    lessons: unit1 as unknown as Lesson[],
  },
  {
    id: 'unit_2',
    level: '2',
    title_bn: 'ইউনিট ২: পরিবার ও মানুষ',
    title_en: 'Unit 2: Family & People',
    description_bn: 'haben ক্রিয়ার রূপান্তর, mein / dein ও সম্পর্কের নাম',
    description_en: 'The verb haben, possessive determiners, family members',
    color: '#7c3aed',
    lessons: unit2 as unknown as Lesson[],
  },
  {
    id: 'unit_3',
    level: '3',
    title_bn: 'ইউনিট ৩: বিশেষ্য ও আর্টিকেল',
    title_en: 'Unit 3: Nouns & Articles',
    description_bn: 'der/die/das, বহুবচন, একবচন, ein/kein এবং Akkusativ কারক',
    description_en: 'Grammatical gender, plurals, indefinite articles & Akkusativ',
    color: '#2563eb',
    lessons: unit3 as unknown as Lesson[],
  },
  {
    id: 'unit_4',
    level: '4',
    title_bn: 'ইউনিট ৪: খাবার, পানীয় ও রেস্তোরাঁ',
    title_en: 'Unit 4: Food, Drinks & Shopping',
    description_bn: 'রেস্তোরাঁয় অর্ডার করা, möchten ও mögen ক্রিয়ার ব্যবহার',
    description_en: 'Ordering food, prices, expressing preferences with möchten',
    color: '#d97706',
    lessons: unit4 as unknown as Lesson[],
  },
  {
    id: 'unit_5',
    level: '5',
    title_bn: 'ইউনিট ৫: দৈনন্দিন রুটিন ও সময়',
    title_en: 'Unit 5: Daily Routine & Time',
    description_bn: 'বিভাজ্য ক্রিয়া (Trennbare Verben) ও বাক্যের কাঠামো',
    description_en: 'Separable verbs, daily schedule, time prepositions',
    color: '#059669',
    lessons: unit5 as unknown as Lesson[],
  },
  {
    id: 'unit_6',
    level: '6',
    title_bn: 'ইউনিট ৬: বাড়ি, শহর ও দিকনির্দেশনা',
    title_en: 'Unit 6: Home, City & Directions',
    description_bn: 'দিকনির্দেশনা বলা, স্থানবাচক প্রেপজিশন ও Dativ সূচনা',
    description_en: 'Directions, city locations, transportation & intro to Dativ',
    color: '#4f46e5',
    lessons: unit6 as unknown as Lesson[],
  },
  {
    id: 'unit_7',
    level: '7',
    title_bn: 'ইউনিট ৭: শখ ও মোডাল ভার্ব',
    title_en: 'Unit 7: Hobbies & Modal Verbs',
    description_bn: 'können, müssen, wollen এবং Satzklammer বাক্যের নিয়ম',
    description_en: 'Hobbies, sports, modal verbs & double verb sentence structure',
    color: '#ea580c',
    lessons: unit7 as unknown as Lesson[],
  },
  {
    id: 'unit_8',
    level: '8',
    title_bn: 'ইউনিট ৮: অতীত কাল (Perfekt, war/hatte)',
    title_en: 'Unit 8: Past Tense (Perfekt & war/hatte)',
    description_bn: 'haben/sein সহযোগে Perfekt ও অতীত ঘটনা বর্ণনা',
    description_en: 'Spoken past with Partizip II, simple past of sein & haben',
    color: '#0891b2',
    lessons: unit8 as unknown as Lesson[],
  },
  {
    id: 'unit_9',
    level: '9',
    title_bn: 'ইউনিট ৯: স্বাস্থ্য, কাজ ও আবহাওয়া',
    title_en: 'Unit 9: Health, Work & Weather',
    description_bn: 'ডাক্তারের কাছে যাওয়া, কর্মক্ষেত্র ও আবহাওয়ার বিবরণ',
    description_en: 'Body parts, illness, appointments, travel & climate',
    color: '#0d9488',
    lessons: unit9 as unknown as Lesson[],
  },
  {
    id: 'unit_10',
    level: '10',
    title_bn: 'ইউনিট ১০: চিঠি, ইমেইল ও ফর্ম পূরণ',
    title_en: 'Unit 10: Emails, Forms & Appointments',
    description_bn: 'A1 পরীক্ষার ইমেইল লেখার নিয়ম, ফর্ম পূরণ ও আনুষ্ঠানিক শিষ্টাচার',
    description_en: 'A1 exam writing preparation, formal & informal letters, forms',
    color: '#16a34a',
    lessons: unit10 as unknown as Lesson[],
  },
];

// Ordered linear list of all lessons
export const ALL_LESSONS: Lesson[] = UNITS.flatMap((u) => u.lessons);

export function getAllUnits(): Unit[] {
  return UNITS;
}

export function getAllLessons(): Lesson[] {
  return ALL_LESSONS;
}

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getNextLesson(currentId: string): Lesson | undefined {
  const idx = ALL_LESSONS.findIndex((l) => l.id === currentId);
  if (idx >= 0 && idx < ALL_LESSONS.length - 1) {
    return ALL_LESSONS[idx + 1];
  }
  return undefined;
}

// Map each curriculum unit to its corresponding 1,400+ vocabulary topics
export const UNIT_TOPIC_MAP: Record<string, string[]> = {
  level_0: ['numbers_money_quantities', 'clothing_shopping_colors'],
  unit_1: ['greetings', 'basics_personal'],
  unit_2: ['family_people'],
  unit_3: ['clothing_shopping_colors', 'numbers_money_quantities'],
  unit_4: ['food_drinks'],
  unit_5: ['daily_routine_time'],
  unit_6: ['home_living', 'city_transport_travel'],
  unit_7: ['hobbies_leisure_sports', 'essential_verbs'],
  unit_8: ['essential_verbs', 'essential_adjectives'],
  unit_9: ['health_body', 'work_office_education'],
  unit_10: ['goethe_exam_words', 'prepositions_conjunctions'],
};

export function getUnitTopics(unitId: string): string[] {
  return UNIT_TOPIC_MAP[unitId] || [];
}

export function isLessonUnlocked(lessonId: string, completedLessons: string[]): boolean {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  // First lesson is always unlocked
  if (idx <= 0) return true;
  // Next lesson unlocked strictly if previous lesson is in completed list
  const prevLesson = ALL_LESSONS[idx - 1];
  return completedLessons.includes(prevLesson.id);
}

// Sentence of the Day Pool
export const SENTENCES_OF_THE_DAY = [
  { de: 'Hallo! Wie geht es dir heute?', bn: 'হ্যালো! আজ তুমি কেমন আছো?' },
  { de: 'Ich lerne jeden Tag Deutsch mit Banglay German.', bn: 'আমি প্রতিদিন বাংলায় জার্মান দিয়ে জার্মান শিখি।' },
  { de: 'Übung macht den Meister.', bn: 'অনুশীলনেই দক্ষতা অর্জিত হয় (জার্মান প্রবাদ)।' },
  { de: 'Deutschland ist ein wunderschönes Land.', bn: 'জার্মানি একটি অপূর্ব সুন্দর দেশ।' },
  { de: 'Ich möchte bitte einen Kaffee mit Milch.', bn: 'দয়া করে আমি দুধসহ এক কাপ কফি চাই।' },
  { de: 'Guten Tag! Wie kann ich Ihnen helfen?', bn: 'শুভ দিন! আমি কীভাবে আপনাকে সাহায্য করতে পারি?' },
  { de: 'Ich spreche Bengali und ich lerne Deutsch.', bn: 'আমি বাংলা বলি এবং আমি জার্মান শিখছি।' },
  { de: 'Aller Anfang ist schwer, aber es lohnt sich.', bn: 'শুরুটা কঠিন হলেও এর ফলাফল দারুণ মূল্যবান।' },
  { de: 'Heute ist ein schöner Tag zum Lernen.', bn: 'আজকের দিনটি নতুন কিছু শেখার চমৎকার এক দিন।' },
  { de: 'Mein Ziel ist das Goethe-Zertifikat A1.', bn: 'আমার লক্ষ্য হলো গ্যোয়েটে A1 সার্টিফিকেট অর্জন করা।' },
];

export function getSentenceOfTheDay(): { de: string; bn: string } {
  // Rotate deterministically based on day of the year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % SENTENCES_OF_THE_DAY.length;
  return SENTENCES_OF_THE_DAY[index];
}

// Pattern Practice drills (12 CEFR A1 real-life sentence patterns with rich slot variations)
export const PATTERN_PRACTICE_TEMPLATES: PatternPracticeItem[] = [
  {
    id: 'pat_1',
    category_bn: '১. খাবার ও অর্ডার',
    template_de: 'Ich möchte bitte {slot}.',
    slot_label_bn: 'খাবার বা পানীয়ের নাম',
    translation_template_bn: 'আমি দয়া করে {slot} চাই।',
    options: [
      { word: 'einen Kaffee', meaning_bn: 'একটি কফি' },
      { word: 'ein Glas Wasser', meaning_bn: 'এক গ্লাস পানি' },
      { word: 'einen Tee mit Zitrone', meaning_bn: 'লেবুযুক্ত এক কাপ চা' },
      { word: 'einen Apfelkuchen', meaning_bn: 'একটি আপেল কেক' },
      { word: 'eine Suppe', meaning_bn: 'একটি স্যুপ' },
      { word: 'die Rechnung', meaning_bn: 'বিল' },
    ],
  },
  {
    id: 'pat_2',
    category_bn: '২. দেশ ও উৎস',
    template_de: 'Ich komme aus {slot}.',
    slot_label_bn: 'দেশের নাম',
    translation_template_bn: 'আমি {slot} থেকে এসেছি।',
    options: [
      { word: 'Bangladesch', meaning_bn: 'বাংলাদেশ' },
      { word: 'Deutschland', meaning_bn: 'জার্মানি' },
      { word: 'Indien', meaning_bn: 'ভারত' },
      { word: 'Österreich', meaning_bn: 'অস্ট্রিয়া' },
      { word: 'der Schweiz', meaning_bn: 'সুইজারল্যান্ড' },
      { word: 'Italien', meaning_bn: 'ইতালি' },
    ],
  },
  {
    id: 'pat_3',
    category_bn: '৩. বসবাস ও শহর',
    template_de: 'Ich wohne in {slot}.',
    slot_label_bn: 'শহরের নাম',
    translation_template_bn: 'আমি {slot}-এ বাস করি।',
    options: [
      { word: 'Berlin', meaning_bn: 'বার্লিন' },
      { word: 'Frankfurt', meaning_bn: 'ফ্রাঙ্কফুর্ট' },
      { word: 'München', meaning_bn: 'মিউনিখ' },
      { word: 'Dhaka', meaning_bn: 'ঢাকা' },
      { word: 'Hamburg', meaning_bn: 'হামবুর্গ' },
      { word: 'Köln', meaning_bn: 'কোলন' },
    ],
  },
  {
    id: 'pat_4',
    category_bn: '৪. দক্ষতা ও শখ',
    template_de: 'Ich kann gut {slot}.',
    slot_label_bn: 'দক্ষতা / ক্রিয়া',
    translation_template_bn: 'আমি ভালো {slot} পারি।',
    options: [
      { word: 'Deutsch sprechen', meaning_bn: 'জার্মান বলতে' },
      { word: 'kochen', meaning_bn: 'রান্না করতে' },
      { word: 'schwimmen', meaning_bn: 'সাঁতার কাটতে' },
      { word: 'Auto fahren', meaning_bn: 'গাড়ি চালাতে' },
      { word: 'Gitarre spielen', meaning_bn: 'গিটার বাজাতে' },
      { word: 'Fußball spielen', meaning_bn: 'ফুটবল খেলতে' },
    ],
  },
  {
    id: 'pat_5',
    category_bn: '৫. সম্পদ ও পরিবার',
    template_de: 'Ich habe {slot}.',
    slot_label_bn: 'সম্পদ বা সম্পর্ক',
    translation_template_bn: 'আমার {slot} আছে।',
    options: [
      { word: 'einen Bruder', meaning_bn: 'একজন ভাই' },
      { word: 'eine Schwester', meaning_bn: 'একজন বোন' },
      { word: 'zwei Kinder', meaning_bn: 'দুটি সন্তান' },
      { word: 'eine Frage', meaning_bn: 'একটি প্রশ্ন' },
      { word: 'einen Termin', meaning_bn: 'একটি অ্যাপয়েন্টমেন্ট' },
      { word: 'keine Zeit', meaning_bn: 'কোনো সময় নেই' },
    ],
  },
  {
    id: 'pat_6',
    category_bn: '৬. সপ্তাহের দিন',
    template_de: 'Am {slot} lerne ich Deutsch.',
    slot_label_bn: 'সপ্তাহের দিন',
    translation_template_bn: '{slot} আমি জার্মান শিখি।',
    options: [
      { word: 'Montag', meaning_bn: 'সোমবারে' },
      { word: 'Dienstag', meaning_bn: 'মঙ্গলবারে' },
      { word: 'Mittwoch', meaning_bn: 'বুধবারে' },
      { word: 'Donnerstag', meaning_bn: 'বৃহস্পতিবারে' },
      { word: 'Freitag', meaning_bn: 'শুক্রবারে' },
      { word: 'Wochenende', meaning_bn: 'সাপ্তাহিক ছুটিতে' },
    ],
  },
  {
    id: 'pat_7',
    category_bn: '৭. সময় ও রুটিন',
    template_de: 'Um {slot} stehe ich auf.',
    slot_label_bn: 'সময়',
    translation_template_bn: 'আমি {slot} ঘুম থেকে উঠি।',
    options: [
      { word: '6 Uhr morgens', meaning_bn: 'সকাল ৬টায়' },
      { word: '7 Uhr', meaning_bn: 'সাতটায়' },
      { word: 'halb acht', meaning_bn: 'সাড়ে সাতটায় (৭:৩০)' },
      { word: '8 Uhr', meaning_bn: 'আটটায়' },
      { word: '9 Uhr am Wochenende', meaning_bn: 'ছুটির দিনে ৯টায়' },
      { word: 'zehn Uhr', meaning_bn: 'দশটায়' },
    ],
  },
  {
    id: 'pat_8',
    category_bn: '৮. যাতায়াত (Dativ)',
    template_de: 'Ich fahre mit {slot} zur Arbeit.',
    slot_label_bn: 'যানবাহন (Dativ)',
    translation_template_bn: 'আমি {slot} কাজে যাই।',
    options: [
      { word: 'dem Bus', meaning_bn: 'বাসে করে' },
      { word: 'dem Zug', meaning_bn: 'ট্রেনে করে' },
      { word: 'dem Auto', meaning_bn: 'গাড়িতে করে' },
      { word: 'dem Fahrrad', meaning_bn: 'সাইকেলে করে' },
      { word: 'der U-Bahn', meaning_bn: 'পাতাল রেলে (U-Bahn) করে' },
      { word: 'der Straßenbahn', meaning_bn: 'ট্রামে করে' },
    ],
  },
  {
    id: 'pat_9',
    category_bn: '৯. দিক ও স্থান খোঁজা',
    template_de: 'Wo ist bitte {slot}?',
    slot_label_bn: 'স্থানের নাম',
    translation_template_bn: 'দয়া করে বলবেন {slot} কোথায়?',
    options: [
      { word: 'der Bahnhof', meaning_bn: 'রেল স্টেশন' },
      { word: 'die Apotheke', meaning_bn: 'ফার্মেসি' },
      { word: 'das Hotel', meaning_bn: 'হোটেল' },
      { word: 'die Haltestelle', meaning_bn: 'বাস স্টপ' },
      { word: 'der Supermarkt', meaning_bn: 'সুপারমার্কেট' },
      { word: 'die Toilette', meaning_bn: 'টয়লেট' },
    ],
  },
  {
    id: 'pat_10',
    category_bn: '১০. মোডাল (müssen)',
    template_de: 'Ich muss heute {slot}.',
    slot_label_bn: 'কর্তব্য / কাজ',
    translation_template_bn: 'আমাকে আজ {slot} হবে।',
    options: [
      { word: 'arbeiten', meaning_bn: 'কাজ করতে' },
      { word: 'Deutsch lernen', meaning_bn: 'জার্মান শিখতে' },
      { word: 'einkaufen gehen', meaning_bn: 'কেনাকাটা করতে যেতে' },
      { word: 'meine Hausaufgaben machen', meaning_bn: 'বাড়ির কাজ করতে' },
      { word: 'zum Arzt gehen', meaning_bn: 'ডাক্তারের কাছে যেতে' },
      { word: 'kochen', meaning_bn: 'রান্না করতে' },
    ],
  },
  {
    id: 'pat_11',
    category_bn: '১১. অতীত কাল (Perfekt)',
    template_de: 'Gestern habe ich {slot}.',
    slot_label_bn: 'অতীতের কাজ (Partizip II)',
    translation_template_bn: 'গতকাল আমি {slot}।',
    options: [
      { word: 'Deutsch gelernt', meaning_bn: 'জার্মান শিখেছি' },
      { word: 'viel gearbeitet', meaning_bn: 'অনেক কাজ করেছি' },
      { word: 'Musik gehört', meaning_bn: 'গান শুনেছি' },
      { word: 'Kaffee getrunken', meaning_bn: 'কফি পান করেছি' },
      { word: 'meine Familie angerufen', meaning_bn: 'পরিবারকে ফোন করেছি' },
      { word: 'eingekauft', meaning_bn: 'কেনাকাটা করেছি' },
    ],
  },
  {
    id: 'pat_12',
    category_bn: '১২. কুশল বিনিময়',
    template_de: 'Wie geht es {slot}?',
    slot_label_bn: 'ব্যক্তি (Dativ)',
    translation_template_bn: '{slot} কেমন দিন কাটছে / কেমন আছেন?',
    options: [
      { word: 'dir', meaning_bn: 'তোমার' },
      { word: 'Ihnen', meaning_bn: 'আপনার' },
      { word: 'deiner Familie', meaning_bn: 'তোমার পরিবারের' },
      { word: 'deiner Mutter', meaning_bn: 'তোমার মায়ের' },
      { word: 'deinem Freund', meaning_bn: 'তোমার বন্ধুর' },
      { word: 'euch', meaning_bn: 'তোমাদের' },
    ],
  },
];
