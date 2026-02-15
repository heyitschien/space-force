import { Math } from '../Math';
import { FormulaCardWithVisual } from '../FormulaCardWithVisual';
import { TriangleDiagram } from '../diagrams/TriangleDiagram';
import { PythagoreanDiagram } from '../diagrams/PythagoreanDiagram';
import { CircleDiagram } from '../diagrams/CircleDiagram';
import { TrapezoidDiagram } from '../diagrams/TrapezoidDiagram';
import { PolygonDiagram } from '../diagrams/PolygonDiagram';

interface Geometry2DProps {
  visible: boolean;
}

const CARDS = [
  {
    title: 'Triangle Sum Theorem',
    content: 'Sum of interior angles = ',
    formula: '180^\\circ',
    visual: <TriangleDiagram showAngles />,
  },
  {
    title: 'Pythagorean Theorem',
    content: null,
    formula: 'a^2 + b^2 = c^2',
    visual: <PythagoreanDiagram />,
  },
  {
    title: 'Area of a Triangle',
    content: null,
    formula: 'A = \\frac{1}{2}bh',
    visual: <TriangleDiagram />,
  },
  {
    title: 'Circles',
    content: 'Area: ',
    formula: 'A = \\pi r^2',
    extra: 'Circumference: ',
    extraFormula: 'C = 2\\pi r = \\pi d',
    visual: <CircleDiagram />,
  },
  {
    title: 'Polygon Interior Sum',
    content: null,
    formula: 'S = 180(n - 2)',
    visual: <PolygonDiagram />,
  },
  {
    title: 'Trapezoid Area',
    content: null,
    formula: 'A = \\frac{1}{2}(b_1 + b_2)h',
    visual: <TrapezoidDiagram />,
  },
];

export function Geometry2D({ visible }: Geometry2DProps) {
  if (!visible) return null;

  return (
    <section id="geometry-2d" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-200 pb-2 mb-6">2D Geometry & Polygons</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <FormulaCardWithVisual
            key={card.title}
            title={card.title}
            borderColor="border-green-500"
            visual={card.visual}
            visualLabel="Show diagram"
            className="formula-card"
          >
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
          </FormulaCardWithVisual>
        ))}
      </div>
    </section>
  );
}
