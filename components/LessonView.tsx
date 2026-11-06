'use client';

import React, { useState } from 'react';
import { Lesson } from '../types/curriculum';
import { WordCard } from './WordCard';
import { SpeakerButton } from './SpeakerButton';
import { ExerciseRunner } from './exercises/ExerciseRunner';
import { LessonSummary } from './LessonSummary';
import { AdBanner } from './AdBanner';
import { useAppStore } from '../store/useAppStore';
import { getNextLesson, getUnitTopics } from '../data/curriculum';
import { getWordsByTopic, TOPIC_METADATA } from '../data/vocabulary';
import { Word } from '../types/vocabulary';
import { AlphabetStudio } from './AlphabetStudio';
import { NumbersStudio } from './NumbersStudio';
import { TimeColorsStudio } from './TimeColorsStudio';
import { ArrowLeft, BookOpen, Dumbbell, Lightbulb, Play, Sparkles, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onClose,
  onSelectLesson,
}) => {
  const [stage, setStage] = useState<'learn' | 'exercises' | 'summary'>('learn');
  const [showUnitVocab, setShowUnitVocab] = useState(false);
  const [exerciseResult, setExerciseResult] = useState<{ score: number; total: number }>({
    score: 0,
    total: 0,
  });

  // Pull words from the unit's corresponding topics in the 1400+ vocabulary pool
  const unitWords = React.useMemo(() => {
    const topics = getUnitTopics(lesson.unitId);
    const pool: Word[] = [];
    const lessonVocabIds = new Set(lesson.vocabulary.map((w) => w.id));
    for (const t of topics) {
      const words = getWordsByTopic(t);
      for (const w of words) {
        if (!lessonVocabIds.has(w.id)) {
          pool.push(w);
        }
      }
    }
    return pool;
  }, [lesson]);

  const completeLesson = useAppStore((state) => state.completeLesson);

  const handleExercisesComplete = (score: number, total: number) => {
    setExerciseResult({ score, total });
    // Enroll lesson vocab and sentences in SRS
    const sentences = lesson.content.examples.map((ex) => ({ de: ex.de, bn: ex.bn }));
    completeLesson(lesson.id, lesson.vocabulary, sentences);
    setStage('summary');
  };

  const handleContinueNext = () => {
    const next = getNextLesson(lesson.id);
    if (next) {
      onSelectLesson(next.id);
      setStage('learn');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-y-auto">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরে যান</span>
        </button>

        <div className="text-center flex-1 mx-2 truncate">
          <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {lesson.subtitle_de}
          </p>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {lesson.title_bn}
          </h2>
        </div>

        {/* Stage Pills */}
        <div className="flex items-center gap-1 text-[11px]">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              stage === 'learn'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                : 'text-slate-400'
            }`}
          >
            পাঠ
          </span>
          <span className="text-slate-300">/</span>
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              stage === 'exercises'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                : 'text-slate-400'
            }`}
          >
            অনুশীলন
          </span>
        </div>
      </header>

      {/* STAGE 1: LEARN (Explanation, Key Vocab, Grammar Tip) */}
      {stage === 'learn' && (
        <div className="flex-1 max-w-lg mx-auto w-full p-4 space-y-6 pb-24">
          {/* (1) Short Bengali Explanation with Examples */}
          <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>সহজ বাংলায় ব্যাখ্যা (Lesson Intro)</span>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
              {lesson.content.intro_bn}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                বাস্তব উদাহরণ (Examples)
              </h4>
              <div className="space-y-2">
                {lesson.content.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start justify-between gap-2"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {ex.de}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        {ex.bn}
                      </p>
                      {ex.note && (
                        <p className="text-[11px] text-blue-600 dark:text-blue-400 italic mt-0.5">
                          • {ex.note}
                        </p>
                      )}
                    </div>
                    <SpeakerButton text={ex.de} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Specialized Interactive Studio for Foundation Lessons */}
          {lesson.id === 'lesson_0_1' && <AlphabetStudio />}
          {lesson.id === 'lesson_0_4' && <NumbersStudio />}
          {lesson.id === 'lesson_0_5' && <TimeColorsStudio />}

          {/* (2) 8-25+ Key Vocabulary */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                মূল শব্দভান্ডার ({lesson.vocabulary.length}টি পাঠের শব্দ)
              </h3>
              <span className="text-xs text-slate-400">উচ্চারণ ও অর্থ</span>
            </div>

            <div className="space-y-2.5">
              {lesson.vocabulary.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>

            {/* Extended 1400+ Unit Vocabulary Pool */}
            {unitWords.length > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowUnitVocab(!showUnitVocab)}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-between gap-2 text-left transition hover:border-blue-400 active:scale-98"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        এই ইউনিটের আরও {unitWords.length}টি গুরুত্বপূর্ণ শব্দ
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                          ১৪০০+ কালেকশন
                        </span>
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        সম্পর্কিত টপিকের সব প্রয়োজনীয় ভোকাবুলারি দেখুন ও শুনুন
                      </p>
                    </div>
                  </div>
                  {showUnitVocab ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                </button>

                {showUnitVocab && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        সম্পূর্ণ শব্দতালিকা ({unitWords.length}টি শব্দ)
                      </span>
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                        Goethe A1 মানসম্মত
                      </span>
                    </div>

                    <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                      {unitWords.map((word) => (
                        <WordCard key={word.id} word={word} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* (3) Grammar Tip Box */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>ব্যাকরণ টিপস: {lesson.grammarTip.title_bn}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
              {lesson.grammarTip.content_bn}
            </p>

            {lesson.grammarTip.rule_table && (
              <div className="pt-2">
                <div className="overflow-hidden rounded-xl border border-amber-200/80 dark:border-amber-800/80 bg-white/80 dark:bg-slate-900/80">
                  <table className="w-full text-left text-xs">
                    <tbody className="divide-y divide-amber-100 dark:divide-amber-900/40">
                      {lesson.grammarTip.rule_table.map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/50">
                          <td className="p-2 font-bold text-slate-800 dark:text-slate-200">
                            {row.label}
                          </td>
                          <td className="p-2 font-semibold text-blue-700 dark:text-blue-300">
                            {row.value}
                          </td>
                          <td className="p-2 text-slate-500 dark:text-slate-400">
                            {row.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* User-friendly Advertisement */}
          <AdBanner slot="300x250" />

          {/* Button to start exercises */}
          <div className="sticky bottom-4 pt-2">
            <button
              type="button"
              onClick={() => setStage('exercises')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl transition active:scale-98 flex items-center justify-center gap-2 min-h-[50px]"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>অনুশীলন শুরু করুন ({lesson.exercises.length}টি প্রশ্ন)</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: EXERCISES (8-12 Mixed Exercises) */}
      {stage === 'exercises' && (
        <div className="flex-1">
          <ExerciseRunner
            exercises={lesson.exercises}
            onComplete={handleExercisesComplete}
            onExit={() => setStage('learn')}
          />
        </div>
      )}

      {/* STAGE 3: SUMMARY WITH CONFETTI */}
      {stage === 'summary' && (
        <div className="flex-1 flex items-center justify-center">
          <LessonSummary
            lesson={lesson}
            score={exerciseResult.score}
            total={exerciseResult.total}
            onContinue={handleContinueNext}
            onRetry={() => setStage('exercises')}
          />
        </div>
      )}
    </div>
  );
};
