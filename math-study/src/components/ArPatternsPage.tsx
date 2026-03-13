import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ArPatternFamily } from '../data/ar20Patterns';
import { AR_20_PATTERNS, AR_PATTERN_FAMILIES } from '../data/ar20Patterns';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';

const FAMILY_STYLES: Record<
  ArPatternFamily,
  { card: string; badge: string; link: string }
> = {
  percent: {
    card: 'border-l-4 border-amber-500 bg-amber-50/30 hover:border-amber-600',
    badge: 'bg-amber-100 text-amber-800',
    link: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  },
  'ratio-rate': {
    card: 'border-l-4 border-emerald-500 bg-emerald-50/30 hover:border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-800',
    link: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
  },
  'motion-work': {
    card: 'border-l-4 border-sky-500 bg-sky-50/30 hover:border-sky-600',
    badge: 'bg-sky-100 text-sky-800',
    link: 'bg-sky-100 text-sky-700 hover:bg-sky-200',
  },
  geometry: {
    card: 'border-l-4 border-violet-500 bg-violet-50/30 hover:border-violet-600',
    badge: 'bg-violet-100 text-violet-800',
    link: 'bg-violet-100 text-violet-700 hover:bg-violet-200',
  },
  arithmetic: {
    card: 'border-l-4 border-slate-500 bg-slate-50/50 hover:border-slate-600',
    badge: 'bg-slate-100 text-slate-800',
    link: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  },
};

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
        <div className="mb-4 rounded-lg border border-slate-200 bg-slate-100/80 px-4 py-3 text-center text-sm font-medium text-slate-700">
          ASVAB Rule: 1. Identify the pattern → 2. Apply the formula → 3. Solve quickly
        </div>

        <div className="mb-10 rounded-xl border-2 border-rose-200 bg-rose-50/50 p-6">
          <h1 className="mb-2 text-2xl font-bold text-rose-800">
            Master these 20 patterns. Solve most AR questions in 10–20 seconds.
          </h1>
          <p className="text-slate-700">
            That&apos;s how people score <strong>90+ AFQT</strong>. The ASVAB loves repeating the same structures with
            different numbers. Recognize the pattern → apply the formula → done.
          </p>
        </div>

        <div className="mb-8 space-y-10">
          {AR_PATTERN_FAMILIES.map((family, index) => {
            const patterns = AR_20_PATTERNS.filter((p) => p.family === family.id);
            const styles = FAMILY_STYLES[family.id];
            return (
              <section key={family.id}>
                <h2 className="mb-4 text-lg font-bold text-slate-800">
                  {index + 1}. {family.label}
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {patterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      id={`pattern-${pattern.id}`}
                      className={`flex flex-col rounded-xl border-2 border-slate-200 p-4 shadow-sm transition-all ${styles.card}`}
                    >
                      <span
                        className={`mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-xs font-bold ${styles.badge}`}
                      >
                        #{pattern.id}
                      </span>
                      <h3 className="mb-1 font-bold text-slate-800">{pattern.name}</h3>
                      <p className="mb-2 font-mono text-sm text-slate-700">{pattern.formula}</p>
                      <p className="mb-3 text-xs text-slate-600">{pattern.quickExample}</p>
                      <div className="mt-auto flex flex-wrap gap-1">
                        {pattern.topicIds.map((topicId) => (
                          <Link
                            key={topicId}
                            to={`/arithmetic-reasoning/${topicId}`}
                            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${styles.link}`}
                          >
                            Study {topicId.replace(/-/g, ' ')}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
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
