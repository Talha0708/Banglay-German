'use client';

import React, { useState } from 'react';
import { MultipleChoiceExercise } from '../../types/curriculum';
import { SpeakerButton } from '../SpeakerButton';

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
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
      {/* Question */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
          সঠিক উত্তর বেছে নিন
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {exercise.question}
        </h3>
        {exercise.audioPrompt && (
          <div className="mt-2 flex justify-center">
            <SpeakerButton text={exercise.audioPrompt} size="md" />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2.5">
        {exercise.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === exercise.correctAnswer;

          let btnStyle =
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400';

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-md';
            } else if (isSelected) {
              btnStyle = 'bg-rose-600 text-white border-rose-600 font-semibold shadow-md';
            } else {
              btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400';
            }
          }

          return (
            <button
              key={`${option}-${idx}`}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(option)}
              className={`w-full min-h-[48px] p-3.5 rounded-xl border text-left text-sm font-medium transition-all duration-150 flex items-center justify-between active:scale-98 ${btnStyle}`}
            >
              <span>{option}</span>
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
