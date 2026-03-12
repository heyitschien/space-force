import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { MeasurementPhysicsTopicId } from '../../data/measurementPhysicsFacts';
import { DiagramContainer } from './DiagramContainer';

interface MotionConceptsDiagramProps {
  onSelect: (id: MeasurementPhysicsTopicId) => void;
  selectedId: MeasurementPhysicsTopicId | null;
}

const MOTION_ITEMS: Array<{ id: MeasurementPhysicsTopicId; label: string; sub: string }> = [
  { id: 'velocity', label: 'Velocity', sub: 'Direction + magnitude (vector)' },
  { id: 'speed', label: 'Speed', sub: 'Magnitude only (scalar)' },
];

const NEWTON_ITEMS: Array<{ id: MeasurementPhysicsTopicId; label: string; sub: string }> = [
  { id: 'newton-first', label: "1st: Inertia", sub: 'Resists change in motion' },
  { id: 'newton-second', label: "2nd: F = ma", sub: 'Force ∝ mass × acceleration' },
  { id: 'newton-third', label: "3rd: Action-reaction", sub: 'Equal and opposite' },
];

export function MotionConceptsDiagram({
  onSelect,
  selectedId,
}: MotionConceptsDiagramProps) {
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
    'rounded-xl border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2';

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-emerald-50/50"
      aria-label="Interactive motion concepts: velocity vs speed and Newton's laws"
    >
      <div className="w-full space-y-4 p-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-100/70 p-3 text-sm text-emerald-900">
          Velocity = direction + magnitude | Speed = magnitude only
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MOTION_ITEMS.map((item) => (
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
                  ? 'border-emerald-500 bg-emerald-100 shadow-md'
                  : 'border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-sm'
              }`}
            >
              <h4 className="text-sm font-bold text-slate-800">{item.label}</h4>
              <p className="mt-1 text-xs text-slate-600">{item.sub}</p>
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <p className="mb-2 text-center text-xs font-medium text-slate-600">
            Newton&apos;s laws
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {NEWTON_ITEMS.map((item) => (
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
                    ? 'border-slate-500 bg-slate-100 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <h4 className="text-sm font-bold text-slate-800">{item.label}</h4>
                <p className="mt-1 text-xs text-slate-600">{item.sub}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DiagramContainer>
  );
}
