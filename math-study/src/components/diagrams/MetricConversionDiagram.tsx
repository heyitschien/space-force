import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { MeasurementPhysicsTopicId } from '../../data/measurementPhysicsFacts';
import { DiagramContainer } from './DiagramContainer';

interface MetricConversionDiagramProps {
  onSelect: (id: MeasurementPhysicsTopicId) => void;
  selectedId: MeasurementPhysicsTopicId | null;
}

const ITEMS: Array<{ id: MeasurementPhysicsTopicId; label: string; sub: string }> = [
  { id: 'meter-cm', label: '1 m = 100 cm', sub: 'Meter to centimeter' },
  { id: 'kilometer', label: '1 km = 1000 m', sub: 'Kilometer to meter' },
];

export function MetricConversionDiagram({
  onSelect,
  selectedId,
}: MetricConversionDiagramProps) {
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
    'rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2';

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-indigo-50/50"
      aria-label="Interactive metric conversion diagram: 1 m = 100 cm, 1 km = 1000 m"
    >
      <div className="w-full space-y-4 p-4">
        <div className="rounded-lg border border-indigo-200 bg-indigo-100/70 p-3 text-sm text-indigo-900">
          kilo (1000×) | centi (1/100) | milli (1/1000)
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-2">
            <div className="rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 font-mono text-lg font-bold text-indigo-800">
              1 m
            </div>
            <span className="text-indigo-600">=</span>
            <div className="rounded-lg border-2 border-indigo-300 bg-white px-4 py-2 font-mono text-lg font-bold text-indigo-800">
              100 cm
            </div>
            <span className="text-indigo-600">=</span>
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 font-mono text-sm text-indigo-700">
              1000 mm
            </div>
          </div>
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
              aria-label={`${item.label} conversion`}
              className={`${cardBase} ${
                isHighlighted(item.id)
                  ? 'border-indigo-500 bg-indigo-100 shadow-md'
                  : 'border-indigo-200 bg-white hover:border-indigo-300 hover:shadow-sm'
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
