import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
import {
  DST_PATTERN_MAP,
  DST_PATTERNS,
  DST_SPEED_DRILL,
  DST_TEST_QUESTION_SOLUTIONS,
} from '../data/dstPatternContent';
import { getArQuestionById } from '../utils/arQuestionLookup';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';

interface DstTopicLayoutProps {
  topic: ArTopic;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
      {children}
    </h2>
  );
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
      {children}
    </pre>
  );
}

export function DstTopicLayout({ topic }: DstTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<number>>(new Set());

  const toggleQuestion = (id: string) => {
    setExpandedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleDrill = (idx: number) => {
    setRevealedDrillIds((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
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
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
            {topic.title} — Arithmetic Reasoning
          </h1>
          <button
            onClick={() => setPracticeTestOpen(true)}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-500"
          >
            Practice Test
          </button>
        </div>
      </header>

      <ArLevelTopicNav currentTopicId={topic.id} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="mb-8 text-slate-600">Master the 6 motion patterns used on the ASVAB</p>

        {/* Section 1 — Core Formula */}
        <section className="mb-10">
          <SectionHeading>Core Formula</SectionHeading>
          <p className="mb-2 font-mono text-lg font-bold text-rose-800">d = vt</p>
          <p className="mb-4 text-sm text-slate-600">Memory triangle: cover the variable you want.</p>
          <FormulaBlock>{`      D
     ---
     S  T

Distance = Speed × Time
Speed = Distance ÷ Time
Time = Distance ÷ Speed`}</FormulaBlock>
          <p className="mt-4 text-sm font-medium text-slate-700">
            Distance problems = identify motion pattern
          </p>
        </section>

        {/* Section 2 — Pattern Recognition Map */}
        <section className="mb-10">
          <SectionHeading>Distance-Speed-Time Patterns</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Recognize patterns immediately. Each maps to a key trick.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800">Pattern</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Situation</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Key Trick</th>
                </tr>
              </thead>
              <tbody>
                {DST_PATTERN_MAP.map((row) => (
                  <tr key={row.pattern} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-mono font-medium text-rose-700">{row.pattern}</td>
                    <td className="px-4 py-3 text-slate-700">{row.situation}</td>
                    <td className="px-4 py-3 text-slate-700">{row.keyTrick}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sections 3–8 — Per-pattern blocks */}
        {DST_PATTERNS.map((pattern) => (
          <section key={pattern.id} className="mb-10">
            <SectionHeading>
              Pattern {pattern.id}: {pattern.name}
            </SectionHeading>
            {pattern.id === 3 && (
              <p className="mb-4 text-sm font-medium text-amber-800">
                These are the most difficult on the ASVAB.
              </p>
            )}
            {pattern.id === 4 && (
              <p className="mb-4 text-sm font-medium text-amber-800">Common trick problem.</p>
            )}
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-600">Visual</h3>
                <FormulaBlock>{pattern.visual}</FormulaBlock>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-600">Formula</h3>
                <FormulaBlock>{pattern.formula}</FormulaBlock>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-600">Example</h3>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="mb-3 font-medium text-slate-800">{pattern.example.problem}</p>
                  <div className="space-y-1 font-mono text-sm text-rose-700">
                    {pattern.example.steps.map((step, i) => (
                      <div key={i}>{step}</div>
                    ))}
                  </div>
                  <p className="mt-3 font-semibold text-rose-800">Answer: {pattern.example.answer}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-600">Shortcut</h3>
                <p className="font-medium text-slate-700">{pattern.shortcut}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-600">Practice</h3>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="mb-2 font-medium text-slate-800">{pattern.practice.problem}</p>
                  <p className="font-mono text-sm text-rose-700">
                    <span className="font-semibold">Answer: </span>
                    {pattern.practice.answer}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Section 9 — Speed Drill */}
        <section className="mb-10">
          <SectionHeading>Speed Drill</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Rapid mental practice. These should take under 5 seconds each.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {DST_SPEED_DRILL.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleDrill(idx)}
                className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-rose-200 hover:bg-rose-50/30"
              >
                <p className="font-mono font-medium text-slate-800">{item.problem}</p>
                {revealedDrillIds.has(idx) ? (
                  <p className="mt-2 font-mono text-sm font-bold text-rose-700">{item.answer}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Click to reveal</p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Section 10 — From the Test */}
        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>From the Test</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              Real questions from the 90-question pool. Click to reveal the correct answer and
              solution steps.
            </p>
            <div className="space-y-4">
              {topic.testQuestionIds.map((qId) => {
                const q = getArQuestionById(qId);
                if (!q) return null;
                const isExpanded = expandedQuestionIds.has(q.id);
                const correctOption = q.options.find((o) => o.id === q.correct);
                const solution = DST_TEST_QUESTION_SOLUTIONS[q.id];
                return (
                  <div
                    key={q.id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      onClick={() => toggleQuestion(q.id)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="font-medium text-slate-800">{q.text}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-rose-50/50 px-6 py-4">
                        {solution && (
                          <>
                            <p className="mb-2 font-semibold text-rose-800">
                              Pattern: {solution.patternLabel}
                            </p>
                            <ol className="mb-4 list-inside list-decimal space-y-1 text-sm text-slate-700">
                              {solution.solutionSteps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          </>
                        )}
                        <p className="font-semibold text-rose-800">
                          Correct answer: {correctOption?.text ?? q.correct}
                        </p>
                        <div className="mt-2 text-sm text-slate-600">
                          Options: {q.options.map((o) => `${o.id}) ${o.text}`).join(' · ')}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPracticeTestOpen(true)}
            className="rounded-xl bg-rose-600 px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-rose-500"
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
