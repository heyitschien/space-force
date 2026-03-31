import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
import {
  WP_BRIDGE_PATTERNS,
  WP_CBD_REMINDER,
  WP_CLOSING_SUMMARY,
  WP_COMMON_MISTAKES,
  WP_DISTRACTOR_STORY,
  WP_INTRO,
  WP_NEXT_STEPS,
  WP_ORDER_TRAPS,
  WP_PATTERN_MAP,
  WP_PATTERN_QUIZ,
  WP_PATTERNS,
  WP_QUICK_RECOGNITION,
  WP_REMAINDER_CASE_PROMPTS,
  WP_ROUNDUP_CASE_PROMPTS,
  WP_SAME_DIVISION_TRAP,
  WP_SPEED_DRILL,
  WP_TRANSLATION_ROWS,
  WP_WORKED_STUDIO,
} from '../data/wordProblemPatternContent';
import { getPatternIdsForTopic } from '../data/ar20Patterns';
import { getArQuestionById } from '../utils/arQuestionLookup';
import {
  AR_TEST_QUESTION_SOLUTIONS,
  type ArTestSolutionStep,
} from '../data/arTestQuestionSolutions';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';

interface WordProblemTopicLayoutProps {
  topic: ArTopic;
}

const PATTERN_EMOJI: Record<number, string> = {
  1: '🔢',
  2: '🪑',
  3: '🚌',
  4: '❓',
};

const GOAL_EMOJIS = ['🎯', '📌', '✍️', '🧮', '🎭', '⚠️'] as const;

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

const ATTACK_SYSTEM = `  ASK          →   DEFINE x    →   TRANSLATE    →   SOLVE    →   INTERPRET
(what want?)      (unknown)        (words→math)      (compute)   (remainder? round up? CBD?)`;

export function WordProblemTopicLayout({ topic }: WordProblemTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<string>>(new Set());
  const [revealedPracticeIds, setRevealedPracticeIds] = useState<Set<string>>(new Set());
  const [revealedQuizIds, setRevealedQuizIds] = useState<Set<string>>(new Set());

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

  const toggleQuiz = (id: string) => {
    setRevealedQuizIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const patternIds = getPatternIdsForTopic(topic.id);

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
              🧩
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
        {patternIds.length > 0 && (
          <div className="mb-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500">Patterns:</span>
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
            <p className="text-sm text-slate-600">
              <Link
                to="/arithmetic-reasoning/pattern-drill?mode=core"
                className="font-medium text-rose-700 underline decoration-rose-300 underline-offset-2 hover:text-rose-800"
              >
                Practice naming the pattern
              </Link>
              {' · '}
              <Link
                to="/arithmetic-reasoning/patterns"
                className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
              >
                All AR patterns
              </Link>
            </p>
          </div>
        )}

        <section className="mb-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-extrabold text-rose-800 sm:text-2xl">
            <span className="mr-2" aria-hidden>
              🧩
            </span>
            {WP_INTRO.headline}
          </h2>
          <p className="mb-2 text-sm font-semibold text-slate-600">
            <span className="mr-1.5" aria-hidden>
              🎯
            </span>
            {WP_INTRO.tagline}
          </p>
          <p className="mb-4 text-slate-700">
            <span className="mr-1.5" aria-hidden>
              💡
            </span>
            {WP_INTRO.insight}
          </p>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {WP_INTRO.goals.map((goal, i) => (
              <li key={goal} className="flex gap-2 rounded-lg bg-rose-50 px-3 py-2">
                <span className="shrink-0" aria-hidden>
                  {GOAL_EMOJIS[i] ?? '📌'}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <SectionHeading>🛠️ Word Problem Attack System</SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                🔁
              </span>
              Run this flow before you commit to arithmetic — especially step{' '}
              <strong>Interpret</strong> (remainder vs round up vs CBD).
            </p>
            <FormulaBlock>{ATTACK_SYSTEM}</FormulaBlock>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🗺️ Translation patterns</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              👀
            </span>
            Pick the row that matches the story, then apply the key trick.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800" title="Cue">
                    🎨
                  </th>
                  <th className="px-4 py-3 font-bold text-slate-800">Pattern</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Situation</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Key trick</th>
                </tr>
              </thead>
              <tbody>
                {WP_PATTERN_MAP.map((row) => (
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

        {WP_PATTERNS.map((pattern) => {
          const practiceId = `wp-practice-${pattern.id}`;
          const practiceOpen = revealedPracticeIds.has(practiceId);
          return (
            <section key={pattern.id} className="mb-10">
              <SectionHeading>
                {PATTERN_EMOJI[pattern.id]} Pattern {pattern.id}: {pattern.name}
              </SectionHeading>
              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {pattern.warning && (
                  <p className="text-sm font-medium text-amber-800">
                    <span className="mr-1" aria-hidden>
                      ⚠️
                    </span>
                    {pattern.warning}
                  </p>
                )}
                <div>
                  <PatternSubhead emoji="👁️">Visual</PatternSubhead>
                  <FormulaBlock>{pattern.visual}</FormulaBlock>
                </div>
                <div>
                  <PatternSubhead emoji="📐">Translation</PatternSubhead>
                  <FormulaBlock>{pattern.translation}</FormulaBlock>
                </div>
                <div>
                  <PatternSubhead emoji="✍️">Example</PatternSubhead>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="mb-3 text-sm font-semibold text-slate-800">{pattern.example.problem}</p>
                    <ol className="list-inside list-decimal space-y-2 text-sm text-slate-700">
                      {pattern.example.steps.map((step, i) => {
                        const [action, reason] = step.split(' Why:');
                        return (
                          <li key={i} className="pl-1">
                            <p className="font-mono text-rose-700">{action}</p>
                            {reason && <p className="mt-1 text-slate-600">Why: {reason}</p>}
                          </li>
                        );
                      })}
                    </ol>
                    <p className="mt-3 font-semibold text-rose-800">✅ Answer: {pattern.example.answer}</p>
                  </div>
                </div>
                <div>
                  <PatternSubhead emoji="⚡">Shortcut</PatternSubhead>
                  <FormulaBlock>{pattern.shortcut}</FormulaBlock>
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
                      <div className="w-full whitespace-pre-line rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-left font-mono text-xs font-semibold text-rose-800 sm:text-sm">
                        <span className="mr-1" aria-hidden>
                          ✅
                        </span>
                        {pattern.practice.answer}
                      </div>
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
          <SectionHeading>📖 Phrase cheat sheet</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              📚
            </span>
            High-frequency words → operations (same spine as the markdown dictionary).
          </p>
          <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-4 shadow-sm sm:p-6">
            <ul className="grid gap-2 text-sm text-slate-800 sm:grid-cols-2">
              {WP_TRANSLATION_ROWS.map((row) => (
                <li
                  key={row.phrase}
                  className="flex justify-between gap-3 rounded-lg border border-violet-100 bg-white/80 px-3 py-2"
                >
                  <span className="font-medium text-slate-700">{row.phrase}</span>
                  <span className="shrink-0 font-mono text-violet-900">{row.math}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>⚠️ Order traps</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            “Less than” often applies to the expression, not the first number you read.
          </p>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 sm:p-6">
            <FormulaBlock>{WP_ORDER_TRAPS}</FormulaBlock>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🧮 Remainder vs round up</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Same division — opposite answers — depending on what they ask for.
          </p>
          <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50/80 px-3 py-2 text-sm font-medium text-amber-950">
            <span className="mr-1" aria-hidden>
              ⚡
            </span>
            {WP_SAME_DIVISION_TRAP}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Use the remainder</p>
              <p className="text-sm text-slate-700">{WP_REMAINDER_CASE_PROMPTS}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Round up (next whole)</p>
              <p className="text-sm text-slate-700">{WP_ROUNDUP_CASE_PROMPTS}</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🎭 Distractors and CBD</SectionHeading>
          <div className="space-y-4">
            <blockquote className="rounded-r-lg border-l-4 border-amber-400 bg-white py-3 pl-4 pr-3 text-sm text-slate-800 shadow-sm">
              <span className="mr-1 font-semibold text-amber-900">Distractor: </span>
              {WP_DISTRACTOR_STORY}
            </blockquote>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700 shadow-sm">
              <span className="mr-1 font-semibold text-slate-800">CBD: </span>
              {WP_CBD_REMINDER}
            </div>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🧭 How this connects to other AR topics</SectionHeading>
          <ul className="list-inside list-disc space-y-2 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
            {WP_BRIDGE_PATTERNS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <SectionHeading>✍️ Worked studio</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Short walk-throughs aligned with pool-style wording (not a substitute for the four pattern cards above).
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {WP_WORKED_STUDIO.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm ring-1 ring-rose-100/60"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-rose-700">{item.label}</p>
                <p className="mb-3 text-sm font-semibold text-slate-800">{item.problem}</p>
                <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-slate-600">
                  {item.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="text-sm font-bold text-rose-800">Answer: {item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🧠 Pattern-first quiz</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Pick the pattern first: <strong>A</strong> number relations · <strong>B</strong> remainder ·{' '}
            <strong>C</strong> round up · <strong>D</strong> CBD. Then tap to check.
          </p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {WP_PATTERN_QUIZ.map((item) => {
              const open = revealedQuizIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleQuiz(item.id)}
                  className="flex w-full flex-col items-stretch gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-left text-sm transition-colors hover:bg-indigo-50/60"
                >
                  <span className="font-medium text-slate-800">{item.question}</span>
                  <span className="text-xs text-slate-500">{item.patternChoices}</span>
                  {open ? (
                    <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-2 font-mono text-xs font-semibold text-indigo-900 sm:text-sm">
                      ✅ {item.reveal}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">
                      <span aria-hidden>👆 </span>Tap for pattern + answer
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>⚡ Speed drill</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            <span className="mr-1" aria-hidden>
              ⏱️
            </span>
            Quick recognition. Aim for a few seconds each.
          </p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {WP_SPEED_DRILL.map((item, idx) => {
              const id = `wp-spd-${idx}`;
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

        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>📝 Problems from the actual test</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                📋
              </span>
              Real questions from the PRIMS-style pool. Tap to expand steps and the correct answer.
            </p>
            <div className="space-y-4">
              {topic.testQuestionIds.map((qId) => {
                const q = getArQuestionById(qId);
                if (!q) return null;
                const isExpanded = expandedQuestionIds.has(q.id);
                const correctOption = q.options.find((o) => o.id === q.correct);
                const solution = AR_TEST_QUESTION_SOLUTIONS[q.id];
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
                            <ol className="mb-4 list-inside list-decimal space-y-3 text-sm text-slate-700">
                              {solution.solutionSteps.map((s: ArTestSolutionStep, i) => (
                                <li key={i}>
                                  <span>{s.step}</span>
                                  {s.reason && (
                                    <p className="mt-1 pl-4 text-xs italic text-slate-500">
                                      Why: {s.reason}
                                    </p>
                                  )}
                                </li>
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

        <section className="mb-10">
          <SectionHeading>👀 Quick recognition</SectionHeading>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800">If you see…</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Think…</th>
                </tr>
              </thead>
              <tbody>
                {WP_QUICK_RECOGNITION.map((row) => (
                  <tr key={row.phrase} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-2 font-medium text-slate-800">{row.phrase}</td>
                    <td className="px-4 py-2 text-slate-700">{row.think}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>⛔ Common mistakes</SectionHeading>
          <ul className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {WP_COMMON_MISTAKES.map((m) => (
              <li key={m.title} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <p className="font-semibold text-rose-800">{m.title}</p>
                <p className="mt-1 text-sm text-slate-600">{m.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <SectionHeading>🎓 Before you leave this tab</SectionHeading>
          <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <ol className="mb-6 list-inside list-decimal space-y-2 text-sm text-slate-700">
              {WP_CLOSING_SUMMARY.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Next steps</p>
            <div className="flex flex-wrap gap-2">
              {WP_NEXT_STEPS.map((nav) => (
                <Link
                  key={nav.href}
                  to={nav.href}
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800 transition-colors hover:bg-rose-100"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
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
