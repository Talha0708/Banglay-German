'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MatchingPairsExercise } from '../../types/curriculum';
import { Check } from 'lucide-react';

interface MatchingPairsProps {
  exercise: MatchingPairsExercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

// Deterministic permutation helper to comply with React purity rules
function pseudoShuffle<T>(arr: T[], seed: string): T[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.abs(hash * (i + 1) * 31) % (i + 1);
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

export const MatchingPairs: React.FC<MatchingPairsProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  const [selectedGerman, setSelectedGerman] = useState<string | null>(null);
  const [selectedBengali, setSelectedBengali] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [wrongPair, setWrongPair] = useState<boolean>(false);

  const shuffledGerman = useMemo(() => {
    return pseudoShuffle(
      exercise.pairs.map((p) => p.german),
      (exercise.id || '') + '_de'
    );
  }, [exercise]);

  const shuffledBengali = useMemo(() => {
    return pseudoShuffle(
      exercise.pairs.map((p) => p.bengali),
      (exercise.id || '') + '_bn'
    );
  }, [exercise]);

  const handleGermanClick = (de: string) => {
    if (isAnswered || matchedPairs[de]) return;
    setWrongPair(false);

    if (selectedBengali) {
      const pair = exercise.pairs.find((p) => p.german === de && p.bengali === selectedBengali);
      if (pair) {
        const next = { ...matchedPairs, [de]: selectedBengali };
        setMatchedPairs(next);
        setSelectedGerman(null);
        setSelectedBengali(null);
        if (Object.keys(next).length === exercise.pairs.length) {
          onAnswer(true);
        }
      } else {
        setWrongPair(true);
        setTimeout(() => {
          setSelectedGerman(null);
          setSelectedBengali(null);
          setWrongPair(false);
        }, 700);
      }
    } else {
      setSelectedGerman(de);
    }
  };

  const handleBengaliClick = (bn: string) => {
    if (isAnswered || Object.values(matchedPairs).includes(bn)) return;
    setWrongPair(false);

    if (selectedGerman) {
      const pair = exercise.pairs.find((p) => p.german === selectedGerman && p.bengali === bn);
      if (pair) {
        const next = { ...matchedPairs, [selectedGerman]: bn };
        setMatchedPairs(next);
        setSelectedGerman(null);
        setSelectedBengali(null);
        if (Object.keys(next).length === exercise.pairs.length) {
          onAnswer(true);
        }
      } else {
        setWrongPair(true);
        setTimeout(() => {
          setSelectedGerman(null);
          setSelectedBengali(null);
          setWrongPair(false);
        }, 700);
      }
    } else {
      setSelectedBengali(bn);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
          জোড়া মেলান (Matching Pairs)
        </span>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          জার্মান শব্দের সাথে সঠিক বাংলা অর্থ ট্যাপ করে মেলান
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {shuffledGerman.map((de) => {
            const isMatched = !!matchedPairs[de];
            const isSelected = selectedGerman === de;

            return (
              <button
                key={de}
                type="button"
                disabled={isMatched || isAnswered}
                onClick={() => handleGermanClick(de)}
                className={`w-full min-h-[48px] p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 text-emerald-700 dark:text-emerald-300 opacity-60'
                    : isSelected
                    ? wrongPair
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400'
                }`}
              >
                <span className="truncate">{de}</span>
                {isMatched && <Check className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {shuffledBengali.map((bn) => {
            const isMatched = Object.values(matchedPairs).includes(bn);
            const isSelected = selectedBengali === bn;

            return (
              <button
                key={bn}
                type="button"
                disabled={isMatched || isAnswered}
                onClick={() => handleBengaliClick(bn)}
                className={`w-full min-h-[48px] p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 text-emerald-700 dark:text-emerald-300 opacity-60'
                    : isSelected
                    ? wrongPair
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400'
                }`}
              >
                <span className="truncate">{bn}</span>
                {isMatched && <Check className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
