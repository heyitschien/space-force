import { FormulaCard } from '../FormulaCard';
import { Math } from '../Math';

interface AlgebraProps {
  visible: boolean;
}

export function Algebra({ visible }: AlgebraProps) {
  if (!visible) return null;

  return (
    <section id="algebra" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-6">Algebra & Coordinate Geometry</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <FormulaCard title="Slope of a Line">
          <p className="text-gray-600 mb-2">Change in <Math>y</Math> over change in <Math>x</Math>:</p>
          <div className="bg-blue-50 p-4 rounded-lg text-center font-mono text-xl">
            <Math display>{'m = \\frac{y_2 - y_1}{x_2 - x_1}'}</Math>
          </div>
        </FormulaCard>
        <FormulaCard title="Quadratic Formula">
          <p className="text-gray-600 mb-2">For <Math>ax^2 + bx + c = 0</Math>:</p>
          <div className="bg-blue-50 p-4 rounded-lg text-center font-mono text-xl">
            <Math display>{'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}</Math>
          </div>
        </FormulaCard>
        <FormulaCard title="Equations of Lines">
          <ul className="space-y-4">
            <li><span className="font-semibold">Standard:</span> <Math>Ax + By = C</Math></li>
            <li><span className="font-semibold">Slope-Intercept:</span> <Math>y = mx + b</Math></li>
            <li><span className="font-semibold">Point-Slope:</span> <Math>y - y_1 = m(x - x_1)</Math></li>
          </ul>
        </FormulaCard>
        <FormulaCard title="Distance & Midpoint">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Distance:</p>
              <p className="bg-gray-50 p-2 rounded"><Math>{'d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}'}</Math></p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Midpoint:</p>
              <p className="bg-gray-50 p-2 rounded"><Math>{'M = (\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2})'}</Math></p>
            </div>
          </div>
        </FormulaCard>
      </div>
    </section>
  );
}
