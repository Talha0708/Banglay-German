'use client';

import React, { useState } from 'react';
import { ListeningExercise as ListeningExerciseType } from '../../types/curriculum';
import { SpeakerButton } from '../SpeakerButton';
import { Volume2 } from 'lucide-react';

interface ListeningExerciseProps {
  exercise: ListeningExerciseType;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const ListeningExercise: React.FC<ListeningExerciseProps> = ({
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
      {/* Audio Player Card */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center space-y-3">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
          শুনে চিহ্নিত করুন (Listening Exercise)
        </span>
        <div className="flex flex-col items-center justify-center gap-2">
          <SpeakerButton text={exercise.audioText} size="lg" />
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
            <Volume2 className="w-3.5 h-3.5" /> পুনরায় শুনতে ট্যাপ করুন
          </span>
        </div>
      </div>

      {/* Choice Options */}
      <div className="grid grid-cols-1 gap-2.5">
        {exercise.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === exercise.correctAnswer;

          let btnClass =
            'w-full min-h-[48px] p-3.5 rounded-xl border text-left text-sm font-medium transition-all duration-150 flex items-center justify-between active:scale-98 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400';

          if (isAnswered) {
            if (isCorrect) {
              btnClass =
                'w-full min-h-[48px] p-3.5 rounded-xl border text-left text-sm font-semibold bg-emerald-600 text-white border-emerald-600 shadow-md';
            } else if (isSelected) {
              btnClass =
                'w-full min-h-[48px] p-3.5 rounded-xl border text-left text-sm font-semibold bg-rose-600 text-white border-rose-600 shadow-md';
            } else {
              btnClass =
                'w-full min-h-[48px] p-3.5 rounded-xl border text-left text-sm opacity-40 bg-slate-100 text-slate-400 border-slate-200';
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
              <span>{opt}</span>
              <span className="w-6 h-6 rounded-full border border-current/30 flex items-center justify-center text-xs shrink-0 ml-2">
                {String.fromCharCode(65 + idx)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
