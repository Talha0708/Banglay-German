'use client';

import React, { useState } from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { WordCard } from './WordCard';
import { AdBanner } from './AdBanner';
import { getTopics, searchWords, ALL_WORDS } from '../data/vocabulary';
import { useAppStore } from '../store/useAppStore';

export const WordBankView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const topics = getTopics();
  const knownWords = useAppStore((state) => state.knownWords);
  const knownCount = Object.values(knownWords).filter(Boolean).length;
  const filteredWords = searchWords(searchQuery, selectedTopic);

  return (
    <div className="space-y-4">
      {/* Top Stats Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white flex items-center justify-between border border-blue-800/60 shadow-sm">
        <div>
          <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block">
            শব্দভাণ্ডার (Word Bank)
          </span>
          <p className="text-sm font-semibold text-white mt-0.5">
            ১,৪৮০+ Goethe A1 স্ট্যান্ডার্ড শব্দকোষ
          </p>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-amber-400">
            {knownCount} / {ALL_WORDS.length}
          </span>
          <span className="text-[10px] text-blue-200/80 block flex items-center gap-1 justify-end">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
            জানা শব্দ
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="জার্মান বা বাংলায় শব্দ খুঁজুন..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[44px]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 min-h-[36px]"
          >
            মুছুন ✕
          </button>
        )}
      </div>

      {/* Topic Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedTopic('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition active:scale-95 min-h-[36px] flex items-center gap-1 ${
            selectedTopic === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'
          }`}
        >
          <Filter className="w-3 h-3" />
          সব বিষয় ({ALL_WORDS.length})
        </button>

        {topics.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelectedTopic(t.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition active:scale-95 min-h-[36px] flex items-center gap-1 ${
              selectedTopic === t.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label_bn}</span>
            <span className="text-[10px] opacity-70">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Words List */}
      <div className="space-y-3 pt-1">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              কোনো শব্দ পাওয়া যায়নি
            </p>
            <p className="text-xs text-slate-400 mt-1">
              ভিন্ন কোনো অনুসন্ধান শব্দ দিয়ে চেষ্টা করুন
            </p>
          </div>
        ) : (
          filteredWords.map((word) => <WordCard key={word.id} word={word} />)
        )}
      </div>

      {/* User-friendly Advertisement */}
      <AdBanner slot="300x250" />
    </div>
  );
};
