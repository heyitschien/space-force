import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ArTopic } from '../data/arTopicContent';
import {
  WR_INTRO,
  WR_PATTERN_MAP,
  WR_PATTERNS,
  WR_SPEED_DRILL,
} from '../data/workRatePatternContent';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';
import { Level1MemorySprint } from './Level1MemorySprint';
import {
  getLevel1MemoryDeck,
  type Level1MemoryTopicId,
} from '../data/level1MemoryDecks';

interface WorkRateTopicLayoutProps {
  topic: ArTopic;
}

const PATTERN_EMOJI: Record<number, string> = {
  1: '👷',
  2: '🔻',
  3: '⏳',
  4: '🚪',
  5: '📈',
};

const GOAL_EMOJIS = ['⚙️', '➕', '➖', '📐', '🔁'] as const;

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

export function WorkRateTopicLayout({ topic }: WorkRateTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<string>>(new Set());
  const [revealedPracticeIds, setRevealedPracticeIds] = useState<Set<string>>(new Set());

  const memoryDeck = getLevel1MemoryDeck(topic.id);
  const memoryTopicId = topic.id as Level1MemoryTopicId;

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
              🔧
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
              🔧
            </span>
            {WR_INTRO.headline}
          </h2>
          <p className="mb-2 text-sm font-semibold text-slate-600">
            <span className="mr-1.5" aria-hidden>
              🎯
            </span>
            {WR_INTRO.tagline}
          </p>
          <p className="mb-4 text-slate-700">
            <span className="mr-1.5" aria-hidden>
              💡
            </span>
            {WR_INTRO.insight}
          </p>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {WR_INTRO.goals.map((goal, i) => (
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
                Start here: flip rates (1/time), add or subtract, then flip back to hours.
              </p>
              <p className="mt-1 text-xs text-slate-600">
                <span className="mr-1" aria-hidden>
                  ⏱️
                </span>
                Do a 2-minute memory sprint before the pattern walkthrough.
              </p>
              <a
                href="#think-about-it-memory-game-wr"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                <span aria-hidden>▶️</span>
                Start Today&apos;s 2-Min Drill
              </a>
            </div>
          )}
        </section>

        {memoryDeck.length > 0 && (
          <section id="think-about-it-memory-game-wr" className="mb-10">
            <SectionHeading>🧠 Think About It — Memory Game</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                🎮
              </span>
              Retrieval sprint for work-rate traps: wrong “average time,” drain vs fill, scaling crews, and
              two-phase stories.
            </p>
            <Level1MemorySprint
              topicId={memoryTopicId}
              deck={memoryDeck}
              title="Think About It: 2-Min Memory Game (Work Rate)"
              subtitle="Rates = 1/time, combine with +/−, partial jobs, pipes and crews."
            />
          </section>
        )}

        <section className="mb-10">
          <SectionHeading>🔺 Core Formula</SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-2 font-mono text-lg font-bold text-rose-800">
              <span className="mr-2" aria-hidden>
                📏
              </span>
              work = rate × time · one job = 1
            </p>
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                🔺
              </span>
              Same structure as distance = speed × time — “speed” here is jobs per hour.
            </p>
            <FormulaBlock>{`rate_one = 1 / (hours to finish alone)
combined_rate = r₁ + r₂ + …   (subtract drains)
time_to_finish = (job left) ÷ relevant_rate`}</FormulaBlock>
            <p className="mt-4 text-sm font-medium text-slate-700">
              <span className="mr-1" aria-hidden>
                🧩
              </span>
              Read the story once for phase boundaries (join late, someone leaves, tank already partly full).
            </p>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🗺️ Work rate patterns</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              👀
            </span>
            Match the story to a pattern before you crunch numbers.
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
                  <th className="px-4 py-3 font-bold text-slate-800">Key trick</th>
                </tr>
              </thead>
              <tbody>
                {WR_PATTERN_MAP.map((row) => (
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

        {topic.testQuestionIds.length === 0 && (
          <section className="mb-10 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm">
            <p className="text-sm font-semibold text-amber-900">
              <span className="mr-1.5" aria-hidden>
                📋
              </span>
              No work-rate items in the current 90-question JSON pool
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Use the pattern lessons and speed drills on this page, then take a full Arithmetic Reasoning
              practice test. For extra multi-step MC practice, open the repo file{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-xs">2-arithmetic-reasoning/work-rate.md</code>{' '}
              (elite synthetic set with answer key).
            </p>
          </section>
        )}

        {WR_PATTERNS.map((pattern) => {
          const practiceId = `wr-practice-${pattern.id}`;
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
                    High trap rate on the ASVAB — always find how much of the job is left before phase 2.
                  </p>
                )}
                {pattern.id === 4 && (
                  <p className="text-sm font-medium text-amber-800">
                    <span className="mr-1" aria-hidden>
                      ⚠️
                    </span>
                    Read “total time” vs “how many more hours” carefully.
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
                    <p className="mt-3 font-semibold text-rose-800">Answer: {pattern.example.answer}</p>
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
                      <span className="shrink-0 font-mono font-semibold text-rose-700">{pattern.practice.answer}</span>
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

        <section className="mb-10">
          <SectionHeading>⚡ Speed drill</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              ⏱️
            </span>
            Short test-style stems—still full sentences. Tap to check your rate and time flip.
          </p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {WR_SPEED_DRILL.map((item, idx) => {
              const id = `wr-spd-${idx}`;
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
                    <span className="font-semibold text-rose-700">{item.answer}</span>
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
