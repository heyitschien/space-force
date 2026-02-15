import { Fragment, useState } from 'react';
import { Math } from '../Math';
import { Shape3DViewer } from '../diagrams/Shape3DViewer';

interface Geometry3DProps {
  visible: boolean;
}

type Shape3DType = 'cube' | 'box' | 'cylinder' | 'sphere' | 'pyramid' | 'cone';

const ROWS: { shape: string; volume: string; surface: string; viewerShape: Shape3DType }[] = [
  { shape: 'Cube', volume: 'a^3', surface: '6a^2', viewerShape: 'cube' },
  { shape: 'Rect. Solid', volume: 'l \\times w \\times h', surface: '2(lw + wh + hl)', viewerShape: 'box' },
  { shape: 'Cylinder', volume: '\\pi r^2 h', surface: '2\\pi rh + 2\\pi r^2', viewerShape: 'cylinder' },
  { shape: 'Sphere', volume: '\\frac{4}{3}\\pi r^3', surface: '4\\pi r^2', viewerShape: 'sphere' },
  { shape: 'Pyramid', volume: '\\frac{1}{3}abh', surface: 'Sum of bases & faces', viewerShape: 'pyramid' },
  { shape: 'Cone', volume: '\\frac{1}{3}\\pi r^2 h', surface: '\\pi r^2 + \\pi rl', viewerShape: 'cone' },
];

export function Geometry3D({ visible }: Geometry3DProps) {
  const [expandedShape, setExpandedShape] = useState<Shape3DType | null>(null);

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
              <th className="px-4 py-3 w-24">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ROWS.map((row) => (
              <Fragment key={row.shape}>
                <tr>
                  <td className="px-4 py-3 font-semibold">{row.shape}</td>
                  <td className="px-4 py-3"><Math>{row.volume}</Math></td>
                  <td className="px-4 py-3"><Math>{row.surface}</Math></td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setExpandedShape((s) => (s === row.viewerShape ? null : row.viewerShape))}
                      className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      {expandedShape === row.viewerShape ? 'Hide' : 'View 3D'}
                    </button>
                  </td>
                </tr>
                {expandedShape === row.viewerShape && (
                  <tr key={`${row.shape}-visual`}>
                    <td colSpan={4} className="px-4 py-4 bg-purple-50">
                      <Shape3DViewer shape={row.viewerShape} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
