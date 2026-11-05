'use client';

import React, { useState } from 'react';
import { Exercise } from '../../types/curriculum';
import { MultipleChoice } from './MultipleChoice';
import { MatchingPairs } from './MatchingPairs';
import { FlashcardFlip } from './FlashcardFlip';
import { TypingExercise } from './TypingExercise';
import { ListeningExercise } from './ListeningExercise';
import { ArticleQuiz } from './ArticleQuiz';
import { ConjugationQuiz } from './ConjugationQuiz';
import { SentenceBuilder } from './SentenceBuilder';
import { FillBlank } from './FillBlank';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface ExerciseRunnerProps {
  exercises: Exercise[];
  onComplete: (score: number, total: number) => void;
  onExit?: () => void;
}

export const ExerciseRunner: React.FC<ExerciseRunnerProps> = ({
  exercises,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLastAnswerCorrect, setIsLastAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercise = exercises[currentIndex];
  const progressPercent = Math.round(((currentIndex) / exercises.length) * 100);

  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswered(true);
    setIsLastAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setIsLastAnswerCorrect(false);
    } else {
      const finalScore = isLastAnswerCorrect ? score : score;
      onComplete(finalScore, exercises.length);
    }
  };

  if (!currentExercise) return null;

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto pb-24">
      {/* Top Header & Progress */}
      <div className="px-4 pt-3 pb-2 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            অনুশীলন {currentIndex + 1} / {exercises.length}
          </span>
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-2 py-1 min-h-[36px]"
            >
              বন্ধ করুন ✕
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Exercise Area */}
      <div className="flex-1 px-4 py-3">
        {currentExercise.type === 'multiple_choice' && (
          <MultipleChoice
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'sentence_builder' && (
          <SentenceBuilder
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'article_quiz' && (
          <ArticleQuiz
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'conjugation_quiz' && (
          <ConjugationQuiz
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'matching_pairs' && (
          <MatchingPairs
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'flashcard_flip' && (
          <FlashcardFlip
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'typing' && (
          <TypingExercise
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'listening' && (
          <ListeningExercise
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
        {currentExercise.type === 'fill_blank' && (
          <FillBlank
            exercise={currentExercise}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
          />
        )}
      </div>

      {/* Instant Green/Red Bottom Feedback Banner */}
      {isAnswered && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 p-4 border-t shadow-2xl transition-all duration-200 animate-in slide-in-from-bottom pb-[calc(env(safe-area-inset-bottom)+1rem)] ${
            isLastAnswerCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-50 dark:bg-rose-950/90 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }`}
        >
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex items-start gap-2.5">
              {isLastAnswerCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-xs">
                <p className="font-bold text-sm">
                  {isLastAnswerCorrect ? 'দারুণ! একদম সঠিক উত্তর' : 'একটু ভুল হয়েছে'}
                </p>
                {/* Bengali explanation on wrong answers or extra tips */}
                {currentExercise.explanation_bn && (
                  <p className="mt-1 text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{currentExercise.explanation_bn}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className={`w-full font-bold py-3 px-4 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2 min-h-[48px] ${
                isLastAnswerCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              <span>{currentIndex === exercises.length - 1 ? 'ফলাফল দেখুন' : 'পরবর্তী ধাপ'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
