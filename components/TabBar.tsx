'use client';

import React from 'react';
import { Home, BookOpen, Target, Menu } from 'lucide-react';

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
      aria-label="প্রধান মোবাইল নেভিগেশন"
      className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_36px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)] px-1 py-1.5 transition-all"
    >
      <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800/80 items-stretch">
        {/* 1. হোম (Home) */}
        <button
          type="button"
          onClick={() => onChangeTab('home')}
          className="group relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-150 active:scale-95"
        >
          <Home
            className={`w-[22px] h-[22px] transition-colors duration-150 ${
              activeTab === 'home'
                ? 'text-blue-600 dark:text-blue-400 stroke-[2.2]'
                : 'text-slate-900 dark:text-slate-100 stroke-[1.8] group-hover:text-blue-600 dark:group-hover:text-blue-400'
            }`}
          />
          <span
            className={`text-[12px] mt-0.5 tracking-tight transition-colors duration-150 ${
              activeTab === 'home'
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : 'text-slate-900 dark:text-slate-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400'
            }`}
          >
            হোম
          </span>
          <span
            className={`w-8 h-[2.5px] rounded-full mt-0.5 transition-all duration-200 ${
              activeTab === 'home'
                ? 'bg-blue-600 dark:bg-blue-400 scale-100 opacity-100'
                : 'bg-transparent scale-50 opacity-0'
            }`}
          />
        </button>

        {/* 2. শিখুন (Learn / Curriculum) */}
        <button
          type="button"
          onClick={() => onChangeTab('learn')}
          className="group relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-150 active:scale-95"
        >
          <BookOpen
            className={`w-[22px] h-[22px] transition-colors duration-150 ${
              activeTab === 'learn'
                ? 'text-blue-600 dark:text-blue-400 stroke-[2.2]'
                : 'text-slate-900 dark:text-slate-100 stroke-[1.8] group-hover:text-blue-600 dark:group-hover:text-blue-400'
            }`}
          />
          <span
            className={`text-[12px] mt-0.5 tracking-tight transition-colors duration-150 ${
              activeTab === 'learn'
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : 'text-slate-900 dark:text-slate-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400'
            }`}
          >
            শিখুন
          </span>
          <span
            className={`w-8 h-[2.5px] rounded-full mt-0.5 transition-all duration-200 ${
              activeTab === 'learn'
                ? 'bg-blue-600 dark:bg-blue-400 scale-100 opacity-100'
                : 'bg-transparent scale-50 opacity-0'
            }`}
          />
        </button>

        {/* 3. অনুশীলন (Practice Hub) */}
        <button
          type="button"
          onClick={() => onChangeTab('practice')}
          className="group relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-150 active:scale-95"
        >
          <div className="relative flex items-center justify-center">
            <Target
              className={`w-[22px] h-[22px] transition-colors duration-150 ${
                activeTab === 'practice'
                  ? 'text-blue-600 dark:text-blue-400 stroke-[2.2]'
                  : 'text-slate-900 dark:text-slate-100 stroke-[1.8] group-hover:text-blue-600 dark:group-hover:text-blue-400'
              }`}
            />
            {dueCardsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full min-w-[15px] h-3.5 flex items-center justify-center shadow-xs animate-pulse">
                {dueCardsCount > 99 ? '99+' : dueCardsCount}
              </span>
            )}
          </div>
          <span
            className={`text-[12px] mt-0.5 tracking-tight transition-colors duration-150 ${
              activeTab === 'practice'
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : 'text-slate-900 dark:text-slate-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400'
            }`}
          >
            অনুশীলন
          </span>
          <span
            className={`w-8 h-[2.5px] rounded-full mt-0.5 transition-all duration-200 ${
              activeTab === 'practice'
                ? 'bg-blue-600 dark:bg-blue-400 scale-100 opacity-100'
                : 'bg-transparent scale-50 opacity-0'
            }`}
          />
        </button>

        {/* 4. মেনু (Menu / Drawer) */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="প্রধান ড্রয়ার মেনু খুলুন"
          className="group relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-150 active:scale-95"
        >
          <Menu className="w-[22px] h-[22px] text-slate-900 dark:text-slate-100 stroke-[2] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150" />
          <span className="text-[12px] mt-0.5 tracking-tight font-medium text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
            মেনু
          </span>
          <span className="w-8 h-[2.5px] rounded-full mt-0.5 bg-transparent" />
        </button>
      </div>
    </nav>
  );
};
