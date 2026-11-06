'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Lesson } from '../types/curriculum';
import { AdBanner } from './AdBanner';

interface LessonSummaryProps {
  lesson: Lesson;
  score: number;
  total: number;
  onContinue: () => void;
  onRetry: () => void;
}

export const LessonSummary: React.FC<LessonSummaryProps> = ({
  lesson,
  score,
  total,
  onContinue,
  onRetry,
}) => {
  useEffect(() => {
    // Fire confetti on lesson complete celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0f766e', '#14b8a6', '#f59e0b', '#3b82f6', '#ec4899'],
      });
    } catch (e) {
      console.warn('Confetti launch error:', e);
    }
  }, []);

  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 text-center max-w-sm mx-auto space-y-6 animate-in zoom-in-95 duration-300">
      {/* Trophy Badge */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-xl ring-8 ring-amber-100 dark:ring-amber-950/40">
          <Trophy className="w-12 h-12 text-amber-900" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
          <CheckCircle className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          পাঠ সম্পন্ন! (Lesson Complete)
        </span>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          অভিনন্দন!
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          আপনি সফলভাবে &quot;{lesson.title_bn}&quot; সম্পন্ন করেছেন।
        </p>
      </div>

      {/* Stats Cards */}
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">সঠিকতা</span>
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {percentage}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {score}/{total} সঠিক
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">নতুন শব্দ</span>
          <span className="text-xl font-black text-blue-600 dark:text-blue-400">
            +{lesson.vocabulary.length}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            SRS কার্ডে যুক্ত
          </span>
        </div>
      </div>

      {/* User-friendly Advertisement */}
      <AdBanner slot="300x250" />

      {/* Actions */}
      <div className="w-full space-y-2 pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 min-h-[48px]"
        >
          <span>সামনে এগিয়ে যান</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onRetry}
          className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs min-h-[44px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>পুনরায় অনুশীলন করুন</span>
        </button>
      </div>
    </div>
  );
};
