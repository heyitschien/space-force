import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { ParagraphComprehensionTestLauncher } from '../components/ParagraphComprehensionTestLauncher';

export function ParagraphComprehensionPage() {
  const [testOpen, setTestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="text-sm font-medium text-emerald-700 underline-offset-4 hover:text-emerald-900 hover:underline"
          >
            Back to Math Study
          </Link>
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
            Paragraph Comprehension — ASVAB Prep
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="rounded-xl bg-emerald-100 p-3">
              <BookOpen className="h-8 w-8 text-emerald-800" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Practice tests</h2>
              <p className="mt-2 text-slate-600">
                Timed reading comprehension: passages with main idea, detail, and inference
                items from your three practice PDFs. Keys follow Wiley Exam 1 explanations for
                practice-1 and practice-3 (same PC section in both) and the ASVABer answer key for
                practice-2.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTestOpen(true)}
            className="w-full rounded-xl bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:bg-emerald-500 active:scale-[0.99] sm:w-auto"
          >
            Open Paragraph Comprehension tests
          </button>
        </div>
      </main>

      {testOpen && <ParagraphComprehensionTestLauncher onClose={() => setTestOpen(false)} />}
    </div>
  );
}
