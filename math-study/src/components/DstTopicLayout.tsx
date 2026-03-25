import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
import {
  DST_INTRO,
  DST_PATTERN_MAP,
  DST_PATTERNS,
  DST_SPEED_DRILL,
  DST_TEST_QUESTION_SOLUTIONS,
} from '../data/dstPatternContent';
import { getArQuestionById } from '../utils/arQuestionLookup';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';
import { Level1MemorySprint } from './Level1MemorySprint';
import {
  getLevel1MemoryDeck,
  type Level1MemoryTopicId,
} from '../data/level1MemoryDecks';

interface DstTopicLayoutProps {
  topic: ArTopic;
}

/** Visual anchors for the six DST patterns (table, section titles, goals). */
const PATTERN_EMOJI: Record<number, string> = {
  1: '🚗',
  2: '↔️',
  3: '🏃',
  4: '🔁',
  5: '🌊',
  6: '⛽',
};

const GOAL_EMOJIS = ['🚗', '↔️', '🏃', '🔁', '🌊', '⛽'] as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
      {children}
    </h2>
  );
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
      {children}
    </pre>
  );
}

function PatternSubhead({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      <span className="mr-1.5" aria-hidden>
        {emoji}
      </span>
      {children}
    </p>
  );
}

export function DstTopicLayout({ topic }: DstTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<string>>(new Set());
  const [revealedPracticeIds, setRevealedPracticeIds] = useState<Set<string>>(new Set());

  const memoryDeck = getLevel1MemoryDeck(topic.id);
  const memoryTopicId = topic.id as Level1MemoryTopicId;

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
              🛣️
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
              🛣️
            </span>
            {DST_INTRO.headline}
          </h2>
          <p className="mb-2 text-sm font-semibold text-slate-600">
            <span className="mr-1.5" aria-hidden>
              🎯
            </span>
            {DST_INTRO.tagline}
          </p>
          <p className="mb-4 text-slate-700">
            <span className="mr-1.5" aria-hidden>
              💡
            </span>
            {DST_INTRO.insight}
          </p>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {DST_INTRO.goals.map((goal, i) => (
              <li key={goal} className="flex gap-2 rounded-lg bg-rose-50 px-3 py-2">
                <span className="shrink-0" aria-hidden>
                  {GOAL_EMOJIS[i] ?? '📌'}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
          {memoryDeck.length > 0 && (
            <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
              <p className="text-sm font-semibold text-indigo-900">
                <span className="mr-1.5" aria-hidden>
                  🧠
                </span>
                Start here for today: lock in d = vt and the six motion patterns first.
              </p>
              <p className="mt-1 text-xs text-slate-600">
                <span className="mr-1" aria-hidden>
                  ⏱️
                </span>
                Do a 2-minute memory sprint before the full lesson.
              </p>
              <a
                href="#think-about-it-memory-game"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                <span aria-hidden>▶️</span>
                Start Today&apos;s 2-Min Drill
              </a>
            </div>
          )}
        </section>

        {memoryDeck.length > 0 && (
          <section id="think-about-it-memory-game" className="mb-10">
            <SectionHeading>🧠 Think About It — Memory Game</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                🎮
              </span>
              Play this 2-minute retrieval sprint daily. It uses spaced review and immediate feedback
              to strengthen long-term memory of distance–speed–time setups and ASVAB motion traps.
            </p>
            <Level1MemorySprint
              topicId={memoryTopicId}
              deck={memoryDeck}
              title="Think About It: 2-Min Memory Game (Distance, Speed & Time)"
              subtitle="Retrieval sprint: d = vt, separation, catch-up, round-trip average speed, current, and fuel pipeline."
            />
          </section>
        )}

        {/* Section 1 — Core Formula */}
        <section className="mb-10">
          <SectionHeading>🔺 Core Formula</SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-2 font-mono text-lg font-bold text-rose-800">
              <span className="mr-2" aria-hidden>
                📏
              </span>
              d = vt
            </p>
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                🔺
              </span>
              Memory triangle: cover the variable you want.
            </p>
            <FormulaBlock>{`      D
     ---
     S  T

Distance = Speed × Time
Speed = Distance ÷ Time
Time = Distance ÷ Speed`}</FormulaBlock>
            <p className="mt-4 text-sm font-medium text-slate-700">
              <span className="mr-1" aria-hidden>
                🧩
              </span>
              Distance problems = identify motion pattern
            </p>
          </div>
        </section>

        {/* Section 2 — Pattern Recognition Map */}
        <section className="mb-10">
          <SectionHeading>🗺️ Distance-Speed-Time Patterns</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              👀
            </span>
            Recognize patterns immediately. Each maps to a key trick.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800" title="Visual cue">
                    🎨
                  </th>
                  <th className="px-4 py-3 font-bold text-slate-800">Pattern</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Situation</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Key Trick</th>
                </tr>
              </thead>
              <tbody>
                {DST_PATTERN_MAP.map((row) => (
                  <tr
                    key={row.pattern}
                    className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-rose-50/40"
                  >
                    <td className="px-4 py-3 text-lg" title={row.situation}>
                      <span aria-hidden>{PATTERN_EMOJI[row.pattern]}</span>
                    </td>
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
        {DST_PATTERNS.map((pattern) => {
          const practiceId = `practice-${pattern.id}`;
          const practiceOpen = revealedPracticeIds.has(practiceId);
          return (
            <section key={pattern.id} className="mb-10">
              <SectionHeading>
                {PATTERN_EMOJI[pattern.id]} Pattern {pattern.id}: {pattern.name}
              </SectionHeading>
              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {pattern.id === 3 && (
                  <p className="text-sm font-medium text-amber-800">
                    <span className="mr-1" aria-hidden>
                      ⚠️
                    </span>
                    These are the most difficult on the ASVAB.
                  </p>
                )}
                {pattern.id === 4 && (
                  <p className="text-sm font-medium text-amber-800">
                    <span className="mr-1" aria-hidden>
                      ⚠️
                    </span>
                    Common trick problem.
                  </p>
                )}
                <div>
                  <PatternSubhead emoji="👁️">Visual</PatternSubhead>
                  <FormulaBlock>{pattern.visual}</FormulaBlock>
                </div>
                <div>
                  <PatternSubhead emoji="📐">Formula</PatternSubhead>
                  <FormulaBlock>{pattern.formula}</FormulaBlock>
                </div>
                <div>
                  <PatternSubhead emoji="✍️">Example</PatternSubhead>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="mb-3 text-sm font-semibold text-slate-800">{pattern.example.problem}</p>
                    <ol className="list-inside list-decimal space-y-2 text-sm text-slate-700">
                      {pattern.example.steps.map((step, i) => (
                        <li key={i} className="pl-1">
                          <span className="font-mono text-rose-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 font-semibold text-rose-800">✅ Answer: {pattern.example.answer}</p>
                  </div>
                </div>
                <div>
                  <PatternSubhead emoji="⚡">Shortcut</PatternSubhead>
                  <p className="text-sm font-medium text-slate-700">{pattern.shortcut}</p>
                </div>
                <div>
                  <PatternSubhead emoji="🎯">Practice</PatternSubhead>
                  <button
                    type="button"
                    onClick={() => togglePractice(practiceId)}
                    className="flex w-full flex-wrap items-start justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-left text-sm transition-colors hover:bg-rose-50"
                  >
                    <span className="min-w-0 font-medium text-slate-800">{pattern.practice.problem}</span>
                    {practiceOpen ? (
                      <span className="shrink-0 font-mono font-semibold text-rose-700">
                        <span className="mr-1" aria-hidden>
                          ✅
                        </span>
                        {pattern.practice.answer}
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs text-slate-500">
                        <span aria-hidden>👆 </span>Tap for answer
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </section>
          );
        })}

        {/* Section 9 — Speed Drill */}
        <section className="mb-10">
          <SectionHeading>⚡ Speed Drill</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              ⏱️
            </span>
            Rapid mental practice. These should take under 5 seconds each.
          </p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {DST_SPEED_DRILL.map((item, idx) => {
              const id = `spd-${idx}`;
              const open = revealedDrillIds.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleDrill(id)}
                  className="flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-left text-sm transition-colors hover:bg-rose-50"
                >
                  <span className="font-medium text-slate-800">
                    <span className="mr-1.5" aria-hidden>
                      🧮
                    </span>
                    {item.problem}
                  </span>
                  {open ? (
                    <span className="font-semibold text-rose-700">
                      <span className="mr-1" aria-hidden>
                        ✅
                      </span>
                      {item.answer}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">
                      <span aria-hidden>👆 </span>Tap for answer
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 10 — From the Test */}
        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>📝 Problems from the Actual Test</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                📋
              </span>
              Real questions from the 90-question pool. Click to reveal the correct answer and solution
              steps.
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
                      type="button"
                      onClick={() => toggleQuestion(q.id)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="min-w-0 font-medium text-slate-800">
                        <span className="mr-2 shrink-0" aria-hidden>
                          ❓
                        </span>
                        {q.text}
                      </span>
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
                              <span className="mr-1" aria-hidden>
                                🧩
                              </span>
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
                          <span className="mr-1" aria-hidden>
                            ✅
                          </span>
                          Correct answer: {correctOption?.text ?? q.correct}
                        </p>
                        <div className="mt-2 text-sm text-slate-600">
                          <span className="mr-1" aria-hidden>
                            🔤
                          </span>
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
