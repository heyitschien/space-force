import { Math } from '../Math';

interface Geometry2DProps {
  visible: boolean;
}

const CARDS = [
  { title: 'Triangle Sum Theorem', content: 'Sum of interior angles = ', formula: '180^\\circ' },
  { title: 'Pythagorean Theorem', content: null, formula: 'a^2 + b^2 = c^2' },
  { title: 'Area of a Triangle', content: null, formula: 'A = \\frac{1}{2}bh' },
  { title: 'Circles', content: 'Area: ', formula: 'A = \\pi r^2', extra: 'Circumference: ', extraFormula: 'C = 2\\pi r = \\pi d' },
  { title: 'Polygon Interior Sum', content: null, formula: 'S = 180(n - 2)' },
  { title: 'Trapezoid Area', content: null, formula: 'A = \\frac{1}{2}(b_1 + b_2)h' },
];

export function Geometry2D({ visible }: Geometry2DProps) {
  if (!visible) return null;

  return (
    <section id="geometry-2d" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-200 pb-2 mb-6">2D Geometry & Polygons</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <div key={card.title} className="bg-white p-4 rounded-xl shadow-sm border border-green-100 formula-card">
            <h4 className="font-bold text-green-700">{card.title}</h4>
            <p className="text-sm mt-2">
              {card.content && <span>{card.content}</span>}
              <Math>{card.formula}</Math>
              {card.extra && (
                <>
                  <br />
                  <span>{card.extra}</span>
                  <Math>{card.extraFormula!}</Math>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
