'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  HelpCircle,
  Keyboard,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  ArrowRight,
  BookOpen,
  Filter,
  Flame,
  ChevronRight,
  X,
  Target
} from 'lucide-react';
import { getAllWords, getWordsByTopic, getNouns, getTopics, TOPIC_METADATA } from '../data/vocabulary';
import { Word, Article } from '../types/vocabulary';
import { SpeakerButton } from './SpeakerButton';
import { useAppStore } from '../store/useAppStore';

type TrainerMode = 'hub' | 'article' | 'flashcards' | 'quiz' | 'spelling' | 'goethe_exam';

export function VocabularyTrainer({ onClose }: { onClose?: () => void }) {
  const [mode, setMode] = useState<TrainerMode>('hub');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const { knownWords, toggleWordKnown } = useAppStore();

  const allWords = useMemo(() => getAllWords(), []);
  const allNouns = useMemo(() => getNouns(), []);
  const topics = useMemo(() => getTopics(), []);

  // Filtered word pool for current topic
  const currentPool = useMemo(() => {
    return getWordsByTopic(selectedTopic);
  }, [selectedTopic]);

  // Article Quiz state
  const [articleIndex, setArticleIndex] = useState(0);
  const [articleStreak, setArticleStreak] = useState(0);
  const [articleFeedback, setArticleFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [articleSelected, setArticleSelected] = useState<Article | null>(null);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Meaning Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Spelling state
  const [spellIndex, setSpellIndex] = useState(0);
  const [spellInput, setSpellInput] = useState('');
  const [spellResult, setSpellResult] = useState<'correct' | 'wrong' | null>(null);
  const [showSpellHint, setShowSpellHint] = useState(false);

  // Goethe Exam Booster active tab
  const [examTab, setExamTab] = useState<'sprechen1' | 'sprechen2' | 'sprechen3' | 'schreiben'>('sprechen1');

  // Reset helpers
  const resetArticle = () => {
    setArticleIndex((prev) => (prev + 1) % allNouns.length);
    setArticleFeedback(null);
    setArticleSelected(null);
  };

  const handleArticleAnswer = (chosen: Article) => {
    if (articleFeedback !== null) return;
    const currentNoun = allNouns[articleIndex];
    setArticleSelected(chosen);
    if (chosen === currentNoun.article) {
      setArticleFeedback('correct');
      setArticleStreak((s) => s + 1);
    } else {
      setArticleFeedback('wrong');
      setArticleStreak(0);
    }
  };

  // Next card in flashcards
  const nextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % (currentPool.length || 1));
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + currentPool.length) % (currentPool.length || 1));
  };

  // Generate 4 choices for quiz deterministically without calling Math.random during render
  const quizCurrentWord = currentPool[quizIndex % currentPool.length] || allWords[0];
  const quizChoices = useMemo(() => {
    if (!quizCurrentWord || allWords.length < 4) return [];
    const others = allWords.filter((w) => w.id !== quizCurrentWord.id);
    const count = others.length;
    // Pick 3 pseudo-random but deterministic distractors using quizCurrentWord.id + quizIndex
    const offset1 = (quizIndex * 13 + 7) % count;
    const offset2 = (quizIndex * 37 + 19) % count;
    const offset3 = (quizIndex * 61 + 31) % count;

    const distractor1 = others[offset1];
    const distractor2 = others[offset2 === offset1 ? (offset2 + 1) % count : offset2];
    const distractor3 = others[(offset3 === offset1 || offset3 === offset2) ? (offset3 + 2) % count : offset3];

    // Deterministic position (0 to 3) for the correct answer
    const correctPos = (quizIndex * 3) % 4;
    const options = [distractor1, distractor2, distractor3];
    options.splice(correctPos, 0, quizCurrentWord);
    return options;
  }, [quizCurrentWord, allWords, quizIndex]);

  const handleQuizAnswer = (choiceIndex: number) => {
    if (quizAnswered) return;
    setQuizSelected(choiceIndex);
    setQuizAnswered(true);
    if (quizChoices[choiceIndex]?.id === quizCurrentWord.id) {
      setQuizScore((s) => s + 1);
    }
  };

  const nextQuizQuestion = () => {
    setQuizIndex((i) => i + 1);
    setQuizSelected(null);
    setQuizAnswered(false);
  };

  // Spelling check
  const spellCurrentWord = currentPool[spellIndex % currentPool.length] || allWords[0];
  const checkSpelling = () => {
    if (!spellCurrentWord) return;
    const cleanInput = spellInput.trim().toLowerCase();
    const cleanTarget = spellCurrentWord.german.trim().toLowerCase();
    if (cleanInput === cleanTarget) {
      setSpellResult('correct');
    } else {
      setSpellResult('wrong');
    }
  };

  const nextSpellWord = () => {
    setSpellIndex((i) => i + 1);
    setSpellInput('');
    setSpellResult(null);
    setShowSpellHint(false);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#070d1e] min-h-screen text-slate-800 dark:text-slate-100 pb-20">
      {/* Top Header - White and Royal Blue */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0f1d40]/95 backdrop-blur-md border-b border-blue-100 dark:border-blue-900/40 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          {mode !== 'hub' ? (
            <button
              onClick={() => setMode('hub')}
              className="p-1.5 -ml-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
            >
              ← ফিরে যান
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              DE
            </div>
          )}
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {mode === 'hub' && '১,৪০০+ ভোকাবুলারি ট্রেইনার'}
              {mode === 'article' && 'Der / Die / Das আর্টিকেল ড্রিল'}
              {mode === 'flashcards' && 'ভোকাবুলারি ফ্ল্যাশকার্ড'}
              {mode === 'quiz' && 'অর্থ বাছাই কুইজ'}
              {mode === 'spelling' && 'বানান ও টাইপিং ড্রিল'}
              {mode === 'goethe_exam' && 'গ্যোয়েটে A1 পরীক্ষার প্রস্তুতি'}
            </h1>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Goethe-Zertifikat A1: Start Deutsch 1 স্ট্যান্ডার্ড
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 py-5 space-y-6">
        {/* ========================================================================= */}
        {/* MODE: HUB (SELECTION SCREEN) */}
        {/* ========================================================================= */}
        {mode === 'hub' && (
          <div className="space-y-6">
            {/* Royal Blue Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white p-6 shadow-md border border-blue-500/30">
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> ১,৪৮৫টি সম্পূর্ণ A1 শব্দ
                </div>
                <h2 className="text-2xl font-black tracking-tight">
                  জার্মান ভোকাবুলারি মাস্টারক্লাস
                </h2>
                <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
                  গ্যোয়েটে ইনস্টিটিউটের অফিসিয়াল শব্দতালিকা অনুযায়ী ১৬টি বিষয়ে ১,৪৮৫টি শব্দ অনুশীলন করুন। সঠিক আর্টিকেল, বহুবচন ও অর্থ শিখুন।
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-blue-100">
                  <span className="bg-blue-900/40 px-3 py-1 rounded-lg">✓ der (পুংলিঙ্গ)</span>
                  <span className="bg-blue-900/40 px-3 py-1 rounded-lg">✓ die (স্ত্রীলিঙ্গ)</span>
                  <span className="bg-blue-900/40 px-3 py-1 rounded-lg">✓ das (ক্লীবলিঙ্গ)</span>
                  <span className="bg-blue-900/40 px-3 py-1 rounded-lg">✓ অডিও উচ্চারণ</span>
                </div>
              </div>
            </div>

            {/* Topic Filter Bar */}
            <div className="bg-white dark:bg-[#0f1d40] rounded-xl p-3 shadow-xs border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                বিষয় বেছে নিন (Topic Filter)
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedTopic('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedTopic === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  সব বিষয় ({allWords.length})
                </button>
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedTopic === t.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label_bn}</span>
                    <span className="text-[10px] opacity-75">({t.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Practice Modes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Der / Die / Das Trainer */}
              <button
                onClick={() => {
                  setArticleIndex(Math.floor(Math.random() * allNouns.length));
                  setArticleFeedback(null);
                  setMode('article');
                }}
                className="group relative p-5 bg-white dark:bg-[#0f1d40] hover:bg-blue-50/50 dark:hover:bg-[#132554] rounded-2xl border border-blue-100 dark:border-blue-900/40 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xl mb-3 shadow-xs">
                    der
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Der / Die / Das আর্টিকেল ড্রিল
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    জার্মান বিশেষ্যের লিঙ্গ মুখস্থ করার দ্রুততম পদ্ধতি। {allNouns.length}টি নাউনের সঠিক আর্টিকেল পরীক্ষা।
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>অনুশীলন শুরু করুন</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* 2. Complete Flashcard Deck */}
              <button
                onClick={() => {
                  setCardIndex(0);
                  setIsFlipped(false);
                  setMode('flashcards');
                }}
                className="group relative p-5 bg-white dark:bg-[#0f1d40] hover:bg-blue-50/50 dark:hover:bg-[#132554] rounded-2xl border border-blue-100 dark:border-blue-900/40 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 shadow-xs">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    ভোকাবুলারি ফ্ল্যাশকার্ড ডেক
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    অডিও উচ্চারণ, বাংলা উচ্চারণ সংকেত ও উদাহরণ বাক্যসহ {currentPool.length}টি শব্দের ইন্টারঅ্যাকটিভ ফ্ল্যাশকার্ড।
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>ফ্ল্যাশকার্ড ডেক খুলুন</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* 3. Meaning Quiz */}
              <button
                onClick={() => {
                  setQuizIndex(0);
                  setQuizScore(0);
                  setQuizSelected(null);
                  setQuizAnswered(false);
                  setMode('quiz');
                }}
                className="group relative p-5 bg-white dark:bg-[#0f1d40] hover:bg-blue-50/50 dark:hover:bg-[#132554] rounded-2xl border border-blue-100 dark:border-blue-900/40 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 shadow-xs">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    ৪-অপশন অর্থ বাছাই কুইজ
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    জার্মান শব্দ দেখে সঠিক বাংলা ও ইংরেজি অর্থ বাছাই করুন। স্কোর এবং তাত্ক্ষণিক সমাধান।
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>কুইজ খেলুন</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* 4. Spelling & Typing Drill */}
              <button
                onClick={() => {
                  setSpellIndex(0);
                  setSpellInput('');
                  setSpellResult(null);
                  setShowSpellHint(false);
                  setMode('spelling');
                }}
                className="group relative p-5 bg-white dark:bg-[#0f1d40] hover:bg-blue-50/50 dark:hover:bg-[#132554] rounded-2xl border border-blue-100 dark:border-blue-900/40 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3 shadow-xs">
                    <Keyboard className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    বানান ও টাইপিং ড্রিল
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    মোবাইলের জন্য বিল্ট-ইন উমলাউত কীবোর্ড (ä, ö, ü, ß)। নিখুঁত বানান লেখার দক্ষতা বাড়ান।
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-violet-600 dark:text-violet-400">
                  <span>টাইপিং শুরু করুন</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* 5. Special Goethe A1 Exam Booster Banner */}
            <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-sm border border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[11px]">
                  <Award className="w-3.5 h-3.5" /> Goethe-Institut Standard
                </div>
                <h3 className="text-lg font-bold">গ্যোয়েটে A1 পরীক্ষার স্পিকিং ও রাইটিং বুস্টার</h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Sprechen Teil 1 (আত্মপরিচয়), Teil 2 (শব্দ কার্ড), Teil 3 (অনুরোধ) এবং Schreiben ফর্ম পূরণ ও ইমেইল মডেল।
                </p>
              </div>
              <button
                onClick={() => setMode('goethe_exam')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-sm self-start sm:self-center"
              >
                পরীক্ষা প্রস্তুতি দেখুন →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE: ARTICLE SPEED DRILL (DER / DIE / DAS) */}
        {/* ========================================================================= */}
        {mode === 'article' && (
          <div className="space-y-6">
            {/* Header with Streak */}
            <div className="flex items-center justify-between bg-white dark:bg-[#0f1d40] px-5 py-3 rounded-xl border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${articleStreak > 2 ? 'text-amber-500 animate-bounce' : 'text-slate-400'}`} />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  টানা সঠিক উত্তর (Streak): <span className="text-blue-600 font-black">{articleStreak}</span>
                </span>
              </div>
              <button
                onClick={resetArticle}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> পরবর্তী শব্দ
              </button>
            </div>

            {/* Word Card */}
            {allNouns[articleIndex] && (
              <div className="bg-white dark:bg-[#0f1d40] rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-200 dark:border-blue-900/60 shadow-sm space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold">
                    Goethe A1 Nomen
                  </span>
                  <SpeakerButton text={allNouns[articleIndex].german} size="md" />
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    {articleFeedback !== null && (
                      <span
                        className={`mr-2 ${
                          allNouns[articleIndex].article === 'der'
                            ? 'text-blue-600'
                            : allNouns[articleIndex].article === 'die'
                            ? 'text-red-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {allNouns[articleIndex].article}
                      </span>
                    )}
                    {allNouns[articleIndex].german}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    [উচ্চারণ: {allNouns[articleIndex].pronunciationBn}]
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-[#091430] rounded-xl text-slate-700 dark:text-slate-300 text-sm font-medium">
                  {allNouns[articleIndex].bengali} ({allNouns[articleIndex].english})
                  {allNouns[articleIndex].plural && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-semibold">
                      বহুবচন: {allNouns[articleIndex].plural}
                    </div>
                  )}
                </div>

                {/* Article Buttons: Der, Die, Das */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <button
                    onClick={() => handleArticleAnswer('der')}
                    disabled={articleFeedback !== null}
                    className={`py-3.5 px-4 rounded-xl font-black text-lg transition-all shadow-xs ${
                      articleSelected === 'der'
                        ? articleFeedback === 'correct'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white'
                        : articleFeedback !== null && allNouns[articleIndex].article === 'der'
                        ? 'bg-blue-600 text-white ring-4 ring-blue-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                    }`}
                  >
                    der
                  </button>

                  <button
                    onClick={() => handleArticleAnswer('die')}
                    disabled={articleFeedback !== null}
                    className={`py-3.5 px-4 rounded-xl font-black text-lg transition-all shadow-xs ${
                      articleSelected === 'die'
                        ? articleFeedback === 'correct'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white'
                        : articleFeedback !== null && allNouns[articleIndex].article === 'die'
                        ? 'bg-red-600 text-white ring-4 ring-red-300'
                        : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
                    }`}
                  >
                    die
                  </button>

                  <button
                    onClick={() => handleArticleAnswer('das')}
                    disabled={articleFeedback !== null}
                    className={`py-3.5 px-4 rounded-xl font-black text-lg transition-all shadow-xs ${
                      articleSelected === 'das'
                        ? articleFeedback === 'correct'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white'
                        : articleFeedback !== null && allNouns[articleIndex].article === 'das'
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-300'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
                    }`}
                  >
                    das
                  </button>
                </div>

                {/* Feedback Banner */}
                {articleFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center justify-between text-left text-sm ${
                      articleFeedback === 'correct'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {articleFeedback === 'correct' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold">
                          {articleFeedback === 'correct' ? 'চমৎকার! সঠিক হয়েছে।' : 'ভুল হয়েছে!'}
                        </div>
                        <div className="text-xs mt-0.5">
                          সঠিক উত্তর: <strong className="font-bold uppercase">{allNouns[articleIndex].article} {allNouns[articleIndex].german}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={resetArticle}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                    >
                      পরবর্তী →
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Grammar Article Cheat Sheet Card */}
            <div className="bg-white dark:bg-[#0f1d40] rounded-xl p-5 border border-blue-100 dark:border-blue-900/40 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                <BookOpen className="w-4 h-4 text-blue-600" /> সহজে আর্টিকেল চেনার টেকনিক
              </h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>
                  <strong className="text-blue-600 dark:text-blue-400">der (নীল):</strong> সাধারণত পুরুষবাচক, বার/মাস/ঋতু, দিক, এবং -er, -ling, -or যুক্ত শব্দ।
                </li>
                <li>
                  <strong className="text-red-600 dark:text-red-400">die (লাল):</strong> স্ত্রীবাচক, বহুবচন এবং -ung, -heit, -keit, -schaft, -tion, -tät, -e যুক্ত অধিকাংশ শব্দ।
                </li>
                <li>
                  <strong className="text-emerald-600 dark:text-emerald-400">das (সবুজ):</strong> ক্ষুদ্রার্থবোধক (-chen, -lein), ধাতু, ইংরেজি থেকে ধার করা শব্দ এবং -ment, -um, -nis যুক্ত শব্দ।
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE: FLASHCARDS DECK */}
        {/* ========================================================================= */}
        {mode === 'flashcards' && currentPool[cardIndex] && (
          <div className="space-y-5">
            {/* Card Progress */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>শব্দ {cardIndex + 1} / {currentPool.length}</span>
              <span className="text-blue-600 dark:text-blue-400">
                {TOPIC_METADATA[selectedTopic]?.label_bn || 'সব বিষয়'}
              </span>
            </div>

            {/* 3D Flip Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer min-h-[300px] bg-white dark:bg-[#0f1d40] rounded-2xl p-6 sm:p-8 border-2 border-blue-100 dark:border-blue-900/40 shadow-sm flex flex-col justify-between transition-all hover:border-blue-400"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">
                  {currentPool[cardIndex].pos} • {currentPool[cardIndex].level}
                </span>
                <span className="text-blue-600 font-bold flex items-center gap-1">
                  কার্ড উল্টাতে ট্যাপ করুন ↻
                </span>
              </div>

              {!isFlipped ? (
                <div className="text-center py-8 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`text-3xl sm:text-5xl font-black ${
                        currentPool[cardIndex].article === 'der'
                          ? 'text-blue-600'
                          : currentPool[cardIndex].article === 'die'
                          ? 'text-red-600'
                          : currentPool[cardIndex].article === 'das'
                          ? 'text-emerald-600'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {currentPool[cardIndex].article && `${currentPool[cardIndex].article} `}
                      {currentPool[cardIndex].german}
                    </span>
                  </div>

                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    [উচ্চারণ: {currentPool[cardIndex].pronunciationBn}]
                  </div>

                  <div className="pt-2 flex justify-center">
                    <SpeakerButton text={currentPool[cardIndex].german} size="lg" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                    {currentPool[cardIndex].bengali}
                  </div>
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    ইংরেজি: {currentPool[cardIndex].english}
                  </div>

                  {currentPool[cardIndex].plural && (
                    <div className="text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 py-1 px-3 rounded-lg inline-block font-semibold">
                      বহুবচন (Plural): {currentPool[cardIndex].plural}
                    </div>
                  )}

                  {currentPool[cardIndex].example_de && (
                    <div className="text-left bg-slate-50 dark:bg-[#070e24] p-3 rounded-xl border border-blue-50 dark:border-blue-950 text-xs space-y-1">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {currentPool[cardIndex].example_de}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">
                        {currentPool[cardIndex].example_bn}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Card Controls */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const id = currentPool[cardIndex].id;
                    toggleWordKnown(id);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    knownWords[currentPool[cardIndex].id]
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {knownWords[currentPool[cardIndex].id] ? 'জানা শব্দ হিসেবে চিহ্নিত' : 'জানা শব্দ চিহ্নিত করুন'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevCard();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
                  >
                    পূর্ববর্তী
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextCard();
                    }}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
                  >
                    পরবর্তী →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE: MEANING QUIZ */}
        {/* ========================================================================= */}
        {mode === 'quiz' && quizCurrentWord && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>প্রশ্ন {quizIndex + 1}</span>
              <span className="text-emerald-600 font-black">স্কোর: {quizScore}</span>
            </div>

            <div className="bg-white dark:bg-[#0f1d40] rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-100 dark:border-blue-900/40 shadow-sm space-y-4">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                সঠিক অর্থ বেছে নিন (Choose the correct meaning)
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {quizCurrentWord.article && `${quizCurrentWord.article} `}
                  {quizCurrentWord.german}
                </span>
                <SpeakerButton text={quizCurrentWord.german} size="md" />
              </div>
              <div className="text-xs text-slate-500">
                [উচ্চারণ: {quizCurrentWord.pronunciationBn}]
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {quizChoices.map((choice, idx) => {
                  const isSelected = quizSelected === idx;
                  const isCorrect = choice.id === quizCurrentWord.id;

                  let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-400';
                  if (quizAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-600 text-white border-red-600';
                    }
                  }

                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={quizAnswered}
                      className={`p-4 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                    >
                      <div className="font-bold">{choice.bengali}</div>
                      <div className="text-xs opacity-75 mt-0.5">{choice.english}</div>
                    </button>
                  );
                })}
              </div>

              {quizAnswered && (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={nextQuizQuestion}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                  >
                    পরবর্তী প্রশ্ন →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE: SPELLING & TYPING */}
        {/* ========================================================================= */}
        {mode === 'spelling' && spellCurrentWord && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0f1d40] rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-100 dark:border-blue-900/40 shadow-sm space-y-4">
              <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold">
                জার্মান সঠিক বানান লিখুন
              </span>

              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {spellCurrentWord.bengali}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                ইংরেজি: {spellCurrentWord.english} | উচ্চারণ সংকেত: {spellCurrentWord.pronunciationBn}
              </div>

              <div className="flex justify-center">
                <SpeakerButton text={spellCurrentWord.german} size="md" />
              </div>

              {/* Input field */}
              <div className="space-y-2 pt-2">
                <input
                  type="text"
                  value={spellInput}
                  onChange={(e) => setSpellInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkSpelling()}
                  placeholder="এখানে জার্মান শব্দটি টাইপ করুন..."
                  className="w-full text-center px-4 py-3 rounded-xl border-2 border-blue-200 dark:border-blue-900 focus:border-blue-600 focus:outline-hidden font-bold text-lg dark:bg-[#08122c]"
                />

                {/* German Umlaut Virtual Keyboard helper for mobile */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-semibold mr-1">উমলাউত কী:</span>
                  {['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((char) => (
                    <button
                      key={char}
                      type="button"
                      onClick={() => setSpellInput((prev) => prev + char)}
                      className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 hover:bg-blue-200 text-blue-900 dark:text-blue-200 font-bold text-sm shadow-xs transition-colors"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowSpellHint(!showSpellHint)}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  {showSpellHint ? 'সংকেত লুকান' : 'সংকেত দেখুন (Hint)'}
                </button>
                <button
                  onClick={checkSpelling}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                >
                  যাচাই করুন
                </button>
              </div>

              {showSpellHint && (
                <div className="text-xs text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800">
                  প্রথম কয়েকটি বর্ণ: {spellCurrentWord.german.slice(0, 3)}... ({spellCurrentWord.german.length} টি বর্ণ)
                </div>
              )}

              {/* Spell Result */}
              {spellResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-center justify-between text-sm ${
                    spellResult === 'correct'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {spellResult === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>অসাধারণ! বানান পুরোপুরি সঠিক।</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span>সঠিক বানান: <strong className="underline">{spellCurrentWord.german}</strong></span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={nextSpellWord}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs"
                  >
                    পরবর্তী শব্দ →
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE: GOETHE A1 EXAM BOOSTER */}
        {/* ========================================================================= */}
        {mode === 'goethe_exam' && (
          <div className="space-y-6">
            {/* Exam Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 border-b border-blue-200 dark:border-blue-900">
              <button
                onClick={() => setExamTab('sprechen1')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap ${
                  examTab === 'sprechen1'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Sprechen Teil 1 (আত্মপরিচয়)
              </button>
              <button
                onClick={() => setExamTab('sprechen2')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap ${
                  examTab === 'sprechen2'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Sprechen Teil 2 (প্রশ্ন ও উত্তর)
              </button>
              <button
                onClick={() => setExamTab('sprechen3')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap ${
                  examTab === 'sprechen3'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Sprechen Teil 3 (অনুরোধ / Bitten)
              </button>
              <button
                onClick={() => setExamTab('schreiben')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap ${
                  examTab === 'schreiben'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Schreiben (ফর্ম ও ইমেইল)
              </button>
            </div>

            {/* TAB 1: Sprechen Teil 1 */}
            {examTab === 'sprechen1' && (
              <div className="bg-white dark:bg-[#0f1d40] rounded-2xl p-6 border border-blue-100 dark:border-blue-900/40 shadow-xs space-y-5">
                <div className="border-b border-blue-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Sprechen Teil 1: Sich vorstellen (নিজের পরিচয় দেওয়া)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    গ্যোয়েটে পরীক্ষায় এই ৭টি পয়েন্ট দেখে আপনাকে সুন্দর করে জার্মানিতে কথা বলতে হবে।
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Name (নাম)', de: 'Mein Name ist Talha Belal.', bn: 'আমার নাম তালহা বেলাল।' },
                    { label: 'Alter (বয়স)', de: 'Ich bin 25 Jahre alt.', bn: 'আমার বয়স ২৫ বছর।' },
                    { label: 'Land (দেশ)', de: 'Ich komme aus Bangladesch.', bn: 'আমি বাংলাদেশ থেকে এসেছি।' },
                    { label: 'Wohnort (বাসস্থান)', de: 'Ich wohne in Dhaka / Berlin.', bn: 'আমি ঢাকা / বার্লিনে থাকি।' },
                    { label: 'Sprachen (ভাষা)', de: 'Meine Muttersprache ist Bengali und ich lerne Deutsch.', bn: 'আমার মাতৃভাষা বাংলা এবং আমি জার্মান শিখছি।' },
                    { label: 'Beruf (পেশা)', de: 'Ich bin Software-Entwickler von Beruf.', bn: 'আমি পেশায় সফটওয়্যার ডেভেলপার।' },
                    { label: 'Hobby (শখ)', de: 'Mein Hobby ist Reisen und Musik hören.', bn: 'আমার শখ ভ্রমণ করা এবং গান শোনা।' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-[#0a1533] rounded-xl border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                          {item.label}
                        </span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          {item.de}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.bn}
                        </div>
                      </div>
                      <SpeakerButton text={item.de} size="sm" />
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <strong>পরীক্ষকের ক্রস-প্রশ্ন (Cross questions):</strong>
                  <p>পরীক্ষক আপনাকে নামের বানান করতে বলতে পারেন: <em>&quot;Buchstabieren Sie Ihren Namen bitte!&quot;</em> অথবা ফোন নম্বর বলতে পারেন: <em>&quot;Wie ist Ihre Telefonnummer?&quot;</em></p>
                </div>
              </div>
            )}

            {/* TAB 2: Sprechen Teil 2 */}
            {examTab === 'sprechen2' && (
              <div className="bg-white dark:bg-[#0f1d40] rounded-2xl p-6 border border-blue-100 dark:border-blue-900/40 shadow-xs space-y-5">
                <div className="border-b border-blue-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Sprechen Teil 2: Um Informationen bitten (প্রশ্ন করা ও উত্তর দেওয়া)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    কার্ডে একটি বিষয় (Thema) এবং একটি শব্দ (Wort) থাকে। সেই শব্দ দিয়ে প্রশ্ন তৈরি করতে হবে।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { thema: 'Thema: Essen und Trinken', wort: 'Frühstück', frage: 'Was essen Sie zum Frühstück?', antwort: 'Ich esse Brot und trinke Tee.' },
                    { thema: 'Thema: Einkaufen', wort: 'Preis', frage: 'Wie viel kostet das Buch?', antwort: 'Das Buch kostet zehn Euro.' },
                    { thema: 'Thema: Freizeit', wort: 'Sport', frage: 'Treiben Sie gern Sport?', antwort: 'Ja, ich spiele am Samstag Fußball.' },
                    { thema: 'Thema: Wohnen', wort: 'Balkon', frage: 'Hat Ihre Wohnung einen Balkon?', antwort: 'Ja, meine Wohnung hat einen schönen Balkon.' },
                  ].map((card, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-[#0a1533] rounded-xl border border-blue-100 dark:border-blue-900/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600">{card.thema}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 font-bold text-blue-800 dark:text-blue-300">
                          শব্দ: {card.wort}
                        </span>
                      </div>
                      <div className="pt-1">
                        <div className="text-xs font-semibold text-slate-500">প্রশ্ন (Frage):</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{card.frage}</span>
                          <SpeakerButton text={card.frage} size="sm" />
                        </div>
                      </div>
                      <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                        <div className="text-xs font-semibold text-slate-500">উত্তর (Antwort):</div>
                        <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                          {card.antwort}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Sprechen Teil 3 */}
            {examTab === 'sprechen3' && (
              <div className="bg-white dark:bg-[#0f1d40] rounded-2xl p-6 border border-blue-100 dark:border-blue-900/40 shadow-xs space-y-5">
                <div className="border-b border-blue-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Sprechen Teil 3: Bitten formulieren (অনুরোধ করা ও উত্তর দেওয়া)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    দৈনন্দিন জীবনের ছবি দেখে সহ-পরীক্ষার্থীকে নম্রভাবে কোনো কিছু অনুরোধ করতে হয়।
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { bild: 'ছবি: পানির গ্লাস', bitte: 'Geben Sie mir bitte ein Glas Wasser?', antwort: 'Ja, natürlich! Bitte schön.' },
                    { bild: 'ছবি: কলম', bitte: 'Können Sie mir bitte einen Stift leihen?', antwort: 'Ja, gerne. Hier ist der Stift.' },
                    { bild: 'ছবি: বন্ধ দরজা', bitte: 'Schließen Sie bitte die Tür?', antwort: 'Ja, sofort.' },
                    { bild: 'ছবি: ধূমপান নিষেধ', bitte: 'Rauchen Sie hier bitte nicht!', antwort: 'Entschuldigung, ich wusste das nicht.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 dark:bg-[#0a1533] rounded-xl border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {item.bild}
                        </span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          👉 অনুরোধ: &quot;{item.bitte}&quot;
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          ✓ প্রতিক্রিয়া: &quot;{item.antwort}&quot;
                        </div>
                      </div>
                      <SpeakerButton text={item.bitte} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Schreiben */}
            {examTab === 'schreiben' && (
              <div className="bg-white dark:bg-[#0f1d40] rounded-2xl p-6 border border-blue-100 dark:border-blue-900/40 shadow-xs space-y-5">
                <div className="border-b border-blue-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Schreiben Teil 2: Kurze E-Mail schreiben (মডেল চিঠি)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    আনুমানিক ৩০টি শব্দে আমন্ত্রণ গ্রহণ, ক্ষমা প্রার্থনা অথবা তথ্য জানানোর একটি আদর্শ ইমেইল কাঠামো।
                  </p>
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-[#08122c] rounded-xl border border-blue-200 dark:border-blue-900 space-y-3 text-sm">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    বিষয়: আমন্ত্রণ গ্রহণ ও ধন্যবাদ (Einladung annehmen)
                  </div>
                  <div className="space-y-2 text-slate-800 dark:text-slate-200 leading-relaxed font-mono text-xs sm:text-sm">
                    <p><strong>Liebe Sarah,</strong></p>
                    <p>vielen Dank für die Einladung zu deiner Geburtstagsparty. Ich komme sehr gern! Die Party fängt um 18 Uhr an, richtig? Soll ich einen Kuchen mitbringen?</p>
                    <p>Bis Samstag!</p>
                    <p><strong>Herzliche Grüße,</strong><br />Talha</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0a1533] rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">নম্বর পাওয়ার ৩টি গোল্ডেন রুলস:</h4>
                  <p>১. চিঠির শুরুতে সঠিক সম্বোধন ব্যবহার করুন (বন্ধুদের জন্য: <em>Liebe/Lieber</em>, অফিসিয়াল: <em>Sehr geehrte Damen und Herren</em>)।</p>
                  <p>২. প্রশ্নে থাকা ৩টি লেডপয়েন্ট (Leitpunkte)-এর প্রতিটির জন্য ১টি করে পূর্ণ বাক্য লিখুন।</p>
                  <p>৩. শেষে সমাপ্তিসূচক বাক্য লিখুন (বন্ধুদের জন্য: <em>Viele Grüße</em>, অফিসিয়াল: <em>Mit freundlichen Grüßen</em>)।</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default VocabularyTrainer;
