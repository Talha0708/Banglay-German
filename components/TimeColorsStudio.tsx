'use client';

import React, { useState } from 'react';
import { Volume2, Clock, Calendar, Palette, Sparkles, Sun, CloudRain } from 'lucide-react';
import { speakGerman } from '../lib/speech';

export const DAYS_OF_WEEK = [
  { de: 'Montag', bn: 'সোমবার', prep: 'am Montag (সোমবারে)' },
  { de: 'Dienstag', bn: 'মঙ্গলবার', prep: 'am Dienstag (মঙ্গলবারে)' },
  { de: 'Mittwoch', bn: 'বুধবার', prep: 'am Mittwoch (বুধবারে)' },
  { de: 'Donnerstag', bn: 'বৃহস্পতিবার', prep: 'am Donnerstag (বৃহস্পতিবারে)' },
  { de: 'Freitag', bn: 'শুক্রবার', prep: 'am Freitag (শুক্রবারে)' },
  { de: 'Samstag', bn: 'শনিবার', prep: 'am Samstag (শনিবারে)' },
  { de: 'Sonntag', bn: 'রবিবার', prep: 'am Sonntag (রবিবারে)' },
];

export const MONTHS = [
  { num: 1, de: 'Januar', bn: 'জানুয়ারি', season: 'Winter' },
  { num: 2, de: 'Februar', bn: 'ফেব্রুয়ারি', season: 'Winter' },
  { num: 3, de: 'März', bn: 'মার্চ', season: 'Frühling' },
  { num: 4, de: 'April', bn: 'এপ্রিল', season: 'Frühling' },
  { num: 5, de: 'Mai', bn: 'মে', season: 'Frühling' },
  { num: 6, de: 'Juni', bn: 'জুন', season: 'Sommer' },
  { num: 7, de: 'Juli', bn: 'জুলাই', season: 'Sommer' },
  { num: 8, de: 'August', bn: 'আগস্ট', season: 'Sommer' },
  { num: 9, de: 'September', bn: 'সেপ্টেম্বর', season: 'Herbst' },
  { num: 10, de: 'Oktober', bn: 'অক্টোবর', season: 'Herbst' },
  { num: 11, de: 'November', bn: 'নভেম্বর', season: 'Herbst' },
  { num: 12, de: 'Dezember', bn: 'ডিসেম্বর', season: 'Winter' },
];

export const SEASONS = [
  { de: 'der Frühling', bn: 'বসন্তকাল', prep: 'im Frühling' },
  { de: 'der Sommer', bn: 'গ্রীষ্মকাল', prep: 'im Sommer' },
  { de: 'der Herbst', bn: 'শরৎকাল', prep: 'im Herbst' },
  { de: 'der Winter', bn: 'শীতকাল', prep: 'im Winter' },
];

export const TIME_EXAMPLES = [
  { digital: '08:00', official: 'acht Uhr', informal: 'acht Uhr', bn: 'আটটা' },
  { digital: '08:05', official: 'acht Uhr fünf', informal: 'fünf nach acht', bn: 'আটটা বেজে পাঁচ মিনিট' },
  { digital: '08:15', official: 'acht Uhr fünfzehn', informal: 'Viertel nach acht', bn: 'সোয়া আটটা' },
  { digital: '08:30', official: 'acht Uhr dreißig', informal: 'halb neun', bn: 'সাড়ে আটটা (নয়টার অর্ধেক বাকি!)' },
  { digital: '08:45', official: 'acht Uhr fünfundvierzig', informal: 'Viertel vor neun', bn: 'পৌনে নয়টা' },
  { digital: '08:55', official: 'acht Uhr fünfundfünfzig', informal: 'fünf vor neun', bn: 'নয়টা বাজতে পাঁচ মিনিট' },
  { digital: '14:30', official: 'vierzehn Uhr dreißig', informal: 'halb drei', bn: 'আড়াইটা (পরের ঘণ্টা ৩ এর অর্ধেক)' },
];

export const COLORS = [
  { de: 'rot', bn: 'লাল', hex: '#ef4444', textLight: true, example: 'Der Apfel ist rot.' },
  { de: 'blau', bn: 'নীল', hex: '#3b82f6', textLight: true, example: 'Der Himmel ist blau.' },
  { de: 'grün', bn: 'সবুজ', hex: '#10b981', textLight: true, example: 'Das Gras ist grün.' },
  { de: 'gelb', bn: 'হলুদ', hex: '#eab308', textLight: false, example: 'Die Sonne ist gelb.' },
  { de: 'schwarz', bn: 'কালো', hex: '#0f172a', textLight: true, example: 'Der Kaffee ist schwarz.' },
  { de: 'weiß', bn: 'সাদা', hex: '#ffffff', textLight: false, border: true, example: 'Der Schnee ist weiß.' },
  { de: 'grau', bn: 'ধূসর', hex: '#64748b', textLight: true, example: 'Das Auto ist grau.' },
  { de: 'braun', bn: 'বাদামি', hex: '#78350f', textLight: true, example: 'Das Brot ist braun.' },
  { de: 'orange', bn: 'কমলা', hex: '#f97316', textLight: true, example: 'Die Orange ist orange.' },
  { de: 'rosa', bn: 'গোলাপি', hex: '#ec4899', textLight: true, example: 'Die Blume ist rosa.' },
  { de: 'lila', bn: 'বেগুনী', hex: '#a855f7', textLight: true, example: 'Das Kleid ist lila.' },
  { de: 'bunt', bn: 'রঙিন', hex: '#6366f1', textLight: true, example: 'Das Bild ist bunt.' },
];

export const TimeColorsStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'days' | 'months' | 'clock' | 'colors'>('days');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            📅
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              দিন, মাস, সময় ও রঙের সম্পূর্ণ স্টুডিও
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সাত দিন, ১২ মাস, ৪ ঋতু, আনুষ্ঠানিক ও কথ্য সময়, রঙের নাম
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('days')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'days'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          সপ্তাহের ৭ দিন
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('months')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'months'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          ১২ মাস ও ৪ ঋতু
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('clock')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'clock'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          ঘড়ির সময় (Uhrzeit)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
            activeTab === 'colors'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          রঙের নাম (Farben)
        </button>
      </div>

      {/* TAB 1: DAYS OF WEEK */}
      {activeTab === 'days' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-1.5">
            <h4 className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              দিনের নামের মূল নিয়ম: Preposition &apos;am&apos;
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              সপ্তাহের প্রতিটি বারের নাম পুংলিঙ্গ (der Montag, der Dienstag...)।
              বারের আগে সবসময় <strong>&apos;am&apos; (an + dem)</strong> বসে!
              যেমন: <strong>am Montag</strong> = সোমবারে, <strong>am Wochenende</strong> = সাপ্তাহিক ছুটিতে।
            </p>
          </div>

          <div className="space-y-2">
            {DAYS_OF_WEEK.map((d, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-indigo-600 dark:text-indigo-400">
                      {d.de}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      ({d.bn})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    ব্যবহার: {d.prep}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => speakGerman(d.de)}
                  className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MONTHS & SEASONS */}
      {activeTab === 'months' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1.5">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              মাস ও ঋতুর মূল নিয়ম: Preposition &apos;im&apos;
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              মাসের ও ঋতুর আগে সবসময় <strong>&apos;im&apos; (in + dem)</strong> বসে!
              যেমন: <strong>im Januar</strong> = জানুয়ারিতে, <strong>im Sommer</strong> = গ্রীষ্মকালে।
            </p>
          </div>

          {/* 4 Seasons */}
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
              ৪ ঋতুর নাম (Jahreszeiten):
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {SEASONS.map((s, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 block">
                      {s.de}
                    </span>
                    <span className="text-[11px] text-slate-500">{s.bn}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(s.de)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 12 Months */}
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
              ১২ মাসের নাম (Monate):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MONTHS.map((m) => (
                <div
                  key={m.num}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <span className="font-black text-sm text-indigo-600 dark:text-indigo-400 block">
                      {m.num}. {m.de}
                    </span>
                    <span className="text-[11px] text-slate-500">{m.bn}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(m.de)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLOCK TIME */}
      {activeTab === 'clock' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              জার্মান সময়ের রহস্য: &apos;halb&apos; মানে পরবর্তী ঘণ্টার অর্ধেক!
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              কথ্য জার্মানে <strong>halb drei</strong> মানে ৩:৩০ নয়, বরং <strong>২:৩০ (আড়াইটা)</strong>!
              কারণ এটি তিনটার দিকে অর্ধেক পথ পৌঁছেছে!
              <br />
              • নির্দিষ্ট সময়ের আগে <strong>&apos;um&apos;</strong> বসে: <strong>um 8 Uhr</strong> (আটটায়)।
            </p>
          </div>

          <div className="space-y-2">
            {TIME_EXAMPLES.map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {t.digital}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      কথ্য: <strong className="text-indigo-600 dark:text-indigo-400">{t.informal}</strong>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    আনুষ্ঠানিক: {t.official} | অর্থ: {t.bn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => speakGerman(t.informal)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COLORS */}
      {activeTab === 'colors' && (
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-blue-600" />
              রঙের নাম ও বাক্যে ব্যবহার
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              ট্যাপ করে সঠিক উচ্চারণ শুনুন ও উদাহরণ দেখুন।
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {COLORS.map((c, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => speakGerman(`${c.de}. ${c.example}`)}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-blue-400 transition flex items-center gap-2.5 text-left active:scale-95 shadow-xs"
              >
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 shadow-inner ${c.border ? 'border border-slate-300' : ''}`}
                  style={{ backgroundColor: c.hex }}
                />
                <div className="overflow-hidden">
                  <span className="font-black text-sm text-slate-900 dark:text-white block truncate">
                    {c.de}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {c.bn}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
