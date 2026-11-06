'use client';

import React, { useState } from 'react';
import {
  Video,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Info,
} from 'lucide-react';
import aboutData from '../data/about.json';

interface A1CourseBannerProps {
  className?: string;
  compact?: boolean;
}

export const A1CourseBanner: React.FC<A1CourseBannerProps> = ({
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = aboutData.developer.phone || '01987573397';
  const phoneIntl = aboutData.developer.phoneIntl || '+8801987573397';
  const cleanPhoneForWa = phoneNumber.replace(/[^0-9]/g, '').replace(/^0/, '880');
  const whatsappUrl = `https://wa.me/${cleanPhoneForWa}?text=${encodeURIComponent(
    'আসসালামু আলাইকুম, German A1 One-Shot Video Course সম্পর্কে বিস্তারিত জানতে চাই।'
  )}`;

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
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      aria-label="Paid German A1 One-Shot Video Course"
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/60">
          <Video className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10.5px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
            Special Recommendation
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            Paid German A1 One-Shot Video Course Available!
          </h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Paragraph 1 */}
        <p>
          মাত্র ১১ ঘণ্টা ৫২ মিনিটের একটি সম্পূর্ণ One-Shot ভিডিও কোর্স। নিয়মিত পড়াশোনা ও অনুশীলনের মাধ্যমে মাত্র ২০–৩০ দিনের মধ্যেই German A1 Level সম্পন্ন করতে পারবেন।
        </p>

        {/* Paragraph 2 - Bold as requested */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-blue-600 dark:border-blue-500">
          <p className="font-bold text-slate-900 dark:text-slate-100">
            এটি একজন বিখ্যাত প্রশিক্ষকের অত্যন্ত বিরল একটি কোর্স, যা ভারত, নেপাল ও ফিলিপাইনের বিভিন্ন German Language Institute-এর প্রশিক্ষকরাও A1 শেখানোর ক্ষেত্রে অনুসরণ করেন।
          </p>
        </div>

        {/* Special Note Box */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200/90">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold text-amber-950 dark:text-amber-300">বিশেষ তথ্য:</span>{' '}
            ভিডিওটি একসময় YouTube-এ সীমিত সময়ের জন্য বিনামূল্যে প্রকাশ করা হয়েছিল। পরবর্তীতে Instructor নিজেই ভিডিওটি YouTube থেকে সরিয়ে নেন।
          </p>
        </div>
      </div>

      {/* Contact & CTA Section */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          বিস্তারিত জানতে সরাসরি কল করুন:{' '}
          <a
            href={`tel:${phoneIntl}`}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline tracking-wide"
          >
            {phoneNumber}
          </a>
        </p>

        {/* Action Buttons: WhatsApp & Call/Copy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* WhatsApp Direct Link */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp-এ মেসেজ দিন</span>
          </a>

          {/* Direct Call / Copy Button */}
          <div className="flex gap-1.5">
            <a
              href={`tel:${phoneIntl}`}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>কল করুন</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              title="নম্বর কপি করুন"
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs transition flex items-center justify-center"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
