import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { WordKnowledgeTestLauncher } from '../components/WordKnowledgeTestLauncher';

export function WordKnowledgePage() {
  const [testOpen, setTestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="text-sm font-medium text-violet-700 underline-offset-4 hover:text-violet-900 hover:underline"
          >
            Back to Math Study
          </Link>
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">Word Knowledge — ASVAB Prep</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="rounded-xl bg-violet-100 p-3">
              <BookOpen className="h-8 w-8 text-violet-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Practice tests</h2>
              <p className="mt-2 text-slate-600">
                Timed vocabulary practice built from your three ASVAB practice PDF extractions
                (synonyms, context sentences, and antonyms). Choose a fixed form, a mixed draw, or
                adaptive (CAT-style) pacing. Answer keys were added editorially where the PDF did not
                include them.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTestOpen(true)}
            className="w-full rounded-xl bg-violet-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:bg-violet-500 active:scale-[0.99] sm:w-auto"
          >
            Open Word Knowledge tests
          </button>
        </div>
      </main>

      {testOpen && <WordKnowledgeTestLauncher onClose={() => setTestOpen(false)} />}
    </div>
  );
}
