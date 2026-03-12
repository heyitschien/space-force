import { useState } from 'react';
import { ArithmeticReasoningTestLauncher } from '../ArithmeticReasoningTestLauncher';

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

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-2 text-lg font-bold text-slate-800">Key Skills</h3>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Rate × quantity = total</li>
          <li>Fractions, decimals, and percents</li>
          <li>Word problem setup and solving for unknowns</li>
          <li>Distance, speed, and time</li>
          <li>Averages and ratios</li>
        </ul>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
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
