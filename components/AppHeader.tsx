'use client';

import React from 'react';
import Image from 'next/image';
import { Menu, Download, Flame } from 'lucide-react';

interface AppHeaderProps {
  onOpenMenu: () => void;
  onOpenInstallGuide: () => void;
  progressPercent: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenMenu,
  onOpenInstallGuide,
  progressPercent,
}) => {
  return (
    <header className="relative w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-2.5 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Brand: Logo + Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 shadow-xs flex items-center justify-center shrink-0">
            <Image
              src="/icon.svg"
              alt="Banglay German Icon"
              width={34}
              height={34}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                বাংলায় জার্মান
              </span>
              <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.2 rounded-md border border-blue-200/80 dark:border-blue-800/80">
                A1
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block leading-none">
              Banglay German • ১৪০০+ শব্দ
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Install Guide Button */}
          <button
            type="button"
            onClick={onOpenInstallGuide}
            className="flex items-center gap-1.5 text-xs font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2.5 py-1.5 rounded-xl transition active:scale-95 min-h-[36px]"
            title="অ্যাপ ডাউনলোড ও ইনস্টল নির্দেশিকা"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden xs:inline sm:inline">ইনস্টল</span>
          </button>

          {/* 3-line Right Hamburger Menu Button */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="প্রধান মেনু খুলুন"
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-1 transition active:scale-95 min-w-[36px] min-h-[36px]"
          >
            <span className="w-4 h-0.5 bg-slate-800 dark:bg-slate-200 rounded-full" />
            <span className="w-4 h-0.5 bg-blue-600 rounded-full" />
            <span className="w-4 h-0.5 bg-amber-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};
