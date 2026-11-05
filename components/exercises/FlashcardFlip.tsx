'use client';

import React, { useState } from 'react';
import { FlashcardFlipExercise } from '../../types/curriculum';
import { SpeakerButton } from '../SpeakerButton';
import { RotateCw, Check, X } from 'lucide-react';

interface FlashcardFlipProps {
  exercise: FlashcardFlipExercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const FlashcardFlip: React.FC<FlashcardFlipProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="space-y-4">
      {/* Flip Card Container */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        className="cursor-pointer min-h-[180px] p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center relative select-none bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-900 dark:to-slate-800 border-blue-500/30 hover:border-blue-500 shadow-md active:scale-98"
      >
        <span className="absolute top-3 right-3 text-slate-400 dark:text-slate-500 flex items-center gap-1 text-[11px]">
          <RotateCw className="w-3.5 h-3.5" /> ট্যাপ করে উল্টান
        </span>

        {!isFlipped ? (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              জার্মান (German)
            </span>
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {exercise.front}
              </h3>
              <SpeakerButton text={exercise.audioText || exercise.front} size="sm" />
            </div>
            {exercise.hint_bn && (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                ইঙ্গিত: {exercise.hint_bn}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              বাংলা অর্থ (Meaning)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {exercise.back}
            </h3>
          </div>
        )}
      </div>

      {/* Answer Decision Buttons */}
      {!isAnswered ? (
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onAnswer(false)}
            className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition active:scale-95 min-h-[48px]"
          >
            <X className="w-4 h-4" /> আবার দেখান (Need review)
          </button>
          <button
            type="button"
            onClick={() => onAnswer(true)}
            className="p-3.5 rounded-xl border border-emerald-500 bg-emerald-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:bg-emerald-500 transition active:scale-95 min-h-[48px]"
          >
            <Check className="w-4 h-4" /> মনে আছে (I got it)
          </button>
        </div>
      ) : (
        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          মূল্যায়ন সম্পন্ন হয়েছে
        </div>
      )}
    </div>
  );
};
