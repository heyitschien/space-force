import { useState } from 'react';
import type { BiologyTopicId } from '../../data/biologyFacts';
import { DiagramContainer } from './DiagramContainer';

interface ClassificationDiagramProps {
  onSelect: (id: BiologyTopicId) => void;
  selectedId: BiologyTopicId | null;
}

const CARD_ITEMS: { id: BiologyTopicId; label: string; sub: string; letter: string }[] = [
  { id: 'kingdom', label: 'Kingdom', sub: 'Broadest', letter: 'K' },
  { id: 'species', label: 'Species', sub: 'Most specific', letter: 'S' },
  { id: 'carnivore', label: 'Carnivore', sub: 'Meat-only', letter: 'C' },
  { id: 'herbivore', label: 'Herbivore', sub: 'Plants-only', letter: 'H' },
  { id: 'omnivore', label: 'Omnivore', sub: 'Both', letter: 'O' },
  { id: 'protein-apples', label: 'Protein', sub: 'Not apples', letter: 'P' },
  { id: 'carbs', label: 'Carbs', sub: 'Quick energy', letter: 'C' },
  { id: 'fats', label: 'Fats', sub: 'Long-term energy', letter: 'F' },
  { id: 'water', label: 'Water', sub: 'Transport, temp', letter: 'W' },
  { id: 'domains', label: 'Domains', sub: 'Eukarya, Bacteria, Archaea', letter: 'D' },
  { id: 'marsupials', label: 'Marsupials', sub: 'Kangaroo', letter: 'M' },
  { id: 'food-chains', label: 'Food chains', sub: 'Plankton = Producer', letter: 'F' },
];

export function ClassificationDiagram({ onSelect, selectedId }: ClassificationDiagramProps) {
  const [kpcofgsExpanded, setKpcofgsExpanded] = useState(false);

  const cardBase =
    'cursor-pointer rounded-xl border-2 p-3 transition-all hover:shadow-md outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 text-left';

  return (
    <DiagramContainer
      aspectRatio={1.1}
      className="bg-amber-50/50"
      aria-label="Interactive classification and nutrition concept cards"
    >
      <div className="p-4 space-y-4">
        {/* KPCOFGS hierarchy */}
        <button
          type="button"
          onClick={() => setKpcofgsExpanded((e) => !e)}
          className="w-full rounded-lg border border-amber-200 bg-amber-100/80 px-4 py-2 text-left text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors"
        >
          {kpcofgsExpanded
            ? 'Kingdom → Phylum → Class → Order → Family → Genus → Species'
            : 'KPCOFGS (click to expand)'}
        </button>

        {/* Concept cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CARD_ITEMS.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`${cardBase} ${
                  isSelected
                    ? 'border-amber-500 bg-amber-100 shadow-md'
                    : 'border-amber-200 bg-white hover:border-amber-300'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  {item.letter}
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{item.label}</h4>
                <p className="mt-0.5 text-xs text-slate-600">{item.sub}</p>
              </button>
            );
          })}
        </div>
      </div>
    </DiagramContainer>
  );
}
