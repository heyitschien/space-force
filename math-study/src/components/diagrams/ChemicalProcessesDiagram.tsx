import type { ChemistryTopicId } from '../../data/chemistryFacts';
import { DiagramContainer } from './DiagramContainer';

interface ChemicalProcessesDiagramProps {
  onSelect: (id: ChemistryTopicId) => void;
  selectedId: ChemistryTopicId | null;
}

const ITEMS: Array<{ id: ChemistryTopicId; title: string; sub: string }> = [
  { id: 'oxidation', title: 'Oxidation', sub: 'Electron loss' },
  { id: 'acids', title: 'Acids', sub: 'pH below 7, sour' },
  { id: 'chlorophyll', title: 'Chlorophyll', sub: 'Photosynthesis pigment' },
];

export function ChemicalProcessesDiagram({
  onSelect,
  selectedId,
}: ChemicalProcessesDiagramProps) {
  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-rose-50/30"
      aria-label="Interactive chemistry process cards including oxidation, acids, and chlorophyll"
    >
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3">
        {ITEMS.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-rose-400 bg-rose-100 shadow-md'
                  : 'border-rose-200 bg-white hover:border-rose-300 hover:shadow-sm'
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
