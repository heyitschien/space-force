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
  { id: 'deciduous-forest', title: 'Deciduous Forest', sub: 'Moderate seasons; trees lose leaves' },
];

export function BiomesDiagram({
  onSelect,
  selectedId,
}: BiomesDiagramProps) {
  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-green-50/50"
      aria-label="Interactive biomes diagram: tropical rainforest, desert, tundra, grassland, deciduous forest"
    >
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-100 shadow-md'
                  : 'border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-sm'
              }`}
            >
              <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
              <p className="mt-1 text-xs text-slate-600">{item.sub}</p>
            </button>
          );
        })}
      </div>
    </DiagramContainer>
  );
}
