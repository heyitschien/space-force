import type { ChemistryTopicId } from '../../data/chemistryFacts';
import { DiagramContainer } from './DiagramContainer';

interface MatterClassificationDiagramProps {
  onSelect: (id: ChemistryTopicId) => void;
  selectedId: ChemistryTopicId | null;
}

const CARDS: Array<{ id: ChemistryTopicId; label: string; sub: string }> = [
  { id: 'element', label: 'Element', sub: 'One atom type' },
  { id: 'atom', label: 'Atom', sub: 'Smallest unit' },
  { id: 'molecule', label: 'Molecule', sub: 'Bonded atoms' },
  { id: 'compound', label: 'Compound', sub: 'Different elements bonded' },
  { id: 'mixture', label: 'Mixture', sub: 'Physical blend' },
];

export function MatterClassificationDiagram({
  onSelect,
  selectedId,
}: MatterClassificationDiagramProps) {
  const cardBase =
    'cursor-pointer rounded-xl border-2 p-3 text-left transition-all hover:shadow-md focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2';

  return (
    <DiagramContainer
      aspectRatio={1.1}
      className="bg-emerald-50/40"
      aria-label="Interactive matter classification map with atom, element, molecule, compound and mixture"
    >
      <div className="w-full space-y-4 p-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-100/70 p-3 text-sm text-emerald-900">
          Chemical bond {"->"} molecule/compound | Physical blend {"->"} mixture
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CARDS.map((card) => {
            const selected = selectedId === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onSelect(card.id)}
                className={`${cardBase} ${
                  selected
                    ? 'border-emerald-500 bg-emerald-100 shadow-md'
                    : 'border-emerald-200 bg-white hover:border-emerald-300'
                }`}
              >
                <h4 className="text-sm font-bold text-slate-800">{card.label}</h4>
                <p className="mt-1 text-xs text-slate-600">{card.sub}</p>
              </button>
            );
          })}
        </div>
      </div>
    </DiagramContainer>
  );
}
