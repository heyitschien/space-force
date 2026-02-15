import { Math } from '../Math';

interface Geometry3DProps {
  visible: boolean;
}

const ROWS = [
  { shape: 'Cube', volume: 'a^3', surface: '6a^2' },
  { shape: 'Rect. Solid', volume: 'l \\times w \\times h', surface: '2(lw + wh + hl)' },
  { shape: 'Cylinder', volume: '\\pi r^2 h', surface: '2\\pi rh + 2\\pi r^2' },
  { shape: 'Sphere', volume: '\\frac{4}{3}\\pi r^3', surface: '4\\pi r^2' },
  { shape: 'Pyramid', volume: '\\frac{1}{3}abh', surface: 'Sum of bases & faces' },
  { shape: 'Cone', volume: '\\frac{1}{3}\\pi r^2 h', surface: '\\pi r^2 + \\pi rl' },
];

export function Geometry3D({ visible }: Geometry3DProps) {
  if (!visible) return null;

  return (
    <section id="geometry-3d" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-purple-800 border-b-2 border-purple-200 pb-2 mb-6">Volume & Surface Area</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
          <thead className="bg-purple-700 text-white text-left">
            <tr>
              <th className="px-4 py-3">Shape</th>
              <th className="px-4 py-3">Volume (<Math>V</Math>)</th>
              <th className="px-4 py-3">Surface Area (<Math>SA</Math>)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ROWS.map((row) => (
              <tr key={row.shape}>
                <td className="px-4 py-3 font-semibold">{row.shape}</td>
                <td className="px-4 py-3"><Math>{row.volume}</Math></td>
                <td className="px-4 py-3"><Math>{row.surface}</Math></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
