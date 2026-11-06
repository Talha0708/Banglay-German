'use client';

import React, { useState } from 'react';
import { Volume2, Calculator, Sparkles, Euro, Phone, Calendar, ArrowRight } from 'lucide-react';
import { speakGerman } from '../lib/speech';

export interface NumberItem {
  num: number;
  german: string;
  bengali: string;
  breakdownBn?: string;
  exampleDe?: string;
  exampleBn?: string;
}

// 0 to 12 fundamentals
export const BASIC_0_TO_12: NumberItem[] = [
  { num: 0, german: 'null', bengali: '০ (শূন্য)', exampleDe: 'Null Grad', exampleBn: 'শূন্য ডিগ্রি' },
  { num: 1, german: 'eins', bengali: '১ (এক)', exampleDe: 'Ein Kaffee, bitte', exampleBn: 'একটি কফি, দয়া করে' },
  { num: 2, german: 'zwei', bengali: '২ (দুই)', exampleDe: 'Zwei Euro', exampleBn: 'দুই ইউরো' },
  { num: 3, german: 'drei', bengali: '৩ (তিন)', exampleDe: 'Drei Freunde', exampleBn: 'তিন বন্ধু' },
  { num: 4, german: 'vier', bengali: '৪ (চার)', exampleDe: 'Vier Jahreszeiten', exampleBn: 'চার ঋতু' },
  { num: 5, german: 'fünf', bengali: '৫ (পাঁচ)', exampleDe: 'Fünf Minuten', exampleBn: 'পাঁচ মিনিট' },
  { num: 6, german: 'sechs', bengali: '৬ (ছয়)', exampleDe: 'Sechs Uhr', exampleBn: 'ছয়টা বাজে' },
  { num: 7, german: 'sieben', bengali: '৭ (সাত)', exampleDe: 'Sieben Tage', exampleBn: 'সাত দিন' },
  { num: 8, german: 'acht', bengali: '৮ (আট)', exampleDe: 'Acht Stunden', exampleBn: 'আট ঘণ্টা' },
  { num: 9, german: 'neun', bengali: '৯ (নয়)', exampleDe: 'Neun Euro', exampleBn: 'নয় ইউরো' },
  { num: 10, german: 'zehn', bengali: '১০ (দশ)', exampleDe: 'Zehn Prozent', exampleBn: 'দশ শতাংশ' },
  { num: 11, german: 'elf', bengali: '১১ (এগারো)', exampleDe: 'Elf Spieler', exampleBn: 'এগারো জন খেলোয়াড়' },
  { num: 12, german: 'zwölf', bengali: '১২ (বারো)', exampleDe: 'Zwölf Monate', exampleBn: 'বারো মাস' },
];

// 13 to 19 (-zehn)
export const TEENS_13_TO_19: NumberItem[] = [
  { num: 13, german: 'dreizehn', bengali: '১৩ (তেরো)', breakdownBn: 'drei + zehn' },
  { num: 14, german: 'vierzehn', bengali: '১৪ (চৌদ্দ)', breakdownBn: 'vier + zehn' },
  { num: 15, german: 'fünfzehn', bengali: '১৫ (পনেরো)', breakdownBn: 'fünf + zehn' },
  { num: 16, german: 'sechzehn', bengali: '১৬ (ষোলো)', breakdownBn: 'sech(s) + zehn (s বাদ যায়)' },
  { num: 17, german: 'siebzehn', bengali: '১৭ (সতেরো)', breakdownBn: 'sieb(en) + zehn (en বাদ যায়)' },
  { num: 18, german: 'achtzehn', bengali: '১৮ (আঠারো)', breakdownBn: 'acht + zehn' },
  { num: 19, german: 'neunzehn', bengali: '১৯ (উনিশ)', breakdownBn: 'neun + zehn' },
];

// Tens 20 to 100
export const TENS_20_TO_100: NumberItem[] = [
  { num: 20, german: 'zwanzig', bengali: '২০ (বিশ)' },
  { num: 30, german: 'dreißig', bengali: '৩০ (ত্রিশ)', breakdownBn: 'লক্ষ্য করুন: -ßig দিয়ে লেখা হয়' },
  { num: 40, german: 'vierzig', bengali: '৪০ (চল্লিশ)' },
  { num: 50, german: 'fünfzig', bengali: '৫০ (পঞ্চাশ)' },
  { num: 60, german: 'sechzig', bengali: '৬০ (ষাট)', breakdownBn: 'sech(s) + zig' },
  { num: 70, german: 'siebzig', bengali: '৭০ (সত্তর)', breakdownBn: 'sieb(en) + zig' },
  { num: 80, german: 'achtzig', bengali: '৮০ (আশি)' },
  { num: 90, german: 'neunzig', bengali: '৯০ (নব্বই)' },
  { num: 100, german: 'hundert', bengali: '১০০ (একশত)', breakdownBn: 'বা einhundert' },
  { num: 1000, german: 'tausend', bengali: '১০০০ (এক হাজার)', breakdownBn: 'বা eintausend' },
];

// Algorithm to calculate German word for any number 0 to 999
export function numberToGerman(n: number): { german: string; breakdownBn: string } {
  if (n < 0 || n > 999) return { german: String(n), breakdownBn: '' };
  if (n <= 12) {
    const item = BASIC_0_TO_12.find((x) => x.num === n);
    return { german: item?.german || '', breakdownBn: 'মৌলিক সংখ্যা' };
  }
  if (n <= 19) {
    const item = TEENS_13_TO_19.find((x) => x.num === n);
    return { german: item?.german || '', breakdownBn: item?.breakdownBn || '' };
  }

  const tensWords: Record<number, string> = {
    20: 'zwanzig',
    30: 'dreißig',
    40: 'vierzig',
    50: 'fünfzig',
    60: 'sechzig',
    70: 'siebzig',
    80: 'achtzig',
    90: 'neunzig',
  };

  const onesWords: Record<number, string> = {
    1: 'ein',
    2: 'zwei',
    3: 'drei',
    4: 'vier',
    5: 'fünf',
    6: 'sechs',
    7: 'sieben',
    8: 'acht',
    9: 'neun',
  };

  const onesBn: Record<number, string> = {
    1: 'এক',
    2: 'দুই',
    3: 'তিন',
    4: 'চার',
    5: 'পাঁচ',
    6: 'ছয়',
    7: 'সাত',
    8: 'আট',
    9: 'নয়',
  };

  const tensBn: Record<number, string> = {
    20: 'বিশ',
    30: 'ত্রিশ',
    40: 'চল্লিশ',
    50: 'পঞ্চাশ',
    60: 'ষাট',
    70: 'সত্তর',
    80: 'আশি',
    90: 'নব্বই',
  };

  if (n < 100) {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    if (ones === 0) {
      return { german: tensWords[tens], breakdownBn: `${tensBn[tens]}` };
    }
    const german = `${onesWords[ones]}und${tensWords[tens]}`;
    const breakdown = `${onesBn[ones]} (${onesWords[ones]}) + und (এবং) + ${tensBn[tens]} (${tensWords[tens]})`;
    return { german, breakdownBn: breakdown };
  }

  if (n === 100) return { german: 'hundert', breakdownBn: 'একশত' };

  if (n < 1000) {
    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;
    const prefix = (hundreds === 1 ? 'ein' : onesWords[hundreds]) + 'hundert';
    if (remainder === 0) return { german: prefix, breakdownBn: `${hundreds} শত` };
    const remResult = numberToGerman(remainder);
    return {
      german: prefix + remResult.german,
      breakdownBn: `${hundreds} শত + ${remResult.breakdownBn}`,
    };
  }

  return { german: 'tausend', breakdownBn: 'এক হাজার' };
}

export const NumbersStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'basics' | 'prices' | 'years'>('calculator');
  const [selectedNum, setSelectedNum] = useState<number>(21);

  const calculated = numberToGerman(selectedNum);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            0–100
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              জার্মান সংখ্যা ও দাম স্টুডিও (০–১০০+)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              মৌলিক গণনা, ২১–৯৯ সূত্র, দাম, বছর ও ফোন নম্বর
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'calculator'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          সংখ্যা কনভার্টার (০–১০০)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('basics')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'basics'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          ০–২০ এবং দশক তালিকা
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('prices')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'prices'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          দাম ও কেনাকাটা (€)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('years')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'years'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          সাল ও ফোন নম্বর
        </button>
      </div>

      {/* TAB 1: INTERACTIVE CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 dark:from-emerald-950/40 dark:to-teal-950/20 border border-emerald-200/80 dark:border-emerald-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-600" />
                লাইভ সংখ্যা নির্মাতা
              </span>
              <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                {selectedNum}
              </span>
            </div>

            {/* Slider & Quick selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>০</span>
                <span>৫০</span>
                <span>১০০</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedNum}
                onChange={(e) => setSelectedNum(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[0, 1, 7, 12, 17, 21, 35, 48, 60, 77, 99, 100].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSelectedNum(n)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition ${
                    selectedNum === n
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Calculated Output Display */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-800 shadow-sm flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                  জার্মান বানান:
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {calculated.german}
                </h4>
                {calculated.breakdownBn && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">সূত্র:</span>
                    <span>{calculated.breakdownBn}</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => speakGerman(calculated.german)}
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>উচ্চারণ</span>
              </button>
            </div>
          </div>

          {/* 21 to 99 Formula Highlight */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs space-y-1.5">
            <h5 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              ২১ থেকে ৯৯ পর্যন্ত সংখ্যার গোপন সূত্র
            </h5>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              জার্মান ভাষায় এককের অঙ্ক আগে বসে, মাঝে <strong>&apos;und&apos; (এবং)</strong>, তারপর দশকের অঙ্ক।
              <br />
              যেমন: <strong>২১ = এক এবং বিশ</strong> (ein + und + zwanzig = <span className="font-bold text-emerald-700 dark:text-emerald-300">einundzwanzig</span>)
              <br />
              <strong>৩৫ = পাঁচ এবং ত্রিশ</strong> (fünf + und + dreißig = <span className="font-bold text-emerald-700 dark:text-emerald-300">fünfunddreißig</span>)
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: 0-20 & TENS */}
      {activeTab === 'basics' && (
        <div className="space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
              ০ থেকে ১২ পর্যন্ত (মুখস্থ করতে হবে):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BASIC_0_TO_12.map((item) => (
                <div
                  key={item.num}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                      {item.num}: {item.german}
                    </span>
                    <span className="text-[11px] text-slate-500 block">{item.bengali}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(item.german)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
              ১৩ থেকে ১৯ (-zehn যুক্ত সংখ্যা):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TEENS_13_TO_19.map((item) => (
                <div
                  key={item.num}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                      {item.num}: {item.german}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{item.breakdownBn}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(item.german)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
              দশকের সংখ্যা (২০, ৩০, ৪০ ... ১০০, ১০০০):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TENS_20_TO_100.map((item) => (
                <div
                  key={item.num}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                      {item.num}: {item.german}
                    </span>
                    <span className="text-[11px] text-slate-500 block">{item.bengali}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(item.german)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRICES & SHOPPING */}
      {activeTab === 'prices' && (
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Euro className="w-4 h-4 text-emerald-600" />
              ইউরো (€) ও সেন্ট (Cent) বলার নিয়ম
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              জার্মানিতে দশমিক বিন্দুকে কমা (,) হিসেবে লেখা হয়। বলার সময় প্রথমে ইউরো সংখ্যা, তারপর &apos;Euro&apos;, তারপর সেন্টের সংখ্যা বলা হয় (অথবা সংক্ষেপে শুধু দুটি সংখ্যা)।
            </p>
          </div>

          <div className="space-y-2">
            {[
              { price: '2,50 €', de: 'zwei Euro fünfzig', bn: '২ ইউরো ৫০ সেন্ট' },
              { price: '1,99 €', de: 'ein Euro neunundneunzig', bn: '১ ইউরো ৯৯ সেন্ট' },
              { price: '0,75 €', de: 'fünfundsiebzig Cent', bn: '৭৫ সেন্ট' },
              { price: '15,00 €', de: 'fünfzehn Euro', bn: '১৫ ইউরো' },
              { price: 'Was kostet das?', de: 'Was kostet das? - Das kostet 4 Euro.', bn: 'এটার দাম কত? - এটার দাম ৪ ইউরো।' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm">
                    {p.price} : {p.de}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">{p.bn}</span>
                </div>
                <button
                  type="button"
                  onClick={() => speakGerman(p.de)}
                  className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: YEARS & PHONE NUMBERS */}
      {activeTab === 'years' && (
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              সাল ও বছর বলার নিয়ম (Jahreszahlen)
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • ২০০০ সালের আগের বছরগুলো শতক হিসেবে ভাঙা হয়:
              <br />
              <strong>1995</strong> = 19 + hundert + 95 = <span className="font-bold text-emerald-600">neunzehnhundertfünfundneunzig</span>
              <br />
              • ২০০০ সালের পরের বছর স্বাভাবিক গণনা:
              <br />
              <strong>2024</strong> = 2000 + 24 = <span className="font-bold text-emerald-600">zweitausendvierundzwanzig</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-600" />
              ফোন নম্বর বলার নিয়ম (Telefonnummer)
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              ফোন নম্বর সাধারণত প্রতিটি অঙ্ক আলাদা আলাদা করে বলা হয়:
              <br />
              <strong>0176 4321</strong> = null-eins-sieben-sechs ... vier-drei-zwei-eins
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
