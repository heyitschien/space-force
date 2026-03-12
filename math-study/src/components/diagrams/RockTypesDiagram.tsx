import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { EarthScienceTopicId } from '../../data/earthScienceFacts';
import { DiagramContainer } from './DiagramContainer';

interface RockTypesDiagramProps {
  onSelect: (id: EarthScienceTopicId) => void;
  selectedId: EarthScienceTopicId | null;
}

const ITEMS: Array<{ id: EarthScienceTopicId; title: string; sub: string }> = [
  { id: 'igneous', title: 'Igneous', sub: 'Cooled magma/lava' },
  { id: 'sedimentary', title: 'Sedimentary', sub: 'Compressed sediments' },
  { id: 'metamorphic', title: 'Metamorphic', sub: 'Heat + pressure' },
  { id: 'pumice', title: 'Pumice', sub: 'Igneous example; floats' },
];

function RockIcon({ type }: { type: EarthScienceTopicId }) {
  const iconClass = 'w-8 h-8 text-amber-700';
  switch (type) {
    case 'igneous':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <polygon points="16,4 28,28 4,28" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="16" cy="10" rx="4" ry="3" fill="currentColor" opacity="0.8" />
        </svg>
      );
    case 'sedimentary':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <rect x="4" y="8" width="24" height="5" rx="1" opacity="0.9" />
          <rect x="4" y="14" width="24" height="5" rx="1" opacity="0.7" />
          <rect x="4" y="20" width="24" height="5" rx="1" opacity="0.5" />
        </svg>
      );
    case 'metamorphic':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <path
            d="M4 24 L12 12 L20 20 L28 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20 L10 14 L18 18 L28 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'pumice':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <circle cx="16" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="13" cy="10" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="19" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.6" />
          <line x1="6" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

export function RockTypesDiagram({
  onSelect,
  selectedId,
}: RockTypesDiagramProps) {
  const [focusedId, setFocusedId] = useState<EarthScienceTopicId | null>(null);
  const selected = (id: EarthScienceTopicId) => selectedId === id;
  const isHighlighted = (id: EarthScienceTopicId) => selected(id) || focusedId === id;
  const hasSelectedTested = selectedId !== null && ITEMS.some((item) => item.id === selectedId);
  const testedOpacity = (id: EarthScienceTopicId) =>
    hasSelectedTested ? (selected(id) ? 1 : 0.45) : 1;

  const activateWithKeyboard = (
    event: KeyboardEvent<SVGElement | HTMLButtonElement>,
    id: EarthScienceTopicId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const cardBase =
    'rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2';

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-stone-50/50"
      aria-label="Interactive rock types diagram: igneous, sedimentary, metamorphic, pumice"
    >
      <div className="w-full space-y-4 p-4">
        {/* Process hint bar */}
        <div className="rounded-lg border border-stone-200 bg-stone-100/70 p-3 text-sm text-stone-800">
          Cooled lava {"->"} Igneous | Compressed sediments {"->"} Sedimentary | Heat + pressure{" "}
          {"->"} Metamorphic
        </div>

        {/* Rock cycle flow (SVG) */}
        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 480 80"
            className="h-20 w-full min-w-[400px]"
            aria-label="Rock cycle flow: magma to igneous to sediments to sedimentary to metamorphic"
          >
            <defs>
              <marker
                id="rockArrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="#78716c" />
              </marker>
            </defs>
            {/* Magma node */}
            <g>
              <rect x="10" y="20" width="60" height="40" rx="6" fill="#f5f5f4" stroke="#a8a29e" />
              <text x="40" y="45" textAnchor="middle" fontSize="10" fill="#57534e">
                Magma
              </text>
            </g>
            <line
              x1="70"
              y1="40"
              x2="95"
              y2="40"
              stroke="#78716c"
              strokeWidth="2"
              markerEnd="url(#rockArrow)"
            />
            <text x="82" y="35" textAnchor="middle" fontSize="8" fill="#57534e">
              cooling
            </text>
            {/* Igneous - clickable */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Igneous rock node in rock cycle"
              onClick={() => onSelect('igneous')}
              onKeyDown={(e) => activateWithKeyboard(e, 'igneous')}
              onFocus={() => setFocusedId('igneous')}
              onBlur={() => setFocusedId((prev) => (prev === 'igneous' ? null : prev))}
              className="cursor-pointer"
              style={{ opacity: testedOpacity('igneous') }}
            >
              <rect
                x="95"
                y="20"
                width="70"
                height="40"
                rx="6"
                fill={isHighlighted('igneous') ? '#fef3c7' : '#fefce8'}
                stroke={isHighlighted('igneous') ? '#b45309' : '#a8a29e'}
                strokeWidth={isHighlighted('igneous') ? 2 : 1}
              />
              <text x="130" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">
                Igneous
              </text>
              <text x="130" y="54" textAnchor="middle" fontSize="9" fill="#92400e">
                e.g. pumice
              </text>
            </g>
            {/* Pumice badge - clickable, below Igneous */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Pumice badge linked to igneous rock"
              onClick={(e) => {
                e.stopPropagation();
                onSelect('pumice');
              }}
              onKeyDown={(e) => {
                activateWithKeyboard(e, 'pumice');
              }}
              onFocus={() => setFocusedId('pumice')}
              onBlur={() => setFocusedId((prev) => (prev === 'pumice' ? null : prev))}
              className="cursor-pointer"
              style={{ opacity: testedOpacity('pumice') }}
            >
              <rect
                x="108"
                y="62"
                width="44"
                height="16"
                rx="4"
                fill={isHighlighted('pumice') ? '#fef3c7' : '#fefce8'}
                stroke={isHighlighted('pumice') ? '#b45309' : '#a8a29e'}
                strokeWidth={isHighlighted('pumice') ? 2 : 1}
              />
              <text x="130" y="73" textAnchor="middle" fontSize="9" fontWeight="600" fill="#78350f">
                Pumice
              </text>
            </g>
            <line
              x1="165"
              y1="40"
              x2="190"
              y2="40"
              stroke="#78716c"
              strokeWidth="2"
              markerEnd="url(#rockArrow)"
            />
            <text x="177" y="35" textAnchor="middle" fontSize="7.8" fill="#57534e">
              weathering
            </text>
            {/* Sediments */}
            <g>
              <rect x="190" y="20" width="60" height="40" rx="6" fill="#f5f5f4" stroke="#a8a29e" />
              <text x="220" y="45" textAnchor="middle" fontSize="10" fill="#57534e">
                Sediments
              </text>
            </g>
            <line
              x1="250"
              y1="40"
              x2="275"
              y2="40"
              stroke="#78716c"
              strokeWidth="2"
              markerEnd="url(#rockArrow)"
            />
            <text x="262" y="35" textAnchor="middle" fontSize="7.8" fill="#57534e">
              compaction
            </text>
            {/* Sedimentary - clickable */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Sedimentary rock node in rock cycle"
              onClick={() => onSelect('sedimentary')}
              onKeyDown={(e) => activateWithKeyboard(e, 'sedimentary')}
              onFocus={() => setFocusedId('sedimentary')}
              onBlur={() => setFocusedId((prev) => (prev === 'sedimentary' ? null : prev))}
              className="cursor-pointer"
              style={{ opacity: testedOpacity('sedimentary') }}
            >
              <rect
                x="275"
                y="20"
                width="80"
                height="40"
                rx="6"
                fill={isHighlighted('sedimentary') ? '#fef3c7' : '#fefce8'}
                stroke={isHighlighted('sedimentary') ? '#b45309' : '#a8a29e'}
                strokeWidth={isHighlighted('sedimentary') ? 2 : 1}
              />
              <text x="315" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">
                Sedimentary
              </text>
            </g>
            <line
              x1="355"
              y1="40"
              x2="380"
              y2="40"
              stroke="#78716c"
              strokeWidth="2"
              markerEnd="url(#rockArrow)"
            />
            <text x="367" y="35" textAnchor="middle" fontSize="8" fill="#57534e">
              heat+pressure
            </text>
            {/* Metamorphic - clickable */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Metamorphic rock node in rock cycle"
              onClick={() => onSelect('metamorphic')}
              onKeyDown={(e) => activateWithKeyboard(e, 'metamorphic')}
              onFocus={() => setFocusedId('metamorphic')}
              onBlur={() => setFocusedId((prev) => (prev === 'metamorphic' ? null : prev))}
              className="cursor-pointer"
              style={{ opacity: testedOpacity('metamorphic') }}
            >
              <rect
                x="380"
                y="20"
                width="90"
                height="40"
                rx="6"
                fill={isHighlighted('metamorphic') ? '#fef3c7' : '#fefce8'}
                stroke={isHighlighted('metamorphic') ? '#b45309' : '#a8a29e'}
                strokeWidth={isHighlighted('metamorphic') ? 2 : 1}
              />
              <text x="425" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">
                Metamorphic
              </text>
            </g>
            {/* Reverse cue: melting back to magma */}
            <path
              d="M425 16 C360 0 140 0 70 16"
              fill="none"
              stroke="#a8a29e"
              strokeWidth="1.4"
              strokeDasharray="3 3"
              markerEnd="url(#rockArrow)"
            />
            <text x="245" y="9" textAnchor="middle" fontSize="8" fill="#57534e">
              melting
            </text>
          </svg>
        </div>

        {/* Cards with icons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                onKeyDown={(e) => activateWithKeyboard(e, item.id)}
                onFocus={() => setFocusedId(item.id)}
                onBlur={() => setFocusedId((prev) => (prev === item.id ? null : prev))}
                aria-label={`${item.title} rock type card`}
                className={`${cardBase} ${
                  isHighlighted(item.id)
                    ? 'border-amber-500 bg-amber-100 shadow-md'
                    : 'border-amber-200 bg-white hover:border-amber-300 hover:shadow-sm'
                }`}
                style={{ opacity: testedOpacity(item.id) }}
              >
                <div className="mb-2 flex justify-center">
                  <RockIcon type={item.id} />
                </div>
                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                <p className="mt-1 text-xs text-slate-600">{item.sub}</p>
              </button>
            );
          })}
        </div>
      </div>
    </DiagramContainer>
  );
}
