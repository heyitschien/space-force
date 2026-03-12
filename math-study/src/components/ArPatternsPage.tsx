import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AR_20_PATTERNS } from '../data/ar20Patterns';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';

export function ArPatternsPage() {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Math Study
          </Link>
          <div className="flex gap-2">
            <Link
              to="/arithmetic-reasoning/pattern-drill"
              className="rounded-lg border-2 border-rose-600 px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
            >
              Pattern Drill
            </Link>
            <button
              onClick={() => setPracticeTestOpen(true)}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-500"
            >
              Practice Test
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-10 rounded-xl border-2 border-rose-200 bg-rose-50/50 p-6">
          <h1 className="mb-2 text-2xl font-bold text-rose-800">
            Master these 20 patterns. Solve most AR questions in 10–20 seconds.
          </h1>
          <p className="text-slate-700">
            That&apos;s how people score <strong>90+ AFQT</strong>. The ASVAB loves repeating the same structures with
            different numbers. Recognize the pattern → apply the formula → done.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {AR_20_PATTERNS.map((pattern) => (
            <div
              key={pattern.id}
              id={`pattern-${pattern.id}`}
              className="flex flex-col rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-rose-300 hover:shadow-md"
            >
              <span className="mb-2 inline-block w-fit rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
                #{pattern.id}
              </span>
              <h3 className="mb-1 font-bold text-slate-800">{pattern.name}</h3>
              <p className="mb-2 font-mono text-sm text-rose-700">{pattern.formula}</p>
              <p className="mb-3 text-xs text-slate-600">{pattern.quickExample}</p>
              <div className="mt-auto flex flex-wrap gap-1">
                {pattern.topicIds.map((topicId) => (
                  <Link
                    key={topicId}
                    to={`/arithmetic-reasoning/${topicId}`}
                    className="rounded-md bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700 transition-colors hover:bg-rose-200"
                  >
                    Study {topicId.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/arithmetic-reasoning/pattern-drill"
            className="rounded-xl border-2 border-rose-600 px-6 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-50"
          >
            Start Pattern Drill
          </Link>
          <button
            onClick={() => setPracticeTestOpen(true)}
            className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-rose-500"
          >
            Take Arithmetic Reasoning Practice Test
          </button>
        </div>
      </main>

      {practiceTestOpen && (
        <ArithmeticReasoningTestLauncher onClose={() => setPracticeTestOpen(false)} />
      )}
    </div>
  );
}
