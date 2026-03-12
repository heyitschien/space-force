import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import type { MeasurementPhysicsTopicId } from '../../data/measurementPhysicsFacts';
import { DiagramContainer } from './DiagramContainer';

interface TemperatureScaleDiagramProps {
  onSelect: (id: MeasurementPhysicsTopicId) => void;
  selectedId: MeasurementPhysicsTopicId | null;
}

const ITEMS: Array<{ id: MeasurementPhysicsTopicId; label: string; sub: string }> = [
  { id: 'celsius-freezing', label: '0°C', sub: 'Freezing (water)' },
  { id: 'celsius-boiling', label: '100°C', sub: 'Boiling (water)' },
  { id: 'melting-point', label: 'Melting point', sub: 'Solid-liquid equilibrium' },
  { id: 'boiling-point', label: 'Boiling point', sub: 'Liquid-gas equilibrium' },
];

export function TemperatureScaleDiagram({
  onSelect,
  selectedId,
}: TemperatureScaleDiagramProps) {
  const [focusedId, setFocusedId] = useState<MeasurementPhysicsTopicId | null>(null);
  const isHighlighted = (id: MeasurementPhysicsTopicId) =>
    selectedId === id || focusedId === id;

  const activateWithKeyboard = (
    event: KeyboardEvent<HTMLButtonElement | SVGGElement>,
    id: MeasurementPhysicsTopicId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const cardBase =
    'rounded-xl border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2';

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-red-50/50"
      aria-label="Interactive Celsius temperature scale with freezing and boiling points"
    >
      <div className="w-full space-y-4 p-4">
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onSelect('celsius-freezing')}
            onKeyDown={(e) => activateWithKeyboard(e, 'celsius-freezing')}
            onFocus={() => setFocusedId('celsius-freezing')}
            onBlur={() => setFocusedId((prev) => (prev === 'celsius-freezing' ? null : prev))}
            className={`rounded-xl border-2 px-6 py-4 transition-all ${
              isHighlighted('celsius-freezing')
                ? 'border-blue-500 bg-blue-100 shadow-md'
                : 'border-blue-300 bg-blue-50 hover:border-blue-400'
            }`}
            aria-label="Freezing point 0°C"
          >
            <span className="text-2xl font-bold text-blue-800">0°C</span>
            <p className="mt-1 text-xs text-blue-600">Freezing</p>
          </button>
          <div className="h-16 w-24 rounded-lg border-2 border-slate-300 bg-gradient-to-b from-blue-100 to-red-100" />
          <button
            type="button"
            onClick={() => onSelect('celsius-boiling')}
            onKeyDown={(e) => activateWithKeyboard(e, 'celsius-boiling')}
            onFocus={() => setFocusedId('celsius-boiling')}
            onBlur={() => setFocusedId((prev) => (prev === 'celsius-boiling' ? null : prev))}
            className={`rounded-xl border-2 px-6 py-4 transition-all ${
              isHighlighted('celsius-boiling')
                ? 'border-red-500 bg-red-100 shadow-md'
                : 'border-red-300 bg-red-50 hover:border-red-400'
            }`}
            aria-label="Boiling point 100°C"
          >
            <span className="text-2xl font-bold text-red-800">100°C</span>
            <p className="mt-1 text-xs text-red-600">Boiling</p>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ITEMS.slice(2).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              onKeyDown={(e) => activateWithKeyboard(e, item.id)}
              onFocus={() => setFocusedId(item.id)}
              onBlur={() => setFocusedId((prev) => (prev === item.id ? null : prev))}
              aria-label={`${item.label} definition`}
              className={`${cardBase} ${
                isHighlighted(item.id)
                  ? 'border-red-500 bg-red-100 shadow-md'
                  : 'border-red-200 bg-white hover:border-red-300 hover:shadow-sm'
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
