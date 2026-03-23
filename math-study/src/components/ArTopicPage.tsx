import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getArTopicById } from '../data/arTopicContent';
import { getPatternIdsForTopic } from '../data/ar20Patterns';
import { getArQuestionById } from '../utils/arQuestionLookup';
import {
  AR_TEST_QUESTION_SOLUTIONS,
  type ArTestSolutionStep,
} from '../data/arTestQuestionSolutions';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';
import { DstTopicLayout } from './DstTopicLayout';
import { PercentsTopicLayout } from './PercentsTopicLayout';
import { RatiosProportionsTopicLayout } from './RatiosProportionsTopicLayout';
import { RateQuantityTopicLayout } from './RateQuantityTopicLayout';
import { AveragesTopicLayout } from './AveragesTopicLayout';
import { StructuredArTopicLayout } from './StructuredArTopicLayout';
import { UnitConversionTopicLayout } from './UnitConversionTopicLayout';
import { QuizEngine } from './quiz/QuizEngine';
import {
  AR_LEVEL1_TOPIC_QUIZ_IDS,
  AR_LEVEL1_QUIZ_CONFIGS,
} from '../data/quiz/arLevel1QuizConfig';
import { getQuestionsForQuiz } from '../utils/quizSelection';
import { STRUCTURED_LESSON_CONTENT } from '../data/structuredLessonContent';

const LEVEL_1_TOPIC_IDS = new Set([
  'order-of-operations',
  'decimals',
  'fractions',
  'percents',
  'unit-conversion',
]);

export function ArTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [level1QuizId, setLevel1QuizId] = useState<string | null>(null);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());

  const topic = topicId ? getArTopicById(topicId) : undefined;

  if (topic && topicId === 'rate-distance-time') {
    return <DstTopicLayout topic={topic} />;
  }
  if (topic && topicId === 'ratios') {
    return <RatiosProportionsTopicLayout topic={topic} />;
  }
  if (topic && topicId === 'rate-multiply') {
    return <RateQuantityTopicLayout topic={topic} />;
  }
  if (topic && topicId === 'averages') {
    return <AveragesTopicLayout topic={topic} />;
  }
  if (topic && topicId === 'percents') {
    return <PercentsTopicLayout topic={topic} />;
  }
  if (topic && topicId === 'unit-conversion') {
    return <UnitConversionTopicLayout topic={topic} />;
  }
  if (
    topic &&
    topicId &&
    (topicId === 'order-of-operations' || topicId === 'decimals' || topicId === 'fractions')
  ) {
    const content = STRUCTURED_LESSON_CONTENT[topicId];
    if (content) {
      return <StructuredArTopicLayout topic={topic} content={content} />;
    }
  }

  const toggleQuestion = (id: string) => {
    setExpandedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <Link to="/" className="text-rose-600 hover:text-rose-700 font-medium">
          ← Back to Math Study
        </Link>
        <p className="mt-8 text-slate-600">Topic not found.</p>
      </div>
    );
  }

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
        <p className="mb-4 text-slate-600">{topic.description}</p>
        {(() => {
          const patternIds = getPatternIdsForTopic(topic.id);
          if (patternIds.length > 0) {
            return (
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
            );
          }
          return null;
        })()}

        <section className="mb-10">
          <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
            Main Principles
          </h2>
          <ul className="list-inside list-disc space-y-2 text-slate-700">
            {topic.principles.map((p, i) => (
              <li key={i} className="font-mono text-sm">
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
            Rules
          </h2>
          <ol className="list-inside list-decimal space-y-3 text-slate-700">
            {topic.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
            Simple Example
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {topic.simpleExample.shortcut && (
              <span className="mb-3 inline-block rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                Quick method · ~30 sec
              </span>
            )}
            <p className="mb-3 font-medium text-slate-800">{topic.simpleExample.problem}</p>
            <p className="text-rose-700 font-medium">Solution: {topic.simpleExample.solution}</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
            Practice Problems
          </h2>
          <div className="space-y-4">
            {topic.practiceProblems.map((pp, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="mb-2 font-medium text-slate-800">{pp.problem}</p>
                <p className="text-sm text-rose-700">
                  <span className="font-semibold">Solution: </span>
                  {pp.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 border-b-2 border-rose-200 pb-2 text-xl font-bold text-rose-800">
              From the Test
            </h2>
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
                            {solution.solutionSteps.map((s: ArTestSolutionStep, i: number) => (
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

        {LEVEL_1_TOPIC_IDS.has(topic.id) && (
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

      {level1QuizId && (() => {
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
