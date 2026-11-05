'use client';

import React, { useState } from 'react';
import { ArticleQuizExercise } from '../../types/curriculum';
import { SpeakerButton } from '../SpeakerButton';

interface ArticleQuizProps {
  exercise: ArticleQuizExercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const ArticleQuiz: React.FC<ArticleQuizProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const handleSelect = (art: 'der' | 'die' | 'das') => {
    if (isAnswered) return;
    setSelectedArticle(art);
    const correct = art === exercise.correctArticle;
    onAnswer(correct);
  };

  const articles: ('der' | 'die' | 'das')[] = ['der', 'die', 'das'];

  const baseStyles = {
    der: 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    die: 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
    das: 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  };

  const fillStyles = {
    der: 'bg-blue-600 text-white shadow-lg border-blue-600',
    die: 'bg-rose-600 text-white shadow-lg border-rose-600',
    das: 'bg-emerald-600 text-white shadow-lg border-emerald-600',
  };

  return (
    <div className="space-y-5">
      {/* Target Word Card */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center space-y-2">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
          আর্টিকেল কুইজ (der / die / das)
        </span>
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isAnswered && (
              <span
                className={`mr-2 underline decoration-4 ${
                  exercise.correctArticle === 'der'
                    ? 'text-blue-600 dark:text-blue-400'
                    : exercise.correctArticle === 'die'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {exercise.correctArticle}
              </span>
            )}
            {exercise.noun}
          </h2>
          <SpeakerButton text={`${exercise.correctArticle} ${exercise.noun}`} size="md" />
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          অর্থ: {exercise.meaning_bn}
        </p>
      </div>

      {/* 3 Color-Coded Article Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {articles.map((art) => {
          const isSelected = selectedArticle === art;
          const isCorrect = exercise.correctArticle === art;

          let btnClass = `py-4 rounded-xl border-2 font-black text-lg uppercase tracking-wider transition-all duration-150 min-h-[56px] flex flex-col items-center justify-center active:scale-95 ${baseStyles[art]}`;

          if (isAnswered) {
            if (isCorrect) {
              btnClass = `py-4 rounded-xl border-2 font-black text-lg uppercase tracking-wider min-h-[56px] flex flex-col items-center justify-center ${fillStyles[art]}`;
            } else if (isSelected) {
              btnClass =
                'py-4 rounded-xl border-2 font-black text-lg uppercase tracking-wider min-h-[56px] flex flex-col items-center justify-center bg-slate-400 text-white line-through opacity-60';
            } else {
              btnClass = 'opacity-30 border-slate-200 text-slate-400 min-h-[56px] flex flex-col items-center justify-center';
            }
          }

          return (
            <button
              key={art}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(art)}
              className={btnClass}
            >
              <span>{art}</span>
              <span className="text-[10px] font-normal tracking-normal capitalize opacity-80">
                {art === 'der' ? 'পুংলিঙ্গ' : art === 'die' ? 'স্ত্রীলিঙ্গ' : 'ক্লীবলিঙ্গ'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
