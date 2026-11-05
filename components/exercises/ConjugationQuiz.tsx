'use client';

import React, { useState } from 'react';
import { ConjugationQuizExercise } from '../../types/curriculum';
import { SpeakerButton } from '../SpeakerButton';

interface ConjugationQuizProps {
  exercise: ConjugationQuizExercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const ConjugationQuiz: React.FC<ConjugationQuizProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    const correct = option === exercise.correctAnswer;
    onAnswer(correct);
  };

  return (
    <div className="space-y-4">
      {/* Verb + Pronoun Card */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center space-y-1.5">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
          ক্রিয়ার রূপান্তর কুইজ (Conjugation)
        </span>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
            {exercise.pronoun}
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
            + &quot;{exercise.verb}&quot;
          </span>
          <SpeakerButton text={exercise.verb} size="sm" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          অর্থ: {exercise.meaning_bn}
        </p>
      </div>

      {/* 4 Choices */}
      <div className="grid grid-cols-2 gap-2.5">
        {exercise.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === exercise.correctAnswer;

          let btnClass =
            'p-4 rounded-xl border text-center font-bold text-base transition-all duration-150 min-h-[52px] flex items-center justify-center bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white active:scale-95 hover:border-blue-400';

          if (isAnswered) {
            if (isCorrect) {
              btnClass =
                'p-4 rounded-xl border text-center font-bold text-base min-h-[52px] flex items-center justify-center bg-emerald-600 text-white border-emerald-600 shadow-md';
            } else if (isSelected) {
              btnClass =
                'p-4 rounded-xl border text-center font-bold text-base min-h-[52px] flex items-center justify-center bg-rose-600 text-white border-rose-600 shadow-md';
            } else {
              btnClass =
                'p-4 rounded-xl border text-center font-bold text-base min-h-[52px] flex items-center justify-center opacity-30 bg-slate-100 text-slate-400';
            }
          }

          return (
            <button
              key={`${opt}-${idx}`}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={btnClass}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
