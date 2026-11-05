'use client';

import React from 'react';
import { Home, BookOpen, Sparkles, Menu } from 'lucide-react';

export type TabId = 'home' | 'learn' | 'practice' | 'settings';

interface TabBarProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
  onOpenMenu: () => void;
  dueCardsCount?: number;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onChangeTab,
  onOpenMenu,
  dueCardsCount = 0,
}) => {
  return (
    <nav
      aria-label="মূল নেভিগেশন"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors pb-[calc(env(safe-area-inset-bottom)+0.25rem)] pt-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_16px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 px-2">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onChangeTab('home')}
          className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'home'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Home
              className={`w-5 h-5 transition-transform duration-150 ${
                activeTab === 'home' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
              }`}
            />
          </div>
          <span className="text-[11px] mt-1 leading-tight tracking-tight">
            হোম
          </span>
          {activeTab === 'home' && (
            <span className="absolute bottom-0 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
          )}
        </button>

        {/* 2. Learn */}
        <button
          type="button"
          onClick={() => onChangeTab('learn')}
          className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'learn'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <BookOpen
              className={`w-5 h-5 transition-transform duration-150 ${
                activeTab === 'learn' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
              }`}
            />
          </div>
          <span className="text-[11px] mt-1 leading-tight tracking-tight">
            শিখুন
          </span>
          {activeTab === 'learn' && (
            <span className="absolute bottom-0 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
          )}
        </button>

        {/* 3. Practice */}
        <button
          type="button"
          onClick={() => onChangeTab('practice')}
          className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'practice'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Sparkles
              className={`w-5 h-5 transition-transform duration-150 ${
                activeTab === 'practice' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
              }`}
            />
            {dueCardsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] h-4 flex items-center justify-center shadow-xs">
                {dueCardsCount > 99 ? '99+' : dueCardsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 leading-tight tracking-tight">
            অনুশীলন
          </span>
          {activeTab === 'practice' && (
            <span className="absolute bottom-0 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
          )}
        </button>

        {/* 4. 3-line Hamburger Menu Button on the Right Side */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="মেনু ও অন্যান্য অপশন খুলুন"
          className="relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <div className="relative w-8 h-6 flex flex-col items-center justify-center gap-1 p-0.5">
            <span className="w-5 h-0.5 bg-slate-700 dark:bg-slate-200 rounded-full transition-transform" />
            <span className="w-5 h-0.5 bg-blue-600 rounded-full transition-transform" />
            <span className="w-5 h-0.5 bg-amber-500 rounded-full transition-transform" />
          </div>
          <span className="text-[11px] mt-0.5 leading-tight tracking-tight font-semibold">
            মেনু ☰
          </span>
        </button>
      </div>
    </nav>
  );
};
