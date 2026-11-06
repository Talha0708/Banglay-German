// scripts/build-expanded-curriculum.js
// Comprehensive CEFR A1 curriculum generator for Banglay-German
// Expands Units 2 through 10 into 4 rich, progressive lessons each (total 45 lessons across Level 0 - Unit 10)

const fs = require('fs');
const path = require('path');

const curriculumDir = path.join(__dirname, '../data/curriculum');

// Read existing lesson 1 of each unit to retain it as lesson_X_1
function readExistingFirstLesson(fileName) {
  const filePath = path.join(curriculumDir, fileName);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(data) ? data[0] : null;
  }
  return null;
}

// ---------------------------------------------------------------------------
// UNIT 2: Familie und Menschen (Lessons 2.1 to 2.4)
// ---------------------------------------------------------------------------
const unit2_existing = readExistingFirstLesson('unit2_family.json');
const unit2_lessons = [
  unit2_existing || {
    id: 'lesson_2_1',
    unitId: 'unit_2',
    title_bn: "পরিবার ও 'haben' ক্রিয়ার ব্যবহার",
    title_en: "Family & The Verb 'haben'",
    subtitle_de: 'Familie und das Verb haben',
    order: 10,
    content: {
      intro_bn: "পরিবারের সদস্যদের পরিচয় দিতে 'haben' ক্রিয়া এবং 'mein/dein' সর্বনাম ব্যবহৃত হয়।",
      intro_en: 'Learn family members and the verb haben.',
      examples: [
        { de: 'Ich habe einen Bruder.', bn: 'আমার একজন ভাই আছে।', note: 'Akkusativ' },
        { de: 'Meine Mutter heißt Salma.', bn: 'আমার মায়ের নাম সালমা।' }
      ]
    },
    vocabulary: [],
    grammarTip: { title_bn: '', title_en: '', content_bn: '', rule_table: [] },
    exercises: []
  },
  {
    id: 'lesson_2_2',
    unitId: 'unit_2',
    title_bn: 'সম্বন্ধসূচক সর্বনাম (mein, dein, sein, ihr)',
    title_en: 'Possessive Determiners (my, your, his, her)',
    subtitle_de: 'Possessivartikel: mein, dein, sein, ihr',
    order: 11,
    content: {
      intro_bn: 'কারো কোনো জিনিস বা সম্পর্ক বোঝাতে জার্মান ভাষায় পজেসিভ আর্টিকেল (সম্বন্ধসূচক পদ) ব্যবহৃত হয়। যেমন:\n• ich (আমি) -> mein / meine (আমার)\n• du (তুমি) -> dein / deine (তোমার)\n• er (সে/তিনি - পুংলিঙ্গ) -> sein / seine (তার)\n• sie (সে/তিনি - স্ত্রীলিঙ্গ) -> ihr / ihre (তার)\n• Sie (আপনি - সম্মানসূচক) -> Ihr / Ihre (আপনার)\n\nযদি বিশেষ্যটি স্ত্রীলিঙ্গ (die) বা বহুবচন (die) হয়, তবে শেষে একটি "-e" যোগ হয় (meine, deine, seine, ihre)!',
      intro_en: 'Possessive articles express ownership or relationship: mein/dein/sein/ihr. When modifying feminine or plural nouns, add an -e (meine Mutter, deine Eltern).',
      examples: [
        { de: 'Das ist mein Vater und das ist meine Mutter.', bn: 'ইনি আমার বাবা এবং ইনি আমার মা।', note: 'mein (der) vs meine (die)' },
        { de: 'Wie heißt deine Schwester?', bn: 'তোমার বোনের নাম কী?', note: 'deine (die)' },
        { de: 'Sein Bruder wohnt in München.', bn: 'তার (ছেলেটির) ভাই মিউনিখে থাকে।', note: 'sein (er-এর জন্য)' },
        { de: 'Ihre Tochter lernt Deutsch.', bn: 'তার (মেয়েটির) মেয়ে জার্মান শিখছে।', note: 'ihre (sie-এর জন্য)' },
        { de: 'Ist das Ihr Pass, Herr Becker?', bn: 'এটি কি আপনার পাসপোর্ট, মিস্টার বেকার?', note: 'Ihr (সম্মানসূচক Sie)' }
      ]
    },
    vocabulary: [
      { id: 'v_u2_2_1', german: 'Sohn', article: 'der', plural: 'die Söhne', pos: 'noun', bengali: 'ছেলে / পুত্র', english: 'son', pronunciationBn: 'জোন', example_de: 'Mein Sohn geht in die Schule.', example_bn: 'আমার ছেলে স্কুলে যায়।', topic: 'family', level: 'A1' },
      { id: 'v_u2_2_2', german: 'Tochter', article: 'die', plural: 'die Töchter', pos: 'noun', bengali: 'মেয়ে / কন্যা', english: 'daughter', pronunciationBn: 'টখটার', example_de: 'Ihre Tochter ist Ärztin.', example_bn: 'তার মেয়ে একজন চিকিৎসক।', topic: 'family', level: 'A1' },
      { id: 'v_u2_2_3', german: 'Opa', article: 'der', plural: 'die Opas', pos: 'noun', bengali: 'দাদা / নানা', english: 'grandpa', pronunciationBn: 'ওপা', example_de: 'Mein Opa liest die Zeitung.', example_bn: 'আমার দাদা পত্রিকা পড়ছেন।', topic: 'family', level: 'A1' },
      { id: 'v_u2_2_4', german: 'Oma', article: 'die', plural: 'die Omas', pos: 'noun', bengali: 'দাদী / নানী', english: 'grandma', pronunciationBn: 'ওমা', example_de: 'Meine Oma kocht sehr lecker.', example_bn: 'আমার দাদী দারুণ রান্না করেন।', topic: 'family', level: 'A1' },
      { id: 'v_u2_2_5', german: 'Großeltern', article: 'die', plural: 'die Großeltern', pos: 'noun', bengali: 'দাদা-দাদী / নানা-নানী', english: 'grandparents', pronunciationBn: 'গ্রোসএলটার্ন', example_de: 'Meine Großeltern leben in Hamburg.', example_bn: 'আমার দাদা-দাদী হামবুর্গে থাকেন।', topic: 'family', level: 'A1' },
      { id: 'v_u2_2_6', german: 'Onkel', article: 'der', plural: 'die Onkel', pos: 'noun', bengali: 'চাচা / মামা / খালু', english: 'uncle', pronunciationBn: 'অনকেল', example_de: 'Sein Onkel ist Ingenieur.', example_bn: 'তার চাচা একজন প্রকৌশলী।', topic: 'family', level: 'A1' },
      { id: 'v_u2_2_7', german: 'Tante', article: 'die', plural: 'die Tanten', pos: 'noun', bengali: 'ফুফু / খালা / চাচী', english: 'aunt', pronunciationBn: 'টানটে', example_de: 'Meine Tante kommt heute.', example_bn: 'আমার খালা আজ আসছেন।', topic: 'family', level: 'A1' },
      { id: 'v_u2_2_8', german: 'Freund', article: 'der', plural: 'die Freunde', pos: 'noun', bengali: 'বন্ধু (ছেলে) / বয়ফ্রেন্ড', english: 'friend / boyfriend', pronunciationBn: 'ফ্রয়ন্ট', example_de: 'Er ist mein bester Freund.', example_bn: 'সে আমার সেরা বন্ধু।', topic: 'family', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'পজেসিভ চার্ট: কে কার জন্য?',
      title_en: 'Possessive Determiner Matrix',
      content_bn: 'পুংলিঙ্গ ও ক্লীবলিঙ্গে মূল রূপ (mein, dein, sein, ihr) ব্যবহৃত হয়। স্ত্রীলিঙ্গ এবং বহুবচনে রূপের সাথে একটি "-e" যোগ হয়।',
      rule_table: [
        { label: 'der / das (পুং / ক্লীব)', value: 'mein / dein / sein / ihr', note: 'mein Sohn, mein Kind' },
        { label: 'die (স্ত্রীলিঙ্গ)', value: 'meine / deine / seine / ihre', note: 'meine Tochter, deine Oma' },
        { label: 'die (বহুবচন)', value: 'meine / deine / seine / ihre', note: 'meine Eltern, seine Kinder' }
      ]
    },
    exercises: [
      {
        id: 'ex_2_2_1',
        type: 'fill_blank',
        prompt_bn: "সঠিক রূপটি বসান: 'Das ist ___ Tochter.' (ইনি আমার মেয়ে)",
        explanation_bn: 'Tochter হলো স্ত্রীলিঙ্গ (die Tochter), তাই meine হবে।',
        sentenceWithBlank: 'Das ist ___ Tochter.',
        blankType: 'article',
        options: ['meine', 'mein', 'meinen', 'meiner'],
        correctAnswer: 'meine',
        translation_bn: 'ইনি আমার মেয়ে।'
      },
      {
        id: 'ex_2_2_2',
        type: 'multiple_choice',
        prompt_bn: "মেয়েটির (sie) ভাই বোঝাতে কোনটি সঠিক?",
        explanation_bn: "মেয়েটির (sie) জন্য পজেসিভ হলো 'ihr'। Bruder পুংলিঙ্গ হওয়ায় 'ihr Bruder' হবে।",
        question: "মেয়েটির ভাই বোঝাতে সঠিক কোনটি?",
        options: ['ihr Bruder', 'sein Bruder', 'ihre Bruder', 'meine Bruder'],
        correctAnswer: 'ihr Bruder'
      },
      {
        id: 'ex_2_2_3',
        type: 'matching_pairs',
        prompt_bn: 'পারিবারিক সম্পর্কের বাংলা ও জার্মান মেলান:',
        explanation_bn: 'Opa = দাদা/নানা, Oma = দাদী/নানী, Onkel = চাচা/মামা, Tante = ফুফু/খালা',
        pairs: [
          { german: 'Opa', bengali: 'দাদা / নানা' },
          { german: 'Oma', bengali: 'দাদী / নানী' },
          { german: 'Onkel', bengali: 'চাচা / মামা' },
          { german: 'Tante', bengali: 'ফুফু / খালা' }
        ]
      },
      {
        id: 'ex_2_2_4',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য তৈরি করুন: 'তার বোন খুব ভালো গান গায়।'",
        explanation_bn: 'Seine Schwester singt sehr gut.',
        targetSentence: 'Seine Schwester singt sehr gut.',
        scrambledWords: ['sehr', 'Seine', 'singt', 'Schwester', 'gut.'],
        meaning_bn: 'তার বোন খুব ভালো গান গায়।'
      },
      {
        id: 'ex_2_2_5',
        type: 'article_quiz',
        prompt_bn: "'Tochter' শব্দের সঠিক আর্টিকেল কোনটি?",
        explanation_bn: 'Tochter হলো স্ত্রীলিঙ্গ (die Tochter)।',
        noun: 'Tochter',
        meaning_bn: 'মেয়ে / কন্যা',
        correctArticle: 'die'
      },
      {
        id: 'ex_2_2_6',
        type: 'listening',
        prompt_bn: 'অডিও শুনে সঠিক জার্মান শব্দটি বেছে নিন:',
        explanation_bn: "অডিওতে বলা হয়েছে 'Großeltern' (দাদা-দাদী)।",
        audioText: 'Großeltern',
        options: ['Großeltern', 'Geschwister', 'Eltern', 'Kinder'],
        correctAnswer: 'Großeltern'
      }
    ]
  },
  {
    id: 'lesson_2_3',
    unitId: 'unit_2',
    title_bn: 'মানুষের রূপ ও বয়স বর্ণনা',
    title_en: 'Describing People, Appearance & Age',
    subtitle_de: 'Personen beschreiben und Alter',
    order: 12,
    content: {
      intro_bn: 'কারো বয়স জানতে চাওয়া এবং মানুষের বাহ্যিক রূপ বর্ণনা করা A1 পরীক্ষার জন্য অতীব গুরুত্বপূর্ণ।\n• বয়স জিজ্ঞাসা: "Wie alt bist du?" (তোমার বয়স কত?) / "Wie alt sind Sie?" (আপনার বয়স কত?)\n• বয়স বলা: "Ich bin 25 Jahre alt." (আমার বয়স ২৫ বছর।)\n• শারীরিক ও চারিত্রিক বিশেষণ: groß (লম্বা), klein (খাটো), jung (তরুণ), alt (বয়স্ক), nett (সদয়), freundlich (বন্ধুভাবাপন্ন)।',
      intro_en: 'Ask and express age using sein (Ich bin 20 Jahre alt). Use basic adjectives to describe appearance and traits: groß, klein, jung, alt, nett, freundlich.',
      examples: [
        { de: 'Wie alt bist du? - Ich bin 28 Jahre alt.', bn: 'তোমার বয়স কত? - আমার বয়স ২৮ বছর।', note: 'Wie alt bist du?' },
        { de: 'Mein Vater ist sehr groß und freundlich.', bn: 'আমার বাবা অনেক লম্বা এবং বন্ধুভাবাপন্ন।', note: 'groß und freundlich' },
        { de: 'Sie hat lange Haare und blaue Augen.', bn: 'তার লম্বা চুল এবং নীল চোখ আছে।', note: 'haben + Akkusativ' },
        { de: 'Er ist noch sehr jung.', bn: 'সে এখনো অনেক তরুণ।', note: 'jung' }
      ]
    },
    vocabulary: [
      { id: 'v_u2_3_1', german: 'alt', article: null, pos: 'adj', bengali: 'বয়স্ক / পুরোনো', english: 'old', pronunciationBn: 'আল্ট', example_de: 'Wie alt bist du?', example_bn: 'তোমার বয়স কত?', topic: 'family', level: 'A1' },
      { id: 'v_u2_3_2', german: 'jung', article: null, pos: 'adj', bengali: 'তরুণ / অল্পবয়সী', english: 'young', pronunciationBn: 'ইয়ুং', example_de: 'Sie ist sehr jung.', example_bn: 'তিনি খুব অল্পবয়সী।', topic: 'family', level: 'A1' },
      { id: 'v_u2_3_3', german: 'groß', article: null, pos: 'adj', bengali: 'লম্বা / বড়', english: 'tall / big', pronunciationBn: 'গ্রোস', example_de: 'Mein Bruder ist 1,85 Meter groß.', example_bn: 'আমার ভাই ১.৮৫ মিটার লম্বা।', topic: 'family', level: 'A1' },
      { id: 'v_u2_3_4', german: 'klein', article: null, pos: 'adj', bengali: 'খাটো / ছোট', english: 'short / small', pronunciationBn: 'ক্লাইন', example_de: 'Das Zimmer ist klein.', example_bn: 'ঘরটি ছোট।', topic: 'family', level: 'A1' },
      { id: 'v_u2_3_5', german: 'nett', article: null, pos: 'adj', bengali: 'সদয় / অমায়িক', english: 'nice / kind', pronunciationBn: 'নেট', example_de: 'Die Nachbarn sind sehr nett.', example_bn: 'প্রতিবেশীরা খুব অমায়িক।', topic: 'family', level: 'A1' },
      { id: 'v_u2_3_6', german: 'freundlich', article: null, pos: 'adj', bengali: 'বন্ধুভাবাপন্ন', english: 'friendly', pronunciationBn: 'ফ্রয়ন্টলিশ', example_de: 'Der Lehrer ist freundlich.', example_bn: 'শিক্ষক বন্ধুভাবাপন্ন।', topic: 'family', level: 'A1' },
      { id: 'v_u2_3_7', german: 'das Jahr', article: 'das', plural: 'die Jahre', pos: 'noun', bengali: 'বছর', english: 'year', pronunciationBn: 'দাস ইয়ার', example_de: 'Ich bin 30 Jahre alt.', example_bn: 'আমার বয়স ৩০ বছর।', topic: 'family', level: 'A1' },
      { id: 'v_u2_3_8', german: 'schön', article: null, pos: 'adj', bengali: 'সুন্দর', english: 'beautiful', pronunciationBn: 'শোন', example_de: 'Das ist ein schönes Foto.', example_bn: 'এটি একটি সুন্দর ছবি।', topic: 'family', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'বয়স বলার জন্য সর্বদা sein ক্রিয়া',
      title_en: 'Expressing Age with "sein"',
      content_bn: 'বাংলায় আমরা বলি "আমার ২৫ বছর", কিন্তু জার্মানে কখনো "Ich habe 25 Jahre" বলবেন না! সর্বদা sein ক্রিয়া হবে:\n• Ich bin 25 Jahre alt.\n• Er ist 10 Jahre alt.',
      rule_table: [
        { label: 'সঠিক রূপ', value: 'Ich bin ... Jahre alt', note: 'sein ক্রিয়া ব্যবহার' },
        { label: 'ভুল রূপ', value: 'Ich habe ... Jahre', note: 'ইংরেজি বা ফ্রেঞ্চ অনুকরণে কখনো haben নয়' }
      ]
    },
    exercises: [
      {
        id: 'ex_2_3_1',
        type: 'multiple_choice',
        prompt_bn: "জার্মানে 'আমার বয়স ২৫ বছর' কীভাবে বলে?",
        explanation_bn: "বয়স প্রকাশে 'sein' ব্যবহৃত হয়: Ich bin 25 Jahre alt.",
        question: "'আমার বয়স ২৫ বছর' এর সঠিক অনুবাদ কোনটি?",
        options: ['Ich bin 25 Jahre alt.', 'Ich habe 25 Jahre.', 'Ich mache 25 Jahre.', 'Ich wohne 25 Jahre.'],
        correctAnswer: 'Ich bin 25 Jahre alt.'
      },
      {
        id: 'ex_2_3_2',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'তোমার বয়স কত?'",
        explanation_bn: 'Wie alt bist du?',
        targetSentence: 'Wie alt bist du?',
        scrambledWords: ['du?', 'alt', 'Wie', 'bist'],
        meaning_bn: 'তোমার বয়স কত?'
      },
      {
        id: 'ex_2_3_3',
        type: 'matching_pairs',
        prompt_bn: 'বিপরীতার্থক শব্দের জোড়া মেলান:',
        explanation_bn: 'groß (লম্বা/বড়) <-> klein (খাটো/ছোট), alt (বয়স্ক) <-> jung (তরুণ)',
        pairs: [
          { german: 'groß', bengali: 'লম্বা / বড়' },
          { german: 'klein', bengali: 'খাটো / ছোট' },
          { german: 'alt', bengali: 'বয়স্ক / পুরোনো' },
          { german: 'jung', bengali: 'তরুণ / অল্পবয়সী' }
        ]
      },
      {
        id: 'ex_2_3_4',
        type: 'typing',
        prompt_bn: "'সুন্দর' এর জার্মান শব্দটি লিখুন (schön):",
        explanation_bn: 'schön',
        prompt: 'সুন্দর',
        correctAnswer: 'schön',
        acceptedAnswers: ['schon', 'schön'],
        placeholder: 'যেমন: schön'
      }
    ]
  },
  {
    id: 'lesson_2_4',
    unitId: 'unit_2',
    title_bn: 'পেশা ও কর্মক্ষেত্র',
    title_en: 'Professions & Workplace',
    subtitle_de: 'Berufe und Arbeitsplatz',
    order: 13,
    content: {
      intro_bn: 'জার্মান ভাষায় পেশা বলা খুব সহজ এবং একটি মজার নিয়ম আছে:\n১. নিজের পেশা বলতে "von Beruf" বা সরাসরি sein ক্রিয়া ব্যবহৃত হয়: "Ich bin Arzt von Beruf." (আমি পেশায় চিকিৎসক)।\n২. পুরুষ পেশাজীবী থেকে নারী পেশাজীবী রূপান্তর করতে শুধু শেষে "-in" যোগ হয়:\n• der Lehrer (পুরুষ শিক্ষক) -> die Lehrerin (নারী শিক্ষিকা)\n• der Arzt (পুরুষ চিকিৎসক) -> die Ärztin (নারী চিকিৎসক - উমলউট Ä সহ!)\n• der Student (ছাত্র) -> die Studentin (ছাত্রী)\n৩. কর্মক্ষেত্র প্রকাশে "bei" (কোম্পানির নাম) বা "in" (স্থান) ব্যবহৃত হয়: "Ich arbeite bei Siemens." / "Ich arbeite im Krankenhaus."',
      intro_en: 'State your profession using sein or "von Beruf". Feminine forms are created by adding "-in" (der Lehrer -> die Lehrerin). To say where you work, use "bei" for companies (bei Siemens) and "in" for institutions.',
      examples: [
        { de: 'Was bist du von Beruf? - Ich bin Ingenieur.', bn: 'তোমার পেশা কী? - আমি একজন প্রকৌশলী।', note: 'von Beruf' },
        { de: 'Meine Frau ist Lehrerin an einer Schule.', bn: 'আমার স্ত্রী একটি স্কুলের শিক্ষিকা।', note: 'Lehrerin (স্ত্রীলিঙ্গ)' },
        { de: 'Ich arbeite als Verkäufer bei Rewe.', bn: 'আমি রেভে সুপারমার্কেটে বিক্রয়কর্মী হিসেবে কাজ করি।', note: 'arbeiten als / bei' },
        { de: 'Er studiert Informatik an der Universität.', bn: 'তিনি বিশ্ববিদ্যালয়ে কম্পিউটার সায়েন্সে পড়াশোনা করছেন।', note: 'studieren' }
      ]
    },
    vocabulary: [
      { id: 'v_u2_4_1', german: 'Arzt', article: 'der', plural: 'die Ärzte', pos: 'noun', bengali: 'চিকিৎসক / ডাক্তার (পুরুষ)', english: 'doctor (male)', pronunciationBn: 'আরর্টস্ট', example_de: 'Der Arzt untersucht den Patienten.', example_bn: 'ডাক্তার রোগীকে পরীক্ষা করছেন।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u2_4_2', german: 'Ärztin', article: 'die', plural: 'die Ärztinnen', pos: 'noun', bengali: 'নারী চিকিৎসক', english: 'doctor (female)', pronunciationBn: 'এয়ার্টসটিন', example_de: 'Sie ist Ärztin von Beruf.', example_bn: 'তিনি পেশায় ডাক্তার।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u2_4_3', german: 'Lehrer', article: 'der', plural: 'die Lehrer', pos: 'noun', bengali: 'শিক্ষক (পুরুষ)', english: 'teacher (male)', pronunciationBn: 'লেরার', example_de: 'Mein Deutschlehrer ist sehr geduldig.', example_bn: 'আমার জার্মান শিক্ষক খুব ধৈর্যশীল।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u2_4_4', german: 'Lehrerin', article: 'die', plural: 'die Lehrerinnen', pos: 'noun', bengali: 'শিক্ষিকা (নারী)', english: 'teacher (female)', pronunciationBn: 'লেরারিন', example_de: 'Frau Schmidt ist unsere Lehrerin.', example_bn: 'মিসেস শ্মিট আমাদের শিক্ষিকা।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u2_4_5', german: 'Ingenieur', article: 'der', plural: 'die Ingenieure', pos: 'noun', bengali: 'প্রকৌশলী / ইঞ্জিনিয়ার', english: 'engineer', pronunciationBn: 'ইনশেনিয়োর', example_de: 'Er arbeitet als Ingenieur.', example_bn: 'তিনি প্রকৌশলী হিসেবে কাজ করেন।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u2_4_6', german: 'Student', article: 'der', plural: 'die Studenten', pos: 'noun', bengali: 'বিশ্ববিদ্যালয়ের ছাত্র', english: 'university student', pronunciationBn: 'শটুডেন্ট', example_de: 'Ich bin Student in Berlin.', example_bn: 'আমি বার্লিনের একজন ছাত্র।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u2_4_7', german: 'arbeiten', article: null, pos: 'verb', bengali: 'কাজ করা', english: 'to work', pronunciationBn: 'আরবাইটেন', example_de: 'Ich arbeite von 9 bis 17 Uhr.', example_bn: 'আমি সকাল ৯টা থেকে বিকেল ৫টা পর্যন্ত কাজ করি।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u2_4_8', german: 'der Beruf', article: 'der', plural: 'die Berufe', pos: 'noun', bengali: 'পেশা / কর্মসংস্থান', english: 'profession / job', pronunciationBn: 'ডের বেরুফ', example_de: 'Was sind Sie von Beruf?', example_bn: 'আপনার পেশা কী?', topic: 'work_office_education', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'নারী পেশাজীবীতে "-in" প্রত্যয়',
      title_en: 'Forming Feminine Job Titles',
      content_bn: 'জার্মান ভাষায় প্রায় সব পুরুষ পেশার নামের শেষে "-in" যোগ করলেই স্ত্রীলিঙ্গ রূপ তৈরি হয়। যেমন:\n• Student -> Studentin\n• Kellner (ওয়েটার) -> Kellnerin (ওয়েট্রেস)\n• Verkäufer -> Verkäuferin\nবহুবচনে এদের শেষে "-innen" যুক্ত হয় (die Lehrerinnen)।',
      rule_table: [
        { label: 'পুরুষ একবচন', value: 'der Lehrer', note: 'শিক্ষক' },
        { label: 'নারী একবচন', value: 'die Lehrerin', note: '-in যুক্ত' },
        { label: 'নারী বহুবচন', value: 'die Lehrerinnen', note: '-innen যুক্ত' }
      ]
    },
    exercises: [
      {
        id: 'ex_2_4_1',
        type: 'multiple_choice',
        prompt_bn: "'Lehrer' (শিক্ষক) শব্দের স্ত্রীলিঙ্গ রূপ কোনটি?",
        explanation_bn: "নারী শিক্ষিকা হলো 'die Lehrerin' (-in প্রত্যয় যোগ হয়)।",
        question: "'Lehrer' এর নারী রূপ কোনটি?",
        options: ['Lehrerin', 'Lehrerfrau', 'Lehrerinon', 'Lehrerinette'],
        correctAnswer: 'Lehrerin'
      },
      {
        id: 'ex_2_4_2',
        type: 'fill_blank',
        prompt_bn: "সঠিক রূপটি বসান: 'Ich arbeite ___ Ingenieur bei Siemens.'",
        explanation_bn: 'কোনো পেশা হিসেবে কাজ করা বোঝাতে "arbeiten als" ব্যবহৃত হয়।',
        sentenceWithBlank: 'Ich arbeite ___ Ingenieur bei Siemens.',
        blankType: 'preposition',
        options: ['als', 'wie', 'für', 'mit'],
        correctAnswer: 'als',
        translation_bn: 'আমি সিমেন্সে ইঞ্জিনিয়ার হিসেবে কাজ করি।'
      },
      {
        id: 'ex_2_4_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আপনার পেশা কী?'",
        explanation_bn: 'Was sind Sie von Beruf?',
        targetSentence: 'Was sind Sie von Beruf?',
        scrambledWords: ['Beruf?', 'Was', 'von', 'sind', 'Sie'],
        meaning_bn: 'আপনার পেশা কী?'
      },
      {
        id: 'ex_2_4_4',
        type: 'conjugation_quiz',
        prompt_bn: "'du' এর সাথে 'arbeiten' ক্রিয়ার রূপ কোনটি?",
        explanation_bn: 'arbeiten ক্রিয়ার মূল ধাতুর শেষে -t থাকায় du-এর সাথে অতিরিক্ত একটি -e- যুক্ত হয়ে হয় "arbeitest"।',
        verb: 'arbeiten',
        pronoun: 'du',
        meaning_bn: 'তুমি কাজ করো',
        options: ['arbeitest', 'arbeitst', 'arbeitet', 'arbeite'],
        correctAnswer: 'arbeitest'
      }
    ]
  }
];

// Write Unit 2
fs.writeFileSync(path.join(curriculumDir, 'unit2_family.json'), JSON.stringify(unit2_lessons, null, 2), 'utf8');
console.log('Unit 2 written: 4 lessons');

// ---------------------------------------------------------------------------
// UNIT 3: Nomen, Artikel & Akkusativ (Lessons 3.1 to 3.4)
// ---------------------------------------------------------------------------
const unit3_existing = readExistingFirstLesson('unit3_nouns.json');
const unit3_lessons = [
  unit3_existing || { id: 'lesson_3_1', unitId: 'unit_3', title_bn: 'বিশেষ্য ও আর্টিকেল', title_en: 'Nouns & Articles', subtitle_de: 'Nomen und Artikel', order: 14, content: { intro_bn: '', examples: [] }, vocabulary: [], grammarTip: { title_bn: '', title_en: '', content_bn: '', rule_table: [] }, exercises: [] },
  {
    id: 'lesson_3_2',
    unitId: 'unit_3',
    title_bn: 'জার্মান বহুবচনের নিয়মাবলী (Pluralformen)',
    title_en: 'German Plural Forms & Endings',
    subtitle_de: 'Pluralformen im Deutschen',
    order: 15,
    content: {
      intro_bn: 'ইংরেজিতে শুধু "s" যোগ করে বহুবচন করা গেলেও জার্মানে বহুবচনের নির্দিষ্ট ৫টি প্রধান রূপ আছে। তবে সুখবর হলো—বহুবচনে সব আর্টিকেলের নির্দিষ্ট রূপ হলো "die"!\nপ্রধান ৫টি বহুবচন রূপ:\n১. "-e" যুক্ত হয়ে: der Tisch -> die Tische (প্রায়ই উমলউট হয়: der Stuhl -> die Stühle)\n২. "-n" বা "-en" যুক্ত হয়ে: die Frau -> die Frauen, die Lampe -> die Lampen (স্ত্রীলিঙ্গ শব্দের ৯৫% বহুবচনে -n/-en নেয়)\n৩. "-er" যুক্ত হয়ে: das Kind -> die Kinder, das Bild -> die Bilder (ক্লীবলিঙ্গ শব্দে বেশি দেখা যায়)\n৪. "-s" যুক্ত হয়ে: das Auto -> die Autos, das Hotel -> die Hotels (বিদেশি আগত শব্দে)\n৫. কোনো পরিবর্তন নেই: der Lehrer -> die Lehrer, das Fenster -> die Fenster (শব্দের শেষে -er, -el, -en থাকলে সাধারণত রূপ অপরিবর্তিত থাকে)।',
      intro_en: 'Unlike English, German plurals have 5 endings: -e (die Tische), -n/-en (die Frauen), -er (die Kinder), -s (die Autos), or no ending (die Lehrer). All plural nouns take the definite article "die".',
      examples: [
        { de: 'Das sind zwei Bücher.', bn: 'এগুলো দুটি বই।', note: 'das Buch -> die Bücher' },
        { de: 'Drei Frauen warten an der Haltestelle.', bn: 'তিনজন নারী বাস স্টপে অপেক্ষা করছেন।', note: 'die Frau -> die Frauen' },
        { de: 'Wir haben viele Fragen.', bn: 'আমাদের অনেক প্রশ্ন আছে।', note: 'die Frage -> die Fragen' },
        { de: 'Die Autos sind neu und schnell.', bn: 'গাড়িগুলো নতুন এবং দ্রুতগামী।', note: 'das Auto -> die Autos' }
      ]
    },
    vocabulary: [
      { id: 'v_u3_2_1', german: 'Buch', article: 'das', plural: 'die Bücher', pos: 'noun', bengali: 'বই', english: 'book', pronunciationBn: 'বুখ', example_de: 'Ich lese gern Bücher.', example_bn: 'আমি বই পড়তে পছন্দ করি।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_2_2', german: 'Tisch', article: 'der', plural: 'die Tische', pos: 'noun', bengali: 'টেবিল', english: 'table', pronunciationBn: 'টিশ', example_de: 'Der Tisch ist aus Holz.', example_bn: 'টেবিলটি কাঠের তৈরি।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_2_3', german: 'Stuhl', article: 'der', plural: 'die Stühle', pos: 'noun', bengali: 'চেয়ার', english: 'chair', pronunciationBn: 'শ্টুল', example_de: 'Hier stehen vier Stühle.', example_bn: 'এখানে চারটি চেয়ার রাখা আছে।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_2_4', german: 'Lampe', article: 'die', plural: 'die Lampen', pos: 'noun', bengali: 'বাতি / ল্যাম্প', english: 'lamp', pronunciationBn: 'লাম্পে', example_de: 'Die Lampe ist sehr hell.', example_bn: 'বাতিটি খুব উজ্জ্বল।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_2_5', german: 'Frau', article: 'die', plural: 'die Frauen', pos: 'noun', bengali: 'নারী / ভদ্রমহিলা / স্ত্রী', english: 'woman / wife', pronunciationBn: 'ফ্রাউ', example_de: 'Zwei Frauen sprechen.', example_bn: 'দুইজন নারী কথা বলছেন।', topic: 'family', level: 'A1' },
      { id: 'v_u3_2_6', german: 'Mann', article: 'der', plural: 'die Männer', pos: 'noun', bengali: 'পুরুষ / স্বামী', english: 'man / husband', pronunciationBn: 'মান', example_de: 'Die Männer spielen Fußball.', example_bn: 'পুরুষেরা ফুটবল খেলছেন।', topic: 'family', level: 'A1' },
      { id: 'v_u3_2_7', german: 'Bild', article: 'das', plural: 'die Bilder', pos: 'noun', bengali: 'ছবি / চিত্র', english: 'picture', pronunciationBn: 'বিল্ট', example_de: 'Das Bild an der Wand ist schön.', example_bn: 'দেয়ালের ছবিটি সুন্দর।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_2_8', german: 'Auto', article: 'das', plural: 'die Autos', pos: 'noun', bengali: 'গাড়ি', english: 'car', pronunciationBn: 'আউটো', example_de: 'In der Garage stehen zwei Autos.', example_bn: 'গ্যারেজে দুটি গাড়ি আছে।', topic: 'city_transport_travel', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'বহুবচনের গোল্ডেন রুল',
      title_en: 'Plural Golden Rules',
      content_bn: '১. বহুবচনে আর্টিকেল সর্বদা "die" হয়।\n২. স্ত্রীলিঙ্গ শব্দ (-e দিয়ে শেষ হওয়া) প্রায় সব সময় বহুবচনে "-n" নেয় (die Lampe -> die Lampen)।\n৩. বহুবচনে একবচনের "ein/eine" কখনো বসে না! অনির্দিষ্ট বহুবচনে কোনো আর্টিকেল থাকে না (Ich habe Bücher = আমার বই আছে)।',
      rule_table: [
        { label: '-e / Umlaut + -e', value: 'der Tisch -> die Tische / die Stühle', note: 'পুংলিঙ্গে প্রচলিত' },
        { label: '-n / -en', value: 'die Frau -> die Frauen / die Lampe -> die Lampen', note: 'স্ত্রীলিঙ্গে প্রচলিত' },
        { label: '-er / Umlaut + -er', value: 'das Kind -> die Kinder / das Buch -> die Bücher', note: 'ক্লীবলিঙ্গে প্রচলিত' },
        { label: '-s', value: 'das Auto -> die Autos / das Hotel -> die Hotels', note: 'আন্তর্জাতিক শব্দ' }
      ]
    },
    exercises: [
      {
        id: 'ex_3_2_1',
        type: 'multiple_choice',
        prompt_bn: "'das Buch' (বই) শব্দের বহুবচন রূপ কোনটি?",
        explanation_bn: 'Buch এর বহুবচনে উমলউট ও -er যুক্ত হয়ে "die Bücher" হয়।',
        question: "'das Buch' এর বহুবচন রূপ কোনটি?",
        options: ['die Bücher', 'die Buchen', 'die Buchs', 'die Buche'],
        correctAnswer: 'die Bücher'
      },
      {
        id: 'ex_3_2_2',
        type: 'article_quiz',
        prompt_bn: 'জার্মান ভাষায় যে কোনো বহুবচনের নির্দিষ্ট আর্টিকেল কোনটি?',
        explanation_bn: 'বহুবচনের ক্ষেত্রে লিঙ্গ নির্বিশেষে সর্বদা আর্টিকেল "die" হয়।',
        noun: 'Kinder (সন্তানেরা)',
        meaning_bn: 'বাচ্চারা / সন্তানেরা',
        correctArticle: 'die'
      },
      {
        id: 'ex_3_2_3',
        type: 'matching_pairs',
        prompt_bn: 'একবচন ও বহুবচনের সঠিক জোড়া মেলান:',
        explanation_bn: 'Tisch -> Tische, Stuhl -> Stühle, Frau -> Frauen, Auto -> Autos',
        pairs: [
          { german: 'der Tisch', bengali: 'die Tische' },
          { german: 'der Stuhl', bengali: 'die Stühle' },
          { german: 'die Frau', bengali: 'die Frauen' },
          { german: 'das Auto', bengali: 'die Autos' }
        ]
      },
      {
        id: 'ex_3_2_4',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'এখানে দুটি টেবিল এবং চারটি চেয়ার আছে।'",
        explanation_bn: 'Hier sind zwei Tische und vier Stühle.',
        targetSentence: 'Hier sind zwei Tische und vier Stühle.',
        scrambledWords: ['vier', 'Hier', 'zwei', 'sind', 'Stühle.', 'Tische', 'und'],
        meaning_bn: 'এখানে দুটি টেবিল এবং চারটি চেয়ার আছে।'
      }
    ]
  },
  {
    id: 'lesson_3_3',
    unitId: 'unit_3',
    title_bn: 'Akkusativ কারক: den / einen / keinen',
    title_en: 'The Accusative Case (Direct Object)',
    subtitle_de: 'Der Akkusativ: direkter Fall',
    order: 16,
    content: {
      intro_bn: 'বাক্যে ক্রিয়া যাকে বা যে বস্তুকে সরাসরি প্রভাবিত করে, তাকে কর্মকারক বা Akkusativ বলে (যেমন: আমি একটি আপেল খাচ্ছি - এখানে আপেল হলো Akkusativ)।\nখুব গুরুত্বপূর্ণ জাদু নিয়ম:\nAkkusativ কারকে শুধুমাত্র পুংলিঙ্গ (Masculine) পরিবর্তিত হয়!\n• der -> den\n• ein -> einen\n• kein -> keinen\n• mein -> meinen\n\nস্ত্রীলিঙ্গ (die, eine, keine), ক্লীবলিঙ্গ (das, ein, kein) এবং বহুবচন (die, keine) হুবহু আগের মতোই অপরিবর্তিত থাকে!',
      intro_en: 'In the accusative case (direct object), ONLY masculine nouns change! der -> den, ein -> einen, kein -> keinen. Feminine, neuter, and plural forms remain completely unchanged.',
      examples: [
        { de: 'Ich habe einen Apfel.', bn: 'আমার একটি আপেল আছে।', note: 'der Apfel -> einen Apfel (Akkusativ)' },
        { de: 'Er kauft den Tisch.', bn: 'তিনি টেবিলটি কিনছেন।', note: 'der Tisch -> den Tisch (Akkusativ)' },
        { de: 'Ich trinke eine Tasse Kaffee.', bn: 'আমি এক কাপ কফি পান করছি।', note: 'die Tasse -> eine Tasse (স্ত্রীলিঙ্গ অপরিবর্তিত)' },
        { de: 'Wir brauchen ein Auto.', bn: 'আমাদের একটি গাড়ি প্রয়োজন।', note: 'das Auto -> ein Auto (ক্লীবলিঙ্গ অপরিবর্তিত)' }
      ]
    },
    vocabulary: [
      { id: 'v_u3_3_1', german: 'Apfel', article: 'der', plural: 'die Äpfel', pos: 'noun', bengali: 'আপেল', english: 'apple', pronunciationBn: 'আপফেল', example_de: 'Ich esse einen Apfel.', example_bn: 'আমি একটি আপেল খাই।', topic: 'food_drinks', level: 'A1' },
      { id: 'v_u3_3_2', german: 'Schlüssel', article: 'der', plural: 'die Schlüssel', pos: 'noun', bengali: 'চাবি', english: 'key', pronunciationBn: 'শ্লুসেল', example_de: 'Wo ist mein Schlüssel?', example_bn: 'আমার চাবি কোথায়?', topic: 'home_living', level: 'A1' },
      { id: 'v_u3_3_3', german: 'Kugelschreiber', article: 'der', plural: 'die Kugelschreiber', pos: 'noun', bengali: 'কলম / বলপেন', english: 'ballpoint pen', pronunciationBn: 'কুগেলশ্রাইবার', example_de: 'Hast du einen Kugelschreiber?', example_bn: 'তোমার কি একটি কলম আছে?', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u3_3_4', german: 'Tasche', article: 'die', plural: 'die Taschen', pos: 'noun', bengali: 'ব্যাগ', english: 'bag', pronunciationBn: 'টাশে', example_de: 'Ich suche meine Tasche.', example_bn: 'আমি আমার ব্যাগ খুঁজছি।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_3_5', german: 'Handy', article: 'das', plural: 'die Handys', pos: 'noun', bengali: 'মোবাইল ফোন', english: 'mobile phone', pronunciationBn: 'হ্যান্ডি', example_de: 'Mein Handy ist neu.', example_bn: 'আমার মোবাইল ফোন নতুন।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_3_6', german: 'kaufen', article: null, pos: 'verb', bengali: 'কেনা / ক্রয় করা', english: 'to buy', pronunciationBn: 'কাউফেন', example_de: 'Er kauft einen Pullover.', example_bn: 'তিনি একটি পুলওভার কিনছেন।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_3_7', german: 'brauchen', article: null, pos: 'verb', bengali: 'প্রয়োজন হওয়া', english: 'to need', pronunciationBn: 'ব্রাউখেন', example_de: 'Ich brauche Hilfe.', example_bn: 'আমার সাহায্য দরকার।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u3_3_8', german: 'suchen', article: null, pos: 'verb', bengali: 'খোঁজা', english: 'to search / look for', pronunciationBn: 'জুখেন', example_de: 'Ich suche den Bahnhof.', example_bn: 'আমি রেলস্টেশন খুঁজছি।', topic: 'city_transport_travel', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'Akkusativ কারকে আর্টিকেলের ম্যাজিক টেবিল',
      title_en: 'Akkusativ Case Conversion Table',
      content_bn: 'কেবল পুংলিঙ্গ (der) পরিবর্তন হয়ে -en নেয়! বাকি সব লিঙ্গ হুবহু এক থাকে।',
      rule_table: [
        { label: 'পুংলিঙ্গ (der)', value: 'den / einen / keinen / meinen', note: 'সবগুলোর শেষে -en যোগ হয়' },
        { label: 'স্ত্রীলিঙ্গ (die)', value: 'die / eine / keine / meine', note: 'হুবহু অপরিবর্তিত থাকে' },
        { label: 'ক্লীবলিঙ্গ (das)', value: 'das / ein / kein / mein', note: 'হুবহু অপরিবর্তিত থাকে' },
        { label: 'বহুবচন (die)', value: 'die / --- / keine / meine', note: 'হুবহু অপরিবর্তিত থাকে' }
      ]
    },
    exercises: [
      {
        id: 'ex_3_3_1',
        type: 'fill_blank',
        prompt_bn: "Akkusativ রূপ বসান: 'Ich habe ___ Bruder.' (আমার একজন ভাই আছে)",
        explanation_bn: 'Bruder হলো পুংলিঙ্গ (der Bruder)। Akkusativ এ একবচনে "einen" হয়।',
        sentenceWithBlank: 'Ich habe ___ Bruder.',
        blankType: 'article',
        options: ['einen', 'ein', 'eine', 'einem'],
        correctAnswer: 'einen',
        translation_bn: 'আমার একজন ভাই আছে।'
      },
      {
        id: 'ex_3_3_2',
        type: 'multiple_choice',
        prompt_bn: "কোন বাক্যে Akkusativ এর ব্যবহার সঠিক?",
        explanation_bn: 'Kugelschreiber পুংলিঙ্গ (der Kugelschreiber)। Akkusativ এ "den Kugelschreiber" বা "einen Kugelschreiber" হবে।',
        question: "সঠিক বাক্য কোনটি?",
        options: ['Ich suche den Kugelschreiber.', 'Ich suche der Kugelschreiber.', 'Ich suche dem Kugelschreiber.', 'Ich suche das Kugelschreiber.'],
        correctAnswer: 'Ich suche den Kugelschreiber.'
      },
      {
        id: 'ex_3_3_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'তিনি চাবিটি খুঁজছেন।'",
        explanation_bn: 'Er sucht den Schlüssel.',
        targetSentence: 'Er sucht den Schlüssel.',
        scrambledWords: ['den', 'Er', 'Schlüssel.', 'sucht'],
        meaning_bn: 'তিনি চাবিটি খুঁজছেন।'
      },
      {
        id: 'ex_3_3_4',
        type: 'article_quiz',
        prompt_bn: "'Apfel' শব্দের Nominativ মূল আর্টিকেল কোনটি?",
        explanation_bn: 'Apfel হলো পুংলিঙ্গ (der Apfel)।',
        noun: 'Apfel',
        meaning_bn: 'আপেল',
        correctArticle: 'der'
      }
    ]
  },
  {
    id: 'lesson_3_4',
    unitId: 'unit_3',
    title_bn: "'nicht' বনাম 'kein' দিয়ে না-বোধক বাক্য তৈরি",
    title_en: 'Negation: When to use "nicht" vs "kein"',
    subtitle_de: "Negation mit 'nicht' und 'kein'",
    order: 17,
    content: {
      intro_bn: 'জার্মান ভাষায় কোনো বাক্য বা বক্তব্যকে না-বোধক করতে দুটি শব্দ ব্যবহৃত হয়: "kein" এবং "nicht"। অনেক শিক্ষার্থী এতে বিভ্রান্ত হন, কিন্তু এর নিয়মটি অত্যন্ত পরিষ্কার:\n\n১. "kein" কেবল তখন বসে যখন অনির্দিষ্ট বিশেষ্য (ein/eine বা আর্টিকেলহীন বিশেষ্য) না-বোধক করতে হয়:\n• Ich habe einen Hund -> Ich habe keinen Hund (আমার কুকুর নেই)।\n• Ich trinke Milch -> Ich trinke keine Milch (আমি দুধ পান করি না)।\n\n২. অন্যান্য সকল ক্ষেত্রে "nicht" বসে (ক্রিয়া, বিশেষণ, নাম, নির্দিষ্ট আর্টিকেলযুক্ত বিশেষ্য):\n• ক্রিয়ার পরে: Ich schlafe nicht (আমি ঘুমাচ্ছি না)।\n• বিশেষণের আগে: Das ist nicht teuer (এটি দামি নয়)।\n• নির্দিষ্ট বিশেষ্যের আগে: Das ist nicht der Chef (ইনি প্রধান ব্যক্তি নন)।\n• স্থানের আগে: Ich wohne nicht in Berlin (আমি বার্লিনে বাস করি না)।',
      intro_en: 'Use "kein" to negate nouns with indefinite articles or no articles (kein Geld, kein Auto). Use "nicht" to negate verbs, adjectives, proper names, or nouns with definite articles (nicht gut, ich komme nicht).',
      examples: [
        { de: 'Ich habe kein Geld.', bn: 'আমার কোনো টাকা নেই।', note: 'kein (বিশেষ্যের জন্য)' },
        { de: 'Das ist nicht mein Auto.', bn: 'এটি আমার গাড়ি নয়।', note: 'nicht (নির্দিষ্ট পজেসিভ)' },
        { de: 'Ich verstehe das nicht.', bn: 'আমি এটি বুঝতে পারছি না।', note: 'nicht (ক্রিয়া না-বোধক)' },
        { de: 'Er ist heute nicht da.', bn: 'তিনি আজ উপস্থিত নেই।', note: 'nicht da' }
      ]
    },
    vocabulary: [
      { id: 'v_u3_4_1', german: 'nicht', article: null, pos: 'particle', bengali: 'না / নয়', english: 'not', pronunciationBn: 'নিশ্ট', example_de: 'Ich weiß es nicht.', example_bn: 'আমি এটি জানি না।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u3_4_2', german: 'kein', article: null, pos: 'pronoun', bengali: 'কোনো...না', english: 'no / not any', pronunciationBn: 'কাইন', example_de: 'Ich habe keine Zeit.', example_bn: 'আমার কোনো সময় নেই।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u3_4_3', german: 'Geld', article: 'das', plural: null, pos: 'noun', bengali: 'টাকা / অর্থ', english: 'money', pronunciationBn: 'গেল্ট', example_de: 'Das kostet viel Geld.', example_bn: 'এটার অনেক দাম / টাকা লাগে।', topic: 'numbers_money_quantities', level: 'A1' },
      { id: 'v_u3_4_4', german: 'Zeit', article: 'die', plural: null, pos: 'noun', bengali: 'সময়', english: 'time', pronunciationBn: 'ৎসাইট', example_de: 'Hast du heute Zeit?', example_bn: 'তোমার কি আজ সময় আছে?', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u3_4_5', german: 'Problem', article: 'das', plural: 'die Probleme', pos: 'noun', bengali: 'সমস্যা', english: 'problem', pronunciationBn: 'প্রবলেম', example_de: 'Kein Problem!', example_bn: 'কোনো সমস্যা নেই!', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u3_4_6', german: 'teuer', article: null, pos: 'adj', bengali: 'দামি / ব্যয়বহুল', english: 'expensive', pronunciationBn: 'তয়ার', example_de: 'Das Hotel ist nicht teuer.', example_bn: 'হোটেলটি দামি নয়।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_4_7', german: 'billig', article: null, pos: 'adj', bengali: 'সস্তা', english: 'cheap', pronunciationBn: 'বিলিশ', example_de: 'Das Ticket ist sehr billig.', example_bn: 'টিকিটটি খুব সস্তা।', topic: 'clothing_shopping_colors', level: 'A1' },
      { id: 'v_u3_4_8', german: 'verstehen', article: null, pos: 'verb', bengali: 'বোঝা / বুঝতে পারা', english: 'to understand', pronunciationBn: 'ফেয়ারস্টেহেন', example_de: 'Ich verstehe Sie gut.', example_bn: 'আমি আপনার কথা ভালোভাবে বুঝতে পারছি।', topic: 'essential_verbs', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'কখন nicht আর কখন kein?',
      title_en: 'Comparison Summary: nicht vs kein',
      content_bn: 'সহজ সূত্র: যেখানে "ein" বা "eine" বসতে পারে, সেখানে না-বোধকে "kein" বা "keine" বসবে। বাকি সব ক্ষেত্রে "nicht" বসবে।',
      rule_table: [
        { label: 'বিশেষ্য (অনির্দিষ্ট)', value: 'kein / keine', note: 'Ich habe keinen Hunger / keine Zeit' },
        { label: 'ক্রিয়া (Verb)', value: 'nicht (বাক্যের শেষে)', note: 'Ich rauche nicht / Ich komme nicht' },
        { label: 'বিশেষণ (Adjective)', value: 'nicht (বিশেষণের পূর্বে)', note: 'Das ist nicht gut / nicht teuer' },
        { label: 'নির্দিষ্ট বিশেষ্য', value: 'nicht (আর্টিকেলের পূর্বে)', note: 'Das ist nicht der Schlüssel' }
      ]
    },
    exercises: [
      {
        id: 'ex_3_4_1',
        type: 'fill_blank',
        prompt_bn: "সঠিক পদটি বসান: 'Ich habe ___ Zeit.' (আমার সময় নেই)",
        explanation_bn: 'Zeit স্ত্রীলিঙ্গ বিশেষ্য (die Zeit), তাই "keine" হবে।',
        sentenceWithBlank: 'Ich habe ___ Zeit.',
        blankType: 'article',
        options: ['keine', 'nicht', 'kein', 'keinen'],
        correctAnswer: 'keine',
        translation_bn: 'আমার সময় নেই।'
      },
      {
        id: 'ex_3_4_2',
        type: 'fill_blank',
        prompt_bn: "সঠিক পদটি বসান: 'Ich verstehe das ___.' (আমি এটা বুঝতে পারছি না)",
        explanation_bn: 'ক্রিয়াকে না-বোধক করতে বাক্যের শেষে "nicht" বসে।',
        sentenceWithBlank: 'Ich verstehe das ___.',
        blankType: 'article',
        options: ['nicht', 'kein', 'keine', 'keinen'],
        correctAnswer: 'nicht',
        translation_bn: 'আমি এটা বুঝতে পারছি না।'
      },
      {
        id: 'ex_3_4_3',
        type: 'multiple_choice',
        prompt_bn: "'কোনো সমস্যা নেই!' এর জনপ্রিয় জার্মান অভিব্যক্তি কোনটি?",
        explanation_bn: 'জার্মানিতে কোনো সমস্যা নেই বোঝাতে প্রবাদতুল্য বলা হয়: "Kein Problem!"',
        question: "'কোনো সমস্যা নেই!' এর জার্মান কোনটি?",
        options: ['Kein Problem!', 'Nicht Problem!', 'Keine Problem!', 'Nie Problem!'],
        correctAnswer: 'Kein Problem!'
      },
      {
        id: 'ex_3_4_4',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'এই মোবাইল ফোনটি দামি নয়।'",
        explanation_bn: 'Dieses Handy ist nicht teuer.',
        targetSentence: 'Dieses Handy ist nicht teuer.',
        scrambledWords: ['nicht', 'Handy', 'Dieses', 'teuer.', 'ist'],
        meaning_bn: 'এই মোবাইল ফোনটি দামি নয়।'
      }
    ]
  }
];

// Write Unit 3
fs.writeFileSync(path.join(curriculumDir, 'unit3_nouns.json'), JSON.stringify(unit3_lessons, null, 2), 'utf8');
console.log('Unit 3 written: 4 lessons');

// Write scripts for units 4 through 10
// We will generate the rest directly in helper modules to ensure maximum depth
