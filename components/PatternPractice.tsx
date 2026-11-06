'use client';

import React, { useState } from 'react';
import { PATTERN_PRACTICE_TEMPLATES } from '../data/curriculum';
import { SpeakerButton } from './SpeakerButton';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

export const PatternPractice: React.FC = () => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const currentTemplate = PATTERN_PRACTICE_TEMPLATES[selectedTemplateIndex] || PATTERN_PRACTICE_TEMPLATES[0];
  const [selectedSlotOption, setSelectedSlotOption] = useState(0);

  const activeOption = currentTemplate.options[selectedSlotOption] || currentTemplate.options[0];
  const fullSentenceDe = currentTemplate.template_de.replace('{slot}', activeOption.word);
  const fullSentenceBn = currentTemplate.translation_template_bn.replace('{slot}', activeOption.meaning_bn);

  return (
    <div className="space-y-4">
      {/* 12 Category Pill Selector */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            A1 বাক্য প্যাটার্ন নির্বাচন করুন ({PATTERN_PRACTICE_TEMPLATES.length}টি ক্যাটাগরি):
          </span>
          <span className="text-[11px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
            {selectedTemplateIndex + 1} / {PATTERN_PRACTICE_TEMPLATES.length}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PATTERN_PRACTICE_TEMPLATES.map((tmpl, idx) => {
            const isSelected = selectedTemplateIndex === idx;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => {
                  setSelectedTemplateIndex(idx);
                  setSelectedSlotOption(0);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 shrink-0 min-h-[38px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <span>{tmpl.category_bn || `প্যাটার্ন ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Sentence Board */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {currentTemplate.category_bn}
          </span>
          <SpeakerButton text={fullSentenceDe} size="sm" />
        </div>

        {/* Live Constructed German Sentence with Highlighted Slot */}
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-center space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {currentTemplate.template_de.split('{slot}').map((part, i, arr) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < arr.length - 1 && (
                  <span className="text-blue-600 dark:text-blue-400 underline decoration-blue-400 underline-offset-4 decoration-2 px-1">
                    {activeOption.word}
                  </span>
                )}
              </React.Fragment>
            ))}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            {fullSentenceBn}
          </p>
        </div>

        {/* Slot Options Selector */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
              শব্দ পরিবর্তন করে নতুন বাক্য তৈরি করুন ({currentTemplate.slot_label_bn}):
            </label>
            <span className="text-[11px] text-slate-400">ট্যাপ করে শুনুন</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {currentTemplate.options.map((opt, i) => {
              const isSelected = selectedSlotOption === i;
              return (
                <button
                  key={opt.word}
                  type="button"
                  onClick={() => setSelectedSlotOption(i)}
                  className={`p-3 rounded-2xl border text-left transition-all active:scale-98 min-h-[52px] relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-950 dark:text-blue-100 ring-2 ring-blue-500/30 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-extrabold text-xs sm:text-sm leading-tight text-slate-900 dark:text-white">
                      {opt.word}
                    </p>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
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
