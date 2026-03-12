import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { MeasurementPhysicsTopicId } from '../../data/measurementPhysicsFacts';
import { DiagramContainer } from './DiagramContainer';

interface LightConstantsDiagramProps {
  onSelect: (id: MeasurementPhysicsTopicId) => void;
  selectedId: MeasurementPhysicsTopicId | null;
}

const ITEMS: Array<{ id: MeasurementPhysicsTopicId; label: string; sub: string }> = [
  { id: 'speed-of-light', label: 'Speed of light', sub: '~186,000 mi/s' },
  { id: 'light-year', label: 'Light-year', sub: 'Distance, not time' },
  { id: 'quantum', label: 'Quantum', sub: 'Single unit of quanta' },
];

export function LightConstantsDiagram({
  onSelect,
  selectedId,
}: LightConstantsDiagramProps) {
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
    'rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2';

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-amber-50/50"
      aria-label="Interactive light constants: speed of light and light-year"
    >
      <div className="w-full space-y-4 p-4">
        <div className="rounded-lg border border-amber-200 bg-amber-100/70 p-3 text-sm text-amber-900">
          Radio waves travel at speed of light
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              onKeyDown={(e) => activateWithKeyboard(e, item.id)}
              onFocus={() => setFocusedId(item.id)}
              onBlur={() => setFocusedId((prev) => (prev === item.id ? null : prev))}
              aria-label={`${item.label}: ${item.sub}`}
              className={`${cardBase} ${
                isHighlighted(item.id)
                  ? 'border-amber-500 bg-amber-100 shadow-md'
                  : 'border-amber-200 bg-white hover:border-amber-300 hover:shadow-sm'
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
