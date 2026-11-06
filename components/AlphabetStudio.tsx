'use client';

import React, { useState } from 'react';
import { SpeakerButton } from './SpeakerButton';
import { Volume2, Sparkles, BookOpen, Search, Check } from 'lucide-react';
import { speakGerman } from '../lib/speech';

export interface AlphabetLetter {
  char: string;
  lower: string;
  nameDe: string;
  pronounceBn: string;
  category: 'vowel' | 'consonant' | 'special';
  wordDe: string;
  wordArticle?: 'der' | 'die' | 'das';
  wordBn: string;
  noteBn?: string;
}

export const GERMAN_ALPHABET: AlphabetLetter[] = [
  { char: 'A', lower: 'a', nameDe: 'Ah', pronounceBn: 'আ', category: 'vowel', wordDe: 'Apfel', wordArticle: 'der', wordBn: 'আপেল', noteBn: 'বাংলা আকারের মতো স্পষ্ট' },
  { char: 'B', lower: 'b', nameDe: 'Beh', pronounceBn: 'বে', category: 'consonant', wordDe: 'Buch', wordArticle: 'das', wordBn: 'বই', noteBn: 'বাংলা "ব" এর মতো' },
  { char: 'C', lower: 'c', nameDe: 'Tseh', pronounceBn: 'ৎসে', category: 'consonant', wordDe: 'Café', wordArticle: 'das', wordBn: 'ক্যাফে', noteBn: 'এককভাবে "ৎস", ক্যাফেতে "ক"' },
  { char: 'D', lower: 'd', nameDe: 'Deh', pronounceBn: 'দে', category: 'consonant', wordDe: 'Danke', wordBn: 'ধন্যবাদ', noteBn: 'বাংলা "দ" এর মতো নরম' },
  { char: 'E', lower: 'e', nameDe: 'Eh', pronounceBn: 'এ', category: 'vowel', wordDe: 'Elefant', wordArticle: 'der', wordBn: 'হাতি', noteBn: 'বাংলা "এ" কারের মতো' },
  { char: 'F', lower: 'f', nameDe: 'Eff', pronounceBn: 'এফ', category: 'consonant', wordDe: 'Familie', wordArticle: 'die', wordBn: 'পরিবার', noteBn: 'বাংলা "ফ" এর মতো' },
  { char: 'G', lower: 'g', nameDe: 'Geh', pronounceBn: 'গে', category: 'consonant', wordDe: 'Guten Tag', wordBn: 'শুভ দিন / হ্যালো', noteBn: 'বাংলা "গ" এর মতো' },
  { char: 'H', lower: 'h', nameDe: 'Hah', pronounceBn: 'হা', category: 'consonant', wordDe: 'Haus', wordArticle: 'das', wordBn: 'বাড়ি', noteBn: 'শব্দের প্রথমে "হ", মাঝে স্বরবর্ণ দীর্ঘ করে' },
  { char: 'I', lower: 'i', nameDe: 'Ee', pronounceBn: 'ই', category: 'vowel', wordDe: 'Igel', wordArticle: 'der', wordBn: 'সজারু', noteBn: 'বাংলা হ্রস্ব "ই"' },
  { char: 'J', lower: 'j', nameDe: 'Yott', pronounceBn: 'ইয়ট (য়)', category: 'consonant', wordDe: 'Jahr', wordArticle: 'das', wordBn: 'বছর', noteBn: 'খুব গুরুত্বপূর্ণ! সবসময় "য়" (Y)' },
  { char: 'K', lower: 'k', nameDe: 'Kah', pronounceBn: 'কা', category: 'consonant', wordDe: 'Kaffee', wordArticle: 'der', wordBn: 'কফি', noteBn: 'বাংলা "ক" এর মতো' },
  { char: 'L', lower: 'l', nameDe: 'Ell', pronounceBn: 'এল', category: 'consonant', wordDe: 'Lampe', wordArticle: 'die', wordBn: 'বাতি', noteBn: 'বাংলা "ল" এর মতো' },
  { char: 'M', lower: 'm', nameDe: 'Emm', pronounceBn: 'এম', category: 'consonant', wordDe: 'Mutter', wordArticle: 'die', wordBn: 'মা', noteBn: 'বাংলা "ম" এর মতো' },
  { char: 'N', lower: 'n', nameDe: 'Enn', pronounceBn: 'এন', category: 'consonant', wordDe: 'Name', wordArticle: 'der', wordBn: 'নাম', noteBn: 'বাংলা "ন" এর মতো' },
  { char: 'O', lower: 'o', nameDe: 'Oh', pronounceBn: 'ও', category: 'vowel', wordDe: 'Orange', wordArticle: 'die', wordBn: 'কমলা', noteBn: 'বাংলা "ও" এর মতো স্পষ্ট' },
  { char: 'P', lower: 'p', nameDe: 'Peh', pronounceBn: 'পে', category: 'consonant', wordDe: 'Pause', wordArticle: 'die', wordBn: 'বিরতি', noteBn: 'বাংলা "প" এর মতো' },
  { char: 'Q', lower: 'q', nameDe: 'Koo', pronounceBn: 'কু (কো)', category: 'consonant', wordDe: 'Quittung', wordArticle: 'die', wordBn: 'রসিদ', noteBn: 'Qu এর উচ্চারণ হয় "ক্ভ" (kv)' },
  { char: 'R', lower: 'r', nameDe: 'Err', pronounceBn: 'এর (র)', category: 'consonant', wordDe: 'Reise', wordArticle: 'die', wordBn: 'ভ্রমণ', noteBn: 'গলার ভেতর থেকে মৃদু "র"' },
  { char: 'S', lower: 's', nameDe: 'Ess', pronounceBn: 'এস', category: 'consonant', wordDe: 'Sonne', wordArticle: 'die', wordBn: 'সূর্য', noteBn: 'ভাওয়েলের আগে "জ" (Z), শেষে "স"' },
  { char: 'T', lower: 't', nameDe: 'Teh', pronounceBn: 'টে (ত/ট)', category: 'consonant', wordDe: 'Tisch', wordArticle: 'der', wordBn: 'টেবিল', noteBn: 'বাংলা "ত/ট" এর মাঝামাঝি' },
  { char: 'U', lower: 'u', nameDe: 'Ooh', pronounceBn: 'উ', category: 'vowel', wordDe: 'Uhr', wordArticle: 'die', wordBn: 'ঘড়ি', noteBn: 'বাংলা "উ" কারের মতো' },
  { char: 'V', lower: 'v', nameDe: 'Fow', pronounceBn: 'ফাউ (ফ)', category: 'consonant', wordDe: 'Vater', wordArticle: 'der', wordBn: 'বাবা', noteBn: 'খুব গুরুত্বপূর্ণ! প্রায়শই "ফ" (F)' },
  { char: 'W', lower: 'w', nameDe: 'Veh', pronounceBn: 'ভে (ভ)', category: 'consonant', wordDe: 'Wasser', wordArticle: 'das', wordBn: 'পানি', noteBn: 'ইংরেজি V বা বাংলা "ভ" এর মতো' },
  { char: 'X', lower: 'x', nameDe: 'Iks', pronounceBn: 'ইক্স', category: 'consonant', wordDe: 'Xylofon', wordArticle: 'das', wordBn: 'জাইলোফোন', noteBn: '"ক্স" এর মতো' },
  { char: 'Y', lower: 'y', nameDe: 'Üpsilon', pronounceBn: 'ইপসিলন', category: 'vowel', wordDe: 'Yoga', wordArticle: 'das', wordBn: 'যোগব্যায়াম', noteBn: 'উমলউট ü বা "ই" এর মতো' },
  { char: 'Z', lower: 'z', nameDe: 'Tsett', pronounceBn: 'ৎসেট (ৎস)', category: 'consonant', wordDe: 'Zug', wordArticle: 'der', wordBn: 'ট্রেন', noteBn: 'খুব গুরুত্বপূর্ণ! সবসময় "ৎস" (ts)' },
  { char: 'Ä', lower: 'ä', nameDe: 'A-Umlaut', pronounceBn: 'এ (অ্যা)', category: 'special', wordDe: 'Äpfel', wordArticle: 'die', wordBn: 'আপেলগুলো', noteBn: 'বাংলা "অ্যা" (যেমন ব্যাট / apple)' },
  { char: 'Ö', lower: 'ö', nameDe: 'O-Umlaut', pronounceBn: 'ও্য (ও/এ)', category: 'special', wordDe: 'Öl', wordArticle: 'das', wordBn: 'তেল', noteBn: 'ঠোঁট গোল করে "এ" উচ্চারণ' },
  { char: 'Ü', lower: 'ü', nameDe: 'U-Umlaut', pronounceBn: 'উ্য (উ/ই)', category: 'special', wordDe: 'Übung', wordArticle: 'die', wordBn: 'অনুশীলন', noteBn: 'ঠোঁট গোল করে "ই" উচ্চারণ' },
  { char: 'ß', lower: 'ß', nameDe: 'Eszett', pronounceBn: 'এস-ৎসেট (স)', category: 'special', wordDe: 'Straße', wordArticle: 'die', wordBn: 'রাস্তা', noteBn: 'তীব্র "স" (scharfes S)' },
];

export const AlphabetStudio: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'rules' | 'special'>('all');
  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter>(GERMAN_ALPHABET[0]);
  const [search, setSearch] = useState('');

  const filteredLetters = GERMAN_ALPHABET.filter((l) => {
    if (filter === 'rules') {
      return ['J', 'W', 'V', 'Z', 'S', 'C'].includes(l.char);
    }
    if (filter === 'special') {
      return l.category === 'special';
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        l.char.toLowerCase().includes(q) ||
        l.wordDe.toLowerCase().includes(q) ||
        l.pronounceBn.includes(q) ||
        l.wordBn.includes(q)
      );
    }
    return true;
  });

  const handlePlayLetter = (l: AlphabetLetter) => {
    setSelectedLetter(l);
    // Speak letter name or full word
    speakGerman(`${l.char}. ${l.wordDe}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            A–Z
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              সম্পূর্ণ জার্মান বর্ণমালা স্টুডিও
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ২৬টি বর্ণ + ৪টি বিশেষ অক্ষর (ট্যাপ করে সাউন্ড শুনুন)
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs font-semibold">
        <button
          type="button"
          onClick={() => { setFilter('all'); setSearch(''); }}
          className={`flex-1 py-1.5 px-2 rounded-lg transition text-center ${
            filter === 'all'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          সব বর্ণ (৩০টি)
        </button>
        <button
          type="button"
          onClick={() => { setFilter('rules'); setSearch(''); }}
          className={`flex-1 py-1.5 px-2 rounded-lg transition text-center ${
            filter === 'rules'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          গুরুত্বপূর্ণ উচ্চারণ (W, V, J, Z)
        </button>
        <button
          type="button"
          onClick={() => { setFilter('special'); setSearch(''); }}
          className={`flex-1 py-1.5 px-2 rounded-lg transition text-center ${
            filter === 'special'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          উমলউট ও ß (৪টি)
        </button>
      </div>

      {/* Active Letter Spotlight Card */}
      {selectedLetter && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-blue-950/40 dark:to-indigo-950/20 border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800 flex items-center justify-center text-3xl font-black text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
              {selectedLetter.char}
              <span className="text-xl text-slate-400 ml-0.5">{selectedLetter.lower}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  জার্মান নাম: <strong className="text-slate-800 dark:text-white">[{selectedLetter.nameDe}]</strong>
                </span>
                <span className="text-xs bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                  ধ্বনি: {selectedLetter.pronounceBn}
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                {selectedLetter.wordArticle && (
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm mr-1.5">
                    {selectedLetter.wordArticle}
                  </span>
                )}
                {selectedLetter.wordDe}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-2">
                  ({selectedLetter.wordBn})
                </span>
              </h4>
              {selectedLetter.noteBn && (
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mt-0.5">
                  💡 {selectedLetter.noteBn}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => speakGerman(selectedLetter.char)}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>অক্ষরের শব্দ</span>
            </button>
            <button
              type="button"
              onClick={() => speakGerman(selectedLetter.wordDe)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              <span>শব্দ উচ্চারণ</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid of Alphabet Tiles */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {filteredLetters.map((item) => {
          const isSelected = selectedLetter.char === item.char;
          return (
            <button
              key={item.char}
              type="button"
              onClick={() => handlePlayLetter(item)}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-between group active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300 dark:ring-blue-900'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
            >
              <div className="flex items-baseline gap-0.5">
                <span className={`text-xl font-black ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {item.char}
                </span>
                <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {item.lower}
                </span>
              </div>
              <span className={`text-[10px] font-bold block mt-0.5 ${isSelected ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}`}>
                {item.pronounceBn}
              </span>
              <span className={`text-[9px] block truncate w-full mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                {item.wordDe}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4 Golden Pronunciation Secrets */}
      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2 text-xs">
        <h4 className="font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          জার্মান বর্ণমালার ৪টি গোল্ডেন নিয়ম
        </h4>
        <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/40">
            <span className="font-black text-blue-600 dark:text-blue-400">W = ভ (V)</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">যেমন: Wasser = ভাসার (পানি)</p>
          </div>
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/40">
            <span className="font-black text-blue-600 dark:text-blue-400">V = ফ (F)</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">যেমন: Vater = ফাটার (বাবা)</p>
          </div>
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/40">
            <span className="font-black text-blue-600 dark:text-blue-400">J = য় (Y)</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">যেমন: Ja = ইয়া (হ্যাঁ)</p>
          </div>
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/40">
            <span className="font-black text-blue-600 dark:text-blue-400">Z = ৎস (TS)</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">যেমন: Zug = ৎসুক (ট্রেন)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
