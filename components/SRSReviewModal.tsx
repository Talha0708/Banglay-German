'use client';

import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { SRSCard, SRSGrade } from '../types/srs';
import { isDue } from '../lib/srs';
import { SpeakerButton } from './SpeakerButton';
import { ArrowLeft, RotateCcw, Check, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdBanner } from './AdBanner';

interface SRSReviewModalProps {
  onClose: () => void;
}

export const SRSReviewModal: React.FC<SRSReviewModalProps> = ({ onClose }) => {
  const cards = useAppStore((state) => state.srsCards);
  const recordReview = useAppStore((state) => state.recordSRSReview);

  // Gather cards that are due
  const now = new Date();
  const allCards = Object.values(cards);
  const initialDueCards = allCards.filter((c) => isDue(c, now));

  // If no cards are due yet, offer a quick refresher from all available cards
  const reviewDeck: SRSCard[] = initialDueCards.length > 0 ? initialDueCards : allCards.slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = reviewDeck[currentIndex];

  const handleRate = (grade: SRSGrade) => {
    if (!currentCard) return;
    recordReview(currentCard.id, grade);
    setReviewedCount((prev) => prev + 1);

    if (currentIndex < reviewDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  if (reviewDeck.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col p-6 items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          আজকের সব রিভিশন সম্পন্ন!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
          আপনার কোনো কার্ড বাকি নেই। নতুন লেসন সম্পন্ন করলে নতুন কার্ড যুক্ত হবে।
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3 rounded-xl min-h-[44px]"
        >
          ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>বন্ধ করুন</span>
        </button>
        <div className="text-center">
          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
            দৈনিক স্পেসড রিপিটেশন (SM-2)
          </span>
          <span className="text-xs text-slate-500 font-medium">
            কার্ড {currentIndex + 1} / {reviewDeck.length}
          </span>
        </div>
        <div className="w-10" />
      </header>

      {!isFinished && currentCard ? (
        <div className="flex-1 max-w-sm mx-auto w-full p-4 flex flex-col justify-center space-y-6 pb-24">
          {/* Card Presentation */}
          <div
            onClick={() => setShowAnswer(true)}
            className="cursor-pointer min-h-[220px] p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center text-center space-y-3 transition active:scale-98 relative"
          >
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {currentCard.type === 'word' ? 'শব্দ (Word)' : 'বাক্য (Sentence)'}
            </span>

            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {currentCard.front}
              </h2>
              <SpeakerButton text={currentCard.front} size="sm" />
            </div>

            {currentCard.pronunciationBn && (
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                উচ্চারণ: {currentCard.pronunciationBn}
              </p>
            )}

            {!showAnswer ? (
              <span className="text-xs text-slate-400 underline decoration-dashed mt-4 block">
                ট্যাপ করে উত্তর দেখুন
              </span>
            ) : (
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 w-full animate-in fade-in duration-200 space-y-1">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {currentCard.back}
                </p>
                {currentCard.example_de && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    &quot;{currentCard.example_de}&quot;
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Rating Buttons */}
          {showAnswer ? (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <p className="text-[11px] font-semibold text-slate-500 text-center">
                কেমন মনে ছিল? (Rate Recall)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleRate(1)}
                  className="p-3 rounded-xl border border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 min-h-[50px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>কঠিন / আবার</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRate(3)}
                  className="p-3 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 min-h-[50px]"
                >
                  <Check className="w-4 h-4" />
                  <span>ভালো</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRate(5)}
                  className="p-3 rounded-xl border border-emerald-500 bg-emerald-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 min-h-[50px] shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>খুব সহজ</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAnswer(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition active:scale-98 min-h-[48px]"
            >
              উত্তর দেখুন (Show Answer)
            </button>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            অসাধারণ! রিভিশন সমাপ্ত
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            আপনি আজ {reviewedCount}টি কার্ড সফলভাবে ঝালাই করেছেন। SM-2 অ্যালগরিদম অনুযায়ী সময়মতো কার্ডগুলো আবার ফিরে আসবে।
          </p>
          <AdBanner slot="300x250" />
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md min-h-[48px]"
          >
            ফিরে যান (Done)
          </button>
        </div>
      )}
    </div>
  );
};
