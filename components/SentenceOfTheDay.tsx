'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { getSentenceOfTheDay, SENTENCES_OF_THE_DAY } from '../data/curriculum';
import { SpeakerButton } from './SpeakerButton';

export const SentenceOfTheDay: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Default to first sentence on server and initial hydration, then update after mount
  const sentence = mounted ? getSentenceOfTheDay() : SENTENCES_OF_THE_DAY[0];

  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white shadow-lg border border-blue-800/60 relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          আজকের বাক্য (Sentence of the Day)
        </span>
        <SpeakerButton text={sentence.de} size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
        &quot;{sentence.de}&quot;
      </h3>
      <p className="text-xs text-blue-100/90 mt-1 font-medium">
        {sentence.bn}
      </p>
    </div>
  );
};
