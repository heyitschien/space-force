import { useState, type KeyboardEvent } from 'react';
import type { BiologyTopicId } from '../../data/biologyFacts';
import { DiagramContainer } from './DiagramContainer';

interface BloodCellsDiagramProps {
  onSelect: (id: BiologyTopicId) => void;
  selectedId: BiologyTopicId | null;
}

export function BloodCellsDiagram({ onSelect, selectedId }: BloodCellsDiagramProps) {
  const [focusedId, setFocusedId] = useState<BiologyTopicId | null>(null);

  const sel = (id: BiologyTopicId) => selectedId === id || focusedId === id;

  const activateWithKeyboard = (
    event: KeyboardEvent<SVGGElement>,
    id: BiologyTopicId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const btn = (id: BiologyTopicId) => ({
    onClick: () => onSelect(id),
    onKeyDown: (e: KeyboardEvent<SVGGElement>) => activateWithKeyboard(e, id),
    onFocus: () => setFocusedId(id),
    onBlur: () => setFocusedId((v) => (v === id ? null : v)),
  });

  return (
    <DiagramContainer
      aspectRatio={1.5}
      className="bg-slate-50"
      aria-label="Interactive blood cells diagram with red blood cells, white blood cells, and platelets"
    >
      <svg
        viewBox="0 0 300 200"
        className="max-h-64 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red blood cell - clickable */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select red blood cells fact"
          {...btn('rbc')}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="80"
            cy="100"
            r="22"
            fill={sel('rbc') ? '#fecaca' : '#fee2e2'}
            stroke={sel('rbc') ? '#dc2626' : '#ef4444'}
            strokeWidth={sel('rbc') ? 4 : 2}
            className="transition-all"
          />
          <text x="80" y="105" textAnchor="middle" fontSize="10" fill="#991b1b" fontWeight="600">
            RBC
          </text>
        </g>

        {/* White blood cell - clickable */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select white blood cells fact"
          {...btn('white-blood-cells')}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="150"
            cy="100"
            r="28"
            fill={sel('white-blood-cells') ? '#fecaca' : '#fee2e2'}
            stroke={sel('white-blood-cells') ? '#dc2626' : '#ef4444'}
            strokeWidth={sel('white-blood-cells') ? 4 : 2}
            className="transition-all hover:fill-red-100"
          />
          <text x="150" y="105" textAnchor="middle" fontSize="11" fill="#991b1b" fontWeight="600">
            WBC
          </text>
          <text x="150" y="138" textAnchor="middle" fontSize="9" fill="#64748b">
            Fight infection
          </text>
        </g>

        {/* Red blood cell - clickable */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select red blood cells fact"
          {...btn('rbc')}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="220"
            cy="100"
            r="22"
            fill={sel('rbc') ? '#fecaca' : '#fee2e2'}
            stroke={sel('rbc') ? '#dc2626' : '#ef4444'}
            strokeWidth={sel('rbc') ? 4 : 2}
            className="transition-all"
          />
          <text x="220" y="105" textAnchor="middle" fontSize="10" fill="#991b1b" fontWeight="600">
            RBC
          </text>
        </g>

        {/* Platelets - small fragments, clickable */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select platelets fact"
          {...btn('platelets')}
          className="cursor-pointer outline-none"
        >
          <circle cx="50" cy="160" r="6" fill={sel('platelets') ? '#fca5a5' : '#fecaca'} stroke="#b91c1c" strokeWidth={1.5} />
          <circle cx="65" cy="155" r="5" fill={sel('platelets') ? '#fca5a5' : '#fecaca'} stroke="#b91c1c" strokeWidth={1.5} />
          <circle cx="78" cy="162" r="5" fill={sel('platelets') ? '#fca5a5' : '#fecaca'} stroke="#b91c1c" strokeWidth={1.5} />
          <text x="65" y="182" textAnchor="middle" fontSize="9" fill="#64748b">
            Platelets
          </text>
        </g>

        {/* Labels */}
        <text x="80" y="135" textAnchor="middle" fontSize="9" fill="#94a3b8">
          Carry O2
        </text>
        <text x="220" y="135" textAnchor="middle" fontSize="9" fill="#94a3b8">
          Carry O2
        </text>
      </svg>
    </DiagramContainer>
  );
}
