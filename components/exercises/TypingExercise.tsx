'use client';

import React, { useState, useRef } from 'react';
import { TypingExercise as TypingExerciseType } from '../../types/curriculum';
import { isAnswerCorrect, computeSentenceDiff } from '../../lib/sentence-diff';
import { SpeakerButton } from '../SpeakerButton';

interface TypingExerciseProps {
  exercise: TypingExerciseType;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const TypingExercise: React.FC<TypingExerciseProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered || !input.trim()) return;

    setSubmitted(true);
    const { isCorrect } = isAnswerCorrect(
      input,
      exercise.correctAnswer,
      exercise.acceptedAnswers || []
    );
    onAnswer(isCorrect);
  };

  const insertChar = (char: string) => {
    if (isAnswered) return;
    setInput((prev) => prev + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const diffParts = isAnswered ? computeSentenceDiff(input, exercise.correctAnswer) : [];

  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center space-y-1">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
          জার্মান অনুবাদ টাইপ করুন
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {exercise.prompt}
        </h3>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={isAnswered}
            onChange={(e) => setInput(e.target.value)}
            placeholder={exercise.placeholder || 'জার্মান অনুবাদ লিখুন...'}
            autoCapitalize="sentences"
            autoCorrect="off"
            spellCheck="false"
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
        </div>

        {/* German Special Characters Toolbar */}
        {!isAnswered && (
          <div className="flex items-center gap-1.5 justify-center py-1">
            <span className="text-[11px] text-slate-400 mr-1">ট্যাপ করুন:</span>
            {['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => insertChar(c)}
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:border-blue-400 text-slate-800 dark:text-slate-100 font-bold text-sm transition active:scale-90 flex items-center justify-center min-h-[36px]"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {!isAnswered && (
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition active:scale-98 min-h-[48px]"
          >
            উত্তর জমা দিন (Submit)
          </button>
        )}
      </form>

      {/* Diff Feedback on Mistakes */}
      {isAnswered && (
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">সঠিক সমাধান:</span>
            <SpeakerButton text={exercise.correctAnswer} size="sm" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">
            {exercise.correctAnswer}
          </p>

          {/* Word-level diff */}
          {submitted && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-400 block mb-1">শব্দগত তুলনা:</span>
              <div className="flex flex-wrap gap-1.5 font-mono">
                {diffParts.map((part, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded text-xs ${
                      part.type === 'match'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
