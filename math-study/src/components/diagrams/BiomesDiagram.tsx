import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { EarthScienceTopicId } from '../../data/earthScienceFacts';
import { DiagramContainer } from './DiagramContainer';

interface BiomesDiagramProps {
  onSelect: (id: EarthScienceTopicId) => void;
  selectedId: EarthScienceTopicId | null;
}

const ITEMS: Array<{ id: EarthScienceTopicId; title: string; sub: string }> = [
  { id: 'tropical-rainforest', title: 'Tropical Rainforest', sub: 'High rainfall + high temp' },
  { id: 'desert', title: 'Desert', sub: 'Very low rainfall' },
  { id: 'tundra', title: 'Tundra', sub: 'Very cold; short growing season' },
  { id: 'grassland', title: 'Grassland', sub: 'Moderate rainfall; grasses' },
  {
    id: 'deciduous-forest',
    title: 'Deciduous Forest',
    sub: 'Moderate seasons; trees lose leaves',
  },
];

type BiomeTopicId = Extract<
  EarthScienceTopicId,
  'tropical-rainforest' | 'desert' | 'tundra' | 'grassland' | 'deciduous-forest'
>;

/** Climate grid positions: temp 0-100 (cold-hot), rainfall 0-100 (dry-wet) */
const GRID_POSITIONS: Record<BiomeTopicId, { temp: number; rainfall: number }> = {
  'tropical-rainforest': { temp: 90, rainfall: 95 },
  desert: { temp: 85, rainfall: 5 },
  tundra: { temp: 10, rainfall: 15 },
  grassland: { temp: 50, rainfall: 45 },
  'deciduous-forest': { temp: 55, rainfall: 65 },
};

const POINT_LABELS: Record<BiomeTopicId, string> = {
  'tropical-rainforest': 'Trop RF',
  desert: 'Desert',
  tundra: 'Tundra',
  grassland: 'Grass',
  'deciduous-forest': 'Decid',
};

function BiomeIcon({ type }: { type: EarthScienceTopicId }) {
  const iconClass = 'w-8 h-8 text-emerald-700';
  switch (type) {
    case 'tropical-rainforest':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <path d="M16 4 L20 14 L16 12 L12 14 Z" fill="currentColor" />
          <path d="M16 8 L22 20 L16 16 L10 20 Z" fill="currentColor" opacity="0.9" />
          <circle cx="14" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="18" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      );
    case 'desert':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <path
            d="M4 28 Q8 20 12 24 Q16 18 20 24 Q24 20 28 24 L28 28 Z"
            fill="currentColor"
            opacity="0.8"
          />
          <path d="M16 8 L18 24 L16 22 L14 24 Z" fill="currentColor" />
        </svg>
      );
    case 'tundra':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <polygon points="16,4 28,28 4,28" fill="currentColor" opacity="0.9" />
          <path d="M8 28 L24 28" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        </svg>
      );
    case 'grassland':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <path d="M6 28 L6 14 L8 20 L10 12 L12 22 L14 10 L16 24 L18 12 L20 20 L22 14 L24 18 L26 12 L26 28 Z" />
        </svg>
      );
    case 'deciduous-forest':
      return (
        <svg viewBox="0 0 32 32" className={iconClass} fill="currentColor">
          <path d="M16 4 L22 18 L16 14 L10 18 Z" fill="currentColor" />
          <path d="M16 10 L24 26 L16 22 L8 26 Z" fill="currentColor" opacity="0.9" />
          <ellipse cx="12" cy="20" rx="2" ry="1" fill="currentColor" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

export function BiomesDiagram({
  onSelect,
  selectedId,
}: BiomesDiagramProps) {
  const [focusedId, setFocusedId] = useState<EarthScienceTopicId | null>(null);
  const selected = (id: EarthScienceTopicId) => selectedId === id;
  const isHighlighted = (id: EarthScienceTopicId) => selected(id) || focusedId === id;

  const activateWithKeyboard = (
    event: KeyboardEvent<SVGGElement | HTMLButtonElement>,
    id: EarthScienceTopicId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const mapToSvg = (temp: number, rainfall: number) => {
    const padding = 50;
    const width = 220;
    const height = 160;
    const x = padding + (temp / 100) * width;
    const y = padding + height - (rainfall / 100) * height;
    return { x, y };
  };

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-green-50/50"
      aria-label="Interactive biomes diagram: tropical rainforest, desert, tundra, grassland, deciduous forest"
    >
      <div className="w-full space-y-4 p-4">
        {/* Climate grid - visible on all screens, primary on lg */}
        <div className="rounded-lg border border-emerald-200 bg-white p-2">
          <p className="mb-2 text-center text-xs font-medium text-emerald-800">
            Temperature vs Rainfall
          </p>
          <svg
            viewBox="0 0 320 260"
            className="mx-auto h-48 w-full max-w-md"
            aria-label="Climate grid: cold to hot left to right, dry to wet bottom to top"
          >
            {/* Zone cues */}
            <rect x="50" y="50" width="110" height="80" fill="#dcfce7" opacity="0.45" />
            <rect x="160" y="50" width="110" height="80" fill="#bbf7d0" opacity="0.35" />
            <rect x="50" y="130" width="110" height="80" fill="#dbeafe" opacity="0.4" />
            <rect x="160" y="130" width="110" height="80" fill="#fef3c7" opacity="0.4" />
            {/* Grid lines */}
            <line x1="50" y1="50" x2="50" y2="210" stroke="#a7f3d0" strokeWidth="1" />
            <line x1="50" y1="210" x2="270" y2="210" stroke="#a7f3d0" strokeWidth="1" />
            <line x1="270" y1="210" x2="270" y2="50" stroke="#a7f3d0" strokeWidth="1" />
            <line x1="270" y1="50" x2="50" y2="50" stroke="#a7f3d0" strokeWidth="1" />
            <line x1="160" y1="50" x2="160" y2="210" stroke="#a7f3d0" strokeWidth="0.5" />
            <line x1="50" y1="130" x2="270" y2="130" stroke="#a7f3d0" strokeWidth="0.5" />
            {/* Axis labels */}
            <text x="160" y="235" textAnchor="middle" fontSize="10" fill="#047857">
              Cold ↔ Hot
            </text>
            <text x="20" y="130" textAnchor="middle" fontSize="10" fill="#047857" transform="rotate(-90 20 130)">
              Dry ↔ Wet
            </text>
            {/* Biome points - clickable */}
            {(Object.keys(GRID_POSITIONS) as BiomeTopicId[]).map((id) => {
              const { temp, rainfall } = GRID_POSITIONS[id];
              const { x, y } = mapToSvg(temp, rainfall);
              return (
                <g
                  key={id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${ITEMS.find((i) => i.id === id)?.title ?? id} climate point`}
                  onClick={() => onSelect(id)}
                  onKeyDown={(e) => activateWithKeyboard(e, id)}
                  onFocus={() => setFocusedId(id)}
                  onBlur={() => setFocusedId((prev) => (prev === id ? null : prev))}
                  className="cursor-pointer"
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted(id) ? 14 : 10}
                    fill={isHighlighted(id) ? '#d1fae5' : '#ecfdf5'}
                    stroke={isHighlighted(id) ? '#059669' : '#10b981'}
                    strokeWidth={isHighlighted(id) ? 2.5 : 1.5}
                  />
                  <text
                    x={x}
                    y={y - 18}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="#065f46"
                  >
                    {POINT_LABELS[id]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Cards with icons - legend / fallback */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                onKeyDown={(e) => activateWithKeyboard(e, item.id)}
                onFocus={() => setFocusedId(item.id)}
                onBlur={() => setFocusedId((prev) => (prev === item.id ? null : prev))}
                aria-label={`${item.title} biome card`}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  isHighlighted(item.id)
                    ? 'border-emerald-500 bg-emerald-100 shadow-md'
                    : 'border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2'
                }`}
              >
                <div className="mb-2 flex justify-center">
                  <BiomeIcon type={item.id} />
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
