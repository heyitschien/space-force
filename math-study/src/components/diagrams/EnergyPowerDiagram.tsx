import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { MeasurementPhysicsTopicId } from '../../data/measurementPhysicsFacts';
import { DiagramContainer } from './DiagramContainer';

interface EnergyPowerDiagramProps {
  onSelect: (id: MeasurementPhysicsTopicId) => void;
  selectedId: MeasurementPhysicsTopicId | null;
}

const ITEMS: Array<{ id: MeasurementPhysicsTopicId; label: string; sub: string }> = [
  { id: 'energy', label: 'Energy', sub: 'Ability to do work' },
  { id: 'power', label: 'Power', sub: 'Rate of work (watts)' },
];

export function EnergyPowerDiagram({
  onSelect,
  selectedId,
}: EnergyPowerDiagramProps) {
  const [focusedId, setFocusedId] = useState<MeasurementPhysicsTopicId | null>(null);
  const isHighlighted = (id: MeasurementPhysicsTopicId) =>
    selectedId === id || focusedId === id;

  const activateWithKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: MeasurementPhysicsTopicId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const cardBase =
    'rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2';

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-lime-50/50"
      aria-label="Interactive energy and power concepts"
    >
      <div className="w-full space-y-4 p-4">
        <div className="rounded-lg border border-lime-200 bg-lime-100/70 p-3 text-sm text-lime-900">
          Energy = ability to do work | Power = work/time (watts)
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              onKeyDown={(e) => activateWithKeyboard(e, item.id)}
              onFocus={() => setFocusedId(item.id)}
              onBlur={() => setFocusedId((prev) => (prev === item.id ? null : prev))}
              aria-label={`${item.label}: ${item.sub}`}
              className={`${cardBase} w-full sm:max-w-xs ${
                isHighlighted(item.id)
                  ? 'border-lime-500 bg-lime-100 shadow-md'
                  : 'border-lime-200 bg-white hover:border-lime-300 hover:shadow-sm'
              }`}
            >
              <h4 className="text-sm font-bold text-slate-800">{item.label}</h4>
              <p className="mt-1 text-xs text-slate-600">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>
    </DiagramContainer>
  );
}
