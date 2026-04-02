import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ArTopic } from '../data/arTopicContent';
import {
  AV_AREA_PRINCIPLES,
  AV_ASVAB_PATTERNS,
  AV_CORE_PIPELINE,
  AV_INTRO,
  AV_MASTER_INSIGHT,
  AV_MIXED_DRILL,
  AV_NEXT_LINKS,
  AV_PATTERN_WALKTHROUGH,
  AV_PYTHAGOREAN,
  AV_UNIT_CONVERSIONS,
  AV_UNIT_EXAMPLE_PROBLEM,
  AV_UNIT_EXAMPLE_WORK,
  AV_UNIT_PRACTICE,
  AV_VOLUME_PRINCIPLES,
  type AvPrinciple,
} from '../data/areaVolumePatternContent';
import { getPatternIdsForTopic } from '../data/ar20Patterns';
import {
  getLevel1MemoryDeck,
  type Level1MemoryTopicId,
} from '../data/level1MemoryDecks';
import { getArQuestionById } from '../utils/arQuestionLookup';
import {
  AR_TEST_QUESTION_SOLUTIONS,
  type ArTestSolutionStep,
} from '../data/arTestQuestionSolutions';
import { ArithmeticReasoningTestLauncher } from './ArithmeticReasoningTestLauncher';
import { ArLevelTopicNav } from './ArLevelTopicNav';
import { Level1MemorySprint } from './Level1MemorySprint';
import { CircleDiagram } from './diagrams/CircleDiagram';
import { PythagoreanDiagram } from './diagrams/PythagoreanDiagram';
import { RectangleDiagram } from './diagrams/RectangleDiagram';
import { Shape3DViewer } from './diagrams/Shape3DViewer';
import { TriangleDiagram } from './diagrams/TriangleDiagram';

const GOAL_EMOJIS = ['📐', '📏', '🧮', '🔺', '📦', '⭕'] as const;

/** Reuses the same SVG / 3D viewers as `Geometry2D` and `Geometry3D` topic sections. */
const AV_SHAPE_VISUALS: Record<string, ReactNode> = {
  rect: <RectangleDiagram />,
  square: <RectangleDiagram />,
  triangle: <TriangleDiagram />,
  circle: <CircleDiagram />,
  prism: <Shape3DViewer shape="box" />,
  cube: <Shape3DViewer shape="cube" />,
  cylinder: <Shape3DViewer shape="cylinder" />,
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b-2 border-emerald-200 pb-2 text-xl font-bold text-emerald-900">
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

function PrincipleCard({
  principle,
  practiceOpen,
  onTogglePractice,
  visual,
}: {
  principle: AvPrinciple;
  practiceOpen: boolean;
  onTogglePractice: () => void;
  visual?: ReactNode;
}) {
  const [diagramOpen, setDiagramOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
        {principle.part === 'area' ? 'Area' : 'Volume'}
      </p>
      <h3 className="mb-2 text-lg font-bold text-slate-900">{principle.title}</h3>
      <FormulaBlock>{principle.formula}</FormulaBlock>
      {principle.meaning && (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Meaning: </span>
          {principle.meaning}
        </p>
      )}
      {visual && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setDiagramOpen((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-900"
          >
            {diagramOpen ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                Hide diagram
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Show diagram
              </>
            )}
          </button>
          {diagramOpen && (
            <div className="mx-auto mt-3 w-full max-w-lg rounded-lg border border-emerald-100 bg-slate-50/80 p-2">
              {visual}
            </div>
          )}
        </div>
      )}
      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
        <p className="mb-2 text-xs font-semibold uppercase text-emerald-800">Example</p>
        <p className="mb-2 text-sm font-medium text-slate-800">{principle.exampleProblem}</p>
        <FormulaBlock>{principle.exampleWork}</FormulaBlock>
        <p className="mt-2 text-sm font-bold text-emerald-900">→ {principle.exampleAnswer}</p>
      </div>
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Practice</p>
        <button
          type="button"
          onClick={onTogglePractice}
          className="flex w-full flex-wrap items-start justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-left text-sm transition-colors hover:bg-emerald-50/80"
        >
          <span className="font-medium text-slate-800">{principle.practiceProblem}</span>
          {practiceOpen ? (
            <div className="w-full whitespace-pre-line rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 font-mono text-xs font-semibold text-emerald-900 sm:text-sm">
              ✅ {principle.practiceAnswer}
            </div>
          ) : (
            <span className="shrink-0 text-xs text-slate-500">
              <span aria-hidden>👆 </span>Tap for answer
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export function AreaVolumeTopicLayout({ topic }: { topic: ArTopic }) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [revealedPracticeIds, setRevealedPracticeIds] = useState<Set<string>>(new Set());
  const [revealedUnitIds, setRevealedUnitIds] = useState<Set<string>>(new Set());
  const [revealedMixIds, setRevealedMixIds] = useState<Set<string>>(new Set());
  const [pythagPracticeOpen, setPythagPracticeOpen] = useState(false);
  const [pythagDiagramOpen, setPythagDiagramOpen] = useState(true);

  const toggleQuestion = (id: string) => {
    setExpandedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePracticeId = (id: string) => {
    setRevealedPracticeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleUnit = (id: string) => {
    setRevealedUnitIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleMix = (id: string) => {
    setRevealedMixIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const patternIds = getPatternIdsForTopic(topic.id);
  const memoryDeck = getLevel1MemoryDeck(topic.id);
  const memoryTopicId = topic.id as Level1MemoryTopicId;

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
              📐
            </span>
            {topic.title} — Arithmetic Reasoning
          </h1>
          <button
            type="button"
            onClick={() => setPracticeTestOpen(true)}
            className="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-500 sm:text-sm"
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
                  className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-200"
                >
                  #{pid}
                </Link>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              <Link
                to="/arithmetic-reasoning/pattern-drill?mode=core"
                className="font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
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

        <section className="mb-10 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm ring-1 ring-emerald-100/80">
          <h2 className="mb-3 text-xl font-extrabold text-emerald-900 sm:text-2xl">
            <span className="mr-2" aria-hidden>
              📐
            </span>
            {AV_INTRO.headline}
          </h2>
          <p className="mb-2 text-sm font-semibold text-slate-600">
            <span className="mr-1.5" aria-hidden>
              🎯
            </span>
            {AV_INTRO.tagline}
          </p>
          <p className="mb-4 text-slate-700">
            <span className="mr-1.5" aria-hidden>
              💡
            </span>
            {AV_INTRO.insight}
          </p>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {AV_INTRO.goals.map((goal, i) => (
              <li key={goal} className="flex gap-2 rounded-lg bg-emerald-50/80 px-3 py-2">
                <span className="shrink-0" aria-hidden>
                  {GOAL_EMOJIS[i] ?? '📌'}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
          {memoryDeck.length > 0 && (
            <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50/70 p-4">
              <p className="text-sm font-semibold text-teal-950">
                <span className="mr-1.5" aria-hidden>
                  🧠
                </span>
                Warm up: drill area, volume, ft² ↔ yd², and Pythagorean setups before the cards below.
              </p>
              <p className="mt-1 text-xs text-slate-600">
                <span className="mr-1" aria-hidden>
                  ⏱️
                </span>
                Two-minute retrieval sprint — same spaced-review game as other Arithmetic Reasoning tabs.
              </p>
              <a
                href="#think-about-it-memory-game-av"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                <span aria-hidden>▶️</span>
                Start today&apos;s 2-min drill
              </a>
            </div>
          )}
        </section>

        {memoryDeck.length > 0 && (
          <section id="think-about-it-memory-game-av" className="mb-10">
            <SectionHeading>🧠 Think about it — memory game</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              <span className="mr-1" aria-hidden>
                🎮
              </span>
              Short multiple-choice prompts on formulas and unit traps. Immediate feedback and review
              scheduling help formulas stick for carpeting, volume, and pole-and-shadow problems.
            </p>
            <Level1MemorySprint
              topicId={memoryTopicId}
              deck={memoryDeck}
              title="Think about it: 2-min memory game (area & volume)"
              subtitle="Retrieval sprint: rectangle through circle, ft² and yd², box/cube/cylinder volume, Pythagorean c, and cost-per-area traps."
            />
          </section>
        )}

        <section className="mb-10">
          <SectionHeading>🔁 Core pipeline</SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm text-slate-600">
              Run this every time before you calculate — especially <strong>units</strong> and{' '}
              <strong>cost per ft² vs yd²</strong>.
            </p>
            <FormulaBlock>{AV_CORE_PIPELINE}</FormulaBlock>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>📏 Part 1 — Area (2D)</SectionHeading>
          <p className="mb-6 text-sm text-slate-600">
            Rectangle through circle — the shapes that dominate carpeting and lot problems.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {AV_AREA_PRINCIPLES.map((p) => (
              <PrincipleCard
                key={p.id}
                principle={p}
                practiceOpen={revealedPracticeIds.has(`area-${p.id}`)}
                onTogglePractice={() => togglePracticeId(`area-${p.id}`)}
                visual={AV_SHAPE_VISUALS[p.id]}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>⚠️ Part 2 — Unit traps (ft² ↔ yd²)</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">ASVAB loves square yards vs square feet. Memorize the square conversion.</p>
          <div className="space-y-4 rounded-2xl border border-amber-200 bg-amber-50/40 p-6 shadow-sm">
            <FormulaBlock>{AV_UNIT_CONVERSIONS}</FormulaBlock>
            <div className="rounded-xl border border-white bg-white/90 p-4 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-amber-950">{AV_UNIT_EXAMPLE_PROBLEM}</p>
              <FormulaBlock>{AV_UNIT_EXAMPLE_WORK}</FormulaBlock>
            </div>
            <div className="space-y-2">
              {AV_UNIT_PRACTICE.map((item, idx) => {
                const id = `unit-${idx}`;
                const open = revealedUnitIds.has(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleUnit(id)}
                    className="flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-100 bg-white px-3 py-2 text-left text-sm transition-colors hover:bg-amber-50"
                  >
                    <span className="font-medium text-slate-800">{item.problem}</span>
                    {open ? (
                      <span className="font-semibold text-emerald-800">✅ {item.answer}</span>
                    ) : (
                      <span className="text-xs text-slate-500">Tap for answer</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>📦 Part 3 — Volume (3D)</SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {AV_VOLUME_PRINCIPLES.map((p) => {
              if (p.id === 'cylinder') {
                return (
                  <div key={p.id} className="md:col-span-2">
                    <PrincipleCard
                      principle={p}
                      practiceOpen={revealedPracticeIds.has(`vol-${p.id}`)}
                      onTogglePractice={() => togglePracticeId(`vol-${p.id}`)}
                      visual={AV_SHAPE_VISUALS[p.id]}
                    />
                  </div>
                );
              }
              return (
                <PrincipleCard
                  key={p.id}
                  principle={p}
                  practiceOpen={revealedPracticeIds.has(`vol-${p.id}`)}
                  onTogglePractice={() => togglePracticeId(`vol-${p.id}`)}
                  visual={AV_SHAPE_VISUALS[p.id]}
                />
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🔺 Right triangles (pole & shadow)</SectionHeading>
          <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-violet-950">{AV_PYTHAGOREAN.title}</h3>
            <FormulaBlock>{AV_PYTHAGOREAN.formula}</FormulaBlock>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setPythagDiagramOpen((o) => !o)}
                className="flex items-center gap-2 text-sm font-medium text-violet-700 transition-colors hover:text-violet-900"
              >
                {pythagDiagramOpen ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                    Hide diagram
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Show diagram
                  </>
                )}
              </button>
              {pythagDiagramOpen && (
                <div className="mx-auto mt-3 w-full max-w-md rounded-lg border border-violet-200 bg-white p-2 shadow-inner">
                  <PythagoreanDiagram />
                </div>
              )}
            </div>
            <div className="mt-4 rounded-xl border border-violet-100 bg-white p-4">
              <p className="mb-2 text-sm font-medium text-slate-800">{AV_PYTHAGOREAN.exampleProblem}</p>
              <FormulaBlock>{AV_PYTHAGOREAN.exampleWork}</FormulaBlock>
              <p className="mt-2 font-bold text-violet-900">→ {AV_PYTHAGOREAN.exampleAnswer}</p>
            </div>
            <button
              type="button"
              onClick={() => setPythagPracticeOpen((o) => !o)}
              className="mt-4 flex w-full flex-col items-stretch gap-2 rounded-lg border border-violet-100 bg-white px-3 py-3 text-left text-sm"
            >
              <span className="font-medium text-slate-800">{AV_PYTHAGOREAN.practiceProblem}</span>
              {pythagPracticeOpen ? (
                <span className="font-mono text-sm font-semibold text-violet-900">
                  ✅ {AV_PYTHAGOREAN.practiceAnswer}
                </span>
              ) : (
                <span className="text-xs text-slate-500">Tap for answer</span>
              )}
            </button>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🗺️ Real ASVAB pattern map</SectionHeading>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-bold text-slate-800">Pattern</th>
                  <th className="px-4 py-3 font-bold text-slate-800">Your moves</th>
                </tr>
              </thead>
              <tbody>
                {AV_ASVAB_PATTERNS.map((row) => (
                  <tr key={row.name} className="border-b border-slate-100 last:border-b-0 hover:bg-emerald-50/30">
                    <td className="px-4 py-3 font-medium text-emerald-900">{row.name}</td>
                    <td className="px-4 py-3 text-slate-700">{row.moves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase text-slate-500">Walkthrough</p>
            <p className="mb-2 text-sm font-medium text-slate-800">{AV_PATTERN_WALKTHROUGH.problem}</p>
            <FormulaBlock>{AV_PATTERN_WALKTHROUGH.work}</FormulaBlock>
            <p className="mt-2 font-bold text-emerald-900">{AV_PATTERN_WALKTHROUGH.answer}</p>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>⚡ Mixed ASVAB drill</SectionHeading>
          <p className="mb-4 text-sm text-slate-600">Tap each line — build speed after the lessons above.</p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {AV_MIXED_DRILL.map((item, idx) => {
              const id = `mix-${idx}`;
              const open = revealedMixIds.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleMix(id)}
                  className="flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-left text-sm transition-colors hover:bg-emerald-50/60"
                >
                  <span className="font-medium text-slate-800">{item.problem}</span>
                  {open ? (
                    <span className="whitespace-pre-line text-left font-semibold text-emerald-800">
                      ✅ {item.answer}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">Tap for answer</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading>🧠 Master insight</SectionHeading>
          <ul className="list-inside list-disc space-y-2 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 text-sm text-slate-800">
            {AV_MASTER_INSIGHT.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {topic.testQuestionIds.length > 0 && (
          <section className="mb-10">
            <SectionHeading>📝 Problems from the actual test</SectionHeading>
            <p className="mb-4 text-sm text-slate-600">
              Pool items for this topic — expand for steps and the keyed answer.
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
                      <div className="border-t border-slate-100 bg-emerald-50/50 px-6 py-4">
                        {solution && (
                          <>
                            <p className="mb-2 font-semibold text-emerald-900">
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
                        <p className="font-semibold text-emerald-900">
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
          <SectionHeading>🚀 Next steps</SectionHeading>
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Related topics
            </p>
            <div className="flex flex-wrap gap-2">
              {AV_NEXT_LINKS.map((nav) => (
                <Link
                  key={nav.href}
                  to={nav.href}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900 transition-colors hover:bg-emerald-100"
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
            className="rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-emerald-500"
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
