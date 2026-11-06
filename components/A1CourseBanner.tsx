'use client';

import React, { useState } from 'react';
import {
  Play,
  Clock,
  Calendar,
  Sparkles,
  Phone,
  Copy,
  CheckCircle2,
  AlertCircle,
  Award,
  Video,
  Check,
  Star,
  Globe,
} from 'lucide-react';
import aboutData from '../data/about.json';

interface A1CourseBannerProps {
  className?: string;
  compact?: boolean;
}

export const A1CourseBanner: React.FC<A1CourseBannerProps> = ({
  className = '',
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = aboutData.developer.phone || '01987573397';
  const phoneIntl = aboutData.developer.phoneIntl || '+8801987573397';

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(phoneNumber);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      aria-label="Paid German A1 One-Shot Video Course"
      className={`relative overflow-hidden rounded-3xl border border-amber-300 dark:border-amber-500/40 bg-gradient-to-b from-amber-50/70 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 p-5 sm:p-6 shadow-xl shadow-amber-500/5 ${className}`}
    >
      {/* Decorative ambient background accents */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-400/15 dark:bg-amber-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-2xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          <span>Exclusive Video Course</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300/70 dark:border-amber-800/60 px-2.5 py-0.5 rounded-full">
          <Award className="w-3.5 h-3.5" />
          <span>CEFR A1 Standard</span>
        </span>
      </div>

      {/* Main Title */}
      <div className="relative z-10 space-y-1.5 mb-4">
        <div className="flex items-start gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              Paid German A1 One-Shot Video Course Available!
            </h3>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              জার্মান A1 সম্পূর্ণ ও বিরল মাস্টারক্লাস কোর্স
            </p>
          </div>
        </div>
      </div>

      {/* 3 Key Fast Facts Highlights */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        <div className="p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">কোর্সের ব্যাপ্তি</p>
            <p className="text-xs font-black text-slate-900 dark:text-white truncate">১১ ঘণ্টা ৫২ মি.</p>
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">প্রস্তুতির সময়</p>
            <p className="text-xs font-black text-slate-900 dark:text-white truncate">২০–৩০ দিনেই A1</p>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">আন্তর্জাতিক স্বীকৃতি</p>
            <p className="text-xs font-black text-slate-900 dark:text-white truncate">শীর্ষ ইনস্টিটিউট মান</p>
          </div>
        </div>
      </div>

      {/* Main Description Paragraphs */}
      <div className="relative z-10 space-y-3 text-xs text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              মাত্র <strong className="text-amber-700 dark:text-amber-400">১১ ঘণ্টা ৫২ মিনিটের</strong> একটি সম্পূর্ণ One-Shot ভিডিও কোর্স। নিয়মিত পড়াশোনা ও অনুশীলনের মাধ্যমে মাত্র <strong className="text-emerald-700 dark:text-emerald-400">২০–৩০ দিনের মধ্যেই</strong> German A1 Level সম্পন্ন করতে পারবেন।
            </span>
          </p>
        </div>

        {/* Highlight Card: Famous Instructor's Rare Course */}
        <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-600/15 dark:from-amber-950/60 dark:via-orange-950/40 dark:to-slate-900 border-2 border-amber-400/90 dark:border-amber-400/60 shadow-lg shadow-amber-500/10 space-y-2.5">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 dark:bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

          {/* Top highlight badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
              <Star className="w-3 h-3 fill-white" />
              <span>বিরল আন্তর্জাতিক মাস্টারক্লাস</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-900/50 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-700/60">
              <Globe className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>ইনস্টিটিউট মানদণ্ড</span>
            </span>
          </div>

          {/* Main Highlight Text */}
          <div className="relative z-10 flex items-start gap-3 pt-0.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 mt-0.5">
              <Award className="w-5 h-5 fill-white/20" />
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-amber-50 leading-relaxed">
                এটি একজন বিখ্যাত প্রশিক্ষকের <span className="text-amber-800 dark:text-amber-300 font-black underline decoration-amber-400/70 underline-offset-3">অত্যন্ত বিরল একটি কোর্স</span>, যা ভারত, নেপাল ও ফিলিপাইনের বিভিন্ন <span className="bg-amber-200/80 dark:bg-amber-400/20 px-1.5 py-0.5 rounded text-slate-900 dark:text-white font-black border border-amber-300/80 dark:border-amber-500/30">German Language Institute</span>-এর প্রশিক্ষকরাও A1 শেখানোর ক্ষেত্রে অনুসরণ করেন।
              </p>

              {/* Country Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/95 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-amber-200 dark:border-slate-700 shadow-2xs flex items-center gap-1">
                  🇮🇳 ভারত
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/95 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-amber-200 dark:border-slate-700 shadow-2xs flex items-center gap-1">
                  🇳🇵 নেপাল
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/95 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-amber-200 dark:border-slate-700 shadow-2xs flex items-center gap-1">
                  🇵🇭 ফিলিপাইন
                </span>
                <span className="text-[9.5px] font-medium text-amber-700 dark:text-amber-400 ml-auto">
                  Goethe A1 Benchmarked
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Information Callout Box */}
        <div className="p-3.5 rounded-2xl bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/70 text-slate-800 dark:text-amber-100 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <span className="font-bold text-amber-900 dark:text-amber-300">
              বিশেষ তথ্য:
            </span>{' '}
            <span>
              ভিডিওটি একসময় YouTube-এ সীমিত সময়ের জন্য বিনামূল্যে প্রকাশ করা হয়েছিল। পরবর্তীতে Instructor নিজেই ভিডিওটি YouTube থেকে সরিয়ে নেন।
            </span>
          </div>
        </div>
      </div>

      {/* CTA Box with Call & Copy Buttons */}
      <div className="relative z-10 pt-2 border-t border-amber-200/80 dark:border-slate-800 space-y-2.5">
        <p className="text-center text-xs font-black text-slate-800 dark:text-slate-200">
          বিস্তারিত জানতে সরাসরি কল করুন:{' '}
          <span className="font-mono text-emerald-700 dark:text-emerald-400 tracking-wider">
            {phoneNumber}
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Direct Call Button */}
          <a
            href={`tel:${phoneIntl}`}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition min-h-[46px]"
          >
            <Phone className="w-4 h-4" />
            <span>সরাসরি কল করুন ({phoneNumber})</span>
          </a>

          {/* Copy Number Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-bold text-xs shadow-xs transition min-h-[46px]"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">নম্বর কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>নম্বর কপি করুন ({phoneNumber})</span>
              </>
            )}
          </button>
        </div>

        {/* Optional WhatsApp Link */}
        <div className="text-center pt-1">
          <a
            href={`https://wa.me/880${phoneNumber.replace(/^0/, '')}?text=${encodeURIComponent('German A1 One-Shot Video Course সম্পর্কে বিস্তারিত জানতে চাই।')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>অথবা WhatsApp-এ সরাসরি মেসেজ দিন</span>
          </a>
        </div>
      </div>
    </section>
  );
};
