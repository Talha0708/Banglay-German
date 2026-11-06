'use client';

import React, { useState } from 'react';
import {
  Download,
  Share2,
  PlusSquare,
  CheckCircle2,
  X,
  Smartphone,
  Apple,
  Layers,
  Sparkles,
} from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerInstall?: () => void;
  canInstallPrompt?: boolean;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
  onTriggerInstall,
  canInstallPrompt = false,
}) => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios'>('android');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60 shadow-xs">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                অ্যাপ ইনস্টল নির্দেশিকা
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Android ও iOS ডিভাইসের হোম স্ক্রিনে সহজে যোগ করুন
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center min-w-[36px] min-h-[36px]"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Quick Advantage Pill */}
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed font-medium">
              হোম স্ক্রিনে ইনস্টল করলে খুব সহজে <strong>১৪০০+ শব্দ</strong>, জার্মান অডিও ও সব অনুশীলন এক ট্যাপে ওপেন হবে।
            </p>
          </div>

          {/* Direct Install Button if supported */}
          {canInstallPrompt && onTriggerInstall && (
            <button
              type="button"
              onClick={() => {
                onTriggerInstall();
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold py-3 px-4 rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm min-h-[48px]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>সরাসরি এক-ক্লিকে ইনস্টল করুন (Install Now)</span>
            </button>
          )}

          {/* Platform Segmented Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActivePlatform('android')}
              className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 min-h-[40px] ${
                activePlatform === 'android'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Android (অ্যান্ড্রয়েড)</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform('ios')}
              className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 min-h-[40px] ${
                activePlatform === 'ios'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>iPhone / iOS (অ্যাপল)</span>
            </button>
          </div>

          {/* Android Steps */}
          {activePlatform === 'android' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Chrome / Edge ব্রাউজার থেকে ইনস্টল করার ৩টি সহজ ধাপ:
              </h4>

              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ১
                  </span>
                  <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    ব্রাউজারের উপরের ডানদিকের <strong>তিনটি ডট মেনু (⋮)</strong> চাপুন।
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ২
                  </span>
                  <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    মেনু থেকে <strong>&quot;Install app&quot;</strong> অথবা <strong>&quot;Add to Home screen&quot;</strong> (হোম স্ক্রিনে যোগ করুন)-এ ট্যাপ করুন।
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ৩
                  </span>
                  <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    পপ-আপে <strong>&quot;Install&quot;</strong> কনফার্ম করুন। আপনার মোবাইলের অ্যাপ ড্রয়ার ও হোম স্ক্রিনে নেটিভ অ্যাপের মতো আইকন চলে আসবে!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* iOS Steps */}
          {activePlatform === 'ios' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Safari ব্রাউজার থেকে iPhone / iPad-এ ইনস্টল করার ধাপ:
              </h4>

              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ১
                  </span>
                  <div className="flex-1 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    Safari ব্রাউজারের নিচের টুলবারে থাকা <strong>Share (শেয়ার ⎋)</strong> বাটনে ট্যাপ করুন।
                  </div>
                  <Share2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ২
                  </span>
                  <div className="flex-1 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    মেনু কিছুটা নিচে স্ক্রল করে <strong>&quot;Add to Home Screen&quot; (+)</strong>-এ ট্যাপ করুন।
                  </div>
                  <PlusSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ৩
                  </span>
                  <div className="flex-1 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    উপরে ডানদিকের <strong>&quot;Add&quot;</strong> বাটনে চাপুন। ব্যস, এটি আপনার iPhone-এ একটি ফুলস্ক্রিন নেটিভ অ্যাপে পরিণত হবে!
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                </div>
              </div>
            </div>
          )}

          {/* Features note */}
          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              ইনস্টল করা অ্যাপের বিশেষ সুবিধাসমূহ:
            </p>
            <ul className="list-disc list-inside space-y-0.5 pl-1">
              <li>দ্রুত ও স্বাচ্ছন্দ্যে যেকোনো সময় সহজে শেখা যায়</li>
              <li>ব্রাউজার ফ্রেম ছাড়া ফুলস্ক্রিন নেটিভ অ্যাপের অনুভূতি</li>
              <li>আপনার শেখার অগ্রগতি স্বয়ংক্রিয়ভাবে মেমোরিতে সেভ থাকে</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-bold px-6 py-2.5 rounded-xl text-xs transition active:scale-95 min-h-[44px]"
          >
            বুঝেছি, ধন্যবাদ
          </button>
        </div>
      </div>
    </div>
  );
};
