import { Math } from '../Math';

interface ProbabilityStatsProps {
  visible: boolean;
}

const CENTRAL_TENDENCY = [
  { term: 'Mean', desc: 'Sum / Total Items' },
  { term: 'Median', desc: 'Middle value (in order)' },
  { term: 'Mode', desc: 'Occurs most often' },
  { term: 'Range', desc: 'Max - Min' },
];

export function ProbabilityStats({ visible }: ProbabilityStatsProps) {
  if (!visible) return null;

  return (
    <section id="probability-stats" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-orange-800 border-b-2 border-orange-200 pb-2 mb-6">Statistics & Probability</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm formula-card">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-orange-500">📊</span> Central Tendency
          </h3>
          <div className="space-y-3">
            {CENTRAL_TENDENCY.map(({ term, desc }) => (
              <div key={term} className="flex justify-between border-b pb-1">
                <span>{term}</span>
                <span className="font-semibold text-xs text-gray-500">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm formula-card">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-orange-500">🎲</span> Probability
          </h3>
          <div className="space-y-3 text-sm">
            <p><span className="font-bold">Basic:</span> <Math>{'P(A) = \\frac{\\text{Desired Outcomes}}{\\text{Total Outcomes}}'}</Math></p>
            <p><span className="font-bold">Not A:</span> <Math>1 - P(A)</Math></p>
            <p><span className="font-bold">Independent AND:</span> <Math>{'P(A) \\times P(B)'}</Math></p>
            <p><span className="font-bold">Exclusive OR:</span> <Math>P(A) + P(B)</Math></p>
          </div>
        </div>
      </div>
    </section>
  );
}
