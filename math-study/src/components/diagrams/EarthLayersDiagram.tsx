import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { EarthScienceTopicId } from '../../data/earthScienceFacts';
import { DiagramContainer } from './DiagramContainer';

interface EarthLayersDiagramProps {
  onSelect: (id: EarthScienceTopicId) => void;
  selectedId: EarthScienceTopicId | null;
}

const LAYER_IDS: EarthScienceTopicId[] = ['crust', 'mantle', 'core'];
const SPHERE_IDS: EarthScienceTopicId[] = ['biosphere', 'atmosphere', 'lithosphere'];
const CALLOUTS: Array<{
  id: EarthScienceTopicId;
  label: string;
  x: number;
  y: number;
  lineToX: number;
  lineToY: number;
}> = [
  { id: 'atmosphere', label: 'Atmosphere', x: 12, y: 18, lineToX: 34, lineToY: 34 },
  { id: 'biosphere', label: 'Biosphere', x: 134, y: 18, lineToX: 129, lineToY: 36 },
  { id: 'lithosphere', label: 'Lithosphere', x: 136, y: 160, lineToX: 129, lineToY: 147 },
  { id: 'crust-oxygen', label: 'Oxygen in Crust', x: 8, y: 158, lineToX: 38, lineToY: 144 },
];

export function EarthLayersDiagram({
  onSelect,
  selectedId,
}: EarthLayersDiagramProps) {
  const [focusedId, setFocusedId] = useState<EarthScienceTopicId | null>(null);
  const selected = (id: EarthScienceTopicId) => selectedId === id;
  const isHighlighted = (id: EarthScienceTopicId) => selected(id) || focusedId === id;
  const hasLayerSelection = selectedId !== null && LAYER_IDS.includes(selectedId);
  const hasSphereSelection = selectedId !== null && SPHERE_IDS.includes(selectedId);

  const layerOpacity = (id: 'crust' | 'mantle' | 'core') => {
    if (!hasLayerSelection) return 1;
    return selected(id) ? 1 : 0.4;
  };

  const sphereOpacity = (id: EarthScienceTopicId) => {
    if (!hasSphereSelection) return 0.7;
    return selected(id) ? 1 : 0.3;
  };

  const activateWithKeyboard = (
    event: KeyboardEvent<SVGGElement | SVGRectElement>,
    id: EarthScienceTopicId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const nodeClass = (id: EarthScienceTopicId) =>
    `cursor-pointer transition-all duration-200 ${
      isHighlighted(id) ? 'opacity-100' : 'opacity-90 hover:opacity-100'
    }`;

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-amber-50/50"
      aria-label="Interactive Earth layers diagram with crust, mantle, core, and spheres"
    >
      <div className="flex w-full flex-col gap-4 p-4">
        {/* Earth cross-section: concentric circles */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Atmosphere halo (spatial sphere overlay) */}
            <g
              className={nodeClass('atmosphere')}
              role="button"
              tabIndex={0}
              aria-label="Atmosphere: gas envelope around Earth"
              onClick={() => onSelect('atmosphere')}
              onKeyDown={(e) => activateWithKeyboard(e, 'atmosphere')}
              onFocus={() => setFocusedId('atmosphere')}
              onBlur={() => setFocusedId((prev) => (prev === 'atmosphere' ? null : prev))}
              style={{ opacity: sphereOpacity('atmosphere') }}
            >
              <circle
                cx="100"
                cy="100"
                r="102"
                fill="none"
                stroke={isHighlighted('atmosphere') ? '#38bdf8' : '#7dd3fc'}
                strokeWidth="7"
                strokeDasharray="2 4"
              />
            </g>

            {/* Lithosphere shell (crust + upper mantle visual cue) */}
            <g
              className={nodeClass('lithosphere')}
              role="button"
              tabIndex={0}
              aria-label="Lithosphere: rigid crust and upper mantle shell"
              onClick={() => onSelect('lithosphere')}
              onKeyDown={(e) => activateWithKeyboard(e, 'lithosphere')}
              onFocus={() => setFocusedId('lithosphere')}
              onBlur={() => setFocusedId((prev) => (prev === 'lithosphere' ? null : prev))}
              style={{ opacity: sphereOpacity('lithosphere') }}
            >
              <path
                d="M100 26 A74 74 0 0 1 174 100 A74 74 0 0 1 100 174 A74 74 0 0 1 26 100 A74 74 0 0 1 100 26 Z M100 38 A62 62 0 0 0 162 100 A62 62 0 0 0 100 162 A62 62 0 0 0 38 100 A62 62 0 0 0 100 38 Z"
                fill={isHighlighted('lithosphere') ? '#fde68a' : '#fef3c7'}
                stroke={isHighlighted('lithosphere') ? '#ca8a04' : '#d97706'}
                strokeWidth="1.5"
                fillRule="evenodd"
              />
            </g>

            {/* Biosphere band near surface */}
            <g
              className={nodeClass('biosphere')}
              role="button"
              tabIndex={0}
              aria-label="Biosphere: thin life zone near Earth's surface"
              onClick={() => onSelect('biosphere')}
              onKeyDown={(e) => activateWithKeyboard(e, 'biosphere')}
              onFocus={() => setFocusedId('biosphere')}
              onBlur={() => setFocusedId((prev) => (prev === 'biosphere' ? null : prev))}
              style={{ opacity: sphereOpacity('biosphere') }}
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={isHighlighted('biosphere') ? '#22c55e' : '#4ade80'}
                strokeWidth="4"
              />
            </g>

            {/* Mantle - middle ring (path creates ring via evenodd) */}
            <g
              className={nodeClass('mantle')}
              role="button"
              tabIndex={0}
              aria-label="Mantle: thick middle layer"
              onClick={() => onSelect('mantle')}
              onKeyDown={(e) => activateWithKeyboard(e, 'mantle')}
              onFocus={() => setFocusedId('mantle')}
              onBlur={() => setFocusedId((prev) => (prev === 'mantle' ? null : prev))}
              style={{ opacity: layerOpacity('mantle') }}
            >
              <path
                d="M100 35 A65 65 0 0 1 165 100 A65 65 0 0 1 100 165 A65 65 0 0 1 35 100 A65 65 0 0 1 100 35 Z M100 71 A36 36 0 0 0 136 100 A36 36 0 0 0 100 129 A36 36 0 0 0 64 100 A36 36 0 0 0 100 71 Z"
                fill={isHighlighted('mantle') ? '#fef3c7' : '#fde68a'}
                stroke={isHighlighted('mantle') ? '#b45309' : '#d97706'}
                strokeWidth="2"
                fillRule="evenodd"
              />
              <text x="100" y="72" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="600">
                Mantle
              </text>
              <text x="100" y="82" textAnchor="middle" fontSize="9" fill="#78350f">
                thick middle
              </text>
            </g>

            {/* Crust - outermost */}
            <g
              className={nodeClass('crust')}
              role="button"
              tabIndex={0}
              aria-label="Crust: thin outermost layer"
              onClick={() => onSelect('crust')}
              onKeyDown={(e) => activateWithKeyboard(e, 'crust')}
              onFocus={() => setFocusedId('crust')}
              onBlur={() => setFocusedId((prev) => (prev === 'crust' ? null : prev))}
              style={{ opacity: layerOpacity('crust') }}
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke={isHighlighted('crust') ? '#92400e' : '#b45309'}
                strokeWidth="12"
              />
              <text x="100" y="27" textAnchor="middle" fontSize="11" fill="#78350f" fontWeight="600">
                Crust
              </text>
              <text x="100" y="37" textAnchor="middle" fontSize="9" fill="#78350f">
                thin shell
              </text>
            </g>

            {/* Core - innermost (rendered last so text never gets hidden) */}
            <g
              className={nodeClass('core')}
              role="button"
              tabIndex={0}
              aria-label="Core: innermost layer"
              onClick={() => onSelect('core')}
              onKeyDown={(e) => activateWithKeyboard(e, 'core')}
              onFocus={() => setFocusedId('core')}
              onBlur={() => setFocusedId((prev) => (prev === 'core' ? null : prev))}
              style={{ opacity: layerOpacity('core') }}
            >
              <circle
                cx="100"
                cy="100"
                r="35"
                fill={isHighlighted('core') ? '#c2410c' : '#ea580c'}
                stroke={isHighlighted('core') ? '#9a3412' : '#c2410c'}
                strokeWidth="2"
              />
              <text x="100" y="98" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">
                Core
              </text>
              <text x="100" y="109" textAnchor="middle" fontSize="8.3" fill="rgba(255,255,255,0.92)">
                hot center
              </text>
            </g>

            {/* Spatial callouts for spheres/composition */}
            {CALLOUTS.map((item) => {
              const highlighted = isHighlighted(item.id);
              return (
                <g
                  key={item.id}
                  className={nodeClass(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.label} callout`}
                  onClick={() => onSelect(item.id)}
                  onKeyDown={(e) => activateWithKeyboard(e, item.id)}
                  onFocus={() => setFocusedId(item.id)}
                  onBlur={() => setFocusedId((prev) => (prev === item.id ? null : prev))}
                >
                  <line
                    x1={item.x + (item.id === 'crust-oxygen' ? 40 : 34)}
                    y1={item.y + 12}
                    x2={item.lineToX}
                    y2={item.lineToY}
                    stroke={highlighted ? '#92400e' : '#a16207'}
                    strokeWidth="1.2"
                  />
                  <rect
                    x={item.x}
                    y={item.y}
                    width={item.id === 'crust-oxygen' ? 80 : 68}
                    height="24"
                    rx="6"
                    fill={highlighted ? '#fef3c7' : '#fffbeb'}
                    stroke={highlighted ? '#d97706' : '#fcd34d'}
                    strokeWidth="1.2"
                  />
                  <text
                    x={item.x + (item.id === 'crust-oxygen' ? 40 : 34)}
                    y={item.y + 15}
                    textAnchor="middle"
                    fontSize="8.8"
                    fontWeight="600"
                    fill="#78350f"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </DiagramContainer>
  );
}
