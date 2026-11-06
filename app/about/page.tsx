'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Phone, Copy, ChevronRight, CheckCircle2 } from 'lucide-react';
import aboutData from '../../data/about.json';
import { BrandFooter } from '../../components/BrandFooter';
import { AdBanner } from '../../components/AdBanner';
import { A1CourseBanner } from '../../components/A1CourseBanner';
import { useAppStore } from '../../store/useAppStore';

export default function AboutPage() {
  const explanationLang = useAppStore((state) => state.settings.explanationLang);
  const darkMode = useAppStore((state) => state.settings.darkMode);
  const isEn = explanationLang === 'en';
  const [copiedToast, setCopiedToast] = useState(false);

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }
  }, [darkMode]);

  const handleCopyPhone = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(aboutData.developer.phone);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = aboutData.developer.phone;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      // Still show copied state as graceful fallback
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased"
    >
      {/* Sticky Header with Back Button */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 min-h-[44px] min-w-[44px] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? 'Back to App' : 'অ্যাপে ফিরে যান'}</span>
          </Link>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            {isEn ? 'About App' : 'অ্যাপ সম্পর্কে'}
          </span>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Corporate Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 space-y-6">
        {/* 1. Hero Header */}
        <section className="text-center space-y-3 pt-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-700 p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-blue-600/40">
            <Image
              src="/icon.svg"
              alt="Banglay German Icon"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {aboutData.appName}
              </h1>
            </div>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
              {aboutData.appName_bn}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
              {isEn ? aboutData.tagline_en : aboutData.tagline_bn}
            </p>
          </div>
        </section>

        {/* 2. Highlights Strip (3 Stat tiles separated by thin 1px dividers) */}
        <section className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm py-4">
          {aboutData.highlights.map((h, i) => (
            <div key={i} className="text-center px-2">
              <span className="text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400 block tracking-tight">
                {h.value}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                {isEn ? h.label_en : h.label_bn}
              </span>
            </div>
          ))}
        </section>

        {/* 3. Our Mission (with thin primary-color accent line on the left) */}
        <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {isEn ? 'Our Mission' : 'আমাদের লক্ষ্য'}
          </h2>
          <div className="border-l-2 border-blue-600 pl-3.5 py-0.5">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
              {isEn ? aboutData.mission_en : aboutData.mission_bn}
            </p>
          </div>
        </section>

        {/* 4. About the App (Purpose text) */}
        <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {isEn ? 'About the App' : 'অ্যাপ সম্পর্কে'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn ? aboutData.purpose_en : aboutData.purpose_bn}
          </p>
        </section>

        {/* 5. Why We Built This (Checklist) */}
        <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {isEn ? 'Why We Built This' : 'কেন তৈরি করা হয়েছে'}
          </h2>
          <ul className="space-y-2.5">
            {(isEn ? aboutData.whyBuilt_en : aboutData.whyBuilt_bn).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                <div className="w-4 h-4 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Developer Profile Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 flex items-center gap-3.5">
            {/* Circular avatar with initials "TB" */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white font-bold text-base flex items-center justify-center shadow-sm shrink-0">
              TB
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {aboutData.developer.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn ? aboutData.developer.role_en : aboutData.developer.role_bn}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/80 divide-y divide-slate-100 dark:divide-slate-800/80">
            {/* Contact Action Row 1: Facebook */}
            <a
              href={aboutData.developer.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[48px] text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                  f
                </span>
                <span>Facebook প্রোফাইল</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            {/* Note under Facebook Profile */}
            <div className="px-5 py-3 bg-blue-50/70 dark:bg-blue-950/40 border-t border-blue-100/70 dark:border-blue-900/50">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEn ? aboutData.developer.support_message_en : aboutData.developer.support_message_bn}
              </p>
            </div>

            {/* Contact Action Row 2: Call */}
            <a
              href={`tel:${aboutData.developer.phoneIntl}`}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[48px] text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>সরাসরি কল করুন ({aboutData.developer.phone})</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            {/* Contact Action Row 3: Copy Number */}
            <button
              type="button"
              onClick={handleCopyPhone}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[48px] text-xs font-medium text-slate-700 dark:text-slate-200 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Copy className="w-3.5 h-3.5" />
                </div>
                <span>ফোন নম্বর কপি করুন ({aboutData.developer.phone})</span>
              </div>
              {copiedToast ? (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> কপি হয়েছে!
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </section>

        {/* Paid German A1 One-Shot Video Course Section (Directly under Developer Contact) */}
        <div id="a1-course" className="scroll-mt-16">
          <A1CourseBanner className="mt-4" />
        </div>

        {/* Advertisement Placement */}
        <AdBanner slot="300x250" />

        {/* 7. BrandFooter */}
        <BrandFooter className="pt-2" />
      </main>

      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>নম্বর কপি হয়েছে</span>
        </div>
      )}
    </div>
  );
}
