import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
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
import type {
  LessonSolvedProblem,
  StructuredLessonContent,
} from '../data/structuredLessonContent';
import { Level1MemorySprint } from './Level1MemorySprint';
import {
  getLevel1MemoryDeck,
  type Level1MemoryTopicId,
} from '../data/level1MemoryDecks';

interface StructuredArTopicLayoutProps {
  topic: ArTopic;
  content: StructuredLessonContent;
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

function ReasoningProblemCard({ problem }: { problem: LessonSolvedProblem }) {
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
      <p className="mt-3 font-semibold text-rose-800">Answer: {problem.answer}</p>
    </div>
  );
}

export function StructuredArTopicLayout({ topic, content }: StructuredArTopicLayoutProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [level1QuizId, setLevel1QuizId] = useState<string | null>(null);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedDrillIds, setRevealedDrillIds] = useState<Set<string>>(new Set());
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

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section className="mb-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-extrabold text-rose-800">{content.introHeadline}</h2>
          <p className="mb-4 text-slate-700">{content.introSummary}</p>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {content.goals.map((goal) => (
              <li key={goal} className="rounded-lg bg-rose-50 px-3 py-2">
                {goal}
              </li>
            ))}
          </ul>
          {memoryDeck.length > 0 && (
            <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
              <p className="text-sm font-semibold text-indigo-900">
                Start here for today: lock in facts and rules first.
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
            <SectionHeading>Think About It — Memory Game</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              Play this 2-minute retrieval sprint daily. It uses spaced review and immediate
              feedback to strengthen long-term memory for key facts and rules.
            </p>
            <Level1MemorySprint topicId={memoryTopicId} deck={memoryDeck} />
          </section>
        )}

        <section className="mb-10">
          <SectionHeading>{content.coreTitle}</SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-3 text-lg font-semibold text-slate-800">🔥 The Golden Rule</p>
            <p className="mb-3 text-slate-700">{content.goldenRule}</p>
            <FormulaBlock>{content.formulaLines.join('\n')}</FormulaBlock>
            <p className="mt-3 text-sm font-semibold text-rose-700">{content.cancellationLaw}</p>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>{content.factsTitle}</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.factGroups.map((group) => (
              <div key={group.group} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-3 font-bold text-slate-800">{group.group}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {group.facts.map((fact) => (
                    <li key={fact} className="rounded-md bg-slate-50 px-2 py-1">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>{content.patternsTitle}</SectionHeading>
          <div className="space-y-4">
            {content.patterns.map((pattern) => (
              <div key={pattern.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-lg font-bold text-slate-800">{pattern.title}</p>
                <p className="mb-2 text-sm text-slate-600">Example: {pattern.example}</p>
                <p className="mb-2 rounded-md bg-slate-50 px-3 py-2 font-mono text-sm text-rose-700">
                  {pattern.setup}
                </p>
                <p className="text-xs italic text-slate-600">Why: {pattern.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>{content.practiceTitle}</SectionHeading>
          {content.practiceGroups.map((group) => (
            <div key={group.level} className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-700">{group.level}</h3>
              <div className="space-y-4">
                {group.problems.map((problem) => (
                  <ReasoningProblemCard key={`${group.level}-${problem.title}`} problem={problem} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <SectionHeading>{content.strategiesTitle}</SectionHeading>
          <div className="space-y-3">
            {content.strategies.map((strategy) => (
              <div key={strategy.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="font-semibold text-slate-800">{strategy.title}</p>
                <p className="mt-1 text-sm text-slate-600">{strategy.tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>{content.drillsTitle}</SectionHeading>
          {content.drillSets.map((set, setIdx) => (
            <div key={set.title} className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
                          <p className="mt-2 text-sm font-semibold text-rose-700">Answer: {item.answer}</p>
                          <p className="mt-1 text-xs italic text-slate-600">Why: {item.why}</p>
                        </>
                      ) : (
                        <p className="mt-2 text-xs text-slate-500">Click to reveal answer + reasoning</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <SectionHeading>{content.finalTitle}</SectionHeading>
          <p className="mb-3 text-slate-700">{content.finalTruth}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {content.advantage.map((item) => (
              <li key={item} className="rounded-md bg-rose-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>From the Test</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              Real questions from your test pool. Expand each to see clear reasoning.
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
