'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Home,
  BookOpen,
  Sparkles,
  Layers,
  Repeat,
  Download,
  Settings,
  Info,
  ChevronRight,
  Moon,
  Sun,
  Flame,
  FileText,
  MessageSquareQuote,
} from 'lucide-react';
import { TabId } from './TabBar';
import { useAppStore } from '../store/useAppStore';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenPracticeSection: (section: 'trainer' | 'srs' | 'words' | 'patterns' | 'sentences') => void;
  onOpenInstallGuide: () => void;
  onOpenSRSModal: () => void;
  dueCount: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onOpenPracticeSection,
  onOpenInstallGuide,
  onOpenSRSModal,
  dueCount,
  completedLessonsCount,
  totalLessonsCount,
}) => {
  const { settings, updateSettings } = useAppStore();

  if (!isOpen) return null;

  const navigateTo = (tab: TabId, section?: 'trainer' | 'srs' | 'words' | 'patterns' | 'sentences') => {
    onSelectTab(tab);
    if (section) {
      onOpenPracticeSection(section);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="relative w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-250">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shadow-xs">
              <Image
                src="/icon.svg"
                alt="BG Icon"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                বাংলায় জার্মান
              </h3>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                মেনু ও নেভিগেশন
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center min-w-[36px] min-h-[36px]"
            aria-label="মেনু বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Quick Progress Banner */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-700 dark:text-slate-200">
                কোর্স অগ্রগতি:
              </span>
            </div>
            <span className="font-black text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
              {completedLessonsCount} / {totalLessonsCount} পাঠ
            </span>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
              প্রধান বিভাগ
            </p>

            {/* 1. Home */}
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition min-h-[44px] ${
                activeTab === 'home'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>হোম (Home)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            {/* 2. Learn */}
            <button
              type="button"
              onClick={() => navigateTo('learn')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition min-h-[44px] ${
                activeTab === 'learn'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>ধারাবাহিক পাঠ (Curriculum A1)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            {/* 3. 1400+ Vocab Trainer */}
            <button
              type="button"
              onClick={() => navigateTo('practice', 'trainer')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>১৪০০+ শব্দ অনুশীলন (Goethe Trainer)</span>
              </div>
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md">
                A1
              </span>
            </button>

            {/* 4. Word Bank */}
            <button
              type="button"
              onClick={() => navigateTo('practice', 'words')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>শব্দকোষ (Word Bank - ১,৪৮৫ শব্দ)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            {/* 5. SRS Review */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSRSModal();
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <Repeat className="w-4 h-4 text-emerald-500" />
                <span>দৈনিক রিভিশন (SM-2 Flashcards)</span>
              </div>
              {dueCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {dueCount}
                </span>
              )}
            </button>

            {/* 6. Pattern Practice */}
            <button
              type="button"
              onClick={() => navigateTo('practice', 'patterns')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-purple-500" />
                <span>বাক্য তৈরি ড্রিল (Sentence Making)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            {/* 7. 200+ Daily Sentences */}
            <button
              type="button"
              onClick={() => navigateTo('practice', 'sentences')}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <MessageSquareQuote className="w-4 h-4 text-emerald-500" />
                <span>দৈনিক প্রয়োজনীয় ২০০+ বাক্য (Sentences)</span>
              </div>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md">
                ২২০ বাক্য
              </span>
            </button>
          </div>

          {/* Quick Install Banner inside Menu */}
          <div
            onClick={() => {
              onClose();
              onOpenInstallGuide();
            }}
            className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-slate-800 border border-blue-200/80 dark:border-blue-900/60 cursor-pointer space-y-2 hover:border-blue-400 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full">
                মোবাইল অ্যাপ
              </span>
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">
              অ্যাপ ডাউনলোড ও ইনস্টল নির্দেশিকা
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Android ও iPhone-এ কীভাবে ডাউনলোড করবেন বিস্তারিত দেখুন।
            </p>
          </div>

          {/* Settings & Info Items */}
          <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1 pt-2">
              সেটিংস ও তথ্য
            </p>

            {/* Dark Mode Quick Switch */}
            <div className="flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-3">
                {settings.darkMode ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>ডার্ক মোড</span>
              </div>
              <button
                type="button"
                onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  settings.darkMode ? 'bg-blue-600' : 'bg-slate-300'
                }`}
                aria-label="ডার্ক মোড পরিবর্তন করুন"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    settings.darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Settings Tab */}
            <button
              type="button"
              onClick={() => navigateTo('settings')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition min-h-[44px] ${
                activeTab === 'settings'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>অ্যাপ পছন্দসমূহ (Settings)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            {/* About Page Link */}
            <Link
              href="/about"
              onClick={onClose}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4" />
                <span>অ্যাপ সম্পর্কে (About)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </Link>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
            বাংলায় জার্মান • CEFR A1
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
            অক্ষর থেকে সম্পূর্ণ A1 স্ট্যান্ডার্ড
          </p>
        </div>
      </aside>
    </div>
  );
};
