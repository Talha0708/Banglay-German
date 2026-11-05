'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Share2, PlusSquare } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua) && !standalone;
  });
  const [isStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });
  const [showIOSModal, setShowIOSModal] = useState(false);

  const dismissed = useAppStore((state) => state.dismissedInstallBanner);
  const dismiss = useAppStore((state) => state.dismissInstallBanner);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (isStandalone || dismissed) {
    return null;
  }

  // If neither Android prompt is ready nor iOS detected, don't display
  if (!deferredPrompt && !isIOS) {
    return null;
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        dismiss();
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white px-4 py-3 border-b border-blue-800/60 shadow-sm animate-in fade-in duration-300">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/40 border border-blue-400/30 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">মোবাইলে ইনস্টল করুন</p>
              <p className="text-[11px] text-blue-200/80 leading-tight">
                ইন্টারনেট ছাড়াই সম্পূর্ণ অফলাইনে শিখুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm transition min-h-[36px] flex items-center gap-1.5"
            >
              ইনস্টল
            </button>
            <button
              type="button"
              onClick={dismiss}
              aria-label="বিজ্ঞপ্তি বন্ধ করুন"
              className="text-blue-200/60 hover:text-white p-1 rounded-lg transition min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                iPhone / iPad এ যোগ করুন
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Safari ব্রাউজারে অ্যাপটির চমৎকার অভিজ্ঞতা পেতে হোম স্ক্রিনে যোগ করুন:
            </p>

            <ol className="space-y-3 text-xs text-slate-700 dark:text-slate-200">
              <li className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-[11px] shrink-0">
                  ১
                </span>
                <span className="flex-1">
                  Safari টুলবারের নিচে <strong>Share (শেয়ার)</strong> বাটনে ট্যাপ করুন।
                </span>
                <Share2 className="w-4 h-4 text-blue-500 shrink-0" />
              </li>
              <li className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-[11px] shrink-0">
                  ২
                </span>
                <span className="flex-1">
                  একটু নিচে স্ক্রল করে <strong>Add to Home Screen</strong> এ চাপুন।
                </span>
                <PlusSquare className="w-4 h-4 text-blue-500 shrink-0" />
              </li>
            </ol>

            <button
              type="button"
              onClick={() => {
                setShowIOSModal(false);
                dismiss();
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-xs transition active:scale-98 min-h-[44px]"
            >
              বুঝেছি (সমাপ্ত)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
