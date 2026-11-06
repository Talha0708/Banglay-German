// scripts/build-units-6-to-10.js
// Generates rich CEFR A1 curriculum for Units 6 through 10
// 4 lessons per unit, complete with vocabulary, grammar tips, and interactive exercises

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
// UNIT 6: Wohnung, Stadt und Wegbeschreibung (Lessons 6.1 to 6.4)
// ===========================================================================
const unit6_1 = readFirst('unit6_home.json');
const unit6_lessons = [
  unit6_1,
  {
    id: 'lesson_6_2',
    unitId: 'unit_6',
    title_bn: 'শহরের গুরুত্বপূর্ণ স্থান ও যানবাহন',
    title_en: 'City Landmarks & Public Transportation',
    subtitle_de: 'Orte in der Stadt und Verkehrsmittel',
    order: 27,
    content: {
      intro_bn: 'জার্মানির যেকোনো শহরে চলাফেরা করতে শহরের বিভিন্ন স্থান ও গণপরিবহনের নাম জানা অপরিহার্য:\n• der Bahnhof (রেলওয়ে স্টেশন), der Hauptbahnhof (প্রধান কেন্দ্রীয় রেলস্টেশন)\n• die Haltestelle (বাস/ট্রাম স্টপ)\n• die Apotheke (ফার্মেসি), das Krankenhaus (হাসপাতাল)\n• der Supermarkt (সুপারমার্কেট), die Bank (ব্যাংক)\n\nযানবাহন ব্যবহার:\nযানবাহন দ্বারা ভ্রমণ বোঝাতে "mit dem" বা "mit der" (Dativ) ব্যবহৃত হয়:\n• mit dem Bus (বাসে করে - der Bus -> dem Bus)\n• mit dem Zug (ট্রেনে করে - der Zug -> dem Zug)\n• mit dem Auto / Fahrrad (গাড়িতে / সাইকেলে - das -> dem)\n• mit der U-Bahn / S-Bahn (পাতালরেলে - die -> der)।',
      intro_en: 'Navigate any German city: Bahnhof (station), Haltestelle (stop), Apotheke (pharmacy), Supermarkt. Express transportation using "mit" + Dativ: mit dem Bus, mit dem Zug, mit der U-Bahn.',
      examples: [
        { de: 'Wo ist der nächste Bahnhof?', bn: 'নিকটতম রেলস্টেশনটি কোথায়?', note: 'Wo ist...?' },
        { de: 'Ich fahre jeden Tag mit dem Zug.', bn: 'আমি প্রতিদিন ট্রেনে করে যাই।', note: 'mit dem Zug (Dativ)' },
        { de: 'Die Bank liegt neben der Post.', bn: 'ব্যাংকটি পোস্ট অফিসের পাশে অবস্থিত।', note: 'neben der Post' },
        { de: 'Wir steigen an der nächsten Haltestelle aus.', bn: 'আমরা পরবর্তী স্টপেজে নেমে যাব।', note: 'aussteigen' }
      ]
    },
    vocabulary: [
      { id: 'v_u6_2_1', german: 'Bahnhof', article: 'der', plural: 'die Bahnhöfe', pos: 'noun', bengali: 'রেলওয়ে স্টেশন', english: 'train station', pronunciationBn: 'বানহোফ', example_de: 'Der Bahnhof ist groß.', example_bn: 'রেলস্টেশনটি অনেক বড়।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_2_2', german: 'Haltestelle', article: 'die', plural: 'die Haltestellen', pos: 'noun', bengali: 'বাস / ট্রাম স্টপেজ', english: 'bus stop', pronunciationBn: 'হাল্টেশটেলে', example_de: 'Ich warte an der Haltestelle.', example_bn: 'আমি বাস স্টপে অপেক্ষা করছি।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_2_3', german: 'Apotheke', article: 'die', plural: 'die Apotheken', pos: 'noun', bengali: 'ফার্মেসি / ওষুধের দোকান', english: 'pharmacy', pronunciationBn: 'আপোথেকে', example_de: 'Die Apotheke hat geöffnet.', example_bn: 'ফার্মেসিটি খোলা আছে।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u6_2_4', german: 'Krankenhaus', article: 'das', plural: 'die Krankenhäuser', pos: 'noun', bengali: 'হাসপাতাল', english: 'hospital', pronunciationBn: 'ক্রাঙ্কেনহাউস', example_de: 'Er liegt im Krankenhaus.', example_bn: 'তিনি হাসপাতালে ভর্তি আছেন।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u6_2_5', german: 'Bus', article: 'der', plural: 'die Busse', pos: 'noun', bengali: 'বাস', english: 'bus', pronunciationBn: 'বুস', example_de: 'Der Bus kommt um 8:15 Uhr.', example_bn: 'বাসটি সকাল ৮:১৫ তে আসবে।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_2_6', german: 'Zug', article: 'der', plural: 'die Züge', pos: 'noun', bengali: 'ট্রেন', english: 'train', pronunciationBn: 'ৎসুক', example_de: 'Ich nehme den Zug.', example_bn: 'আমি ট্রেনটি নিচ্ছি।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_2_7', german: 'Fahrrad', article: 'das', plural: 'die Fahrräder', pos: 'noun', bengali: 'বাইসাইকেল', english: 'bicycle', pronunciationBn: 'ফাররাট', example_de: 'Ich fahre mit dem Fahrrad.', example_bn: 'আমি সাইকেলে করে যাই।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_2_8', german: 'Ticket', article: 'das', plural: 'die Tickets', pos: 'noun', bengali: 'টিকিট', english: 'ticket', pronunciationBn: 'টিকেট', example_de: 'Ein Ticket nach Berlin bitte.', example_bn: 'বার্লিনের একটি টিকিট দিন দয়া করে।', topic: 'city_transport_travel', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "যানবাহনে চড়ার ক্ষেত্রে 'mit' + Dativ",
      title_en: 'Transportation with "mit" (Dativ)',
      content_bn: 'mit প্রেপজিশনটির পর সর্বদা Dativ কারক হয়:\n• der Bus -> mit dem Bus\n• der Zug -> mit dem Zug\n• das Auto -> mit dem Auto\n• das Fahrrad -> mit dem Fahrrad\n• die U-Bahn -> mit der U-Bahn',
      rule_table: [
        { label: 'der (পুং)', value: 'mit dem', note: 'mit dem Bus / Zug' },
        { label: 'das (ক্লীব)', value: 'mit dem', note: 'mit dem Auto / Fahrrad' },
        { label: 'die (স্ত্রী)', value: 'mit der', note: 'mit der Bahn' }
      ]
    },
    exercises: [
      {
        id: 'ex_6_2_1',
        type: 'fill_blank',
        prompt_bn: "সঠিক রূপটি বসান: 'Ich fahre mit ___ Bus zur Arbeit.'",
        explanation_bn: "Bus পুংলিঙ্গ (der Bus)। mit প্রেপজিশনের সাথে Dativ হয়ে 'dem Bus' হয়।",
        sentenceWithBlank: 'Ich fahre mit ___ Bus zur Arbeit.',
        blankType: 'article',
        options: ['dem', 'den', 'der', 'das'],
        correctAnswer: 'dem',
        translation_bn: 'আমি বাসে করে কাজে যাই।'
      },
      {
        id: 'ex_6_2_2',
        type: 'article_quiz',
        prompt_bn: "'Bahnhof' (রেলস্টেশন) শব্দের আর্টিকেল কোনটি?",
        explanation_bn: 'Bahnhof হলো পুংলিঙ্গ (der Bahnhof)।',
        noun: 'Bahnhof',
        meaning_bn: 'রেলওয়ে স্টেশন',
        correctArticle: 'der'
      },
      {
        id: 'ex_6_2_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'নিকটতম ফার্মেসিটি কোথায়?'",
        explanation_bn: 'Wo ist die nächste Apotheke?',
        targetSentence: 'Wo ist die nächste Apotheke?',
        scrambledWords: ['Apotheke?', 'ist', 'Wo', 'die', 'nächste'],
        meaning_bn: 'নিকটতম ফার্মেসিটি কোথায়?'
      }
    ]
  },
  {
    id: 'lesson_6_3',
    unitId: 'unit_6',
    title_bn: 'দিকনির্দেশনা চাওয়া ও বলা (Wegbeschreibung)',
    title_en: 'Asking For & Giving Directions',
    subtitle_de: 'Wegbeschreibung: links, rechts, geradeaus',
    order: 28,
    content: {
      intro_bn: 'রাস্তায় পথ হারিয়ে গেলে বা কোনো ঠিকানা খুঁজতে ভদ্রভাবে দিকনির্দেশনা জানতে চাইতে হয়:\n• প্রশ্ন: "Entschuldigung, wie komme ich zum Bahnhof?" (মাফ করবেন, আমি রেলস্টেশনে কীভাবে যেতে পারি?)\n• উত্তর دینے দিকনির্দেশক শব্দ:\n১. geradeaus (সোজাসুজি): "Gehen Sie geradeaus!" (সোজা এগিয়ে যান!)\n২. nach links (বামে): "Biegen Sie nach links ab!" (বামে মোড় নিন!)\n৩. nach rechts (ডানে): "Biegen Sie nach rechts ab!" (ডানে মোড় নিন!)\n৪. an der Kreuzung (মোড়ে): "An der Ampel nach rechts." (ট্রাফিক লাইটে ডানে)\n৫. an der Ecke (কোণায়): "Das Café ist an der Ecke." (ক্যাফেটি কোণায় অবস্থিত)।',
      intro_en: 'Ask directions: "Wie komme ich zu...?" (How do I get to...?). Give directions using: geradeaus (straight), nach links (left), nach rechts (right), an der Ampel (at the traffic lights).',
      examples: [
        { de: 'Entschuldigung, wie komme ich zur Post?', bn: 'মাফ করবেন, পোস্ট অফিসে কীভাবে যাব?', note: 'zur Post (zu der)' },
        { de: 'Gehen Sie bitte immer geradeaus.', bn: 'দয়া করে সোজা এগিয়ে যান।', note: 'geradeaus' },
        { de: 'Biegen Sie an der Kreuzung nach links ab.', bn: 'চৌরাস্তার মোড়ে বাম দিকে ঘুরুন।', note: 'nach links' },
        { de: 'Die Bank ist gleich auf der rechten Seite.', bn: 'ব্যাংকটি ঠিক ডান পাশে অবস্থিত।', note: 'auf der rechten Seite' }
      ]
    },
    vocabulary: [
      { id: 'v_u6_3_1', german: 'geradeaus', article: null, pos: 'adv', bengali: 'সোজা / সোজাসুজি', english: 'straight ahead', pronunciationBn: 'গেরাডেআউস', example_de: 'Fahren Sie 200 Meter geradeaus.', example_bn: '২০০ মিটার সোজা যান।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_3_2', german: 'links', article: null, pos: 'adv', bengali: 'বামে / বাম দিকে', english: 'left', pronunciationBn: 'লিংকস', example_de: 'Nach links abbiegen.', example_bn: 'বাম দিকে মোড় নিন।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_3_3', german: 'rechts', article: null, pos: 'adv', bengali: 'ডানে / ডান দিকে', english: 'right', pronunciationBn: 'রেশ্টস', example_de: 'Das Hotel liegt rechts.', example_bn: 'হোটেলটি ডান পাশে।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_3_4', german: 'Ampel', article: 'die', plural: 'die Ampeln', pos: 'noun', bengali: 'ট্রাফিক বাতি / সিগন্যাল', english: 'traffic light', pronunciationBn: 'আমপেল', example_de: 'An der Ampel halten.', example_bn: 'ট্রাফিক বাতিতে থামুন।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_3_5', german: 'Kreuzung', article: 'die', plural: 'die Kreuzungen', pos: 'noun', bengali: 'চৌরাস্তা / মোড়', english: 'crossroads / intersection', pronunciationBn: 'ক্রয়ৎসুং', example_de: 'Vorsicht an der Kreuzung!', example_bn: 'মোড়ে সাবধানতা অবলম্বন করুন!', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_3_6', german: 'Straße', article: 'die', plural: 'die Straßen', pos: 'noun', bengali: 'রাস্তা / সড়ক', english: 'street / road', pronunciationBn: 'শ্ট্রাসে', example_de: 'In welcher Straße wohnst du?', example_bn: 'তুমি কোন রাস্তায় থাকো?', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u6_3_7', german: 'finden', article: null, pos: 'verb', bengali: 'খুঁজে পাওয়া', english: 'to find', pronunciationBn: 'ফিন্ডেন', example_de: 'Ich finde den Weg nicht.', example_bn: 'আমি পথ খুঁজে পাচ্ছি না।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u6_3_8', german: 'Entschuldigung', article: 'die', plural: null, pos: 'phrase', bengali: 'মাফ করবেন / শুনুন', english: 'excuse me', pronunciationBn: 'এন্টশুলডিগুং', example_de: 'Entschuldigung, eine Frage bitte!', example_bn: 'মাফ করবেন, একটি প্রশ্ন ছিল!', topic: 'basics_personal', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "অনুরোধমূলক নির্দেশনা: 'Gehen Sie!'",
      title_en: 'Giving Formal Directions (Imperativ)',
      content_bn: 'পথচারীকে আনুষ্ঠানিক নির্দেশ দিতে ক্রিয়াকে প্রথমে এনে Sie যোগ করুন:\n• Gehen Sie geradeaus! (সোজা যান!)\n• Biegen Sie ab! (মোড় নিন!)\n• Nehmen Sie die erste Straße rechts! (ডানের প্রথম রাস্তাটি ধরুন!)',
      rule_table: [
        { label: 'সোজা যান', value: 'Gehen Sie geradeaus!', note: 'সোজাসুজি' },
        { label: 'বামে ঘুরুন', value: 'Biegen Sie nach links ab!', note: 'বামে' },
        { label: 'ডানে ঘুরুন', value: 'Biegen Sie nach rechts ab!', note: 'ডানে' }
      ]
    },
    exercises: [
      {
        id: 'ex_6_3_1',
        type: 'multiple_choice',
        prompt_bn: "জার্মানে 'সোজা এগিয়ে যান' এর সঠিক অভিব্যক্তি কোনটি?",
        explanation_bn: "'geradeaus' অর্থ সোজাসুজি: 'Gehen Sie bitte geradeaus!'",
        question: "'সোজা যান' এর সঠিক জার্মান কোনটি?",
        options: ['Gehen Sie bitte geradeaus!', 'Gehen Sie nach links!', 'Gehen Sie rückwärts!', 'Bleiben Sie stehen!'],
        correctAnswer: 'Gehen Sie bitte geradeaus!'
      },
      {
        id: 'ex_6_3_2',
        type: 'matching_pairs',
        prompt_bn: 'দিকনির্দেশক শব্দের সঠিক বাংলা অর্থ মেলান:',
        explanation_bn: 'geradeaus = সোজা, links = বামে, rechts = ডানে, die Ampel = ট্রাফিক বাতি',
        pairs: [
          { german: 'geradeaus', bengali: 'সোজা' },
          { german: 'links', bengali: 'বামে' },
          { german: 'rechts', bengali: 'ডানে' },
          { german: 'die Ampel', bengali: 'ট্রাফিক বাতি' }
        ]
      },
      {
        id: 'ex_6_3_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'মাফ করবেন, রেলস্টেশনটি কোথায়?'",
        explanation_bn: 'Entschuldigung, wo ist der Bahnhof?',
        targetSentence: 'Entschuldigung, wo ist der Bahnhof?',
        scrambledWords: ['ist', 'der', 'Entschuldigung,', 'Bahnhof?', 'wo'],
        meaning_bn: 'মাফ করবেন, রেলস্টেশনটি কোথায়?'
      }
    ]
  },
  {
    id: 'lesson_6_4',
    unitId: 'unit_6',
    title_bn: 'Dativ কারক ও প্রেপজিশন: mit, bei, nach, zu, aus',
    title_en: 'Dative Prepositions (mit, bei, nach, zu, aus)',
    subtitle_de: 'Dativ-Präpositionen: aus, bei, mit, nach, seit, von, zu',
    order: 29,
    content: {
      intro_bn: 'জার্মান ব্যাকরণে একটি বিখ্যাত ছড়া আছে:\n"aus, bei, mit, nach, seit, von, zu — immer mit dem Dativ du!"\nএই প্রেপজিশনগুলোর পরে যদি কোনো বিশেষ্য আসে, তবে তার আর্টিকেল অবশ্যই Dativ কারকে রূপান্তরিত হবে!\n\nDativ আর্টিকেলের রূপান্তর নিয়ম:\n• der (পুংলিঙ্গ) -> dem (বা সংক্ষেপে zum = zu dem, beim = bei dem, vom = von dem)\n• das (ক্লীবলিঙ্গ) -> dem\n• die (স্ত্রীলিঙ্গ) -> der (বা সংক্ষেপে zur = zu der)\n• die (বহুবচন) -> den + বিশেষ্যের শেষে "-n" (যেমন: mit den Kindern)!',
      intro_en: 'The classic dative prepositions are: aus, bei, mit, nach, seit, von, zu. They ALWAYS require dative: der/das -> dem, die -> der, plural die -> den (+n). Contractions: zu dem = zum, zu der = zur, bei dem = beim.',
      examples: [
        { de: 'Ich fahre zum Bahnhof.', bn: 'আমি রেলস্টেশনে যাচ্ছি।', note: 'zu + dem = zum' },
        { de: 'Ich wohne bei meinen Eltern.', bn: 'আমি আমার বাবা-মায়ের সাথে থাকি।', note: 'bei + Dativ' },
        { de: 'Ich gehe zur Apotheke.', bn: 'আমি ফার্মেসিতে যাচ্ছি।', note: 'zu + der = zur' },
        { de: 'Er kommt aus der Schweiz.', bn: 'তিনি সুইজারল্যান্ড থেকে এসেছেন।', note: 'aus + der' }
      ]
    },
    vocabulary: [
      { id: 'v_u6_4_1', german: 'zu', article: null, pos: 'preposition', bengali: 'প্রতি / দিকে / কাছে', english: 'to / toward', pronunciationBn: 'ৎসু', example_de: 'Komm zu mir!', example_bn: 'আমার কাছে এসো!', topic: 'prepositions_conjunctions', level: 'A1' },
      { id: 'v_u6_4_2', german: 'bei', article: null, pos: 'preposition', bengali: 'কাছে / সাথে / স্থানে', english: 'at / with / near', pronunciationBn: 'বাই', example_de: 'Er arbeitet bei BMW.', example_bn: 'তিনি বিএমডব্লিউ-তে কাজ করেন।', topic: 'prepositions_conjunctions', level: 'A1' },
      { id: 'v_u6_4_3', german: 'nach', article: null, pos: 'preposition', bengali: 'পরে / দিকে (শহর/দেশ)', english: 'after / to (cities/countries)', pronunciationBn: 'নাখ', example_de: 'Ich fliege nach Berlin.', example_bn: 'আমি বার্লিন যাচ্ছি।', topic: 'prepositions_conjunctions', level: 'A1' },
      { id: 'v_u6_4_4', german: 'aus', article: null, pos: 'preposition', bengali: 'থেকে / হতে', english: 'out of / from', pronunciationBn: 'আউস', example_de: 'Ich komme aus Bangladesch.', example_bn: 'আমি বাংলাদেশ থেকে এসেছি।', topic: 'prepositions_conjunctions', level: 'A1' },
      { id: 'v_u6_4_5', german: 'von', article: null, pos: 'preposition', bengali: 'থেকে / এর (of/from)', english: 'from / of', pronunciationBn: 'ফন', example_de: 'Das ist ein Geschenk von meiner Mutter.', example_bn: 'এটি আমার মায়ের কাছ থেকে পাওয়া উপহার।', topic: 'prepositions_conjunctions', level: 'A1' },
      { id: 'v_u6_4_6', german: 'mit', article: null, pos: 'preposition', bengali: 'সাথে / দিয়ে', english: 'with', pronunciationBn: 'মিট', example_de: 'Kommst du mit mir?', example_bn: 'তুমি কি আমার সাথে আসবে?', topic: 'prepositions_conjunctions', level: 'A1' },
      { id: 'v_u6_4_7', german: 'seit', article: null, pos: 'preposition', bengali: 'ধরে / যাবত (Since)', english: 'since / for', pronunciationBn: 'সাইট', example_de: 'Ich lerne seit drei Monaten Deutsch.', example_bn: 'আমি তিন মাস ধরে জার্মান শিখছি।', topic: 'prepositions_conjunctions', level: 'A1' },
      { id: 'v_u6_4_8', german: 'die Post', article: 'die', plural: null, pos: 'noun', bengali: 'ডাকঘর / পোস্ট অফিস', english: 'post office', pronunciationBn: 'ডি পোস্ট', example_de: 'Ich muss zur Post.', example_bn: 'আমাকে পোস্ট অফিসে যেতে হবে।', topic: 'city_transport_travel', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'Dativ কারকের রূপান্তর ছক',
      title_en: 'Dativ Case Transformations',
      content_bn: '• der -> dem (zum, beim, vom)\n• das -> dem (zum, beim, vom)\n• die -> der (zur)\n• die (বহুবচন) -> den + n (mit den Freunden)',
      rule_table: [
        { label: 'der / das', value: 'dem', note: 'zu + dem = zum' },
        { label: 'die (স্ত্রীলিঙ্গ)', value: 'der', note: 'zu + der = zur' },
        { label: 'die (বহুবচন)', value: 'den + n', note: 'bei den Großeltern' }
      ]
    },
    exercises: [
      {
        id: 'ex_6_4_1',
        type: 'fill_blank',
        prompt_bn: "সংক্ষিপ্ত রূপ বসান: 'Ich gehe ___ Arzt.' (আমি ডাক্তারের কাছে যাচ্ছি)",
        explanation_bn: "Arzt পুংলিঙ্গ (der Arzt)। zu + dem মিলে সংক্ষিপ্ত রূপ হয় 'zum' (zum Arzt)।",
        sentenceWithBlank: 'Ich gehe ___ Arzt.',
        blankType: 'preposition',
        options: ['zum', 'zur', 'zu', 'beim'],
        correctAnswer: 'zum',
        translation_bn: 'আমি ডাক্তারের কাছে যাচ্ছি।'
      },
      {
        id: 'ex_6_4_2',
        type: 'fill_blank',
        prompt_bn: "সংক্ষিপ্ত রূপ বসান: 'Ich muss ___ Post.' (আমাকে পোস্ট অফিসে যেতে হবে)",
        explanation_bn: "Post স্ত্রীলিঙ্গ (die Post)। zu + der মিলে সংক্ষিপ্ত রূপ হয় 'zur' (zur Post)।",
        sentenceWithBlank: 'Ich muss ___ Post.',
        blankType: 'preposition',
        options: ['zur', 'zum', 'zu', 'in der'],
        correctAnswer: 'zur',
        translation_bn: 'আমাকে পোস্ট অফিসে যেতে হবে।'
      },
      {
        id: 'ex_6_4_3',
        type: 'multiple_choice',
        prompt_bn: "কোন প্রেপজিশনগুলোর পর সর্বদা Dativ কারক হয়?",
        explanation_bn: 'aus, bei, mit, nach, seit, von, zu — এগুলো সর্বদা Dativ প্রেপজিশন।',
        question: "সর্বদা Dativ কারক নেয় কোন গ্রুপটি?",
        options: ['aus, bei, mit, nach, von, zu', 'durch, für, gegen, ohne, um', 'an, auf, hinter, in, neben', 'bis, durch, entlang'],
        correctAnswer: 'aus, bei, mit, nach, von, zu'
      }
    ]
  }
];

fs.writeFileSync(path.join(curriculumDir, 'unit6_home.json'), JSON.stringify(unit6_lessons, null, 2), 'utf8');
console.log('Unit 6 written: 4 lessons');

// ===========================================================================
// UNIT 7: Freizeit und Modalverben (Lessons 7.1 to 7.4)
// ===========================================================================
const unit7_1 = readFirst('unit7_hobbies.json');
const unit7_lessons = [
  unit7_1,
  {
    id: 'lesson_7_2',
    unitId: 'unit_7',
    title_bn: 'মোডাল ভার্ব I: können ও wollen',
    title_en: 'Modal Verbs I: Ability & Intention (can & want)',
    subtitle_de: 'Modalverben: können und wollen',
    order: 31,
    content: {
      intro_bn: 'মোডাল ভার্ব (সহায়ক ক্রিয়া) জার্মান ভাষার প্রাণ। এগুলো অন্য একটি মূল ক্রিয়ার ক্ষমতা বা ইচ্ছা প্রকাশ করে:\n\n১. können (পারা / can):\n• ich kann (আমি পারি)\n• du kannst (তুমি পারো)\n• er/sie/es kann (সে পারে)\n• wir können (আমরা পারি)\n• ihr könnt (তোমরা পারো)\n• sie/Sie können (তারা/আপনি পারেন)\n\n২. wollen (চাওয়া / ইচ্ছা করা / want):\n• ich will, du willst, er/sie/es will, wir wollen, ihr wollt, sie/Sie wollen.\n\nলক্ষ্য করুন: মোডাল ভার্বে ich এবং er/sie/es এর রূপ সর্বদা এক এবং এদের কোনো প্রত্যয় (-e বা -t) থাকে না!',
      intro_en: 'können expresses ability (can), wollen expresses strong intention (want). Crucial rule for all modal verbs: ich and er/sie/es forms are identical and have no ending (ich kann, er kann; ich will, er will).',
      examples: [
        { de: 'Ich kann gut Deutsch sprechen.', bn: 'আমি ভালো জার্মান বলতে পারি।', note: 'können + sprechen' },
        { de: 'Kannst du schwimmen?', bn: 'তুমি কি সাঁতার কাটতে পারো?', note: 'kannst du...?' },
        { de: 'Wir wollen am Wochenende nach Hamburg fahren.', bn: 'আমরা সাপ্তাহিক ছুটিতে হামবুর্গে যেতে চাই।', note: 'wollen + fahren' },
        { de: 'Er will heute zu Hause bleiben.', bn: 'সে আজ বাসায় থাকতে চায়।', note: 'will + bleiben' }
      ]
    },
    vocabulary: [
      { id: 'v_u7_2_1', german: 'können', article: null, pos: 'verb', bengali: 'পারা / সক্ষম হওয়া', english: 'can / to be able to', pronunciationBn: 'কোনেন', example_de: 'Ich kann das machen.', example_bn: 'আমি এটি করতে পারি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_2_2', german: 'wollen', article: null, pos: 'verb', bengali: 'চাওয়া / ইচ্ছা পোষণ করা', english: 'to want', pronunciationBn: 'ভলেন', example_de: 'Was willst du essen?', example_bn: 'তুমি কী খেতে চাও?', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_2_3', german: 'schwimmen', article: null, pos: 'verb', bengali: 'সাঁতার কাটা', english: 'to swim', pronunciationBn: 'শ্ভিমেন', example_de: 'Er schwimmt im See.', example_bn: 'তিনি হ্রদে সাঁতার কাটেন।', topic: 'hobbies_leisure_sports', level: 'A1' },
      { id: 'v_u7_2_4', german: 'tanzen', article: null, pos: 'verb', bengali: 'নাচা / নৃত্য করা', english: 'to dance', pronunciationBn: 'টানৎসেন', example_de: 'Wir tanzen Salsa.', example_bn: 'আমরা সালসা নাচি।', topic: 'hobbies_leisure_sports', level: 'A1' },
      { id: 'v_u7_2_5', german: 'singen', article: null, pos: 'verb', bengali: 'গান গাওয়া', english: 'to sing', pronunciationBn: 'সিংগেন', example_de: 'Sie singt sehr schön.', example_bn: 'তিনি খুব সুন্দর গান গান।', topic: 'hobbies_leisure_sports', level: 'A1' },
      { id: 'v_u7_2_6', german: 'fahren', article: null, pos: 'verb', bengali: 'যানবাহনে যাওয়া / চালানো', english: 'to drive / ride', pronunciationBn: 'ফারেন', example_de: 'Ich fahre Auto.', example_bn: 'আমি গাড়ি চালাই।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u7_2_7', german: 'bleiben', article: null, pos: 'verb', bengali: 'থাকা / অবস্থান করা', english: 'to stay', pronunciationBn: 'ব্লাইবেন', example_de: 'Ich bleibe hier.', example_bn: 'আমি এখানে থাকছি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_2_8', german: 'helfen', article: null, pos: 'verb', bengali: 'সাহায্য করা', english: 'to help', pronunciationBn: 'হেলফেন', example_de: 'Kann ich Ihnen helfen?', example_bn: 'আমি কি আপনাকে সাহায্য করতে পারি?', topic: 'essential_verbs', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "মোডাল ক্রিয়ায় 'ich' ও 'er' একই রূপ",
      title_en: 'Modal Verb Rule: ich == er/sie/es',
      content_bn: 'সকল মোডাল ভার্বে ich এবং er/sie/es এর ক্ষেত্রে কোনো পরিবর্তন থাকে না:\n• ich kann = er kann\n• ich will = er will',
      rule_table: [
        { label: 'ich', value: 'kann / will', note: 'কোনো -e যুক্ত হয় না' },
        { label: 'du', value: 'kannst / willst', note: '-st যুক্ত হয়' },
        { label: 'er / sie / es', value: 'kann / will', note: 'হুবহু ich-এর মতো!' }
      ]
    },
    exercises: [
      {
        id: 'ex_7_2_1',
        type: 'conjugation_quiz',
        prompt_bn: "'er' (সে) এর সাথে 'können' ক্রিয়ার সঠিক রূপ কোনটি?",
        explanation_bn: "মোডাল ভার্বে ich ও er এর রূপ একই: 'er kann' (কোনো -t বা উমলউট থাকে না)।",
        verb: 'können',
        pronoun: 'er/sie/es',
        meaning_bn: 'সে পারে',
        options: ['kann', 'könnt', 'kannst', 'können'],
        correctAnswer: 'kann'
      },
      {
        id: 'ex_7_2_2',
        type: 'fill_blank',
        prompt_bn: "সঠিক রূপটি বসান: 'Ich ___ morgen nach Berlin fahren.' (আমি আগামীকাল বার্লিন যেতে চাই)",
        explanation_bn: "wollen এর ich রূপ হলো 'will' (Ich will fahren)।",
        sentenceWithBlank: 'Ich ___ morgen nach Berlin fahren.',
        blankType: 'verb',
        options: ['will', 'wollt', 'wolle', 'wollst'],
        correctAnswer: 'will',
        translation_bn: 'আমি আগামীকাল বার্লিন যেতে চাই।'
      },
      {
        id: 'ex_7_2_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আমি খুব ভালো সাঁতার কাটতে পারি।'",
        explanation_bn: 'Ich kann sehr gut schwimmen.',
        targetSentence: 'Ich kann sehr gut schwimmen.',
        scrambledWords: ['sehr', 'schwimmen.', 'kann', 'gut', 'Ich'],
        meaning_bn: 'আমি খুব ভালো সাঁতার কাটতে পারি।'
      }
    ]
  },
  {
    id: 'lesson_7_3',
    unitId: 'unit_7',
    title_bn: 'মোডাল ভার্ব II: müssen ও dürfen',
    title_en: 'Modal Verbs II: Necessity & Permission (must & allowed to)',
    subtitle_de: 'Modalverben: müssen und dürfen',
    order: 32,
    content: {
      intro_bn: 'এই পাঠে আমরা অত্যন্ত গুরুত্বপূর্ণ দুটি মোডাল ভার্ব শিখব:\n\n১. müssen (বাধ্যবাধকতা / must - অবশ্যই কোনো কাজ করতে হবে):\n• ich muss, du musst, er/sie/es muss, wir müssen, ihr müsst, sie/Sie müssen.\nউদাহরণ: "Ich muss heute arbeiten." (আমাকে আজ কাজ করতে হবে)।\n\n২. dürfen (অনুমতি থাকা / allowed to - কোনো কিছুর অনুমতি থাকা):\n• ich darf, du darfst, er/sie/es darf, wir dürfen, ihr dürft, sie/Sie dürfen.\nউদাহরণ: "Hier darf man nicht rauchen." (এখানে ধূমপান করা নিষেধ / ধূমপানের অনুমতি নেই)।',
      intro_en: 'müssen expresses obligation/necessity (must: ich muss lernen). dürfen expresses permission (may/allowed to). In negative sentences, "nicht dürfen" means strictly forbidden (hier darf man nicht rauchen).',
      examples: [
        { de: 'Ich muss heute zum Arzt gehen.', bn: 'আমাকে আজ ডাক্তারের কাছে যেতে হবে।', note: 'müssen + Infinitiv' },
        { de: 'Hier darf man nicht parken.', bn: 'এখানে গাড়ি পার্ক করা নিষেধ।', note: 'nicht dürfen (নিষেধ)' },
        { de: 'Darf ich Sie etwas fragen?', bn: 'আমি কি আপনাকে কিছু জিজ্ঞাসা করতে পারি?', note: 'Darf ich...?' },
        { de: 'Wir müssen die Hausaufgaben machen.', bn: 'আমাদের বাড়ির কাজ করতে হবে।', note: 'Hausaufgaben machen' }
      ]
    },
    vocabulary: [
      { id: 'v_u7_3_1', german: 'müssen', article: null, pos: 'verb', bengali: 'বাধ্য হওয়া / অবশ্যই করা (must)', english: 'must / have to', pronunciationBn: 'মুসেন', example_de: 'Ich muss jetzt gehen.', example_bn: 'আমাকে এখন যেতে হবে।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_3_2', german: 'dürfen', article: null, pos: 'verb', bengali: 'অনুমতি থাকা (may / allowed)', english: 'may / to be allowed to', pronunciationBn: 'ডুরফেন', example_de: 'Darf ich hier sitzen?', example_bn: 'আমি কি এখানে বসতে পারি?', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_3_3', german: 'rauchen', article: null, pos: 'verb', bengali: 'ধূমপান করা', english: 'to smoke', pronunciationBn: 'রাউখেন', example_de: 'Rauchen ist hier verboten.', example_bn: 'এখানে ধূমপান নিষিদ্ধ।', topic: 'health_travel', level: 'A1' },
      { id: 'v_u7_3_4', german: 'parken', article: null, pos: 'verb', bengali: 'গাড়ি পার্ক করা', english: 'to park', pronunciationBn: 'পার্কেন', example_de: 'Sie dürfen hier parken.', example_bn: 'আপনি এখানে পার্ক করতে পারেন।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u7_3_5', german: 'fragen', article: null, pos: 'verb', bengali: 'জিজ্ঞাসা করা / প্রশ্ন করা', english: 'to ask', pronunciationBn: 'ফ্রাগেন', example_de: 'Darf ich eine Frage stellen?', example_bn: 'আমি কি একটি প্রশ্ন করতে পারি?', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_3_6', german: 'sitzen', article: null, pos: 'verb', bengali: 'বসা', english: 'to sit', pronunciationBn: 'সিৎসেন', example_de: 'Bitte setzen Sie sich.', example_bn: 'দয়া করে বসুন।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_3_7', german: 'Hausaufgabe', article: 'die', plural: 'die Hausaufgaben', pos: 'noun', bengali: 'বাড়ির কাজ (হোমওয়ার্ক)', english: 'homework', pronunciationBn: 'হাউসআউফগাবে', example_de: 'Ich mache meine Hausaufgaben.', example_bn: 'আমি আমার বাড়ির কাজ করছি।', topic: 'work_office_education', level: 'A1' },
      { id: 'v_u7_3_8', german: 'verboten', article: null, pos: 'adj', bengali: 'নিষিদ্ধ / বারণ', english: 'forbidden / prohibited', pronunciationBn: 'ফেয়ারবোটেন', example_de: 'Das ist streng verboten.', example_bn: 'এটি কঠোরভাবে নিষিদ্ধ।', topic: 'basics_personal', level: 'A1' }
    ],
    grammarTip: {
      title_bn: "নিষেধাজ্ঞা প্রকাশের সূত্র: 'nicht dürfen'",
      title_en: 'Expressing Prohibition with "nicht dürfen"',
      content_bn: 'জার্মান সাইনবোর্ড বা সাধারণ নিয়মাবলীতে "Hier darf man nicht..." অর্থ এটি করা সম্পূর্ণ নিষিদ্ধ!\n• Hier darf man nicht rauchen. (ধূমপান নিষেধ)\n• Hier darf man nicht fotografieren. (ছবি তোলা নিষেধ)',
      rule_table: [
        { label: 'man darf', value: 'অনুমতি আছে', note: 'Allowed' },
        { label: 'man darf nicht', value: 'কঠোর নিষেধ', note: 'Strictly forbidden' },
        { label: 'man muss', value: 'বাধ্যতামূলক', note: 'Mandatory' }
      ]
    },
    exercises: [
      {
        id: 'ex_7_3_1',
        type: 'multiple_choice',
        prompt_bn: "'এখানে ধূমপান করা নিষেধ' এর জার্মান অনুবাদ কোনটি?",
        explanation_bn: "'Hier darf man nicht rauchen.' অর্থ এখানে ধূমপান করা নিষেধ।",
        question: "ধূমপান নিষেধ এর সঠিক বাক্য কোনটি?",
        options: ['Hier darf man nicht rauchen.', 'Hier muss man rauchen.', 'Hier will man rauchen.', 'Hier kann man rauchen.'],
        correctAnswer: 'Hier darf man nicht rauchen.'
      },
      {
        id: 'ex_7_3_2',
        type: 'fill_blank',
        prompt_bn: "সঠিক রূপটি বসান: 'Ich ___ heute viel lernen.' (আমাকে আজ অনেক পড়তে হবে)",
        explanation_bn: "müssen এর ich রূপ হলো 'muss' (Ich muss lernen)।",
        sentenceWithBlank: 'Ich ___ heute viel lernen.',
        blankType: 'verb',
        options: ['muss', 'musst', 'müssen', 'müsst'],
        correctAnswer: 'muss',
        translation_bn: 'আমাকে আজ অনেক পড়তে হবে।'
      },
      {
        id: 'ex_7_3_3',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আমি কি এখানে বসতে পারি?'",
        explanation_bn: 'Darf ich hier sitzen?',
        targetSentence: 'Darf ich hier sitzen?',
        scrambledWords: ['hier', 'ich', 'Darf', 'sitzen?'],
        meaning_bn: 'আমি কি এখানে বসতে পারি?'
      }
    ]
  },
  {
    id: 'lesson_7_4',
    unitId: 'unit_7',
    title_bn: 'Satzklammer: দুই ক্রিয়ার বাক্যের সোনালী নিয়ম',
    title_en: 'The Sentence Bracket (Satzklammer) Rule',
    subtitle_de: 'Satzklammer und Wortstellung mit Modalverben',
    order: 33,
    content: {
      intro_bn: 'জার্মান ভাষার সবচেয়ে বিখ্যাত বাক্য গঠনের কাঠামোকে বলা হয় Satzklammer (Sentence Bracket বা বাক্যের বন্ধনী)।\n\nনিয়মটি অত্যন্ত সুন্দর ও গাণিতিক:\nযখন কোনো বাক্যে মোডাল ভার্ব আসে:\n১. প্রথম ক্রিয়া (মোডাল ভার্ব) বসে বাক্যের ২য় অবস্থানে (কর্তা অনুযায়ী রূপান্তরিত হয়ে)।\n২. দ্বিতীয় ক্রিয়া (মূল কাজ/Infinitiv) ছিটকে চলে যায় বাক্যের একেবারে শেষ স্থানে, তার মূল অপরিবর্তিত রূপে!\n\nউদাহরণ:\n"Ich kann heute leider nicht zu deiner Party kommen."\n(লক্ষ্য করুন: kann বসেছে ২ নম্বরে, আর kommen গিয়ে বসেছে একদম শেষে! মাঝখানে বসেছে সময়, অনুভূতি ও স্থান)।',
      intro_en: 'The Satzklammer (verb bracket) is fundamental: conjugated modal verb sits at Position 2, while the base infinitive verb is locked at the very END of the sentence: Ich MUSS morgen um 8 Uhr zur Arbeit GEHEN.',
      examples: [
        { de: 'Ich möchte morgen einen Deutschkurs besuchen.', bn: 'আমি আগামীকাল একটি জার্মান কোর্সে অংশ নিতে চাই।', note: 'möchte (pos 2) ... besuchen (end)' },
        { de: 'Kannst du mich morgen vom Flughafen abholen?', bn: 'তুমি কি আগামীকাল আমাকে বিমানবন্দর থেকে নিয়ে আসতে পারবে?', note: 'Kannst ... abholen' },
        { de: 'Wir wollen am Sonntag zusammen kochen.', bn: 'আমরা রবিবারে একসাথে রান্না করতে চাই।', note: 'wollen ... kochen' },
        { de: 'Er muss heute bis 20 Uhr im Büro bleiben.', bn: 'তাকে আজ রাত ৮টা পর্যন্ত অফিসে থাকতে হবে।', note: 'muss ... bleiben' }
      ]
    },
    vocabulary: [
      { id: 'v_u7_4_1', german: 'besuchen', article: null, pos: 'verb', bengali: 'পরিদর্শন করা / দেখা করতে যাওয়া', english: 'to visit', pronunciationBn: 'বেজুখেন', example_de: 'Ich besuche meine Oma.', example_bn: 'আমি আমার দাদীকে দেখতে যাচ্ছি।', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_4_2', german: 'abholen', article: null, pos: 'verb', bengali: 'কাউকে এগিয়ে আনা / রিসিভ করা', english: 'to pick up', pronunciationBn: 'আবহোলেন', example_de: 'Ich hole dich ab.', example_bn: 'আমি তোমাকে রিসিভ করতে আসছি।', topic: 'daily_routine_time', level: 'A1' },
      { id: 'v_u7_4_3', german: 'leider', article: null, pos: 'adv', bengali: 'দুর্ভাগ্যবশত / দুঃখজনকভাবে', english: 'unfortunately', pronunciationBn: 'লাইডার', example_de: 'Ich habe leider keine Zeit.', example_bn: 'দুঃখজনকভাবে আমার সময় নেই।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u7_4_4', german: 'Party', article: 'die', plural: 'die Partys', pos: 'noun', bengali: 'পার্টি / উৎসব', english: 'party', pronunciationBn: 'পার্টি', example_de: 'Kommst du zur Party?', example_bn: 'তুমি কি পার্টিতে আসবে?', topic: 'hobbies_leisure_sports', level: 'A1' },
      { id: 'v_u7_4_5', german: 'Flughafen', article: 'der', plural: 'die Flughäfen', pos: 'noun', bengali: 'বিমানবন্দর', english: 'airport', pronunciationBn: 'ফ্লুগহাফেন', example_de: 'Wir fahren zum Flughafen.', example_bn: 'আমরা বিমানবন্দরের দিকে যাচ্ছি।', topic: 'city_transport_travel', level: 'A1' },
      { id: 'v_u7_4_6', german: 'zusammen', article: null, pos: 'adv', bengali: 'একসাথে', english: 'together', pronunciationBn: 'ৎসুসামেন', example_de: 'Wir lernen zusammen.', example_bn: 'আমরা একসাথে শিখছি।', topic: 'basics_personal', level: 'A1' },
      { id: 'v_u7_4_7', german: 'mitkommen', article: null, pos: 'verb', bengali: 'সাথে আসা', english: 'to come along', pronunciationBn: 'মিটকমেন', example_de: 'Willst du mitkommen?', example_bn: 'তুমি কি সাথে আসতে চাও?', topic: 'essential_verbs', level: 'A1' },
      { id: 'v_u7_4_8', german: 'kennenlernen', article: null, pos: 'verb', bengali: 'পরিচিত হওয়া / চেনা', english: 'to get to know', pronunciationBn: 'কেনেনলের্নেন', example_de: 'Freut mich, Sie kennenzulernen!', example_bn: 'আপনার সাথে পরিচিত হয়ে আনন্দিত হলাম!', topic: 'essential_verbs', level: 'A1' }
    ],
    grammarTip: {
      title_bn: 'বাক্যের বন্ধনী (Satzklammer) কাঠামো',
      title_en: 'Satzklammer Visual Blueprint',
      content_bn: 'পজিশন ২ = রূপান্তরিত মোডাল ক্রিয়া।\nশেষ পজিশন = মূল ক্রিয়ার আদি রূপ (Infinitiv)।',
      rule_table: [
        { label: 'কর্তা (Subjekt)', value: 'Ich', note: 'স্থান ১' },
        { label: 'মোডাল ভার্ব', value: 'kann', note: 'স্থান ২ (কনজুগেটেড)' },
        { label: 'মাঝের অংশ', value: 'heute leider nicht', note: 'তথ্য' },
        { label: 'মূল ক্রিয়া (Infinitiv)', value: 'kommen.', note: 'বাক্যের একেবারে শেষ শব্দ!' }
      ]
    },
    exercises: [
      {
        id: 'ex_7_4_1',
        type: 'multiple_choice',
        prompt_bn: "মোডাল ভার্বযুক্ত বাক্যে মূল ক্রিয়াটি কোথায় বসে?",
        explanation_bn: "Satzklammer নিয়ম অনুযায়ী মূল ক্রিয়াটি (ইনফিনিটিভ) বাক্যের একেবারে শেষ শব্দ হিসেবে বসে।",
        question: "মোডাল ভার্বযুক্ত বাক্যে মূল ক্রিয়া কোথায় বসে?",
        options: ['বাক্যের একেবারে শেষে (Infinitiv রূপে)', 'মোডাল ভার্বের ঠিক পরপরই', 'বাক্যের শুরুতে', 'কর্তার ঠিক আগে'],
        correctAnswer: 'বাক্যের একেবারে শেষে (Infinitiv রূপে)'
      },
      {
        id: 'ex_7_4_2',
        type: 'sentence_builder',
        prompt_bn: "সাজিয়ে বাক্য লিখুন: 'আমরা রবিবারে একসাথে রান্না করতে চাই।'",
        explanation_bn: 'Wir wollen am Sonntag zusammen kochen.',
        targetSentence: 'Wir wollen am Sonntag zusammen kochen.',
        scrambledWords: ['zusammen', 'Wir', 'kochen.', 'wollen', 'Sonntag', 'am'],
        meaning_bn: 'আমরা রবিবারে একসাথে রান্না করতে চাই।'
      }
    ]
  }
];

fs.writeFileSync(path.join(curriculumDir, 'unit7_hobbies.json'), JSON.stringify(unit7_lessons, null, 2), 'utf8');
console.log('Unit 7 written: 4 lessons');

// Write Units 8, 9, 10
