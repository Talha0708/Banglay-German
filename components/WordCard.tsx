'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Word } from '../types/vocabulary';
import { SpeakerButton } from './SpeakerButton';
import { useAppStore } from '../store/useAppStore';

interface WordCardProps {
  word: Word;
  compact?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({ word, compact = false }) => {
  const [showConjugation, setShowConjugation] = useState(false);
  const isKnown = useAppStore((state) => !!state.knownWords[word.id]);
  const toggleKnown = useAppStore((state) => state.toggleWordKnown);

  const articleStyles = {
    der: 'border-blue-500/40 bg-blue-50/80 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
    die: 'border-rose-500/40 bg-rose-50/80 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300',
    das: 'border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
  };

  const articleBadgeColors = {
    der: 'bg-blue-600 text-white shadow-sm',
    die: 'bg-rose-600 text-white shadow-sm',
    das: 'bg-emerald-600 text-white shadow-sm',
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md ${
        word.article && articleStyles[word.article]
          ? articleStyles[word.article]
          : 'border-slate-200 dark:border-slate-800'
      } ${compact ? 'p-3' : 'p-4'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {word.article && (
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  articleBadgeColors[word.article]
                }`}
              >
                {word.article}
              </span>
            )}
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {word.german}
            </h4>
            {word.plural && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                (Pl. {word.plural})
              </span>
            )}
          </div>

          {/* Pronunciation & Pos */}
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/60">
              উচ্চারণ: {word.pronunciationBn}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 capitalize">
              {word.pos}
            </span>
          </div>

          {/* Meanings */}
          <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            {word.bengali}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {word.english}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <SpeakerButton text={word.article ? `${word.article} ${word.german}` : word.german} size="sm" />
          <button
            type="button"
            onClick={() => toggleKnown(word.id)}
            title={isKnown ? 'জানা শব্দ হিসেবে চিহ্নিত আছে' : 'জানা শব্দ হিসেবে চিহ্নিত করুন'}
            aria-label={isKnown ? 'জানা শব্দ থেকে সরান' : 'জানা শব্দে যোগ করুন'}
            className={`min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all ${
              isKnown
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500'
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Example Sentence */}
      {word.example_de && (
        <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/40 -mx-1 px-3 py-2 rounded-xl">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
              {word.example_de}
            </p>
            <SpeakerButton text={word.example_de} size="sm" className="w-7 h-7 min-w-[36px] min-h-[36px]" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {word.example_bn}
          </p>
        </div>
      )}

      {/* Verb Conjugation Toggle */}
      {(word.conjugations || word.conjugation) && (
        <div className="mt-2">
          {(() => {
            const conj = word.conjugations || word.conjugation;
            if (!conj) return null;
            return (
              <>
                <button
                  type="button"
                  onClick={() => setShowConjugation(!showConjugation)}
                  className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline min-h-[36px]"
                >
                  {showConjugation ? (
                    <>
                      রূপান্তর ছক লুকান <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      ক্রিয়ার রূপান্তর ছক দেখুন <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {showConjugation && (
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-2 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl text-xs border border-slate-200/60 dark:border-slate-700/60">
                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">ich</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">{conj.ich}</span>
                    </div>
                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">du</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">{conj.du}</span>
                    </div>
                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">er/sie/es</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">{conj.er_sie_es}</span>
                    </div>
                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">wir</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">{conj.wir}</span>
                    </div>
                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">ihr</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">{conj.ihr}</span>
                    </div>
                    <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">sie/Sie</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">{conj.sie_Sie}</span>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
