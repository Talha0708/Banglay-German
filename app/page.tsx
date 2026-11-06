'use client';

import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('../components/HomeClient'), {
  ssr: false,
  loading: () => (
    <div
      suppressHydrationWarning
      className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    >
      {/* App Header Skeleton */}
      <header className="relative w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-2.5">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-200 dark:border-blue-800 animate-pulse" />
            <div>
              <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-3 w-36 bg-slate-100 dark:bg-slate-850 rounded mt-1 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-8 space-y-4">
        <div className="h-28 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
        <div className="h-44 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
        <div className="h-36 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
      </main>
    </div>
  ),
});

export default function Page() {
  return <HomeClient />;
}
