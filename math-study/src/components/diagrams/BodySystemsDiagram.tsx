import { useState, type KeyboardEvent } from 'react';
import type { BiologyTopicId } from '../../data/biologyFacts';
import { DiagramContainer } from './DiagramContainer';

interface BodySystemsDiagramProps {
  onSelect: (id: BiologyTopicId) => void;
  selectedId: BiologyTopicId | null;
}

export function BodySystemsDiagram({ onSelect, selectedId }: BodySystemsDiagramProps) {
  const [focusedId, setFocusedId] = useState<BiologyTopicId | null>(null);

  const isSelected = (id: BiologyTopicId) => selectedId === id;
  const isFocused = (id: BiologyTopicId) => focusedId === id;
  const sel = (id: BiologyTopicId) => isSelected(id) || isFocused(id);

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
      aspectRatio={0.7}
      className="bg-slate-50"
      aria-label="Interactive body systems diagram with heart, lungs, intestines, skull, and joint types"
    >
      <svg
        viewBox="0 0 200 300"
        className="max-h-96 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arms - for joint types */}
        <line x1="60" y1="75" x2="30" y2="95" stroke="#94a3b8" strokeWidth="2" />
        <line x1="140" y1="75" x2="170" y2="95" stroke="#94a3b8" strokeWidth="2" />
        <line x1="30" y1="95" x2="25" y2="135" stroke="#94a3b8" strokeWidth="2" />
        <line x1="170" y1="95" x2="175" y2="135" stroke="#94a3b8" strokeWidth="2" />

        {/* Shoulder - ball-and-socket */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select ball-and-socket joints fact"
          {...btn('ball-socket-joint')}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="60"
            cy="75"
            r="12"
            fill={sel('ball-socket-joint') ? '#93c5fd' : '#bfdbfe'}
            stroke={sel('ball-socket-joint') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('ball-socket-joint') ? 3 : 1.5}
            className="transition-all"
          />
          <text x="60" y="79" textAnchor="middle" fontSize="7" fill="#1e40af">
            Ball
          </text>
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label="Select ball-and-socket joints fact"
          {...btn('ball-socket-joint')}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="140"
            cy="75"
            r="12"
            fill={sel('ball-socket-joint') ? '#93c5fd' : '#bfdbfe'}
            stroke={sel('ball-socket-joint') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('ball-socket-joint') ? 3 : 1.5}
            className="transition-all"
          />
          <text x="140" y="79" textAnchor="middle" fontSize="7" fill="#1e40af">
            Ball
          </text>
        </g>

        {/* Elbow - hinge */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select hinge joints fact"
          {...btn('hinge-joint')}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="25"
            cy="115"
            r="10"
            fill={sel('hinge-joint') ? '#93c5fd' : '#bfdbfe'}
            stroke={sel('hinge-joint') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('hinge-joint') ? 3 : 1.5}
            className="transition-all"
          />
          <text x="25" y="119" textAnchor="middle" fontSize="9" fill="#1e40af">
            H
          </text>
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label="Select hinge joints fact"
          {...btn('hinge-joint')}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="175"
            cy="115"
            r="10"
            fill={sel('hinge-joint') ? '#93c5fd' : '#bfdbfe'}
            stroke={sel('hinge-joint') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('hinge-joint') ? 3 : 1.5}
            className="transition-all"
          />
          <text x="175" y="119" textAnchor="middle" fontSize="9" fill="#1e40af">
            H
          </text>
        </g>

        {/* Skull / fixed joints */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select fixed joints fact"
          {...btn('fixed-joints')}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="100"
            cy="35"
            rx="24"
            ry="26"
            fill={sel('fixed-joints') ? '#bfdbfe' : '#dbeafe'}
            stroke={sel('fixed-joints') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('fixed-joints') ? 3 : 1.5}
            className="transition-all hover:fill-blue-100"
          />
          <text x="100" y="40" textAnchor="middle" fontSize="10" fill="#1e40af">
            Skull
          </text>
          <text x="100" y="68" textAnchor="middle" fontSize="8" fill="#64748b">
            Fixed
          </text>
        </g>

        {/* Torso */}
        <rect
          x="60"
          y="65"
          width="80"
          height="120"
          rx="8"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
        />

        {/* Lungs - left and right */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select lungs fact"
          {...btn('lungs')}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="75"
            cy="95"
            rx="12"
            ry="22"
            fill={sel('lungs') ? '#93c5fd' : '#bfdbfe'}
            stroke={sel('lungs') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('lungs') ? 3 : 1.5}
            className="transition-all"
          />
          <text x="75" y="100" textAnchor="middle" fontSize="8" fill="#1e40af">
            Lung
          </text>
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label="Select lungs fact"
          {...btn('lungs')}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="125"
            cy="95"
            rx="12"
            ry="22"
            fill={sel('lungs') ? '#93c5fd' : '#bfdbfe'}
            stroke={sel('lungs') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('lungs') ? 3 : 1.5}
            className="transition-all"
          />
          <text x="125" y="100" textAnchor="middle" fontSize="8" fill="#1e40af">
            Lung
          </text>
        </g>

        {/* Heart */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select heart fact"
          {...btn('heart')}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="100"
            cy="125"
            rx="18"
            ry="14"
            fill={sel('heart') ? '#93c5fd' : '#bfdbfe'}
            stroke={sel('heart') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('heart') ? 3 : 1.5}
            className="transition-all hover:fill-blue-100"
          />
          <text x="100" y="130" textAnchor="middle" fontSize="9" fill="#1e40af">
            Heart
          </text>
          <text x="100" y="142" textAnchor="middle" fontSize="7" fill="#64748b">
            4 chambers
          </text>
        </g>

        {/* Intestines */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select intestines fact"
          {...btn('intestines')}
          className="cursor-pointer outline-none"
        >
          <rect
            x="65"
            y="155"
            width="70"
            height="55"
            rx="6"
            fill={sel('intestines') ? '#bfdbfe' : '#dbeafe'}
            stroke={sel('intestines') ? '#1d4ed8' : '#3b82f6'}
            strokeWidth={sel('intestines') ? 3 : 1.5}
            className="transition-all hover:fill-blue-100"
          />
          <text x="100" y="185" textAnchor="middle" fontSize="10" fill="#1e40af">
            Intestines
          </text>
          <text x="100" y="198" textAnchor="middle" fontSize="8" fill="#64748b">
            Digestive
          </text>
        </g>

        {/* Legs */}
        <rect x="75" y="220" width="20" height="50" rx="4" fill="#e2e8f0" stroke="#94a3b8" />
        <rect x="105" y="220" width="20" height="50" rx="4" fill="#e2e8f0" stroke="#94a3b8" />

        {/* Joint labels */}
        <text x="60" y="92" textAnchor="middle" fontSize="8" fill="#64748b">
          Ball-socket
        </text>
        <text x="25" y="132" textAnchor="middle" fontSize="8" fill="#64748b">
          Hinge
        </text>
      </svg>
    </DiagramContainer>
  );
}
