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

export function RockTypesDiagram({
  onSelect,
  selectedId,
}: RockTypesDiagramProps) {
  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-stone-50/50"
      aria-label="Interactive rock types diagram: igneous, sedimentary, metamorphic, pumice"
    >
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-100 shadow-md'
                  : 'border-amber-200 bg-white hover:border-amber-300 hover:shadow-sm'
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
