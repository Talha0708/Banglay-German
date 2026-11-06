// scripts/build-units-8-to-10.js
// Generates deep CEFR A1 curriculum for Units 8, 9, 10
// 4 lessons per unit with complete exercises, vocabulary, and grammar tips

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
// UNIT 8: Vergangenheit (Perfekt & Präteritum) (Lessons 8.1 to 8.4)
// ===========================================================================
const unit8_1 = readFirst('unit8_past.json');
const unit8_lessons = [
  unit8_1,
  {
    id: 'lesson_8_2',
    unitId: 'unit_8',
    title_bn: 'কথ্য অতীত Perfekt: haben সহযোগে',
    title_en: 'Spoken Past (Perfekt) with "haben"',
    subtitle_de: 'Das Perfekt mit haben und regelmäßige Verben',
    order: 35,
    content: {
      intro_bn: 'জার্মান কথ্য ভাষায় দৈনন্দিন কথাবার্তায় অতীত বর্ণনা করতে ৯০% ক্ষেত্রে "Perfekt" কাল ব্যবহৃত হয়।\n\nPerfekt গঠনের সূত্র:\nhaben (২য় পজিশনে রূপান্তরিত) + অন্যান্য তথ্য + Partizip II (বাক্যের শেষে ge-...-t রূপে)!\n\nনিয়মিত ক্রিয়ার Partizip II গঠন:\nge- + ক্রিয়ার মূল ধাতু + -t\nউদাহরণ:\n• lernen -> gelernt (Ich habe Deutsch gelernt)\n• machen -> gemacht (Er hat die Hausaufgabe gemacht)\n• kochen -> gekocht (Wir haben Pasta gekocht)\n• hören -> gehört (Ich habe Musik gehört)\n• kaufen -> gekauft (Sie hat ein Buch gekauft).',
      intro_en: 'Spoken past (Perfekt) is formed using: conjugated haben (Position 2) + sentence details + Partizip II (at the very end). For regular verbs, Partizip II is: ge- + stem + -t (ge-lern-t, ge-kauf-t).',
      examples: [
        { de: 'Gestern habe ich Deutsch gelernt.', bn: 'গতকাল আমি জার্মান শিখেছি।', note: 'habe ... gelernt' },
        { de: 'Was hast du am Wochenende gemacht?', bn: 'সাপ্তাহিক ছুটিতে তুমি কী করেছো?', note: 'hast ... gemacht' },
        { de: 'Wir haben heute lecker gekocht.', bn: 'আমরা আজ সুস্বাদু রান্না করেছি।', note: 'haben ... gekocht' },
        { de: 'Er hat ein neues Auto gekauft.', bn: 'তিনি একটি নতুন গাড়ি কিনেছেন।', note: 'hat ... gekauft' }
      ]
    },
    vocabulary: [
      { id: 'v_u8_2_1', german: 'gelernt', article: null, pos: 'verb', bengali: 'শিখেছি / শিখেছে (Partizip II)', english: 'learned', pronunciationBn: 'গেলের্নট', example_de: 'Ich habe viel gelernt.', example_bn: 'আমি অনেক শিখেছি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_2_2', german: 'gemacht', article: null, pos: 'verb', bengali: 'করেছি / করেছে (Partizip II)', english: 'done / made', pronunciationBn: 'গেমাখট', example_de: 'Das hast du gut gemacht!', example_bn: 'তুমি এটি দারুণ করেছো!', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_2_3', german: 'gehört', article: null, pos: 'verb', bengali: 'শুনেছি (Partizip II)', english: 'heard / listened', pronunciationBn: 'গেহোরট', example_de: 'Ich habe Radio gehört.', example_bn: 'আমি রেডিও শুনেছি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_2_4', german: 'gekauft', article: null, pos: 'verb', bengali: 'কিনেছি (Partizip II)', english: 'bought', pronunciationBn: 'গেকাউফট', example_de: 'Er hat Brot gekauft.', example_bn: 'তিনি পাউরুটি কিনেছেন।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u8_2_5', german: 'gespielt', article: null, pos: 'verb', bengali: 'খেলেছি / বাজিয়েছি', english: 'played', pronunciationBn: 'গেশপিল্ট', example_de: 'Wir haben Fußball gespielt.', example_bn: 'আমরা ফুটবল খেলেছি।', topic: 'hobbies_leisure_sports', level: 'A1' },
      { id: 'v_u8_2_6', german: 'gesagt', article: null, pos: 'verb', bengali: 'বলেছি / বলেছে', english: 'said', pronunciationBn: 'গেজাখট', example_de: 'Was hat er gesagt?', example_bn: 'তিনি কী বলেছেন?', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_2_7', german: 'gesucht', article: null, pos: 'verb', bengali: 'খুঁজেছি / খুঁজেছে', english: 'searched', pronunciationBn: 'গেজুখট', example_de: 'Ich habe meine Brille gesucht.', example_bn: 'আমি আমার চশমা খুঁজেছি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_2_8', german: 'gestern', article: null, pos: 'adv', bengali: 'গতকাল', english: 'yesterday', pronunciationBn: 'গেসটার্ন', example_de: 'Gestern war Sonntag.', example_bn: 'গতকাল রবিবার ছিল।', topic: 'daily_routine_time', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'নিয়মিত Perfekt গঠনের ফর্মুলা',
      title_en: 'Regular Partizip II Formula',
      content_bn: 'ge- + Verb-Stamm + -t\nযেমন: ge + kauf + t = gekauft.',
      rule_table: [
        { label: 'lernen', value: 'ge-lern-t', note: 'শেখা' },
        { label: 'machen', value: 'ge-mach-t', note: 'করা' },
        { label: 'kochen', value: 'ge-koch-t', note: 'রান্না করা' },
        { label: 'hören', value: 'ge-hör-t', note: 'শোনা' }
      ]
    },
    exercises: [
      {
        id: 'ex_8_2_1',
        type: 'fill_blank',
        prompt_bn: "Partizip II রূপ বসান: 'Ich habe gestern Deutsch ___.' (আমি গতকাল জার্মান শিখেছি)",
        explanation_bn: "lernen এর Partizip II রূপ হলো 'gelernt' (ge-lern-t)।",
        sentenceWithBlank: 'Ich habe gestern Deutsch ___.',
        blankType: 'verb',
        options: ['gelernt', 'lernen', 'gelernte', 'lernt'],
        correctAnswer: 'gelernt',
        translation_bn: 'আমি গতকাল জার্মান শিখেছি।'
      },
      {
        id: 'ex_8_2_2',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'সাপ্তাহিক ছুটিতে তুমি কী করেছো?'",
        explanation_bn: 'Was hast du am Wochenende gemacht?',
        targetSentence: 'Was hast du am Wochenende gemacht?',
        scrambledWords: ['Wochenende', 'hast', 'du', 'am', 'gemacht?', 'Was'],
        meaning_bn: 'সাপ্তাহিক ছুটিতে তুমি কী করেছো?'
      },
      {
        id: 'ex_8_2_3',
        type: 'matching_pairs',
        prompt_bn: 'বর্তমান ক্রিয়া ও তার Partizip II রূপ মেলান:',
        explanation_bn: 'kaufen -> gekauft, hören -> gehört, machen -> gemacht, spielen -> gespielt',
        pairs: [
          { german: 'kaufen', bengali: 'gekauft' },
          { german: 'hören', bengali: 'gehört' },
          { german: 'machen', bengali: 'gemacht' },
          { german: 'spielen', bengali: 'gespielt' }
        ]
      }
    ]
  },
  {
    id: 'lesson_8_3',
    unitId: 'unit_8',
    title_bn: 'Perfekt: গতি ও স্থান পরিবর্তনের জন্য sein',
    title_en: 'Perfekt with "sein" (Movement & Change of State)',
    subtitle_de: 'Das Perfekt mit sein: Bewegung und Zustandswechsel',
    order: 36,
    content: {
      intro_bn: 'অধিকাংশ ক্রিয়ার সাথে Perfekt-এ "haben" বসলেও, দুটি বিশেষ ক্ষেত্রে "sein" (ist/sind/bist) সহায়ক ক্রিয়া হিসেবে ব্যবহৃত হয়:\n১. এক স্থান থেকে অন্য স্থানে শারীরিক স্থানান্তর (Ortswechsel / Bewegung):\n• gehen (যাওয়া) -> Ich bin gegangen (আমি গিয়েছিলাম)।\n• fahren (যানবাহনে যাওয়া) -> Er ist gefahren (তিনি গিয়েছিলেন)।\n• fliegen (বিমানে উড়ে যাওয়া) -> Wir sind geflogen (আমরা উড়ে গিয়েছিলাম)।\n• kommen (আসা) -> Sie ist gekommen (সে এসেছে)।\n\n২. অবস্থা পরিবর্তন (Zustandswechsel) ও ব্যতিক্রম:\n• aufstehen (ঘুম থেকে ওঠা) -> Ich bin aufgestanden.\n• bleiben (থাকা) -> Ich bin geblieben (ব্যতিক্রম: থাকা সত্ত্বেও sein নেয়!)।',
      intro_en: 'Verbs of motion (gehen, fahren, fliegen, kommen) and change of state (aufstehen, sterben), plus "bleiben" and "sein", take "sein" as auxiliary verb in Perfekt: Ich bin nach Berlin gefahren.',
      examples: [
        { de: 'Ich bin gestern nach Berlin gefahren.', bn: 'গতকাল আমি বার্লিনে গিয়েছি।', note: 'bin ... gefahren' },
        { de: 'Wann bist du aufgestanden?', bn: 'তুমি কখন ঘুম থেকে উঠেছো?', note: 'bist ... aufgestanden' },
        { de: 'Er ist zu spät gekommen.', bn: 'তিনি অনেক দেরিতে এসেছেন।', note: 'ist ... gekommen' },
        { de: 'Wir sind zu Hause geblieben.', bn: 'আমরা বাসায় থেকে গিয়েছিলাম।', note: 'sind ... geblieben' }
      ]
    },
    vocabulary: [
      { id: 'v_u8_3_1', german: 'gegangen', article: null, pos: 'verb', bengali: 'গিয়েছি / হেঁটে গিয়েছে', english: 'gone / walked', pronunciationBn: 'গেগাঙেন', example_de: 'Ich bin nach Hause gegangen.', example_bn: 'আমি বাসায় চলে গিয়েছিলাম।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_3_2', german: 'gefahren', article: null, pos: 'verb', bengali: 'গাড়িতে / ট্রেনে গিয়েছি', english: 'traveled / driven', pronunciationBn: 'গেফারেন', example_de: 'Wir sind mit dem Zug gefahren.', example_bn: 'আমরা ট্রেনে গিয়েছি।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u8_3_3', german: 'gekommen', article: null, pos: 'verb', bengali: 'এসেছি / এসেছে', english: 'come / arrived', pronunciationBn: 'গেকমেন', example_de: 'Er ist pünktlich gekommen.', example_bn: 'তিনি সময়মতো এসেছেন।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_3_4', german: 'geflogen', article: null, pos: 'verb', bengali: 'উড়ে গিয়েছি (বিমানে)', english: 'flown', pronunciationBn: 'গেফ্লোগেন', example_de: 'Sie ist nach Frankfurt geflogen.', example_bn: 'তিনি ফ্রাঙ্কফুর্ট উড়ে গেছেন।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u8_3_5', german: 'aufgestanden', article: null, pos: 'verb', bengali: 'ঘুম থেকে উঠেছি', english: 'got up', pronunciationBn: 'আউফগেশটানডেন', example_de: 'Ich bin um 7 Uhr aufgestanden.', example_bn: 'আমি ৭টায় উঠেছি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u8_3_6', german: 'geblieben', article: null, pos: 'verb', bengali: 'থেকেছি / অবস্থান করেছি', english: 'stayed', pronunciationBn: 'গেবলিবেন', example_de: 'Er ist im Bett geblieben.', example_bn: 'তিনি বিছানায় থেকে গিয়েছিলেন।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_3_7', german: 'passiert', article: null, pos: 'verb', bengali: 'ঘটেছে (ঘটনা)', english: 'happened', pronunciationBn: 'পাসিরট', example_de: 'Was ist passiert?', example_bn: 'কী ঘটেছে?', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u8_3_8', german: 'gewesen', article: null, pos: 'verb', bengali: 'ছিলাম / ছিল (sein এর Partizip II)', english: 'been', pronunciationBn: 'গেভেজেন', example_de: 'Wo bist du gewesen?', example_bn: 'তুমি কোথায় ছিলে?', topic: 'essential_verbs', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'কখন haben আর কখন sein?',
      title_en: 'Perfekt Auxiliary: haben vs sein',
      content_bn: 'গতি ও স্থানান্তর (gehen, fahren, fliegen, kommen) = sein!\nবাকি ৯০% ক্রিয়া = haben!',
      rule_table: [
        { label: 'haben', value: 'স্থির কাজ / বস্তু কর্ম', note: 'habe gegessen, habe gelernt' },
        { label: 'sein', value: 'স্থান পরিবর্তন / গতি', note: 'bin gegangen, ist gefahren' },
        { label: 'sein (ব্যতিক্রম)', value: 'bleiben, sein, passieren', note: 'ist geblieben, ist gewesen' }
      ]
    },
    exercises: [
      {
        id: 'ex_8_3_1',
        type: 'fill_blank',
        prompt_bn: "সহায়ক ক্রিয়া বসান: 'Ich ___ gestern nach Berlin gefahren.'",
        explanation_bn: "fahren একটি গতিবাচক ক্রিয়া, তাই Perfekt-এ 'sein' (ich bin) ব্যবহৃত হয়।",
        sentenceWithBlank: 'Ich ___ gestern nach Berlin gefahren.',
        blankType: 'verb',
        options: ['bin', 'habe', 'ist', 'hat'],
        correctAnswer: 'bin',
        translation_bn: 'গতকাল আমি বার্লিনে গিয়েছি।'
      },
      {
        id: 'ex_8_3_2',
        type: 'multiple_choice',
        prompt_bn: "'কী হয়েছে / কী ঘটেছে?' এর বিখ্যাত জার্মান প্রশ্ন কোনটি?",
        explanation_bn: "'Was ist passiert?' অর্থ কী ঘটেছে? (passieren ক্রিয়ার সাথে sein বসে)।",
        question: "'কী ঘটেছে?' এর জার্মান কোনটি?",
        options: ['Was ist passiert?', 'Was hat passiert?', 'Was macht passiert?', 'Was geht passiert?'],
        correctAnswer: 'Was ist passiert?'
      },
      {
        id: 'ex_8_3_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'তুমি কখন ঘুম থেকে উঠেছো?'",
        explanation_bn: 'Wann bist du aufgestanden?',
        targetSentence: 'Wann bist du aufgestanden?',
        scrambledWords: ['aufgestanden?', 'Wann', 'du', 'bist'],
        meaning_bn: 'তুমি কখন ঘুম থেকে উঠেছো?'
      }
    ]
  },
  {
    id: 'lesson_8_4',
    unitId: 'unit_8',
    title_bn: 'নিয়মিত ও অনিয়মিত Partizip II (ge-...-en)',
    title_en: 'Irregular Verbs in Perfekt',
    subtitle_de: 'Unregelmäßige Verben im Perfekt',
    order: 37,
    content: {
      intro_bn: 'নিয়মিত ক্রিয়াগুলো যেমন সহজে -t নেয় (ge-kauf-t), অনিয়মিত (Unregelmäßige / Starke Verben) ক্রিয়াগুলোর ক্ষেত্রে স্বরবর্ণের পরিবর্তন হয় এবং সাধারণত শেষে "-en" থাকে!\n\nসবচেয়ে প্রয়োজনীয় A1 অনিয়মিত ক্রিয়ার তালিকা:\n• essen (খাওয়া) -> gegessen (Ich habe gegessen)\n• trinken (পান করা) -> getrunken (Er hat Tee getrunken)\n• schreiben (লেখা) -> geschrieben (Ich habe eine E-Mail geschrieben)\n• lesen (পড়া) -> gelesen (Hast du das Buch gelesen?)\n• sprechen (কথা বলা) -> gesprochen (Wir haben Deutsch gesprochen)\n• treffen (দেখা করা) -> getroffen (Ich habe meinen Freund getroffen)\n• finden (পাওয়া) -> gefunden (Ich habe den Schlüssel gefunden)\n• schlafen (ঘুমানো) -> geschlafen (Ich habe gut geschlafen).',
      intro_en: 'Irregular verbs in Perfekt typically end in "-en" and often undergo vowel changes: essen -> gegessen, trinken -> getrunken, schreiben -> geschrieben, sprechen -> gesprochen.',
      examples: [
        { de: 'Ich habe heute Morgen einen Kaffee getrunken.', bn: 'আজ সকালে আমি এক কাপ কফি পান করেছি।', note: 'trinken -> getrunken' },
        { de: 'Hast du die E-Mail geschrieben?', bn: 'তুমি কি ইমেইলটি লিখেছো?', note: 'schreiben -> geschrieben' },
        { de: 'Wir haben gestern Deutsch gesprochen.', bn: 'আমরা গতকাল জার্মান ভাষায় কথা বলেছি।', note: 'sprechen -> gesprochen' },
        { de: 'Ich habe meinen Schlüssel gefunden!', bn: 'আমি আমার চাবিটি খুঁজে পেয়েছি!', note: 'finden -> gefunden' }
      ]
    },
    vocabulary: [
      { id: 'v_u8_4_1', german: 'getrunken', article: null, pos: 'verb', bengali: 'পান করেছি (Partizip II)', english: 'drunk', pronunciationBn: 'গেট্রুঙ্কেন', example_de: 'Ich habe Wasser getrunken.', example_bn: 'আমি পানি পান করেছি।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u8_4_2', german: 'gegessen', article: null, pos: 'verb', bengali: 'খেয়েছি (Partizip II)', english: 'eaten', pronunciationBn: 'গেগেসেন', example_de: 'Hast du schon gegessen?', example_bn: 'তুমি কি খেয়েছো?', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u8_4_3', german: 'geschrieben', article: null, pos: 'verb', bengali: 'লিখেছি (Partizip II)', english: 'written', pronunciationBn: 'গেশরিবেন', example_de: 'Er hat einen Brief geschrieben.', example_bn: 'তিনি একটি চিঠি লিখেছেন।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u8_4_4', german: 'gelesen', article: null, pos: 'verb', bengali: 'পড়েছি (Partizip II)', english: 'read', pronunciationBn: 'গেলেজেন', example_de: 'Ich habe den Text gelesen.', example_bn: 'আমি টেক্সটটি পড়েছি।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u8_4_5', german: 'gesprochen', article: null, pos: 'verb', bengali: 'কথা বলেছি (Partizip II)', english: 'spoken', pronunciationBn: 'গেশপ্রখেন', example_de: 'Wir haben lange gesprochen.', example_bn: 'আমরা দীর্ঘক্ষণ কথা বলেছি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_4_6', german: 'getroffen', article: null, pos: 'verb', bengali: 'দেখা করেছি / সাক্ষাৎ হয়েছে', english: 'met', pronunciationBn: 'গেট্রেফেন', example_de: 'Ich habe Anna getroffen.', example_bn: 'আমি আনার সাথে দেখা করেছি।', topic: 'family_people', level: 'A1' },
      { id: 'v_u8_4_7', german: 'gefunden', article: null, pos: 'verb', bengali: 'খুঁজে পেয়েছি (Partizip II)', english: 'found', pronunciationBn: 'গেফুনডেন', example_de: 'Er hat Arbeit gefunden.', example_bn: 'তিনি কাজ খুঁজে পেয়েছেন।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u8_4_8', german: 'geschlafen', article: null, pos: 'verb', bengali: 'ঘুমিয়েছি (Partizip II)', english: 'slept', pronunciationBn: 'গেশলাফেন', example_de: 'Ich habe gut geschlafen.', example_bn: 'আমি ভালো ঘুমিয়েছি।', topic: 'daily_routine_time', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'নিয়মিত (-t) বনাম অনিয়মিত (-en)',
      title_en: 'Regular (-t) vs Irregular (-en)',
      content_bn: 'নিয়মিত ক্রিয়ার শেষে -t থাকে (ge-lern-t, ge-kauf-t)।\nঅনিয়মিত ক্রিয়ার শেষে -en থাকে (ge-gess-en, ge-trunk-en)।',
      rule_table: [
        { label: 'trinken', value: 'getrunken', note: 'i -> u' },
        { label: 'schreiben', value: 'geschrieben', note: 'ei -> ie' },
        { label: 'sprechen', value: 'gesprochen', note: 'e -> o' },
        { label: 'finden', value: 'gefunden', note: 'i -> u' }
      ]
    },
    exercises: [
      {
        id: 'ex_8_4_1',
        type: 'matching_pairs',
        prompt_bn: 'ক্রিয়া ও অনিয়মিত Partizip II মেলান:',
        explanation_bn: 'trinken -> getrunken, essen -> gegessen, schreiben -> geschrieben, sprechen -> gesprochen',
        pairs: [
          { german: 'trinken', bengali: 'getrunken' },
          { german: 'essen', bengali: 'gegessen' },
          { german: 'schreiben', bengali: 'geschrieben' },
          { german: 'sprechen', bengali: 'gesprochen' }
        ]
      },
      {
        id: 'ex_8_4_2',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'তুমি কি ইতিমধ্যে দুপুরের খাবার খেয়েছো?'",
        explanation_bn: 'Hast du schon zu Mittag gegessen?',
        targetSentence: 'Hast du schon zu Mittag gegessen?',
        scrambledWords: ['gegessen?', 'schon', 'zu', 'Hast', 'du', 'Mittag'],
        meaning_bn: 'তুমি কি ইতিমধ্যে দুপুরের খাবার খেয়েছো?'
      }
    ]
  }
];

fs.writeFileSync(path.join(curriculumDir, 'unit8_past.json'), JSON.stringify(unit8_lessons, null, 2), 'utf8');
console.log('Unit 8 written: 4 lessons');

// ===========================================================================
// UNIT 9: Gesundheit, Arzt und Wetter (Lessons 9.1 to 9.4)
// ===========================================================================
const unit9_1 = readFirst('unit9_health.json');
const unit9_lessons = [
  unit9_1,
  {
    id: 'lesson_9_2',
    unitId: 'unit_9',
    title_bn: 'অসুস্থতা ও ব্যথা প্রকাশ: tut weh ও Schmerzen',
    title_en: 'Expressing Pain, Illness & "tut weh"',
    subtitle_de: 'Krankheit, Schmerzen und Beschwerden',
    order: 39,
    content: {
      intro_bn: 'জার্মানিতে কোথাও ব্যথা বা যন্ত্রণা হলে দুটি প্রধান উপায়ে প্রকাশ করা হয়:\n\n১. "weh tun" ক্রিয়া ব্যবহার করে:\n• একবচন ব্যথায়: "Mein Kopf tut weh." (আমার মাথা ব্যথা করছে।)\n• বহুবচন ব্যথায়: "Meine Augen tun weh." (আমার চোখ দুটো ব্যথা করছে - এখানে tun!)\n\n২. "haben + Schmerzen" ব্যবহার করে:\n• "Ich habe Kopfschmerzen." (আমার মাথা ব্যথা আছে।)\n• "Ich habe Bauchschmerzen." (আমার পেট ব্যথা।)\n• "Ich habe Halsschmerzen." (আমার গলা ব্যথা।)\n• "Ich habe Fieber." (আমার জ্বর এসেছে।)\n• "Ich habe Husten und Schnupfen." (আমার কাশি ও সর্দি হয়েছে)।',
      intro_en: 'Express pain: "Mein Kopf tut weh" (singular: tut weh) or "Meine Beine tun weh" (plural: tun weh). Alternatively use noun compounds with -schmerzen: Kopfschmerzen, Bauchschmerzen, Halsschmerzen, plus Fieber (fever) and Husten (cough).',
      examples: [
        { de: 'Mein Rücken tut sehr weh.', bn: 'আমার পিঠ খুব ব্যথা করছে।', note: 'tut weh' },
        { de: 'Ich habe starke Kopfschmerzen.', bn: 'আমার তীব্র মাথা ব্যথা হচ্ছে।', note: 'Kopfschmerzen' },
        { de: 'Haben Sie Fieber? - Ja, 38,5 Grad.', bn: 'আপনার কি জ্বর আছে? - হ্যাঁ, ৩৮.৫ ডিগ্রি।', note: 'Fieber' },
        { de: 'Gute Besserung!', bn: 'দ্রুত সুস্থ হয়ে উঠুন!', note: 'সুস্থতা কামনা' }
      ]
    },
    vocabulary: [
      { id: 'v_u9_2_1', german: 'Kopfschmerzen', article: 'die', plural: 'die Kopfschmerzen', pos: 'noun', bengali: 'মাথা ব্যথা', english: 'headache', pronunciationBn: 'কপফশমেরৎসেন', example_de: 'Ich habe Kopfschmerzen.', example_bn: 'আমার মাথা ব্যথা করছে।', topic: 'health_body', level: 'A1' },
      { id: 'v_u9_2_2', german: 'Bauchschmerzen', article: 'die', plural: 'die Bauchschmerzen', pos: 'noun', bengali: 'পেট ব্যথা', english: 'stomach ache', pronunciationBn: 'বাউখশমেরৎসেন', example_de: 'Das Kind hat Bauchschmerzen.', example_bn: 'বাচ্চাটির পেট ব্যথা।', topic: 'health_body', level: 'A1' },
      { id: 'v_u9_2_3', german: 'Fieber', article: 'das', plural: null, pos: 'noun', bengali: 'জ্বর', english: 'fever', pronunciationBn: 'ফিবার', example_de: 'Er hat hohes Fieber.', example_bn: 'তার অনেক জ্বর।', topic: 'health_body', level: 'A1' },
      { id: 'v_u9_2_4', german: 'Husten', article: 'der', plural: null, pos: 'noun', bengali: 'কাশি', english: 'cough', pronunciationBn: 'হুস্টেন', example_de: 'Ich habe Husten.', example_bn: 'আমার কাশি হয়েছে।', topic: 'health_body', level: 'A1' },
      { id: 'v_u9_2_5', german: 'Schnupfen', article: 'der', plural: null, pos: 'noun', bengali: 'সর্দি / ঠান্ডা লাগা', english: 'runny nose / cold', pronunciationBn: 'শনুপফেন', example_de: 'Ich habe Schnupfen.', example_bn: 'আমার সর্দি হয়েছে।', topic: 'health_body', level: 'A1' },
      { id: 'v_u9_2_6', german: 'weh tun', article: null, pos: 'verb', bengali: 'ব্যথা করা / আঘাত পাওয়া', english: 'to hurt', pronunciationBn: 'ভে তুন', example_de: 'Was tut weh?', example_bn: 'কোথায় ব্যথা করছে?', topic: 'health_body', level: 'A1' },
      { id: 'v_u9_2_7', german: 'krank', article: null, pos: 'adj', bengali: 'অসুস্থ / রোগাক্রান্ত', english: 'sick / ill', pronunciationBn: 'ক্রাঙ্ক', example_de: 'Ich bin heute krank.', example_bn: 'আমি আজ অসুস্থ।', topic: 'health_body', level: 'A1' },
      { id: 'v_u9_2_8', german: 'Gute Besserung', article: null, pos: 'phrase', bengali: 'দ্রুত আরোগ্য কামনা করি!', english: 'get well soon', pronunciationBn: 'গুটে বেসারুং', example_de: 'Gute Besserung, Herr Meier!', example_bn: 'দ্রুত সুস্থ হয়ে উঠুন, মিস্টার মেয়ার!', topic: 'health_body', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "tut weh বনাম tun weh",
      title_en: "Singular vs Plural Pain: tut vs tun",
      content_bn: '• একবচন অঙ্গ হলে: tut weh (Mein Kopf tut weh).\n• বহুবচন অঙ্গ (চোখ, কান, পা) হলে: tun weh (Meine Beine tun weh).',
      rule_table: [
        { label: 'একবচন', value: 'tut weh', note: 'Mein Zahn tut weh (একটি দাঁত)' },
        { label: 'বহুবচন', value: 'tun weh', note: 'Meine Zähne tun weh (দাঁতগুলো)' }
      ]
    },
    exercises: [
      {
        id: 'ex_9_2_1',
        type: 'multiple_choice',
        prompt_bn: "কোনো অসুস্থ রোগীকে জার্মানিতে কী শুভেচ্ছা জানানো হয়?",
        explanation_bn: "'Gute Besserung!' অর্থ দ্রুত আরোগ্য লাভ করুন (Get well soon)।",
        question: "অসুস্থ ব্যক্তিকে সুস্থতা কামনায় কী বলতে হয়?",
        options: ['Gute Besserung!', 'Guten Appetit!', 'Gute Fahrt!', 'Herzlichen Glückwunsch!'],
        correctAnswer: 'Gute Besserung!'
      },
      {
        id: 'ex_9_2_2',
        type: 'fill_blank',
        prompt_bn: "সঠিক রূপটি বসান: 'Mein Bauch ___ weh.' (আমার পেট ব্যথা করছে)",
        explanation_bn: "Bauch একবচন, তাই 'tut weh' হবে।",
        sentenceWithBlank: 'Mein Bauch ___ weh.',
        blankType: 'verb',
        options: ['tut', 'tun', 'macht', 'geht'],
        correctAnswer: 'tut',
        translation_bn: 'আমার পেট ব্যথা করছে।'
      },
      {
        id: 'ex_9_2_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আমার তীব্র মাথা ব্যথা এবং জ্বর আছে।'",
        explanation_bn: 'Ich habe Kopfschmerzen und Fieber.',
        targetSentence: 'Ich habe Kopfschmerzen und Fieber.',
        scrambledWords: ['Fieber.', 'habe', 'und', 'Ich', 'Kopfschmerzen'],
        meaning_bn: 'আমার তীব্র মাথা ব্যথা এবং জ্বর আছে।'
      }
    ]
  },
  {
    id: 'lesson_9_3',
    unitId: 'unit_9',
    title_bn: 'ডাক্তারের কাছে ও ফার্মেসিতে (Beim Arzt und Apotheke)',
    title_en: 'Doctor Appointments & Pharmacy',
    subtitle_de: 'Beim Arzt und in der Apotheke: Termine & Medikamente',
    order: 40,
    content: {
      intro_bn: 'জার্মানিতে অসুস্থ হলে সরাসরি ডাক্তারের চেম্বারে (Arztpraxis) ফোন করে অ্যাপয়েন্টমেন্ট (Termin) নিতে হয়:\n• "Guten Tag, ich möchte einen Termin vereinbaren." (শুভ দিন, আমি একটি অ্যাপয়েন্টমেন্ট নিতে চাই।)\n• "Haben Sie heute noch einen Termin frei?" (আজকে কি কোনো ফাঁকা সময় আছে?)\n\nপ্রেসক্রিপশন ও ফার্মেসি:\nডাক্তার ওষুধ লিখলে প্রেসক্রিপশনকে বলা হয় "das Rezept"।\nফার্মেসিতে গিয়ে বলতে হয়:\n• "Ich habe ein Rezept vom Arzt." (আমার কাছে ডাক্তারের প্রেসক্রিপশন আছে।)\n• "Wie oft muss ich die Tabletten nehmen?" (দিনে কতবার এই ট্যাবলেটগুলো খেতে হবে?)\n• "Dreimal täglich vor dem Essen." (দিনে তিনবার খাওয়ার আগে)।',
      intro_en: 'Book an appointment: "Ich brauche einen Termin beim Arzt". In the pharmacy (Apotheke), hand over your prescription: "Hier ist mein Rezept". Ask dosage: "Wie oft soll ich das nehmen?" (dreimal täglich = 3 times a day).',
      examples: [
        { de: 'Ich möchte bitte einen Termin beim Arzt vereinbaren.', bn: 'আমি দয়া করে ডাক্তারের কাছে একটি অ্যাপয়েন্টমেন্ট নিতে চাই।', note: 'Termin vereinbaren' },
        { de: 'Hier ist mein Rezept von Frau Doktor Weber.', bn: 'এই যে ডক্টর ওয়েবারের দেওয়া আমার প্রেসক্রিপশন।', note: 'das Rezept' },
        { de: 'Nehmen Sie die Tabletten dreimal täglich mit Wasser.', bn: 'পানির সাথে দিনে তিনবার এই ট্যাবলেটগুলো সেবন করুন।', note: 'dreimal täglich' },
        { de: 'Ich bin für drei Tage krankgeschrieben.', bn: 'আমাকে তিন দিনের জন্য অসুস্থতাজনিত ছুটি দেওয়া হয়েছে।', note: 'krankgeschrieben' }
      ]
    },
    vocabulary: [
      { id: 'v_u9_3_1', german: 'Termin', article: 'der', plural: 'die Termine', pos: 'noun', bengali: 'অ্যাপয়েন্টমেন্ট / নির্ধারিত সময়', english: 'appointment', pronunciationBn: 'টেরমিন', example_de: 'Ich habe um 10 Uhr einen Termin.', example_bn: 'সকাল ১০টায় আমার একটি অ্যাপয়েন্টমেন্ট আছে।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u9_3_2', german: 'Rezept', article: 'das', plural: 'die Rezepte', pos: 'noun', bengali: 'প্রেসক্রিপশন / রান্নার প্রণালী', english: 'prescription / recipe', pronunciationBn: 'রেৎসেপ্ট', example_de: 'Das Rezept ist vom Arzt.', example_bn: 'প্রেসক্রিপশনটি ডাক্তারের।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u9_3_3', german: 'Medikament', article: 'das', plural: 'die Medikamente', pos: 'noun', bengali: 'ওষুধ', english: 'medicine / medication', pronunciationBn: 'মেডিকামেন্ট', example_de: 'Ich brauche dieses Medikament.', example_bn: 'আমার এই ওষুধটি প্রয়োজন।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u9_3_4', german: 'Tablette', article: 'die', plural: 'die Tabletten', pos: 'noun', bengali: 'ট্যাবলেট / বড়ি', english: 'pill / tablet', pronunciationBn: 'টাবলেটে', example_de: 'Zwei Tabletten am Tag.', example_bn: 'দিনে দুটি ট্যাবলেট।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u9_3_5', german: 'Praxis', article: 'die', plural: 'die Praxen', pos: 'noun', bengali: 'ডাক্তারের চেম্বার', english: "doctor's office", pronunciationBn: 'প্রাক্সিস', example_de: 'Die Praxis öffnet um 8 Uhr.', example_bn: 'চেম্বারটি সকাল ৮টায় খোলে।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u9_3_6', german: 'täglich', article: null, pos: 'adv', bengali: 'প্রতিদিন / দৈনিক', english: 'daily', pronunciationBn: 'টেগলিশ', example_de: 'Einmal täglich einnehmen.', example_bn: 'দৈনিক একবার সেব্য।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u9_3_7', german: 'untersuchen', article: null, pos: 'verb', bengali: 'পরীক্ষা করা (চিকিৎসা)', english: 'to examine', pronunciationBn: 'উন্টারজুখেন', example_de: 'Der Arzt untersucht mich.', example_bn: 'ডাক্তার আমাকে পরীক্ষা করছেন।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u9_3_8', german: 'helfen', article: null, pos: 'verb', bengali: 'সাহায্য করা / কাজ দেওয়া', english: 'to help', pronunciationBn: 'হেলফেন', example_de: 'Das Medikament hilft schnell.', example_bn: 'ওষুধটি দ্রুত কাজ করে।', topic: 'health_travel', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "অ্যাপয়েন্টমেন্ট নেওয়ার ৩টি প্রধান ক্রিয়া",
      title_en: 'Making, Changing & Cancelling Appointments',
      content_bn: '১. Termin vereinbaren / machen = অ্যাপয়েন্টমেন্ট নেওয়া।\n২. Termin verschieben = সময় পিছিয়ে নেওয়া / পরিবর্তন করা।\n৩. Termin absagen = অ্যাপয়েন্টমেন্ট বাতিল করা।',
      rule_table: [
        { label: 'vereinbaren', value: 'সময় নেওয়া', note: 'Ich möchte einen Termin vereinbaren' },
        { label: 'verschieben', value: 'সময় বদলানো', note: 'Kann ich den Termin verschieben?' },
        { label: 'absagen', value: 'বাতিল করা', note: 'Ich muss den Termin leider absagen' }
      ]
    },
    exercises: [
      {
        id: 'ex_9_3_1',
        type: 'fill_blank',
        prompt_bn: "সঠিক পদটি বসান: 'Ich möchte einen Termin beim Arzt ___.' (অ্যাপয়েন্টমেন্ট নিতে চাই)",
        explanation_bn: "অ্যাপয়েন্টমেন্ট নেওয়ার সঠিক ক্রিয়া হলো 'vereinbaren' (Termin vereinbaren)।",
        sentenceWithBlank: 'Ich möchte einen Termin beim Arzt ___.',
        blankType: 'verb',
        options: ['vereinbaren', 'essen', 'kaufen', 'trinken'],
        correctAnswer: 'vereinbaren',
        translation_bn: 'আমি ডাক্তারের কাছে একটি অ্যাপয়েন্টমেন্ট নিতে চাই।'
      },
      {
        id: 'ex_9_3_2',
        type: 'multiple_choice',
        prompt_bn: "ডাক্তারের দেওয়া প্রেসক্রিপশনকে জার্মান ভাষায় কী বলা হয়?",
        explanation_bn: "প্রেসক্রিপশন হলো 'das Rezept' (ক্লীবলিঙ্গ)।",
        question: "প্রেসক্রিপশন এর সঠিক জার্মান কোনটি?",
        options: ['das Rezept', 'die Rechnung', 'der Brief', 'das Ticket'],
        correctAnswer: 'das Rezept'
      },
      {
        id: 'ex_9_3_3',
        type: 'matching_pairs',
        prompt_bn: 'চিকিৎসা পরিভাষার জোড়া মেলান:',
        explanation_bn: 'Termin = অ্যাপয়েন্টমেন্ট, Rezept = প্রেসক্রিপশন, Tablette = ট্যাবলেট, Praxis = চেম্বার',
        pairs: [
          { german: 'der Termin', bengali: 'অ্যাপয়েন্টমেন্ট' },
          { german: 'das Rezept', bengali: 'প্রেসক্রিপশন' },
          { german: 'die Tablette', bengali: 'ট্যাবলেট' },
          { german: 'die Praxis', bengali: 'চেম্বার' }
        ]
      }
    ]
  },
  {
    id: 'lesson_9_4',
    unitId: 'unit_9',
    title_bn: 'আবহাওয়া, চার ঋতু ও পোশাক-পরিচ্ছদ',
    title_en: 'Weather, Four Seasons & Clothing',
    subtitle_de: 'Das Wetter, die Jahreszeiten und Kleidung',
    order: 41,
    content: {
      intro_bn: 'জার্মানিতে আবহাওয়া নিয়ে কথা বলা সবচেয়ে প্রচলিত বিষয়:\n• প্রশ্ন: "Wie ist das Wetter heute?" (আজকের আবহাওয়া কেমন?)\n• উত্তর:\n১. "Die Sonne scheint." (সূর্য কিরণ দিচ্ছে।)\n২. "Es regnet." (বৃষ্টি হচ্ছে।)\n৩. "Es schneit." (তুষারপাত হচ্ছে।)\n৪. "Es ist warm / kalt / windig." (উষ্ণ / ঠান্ডা / বাতাস বইছে।)\n\nচার ঋতু (Die vier Jahreszeiten - সবই পুংলিঙ্গ der!):\n• der Frühling (বসন্ত), der Sommer (গ্রীষ্ম), der Herbst (শরৎ/হেমন্ত), der Winter (শীতকাল)।\nমাসের মতো ঋতুর ক্ষেত্রেও "im" বসে (im Winter, im Sommer)।',
      intro_en: 'Talk about weather: "Wie ist das Wetter heute?" Answers: "Die Sonne scheint", "Es regnet" (raining), "Es schneit" (snowing), "Es ist kalt/warm". All four seasons are masculine: der Frühling, der Sommer, der Herbst, der Winter (use "im Sommer").',
      examples: [
        { de: 'Wie ist das Wetter heute? - Es ist sehr schön und warm.', bn: 'আজকের আবহাওয়া কেমন? - খুব সুন্দর এবং উষ্ণ।', note: 'Wie ist das Wetter?' },
        { de: 'Nehmen Sie einen Regenschirm mit, es regnet!', bn: 'একটি ছাতা সাথে নিন, বৃষ্টি হচ্ছে!', note: 'es regnet' },
        { de: 'Im Winter ist es in Deutschland sehr kalt.', bn: 'শীতকালে জার্মানি খুব ঠান্ডা থাকে।', note: 'im Winter' },
        { de: 'Die Sonne scheint und der Himmel ist blau.', bn: 'সূর্য কিরণ দিচ্ছে এবং আকাশ নীল।', note: 'Die Sonne scheint' }
      ]
    },
    vocabulary: [
      { id: 'v_u9_4_1', german: 'Wetter', article: 'das', plural: null, pos: 'noun', bengali: 'আবহাওয়া', english: 'weather', pronunciationBn: 'ভেটার', example_de: 'Das Wetter ist herrlich.', example_bn: 'আবহাওয়া চমৎকার।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u9_4_2', german: 'Sonne', article: 'die', plural: null, pos: 'noun', bengali: 'সূর্য', english: 'sun', pronunciationBn: 'জোনে', example_de: 'Die Sonne scheint.', example_bn: 'সূর্য কিরণ দিচ্ছে।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u9_4_3', german: 'Regen', article: 'der', plural: null, pos: 'noun', bengali: 'বৃষ্টি', english: 'rain', pronunciationBn: 'রেগেন', example_de: 'Es gibt viel Regen.', example_bn: 'প্রচুর বৃষ্টি হচ্ছে।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u9_4_4', german: 'Schnee', article: 'der', plural: null, pos: 'noun', bengali: 'তুষার / বরফ', english: 'snow', pronunciationBn: 'শনে', example_de: 'Überall liegt Schnee.', example_bn: 'সবখানে তুষার জমেছে।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u9_4_5', german: 'kalt', article: null, pos: 'adj', bengali: 'ঠান্ডা / শীতল', english: 'cold', pronunciationBn: 'কাল্ট', example_de: 'Mir ist kalt.', example_bn: 'আমার ঠান্ডা লাগছে।', topic: 'essential_adjectives', level: 'A1' },
      { id: 'v_u9_4_6', german: 'warm', article: null, pos: 'adj', bengali: 'উষ্ণ / গরম', english: 'warm', pronunciationBn: 'ভার্ম', example_de: 'Heute ist es angenehm warm.', example_bn: 'আজ বেশ মনোরম উষ্ণতা।', topic: 'essential_adjectives', level: 'A1' },
      { id: 'v_u9_4_7', german: 'Sommer', article: 'der', plural: 'die Sommer', pos: 'noun', bengali: 'গ্রীষ্মকাল', english: 'summer', pronunciationBn: 'জোমার', example_de: 'Im Sommer fahre ich ans Meer.', example_bn: 'গ্রীষ্মে আমি সমুদ্রে যাই।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u9_4_8', german: 'Winter', article: 'der', plural: 'die Winter', pos: 'noun', bengali: 'শীতকাল', english: 'winter', pronunciationBn: 'ভিন্টার', example_de: 'Der Winter ist lang.', example_bn: 'শীতকাল অনেক দীর্ঘ।', topic: 'daily_routine_time', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'আবহাওয়া বাক্যে রহস্যময় কর্তা: "Es"',
      title_en: 'Impersonal Pronoun "Es" for Weather',
      content_bn: 'আবহাওয়ার সব বাক্যে একটি অদৃশ্য কর্তা থাকে, যা হলো "Es":\n• Es regnet (বৃষ্টি হচ্ছে)\n• Es schneit (তুষারপাত হচ্ছে)\n• Es ist windig (বাতাস বইছে)\n• Es ist kalt (ঠান্ডা লাগছে)',
      rule_table: [
        { label: 'Es regnet', value: 'বৃষ্টি হচ্ছে', note: 'regnen ক্রিয়া' },
        { label: 'Es schneit', value: 'তুষার পড়ছে', note: 'schneien ক্রিয়া' },
        { label: 'Es ist kalt / warm', value: 'ঠান্ডা / উষ্ণ', note: 'sein + বিশেষণ' }
      ]
    },
    exercises: [
      {
        id: 'ex_9_4_1',
        type: 'multiple_choice',
        prompt_bn: "জার্মান ভাষায় 'বৃষ্টি হচ্ছে' কীভাবে বলা হয়?",
        explanation_bn: "'Es regnet.' অর্থ বৃষ্টি হচ্ছে (regnen ক্রিয়ার রূপান্তর)।",
        question: "'বৃষ্টি হচ্ছে' এর সঠিক রূপ কোনটি?",
        options: ['Es regnet.', 'Es schneit.', 'Die Sonne scheint.', 'Es ist sonnig.'],
        correctAnswer: 'Es regnet.'
      },
      {
        id: 'ex_9_4_2',
        type: 'matching_pairs',
        prompt_bn: 'চার ঋতুর বাংলা ও জার্মান মেলান:',
        explanation_bn: 'Frühling = বসন্ত, Sommer = গ্রীষ্ম, Herbst = শরৎ, Winter = শীতকাল',
        pairs: [
          { german: 'der Frühling', bengali: 'বসন্তকাল' },
          { german: 'der Sommer', bengali: 'গ্রীষ্মকাল' },
          { german: 'der Herbst', bengali: 'শরৎ / হেমন্ত' },
          { german: 'der Winter', bengali: 'শীতকাল' }
        ]
      },
      {
        id: 'ex_9_4_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আজকের আবহাওয়া কেমন?'",
        explanation_bn: 'Wie ist das Wetter heute?',
        targetSentence: 'Wie ist das Wetter heute?',
        scrambledWords: ['heute?', 'das', 'Wetter', 'Wie', 'ist'],
        meaning_bn: 'আজকের আবহাওয়া কেমন?'
      }
    ]
  }
];

fs.writeFileSync(path.join(curriculumDir, 'unit9_health.json'), JSON.stringify(unit9_lessons, null, 2), 'utf8');
console.log('Unit 9 written: 4 lessons');

// ===========================================================================
// UNIT 10: Schreiben, E-Mails und Prüfung A1 (Lessons 10.1 to 10.4)
// ===========================================================================
const unit10_1 = readFirst('unit10_writing.json');
const unit10_lessons = [
  unit10_1,
  {
    id: 'lesson_10_2',
    unitId: 'unit_10',
    title_bn: 'অনানুষ্ঠানিক চিঠি/ইমেইল ও দাওয়াত (Informelle E-Mails)',
    title_en: 'Informal Emails, Invitations & Replies',
    subtitle_de: 'Informelle E-Mails: Einladungen und Zusagen',
    order: 43,
    content: {
      intro_bn: 'Goethe-Zertifikat A1 পরীক্ষার "Schreiben Teil 2" এ আপনাকে ৩০-৪০ শব্দের একটি সংক্ষিপ্ত চিঠি বা ইমেইল লিখতে হবে। অনানুষ্ঠানিক ইমেইল (বন্ধু বা পরিচিতদের কাছে) লেখার নিয়ম:\n\n১. সম্ভাষণ (Anrede):\n• পুরুষ বন্ধুর ক্ষেত্রে: "Lieber Alex," (কমা দিয়ে শুরু!)\n• নারী বন্ধুর ক্ষেত্রে: "Liebe Sarah," (কমা দিয়ে শুরু!)\nখুব সতর্ক থাকুন: কমার পর প্রথম লাইনটি ছোট হাতের অক্ষরে (lowercase) শুরু হবে!\n\n২. দাওয়াত দেওয়ার বাক্য:\n• "Ich möchte dich herzlich zu meiner Geburtstagsparty einladen." (আমি তোমাকে আমার জন্মদিনের পার্টিতে সাদর আমন্ত্রণ জানাতে চাই।)\n• "Die Party ist am Samstag um 18 Uhr bei mir zu Hause."\n\n৩. উপসংহার ও বিদায় (Grußformel):\n• "Viele Grüße" বা "Liebe Grüße" (কোনো যতিচিহ্ন ছাড়া!)\n• নিচে শুধু আপনার নাম: "Dein Talha" (পুরুষ) / "Deine Fatima" (নারী)।',
      intro_en: 'Master A1 informal email writing: Start with "Lieber [name]," (male) or "Liebe [name]," (female). Note that the text after the comma starts with a lowercase letter! Useful invitations: "Ich lade dich zu meiner Party ein". Sign off: "Viele Grüße" + your name.',
      examples: [
        { de: 'Liebe Lisa, wie geht es dir?', bn: 'প্রিয় লিসা, তুমি কেমন আছো?', note: 'Liebe + নারী নাম' },
        { de: 'Ich möchte dich zu meiner Party einladen.', bn: 'আমি তোমাকে আমার পার্টিতে আমন্ত্রণ জানাতে চাই।', note: 'einladen (আমন্ত্রণ)' },
        { de: 'Kannst du einen Salat mitbringen?', bn: 'তুমি কি একটি সালাদ নিয়ে আসতে পারবে?', note: 'mitbringen' },
        { de: 'Gib mir bitte bis Freitag Bescheid! Viele Grüße, Tom', bn: 'দয়া করে শুক্রবারের মধ্যে আমাকে জানিও! শুভকামনা, টম', note: 'Bescheid geben' }
      ]
    },
    vocabulary: [
      { id: 'v_u10_2_1', german: 'einladen', article: null, pos: 'verb', bengali: 'আমন্ত্রণ জানানো / দাওয়াত দেওয়া', english: 'to invite', pronunciationBn: 'আইনলাডেন', example_de: 'Ich lade dich ein.', example_bn: 'আমি তোমাকে দাওয়াত দিচ্ছি।', topic: 'goethe_exam_words', level: 'A1' },
      { id: 'v_u10_2_2', german: 'Einladung', article: 'die', plural: 'die Einladungen', pos: 'noun', bengali: 'আমন্ত্রণপত্র / দাওয়াত', english: 'invitation', pronunciationBn: 'আইনলাডুং', example_de: 'Danke für die Einladung!', example_bn: 'দাওয়াত দেওয়ার জন্য ধন্যবাদ!', topic: 'goethe_exam_words', level: 'A1' },
      { id: 'v_u10_2_3', german: 'mitbringen', article: null, pos: 'verb', bengali: 'সাথে নিয়ে আসা', english: 'to bring along', pronunciationBn: 'মিটব্রিঙেন', example_de: 'Bring bitte Kuchen mit!', example_bn: 'কেক সাথে নিয়ে এসো!', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u10_2_4', german: 'Geburtstag', article: 'der', plural: 'die Geburtstage', pos: 'noun', bengali: 'জন্মদিন', english: 'birthday', pronunciationBn: 'গেবুর্টসটাগ', example_de: 'Alles Gute zum Geburtstag!', example_bn: 'শুভ জন্মদিন!', topic: 'hobbies_leisure_sports', level: 'A1' },
      { id: 'v_u10_2_5', german: 'feiern', article: null, pos: 'verb', bengali: 'উদযাপন করা', english: 'to celebrate', pronunciationBn: 'ফায়ার্ন', example_de: 'Wir feiern am Samstag.', example_bn: 'আমরা শনিবারে উদযাপন করব।', topic: 'hobbies_leisure_sports', level: 'A1' },
      { id: 'v_u10_2_6', german: 'Bescheid', article: 'der', plural: null, pos: 'noun', bengali: 'খবর / সিদ্ধান্ত', english: 'notice / decision', pronunciationBn: 'বেশাইড', example_de: 'Sag mir bitte Bescheid!', example_bn: 'আমাকে জানিও দয়া করে!', topic: 'goethe_exam_words', level: 'A1' },
      { id: 'v_u10_2_7', german: 'antworten', article: null, pos: 'verb', bengali: 'উত্তর দেওয়া', english: 'to answer / reply', pronunciationBn: 'আন্টভোরটেন', example_de: 'Bitte antworte mir bald.', example_bn: 'দয়া করে আমাকে শীঘ্রই উত্তর দিয়ো।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u10_2_8', german: 'Grüße', article: 'die', plural: 'die Grüße', pos: 'noun', bengali: 'শুভেচ্ছা', english: 'greetings', pronunciationBn: 'গ্রুসে', example_de: 'Viele Grüße aus Berlin!', example_bn: 'বার্লিন থেকে অনেক শুভেচ্ছা!', topic: 'greetings', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'অনানুষ্ঠানিক ইমেইলের কাঠামো সূত্র',
      title_en: 'Informal Email Skeleton',
      content_bn: '১. সম্ভাষণ: Lieber [ছেলে] / Liebe [মেয়ে],\n২. সূচনা: wie geht es dir? Danke für deine Einladung.\n৩. মূল বিষয়: Ich komme gern / Ich kann leider nicht kommen.\n৪. সমাপ্তি: Viele Grüße,\n৫. আপনার নাম।',
      rule_table: [
        { label: 'পুরুষের ক্ষেত্রে', value: 'Lieber Michael,', note: 'শেষে কমা' },
        { label: 'নারীর ক্ষেত্রে', value: 'Liebe Julia,', note: 'শেষে কমা' },
        { label: 'বিদায়', value: 'Viele Grüße / Liebe Grüße', note: 'কোনো ফুলস্টপ বা কমা ছাড়া' }
      ]
    },
    exercises: [
      {
        id: 'ex_10_2_1',
        type: 'multiple_choice',
        prompt_bn: "একজন নারী বন্ধুকে অনানুষ্ঠানিক ইমেইলে কীভাবে সম্ভাষণ করবেন?",
        explanation_bn: "নারী বন্ধুর জন্য 'Liebe [নাম],' ব্যবহৃত হয় (যেমন: Liebe Sarah,)।",
        question: "নারী বন্ধুকে সম্ভাষণে কোনটি সঠিক?",
        options: ['Liebe Sarah,', 'Lieber Sarah,', 'Sehr geehrte Sarah,', 'Hallo Herr Sarah,'],
        correctAnswer: 'Liebe Sarah,'
      },
      {
        id: 'ex_10_2_2',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'দাওয়াত দেওয়ার জন্য তোমাকে অনেক ধন্যবাদ!'",
        explanation_bn: 'Vielen Dank für deine Einladung!',
        targetSentence: 'Vielen Dank für deine Einladung!',
        scrambledWords: ['Einladung!', 'deine', 'Dank', 'für', 'Vielen'],
        meaning_bn: 'দাওয়াত দেওয়ার জন্য তোমাকে অনেক ধন্যবাদ!'
      },
      {
        id: 'ex_10_2_3',
        type: 'matching_pairs',
        prompt_bn: 'ইমেইলের অভিব্যক্তির সঠিক বাংলা অর্থ মেলান:',
        explanation_bn: 'Liebe Grüße = অনেক শুভেচ্ছা, Sag mir Bescheid = আমাকে জানিও, einladen = দাওয়াত দেওয়া',
        pairs: [
          { german: 'Liebe Grüße', bengali: 'অনেক শুভেচ্ছা' },
          { german: 'Sag mir Bescheid', bengali: 'আমাকে জানিও' },
          { german: 'einladen', bengali: 'দাওয়াত দেওয়া' },
          { german: 'mitbringen', bengali: 'সাথে নিয়ে আসা' }
        ]
      }
    ]
  },
  {
    id: 'lesson_10_3',
    unitId: 'unit_10',
    title_bn: 'আনুষ্ঠানিক চিঠি/ইমেইল ও ক্ষমা প্রার্থনা (Formelle E-Mails)',
    title_en: 'Formal Letters, Inquiries & Excuses',
    subtitle_de: 'Formelle E-Mails: Anrede, Gruß und Entschuldigung',
    order: 44,
    content: {
      intro_bn: 'অফিস, ভাষা স্কুল, হোটেল বা বাড়িওয়ালার কাছে আনুষ্ঠানিকভাবে চিঠি বা ইমেইল লেখার নির্দিষ্ট নিয়ম আছে:\n\n১. আনুষ্ঠানিক সম্ভাষণ (Anrede):\n• প্রাপকের নাম জানা না থাকলে: "Sehr geehrte Damen und Herren," (শ্রদ্ধেয় মহোদয়া ও মহোদয়গণ,)\n• পুরুষ কর্মকর্তা: "Sehr geehrter Herr Müller," (মিস্টার মুলার)\n• নারী কর্মকর্তা: "Sehr geehrte Frau Schmidt," (মিসেস শ্মিট)\n\n২. উদ্দেশ্য ও অসুস্থতাজনিত কারণ:\n• "Ich kann heute leider nicht zum Unterricht kommen, weil ich krank bin." (আমি আজ ক্লাসে আসতে পারছি না, কারণ আমি অসুস্থ।)\n• "Ich habe einen Arzttermin."\n\n৩. আনুষ্ঠানিক বিদায় (Grußformel):\n• "Mit freundlichen Grüßen" (কোনো কমা ছাড়া!)\n• নিচে আপনার পুরো নাম: "Talha Rahman"।',
      intro_en: 'Formal email format: "Sehr geehrte Damen und Herren," (unknown recipient) or "Sehr geehrter Herr [Name]," / "Sehr geehrte Frau [Name],". State your reason: "Ich kann leider nicht kommen, weil ich krank bin". Sign off strictly with: "Mit freundlichen Grüßen".',
      examples: [
        { de: 'Sehr geehrte Damen und Herren,', bn: 'শ্রদ্ধেয় মহোদয়া ও মহোদয়গণ,', note: 'নাম জানা না থাকলে' },
        { de: 'Sehr geehrte Frau Becker, ich kann morgen leider nicht zum Kurs kommen.', bn: 'শ্রদ্ধেয় মিসেস বেকার, আমি আগামীকাল ক্লাসে আসতে পারছি না।', note: 'অনুপস্থিতির কারণ' },
        { de: 'Können Sie mir bitte die Hausaufgaben per E-Mail schicken?', bn: 'আপনি কি দয়া করে বাড়ির কাজগুলো ইমেইলে পাঠাতে পারবেন?', note: 'নম্র অনুরোধ' },
        { de: 'Mit freundlichen Grüßen, Talha', bn: 'শ্রদ্ধার সাথে, তালহা', note: 'আনুষ্ঠানিক ইতি' }
      ]
    },
    vocabulary: [
      { id: 'v_u10_3_1', german: 'sehr geehrte', article: null, pos: 'phrase', bengali: 'শ্রদ্ধেয় / মাননীয় (আনুষ্ঠানিক সম্ভাষণ)', english: 'dear (formal)', pronunciationBn: 'জেয়ার গেয়ের্টে', example_de: 'Sehr geehrte Damen und Herren,', example_bn: 'শ্রদ্ধেয় মহোদয়া ও মহোদয়গণ,', topic: 'goethe_exam_words', level: 'A1' },
      { id: 'v_u10_3_2', german: 'schicken', article: null, pos: 'verb', bengali: 'পাঠানো / প্রেরণ করা', english: 'to send', pronunciationBn: 'শিকেন', example_de: 'Ich schicke Ihnen die Unterlagen.', example_bn: 'আমি আপনাকে কাগজপত্র পাঠাচ্ছি।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u10_3_3', german: 'Information', article: 'die', plural: 'die Informationen', pos: 'noun', bengali: 'তথ্য', english: 'information', pronunciationBn: 'ইনফরমাৎসিওন', example_de: 'Ich brauche mehr Informationen.', example_bn: 'আমার আরো তথ্যের প্রয়োজন।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u10_3_4', german: 'Unterricht', article: 'der', plural: null, pos: 'noun', bengali: 'ক্লাস / পাঠদান', english: 'class / lesson', pronunciationBn: 'উন্টাররিশ্ট', example_de: 'Der Unterricht beginnt um 9 Uhr.', example_bn: 'ক্লাস সকাল ৯টায় শুরু হয়।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u10_3_5', german: 'Entschuldigung', article: 'die', plural: 'die Entschuldigungen', pos: 'noun', bengali: 'ক্ষমা প্রার্থনা / ছুটির দরখাস্ত', english: 'apology / excuse note', pronunciationBn: 'এন্টশুলডিগুং', example_de: 'Hier ist meine Entschuldigung.', example_bn: 'এই যে আমার ছুটির দরখাস্ত।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u10_3_6', german: 'fehlen', article: null, pos: 'verb', bengali: 'অনুপস্থিত থাকা / ঘাটতি থাকা', english: 'to be missing / absent', pronunciationBn: 'ফেলেন', example_de: 'Er fehlt heute im Kurs.', example_bn: 'তিনি আজ কোর্সে অনুপস্থিত।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u10_3_7', german: 'hoffen', article: null, pos: 'verb', bengali: 'আশা করা', english: 'to hope', pronunciationBn: 'হফেন', example_de: 'Ich hoffe, es geht Ihnen gut.', example_bn: 'আশা করি আপনি ভালো আছেন।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u10_3_8', german: 'Mit freundlichen Grüßen', article: null, pos: 'phrase', bengali: 'শ্রদ্ধা ও শুভেচ্ছার সাথে (আনুষ্ঠানিক ইতি)', english: 'sincerely / best regards', pronunciationBn: 'মিট ফ্রয়ন্টলিশেন গ্রুসেন', example_de: 'Mit freundlichen Grüßen', example_bn: 'শ্রদ্ধার সাথে', topic: 'goethe_exam_words', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'আনুষ্ঠানিক ইমেইলের সমাপ্তি বাক্য',
      title_en: 'Formal Sign-off Golden Rule',
      content_bn: 'আনুষ্ঠানিক ইমেইলের ইতি টানতে সর্বদা ব্যবহৃত হয়:\n"Mit freundlichen Grüßen"\nখেয়াল রাখবেন: এই বাক্যের শেষে জার্মান ব্যাকরণে কোনো কমা (comma) বা ফুলস্টপ বসে না! এর ঠিক পরের লাইনে আপনার পুরো নাম লিখতে হয়।',
      rule_table: [
        { label: 'সঠিক রূপ', value: 'Mit freundlichen Grüßen\n[আপনার নাম]', note: 'কোনো কমা নেই!' },
        { label: 'ভুল রূপ', value: 'Mit freundlichen Grüßen,', note: 'ইংরেজি স্টাইলে কমা দেওয়া ভুল' }
      ]
    },
    exercises: [
      {
        id: 'ex_10_3_1',
        type: 'multiple_choice',
        prompt_bn: "প্রাপকের নাম জানা না থাকলে আনুষ্ঠানিক ইমেইলের শুরু কী দিয়ে হয়?",
        explanation_bn: "'Sehr geehrte Damen und Herren,' হলো নাম না জানা আনুষ্ঠানিক সম্ভাষণ।",
        question: "নাম না জানা আনুষ্ঠানিক সম্ভাষণ কোনটি?",
        options: ['Sehr geehrte Damen und Herren,', 'Hallo zusammen,', 'Liebe Damen und Herren,', 'Guten Tag Herr Unbekannt,'],
        correctAnswer: 'Sehr geehrte Damen und Herren,'
      },
      {
        id: 'ex_10_3_2',
        type: 'fill_blank',
        prompt_bn: "পুরুষ কর্মকর্তাকে আনুষ্ঠানিক সম্বোধনে বসান: 'Sehr ___ Herr Müller,'",
        explanation_bn: "পুরুষের ক্ষেত্রে 'geehrter' হয় (Sehr geehrter Herr Müller,)।",
        sentenceWithBlank: 'Sehr ___ Herr Müller,',
        blankType: 'article',
        options: ['geehrter', 'geehrte', 'geehrten', 'liebe'],
        correctAnswer: 'geehrter',
        translation_bn: 'শ্রদ্ধেয় মিস্টার মুলার,'
      },
      {
        id: 'ex_10_3_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আমি আজ ক্লাসে আসতে পারছি না।'",
        explanation_bn: 'Ich kann heute leider nicht zum Unterricht kommen.',
        targetSentence: 'Ich kann heute leider nicht zum Unterricht kommen.',
        scrambledWords: ['kommen.', 'nicht', 'heute', 'Unterricht', 'kann', 'zum', 'Ich', 'leider'],
        meaning_bn: 'আমি আজ ক্লাসে আসতে পারছি না।'
      }
    ]
  },
  {
    id: 'lesson_10_4',
    unitId: 'unit_10',
    title_bn: 'অফিসিয়াল ফর্ম পূরণ ও ব্যক্তিগত তথ্য (Formulare ausfüllen)',
    title_en: 'Filling Official German Forms & Personal Data',
    subtitle_de: 'Amtliche Formulare ausfüllen & Behördengänge',
    order: 45,
    content: {
      intro_bn: 'Goethe A1 পরীক্ষার "Schreiben Teil 1" এ একটি ফর্ম পূরণ করতে দেওয়া হয় (যেমন: হোটেল রেজিস্ট্রেশন, লাইব্রেরি কার্ড বা স্পোর্টস ক্লাব ফর্ম)।\n\nফর্মের গুরুত্বপূর্ণ শব্দভাণ্ডার:\n• Familienname / Nachname: বংশের নাম / পদবি (Surname - যেমন: Rahman, Müller)\n• Vorname: মূল ডাকনাম (First name - যেমন: Talha, Alex)\n• Geburtsdatum: জন্মতারিখ (দিন.মাস.বছর - যেমন: 15.08.1998)\n• Geburtsort: জন্মস্থান (শহর - যেমন: Dhaka, Berlin)\n• Staatsangehörigkeit / Nationalität: জাতীয়তা (যেমন: bangladisch, deutsch)\n• Wohnort: বর্তমান বাসস্থান / শহরের নাম\n• Straße und Hausnummer: রাস্তার নাম ও বাড়ির নম্বর (যেমন: Berliner Str. 12)\n• Postleitzahl (PLZ): ৫ ডিজিটের জার্মান পোস্ট কোড (যেমন: 10115)\n• Familienstand: বৈবাহিক অবস্থা (ledig = অবিবাহিত, verheiratet = বিবাহিত, geschieden = তালাকপ্রাপ্ত)\n• Unterschrift: আপনার স্বাক্ষর।',
      intro_en: 'Pass Goethe A1 Schreiben Part 1: Understand official form terms: Familienname (surname), Vorname (first name), Geburtsdatum (birthdate), Staatsangehörigkeit (nationality), Postleitzahl (postal code), Familienstand: ledig (single) / verheiratet (married), Unterschrift (signature).',
      examples: [
        { de: 'Familienname: Müller, Vorname: Thomas', bn: 'পদবি: মুলার, নাম: টমাস', note: 'নামের অংশ' },
        { de: 'Geburtsdatum: 12.04.1995 in Dhaka', bn: 'জন্মতারিখ: ১২ এপ্রিল ১৯৯৫, ঢাকায়', note: 'তারিখ ও স্থান' },
        { de: 'Familienstand: ledig / verheiratet', bn: 'বৈবাহিক অবস্থা: অবিবাহিত / বিবাহিত', note: 'Familienstand' },
        { de: 'Unterschrift: Bitte hier unterschreiben!', bn: 'স্বাক্ষর: দয়া করে এখানে স্বাক্ষর করুন!', note: 'Unterschrift' }
      ]
    },
    vocabulary: [
      { id: 'v_u10_4_1', german: 'Familienname', article: 'der', plural: 'die Familiennamen', pos: 'noun', bengali: 'বংশের নাম / পদবি (Surname)', english: 'surname / last name', pronunciationBn: 'ফামিলিয়েননামে', example_de: 'Mein Familienname ist Khan.', example_bn: 'আমার পদবি হলো খান।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u10_4_2', german: 'Vorname', article: 'der', plural: 'die Vornamen', pos: 'noun', bengali: 'মূল নাম (First Name)', english: 'first name', pronunciationBn: 'ফোরনামে', example_de: 'Mein Vorname ist Talha.', example_bn: 'আমার নাম তালহা।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u10_4_3', german: 'Geburtsdatum', article: 'das', plural: 'die Geburtsdaten', pos: 'noun', bengali: 'জন্মতারিখ', english: 'date of birth', pronunciationBn: 'গেবুর্টসডাটুম', example_de: 'Wie ist Ihr Geburtsdatum?', example_bn: 'আপনার জন্মতারিখ কত?', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u10_4_4', german: 'Postleitzahl', article: 'die', plural: 'die Postleitzahlen', pos: 'noun', bengali: 'পোস্ট কোড (PLZ)', english: 'postal code / zip code', pronunciationBn: 'পোস্টলাইটৎসাল', example_de: 'Die Postleitzahl hat 5 Ziffern.', example_bn: 'জার্মান পোস্ট কোড ৫ সংখ্যার হয়।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u10_4_5', german: 'Familienstand', article: 'der', plural: null, pos: 'noun', bengali: 'বৈবাহিক অবস্থা', english: 'marital status', pronunciationBn: 'ফামিলিয়েনশ্টান্ট', example_de: 'Familienstand: ledig.', example_bn: 'বৈবাহিক অবস্থা: অবিবাহিত।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u10_4_6', german: 'ledig', article: null, pos: 'adj', bengali: 'অবিবাহিত (Single)', english: 'single / unmarried', pronunciationBn: 'লেডিশ', example_de: 'Ich bin noch ledig.', example_bn: 'আমি এখনো অবিবাহিত।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u10_4_7', german: 'verheiratet', article: null, pos: 'adj', bengali: 'বিবাহিত', english: 'married', pronunciationBn: 'ফেয়ারহাইরাটেট', example_de: 'Wir sind seit fünf Jahren verheiratet.', example_bn: 'আমরা পাঁচ বছর ধরে বিবাহিত।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u10_4_8', german: 'Unterschrift', article: 'die', plural: 'die Unterschriften', pos: 'noun', bengali: 'স্বাক্ষর / দস্তখত', english: 'signature', pronunciationBn: 'উন্টারশ্রিফট', example_de: 'Ihre Unterschrift bitte hier.', example_bn: 'দয়া করে এখানে আপনার স্বাক্ষর দিন।', topic: 'work_office_education', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'জার্মান ফর্মে তারিখ লেখার সঠিক নিয়ম',
      title_en: 'Date Formatting in German Forms',
      content_bn: 'জার্মানিতে তারিখ লেখার নিয়ম হলো: দিন.মাস.বছর (Day.Month.Year)। ডট (.) দিয়ে আলাদা করতে হয়। যেমন: ১৫ই আগস্ট ১৯৯৫ = 15.08.1995।',
      rule_table: [
        { label: 'দিন.মাস.বছর', value: '15.08.1998', note: 'ডট (.) ব্যবহার' },
        { label: 'PLZ (পোস্টকোড)', value: '10115 Berlin', note: '৫ ডিজিটের কোড' },
        { label: 'ঠিকানা', value: 'Straße + Hausnummer', note: 'আগে রাস্তার নাম, পরে বাড়ির নম্বর' }
      ]
    },
    exercises: [
      {
        id: 'ex_10_4_1',
        type: 'matching_pairs',
        prompt_bn: 'অফিসিয়াল ফর্মের পরিভাষার সাথে বাংলা অর্থ মেলান:',
        explanation_bn: 'Familienname = পদবি, Vorname = নাম, Geburtsdatum = জন্মতারিখ, Unterschrift = স্বাক্ষর',
        pairs: [
          { german: 'Familienname', bengali: 'পদবি (Surname)' },
          { german: 'Vorname', bengali: 'মূল নাম' },
          { german: 'Geburtsdatum', bengali: 'জন্মতারিখ' },
          { german: 'Unterschrift', bengali: 'স্বাক্ষর' }
        ]
      },
      {
        id: 'ex_10_4_2',
        type: 'multiple_choice',
        prompt_bn: "জার্মান ফর্মে 'ledig' শব্দের অর্থ কী?",
        explanation_bn: "'ledig' অর্থ অবিবাহিত (single)।",
        question: "'ledig' এর সঠিক অর্থ কোনটি?",
        options: ['অবিবাহিত', 'বিবাহিত', 'তালাকপ্রাপ্ত', 'বিধবা'],
        correctAnswer: 'অবিবাহিত'
      },
      {
        id: 'ex_10_4_3',
        type: 'fill_blank',
        prompt_bn: "জার্মান ঠিকানায় কোনটি আগে বসে? '___ 25' (রাস্তা নাকি নম্বর)",
        explanation_bn: "জার্মানিতে আগে রাস্তার নাম এবং পরে বাড়ির নম্বর বসে (যেমন: Hauptstraße 25)।",
        sentenceWithBlank: '___ 25, 10115 Berlin.',
        blankType: 'noun',
        options: ['Hauptstraße', '25 Hauptstraße', 'Berlin Straße 25', 'Haus'],
        correctAnswer: 'Hauptstraße',
        translation_bn: 'হাউপ্টশ্ট্রাসে ২৫, ১০১১৫ বার্লিন।'
      }
    ]
  }
];

fs.writeFileSync(path.join(curriculumDir, 'unit10_writing.json'), JSON.stringify(unit10_lessons, null, 2), 'utf8');
console.log('Unit 10 written: 4 lessons');
console.log('ALL UNITS 2 THROUGH 10 EXPANDED TO 4 LESSONS EACH!');
