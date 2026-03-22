import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
import {
  type ExampleStep,
  PERCENTS_ASVAB_TRAPS,
  PERCENTS_CORE_INTUITION,
  PERCENTS_MASTER_DRILL,
  PERCENTS_MENTAL_TRICKS,
  PERCENTS_PRACTICE_BY_DIFFICULTY,
  PERCENTS_PROBLEM_TYPES,
  PERCENTS_TYPE_1,
  PERCENTS_TYPE_2,
  PERCENTS_TYPE_3,
  PERCENTS_UNIVERSAL_FORMULA,
} from '../data/percentsContent';
import {
  AR_TEST_QUESTION_SOLUTIONS,
  type ArTestSolutionStep,
} from '../data/arTestQuestionSolutions';
import { getArQuestionById } from '../utils/arQuestionLookup';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';
import { QuizEngine } from './quiz/QuizEngine';
import {
  AR_LEVEL1_TOPIC_QUIZ_IDS,
  AR_LEVEL1_QUIZ_CONFIGS,
} from '../data/quiz/arLevel1QuizConfig';
import { getQuestionsForQuiz } from '../utils/quizSelection';
import { Level1MemorySprint } from './Level1MemorySprint';
import {
  getLevel1MemoryDeck,
  type Level1MemoryTopicId,
} from '../data/level1MemoryDecks';

interface PercentsTopicLayoutProps {
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

function ExampleCard({
  problem,
  steps,
  answer,
}: {
  problem: string;
  steps: ExampleStep[];
  answer: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-3 font-medium text-slate-800">{problem}</p>
      <ol className="list-inside list-decimal space-y-3 text-sm">
        {steps.map((s, i) => (
          <li key={i}>
            <span className="font-mono text-rose-700">{s.step}</span>
            {s.reason && (
              <p className="mt-1 pl-4 text-xs italic text-slate-500">Why: {s.reason}</p>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-3 font-semibold text-rose-800">Answer: {answer}</p>
    </div>
  );
}

export function PercentsTopicLayout({ topic }: PercentsTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [level1QuizId, setLevel1QuizId] = useState<string | null>(null);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<number>>(new Set());
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
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
        <p className="mb-8 text-slate-600">{topic.description}</p>
        {memoryDeck.length > 0 && (
          <>
            <section className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
              <p className="text-sm font-semibold text-indigo-900">
                Start here for today: lock in percent facts and rules first.
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Do a 2-minute memory sprint before the full lesson.
              </p>
              <a
                href="#think-about-it-memory-game"
                className="mt-3 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                Start Today&apos;s 2-Min Drill
              </a>
            </section>
            <section id="think-about-it-memory-game" className="mb-10">
              <SectionHeading>Think About It — Memory Game</SectionHeading>
              <p className="mb-4 text-sm text-slate-600">
                Play this 2-minute retrieval sprint daily. It uses spaced review and immediate
                feedback to strengthen long-term memory for key facts and rules.
              </p>
              <Level1MemorySprint topicId={memoryTopicId} deck={memoryDeck} />
            </section>
          </>
        )}

        {/* Core Intuition */}
        <section className="mb-10">
          <SectionHeading>1. Core Intuition</SectionHeading>
          <p className="mb-4 font-medium text-slate-800">
            {PERCENTS_CORE_INTUITION.definition}
          </p>
          <div className="mb-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800">Percent</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {PERCENTS_CORE_INTUITION.table.map((row) => (
                  <tr key={row.percent} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-mono font-medium text-rose-700">
                      {row.percent}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            {PERCENTS_CORE_INTUITION.gridConcept}
          </p>
        </section>

        {/* Universal Formula */}
        <section className="mb-10">
          <SectionHeading>2. Universal Percent Formula</SectionHeading>
          <p className="mb-2 text-sm text-slate-600">
            Every percent problem is actually this:
          </p>
          <FormulaBlock>{PERCENTS_UNIVERSAL_FORMULA.formula}</FormulaBlock>
          <p className="mt-2 font-medium text-slate-700">
            {PERCENTS_UNIVERSAL_FORMULA.meaning}
          </p>
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-bold text-slate-600">Example</h3>
            <ExampleCard
              problem={PERCENTS_UNIVERSAL_FORMULA.example.problem}
              steps={PERCENTS_UNIVERSAL_FORMULA.example.steps}
              answer={PERCENTS_UNIVERSAL_FORMULA.example.answer}
            />
          </div>
        </section>

        {/* 3 Problem Types */}
        <section className="mb-10">
          <SectionHeading>3. The 3 Types of Percent Problems (ASVAB)</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Almost every ASVAB percent question is one of these three. Master these and 90% of
            percent questions are solved.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800">Type</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Question</th>
                </tr>
              </thead>
              <tbody>
                {PERCENTS_PROBLEM_TYPES.map((row) => (
                  <tr key={row.type} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-mono font-medium text-rose-700">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Type 1 */}
        <section className="mb-10">
          <SectionHeading>Type 1: {PERCENTS_TYPE_1.title}</SectionHeading>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Principle</h3>
              <FormulaBlock>{PERCENTS_TYPE_1.principle}</FormulaBlock>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Examples</h3>
              <div className="space-y-4">
                {PERCENTS_TYPE_1.examples.map((ex, i) => (
                  <ExampleCard
                    key={i}
                    problem={ex.problem}
                    steps={ex.steps}
                    answer={ex.answer}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Mental Trick</h3>
              <p className="font-medium text-slate-700">{PERCENTS_TYPE_1.mentalTrick}</p>
            </div>
          </div>
        </section>

        {/* Type 2 */}
        <section className="mb-10">
          <SectionHeading>Type 2: {PERCENTS_TYPE_2.title}</SectionHeading>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Principle</h3>
              <FormulaBlock>{PERCENTS_TYPE_2.principle}</FormulaBlock>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Example</h3>
              <ExampleCard
                problem={PERCENTS_TYPE_2.example.problem}
                steps={PERCENTS_TYPE_2.example.steps}
                answer={PERCENTS_TYPE_2.example.answer}
              />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Mental Shortcut</h3>
              <p className="mb-4 font-medium text-slate-700">
                {PERCENTS_TYPE_2.mentalShortcut}
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 font-bold text-slate-800">Fraction</th>
                      <th className="px-4 py-3 font-bold text-slate-800">Percent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PERCENTS_TYPE_2.fractionTable.map((row) => (
                      <tr key={row.fraction} className="border-b border-slate-100">
                        <td className="px-4 py-3 font-mono text-slate-700">{row.fraction}</td>
                        <td className="px-4 py-3 font-medium text-rose-700">{row.percent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Type 3 */}
        <section className="mb-10">
          <SectionHeading>Type 3: {PERCENTS_TYPE_3.title}</SectionHeading>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Principle</h3>
              <FormulaBlock>{PERCENTS_TYPE_3.principle}</FormulaBlock>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-600">Example</h3>
              <ExampleCard
                problem={PERCENTS_TYPE_3.example.problem}
                steps={PERCENTS_TYPE_3.example.steps}
                answer={PERCENTS_TYPE_3.example.answer}
              />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-amber-800">
                Successive Discounts (Common ASVAB Trap)
              </h3>
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
                <p className="mb-2 font-medium text-slate-800">
                  {PERCENTS_TYPE_3.successiveDiscounts.problem}
                </p>
                <p className="mb-3 text-sm text-red-600">
                  Most people do: {PERCENTS_TYPE_3.successiveDiscounts.wrong}
                </p>
                <ol className="mb-3 list-inside list-decimal space-y-3 text-sm">
                  {PERCENTS_TYPE_3.successiveDiscounts.steps.map((s, i) => (
                    <li key={i}>
                      <span className="font-mono text-rose-700">{s.step}</span>
                      {s.reason && (
                        <p className="mt-1 pl-4 text-xs italic text-slate-500">
                          Why: {s.reason}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="font-mono text-sm text-rose-700">
                  Correct: {PERCENTS_TYPE_3.successiveDiscounts.correct}
                </p>
                <p className="mt-2 font-semibold text-rose-800">
                  Final price: {PERCENTS_TYPE_3.successiveDiscounts.answer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Math Tricks */}
        <section className="mb-10">
          <SectionHeading>10-Second Mental Math Tricks</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            These are gold for ASVAB speed. Example: 25% of 240 → 240 ÷ 4 = 60. Done instantly.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800">Percent</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Shortcut</th>
                </tr>
              </thead>
              <tbody>
                {PERCENTS_MENTAL_TRICKS.map((row) => (
                  <tr key={row.percent} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-mono font-medium text-rose-700">
                      {row.percent}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.shortcut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ASVAB Traps */}
        <section className="mb-10">
          <SectionHeading>Most Common ASVAB Percent Traps</SectionHeading>
          <div className="space-y-4">
            {PERCENTS_ASVAB_TRAPS.map((trap, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-slate-800">{trap.title}</p>
                <p className="mt-1 text-sm text-slate-600">{trap.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Master Drill */}
        <section className="mb-10">
          <SectionHeading>10-Question Master Drill</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Try these mentally. Click to reveal the answer.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PERCENTS_MASTER_DRILL.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleDrill(idx)}
                className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-rose-200 hover:bg-rose-50/30"
              >
                <p className="font-mono font-medium text-slate-800">{item.problem}</p>
                {revealedDrillIds.has(idx) ? (
                  <p className="mt-2 font-mono text-sm font-bold text-rose-700">
                    {item.answer}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Click to reveal</p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Practice by Difficulty */}
        <section className="mb-10">
          <SectionHeading>Practice Problems (Easy → Extremely Hard)</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">
            Work through each tier to build comfort with different difficulty levels.
          </p>
          {(
            [
              ['easy', 'Easy'],
              ['medium', 'Medium'],
              ['hard', 'Hard'],
              ['extremelyHard', 'Extremely Hard'],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="mb-6">
              <h3 className="mb-3 text-sm font-bold text-slate-600">{label}</h3>
              <div className="space-y-4">
                {PERCENTS_PRACTICE_BY_DIFFICULTY[key].map((pp, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <p className="mb-2 font-medium text-slate-800">{pp.problem}</p>
                    <p className="text-sm text-rose-700">
                      <span className="font-semibold">Solution: </span>
                      {pp.solution}
                    </p>
                    {pp.reasoning && (
                      <p className="mt-2 text-xs italic text-slate-500">
                        Why: {pp.reasoning}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* From the Test */}
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
                const solution = AR_TEST_QUESTION_SOLUTIONS[q.id];
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
                            <ol className="mb-4 list-inside list-decimal space-y-3 text-sm text-slate-700">
                              {solution.solutionSteps.map(
                                (s: ArTestSolutionStep, i: number) => (
                                  <li key={i}>
                                    <span>{s.step}</span>
                                    {s.reason && (
                                      <p className="mt-1 pl-4 text-xs italic text-slate-500">
                                        Why: {s.reason}
                                      </p>
                                    )}
                                  </li>
                                )
                              )}
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

        {/* Quiz Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {(() => {
            const ids = AR_LEVEL1_TOPIC_QUIZ_IDS[topic.id];
            if (!ids) return null;
            const masteryConfig = AR_LEVEL1_QUIZ_CONFIGS[ids.mastery];
            const speedConfig = AR_LEVEL1_QUIZ_CONFIGS[ids.speed];
            if (!masteryConfig || !speedConfig) return null;
            return (
              <>
                <button
                  onClick={() => setLevel1QuizId(ids.mastery)}
                  className="rounded-xl border-2 border-rose-600 px-6 py-3 font-semibold text-rose-600 shadow-md transition-colors hover:bg-rose-50"
                >
                  Pattern Mastery Quiz (15 Q)
                </button>
                <button
                  onClick={() => setLevel1QuizId(ids.speed)}
                  className="rounded-xl border-2 border-rose-600 px-6 py-3 font-semibold text-rose-600 shadow-md transition-colors hover:bg-rose-50"
                >
                  Speed Drill (10 Q)
                </button>
              </>
            );
          })()}
        </div>

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

      {level1QuizId &&
        (() => {
          const config = AR_LEVEL1_QUIZ_CONFIGS[level1QuizId];
          if (!config) return null;
          const questions = getQuestionsForQuiz(level1QuizId);
          return (
            <QuizEngine
              config={config}
              questions={questions}
              onComplete={() => {}}
              onClose={() => setLevel1QuizId(null)}
              theme="rose"
              showDifficultyBadge
            />
          );
        })()}
    </div>
  );
}
