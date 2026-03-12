import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArithmeticReasoningTestLauncher } from '../ArithmeticReasoningTestLauncher';
import { AR_TOPICS } from '../../data/arTopicContent';

interface ArithmeticReasoningProps {
  visible: boolean;
}

export function ArithmeticReasoning({ visible }: ArithmeticReasoningProps) {
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);

  if (!visible) return null;

  return (
    <section id="arithmetic-reasoning" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="mb-2 border-b-2 border-rose-200 pb-2 text-2xl font-bold text-rose-800">
            Arithmetic Reasoning
          </h2>
          <p className="text-slate-600">
            Word problems using fractions, decimals, percents, ratios, and basic algebra. 30 questions, 36 minutes.
          </p>
        </div>
      </div>

      <p className="mb-6 text-center text-sm font-medium text-rose-700">
        Recognize the pattern → solve in 10–20 seconds → 90+ AFQT
      </p>

      <div className="mb-8 rounded-xl border-2 border-rose-200 bg-rose-50/50 p-6 shadow-sm">
        <h3 className="mb-2 text-lg font-bold text-slate-800">Key Skills</h3>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Rate × quantity = total</li>
          <li>Fractions, decimals, and percents</li>
          <li>Word problem setup and solving for unknowns</li>
          <li>Distance, speed, and time</li>
          <li>Averages and ratios</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold text-slate-800">Study Topics</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/arithmetic-reasoning/patterns"
            className="flex flex-col rounded-xl border-2 border-rose-300 bg-rose-50/80 p-5 shadow-sm transition-all hover:border-rose-400 hover:bg-rose-100/80 hover:shadow-md"
          >
            <span className="mb-1 text-xs font-bold uppercase tracking-wide text-rose-600">Start here</span>
            <h4 className="font-bold text-rose-800">20 Patterns</h4>
            <p className="mt-1 text-sm text-slate-600">
              Master the 20 ASVAB math patterns. Solve most questions in 10–20 seconds.
            </p>
            <span className="mt-3 text-sm font-medium text-rose-600">View all 20 →</span>
          </Link>
          {AR_TOPICS.map((topic) => (
            <Link
              key={topic.id}
              to={`/arithmetic-reasoning/${topic.id}`}
              className="flex flex-col rounded-xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-rose-300 hover:bg-rose-50/50 hover:shadow-md"
            >
              <h4 className="font-bold text-rose-800">{topic.title}</h4>
              <p className="mt-1 text-sm text-slate-600">{topic.description}</p>
              <span className="mt-3 text-sm font-medium text-rose-600">Study →</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/arithmetic-reasoning/pattern-drill"
          className="rounded-xl border-2 border-rose-600 px-6 py-3 font-semibold text-rose-600 shadow-md transition-colors hover:bg-rose-50"
        >
          Pattern Drill
        </Link>
        <button
          onClick={() => setPracticeTestOpen(true)}
          className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-rose-500"
        >
          Arithmetic Reasoning Practice Test (30 Q, 36 min)
        </button>
      </div>

      {practiceTestOpen && (
        <ArithmeticReasoningTestLauncher onClose={() => setPracticeTestOpen(false)} />
      )}
    </section>
  );
}
