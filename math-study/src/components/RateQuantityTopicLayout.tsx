import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
import {
  RATE_QUANTITY_INTRO,
  RATE_QUANTITY_CORE,
  RATE_QUANTITY_PATTERNS,
  RATE_QUANTITY_PATTERN_SECTION_INTRO,
  RATE_QUANTITY_MASTER_METHOD,
  RATE_QUANTITY_WORKED_EXAMPLES,
  RATE_QUANTITY_MENTAL_MODELS,
  RATE_QUANTITY_DRILL_SETS,
  RATE_QUANTITY_SPEED_SECTION,
  RATE_QUANTITY_SPEED_DRILLS,
  RATE_QUANTITY_TRAPS,
  RATE_QUANTITY_STRATEGY,
  RATE_QUANTITY_NEXT_STEP,
  type SolvedProblem,
} from '../data/rateQuantityContent';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';
import { QuizEngine } from './quiz/QuizEngine';
import { Level1MemorySprint } from './Level1MemorySprint';
import {
  getLevel1MemoryDeck,
  type Level1MemoryTopicId,
} from '../data/level1MemoryDecks';
import {
  AR_LEVEL2_TOPIC_QUIZ_IDS,
  AR_LEVEL2_QUIZ_CONFIGS,
} from '../data/quiz/arLevel2QuizConfig';
import { getQuestionsForQuiz } from '../utils/quizSelection';
import { getArQuestionById } from '../utils/arQuestionLookup';
import {
  AR_TEST_QUESTION_SOLUTIONS,
  type ArTestSolutionStep,
} from '../data/arTestQuestionSolutions';

interface RateQuantityTopicLayoutProps {
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

function ReasoningProblemCard({ problem }: { problem: SolvedProblem }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {problem.title}
      </p>
      <p className="mb-3 text-base font-semibold text-slate-800">{problem.prompt}</p>
      <ol className="space-y-3 text-sm text-slate-700">
        {problem.steps.map((item, idx) => (
          <li key={idx} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="font-mono text-rose-700">{item.step}</p>
            <p className="mt-1 text-xs italic text-slate-600">Why: {item.why}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 font-semibold text-rose-800">✅ Answer: {problem.answer}</p>
    </div>
  );
}

export function RateQuantityTopicLayout({ topic }: RateQuantityTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [level2QuizId, setLevel2QuizId] = useState<string | null>(null);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<string>>(new Set());
  const [revealedSpeedIds, setRevealedSpeedIds] = useState<Set<string>>(new Set());
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

  const toggleSpeed = (id: string) => {
    setRevealedSpeedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
            type="button"
            onClick={() => setPracticeTestOpen(true)}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-500"
          >
            Practice Test
          </button>
        </div>
      </header>

      <ArLevelTopicNav currentTopicId={topic.id} />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section className="mb-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-extrabold text-rose-800">
            {RATE_QUANTITY_INTRO.headline}
          </h2>
          <p className="mb-2 text-sm font-semibold text-slate-600">{RATE_QUANTITY_INTRO.tagline}</p>
          <p className="mb-4 text-slate-700">{RATE_QUANTITY_INTRO.insight}</p>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {RATE_QUANTITY_INTRO.goals.map((goal) => (
              <li key={goal} className="rounded-lg bg-rose-50 px-3 py-2">
                {goal}
              </li>
            ))}
          </ul>
          {memoryDeck.length > 0 && (
            <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
              <p className="text-sm font-semibold text-indigo-900">
                Start here for today: lock in rate × quantity facts first.
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
            </div>
          )}
        </section>

        {memoryDeck.length > 0 && (
          <section id="think-about-it-memory-game" className="mb-10">
            <SectionHeading>🧠 Think About It — Memory Game</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              Play this 2-minute retrieval sprint daily. It uses spaced review and immediate
              feedback to strengthen long-term memory of rate and unit rules.
            </p>
            <Level1MemorySprint topicId={memoryTopicId} deck={memoryDeck} />
          </section>
        )}

        <section className="mb-10">
          <SectionHeading>{RATE_QUANTITY_CORE.title}</SectionHeading>
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700">{RATE_QUANTITY_CORE.coreIdeaLead}</p>
            <FormulaBlock>{RATE_QUANTITY_CORE.coreFormula}</FormulaBlock>
            <div>
              <p className="mb-2 text-lg font-semibold text-slate-800">
                {RATE_QUANTITY_CORE.threeFormsTitle}
              </p>
              <ol className="list-inside list-decimal space-y-1 text-sm text-slate-700">
                {RATE_QUANTITY_CORE.threeForms.map((f) => (
                  <li key={f}>
                    <strong>{f}</strong>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-800">{RATE_QUANTITY_CORE.triangleTitle}</p>
              <FormulaBlock>{RATE_QUANTITY_CORE.triangleArt}</FormulaBlock>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {RATE_QUANTITY_CORE.triangleMantras.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🎯 ASVAB PATTERN RECOGNITION</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">{RATE_QUANTITY_PATTERN_SECTION_INTRO}</p>
          <div className="space-y-4">
            {RATE_QUANTITY_PATTERNS.map((pattern) => (
              <div
                key={pattern.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="mb-2 text-lg font-bold text-slate-800">{pattern.title}</p>
                <ul className="mb-3 list-inside list-disc text-sm text-slate-700">
                  {pattern.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="mb-1 text-sm text-rose-700">{pattern.exampleLead}</p>
                <blockquote className="border-l-4 border-rose-200 pl-3 text-sm text-slate-600">
                  {pattern.exampleLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>{RATE_QUANTITY_MASTER_METHOD.title}</SectionHeading>
          <p className="mb-4 text-sm font-semibold text-slate-800">
            {RATE_QUANTITY_MASTER_METHOD.subtitle}
          </p>
          <div className="space-y-4">
            {RATE_QUANTITY_MASTER_METHOD.steps.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="mb-2 text-lg font-bold text-slate-800">{s.title}</p>
                <p className="text-sm text-slate-700">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-2 list-inside list-disc text-sm text-slate-700">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🔍 VISUAL EXAMPLES (STEP-BY-STEP)</SectionHeading>
          <div className="space-y-4">
            {RATE_QUANTITY_WORKED_EXAMPLES.map((problem) => (
              <ReasoningProblemCard key={problem.title} problem={problem} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🧠 MENTAL MODELS (ELITE UNDERSTANDING)</SectionHeading>
          <div className="space-y-4">
            {RATE_QUANTITY_MENTAL_MODELS.map((model) => (
              <div
                key={model.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="mb-2 text-lg font-bold text-slate-800">{model.title}</p>
                {model.question && (
                  <p className="text-sm text-slate-700">{model.question}</p>
                )}
                {model.formula && (
                  <FormulaBlock>{model.formula}</FormulaBlock>
                )}
                {model.note && (
                  <p className="mt-2 text-xs italic text-slate-600 whitespace-pre-line">
                    {model.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🧪 PRACTICE SYSTEM (TRAIN LIKE ELITE)</SectionHeading>
          {RATE_QUANTITY_DRILL_SETS.map((set, setIdx) => (
            <div
              key={set.title}
              className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-base font-bold text-slate-800">{set.title}</h3>
              <div className="space-y-3">
                {set.items.map((item, itemIdx) => {
                  const id = `${setIdx}-${itemIdx}`;
                  const open = revealedDrillIds.has(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleDrill(id)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-left transition-colors hover:bg-rose-50"
                    >
                      <p className="font-medium text-slate-800">{item.problem}</p>
                      {open ? (
                        <>
                          <ol className="mt-3 space-y-2 text-sm text-slate-700">
                            {item.steps.map((st, idx) => (
                              <li key={idx} className="rounded-md border border-slate-100 bg-white px-2 py-1.5">
                                <p className="font-mono text-rose-700">{st.step}</p>
                                <p className="mt-0.5 text-xs italic text-slate-600">Why: {st.why}</p>
                              </li>
                            ))}
                          </ol>
                          <p className="mt-2 text-sm font-semibold text-rose-700">
                            Answer: {item.answer}
                          </p>
                        </>
                      ) : (
                        <p className="mt-2 text-xs text-slate-500">
                          Click to reveal work + answer
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <SectionHeading>{RATE_QUANTITY_SPEED_SECTION.title}</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">{RATE_QUANTITY_SPEED_SECTION.subtitle}</p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {RATE_QUANTITY_SPEED_DRILLS.map((d, idx) => {
              const id = `spd-${idx}`;
              const open = revealedSpeedIds.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleSpeed(id)}
                  className="flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-left text-sm transition-colors hover:bg-rose-50"
                >
                  <span className="font-medium text-slate-800">{d.problem}</span>
                  {open ? (
                    <span className="font-semibold text-rose-700">{d.answer}</span>
                  ) : (
                    <span className="text-xs text-slate-500">Tap for answer</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>Problems from the Actual Test</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              Real questions from your practice tests (easy → elite). Click each to reveal the
              answer and worked solution.
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
                              {solution.solutionSteps.map((s: ArTestSolutionStep, idx: number) => (
                                <li key={idx}>
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

        <section className="mb-10">
          <SectionHeading>🚨 COMMON TRAPS (READ THIS CAREFULLY)</SectionHeading>
          <div className="space-y-4">
            {RATE_QUANTITY_TRAPS.map((trap) => (
              <div
                key={trap.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="mb-2 text-lg font-bold text-slate-800">{trap.title}</p>
                <p className="whitespace-pre-line text-sm text-slate-700">{trap.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <SectionHeading>{RATE_QUANTITY_STRATEGY.title}</SectionHeading>
          <p className="mb-4 text-slate-700">{RATE_QUANTITY_STRATEGY.insight}</p>
          <ol className="list-inside list-decimal space-y-2 text-sm text-slate-700">
            {RATE_QUANTITY_STRATEGY.steps.map((step) => (
              <li key={step}>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-slate-800">{RATE_QUANTITY_NEXT_STEP.title}</h2>
          <p className="mb-2 text-sm text-slate-600">{RATE_QUANTITY_NEXT_STEP.intro}</p>
          <p className="mb-2 text-sm font-semibold text-slate-700">👉 I can:</p>
          <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-slate-700">
            {RATE_QUANTITY_NEXT_STEP.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mb-1 text-sm font-semibold text-slate-800">{RATE_QUANTITY_NEXT_STEP.ctaTitle}</p>
          <blockquote className="mb-3 border-l-4 border-rose-300 pl-3 text-sm italic text-slate-700">
            {RATE_QUANTITY_NEXT_STEP.ctaQuote}
          </blockquote>
          <p className="whitespace-pre-line text-sm text-slate-600">{RATE_QUANTITY_NEXT_STEP.closing}</p>
        </section>

        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {(() => {
            const ids = AR_LEVEL2_TOPIC_QUIZ_IDS[topic.id];
            if (!ids) return null;
            const masteryConfig = AR_LEVEL2_QUIZ_CONFIGS[ids.mastery];
            const speedConfig = AR_LEVEL2_QUIZ_CONFIGS[ids.speed];
            if (!masteryConfig || !speedConfig) return null;
            return (
              <>
                <button
                  type="button"
                  onClick={() => setLevel2QuizId(ids.mastery)}
                  className="rounded-xl border-2 border-rose-600 px-6 py-3 font-semibold text-rose-600 shadow-md transition-colors hover:bg-rose-50"
                >
                  Pattern Mastery Quiz (15 Q)
                </button>
                <button
                  type="button"
                  onClick={() => setLevel2QuizId(ids.speed)}
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
            type="button"
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

      {level2QuizId &&
        (() => {
          const config = AR_LEVEL2_QUIZ_CONFIGS[level2QuizId];
          if (!config) return null;
          const questions = getQuestionsForQuiz(level2QuizId);
          return (
            <QuizEngine
              config={config}
              questions={questions}
              onComplete={() => {}}
              onClose={() => setLevel2QuizId(null)}
              theme="rose"
              showDifficultyBadge
            />
          );
        })()}
    </div>
  );
}
