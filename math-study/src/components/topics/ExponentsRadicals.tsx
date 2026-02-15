import { Math } from '../Math';

interface ExponentsRadicalsProps {
  visible: boolean;
}

const EXPONENT_RULES = [
  { label: 'Zero Power', formula: 'a^0 = 1' },
  { label: 'Product Rule', formula: 'a^m \\cdot a^n = a^{m+n}' },
  { label: 'Quotient Rule', formula: '\\frac{a^m}{a^n} = a^{m-n}' },
  { label: 'Power of Power', formula: '(a^m)^n = a^{mn}' },
  { label: 'Negative Rule', formula: 'a^{-n} = \\frac{1}{a^n}' },
];

const RADICAL_RULES = [
  { label: 'Fractional Exp', formula: 'a^{1/n} = \\sqrt[n]{a}' },
  { label: 'General', formula: 'a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m' },
  { label: 'Product Prop', formula: '\\sqrt[n]{ab} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}' },
  { label: 'Quotient Prop', formula: '\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}' },
];

export function ExponentsRadicals({ visible }: ExponentsRadicalsProps) {
  if (!visible) return null;

  return (
    <section id="exponents-radicals" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-6">Laws of Exponents & Radicals</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3 border-t-4 border-indigo-600 formula-card">
          <h3 className="font-bold">Exponents Rules</h3>
          <ul className="space-y-2 text-sm">
            {EXPONENT_RULES.map(({ label, formula }) => (
              <li key={label} className="flex justify-between">
                <span>{label}:</span>
                <span><Math>{formula}</Math></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3 border-t-4 border-indigo-600 formula-card">
          <h3 className="font-bold">Radical Properties</h3>
          <ul className="space-y-2 text-sm">
            {RADICAL_RULES.map(({ label, formula }) => (
              <li key={label} className="flex justify-between">
                <span>{label}:</span>
                <span><Math>{formula}</Math></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
