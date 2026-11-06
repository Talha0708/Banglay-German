'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  DAILY_SENTENCES,
  SENTENCE_CATEGORIES,
  DailySentence,
  searchDailySentences,
} from '../data/daily-sentences';
import { speakGerman } from '../lib/speech';
import { useAppStore } from '../store/useAppStore';
import { createInitialCard } from '../lib/srs';
import { AdBanner } from './AdBanner';
import {
  Volume2,
  Search,
  Sparkles,
  BookOpen,
  Layers,
  Check,
  Plus,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Info,
  Flame,
  Award,
} from 'lucide-react';

interface DailySentencesViewProps {
  initialCategoryId?: string;
}

export const DailySentencesView: React.FC<DailySentencesViewProps> = ({
  initialCategoryId = 'all',
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);
  const [isContinuousPlaying, setIsContinuousPlaying] = useState(false);
  const continuousIndexRef = useRef(0);
  const continuousTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { srsCards, addWordToSRS } = useAppStore();

  // Filtered sentences
  const filteredSentences = useMemo(() => {
    return searchDailySentences(searchQuery, activeCategoryId);
  }, [searchQuery, activeCategoryId]);

  // Safe flashcard index
  const safeFlashcardIndex = flashcardIndex < filteredSentences.length ? flashcardIndex : 0;
  const currentFlashcard = filteredSentences[safeFlashcardIndex] || filteredSentences[0];

  const handleCategorySelect = (catId: string) => {
    setActiveCategoryId(catId);
    setFlashcardIndex(0);
    setIsFlashcardFlipped(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFlashcardIndex(0);
    setIsFlashcardFlipped(false);
  };

  // Audio Playback
  const handlePlayAudio = async (sentence: DailySentence, rate: 'normal' | 'slow' = 'normal') => {
    setPlayingSentenceId(sentence.id);
    await speakGerman(sentence.de, {
      rate,
      onEnd: () => setPlayingSentenceId(null),
      onError: () => setPlayingSentenceId(null),
    });
  };

  // Add sentence to SRS deck
  const handleAddToSRS = (sentence: DailySentence) => {
    const cardId = `ds_${sentence.id}`;
    if (srsCards[cardId]) return;

    useAppStore.setState((state) => ({
      srsCards: {
        ...state.srsCards,
        [cardId]: createInitialCard({
          id: cardId,
          type: 'sentence',
          front: sentence.de,
          back: sentence.bn,
          pronunciationBn: sentence.pronunciation_bn,
          example_de: sentence.de,
          example_bn: sentence.bn,
        }),
      },
    }));
  };

  // Continuous Playback
  const stopContinuousPlay = () => {
    setIsContinuousPlaying(false);
    if (continuousTimerRef.current) {
      clearTimeout(continuousTimerRef.current);
    }
  };

  const startContinuousPlay = () => {
    if (filteredSentences.length === 0) return;
    setIsContinuousPlaying(true);
    continuousIndexRef.current = 0;
    playNextContinuous();
  };

  const playNextContinuous = () => {
    if (continuousIndexRef.current >= filteredSentences.length) {
      setIsContinuousPlaying(false);
      return;
    }

    const item = filteredSentences[continuousIndexRef.current];
    setPlayingSentenceId(item.id);

    speakGerman(item.de, {
      rate: 'normal',
      onEnd: () => {
        setPlayingSentenceId(null);
        continuousIndexRef.current += 1;
        continuousTimerRef.current = setTimeout(() => {
          playNextContinuous();
        }, 1800); // 1.8s pause between sentences
      },
      onError: () => {
        setPlayingSentenceId(null);
        setIsContinuousPlaying(false);
      },
    });
  };

  useEffect(() => {
    return () => {
      if (continuousTimerRef.current) {
        clearTimeout(continuousTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Banner & Mode Toggle */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 text-white shadow-md relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 text-white">
            <Sparkles className="w-3 h-3 text-amber-300" />
            CEFR A1 মাস্টার কোর্স
          </span>
          <span className="text-[11px] font-bold bg-amber-400 text-blue-950 px-2.5 py-0.5 rounded-full shadow-xs">
            {DAILY_SENTENCES.length}টি প্রয়োজনীয় বাক্য
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            দৈনিক ব্যবহারের ২০০+ বাক্য
          </h2>
          <p className="text-xs text-blue-100/90 mt-1 leading-relaxed">
            জার্মানিতে বাস্তব জীবনের কথোপকথন, রেস্তোরাঁ, কেনাকাটা ও ডাক্তার সাক্ষাতের জন্য সম্পূর্ণ বাক্য ও উচ্চারণ
          </p>
        </div>

        {/* View Mode Switcher + Continuous Audio Button */}
        <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
          {/* Segmented Mode Button */}
          <div className="flex bg-black/25 p-1 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                stopContinuousPlay();
                setViewMode('list');
              }}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-white text-blue-900 shadow-xs font-black'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>তালিকা ভিউ</span>
            </button>
            <button
              type="button"
              onClick={() => {
                stopContinuousPlay();
                setViewMode('flashcard');
              }}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                viewMode === 'flashcard'
                  ? 'bg-white text-blue-900 shadow-xs font-black'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ফ্ল্যাশকার্ড ড্রিল</span>
            </button>
          </div>

          {/* Continuous Audio Listen All */}
          <button
            type="button"
            onClick={isContinuousPlaying ? stopContinuousPlay : startContinuousPlay}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95 ${
              isContinuousPlaying
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs'
            }`}
          >
            {isContinuousPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>থামান</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>একটানা শুনুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="বাক্য, বাংলা অর্থ বা উচ্চারণ দিয়ে খুঁজুন..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => handleSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ক্লিয়ার
          </button>
        )}
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => handleCategorySelect('all')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 shrink-0 flex items-center gap-1.5 ${
            activeCategoryId === 'all'
              ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/30'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <span>সব বাক্য</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              activeCategoryId === 'all'
                ? 'bg-white/25 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}
          >
            {DAILY_SENTENCES.length}
          </span>
        </button>

        {SENTENCE_CATEGORIES.map((cat) => {
          const isSelected = activeCategoryId === cat.id;
          const count = DAILY_SENTENCES.filter((s) => s.category_id === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span>{cat.name_bn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isSelected
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result Count Indicator */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
        <span>
          পাওয়া গেছে <strong>{filteredSentences.length}</strong>টি বাক্য
        </span>
        {searchQuery && (
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            ফিল্টার: &quot;{searchQuery}&quot;
          </span>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODE 1: LIST VIEW */}
      {/* ========================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredSentences.map((sentence, idx) => {
            const isPlaying = playingSentenceId === sentence.id;
            const isSavedToSRS = !!srsCards[`ds_${sentence.id}`];

            return (
              <div
                key={sentence.id}
                className={`p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-150 shadow-xs space-y-3 ${
                  isPlaying
                    ? 'border-blue-500 ring-2 ring-blue-400/30 bg-blue-50/20 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Card Top Strip: Category Badge + SRS Bookmark */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 px-2 py-0.5 rounded-full">
                    {sentence.category_bn}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Add to Daily SRS Review */}
                    <button
                      type="button"
                      onClick={() => handleAddToSRS(sentence)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-xl transition flex items-center gap-1 ${
                        isSavedToSRS
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                      title={isSavedToSRS ? 'SRS ডেকের সাথে যুক্ত আছে' : 'দৈনিক রিভিশনে যোগ করুন'}
                    >
                      {isSavedToSRS ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>সংরক্ষিত</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>SRS কার্ড</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* German Sentence with Large Crisp Typography */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                    {sentence.de}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    উচ্চারণ: {sentence.pronunciation_bn}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {sentence.bn}
                  </p>
                </div>

                {/* Grammatical or Context Note Pill */}
                {sentence.note_bn && (
                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{sentence.note_bn}</span>
                  </div>
                )}

                {/* Bottom Audio Action Buttons */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-400">
                    বাক্য #{idx + 1}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Slow Audio Button */}
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(sentence, 'slow')}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1 active:scale-95 min-h-[36px]"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>ধীরগতি</span>
                    </button>

                    {/* Standard Speed Play Audio Button */}
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(sentence, 'normal')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 active:scale-95 min-h-[36px] ${
                        isPlaying
                          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                          : 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlaying ? 'বাজছে...' : 'উচ্চারণ'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Advertisement in Sentences List */}
          <AdBanner slot="300x250" />
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: INTERACTIVE FLASHCARD DRILL */}
      {/* ========================================================= */}
      {viewMode === 'flashcard' && currentFlashcard && (
        <div className="space-y-4">
          {/* Card Counter & Shuffle */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>
              কার্ড {flashcardIndex + 1} / {filteredSentences.length}
            </span>
            <button
              type="button"
              onClick={() => {
                const rand = Math.floor(Math.random() * filteredSentences.length);
                setFlashcardIndex(rand);
                setIsFlashcardFlipped(false);
              }}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>র‍্যান্ডম কার্ড</span>
            </button>
          </div>

          {/* Large Flashcard Board */}
          <div
            onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
            className="cursor-pointer min-h-[260px] p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between text-center relative"
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                {currentFlashcard.category_bn}
              </span>
              <span className="text-slate-400 font-medium">ট্যাপ করে উল্টান</span>
            </div>

            {/* Front vs Back Content */}
            <div className="my-auto py-4 space-y-2">
              {!isFlashcardFlipped ? (
                <>
                  <span className="text-xs text-slate-400 font-medium block">জার্মান বাক্য</span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                    {currentFlashcard.de}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    উচ্চারণ: {currentFlashcard.pronunciation_bn}
                  </p>
                </>
              ) : (
                <div className="animate-in fade-in duration-150 space-y-2">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                    বাংলা অনুবাদ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                    {currentFlashcard.bn}
                  </h3>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 max-w-sm mx-auto">
                    {currentFlashcard.note_bn}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayAudio(currentFlashcard);
                }}
                className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>উচ্চারণ শুনুন</span>
              </button>
            </div>
          </div>

          {/* Flashcard Nav Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={flashcardIndex === 0}
              onClick={() => {
                setFlashcardIndex((prev) => Math.max(0, prev - 1));
                setIsFlashcardFlipped(false);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-40 flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>পূর্ববর্তী</span>
            </button>

            <button
              type="button"
              disabled={flashcardIndex >= filteredSentences.length - 1}
              onClick={() => {
                setFlashcardIndex((prev) => Math.min(filteredSentences.length - 1, prev + 1));
                setIsFlashcardFlipped(false);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-40 flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span>পরবর্তী</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Advertisement in Flashcard Mode */}
          <AdBanner slot="300x250" />
        </div>
      )}
    </div>
  );
};
