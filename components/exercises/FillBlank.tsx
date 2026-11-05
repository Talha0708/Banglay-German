'use client';

import React, { useState } from 'react';
import { FillBlankExercise } from '../../types/curriculum';
import { SpeakerButton } from '../SpeakerButton';

interface FillBlankProps {
  exercise: FillBlankExercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const FillBlank: React.FC<FillBlankProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleSelect = (word: string) => {
    if (isAnswered) return;
    setSelectedWord(word);
    const correct = word === exercise.correctAnswer;
    onAnswer(correct);
  };

  const renderedSentence = exercise.sentenceWithBlank.replace(
    '___',
    isAnswered
      ? `[${exercise.correctAnswer}]`
      : selectedWord
      ? `[${selectedWord}]`
      : '_____'
  );

  return (
    <div className="space-y-4">
      {/* Target Sentence Card */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center space-y-2">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
          শূন্যস্থান পূরণ করুন (Fill in the Blank)
        </span>
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {renderedSentence}
          </h3>
          {isAnswered && (
            <SpeakerButton
              text={exercise.sentenceWithBlank.replace('___', exercise.correctAnswer)}
              size="sm"
            />
          )}
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          অর্থ: {exercise.translation_bn}
        </p>
      </div>

      {/* Choice Chips */}
      <div className="grid grid-cols-2 gap-2.5">
        {exercise.options.map((opt, idx) => {
          const isSelected = selectedWord === opt;
          const isCorrect = opt === exercise.correctAnswer;

          let btnClass =
            'p-3.5 rounded-xl border text-center font-bold text-sm sm:text-base transition-all duration-150 min-h-[50px] flex items-center justify-center bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white active:scale-95 hover:border-blue-400';

          if (isAnswered) {
            if (isCorrect) {
              btnClass =
                'p-3.5 rounded-xl border text-center font-bold text-sm sm:text-base min-h-[50px] flex items-center justify-center bg-emerald-600 text-white border-emerald-600 shadow-md';
            } else if (isSelected) {
              btnClass =
                'p-3.5 rounded-xl border text-center font-bold text-sm sm:text-base min-h-[50px] flex items-center justify-center bg-rose-600 text-white border-rose-600 shadow-md';
            } else {
              btnClass =
                'p-3.5 rounded-xl border text-center font-bold text-sm sm:text-base min-h-[50px] flex items-center justify-center opacity-30 bg-slate-100 text-slate-400';
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
