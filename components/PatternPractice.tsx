'use client';

import React, { useState } from 'react';
import { PATTERN_PRACTICE_TEMPLATES } from '../data/curriculum';
import { SpeakerButton } from './SpeakerButton';
import { Sparkles } from 'lucide-react';

export const PatternPractice: React.FC = () => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const currentTemplate = PATTERN_PRACTICE_TEMPLATES[selectedTemplateIndex];
  const [selectedSlotOption, setSelectedSlotOption] = useState(0);

  const activeOption = currentTemplate.options[selectedSlotOption];
  const fullSentenceDe = currentTemplate.template_de.replace('{slot}', activeOption.word);
  const fullSentenceBn = currentTemplate.translation_template_bn.replace('{slot}', activeOption.meaning_bn);

  return (
    <div className="space-y-4">
      {/* Template Selector Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {PATTERN_PRACTICE_TEMPLATES.map((tmpl, idx) => (
          <button
            key={tmpl.id}
            type="button"
            onClick={() => {
              setSelectedTemplateIndex(idx);
              setSelectedSlotOption(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition active:scale-95 min-h-[36px] ${
              selectedTemplateIndex === idx
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            প্যাটার্ন {idx + 1}
          </button>
        ))}
      </div>

      {/* Interactive Sentence Board */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            প্যাটার্ন ড্রিল (Pattern Drill)
          </span>
          <SpeakerButton text={fullSentenceDe} size="sm" />
        </div>

        {/* Live Constructed German Sentence */}
        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 text-center">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {fullSentenceDe}
          </h3>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
            {fullSentenceBn}
          </p>
        </div>

        {/* Slot Options Selector */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
            শব্দ পরিবর্তন করুন ({currentTemplate.slot_label_bn}):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {currentTemplate.options.map((opt, i) => {
              const isSelected = selectedSlotOption === i;
              return (
                <button
                  key={opt.word}
                  type="button"
                  onClick={() => setSelectedSlotOption(i)}
                  className={`p-3 rounded-xl border text-left transition active:scale-95 min-h-[48px] ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-2 ring-blue-400/40'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-xs sm:text-sm">{opt.word}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {opt.meaning_bn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
