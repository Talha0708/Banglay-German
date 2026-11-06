'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '../store/useAppStore';
import { TabBar, TabId } from './TabBar';
import { AppHeader } from './AppHeader';
import { SideMenuDrawer } from './SideMenuDrawer';
import { InstallGuideModal } from './InstallGuideModal';
import { BrandFooter } from './BrandFooter';
import { InstallBanner } from './InstallBanner';
import { AdBanner } from './AdBanner';
import { SentenceOfTheDay } from './SentenceOfTheDay';
import { WordBankView } from './WordBankView';
import { PatternPractice } from './PatternPractice';
import { LessonView } from './LessonView';
import { SRSReviewModal } from './SRSReviewModal';
import { VocabularyTrainer } from './VocabularyTrainer';
import { DailySentencesView } from './DailySentencesView';
import { DAILY_SENTENCES } from '../data/daily-sentences';
import {
  UNITS,
  ALL_LESSONS,
  getLessonById,
  isLessonUnlocked,
} from '../data/curriculum';
import { ALL_WORDS } from '../data/vocabulary';
import {
  BookOpen,
  CheckCircle,
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Moon,
  Sun,
  Gauge,
  Languages,
  Info,
  ChevronRight,
  Flame,
  Award,
  GraduationCap,
  MessageSquareQuote,
} from 'lucide-react';

export default function HomeClient() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showSRSModal, setShowSRSModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [showInstallGuideModal, setShowInstallGuideModal] = useState(false);
  const [practiceSection, setPracticeSection] = useState<'trainer' | 'sentences' | 'srs' | 'words' | 'patterns'>('trainer');

  const {
    completedLessons,
    knownWords,
    srsCards,
    settings,
    updateSettings,
    resetProgress,
    getDueCardsCount,
  } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (settings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings.darkMode]);

  const dueCount = mounted ? getDueCardsCount() : 0;
  const knownCount = mounted ? Object.values(knownWords).filter(Boolean).length : 0;
  const completedCount = mounted ? completedLessons.length : 0;
  const progressPercent = mounted ? Math.round((completedCount / ALL_LESSONS.length) * 100) : 0;

  // Find the next active lesson to continue
  const nextLesson = mounted
    ? (ALL_LESSONS.find(
        (l) => !completedLessons.includes(l.id) && isLessonUnlocked(l.id, completedLessons)
      ) || ALL_LESSONS[0])
    : ALL_LESSONS[0];

  const currentLessonData = activeLessonId ? getLessonById(activeLessonId) : null;

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-28"
    >
      <AppHeader
        onOpenMenu={() => setShowMenuDrawer(true)}
        onOpenInstallGuide={() => setShowInstallGuideModal(true)}
        progressPercent={progressPercent}
      />
      <InstallBanner />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-8 space-y-5">
        {/* ========================================================= */}
        {/* TAB 1: HOME */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Header / Greeting */}
            <header className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                  বাংলায় জার্মান (CEFR A1)
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Hallo! শুভ দিন 👋
                </h1>
              </div>

              {/* Course Progress Mini Badge */}
              <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-3 py-1.5 rounded-2xl shadow-sm">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-black text-blue-700 dark:text-blue-300">
                  {progressPercent}%
                </span>
              </div>
            </header>

            {/* "Continue Learning" Card - Crisp White Card with German Tricolor Accent */}
            {nextLesson && (
              <div className="rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm relative overflow-hidden space-y-4">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 via-rose-600 to-amber-400" />
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold pt-0.5">
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                    পরবর্তী পাঠ (Continue Learning)
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                    পাঠ {completedCount + 1} / {ALL_LESSONS.length}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {nextLesson.subtitle_de}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                    {nextLesson.title_bn}
                  </h3>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveLessonId(nextLesson.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black py-3 px-4 rounded-2xl shadow-sm transition flex items-center justify-center gap-2 min-h-[48px] text-sm"
                >
                  <span>শেখা শুরু করুন</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}

            {/* Goethe A1 1,485+ Vocab Trainer Spotlight Card - White background with Royal Blue Accents */}
            <div
              onClick={() => {
                setActiveTab('practice');
                setPracticeSection('trainer');
              }}
              className="rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm relative overflow-hidden space-y-3 cursor-pointer group active:scale-98 transition hover:border-blue-400 dark:hover:border-blue-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Goethe-Institut A1
                </span>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full">
                  ১,৪৮৫টি সম্পূর্ণ শব্দ
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  ১৪০০+ শব্দ অনুশীলন কেন্দ্র
                  <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  আর্টিকেল ড্রিল, ফ্ল্যাশকার্ড, কুইজ, বানান এবং গ্যোটে A1 স্পিকিং-রাইটিং প্র্যাকটিস
                </p>
              </div>

              <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">আর্টিকেল</span>
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400">Der/Die/Das</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">স্মৃতিশক্তি</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white">ফ্ল্যাশকার্ড</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">টেস্ট</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white">কুইজ</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">পরীক্ষা</span>
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400">A1 এক্সাম</span>
                </div>
              </div>
            </div>

            {/* 200+ Daily Sentences Spotlight Card */}
            <div
              onClick={() => {
                setActiveTab('practice');
                setPracticeSection('sentences');
              }}
              className="rounded-3xl p-5 bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-900 dark:to-blue-950/20 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm relative overflow-hidden space-y-3 cursor-pointer group active:scale-98 transition hover:border-blue-400 dark:hover:border-blue-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> দৈনন্দিন ব্যবহার
                </span>
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2 py-0.5 rounded-full">
                  {DAILY_SENTENCES.length}টি বাস্তব বাক্য
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  দৈনিক প্রয়োজনীয় ২০০+ বাক্য
                  <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  রেস্তোরাঁ, কেনাকাটা, রাস্তাঘাট, ভ্রমণ, ডাক্তার ও জরুরি অবস্থার বাস্তব বাক্য, বাংলা উচ্চারণ ও অডিও
                </p>
              </div>

              <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">রেস্তোরাঁ</span>
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400">খাবার অর্ডার</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">কেনাকাটা</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white">সুপারমার্কেট</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">যাতায়াত</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white">বাস ও ট্রেন</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">চিকিৎসা</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">ডাক্তার</span>
                </div>
              </div>
            </div>

            {/* App Download & Install Guide Banner on Home */}
            <div
              onClick={() => setShowInstallGuideModal(true)}
              className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 border border-blue-200/60 dark:border-blue-800/60">
                  <ArrowRight className="w-5 h-5 -rotate-45 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    অ্যাপ ইনস্টল ও সহজ ব্যবহারের নির্দেশিকা
                    <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      PWA
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Android ও iPhone-এ কীভাবে ইনস্টল করবেন সহজ ধাপসমূহ
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* "Review Today" Card (SRS) with due-card count */}
            <div
              onClick={() => setShowSRSModal(true)}
              className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0 border border-amber-200/60 dark:border-amber-800/60">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    আজকের রিভিশন (Review Today)
                    {dueCount > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {dueCount}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {dueCount > 0
                      ? `${dueCount}টি কার্ড আজ রিভিশনের জন্য প্রস্তুত`
                      : 'আজকের সব রিভিশন শেষ! এখনই কার্ড ঝালাই করতে পারেন'}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Sentence of the Day */}
            <SentenceOfTheDay />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  সম্পন্ন পাঠ
                </span>
                <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                  {completedCount}
                </span>
                <span className="text-[10px] text-slate-400 block">/ {ALL_LESSONS.length}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  জানা শব্দ
                </span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {knownCount}
                </span>
                <span className="text-[10px] text-slate-400 block">/ {ALL_WORDS.length}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  SRS কার্ড
                </span>
                <span className="text-lg font-black text-amber-500">
                  {mounted ? Object.keys(srsCards).length : 0}
                </span>
                <span className="text-[10px] text-slate-400 block">ডেকের আকার</span>
              </div>
            </div>

            {/* Advertisement Placement */}
            <AdBanner slot="300x250" />

            {/* Footer */}
            <BrandFooter className="pt-2" />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: LEARN (Vertical Unit Path Map) */}
        {/* ========================================================= */}
        {activeTab === 'learn' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <header>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                ধারাবাহিক পাঠ্যক্রম (Curriculum Path)
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                বর্ণমালা থেকে সম্পূর্ণ A1
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                প্রতিটি পাঠ সম্পন্ন করলে পরবর্তী পাঠ উন্মুক্ত হবে
              </p>
            </header>

            {/* Featured Sentence Lesson Banner in Curriculum */}
            <div
              onClick={() => {
                setActiveTab('practice');
                setPracticeSection('sentences');
              }}
              className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md relative overflow-hidden cursor-pointer group active:scale-98 transition hover:shadow-lg space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-amber-300" /> বিশেষ ব্যবহারিক পাঠ
                </span>
                <span className="text-[11px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  {DAILY_SENTENCES.length}টি বাক্য
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  দৈনিক প্রয়োজনীয় ২০০+ বাক্য পাঠ
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-white/90 leading-relaxed mt-0.5">
                  রেস্তোরাঁ, কেনাকাটা, ভ্রমণ, ডাক্তার ও জরুরি অবস্থার বাস্তব বাক্য, স্পষ্ট জার্মান উচ্চারণ ও বাংলা অর্থ
                </p>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs font-bold text-white/90">
                <span>১১টি বাস্তব লাইফ ক্যাটাগরি</span>
                <span className="underline underline-offset-2 flex items-center gap-1 text-white">
                  এখনই শুরু করুন <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Units & Lessons Timeline */}
            <div className="space-y-8">
              {UNITS.map((unit) => (
                <div key={unit.id} className="space-y-3">
                  {/* Unit Banner */}
                  <div
                    className="p-4 rounded-2xl text-white shadow-md relative overflow-hidden"
                    style={{ backgroundColor: unit.color }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-md inline-block mb-1">
                      {unit.level === '0' ? 'লেভেল ০' : `ইউনিট ${unit.level}`}
                    </span>
                    <h3 className="text-base font-black text-white">
                      {unit.title_bn}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 font-medium">
                      {unit.description_bn}
                    </p>
                  </div>

                  {/* Lessons in Unit (Vertical Path) */}
                  <div className="space-y-2 pl-2 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
                    {unit.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isUnlocked = isLessonUnlocked(lesson.id, completedLessons);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            if (isUnlocked) {
                              setActiveLessonId(lesson.id);
                            }
                          }}
                          className={`relative p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 -ml-[19px] ${
                            isCompleted
                              ? 'bg-white dark:bg-slate-900 border-emerald-500/40 shadow-sm cursor-pointer hover:border-emerald-500'
                              : isUnlocked
                              ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-md ring-2 ring-blue-400/20 cursor-pointer'
                              : 'bg-slate-100/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Icon status */}
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isCompleted
                                  ? 'bg-emerald-500 text-white'
                                  : isUnlocked
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                              ) : isUnlocked ? (
                                <BookOpen className="w-5 h-5 stroke-[2]" />
                              ) : (
                                <Lock className="w-4 h-4" />
                              )}
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block uppercase">
                                {lesson.subtitle_de}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                {lesson.title_bn}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {lesson.vocabulary.length} শব্দ · {lesson.exercises.length} অনুশীলন
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 text-slate-400">
                            {isUnlocked && <ChevronRight className="w-4 h-4" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Advertisement Placement */}
            <AdBanner slot="300x250" />

            <BrandFooter className="pt-2" />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PRACTICE */}
        {/* ========================================================= */}
        {activeTab === 'practice' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <header>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                অনুশীলন কেন্দ্র (Practice Hub)
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Goethe A1 দক্ষতা বৃদ্ধি করুন
              </h2>
            </header>

            {/* Segmented Navigation with Horizontal Scroll Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPracticeSection('trainer')}
                className={`py-2 px-3 rounded-xl transition whitespace-nowrap min-h-[40px] flex items-center justify-center gap-1.5 shrink-0 ${
                  practiceSection === 'trainer'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>১৪০০+ ড্রিল</span>
              </button>

              <button
                type="button"
                onClick={() => setPracticeSection('sentences')}
                className={`py-2 px-3 rounded-xl transition whitespace-nowrap min-h-[40px] flex items-center justify-center gap-1.5 shrink-0 ${
                  practiceSection === 'sentences'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-400" />
                <span>২০০+ বাক্য</span>
                <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-black">
                  ২২০
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPracticeSection('patterns')}
                className={`py-2 px-3 rounded-xl transition whitespace-nowrap min-h-[40px] shrink-0 ${
                  practiceSection === 'patterns'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                বাক্য তৈরি
              </button>

              <button
                type="button"
                onClick={() => setPracticeSection('srs')}
                className={`py-2 px-3 rounded-xl transition whitespace-nowrap min-h-[40px] flex items-center justify-center gap-1 shrink-0 ${
                  practiceSection === 'srs'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>SRS রিভিউ</span>
                {dueCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                    {dueCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setPracticeSection('words')}
                className={`py-2 px-3 rounded-xl transition whitespace-nowrap min-h-[40px] shrink-0 ${
                  practiceSection === 'words'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                শব্দকোষ ({ALL_WORDS.length})
              </button>
            </div>

            {/* Sub-view: 1200+ Goethe Vocabulary Trainer */}
            {practiceSection === 'trainer' && <VocabularyTrainer />}

            {/* Sub-view: 200+ Daily Usage Sentences */}
            {practiceSection === 'sentences' && <DailySentencesView />}

            {/* Sub-view: Word Bank */}
            {practiceSection === 'words' && <WordBankView />}

            {/* Sub-view: SRS */}
            {practiceSection === 'srs' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-lg space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded inline-block">
                    SM-2 অ্যালগরিদম
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    দৈনিক স্পেসড রিপিটেশন
                  </h3>
                  <p className="text-xs text-blue-100/90 leading-relaxed">
                    স্মৃতিশক্তি ধরে রাখার বৈজ্ঞানিক পদ্ধতিতে প্রতিদিন নির্দিষ্ট কার্ডগুলো ঝালাই করুন।
                  </p>

                  <div className="pt-1 flex items-center justify-between text-xs font-semibold">
                    <span>আজকের বাকি কার্ড:</span>
                    <span className="text-base font-black bg-black/20 px-2.5 py-0.5 rounded-lg text-amber-300">
                      {dueCount}টি
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSRSModal(true)}
                    className="w-full bg-white text-blue-950 font-black py-3 px-4 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2 min-h-[48px] text-sm mt-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>রিভিউ শুরু করুন</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    SM-2 রিপিটেশন কীভাবে কাজ করে?
                  </h4>
                  <p>
                    যে শব্দগুলো আপনি সহজে মনে রাখতে পারবেন, সেগুলো বেশি ব্যবধানে আসবে। আর যেগুলোতে ভুল হবে, সেগুলো শীঘ্রই আবার আসবে যাতে পুরোপুরি মুখস্থ থাকে।
                  </p>
                </div>
              </div>
            )}

            {/* Sub-view: Patterns */}
            {practiceSection === 'patterns' && <PatternPractice />}

            {/* Advertisement Placement */}
            <AdBanner slot="300x250" />

            <BrandFooter className="pt-2" />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <header>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                পছন্দসমূহ (Preferences)
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                অ্যাপ সেটিংস
              </h2>
            </header>

            {/* Settings Card List */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden">
              {/* 1. Dark Mode Toggle */}
              <div className="p-4 flex items-center justify-between min-h-[56px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">ডার্ক মোড (Dark Mode)</p>
                    <p className="text-[11px] text-slate-500">রাতের আলোর জন্য সুবিধাজনক</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                  aria-label="ডার্ক মোড টগল করুন"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 2. Speech Speed (Normal vs Slow) */}
              <div className="p-4 flex items-center justify-between min-h-[56px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">উচ্চারণের গতি (Speech Speed)</p>
                    <p className="text-[11px] text-slate-500">জার্মান অডিও কত দ্রুত বাজবে</p>
                  </div>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => updateSettings({ speechSpeed: 'normal' })}
                    className={`px-2.5 py-1 rounded-md transition ${
                      settings.speechSpeed === 'normal'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    স্বাভাবিক
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSettings({ speechSpeed: 'slow' })}
                    className={`px-2.5 py-1 rounded-md transition ${
                      settings.speechSpeed === 'slow'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    ধীর
                  </button>
                </div>
              </div>

              {/* 3. Explanation Language (Bengali / English) */}
              <div className="p-4 flex items-center justify-between min-h-[56px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">ব্যাখ্যার ভাষা (Language)</p>
                    <p className="text-[11px] text-slate-500">ব্যাকরণ ও নির্দেশের ভাষা</p>
                  </div>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => updateSettings({ explanationLang: 'bn' })}
                    className={`px-2.5 py-1 rounded-md transition ${
                      settings.explanationLang === 'bn'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSettings({ explanationLang: 'en' })}
                    className={`px-2.5 py-1 rounded-md transition ${
                      settings.explanationLang === 'en'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* 4. Full-width About row (Navigates to /about) */}
              <Link
                href="/about"
                className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[56px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      অ্যাপ সম্পর্কে (About)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      প্রতিষ্ঠাতা, লক্ষ্য ও বিস্তারিত বিবরণ
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Reset Progress Action */}
            <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 space-y-2">
              <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300">
                অগ্রগতি রিসেট করুন (Reset Data)
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                আপনার সম্পন্ন করা সব লেসন ও কার্ডের অগ্রগতি মুছে প্রথম থেকে শুরু হবে।
              </p>
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="mt-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 min-h-[36px]"
              >
                <RotateCcw className="w-3.5 h-3.5" /> সব অগ্রগতি মুছে ফেলুন
              </button>
            </div>

            {/* Advertisement Placement */}
            <AdBanner slot="300x250" />

            <BrandFooter className="pt-2" />
          </div>
        )}
      </main>

      {/* Bottom Tab Bar (4 tabs, with 3-line hamburger menu on the right) */}
      <TabBar
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenMenu={() => setShowMenuDrawer(true)}
        dueCardsCount={dueCount}
      />

      {/* Side Menu Drawer (Right slide-over) */}
      <SideMenuDrawer
        isOpen={showMenuDrawer}
        onClose={() => setShowMenuDrawer(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenPracticeSection={(sec) => {
          setActiveTab('practice');
          setPracticeSection(sec);
        }}
        onOpenInstallGuide={() => setShowInstallGuideModal(true)}
        onOpenSRSModal={() => setShowSRSModal(true)}
        dueCount={dueCount}
        completedLessonsCount={completedCount}
        totalLessonsCount={ALL_LESSONS.length}
      />

      {/* Install & Download Guide Modal */}
      <InstallGuideModal
        isOpen={showInstallGuideModal}
        onClose={() => setShowInstallGuideModal(false)}
      />

      {/* Active Lesson Modal / Screen */}
      {currentLessonData && (
        <LessonView
          lesson={currentLessonData}
          onClose={() => setActiveLessonId(null)}
          onSelectLesson={(newId) => setActiveLessonId(newId)}
        />
      )}

      {/* SRS Review Modal */}
      {showSRSModal && (
        <SRSReviewModal onClose={() => setShowSRSModal(false)} />
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-xs rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 mx-auto flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              আপনি কি নিশ্চিত?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              আপনার সমস্ত লেসন সমাপ্তি এবং ফ্ল্যাশকার্ডের ইতিহাস মুছে যাবে। এটি আর ফিরিয়ে আনা যাবে না।
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200 font-semibold text-xs min-h-[44px]"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md min-h-[44px]"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
