import { Math } from '../Math';

interface SpecialTopicsProps {
  visible: boolean;
}

const TOPICS = [
  { title: 'Simple Interest', formula: 'I = prt', desc: 'p=Principal, r=Rate, t=Time' },
  { title: 'Distance-Rate-Time', formula: 'd = rt', desc: 'Distance = Rate × Time' },
  { title: 'Combined Work', formula: '\\frac{T}{A} + \\frac{T}{B} = 1', desc: 'T=Combined Time, A/B=Individual Times' },
  { title: 'Temperature', formula: null, desc: null, formulas: ['F = \\frac{9}{5}C + 32', 'C = \\frac{5}{9}(F - 32)'] },
  { title: 'PEMDAS', formula: null, desc: 'Parentheses, Exponents, Mult/Div, Add/Sub', special: true },
  { title: 'Percent Change', formula: '\\frac{New - Old}{Old} \\times 100', desc: null },
];

export function SpecialTopics({ visible }: SpecialTopicsProps) {
  if (!visible) return null;

  return (
    <section id="special-topics" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">Special Topics</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <div key={topic.title} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 formula-card">
            <h4 className="font-bold text-gray-700">{topic.title}</h4>
            {topic.special ? (
              <p className="text-xs font-bold text-blue-600 mt-2">{topic.desc}</p>
            ) : topic.formulas ? (
              <>
                <p className="text-xs mt-2"><Math>{topic.formulas[0]}</Math></p>
                <p className="text-xs mt-1"><Math>{topic.formulas[1]}</Math></p>
              </>
            ) : (
              <>
                <p className="text-xl font-mono mt-2"><Math>{topic.formula!}</Math></p>
                {topic.desc && <p className="text-xs text-gray-500 mt-1">{topic.desc}</p>}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
