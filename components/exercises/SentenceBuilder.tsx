'use client';

import React, { useState } from 'react';
import { SentenceBuilderExercise } from '../../types/curriculum';
import { SpeakerButton } from '../SpeakerButton';

interface SentenceBuilderProps {
  exercise: SentenceBuilderExercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  // Available words in scrambled pool with unique keys
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(exercise.scrambledWords);

  const handleSelectWord = (word: string, index: number) => {
    if (isAnswered) return;
    const nextAvailable = [...availableWords];
    nextAvailable.splice(index, 1);
    setAvailableWords(nextAvailable);
    setSelectedWords([...selectedWords, word]);
  };

  const handleDeselectWord = (word: string, index: number) => {
    if (isAnswered) return;
    const nextSelected = [...selectedWords];
    nextSelected.splice(index, 1);
    setSelectedWords(nextSelected);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheck = () => {
    if (isAnswered || selectedWords.length === 0) return;
    const constructed = selectedWords.join(' ').trim();
    // Compare normalized
    const cleanConstructed = constructed.replace(/[.,?!]/g, '').toLowerCase();
    const cleanTarget = exercise.targetSentence.replace(/[.,?!]/g, '').toLowerCase();
    const correct = cleanConstructed === cleanTarget;
    onAnswer(correct);
  };

  return (
    <div className="space-y-4">
      {/* Prompt Card */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
          বাক্য সাজান (Sentence Builder)
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {exercise.meaning_bn}
        </h3>
      </div>

      {/* Assembled Sentence Area */}
      <div className="min-h-[72px] p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-dashed border-blue-500/40 flex flex-wrap items-center gap-2">
        {selectedWords.length === 0 ? (
          <span className="text-xs text-slate-400 italic mx-auto">
            নিচের শব্দগুলোতে ট্যাপ করে বাক্য তৈরি করুন
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              type="button"
              disabled={isAnswered}
              onClick={() => handleDeselectWord(word, idx)}
              className="bg-blue-600 text-white font-medium text-sm px-3.5 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition active:scale-95 min-h-[44px]"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available Word Pool */}
      <div className="pt-2">
        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2">
          শব্দ নির্বাচন করুন:
        </p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, idx) => (
            <button
              key={`avail-${word}-${idx}`}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectWord(word, idx)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 font-medium text-sm px-3.5 py-2 rounded-xl shadow-sm transition active:scale-95 min-h-[44px]"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Action / Check Button */}
      {!isAnswered && (
        <button
          type="button"
          onClick={handleCheck}
          disabled={selectedWords.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition active:scale-98 min-h-[48px]"
        >
          যাচাই করুন (Check)
        </button>
      )}

      {/* Feedback & Audio after answer */}
      {isAnswered && (
        <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-[11px] text-slate-400">সঠিক জার্মান বাক্য:</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {exercise.targetSentence}
            </p>
          </div>
          <SpeakerButton text={exercise.targetSentence} size="sm" />
        </div>
      )}
    </div>
  );
};
