// scripts/build-units-4-to-10.js
// Generates deep, comprehensive A1 curriculum for Units 4 through 10
// 4 lessons per unit, fully aligned with CEFR Goethe A1 standards

const fs = require('fs');
const path = require('path');
const curriculumDir = path.join(__dirname, '../data/curriculum');

function readFirst(fileName) {
  const file = path.join(curriculumDir, fileName);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data) ? data[0] : null;
  }
  return null;
}

// ===========================================================================
// UNIT 4: Essen, Trinken und Bestellen (Lessons 4.1 to 4.4)
// ===========================================================================
const unit4_1 = readFirst('unit4_food.json');
const unit4_lessons = [
  unit4_1,
  {
    id: 'lesson_4_2',
    unitId: 'unit_4',
    title_bn: 'সুপারমার্কেটে কেনাকাটা ও ওজন-পরিমাপ',
    title_en: 'Grocery Shopping, Weights & Quantities',
    subtitle_de: 'Im Supermarkt: Lebensmittel und Mengenangaben',
    order: 19,
    content: {
      intro_bn: 'জার্মানির সুপারমার্কেট বা কাঁচাবাজারে কেনাকাটা করার সময় পরিমাণ ও ওজনবাচক শব্দ জানা দরকার:\n• ein Kilo Äpfel (এক কেজি আপেল)\n• ein Pfund Butter (এক পাউন্ড মাখন = ৫০০ গ্রাম)\n• eine Flasche Wasser (এক বোতল পানি)\n• eine Packung Reis (এক প্যাকেট চাল)\n• eine Dose Tomaten (এক ক্যান টমেটো)\n• ein Stück Käse (এক টুকরো পনির)\nদোকানি জিজ্ঞাসা করবে: "Darf es sonst noch etwas sein?" (আর কিছু লাগবে কি?), উত্তরে বলতে পারেন: "Das ist alles, danke!" (এটুকুই, ধন্যবাদ)।',
      intro_en: 'Learn units of measurement: ein Kilo (a kilo), ein Pfund (500g), eine Flasche (bottle), eine Packung (pack), ein Stück (piece). Helpful phrases: "Sonst noch etwas?" (Anything else?).',
      examples: [
        { de: 'Ich möchte bitte ein Kilo Bananen.', bn: 'আমি দয়া করে এক কেজি কলা চাই।', note: 'ein Kilo' },
        { de: 'Haben Sie frische Milch?', bn: 'আপনাদের কি তাজা দুধ আছে?', note: 'frische Milch' },
        { de: 'Ich nehme ein Stück Käse.', bn: 'আমি এক টুকরো পনির নেব।', note: 'nehmen (নেওয়া)' },
        { de: 'Das ist alles, danke schön!', bn: 'এটুকুই, ধন্যবাদ!', note: 'কেনাকাটা শেষ হলে' }
      ]
    },
    vocabulary: [
      { id: 'v_u4_2_1', german: 'Brot', article: 'das', plural: 'die Brote', pos: 'noun', bengali: 'পাউরুটি', english: 'bread', pronunciationBn: 'ব্রোট', example_de: 'Das Brot ist frisch.', example_bn: 'পাউরুটিটি তাজা।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_2_2', german: 'Milch', article: 'die', plural: null, pos: 'noun', bengali: 'দুধ', english: 'milk', pronunciationBn: 'মিলখ', example_de: 'Ich trinke Kaffee mit Milch.', example_bn: 'আমি দুধসহ কফি খাই।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_2_3', german: 'Käse', article: 'der', plural: null, pos: 'noun', bengali: 'পনির / চিজ', english: 'cheese', pronunciationBn: 'কেজে', example_de: 'Der Käse kommt aus Holland.', example_bn: 'পনিরটি হল্যান্ডের।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_2_4', german: 'Ei', article: 'das', plural: 'die Eier', pos: 'noun', bengali: 'ডিম', english: 'egg', pronunciationBn: 'আই', example_de: 'Zehn Eier bitte.', example_bn: 'দশটি ডিম দিন দয়া করে।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_2_5', german: 'Flasche', article: 'die', plural: 'die Flaschen', pos: 'noun', bengali: 'বোতল', english: 'bottle', pronunciationBn: 'ফ্লাশে', example_de: 'Eine Flasche Orangensaft.', example_bn: 'এক বোতল কমলার রস।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_2_6', german: 'Kilo', article: 'das', plural: 'die Kilos', pos: 'noun', bengali: 'কেজি / কিলোগ্রাম', english: 'kilo', pronunciationBn: 'কিলো', example_de: 'Zwei Kilo Kartoffeln.', example_bn: 'দুই কেজি আলু।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_2_7', german: 'nehmen', article: null, pos: 'verb', bengali: 'নেওয়া', english: 'to take', pronunciationBn: 'নেমেন', example_de: 'Ich nehme den Apfel.', example_bn: 'আমি আপেলটি নিচ্ছি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u4_2_8', german: 'frisch', article: null, pos: 'adj', bengali: 'তাজা / ফ্রেশ', english: 'fresh', pronunciationBn: 'ফ্রিশ', example_de: 'Das Obst ist frisch.', example_bn: 'ফলমূল তাজা।', topic: 'food_drinks', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "'nehmen' অনিয়মিত ক্রিয়ার রূপ",
      title_en: 'Irregular Verb Conjugation: nehmen (e -> i)',
      content_bn: 'nehmen একটি অতি প্রয়োজনীয় অনিয়মিত ক্রিয়া। du এবং er/sie/es এর ক্ষেত্রে এর স্বরবর্ণ e বদলে i হয় এবং ডাবল m হয়:\n• ich nehme\n• du nimmst\n• er/sie/es nimmt\n• wir nehmen\n• ihr nehmt\n• sie/Sie nehmen',
      rule_table: [
        { label: 'ich', value: 'nehme', note: 'স্বাভাবিক' },
        { label: 'du', value: 'nimmst', note: 'e -> i, mm' },
        { label: 'er/sie/es', value: 'nimmt', note: 'e -> i, mm' },
        { label: 'wir', value: 'nehmen', note: 'মূল রূপ' }
      ]
    },
    exercises: [
      {
        id: 'ex_4_2_1',
        type: 'fill_blank',
        prompt_bn: "nehmen ক্রিয়ার রূপ বসান: 'Was ___ du?' (তুমি কী নিচ্ছ?)",
        explanation_bn: "du এর সাথে nehmen ক্রিয়া হয় 'nimmst' (e পরিবর্তিত হয়ে i হয়)।",
        sentenceWithBlank: 'Was ___ du?',
        blankType: 'verb',
        options: ['nimmst', 'nehmst', 'nehme', 'nimmt'],
        correctAnswer: 'nimmst',
        translation_bn: 'তুমি কী নিচ্ছ?'
      },
      {
        id: 'ex_4_2_2',
        type: 'multiple_choice',
        prompt_bn: "সুপারমার্কেটে কেনাকাটা শেষ হলে কী বলতে হয়?",
        explanation_bn: "'Das ist alles, danke!' অর্থ এটুকুই, ধন্যবাদ!",
        question: "কেনাকাটা শেষ হলে প্রচলিত বাক্য কোনটি?",
        options: ['Das ist alles, danke!', 'Ich habe keine Lust.', 'Gute Nacht!', 'Auf Wiederhören.'],
        correctAnswer: 'Das ist alles, danke!'
      },
      {
        id: 'ex_4_2_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আমি দয়া করে এক বোতল পানি চাই।'",
        explanation_bn: 'Ich möchte bitte eine Flasche Wasser.',
        targetSentence: 'Ich möchte bitte eine Flasche Wasser.',
        scrambledWords: ['eine', 'Wasser.', 'möchte', 'Ich', 'bitte', 'Flasche'],
        meaning_bn: 'আমি দয়া করে এক বোতল পানি চাই।'
      },
      {
        id: 'ex_4_2_4',
        type: 'matching_pairs',
        prompt_bn: 'পরিমাপ ও পণ্যের জোড়া মেলান:',
        explanation_bn: 'ein Kilo = এক কেজি, eine Flasche = এক বোতল, ein Stück = এক টুকরো, eine Packung = এক প্যাকেট',
        pairs: [
          { german: 'ein Kilo', bengali: 'এক কেজি' },
          { german: 'eine Flasche', bengali: 'এক বোতল' },
          { german: 'ein Stück', bengali: 'এক টুকরো' },
          { german: 'eine Packung', bengali: 'এক প্যাকেট' }
        ]
      }
    ]
  },
  {
    id: 'lesson_4_3',
    unitId: 'unit_4',
    title_bn: 'möchten ও mögen ক্রিয়ার পার্থক্য ও ব্যবহার',
    title_en: 'Expressing Likes & Wishes (möchten vs mögen)',
    subtitle_de: 'Vorlieben: möchten, mögen und gern',
    order: 20,
    content: {
      intro_bn: 'খাবার বা যেকোনো পছন্দের ক্ষেত্রে möchten, mögen এবং gern এর ব্যবহার অত্যন্ত গুরুত্বপূর্ণ:\n\n১. möchten (চাওয়া / wish - নম্রভাবে কিছু চাওয়া):\n"Ich möchte einen Kaffee." (আমি একটি কফি চাই - অর্ডারের সময় ব্যবহৃত হয়)।\n\n২. mögen (পছন্দ করা / like - সাধারণ পছন্দ):\n"Ich mag Pizza." (আমি পিৎজা পছন্দ করি)।\n"Magst du Tee?" (তুমি কি চা পছন্দ করো?)\n\n৩. gern (আনন্দ সহকারে / gladly):\nকোনো ক্রিয়ার সাথে gern বসালে কাজটি করতে পছন্দ করি বোঝায়:\n"Ich trinke gern Tee." (আমি চা খেতে পছন্দ করি)।\n"Ich koche gern." (আমি রান্না করতে পছন্দ করি)।',
      intro_en: 'Distinguish möchten (polite request: I would like), mögen (general like for nouns: ich mag Schokolade), and the adverb gern (doing activities gladly: ich trinke gern Kaffee).',
      examples: [
        { de: 'Ich möchte bitte bestellen.', bn: 'আমি দয়া করে অর্ডার করতে চাই।', note: 'möchten + Infinitiv' },
        { de: 'Magst du deutschen Käse? - Ja, sehr!', bn: 'তুমি কি জার্মান পনির পছন্দ করো? - হ্যাঁ, অনেক!', note: 'mögen' },
        { de: 'Ich esse gern Fisch mit Reis.', bn: 'আমি ভাতের সাথে মাছ খেতে পছন্দ করি।', note: 'essen gern' },
        { de: 'Wir möchten bezahlen.', bn: 'আমরা বিল দিতে চাই।', note: 'bezahlen (বিল দেওয়া)' }
      ]
    },
    vocabulary: [
      { id: 'v_u4_3_1', german: 'mögen', article: null, pos: 'verb', bengali: 'পছন্দ করা', english: 'to like', pronunciationBn: 'মোগেন', example_de: 'Ich mag Schokolade.', example_bn: 'আমি চকলেট পছন্দ করি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u4_3_2', german: 'möchten', article: null, pos: 'verb', bengali: 'চাওয়া (নম্রভাবে)', english: 'would like', pronunciationBn: 'মোশটেন', example_de: 'Ich möchte schlafen.', example_bn: 'আমি ঘুমাতে চাই।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u4_3_3', german: 'gern', article: null, pos: 'adv', bengali: 'আনন্দের সাথে / পছন্দ করে', english: 'gladly / like to', pronunciationBn: 'গের্ন', example_de: 'Ich schwimme gern.', example_bn: 'আমি সাঁতার কাটতে পছন্দ করি।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u4_3_4', german: 'Fisch', article: 'der', plural: 'die Fische', pos: 'noun', bengali: 'মাছ', english: 'fish', pronunciationBn: 'ফিশ', example_de: 'Der Fisch schmeckt gut.', example_bn: 'মাছটি খেতে সুস্বাদু।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_3_5', german: 'Fleisch', article: 'das', plural: null, pos: 'noun', bengali: 'মাংস', english: 'meat', pronunciationBn: 'ফ্লাইশ', example_de: 'Ich esse kein Fleisch.', example_bn: 'আমি মাংস খাই না।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_3_6', german: 'Gemüse', article: 'das', plural: null, pos: 'noun', bengali: 'শাকসবজি', english: 'vegetables', pronunciationBn: 'গেমুজে', example_de: 'Gemüse ist gesund.', example_bn: 'শাকসবজি স্বাস্থ্যকর।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_3_7', german: 'Obst', article: 'das', plural: null, pos: 'noun', bengali: 'ফলমূল', english: 'fruit', pronunciationBn: 'ওবস্ট', example_de: 'Frisches Obst ist lecker.', example_bn: 'তাজা ফলমূল সুস্বাদু।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_3_8', german: 'lecker', article: null, pos: 'adj', bengali: 'সুস্বাদু / মজাদার', english: 'delicious', pronunciationBn: 'লেকার', example_de: 'Das Essen ist sehr lecker.', example_bn: 'খাবারটি খুব সুস্বাদু।', topic: 'food_drinks', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "'mögen' ক্রিয়ার রূপান্তর চার্ট",
      title_en: 'Conjugation of "mögen"',
      content_bn: 'লক্ষ্য করুন: ich এবং er/sie/es রূপ একই (ich mag, er mag)!',
      rule_table: [
        { label: 'ich', value: 'mag', note: 'Ich mag Tee' },
        { label: 'du', value: 'magst', note: 'Magst du Kaffee?' },
        { label: 'er / sie / es', value: 'mag', note: 'Er mag Pizza' },
        { label: 'wir / sie / Sie', value: 'mögen', note: 'Wir mögen Musik' }
      ]
    },
    exercises: [
      {
        id: 'ex_4_3_1',
        type: 'conjugation_quiz',
        prompt_bn: "'er' (সে) এর সাথে 'mögen' ক্রিয়ার সঠিক রূপ কোনটি?",
        explanation_bn: "er/sie/es এর ক্ষেত্রে mögen এর রূপ হলো 'mag' (ich এবং er এর রূপ হুবহু এক)।",
        verb: 'mögen',
        pronoun: 'er/sie/es',
        meaning_bn: 'সে পছন্দ করে',
        options: ['mag', 'magst', 'mögt', 'mögen'],
        correctAnswer: 'mag'
      },
      {
        id: 'ex_4_3_2',
        type: 'fill_blank',
        prompt_bn: "সঠিক পদটি বসান: 'Ich trinke ___ Tee.' (আমি চা পছন্দ করি / খেতে ভালোবাসি)",
        explanation_bn: 'ক্রিয়ার সাথে পছন্দ প্রকাশে "gern" ব্যবহৃত হয়।',
        sentenceWithBlank: 'Ich trinke ___ Tee.',
        blankType: 'verb',
        options: ['gern', 'mag', 'möchte', 'gut'],
        correctAnswer: 'gern',
        translation_bn: 'আমি চা খেতে পছন্দ করি।'
      },
      {
        id: 'ex_4_3_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'খাবারটি সত্যিই অত্যন্ত সুস্বাদু।'",
        explanation_bn: 'Das Essen ist wirklich sehr lecker.',
        targetSentence: 'Das Essen ist wirklich sehr lecker.',
        scrambledWords: ['sehr', 'Das', 'Essen', 'ist', 'lecker.', 'wirklich'],
        meaning_bn: 'খাবারটি সত্যিই অত্যন্ত সুস্বাদু।'
      }
    ]
  },
  {
    id: 'lesson_4_4',
    unitId: 'unit_4',
    title_bn: 'রেস্তোরাঁয় বিল পরিশোধ ও বকশিশ',
    title_en: 'Paying the Bill & Tipping Culture',
    subtitle_de: 'Die Rechnung bezahlen und Trinkgeld',
    order: 21,
    content: {
      intro_bn: 'জার্মান রেস্তোরাঁয় খাওয়ার পর বিল চাওয়ার সময় বলতে হয়:\n• "Die Rechnung bitte!" (দয়া করে বিল দিন!)\n• "Wir möchten bitte zahlen/bezahlen." (আমরা বিল পরিশোধ করতে চাই।)\n\nওয়েটার এসে দুটি প্রশ্ন করবে:\n১. "Zusammen oder getrennt?" (একসাথে নাকি আলাদা আলাদা পরিশোধ করবেন?)\nজার্মানিতে বন্ধুরা একসাথে খেতে গেলেও প্রত্যেকে নিজের নিজের বিল আলাদা দিতে অভ্যস্ত ("Getrennt bitte!").\n২. "Bar oder mit Karte?" (নগদে নাকি কার্ডে?)\n\nবকশিশ (Trinkgeld) সংস্কৃতি:\nজার্মানিতে সাধারণত ৫% থেকে ১০% বকশিশ রাউন্ড-আপ করে দেওয়া হয় (যেমন বিল ২৩.৫০ ইউরো হলে বলতে হয় "Machen Sie 25 Euro bitte!" বা "Stimmt so!" - ভাংতি ফেরত লাগবে না)।',
      intro_en: 'Request the bill: "Zahlen bitte!" or "Die Rechnung bitte!". Waiters will ask: "Zusammen oder getrennt?" (together or separate?) and "Bar oder mit Karte?". Tip 5-10% by rounding up: "Stimmt so!" (keep the change).',
      examples: [
        { de: 'Entschuldigung, die Rechnung bitte!', bn: 'শুনুন, দয়া করে বিলটি দিন!', note: 'বিল চাওয়া' },
        { de: 'Zusammen oder getrennt? - Getrennt bitte.', bn: 'একসাথে নাকি আলাদা? - আলাদা আলাদা দয়া করে।', note: 'জার্মান সংস্কৃতি' },
        { de: 'Kann ich mit Karte zahlen? - Ja, natürlich.', bn: 'আমি কি কার্ড দিয়ে পরিশোধ করতে পারি? - হ্যাঁ, অবশ্যই।', note: 'mit Karte' },
        { de: 'Das macht 18 Euro. - 20 Euro, stimmt so!', bn: 'মোট ১৮ ইউরো হয়েছে। - ২০ ইউরো রাখুন, ভাংতি লাগবে না!', note: 'Stimmt so! (টিপস)' }
      ]
    },
    vocabulary: [
      { id: 'v_u4_4_1', german: 'Rechnung', article: 'die', plural: 'die Rechnungen', pos: 'noun', bengali: 'বিল / ইনভয়েস', english: 'bill / invoice', pronunciationBn: 'রেশনুং', example_de: 'Bringen Sie mir die Rechnung.', example_bn: 'দয়া করে আমার বিলটি আনুন।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_4_2', german: 'zahlen', article: null, pos: 'verb', bengali: 'পরিশোধ করা / টাকা দেওয়া', english: 'to pay', pronunciationBn: 'ৎসাল্যেন', example_de: 'Wir möchten zahlen.', example_bn: 'আমরা বিল দিতে চাই।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u4_4_3', german: 'getrennt', article: null, pos: 'adj', bengali: 'আলাদা আলাদা / পৃথক', english: 'separately', pronunciationBn: 'গেটরেনট', example_de: 'Wir zahlen getrennt.', example_bn: 'আমরা আলাদা আলাদা বিল দেব।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_4_4', german: 'zusammen', article: null, pos: 'adv', bengali: 'একসাথে', english: 'together', pronunciationBn: 'ৎসুসামেন', example_de: 'Alles zusammen bitte.', example_bn: 'সব মিলিয়ে একসাথে দয়া করে।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u4_4_5', german: 'bar', article: null, pos: 'adv', bengali: 'নগদ টাকায় (Cash)', english: 'in cash', pronunciationBn: 'বার', example_de: 'Ich bezahle bar.', example_bn: 'আমি নগদে পরিশোধ করছি।', topic: 'numbers_money_quantities', level: 'A1' },
      { id: 'v_u4_4_6', german: 'Karte', article: 'die', plural: 'die Karten', pos: 'noun', bengali: 'কার্ড (ক্রেডিট/ডেবিট)', english: 'card', pronunciationBn: 'কার্টে', example_de: 'Zahlen Sie mit Karte?', example_bn: 'আপনি কি কার্ডে পরিশোধ করবেন?', topic: 'numbers_money_quantities', level: 'A1' },
      { id: 'v_u4_4_7', german: 'Trinkgeld', article: 'das', plural: null, pos: 'noun', bengali: 'বকশিশ / টিপস', english: 'tip', pronunciationBn: 'ট্রিংকগেল্ট', example_de: 'Das Trinkgeld ist für Sie.', example_bn: 'এই বকশিশটি আপনার জন্য।', topic: 'numbers_money_quantities', level: 'A1' },
      { id: 'v_u4_4_8', german: 'stimmt so', article: null, pos: 'phrase', bengali: 'ভাংতি লাগবে না / ঠিক আছে', english: 'keep the change', pronunciationBn: 'শ্টিমট জো', example_de: 'Danke, stimmt so!', example_bn: 'ধন্যবাদ, ভাংতি রাখা লাগবে না!', topic: 'food_drinks', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "জার্মানির গোল্ডেন ফ্রেজ: 'Stimmt so!'",
      title_en: 'German Tipping Expression',
      content_bn: 'ওয়েটারকে অতিরিক্ত ভাংতি পয়সা ফেরত দেওয়া থেকে বিরত রাখতে এবং সুন্দরভাবে বকশিশ দিতে বলুন: "Stimmt so!" (ইংরেজির "Keep the change" এর মতো)।',
      rule_table: [
        { label: 'বিল চাওয়া', value: 'Die Rechnung bitte!', note: 'নম্র ও প্রচলিত' },
        { label: 'আলাদা বিল', value: 'Getrennt bitte!', note: 'নিজের খাবার নিজেই পরিশোধ' },
        { label: 'টিপস দেওয়া', value: 'Stimmt so!', note: 'ভাংতি ফেরত না নিয়ে বকশিশ' }
      ]
    },
    exercises: [
      {
        id: 'ex_4_4_1',
        type: 'multiple_choice',
        prompt_bn: "ওয়েটারকে 'ভাংতি ফেরত লাগবে না, বাকিটা বকশিশ রাখুন' বলতে কী বলা হয়?",
        explanation_bn: "'Stimmt so!' অর্থ বাকি টাকা বকশিশ হিসেবে রাখুন।",
        question: "বকশিশ দেওয়ার প্রচলিত অভিব্যক্তি কোনটি?",
        options: ['Stimmt so!', 'Gute Reise!', 'Guten Appetit!', 'Auf Wiedersehen!'],
        correctAnswer: 'Stimmt so!'
      },
      {
        id: 'ex_4_4_2',
        type: 'matching_pairs',
        prompt_bn: 'রেস্তোরাঁর পরিভাষার বাংলা ও জার্মান মেলান:',
        explanation_bn: 'Rechnung = বিল, getrennt = আলাদা, zusammen = একসাথে, bar = নগদ',
        pairs: [
          { german: 'die Rechnung', bengali: 'বিল' },
          { german: 'getrennt', bengali: 'আলাদা আলাদা' },
          { german: 'zusammen', bengali: 'একসাথে' },
          { german: 'bar', bengali: 'নগদ টাকায়' }
        ]
      },
      {
        id: 'ex_4_4_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আমরা দয়া করে আলাদা বিল পরিশোধ করতে চাই।'",
        explanation_bn: 'Wir möchten bitte getrennt zahlen.',
        targetSentence: 'Wir möchten bitte getrennt zahlen.',
        scrambledWords: ['bitte', 'Wir', 'zahlen.', 'getrennt', 'möchten'],
        meaning_bn: 'আমরা দয়া করে আলাদা বিল পরিশোধ করতে চাই।'
      }
    ]
  }
];

fs.writeFileSync(path.join(curriculumDir, 'unit4_food.json'), JSON.stringify(unit4_lessons, null, 2), 'utf8');
console.log('Unit 4 written: 4 lessons');

// ===========================================================================
// UNIT 5: Tagesablauf & Zeit (Lessons 5.1 to 5.4)
// ===========================================================================
const unit5_1 = readFirst('unit5_routine.json');
const unit5_lessons = [
  unit5_1,
  {
    id: 'lesson_5_2',
    unitId: 'unit_5',
    title_bn: 'বিভাজ্য ক্রিয়া (Trennbare Verben)',
    title_en: 'Separable Verbs in Daily Life',
    subtitle_de: 'Trennbare Verben: aufstehen, einkaufen, anrufen',
    order: 23,
    content: {
      intro_bn: 'জার্মান ভাষার সবচেয়ে চমৎকার ও বৈচিত্র্যময় ব্যাকরণ হলো বিভাজ্য ক্রিয়া (Trennbare Verben)। এই ক্রিয়াগুলোর শুরুতে একটি উপসর্গ (Prefix) থাকে (যেমন: auf-, an-, ein-, aus-, mit-)।\n\nম্যাজিক নিয়ম:\nবাক্যে যখন এই ক্রিয়া ব্যবহৃত হয়, মূল ধাতুটি ২য় স্থানে রূপান্তর হয়ে বসে এবং উপসর্গটি ছিটকে গিয়ে বাক্যের একেবারে শেষ শব্দ হিসেবে বসে!\nউদাহরণ:\n• aufstehen (ঘুম থেকে ওঠা) -> Ich stehe um 7 Uhr auf. (auf বাক্যের শেষে!)\n• einkaufen (কেনাকাটা করা) -> Er kauft im Supermarkt ein. (ein বাক্যের শেষে!)\n• anrufen (কাউকে ফোন করা) -> Ich rufe meine Mutter an. (an বাক্যের শেষে!)\n• fernsehen (টিভি দেখা) -> Wir sehen am Abend fern.',
      intro_en: 'Separable verbs split when conjugated in the present tense: the verb stem goes to position 2, and the prefix moves to the very end of the sentence: Ich stehe um 6 Uhr auf.',
      examples: [
        { de: 'Ich stehe jeden Morgen um sechs Uhr auf.', bn: 'আমি প্রতিদিন সকাল ছয়টায় ঘুম থেকে উঠি।', note: 'aufstehen -> stehe ... auf' },
        { de: 'Er kauft am Samstag im Supermarkt ein.', bn: 'তিনি শনিবারে সুপারমার্কেটে কেনাকাটা করেন।', note: 'einkaufen -> kauft ... ein' },
        { de: 'Ich rufe dich heute Abend an.', bn: 'আমি তোমাকে আজ সন্ধ্যায় ফোন করব।', note: 'anrufen -> rufe ... an' },
        { de: 'Der Zug kommt um 14 Uhr an.', bn: 'ট্রেনটি দুপুর ২টায় পৌঁছায়।', note: 'ankommen -> kommt ... an' }
      ]
    },
    vocabulary: [
      { id: 'v_u5_2_1', german: 'aufstehen', article: null, pos: 'verb', bengali: 'ঘুম থেকে ওঠা', english: 'to get up', pronunciationBn: 'আউফস্টেহেন', example_de: 'Wann stehst du auf?', example_bn: 'তুমি কখন ওঠো?', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_2_2', german: 'einkaufen', article: null, pos: 'verb', bengali: 'কেনাকাটা করা', english: 'to shop', pronunciationBn: 'আইনকাউফেন', example_de: 'Wir kaufen zusammen ein.', example_bn: 'আমরা একসাথে কেনাকাটা করি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_2_3', german: 'anrufen', article: null, pos: 'verb', bengali: 'ফোন করা', english: 'to call (on phone)', pronunciationBn: 'আনরুফেন', example_de: 'Ruf mich bitte an!', example_bn: 'আমাকে ফোন কোরো দয়া করে!', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_2_4', german: 'fernsehen', article: null, pos: 'verb', bengali: 'টিভি দেখা', english: 'to watch TV', pronunciationBn: 'ফেয়ার্নজেহেন', example_de: 'Ich sehe selten fern.', example_bn: 'আমি খুব কম টিভি দেখি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_2_5', german: 'ankommen', article: null, pos: 'verb', bengali: 'পৌঁছানো', english: 'to arrive', pronunciationBn: 'আনকমেন', example_de: 'Wann kommt der Bus an?', example_bn: 'বাসটি কখন পৌঁছাবে?', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u5_2_6', german: 'abfahren', article: null, pos: 'verb', bengali: 'রওয়ানা হওয়া / ছেড়ে যাওয়া', english: 'to depart', pronunciationBn: 'আবফারেন', example_de: 'Der Zug fährt um 9 Uhr ab.', example_bn: 'ট্রেনটি সকাল ৯টায় ছাড়বে।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u5_2_7', german: 'aufmachen', article: null, pos: 'verb', bengali: 'খোলা (দরজা/জানালা)', english: 'to open', pronunciationBn: 'আউফমাখেন', example_de: 'Mach bitte das Fenster auf!', example_bn: 'দয়া করে জানালাটি খোলো!', topic: 'home_living', level: 'A1' },
      { id: 'v_u5_2_8', german: 'zumachen', article: null, pos: 'verb', bengali: 'বন্ধ করা', english: 'to close', pronunciationBn: 'ৎসুমাখেন', example_de: 'Er macht die Tür zu.', example_bn: 'তিনি দরজাটি বন্ধ করছেন।', topic: 'home_living', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'বিভাজ্য ক্রিয়ার বাক্য কাঠামো',
      title_en: 'Sentence Structure with Separable Verbs',
      content_bn: 'কর্তা (Subjekt) -> ক্রিয়া ধাতু (Verb konjugiert) -> বাকি অংশ -> উপসর্গ (Präfix বাক্যের একেবারে শেষে)।',
      rule_table: [
        { label: 'স্থান ১', value: 'Ich (আমি)', note: 'কর্তা' },
        { label: 'স্থান ২', value: 'stehe (উঠি)', note: 'রূপান্তরিত মূল ক্রিয়া' },
        { label: 'মাঝের অংশ', value: 'um 7 Uhr (সাতটায়)', note: 'সময় বা কর্ম' },
        { label: 'শেষ স্থান', value: 'auf! (উপসর্গ)', note: 'উপসর্গ সর্বদা বাক্যের শেষে' }
      ]
    },
    exercises: [
      {
        id: 'ex_5_2_1',
        type: 'fill_blank',
        prompt_bn: "বাক্য সম্পন্ন করুন: 'Ich rufe meine Mutter ___.' (আমি আমার মাকে ফোন করছি)",
        explanation_bn: "anrufen ক্রিয়ার উপসর্গ হলো 'an', যা বাক্যের শেষে বসে।",
        sentenceWithBlank: 'Ich rufe meine Mutter ___.',
        blankType: 'preposition',
        options: ['an', 'auf', 'aus', 'ein'],
        correctAnswer: 'an',
        translation_bn: 'আমি আমার মাকে ফোন করছি।'
      },
      {
        id: 'ex_5_2_2',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'তিনি প্রতিদিন সকাল সাতটায় ওঠেন।'",
        explanation_bn: 'Er steht jeden Tag um sieben Uhr auf.',
        targetSentence: 'Er steht jeden Tag um sieben Uhr auf.',
        scrambledWords: ['auf.', 'sieben', 'Er', 'um', 'steht', 'Tag', 'Uhr', 'jeden'],
        meaning_bn: 'তিনি প্রতিদিন সকাল সাতটায় ওঠেন।'
      },
      {
        id: 'ex_5_2_3',
        type: 'matching_pairs',
        prompt_bn: 'বিভাজ্য ক্রিয়া ও তাদের বিপরীত রূপ মেলান:',
        explanation_bn: 'aufmachen (খোলা) <-> zumachen (বন্ধ করা), ankommen (পৌঁছানো) <-> abfahren (ছেড়ে যাওয়া)',
        pairs: [
          { german: 'aufmachen', bengali: 'খোলা' },
          { german: 'zumachen', bengali: 'বন্ধ করা' },
          { german: 'ankommen', bengali: 'পৌঁছানো' },
          { german: 'abfahren', bengali: 'ছেড়ে যাওয়া' }
        ]
      }
    ]
  },
  {
    id: 'lesson_5_3',
    unitId: 'unit_5',
    title_bn: 'সকাল থেকে রাত: দৈনন্দিন রুটিন',
    title_en: 'Daily Schedule from Morning to Night',
    subtitle_de: 'Mein Tagesablauf von früh bis spät',
    order: 24,
    content: {
      intro_bn: 'সকাল থেকে ঘুমাতে যাওয়া পর্যন্ত পুরো দিনের কার্যক্রম জার্মান ভাষায় ধারাবাহিকভাবে বলতে নিচের সংযোগকারী শব্দগুলো (Zuerst, Dann, Danach, Später) ব্যবহার করা হয়:\n• Zuerst (প্রথমে): "Zuerst frühstücke ich."\n• Dann (তারপর): "Dann fahre ich zur Arbeit."\n• Danach (তারপরে): "Danach mache ich Sport."\n• Am Abend (সন্ধ্যায়): "Am Abend koche ich das Abendessen."\nলক্ষ্য করুন: যখন বাক্য Zuerst বা Dann দিয়ে শুরু হয়, তখন ক্রিয়া সরাসরি ২য় স্থানে চলে আসে!',
      intro_en: 'Structure your day using sequence adverbs: zuerst (first), dann (then), danach (after that), am Abend (in the evening). In German, starting with an adverb inverts subject and verb: Dann gehe ich zur Arbeit.',
      examples: [
        { de: 'Zuerst trinke ich einen Kaffee.', bn: 'প্রথমে আমি এক কাপ কফি পান করি।', note: 'Zuerst + Verb' },
        { de: 'Dann fahre ich mit dem Bus zur Arbeit.', bn: 'তারপর আমি বাসে করে কাজে যাই।', note: 'Dann + Verb' },
        { de: 'Um 12 Uhr habe ich Mittagspause.', bn: 'দুপুর ১২টায় আমার দুপুরের খাবারের বিরতি।', note: 'Mittagspause' },
        { de: 'Um 23 Uhr gehe ich ins Bett.', bn: 'রাত ১১টায় আমি বিছানায় ঘুমাতে যাই।', note: 'ins Bett gehen' }
      ]
    },
    vocabulary: [
      { id: 'v_u5_3_1', german: 'frühstücken', article: null, pos: 'verb', bengali: 'সকালের নাশতা করা', english: 'to have breakfast', pronunciationBn: 'ফ্রুশটুকেন', example_de: 'Ich frühstücke um 8 Uhr.', example_bn: 'আমি ৮টায় নাশতা করি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_3_2', german: 'kochen', article: null, pos: 'verb', bengali: 'রান্না করা', english: 'to cook', pronunciationBn: 'কখেন', example_de: 'Er kocht sehr gern.', example_bn: 'তিনি খুব পছন্দ করে রান্না করেন।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_3_3', german: 'schlafen', article: null, pos: 'verb', bengali: 'ঘুমানো', english: 'to sleep', pronunciationBn: 'শ্লাফেন', example_de: 'Ich schlafe acht Stunden.', example_bn: 'আমি আট ঘণ্টা ঘুমাই।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_3_4', german: 'dann', article: null, pos: 'adv', bengali: 'তারপর / এরপর', english: 'then', pronunciationBn: 'দান', example_de: 'Dann lerne ich Deutsch.', example_bn: 'তারপর আমি জার্মান শিখি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_3_5', german: 'zuerst', article: null, pos: 'adv', bengali: 'প্রথমে / সবার আগে', english: 'first / at first', pronunciationBn: 'ৎসুয়ের্স্ট', example_de: 'Zuerst mache ich Sport.', example_bn: 'প্রথমে আমি ব্যায়াম করি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_3_6', german: 'Mittagessen', article: 'das', plural: 'die Mittagessen', pos: 'noun', bengali: 'দুপুরের খাবার (লাঞ্চ)', english: 'lunch', pronunciationBn: 'মিটাগএসেন', example_de: 'Das Mittagessen schmeckt gut.', example_bn: 'দুপুরের খাবার সুস্বাদু হয়েছে।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u5_3_7', german: 'Abendessen', article: 'das', plural: 'die Abendessen', pos: 'noun', bengali: 'রাতের খাবার (ডিনার)', english: 'dinner', pronunciationBn: 'আবেন্টএসেন', example_de: 'Um 20 Uhr gibt es Abendessen.', example_bn: 'রাত ৮টায় রাতের খাবার।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u5_3_8', german: 'die Pause', article: 'die', plural: 'die Pausen', pos: 'noun', bengali: 'বিরতি / ছুটি', english: 'break / pause', pronunciationBn: 'ডি পাউজে', example_de: 'Wir machen jetzt eine Pause.', example_bn: 'আমরা এখন একটু বিরতি নিচ্ছি।', topic: 'work_office_education', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'বাক্যের শুরুতে Dann বসলে শব্দক্রম উল্টে যায় (Inversion)',
      title_en: 'Word Order with "Dann" and "Zuerst"',
      content_bn: 'জার্মান ভাষায় ২য় স্থানটি সর্বদা ক্রিয়ার জন্য সংরক্ষিত! তাই বাক্যের শুরুতে Dann বা Zuerst বসলে কর্তা (Subjekt) ক্রিয়ার পরে চলে যায়:\n• Zuerst frühstücke ich. (Zuerst ich frühstücke নয়!)\n• Dann fahre ich.',
      rule_table: [
        { label: 'স্থান ১', value: 'Dann / Zuerst', note: 'সংযোগকারী শব্দ' },
        { label: 'স্থান ২', value: 'Verb (ক্রিয়া)', note: 'সর্বদা ২য় স্থানে ক্রিয়া' },
        { label: 'স্থান ৩', value: 'Subjekt (কর্তা)', note: 'ich, du, er...' }
      ]
    },
    exercises: [
      {
        id: 'ex_5_3_1',
        type: 'multiple_choice',
        prompt_bn: "কোন শব্দক্রমটি জার্মান ব্যাকরণ অনুযায়ী সঠিক?",
        explanation_bn: "'Dann' দিয়ে শুরু হলে ক্রিয়া অবশ্যই ২য় স্থানে আসবে: 'Dann gehe ich zur Arbeit.'",
        question: "সঠিক শব্দক্রম কোনটি?",
        options: ['Dann gehe ich zur Arbeit.', 'Dann ich gehe zur Arbeit.', 'Dann zur Arbeit ich gehe.', 'Dann gehe zur Arbeit ich.'],
        correctAnswer: 'Dann gehe ich zur Arbeit.'
      },
      {
        id: 'ex_5_3_2',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'প্রথমে আমি চা পান করি।'",
        explanation_bn: 'Zuerst trinke ich einen Tee.',
        targetSentence: 'Zuerst trinke ich einen Tee.',
        scrambledWords: ['einen', 'ich', 'Zuerst', 'Tee.', 'trinke'],
        meaning_bn: 'প্রথমে আমি চা পান করি।'
      }
    ]
  },
  {
    id: 'lesson_5_4',
    unitId: 'unit_5',
    title_bn: 'সময়বাচক প্রেপজিশন: um, am, im, von...bis',
    title_en: 'Time Prepositions (at, on, in, from...to)',
    subtitle_de: 'Temporale Präpositionen: um, am, im, von...bis',
    order: 25,
    content: {
      intro_bn: 'সময়ের ক্ষেত্রে জার্মানিতে কোন প্রেপজিশন কখন বসে?\n১. "um" বসে নির্দিষ্ট ঘণ্টার ক্ষেত্রে:\n• um 8 Uhr (সকাল ৮টায়)\n• um wie viel Uhr? (কয়টায়?)\n\n২. "am" (an + dem) বসে বার, দিনের নির্দিষ্ট অংশ ও তারিখের ক্ষেত্রে:\n• am Montag (সোমবারে)\n• am Wochenende (সাপ্তাহিক ছুটির দিনে)\n• am Morgen (সকালবেলা), am Abend (সন্ধ্যাবেলা) [ব্যতিক্রম: in der Nacht]\n\n৩. "im" (in + dem) বসে মাস ও ঋতুর ক্ষেত্রে:\n• im Januar (জানুয়ারিতে)\n• im Sommer (গ্রীষ্মকালে)\n\n৪. "von ... bis" (হতে ... পর্যন্ত):\n• von 9 bis 17 Uhr (সকাল ৯টা থেকে বিকেল ৫টা পর্যন্ত)।',
      intro_en: 'Memorize time prepositions: "um" for clock times (um 8 Uhr), "am" for days and parts of day (am Montag, am Morgen), "im" for months and seasons (im Juli, im Sommer), and "von...bis" for time intervals.',
      examples: [
        { de: 'Der Kurs beginnt um neun Uhr.', bn: 'কোর্সটি সকাল নয়টায় শুরু হয়।', note: 'um 9 Uhr' },
        { de: 'Am Samstag schlafe ich lange.', bn: 'শনিবারে আমি অনেকক্ষণ ঘুমাই।', note: 'am Samstag' },
        { de: 'Im August habe ich Urlaub.', bn: 'আগস্টে আমার ছুটি আছে।', note: 'im August' },
        { de: 'Ich arbeite von Montag bis Freitag.', bn: 'আমি সোমবার থেকে শুক্রবার পর্যন্ত কাজ করি।', note: 'von...bis' }
      ]
    },
    vocabulary: [
      { id: 'v_u5_4_1', german: 'beginnen', article: null, pos: 'verb', bengali: 'শুরু হওয়া / করা', english: 'to begin / start', pronunciationBn: 'বেগিনেন', example_de: 'Der Film beginnt um 20 Uhr.', example_bn: 'সিনেমাটি রাত ৮টায় শুরু হয়।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_4_2', german: 'enden', article: null, pos: 'verb', bengali: 'শেষ হওয়া', english: 'to end', pronunciationBn: 'এন্ডেন', example_de: 'Der Kurs endet im Juni.', example_bn: 'কোর্সটি জুনে শেষ হবে।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_4_3', german: 'Urlaub', article: 'der', plural: 'die Urlaube', pos: 'noun', bengali: 'ছুটি (ভ্রমণ/বিশ্রাম)', english: 'vacation / holiday', pronunciationBn: 'উয়ারলাউব', example_de: 'Ich habe zwei Wochen Urlaub.', example_bn: 'আমার দুই সপ্তাহের ছুটি আছে।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u5_4_4', german: 'Woche', article: 'die', plural: 'die Wochen', pos: 'noun', bengali: 'সপ্তাহ', english: 'week', pronunciationBn: 'ভখে', example_de: 'Nächste Woche fahre ich weg.', example_bn: 'আগামী সপ্তাহে আমি বাইরে যাচ্ছি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_4_5', german: 'Monat', article: 'der', plural: 'die Monate', pos: 'noun', bengali: 'মাস', english: 'month', pronunciationBn: 'মোনাট', example_de: 'In welchem Monat bist du geboren?', example_bn: 'তুমি কোন মাসে জন্মেছো?', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_4_6', german: 'Wochenende', article: 'das', plural: 'die Wochenenden', pos: 'noun', bengali: 'সাপ্তাহিক ছুটি', english: 'weekend', pronunciationBn: 'ভখেনএন্ডে', example_de: 'Schönes Wochenende!', example_bn: 'সুন্দর ছুটির দিন কাটুক!', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_4_7', german: 'spät', article: null, pos: 'adj', bengali: 'দেরি / রাত', english: 'late', pronunciationBn: 'শপেট', example_de: 'Es ist schon sehr spät.', example_bn: 'ইতিমধ্যেই অনেক দেরি হয়ে গেছে।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u5_4_8', german: 'früh', article: null, pos: 'adj', bengali: 'ভোরবেলা / তাড়াতাড়ি', english: 'early', pronunciationBn: 'ফ্রু', example_de: 'Ich stehe früh auf.', example_bn: 'আমি খুব ভোরে উঠি।', topic: 'daily_routine_time', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'সময় প্রেপজিশন সংক্ষেপ সূত্র',
      title_en: 'Time Prepositions Cheat Sheet',
      content_bn: '• ঘণ্টা = um (um 7 Uhr)\n• দিন / তারিখ / সকাল-বিকাল = am (am Montag, am Abend)\n• মাস / ঋতু = im (im Juli, im Winter)\n• ব্যতিক্রম: রাতে = in der Nacht!',
      rule_table: [
        { label: 'um', value: 'ঘড়ির কাঁটা', note: 'um 10:30 Uhr' },
        { label: 'am', value: 'দিন ও বেলা', note: 'am Freitag, am Morgen' },
        { label: 'im', value: 'মাস ও ঋতু', note: 'im Mai, im Sommer' },
        { label: 'in der', value: 'রাত', note: 'in der Nacht' }
      ]
    },
    exercises: [
      {
        id: 'ex_5_4_1',
        type: 'fill_blank',
        prompt_bn: "সঠিক প্রেপজিশন বসান: 'Ich lerne ___ Montag Deutsch.'",
        explanation_bn: "সপ্তাহের যে কোনো দিনের আগে 'am' বসে (am Montag)।",
        sentenceWithBlank: 'Ich lerne ___ Montag Deutsch.',
        blankType: 'preposition',
        options: ['am', 'um', 'im', 'in'],
        correctAnswer: 'am',
        translation_bn: 'আমি সোমবারে জার্মান শিখি।'
      },
      {
        id: 'ex_5_4_2',
        type: 'fill_blank',
        prompt_bn: "সঠিক প্রেপজিশন বসান: 'Der Zug fährt ___ 14 Uhr ab.'",
        explanation_bn: "নির্দিষ্ট ঘণ্টার আগে 'um' বসে (um 14 Uhr)।",
        sentenceWithBlank: 'Der Zug fährt ___ 14 Uhr ab.',
        blankType: 'preposition',
        options: ['um', 'am', 'im', 'nach'],
        correctAnswer: 'um',
        translation_bn: 'ট্রেনটি দুপুর ২টায় ছাড়বে।'
      },
      {
        id: 'ex_5_4_3',
        type: 'matching_pairs',
        prompt_bn: 'প্রেপজিশন ও সময়ের জোড়া মেলান:',
        explanation_bn: 'um 8 Uhr (ঘণ্টা), am Sonntag (দিন), im Juli (মাস), in der Nacht (রাত)',
        pairs: [
          { german: 'um', bengali: '8 Uhr' },
          { german: 'am', bengali: 'Sonntag' },
          { german: 'im', bengali: 'Juli' },
          { german: 'in der', bengali: 'Nacht' }
        ]
      }
    ]
  }
];

fs.writeFileSync(path.join(curriculumDir, 'unit5_routine.json'), JSON.stringify(unit5_lessons, null, 2), 'utf8');
console.log('Unit 5 written: 4 lessons');

// Write Units 6 through 10 in next step
