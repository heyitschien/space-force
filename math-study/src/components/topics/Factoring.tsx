import { Math } from '../Math';

interface FactoringProps {
  visible: boolean;
}

export function Factoring({ visible }: FactoringProps) {
  if (!visible) return null;

  return (
    <section id="factoring" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-red-800 border-b-2 border-red-200 pb-2 mb-6">Factoring Guide</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-red-500 formula-card">
        <div className="mb-4">
          <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded">STEP 1</span>
          <p className="mt-1 font-bold">Always check for a Greatest Common Factor (GCF) first!</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="space-y-2">
            <h4 className="font-bold text-red-700 underline">2 Terms</h4>
            <p className="text-xs">
              Difference of Squares:<br />
              <Math>A^2 - B^2 = (A-B)(A+B)</Math>
            </p>
            <p className="text-xs">
              Sum of Cubes:<br />
              <Math>A^3 + B^3 = (A+B)(A^2 - AB + B^2)</Math>
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-red-700 underline">3 Terms</h4>
            <p className="text-xs">
              Trinomials (<Math>x^2 + bx + c</Math>):<br />
              Find numbers that multiply to <Math>c</Math> and add to <Math>b</Math>.
            </p>
            <p className="text-xs">
              Perfect Squares:<br />
              <Math>(a+b)^2 = a^2 + 2ab + b^2</Math>
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-red-700 underline">4 Terms</h4>
            <p className="text-xs italic">Factor by Grouping!</p>
            <p className="text-xs">Group terms 2-by-2 and find the common binomial.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
