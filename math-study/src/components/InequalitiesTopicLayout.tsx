import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
import {
  INEQ_EXAM_INTRO,
  INEQ_EXAM_PATTERNS,
  INEQ_FINAL_CHECK,
  INEQ_FULL_DRILLS,
  INEQ_GOAL_EMOJIS,
  INEQ_INTRO,
  INEQ_MASTER_FORMULA,
  INEQ_PATTERN_EMOJI,
  INEQ_PRINCIPLES,
  INEQ_SOLVING_FLOW,
  INEQ_SYMBOLS,
  INEQ_TRAINING_TIP,
  INEQ_TRANSLATION_SYSTEM,
  INEQ_YOUR_TURN,
} from '../data/inequalitiesPatternContent';
import { getPatternIdsForTopic } from '../data/ar20Patterns';
import { getArQuestionById } from '../utils/arQuestionLookup';
import {
  AR_TEST_QUESTION_SOLUTIONS,
  type ArTestSolutionStep,
} from '../data/arTestQuestionSolutions';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';

interface InequalitiesTopicLayoutProps {
  topic: ArTopic;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
      {children}
    </h2>
  );
}

function FormulaBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
      {children}
    </pre>
  );
}

function PatternSubhead({ emoji, children }: { emoji: string; children: ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      <span className="mr-1.5" aria-hidden>
        {emoji}
      </span>
      {children}
    </p>
  );
}

export function InequalitiesTopicLayout({ topic }: InequalitiesTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<string>>(new Set());
  const [revealedPracticeIds, setRevealedPracticeIds] = useState<Set<string>>(new Set());
  const [revealedExamSolutionIds, setRevealedExamSolutionIds] = useState<Set<number>>(new Set());

  const patternIds = getPatternIdsForTopic(topic.id);

  const toggleQuestion = (id: string) => {
    setExpandedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleDrill = (id: string) => {
    setRevealedDrillIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePractice = (id: string) => {
    setRevealedPracticeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExamSolution = (id: number) => {
    setRevealedExamSolutionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl min-w-0 items-center justify-between gap-3">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Math Study</span>
          </Link>
          <h1 className="min-w-0 truncate text-center text-base font-bold text-slate-900 sm:text-lg md:text-xl">
            <span className="mr-1" aria-hidden>
              ⚖️
            </span>
            {topic.title} — Arithmetic Reasoning
          </h1>
          <button
            type="button"
            onClick={() => setPracticeTestOpen(true)}
            className="shrink-0 rounded-lg bg-rose-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-rose-500 sm:text-sm"
          >
            <span className="mr-1" aria-hidden>
              📝
            </span>
            Practice Test
          </button>
        </div>
      </header>

      <ArLevelTopicNav currentTopicId={topic.id} />

      <main className="mx-auto max-w-4xl min-w-0 px-4 py-8">
        <section className="mb-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-extrabold text-rose-800 sm:text-2xl">
            <span className="mr-2" aria-hidden>
              ⚖️
            </span>
            {INEQ_INTRO.headline}
          </h2>
          <p className="mb-2 text-sm font-semibold text-slate-600">
            <span className="mr-1.5" aria-hidden>
              🎯
            </span>
            {INEQ_INTRO.tagline}
          </p>
          <p className="mb-4 text-slate-700">
            <span className="mr-1.5" aria-hidden>
              💡
            </span>
            {INEQ_INTRO.insight}
          </p>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {INEQ_INTRO.goals.map((goal, i) => (
              <li key={goal} className="flex gap-2 rounded-lg bg-rose-50 px-3 py-2">
                <span className="shrink-0" aria-hidden>
                  {INEQ_GOAL_EMOJIS[i] ?? '📌'}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mb-10 text-slate-600">{topic.description}</p>

        {patternIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>AR pattern links</SectionHeading>
            <div className="flex flex-wrap items-center gap-2">
              {patternIds.map((pid) => (
                <Link
                  key={pid}
                  to={`/arithmetic-reasoning/patterns#pattern-${pid}`}
                  className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-200"
                >
                  #{pid}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <SectionHeading>🧠 Core idea and symbols</SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-slate-800">An inequality means:</p>
            <ul className="mb-6 list-inside list-disc space-y-1 text-slate-700">
              <li>NOT exact</li>
              <li>A range</li>
              <li>Finding how much is enough / not enough</li>
            </ul>
            <p className="mb-3 text-xs font-bold uppercase text-slate-500">Symbols you must recognize</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 font-bold text-slate-800">Symbol</th>
                    <th className="px-4 py-3 font-bold text-slate-800">Meaning</th>
                    <th className="px-4 py-3 font-bold text-slate-800">Memory trick</th>
                  </tr>
                </thead>
                <tbody>
                  {INEQ_SYMBOLS.map((row) => (
                    <tr key={row.symbol} className="border-b border-slate-100">
                      <td className="px-4 py-3 font-mono font-medium text-rose-700">{row.symbol}</td>
                      <td className="px-4 py-3 text-slate-700">{row.meaning}</td>
                      <td className="px-4 py-3 text-slate-700">{row.memoryTrick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {INEQ_PRINCIPLES.map((principle) => {
          const emoji = INEQ_PATTERN_EMOJI[principle.id] ?? '📌';
          return (
            <section key={principle.id} className="mb-10">
              <SectionHeading>
                {emoji} {principle.sectionTitle}
              </SectionHeading>
              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {principle.id === 3 && (
                  <p className="text-sm font-medium text-amber-800">
                    <span className="mr-1" aria-hidden>
                      ⚠️
                    </span>
                    ASVAB loves this trap — strict vs inclusive boundary.
                  </p>
                )}
                {principle.translationRows && (
                  <div>
                    <PatternSubhead emoji="📋">Translation pattern</PatternSubhead>
                    <div className="overflow-x-auto rounded-lg border border-slate-100">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-4 py-2 font-bold text-slate-800">Words</th>
                            <th className="px-4 py-2 font-bold text-slate-800">Math</th>
                          </tr>
                        </thead>
                        <tbody>
                          {principle.translationRows.map((r) => (
                            <tr key={r.words} className="border-b border-slate-100">
                              <td className="px-4 py-2 text-slate-700">{r.words}</td>
                              <td className="px-4 py-2 font-mono text-rose-700">{r.math}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {principle.keyBullets && principle.keyBullets.length > 0 && (
                  <div>
                    <PatternSubhead emoji="🔑">Key ideas</PatternSubhead>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
                      {principle.keyBullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <PatternSubhead emoji="👁️">Visual</PatternSubhead>
                  <FormulaBlock>{principle.visual}</FormulaBlock>
                </div>
                <div>
                  <PatternSubhead emoji="✍️">{principle.example.title}</PatternSubhead>
                  {principle.example.setupLines?.map((line) => (
                    <p key={line} className="mb-1 text-sm text-slate-700">
                      {line}
                    </p>
                  ))}
                  {principle.example.work.trim() !== '' && (
                    <>
                      <FormulaBlock>{principle.example.work}</FormulaBlock>
                      {principle.example.answer !== '' && (
                        <p className="mt-2 text-sm font-bold text-rose-800">→ {principle.example.answer}</p>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <PatternSubhead emoji="🎯">Practice</PatternSubhead>
                  <div className="space-y-2">
                    {principle.practice.map((item) => {
                      const open = revealedPracticeIds.has(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => togglePractice(item.id)}
                          className="flex w-full flex-wrap items-start justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-left text-sm transition-colors hover:bg-rose-50"
                        >
                          <span className="min-w-0 font-medium text-slate-800">
                            {item.lines.map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                          </span>
                          {open ? (
                            <div className="w-full whitespace-pre-line rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-left font-mono text-xs font-semibold text-rose-800 sm:text-sm">
                              <span className="mr-1" aria-hidden>
                                ✅
                              </span>
                              {item.answer}
                            </div>
                          ) : (
                            <span className="shrink-0 text-xs text-slate-500">
                              <span aria-hidden>👆 </span>Tap for answer
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="mb-10">
          <SectionHeading>🔥 Full ASVAB-style drills</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              🧮
            </span>
            Work each setup; tap to reveal work and answer.
          </p>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {INEQ_FULL_DRILLS.map((d) => {
              const open = revealedDrillIds.has(d.id);
              return (
                <div key={d.id} className="rounded-lg border border-slate-100 bg-slate-50/80 p-4">
                  <p className="mb-2 text-sm font-bold text-slate-800">{d.title}</p>
                  {d.storyLines.map((line) => (
                    <p key={line} className="text-sm text-slate-700">
                      {line}
                    </p>
                  ))}
                  <button
                    type="button"
                    onClick={() => toggleDrill(d.id)}
                    className="mt-3 flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm transition-colors hover:bg-rose-50"
                  >
                    <span className="text-slate-600">{open ? 'Hide solution' : 'Show solution'}</span>
                    {open ? (
                      <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                    )}
                  </button>
                  {open && (
                    <div className="mt-3 border-t border-slate-100 pt-3">
                      <FormulaBlock>{d.work}</FormulaBlock>
                      <p className="mt-2 font-semibold text-rose-800">→ {d.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🧠 Final pattern summary</SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <PatternSubhead emoji="🔑">The master formula</PatternSubhead>
            <FormulaBlock>{INEQ_MASTER_FORMULA}</FormulaBlock>
            <p className="mb-2 mt-6 text-xs font-bold uppercase text-slate-500">Translation system</p>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-2 font-bold text-slate-800">Phrase</th>
                    <th className="px-4 py-2 font-bold text-slate-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {INEQ_TRANSLATION_SYSTEM.map((r) => (
                    <tr key={r.phrase} className="border-b border-slate-100">
                      <td className="px-4 py-2 text-slate-700">{r.phrase}</td>
                      <td className="px-4 py-2 font-mono text-rose-700">{r.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-2 mt-6 text-xs font-bold uppercase text-slate-500">Solving flow</p>
            <ol className="list-inside list-decimal space-y-1 text-sm text-slate-700">
              {INEQ_SOLVING_FLOW.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-rose-800">🚀 Final check</h2>
          <p className="mb-3 text-sm text-slate-600">{INEQ_FINAL_CHECK.leadIn}</p>
          <ul className="mb-4 list-inside list-disc space-y-1 text-slate-700">
            {INEQ_FINAL_CHECK.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="font-semibold text-rose-800">{INEQ_FINAL_CHECK.closing}</p>
        </section>

        <section className="mb-10">
          <SectionHeading>📚 Wordy ASVAB-style patterns</SectionHeading>
          <p className="mb-6 text-sm text-slate-600">{INEQ_EXAM_INTRO}</p>
          {INEQ_EXAM_PATTERNS.map((pat) => {
            const solOpen = revealedExamSolutionIds.has(pat.id);
            return (
              <div key={pat.id} className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  <span className="mr-2" aria-hidden>
                    🧠
                  </span>
                  {pat.title}
                </h3>
                <PatternSubhead emoji="🧪">Problem</PatternSubhead>
                <p className="mb-4 text-slate-700">{pat.problem}</p>
                <button
                  type="button"
                  onClick={() => toggleExamSolution(pat.id)}
                  className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-rose-50"
                >
                  {solOpen ? 'Hide solution' : 'Show solution'}
                  {solOpen ? (
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                  )}
                </button>
                {solOpen && (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase text-slate-500">Solution</p>
                    <ul className="mb-3 space-y-1 text-sm text-slate-700">
                      {pat.solutionLines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    <p className="font-semibold text-rose-800">✅ {pat.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-bold text-slate-900">{INEQ_TRAINING_TIP.title}</h3>
          <p className="mb-3 text-sm text-slate-700">{INEQ_TRAINING_TIP.when}</p>
          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">{INEQ_TRAINING_TIP.stripTitle}</p>
          <ul className="mb-8 list-inside list-disc space-y-1 text-slate-700">
            {INEQ_TRAINING_TIP.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h3 className="mb-2 text-lg font-bold text-rose-800">⚡ Your turn</h3>
          <p className="mb-4 text-sm text-slate-600">Try these without looking:</p>
          <div className="space-y-2">
            {INEQ_YOUR_TURN.map((item, idx) => {
              const open = revealedPracticeIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePractice(item.id)}
                  className="flex w-full flex-wrap items-start justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-left text-sm transition-colors hover:bg-rose-50"
                >
                  <span className="min-w-0 font-medium text-slate-800">
                    {idx + 1}. {item.prompt}
                  </span>
                  {open ? (
                    <div className="w-full whitespace-pre-line rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-left text-xs font-semibold text-rose-800 sm:text-sm">
                      ✅ {item.answer}
                    </div>
                  ) : (
                    <span className="shrink-0 text-xs text-slate-500">
                      <span aria-hidden>👆 </span>Tap for answer
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>📝 Problems from the actual test</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              Real questions from the 90-question pool. Click to reveal the correct answer and solution steps.
            </p>
            <div className="space-y-4">
              {topic.testQuestionIds.map((qId) => {
                const q = getArQuestionById(qId);
                if (!q) return null;
                const isExpanded = expandedQuestionIds.has(q.id);
                const correctOption = q.options.find((o) => o.id === q.correct);
                const solution = AR_TEST_QUESTION_SOLUTIONS[q.id];
                return (
                  <div key={q.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => toggleQuestion(q.id)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="min-w-0 font-medium text-slate-800">{q.text}</span>
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
                            <p className="mb-2 font-semibold text-rose-800">Pattern: {solution.patternLabel}</p>
                            <ol className="mb-4 list-inside list-decimal space-y-3 text-sm text-slate-700">
                              {solution.solutionSteps.map((s: ArTestSolutionStep, i: number) => (
                                <li key={i}>
                                  <span>{s.step}</span>
                                  {s.reason && (
                                    <p className="mt-1 pl-4 text-xs italic text-slate-500">Why: {s.reason}</p>
                                  )}
                                </li>
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
            type="button"
            onClick={() => setPracticeTestOpen(true)}
            className="rounded-xl bg-rose-600 px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-rose-500"
          >
            <span className="mr-2" aria-hidden>
              📋
            </span>
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
