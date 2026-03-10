import type { EarthScienceTopicId } from '../../data/earthScienceFacts';
import { DiagramContainer } from './DiagramContainer';

interface EarthLayersDiagramProps {
  onSelect: (id: EarthScienceTopicId) => void;
  selectedId: EarthScienceTopicId | null;
}

const SPHERE_IDS: EarthScienceTopicId[] = ['biosphere', 'atmosphere', 'lithosphere'];

export function EarthLayersDiagram({
  onSelect,
  selectedId,
}: EarthLayersDiagramProps) {
  const selected = (id: EarthScienceTopicId) => selectedId === id;

  const nodeClass = (id: EarthScienceTopicId) =>
    `cursor-pointer transition-all ${selected(id) ? 'opacity-100' : 'opacity-95 hover:opacity-100'}`;

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-amber-50/50"
      aria-label="Interactive Earth layers diagram with crust, mantle, core, and spheres"
    >
      <div className="flex w-full flex-col gap-4 p-4">
        {/* Earth cross-section: concentric circles */}
        <div className="relative mx-auto flex aspect-square max-w-[280px] items-center justify-center">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Core - innermost */}
            <g
              className={nodeClass('core')}
              role="button"
              tabIndex={0}
              onClick={() => onSelect('core')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('core')}
            >
              <circle
                cx="100"
                cy="100"
                r="35"
                fill={selected('core') ? '#c2410c' : '#ea580c'}
                stroke={selected('core') ? '#9a3412' : '#c2410c'}
                strokeWidth="2"
              />
              <text x="100" y="105" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">
                Core
              </text>
            </g>

            {/* Mantle - middle ring (path creates ring via evenodd) */}
            <g
              className={nodeClass('mantle')}
              role="button"
              tabIndex={0}
              onClick={() => onSelect('mantle')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('mantle')}
            >
              <path
                d="M100 35 A65 65 0 0 1 165 100 A65 65 0 0 1 100 165 A65 65 0 0 1 35 100 A65 65 0 0 1 100 35 Z M100 71 A36 36 0 0 0 136 100 A36 36 0 0 0 100 129 A36 36 0 0 0 64 100 A36 36 0 0 0 100 71 Z"
                fill={selected('mantle') ? '#fef3c7' : '#fde68a'}
                stroke={selected('mantle') ? '#b45309' : '#d97706'}
                strokeWidth="2"
                fillRule="evenodd"
              />
              <text x="100" y="75" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="600">
                Mantle
              </text>
            </g>

            {/* Crust - outermost */}
            <g
              className={nodeClass('crust')}
              role="button"
              tabIndex={0}
              onClick={() => onSelect('crust')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('crust')}
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke={selected('crust') ? '#92400e' : '#b45309'}
                strokeWidth="12"
              />
              <text x="100" y="30" textAnchor="middle" fontSize="11" fill="#78350f" fontWeight="600">
                Crust
              </text>
            </g>
          </svg>
        </div>

        {/* Spheres + composition: biosphere, atmosphere, lithosphere, crust-oxygen */}
        <div className="flex flex-wrap justify-center gap-2">
          {[...SPHERE_IDS, 'crust-oxygen' as EarthScienceTopicId].map((id) => {
            const labels: Record<string, string> = {
              biosphere: 'Biosphere',
              atmosphere: 'Atmosphere',
              lithosphere: 'Lithosphere',
              'crust-oxygen': 'Oxygen in Crust',
            };
            const isSelected = selected(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-100 text-amber-900'
                    : 'border-amber-200 bg-white text-amber-800 hover:border-amber-300'
                }`}
              >
                {labels[id]}
              </button>
            );
          })}
        </div>
      </div>
    </DiagramContainer>
  );
}
