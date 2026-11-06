import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <h2 className="text-3xl font-black mb-2">পৃষ্ঠাটি পাওয়া যায়নি (404)</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all"
      >
        প্রধান পৃষ্ঠায় ফিরে যান
      </Link>
    </div>
  );
}
