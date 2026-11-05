'use client';

import React from 'react';
import Link from 'next/link';
import aboutData from '../data/about.json';

interface BrandFooterProps {
  className?: string;
}

export const BrandFooter: React.FC<BrandFooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={`w-full border-t border-slate-200 dark:border-slate-800/80 pt-6 pb-8 px-4 text-center ${className}`}
    >
      <div className="max-w-md mx-auto space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
        <p className="font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
          {aboutData.appName}{' '}
          <span className="font-normal text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/60 ml-1">
            v{aboutData.version}
          </span>
        </p>
        <p>Developed by {aboutData.developer.name}</p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          © {aboutData.year} {aboutData.appName}. All rights reserved.
        </p>
        <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Link
            href="/about"
            className="hover:underline transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 rounded px-1 min-h-[36px] inline-flex items-center"
          >
            About (অ্যাপ সম্পর্কে)
          </Link>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <a
            href={aboutData.developer.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 rounded px-1 min-h-[36px] inline-flex items-center"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};
