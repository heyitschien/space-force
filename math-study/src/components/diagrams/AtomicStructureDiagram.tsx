import type { ChemistryTopicId } from '../../data/chemistryFacts';
import { DiagramContainer } from './DiagramContainer';

interface AtomicStructureDiagramProps {
  onSelect: (id: ChemistryTopicId) => void;
  selectedId: ChemistryTopicId | null;
}

export function AtomicStructureDiagram({
  onSelect,
  selectedId,
}: AtomicStructureDiagramProps) {
  const selected = (id: ChemistryTopicId) => selectedId === id;

  const nodeClass = (id: ChemistryTopicId) =>
    `cursor-pointer transition-all ${selected(id) ? 'opacity-100' : 'opacity-95 hover:opacity-100'}`;

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-sky-50"
      aria-label="Interactive atomic structure diagram with nucleus, protons, neutrons, and electrons"
    >
      <svg viewBox="0 0 320 240" className="h-full w-full">
        {/* Electron shells */}
        <circle cx="160" cy="120" r="80" fill="none" stroke="#bfdbfe" strokeWidth="2" />
        <circle cx="160" cy="120" r="55" fill="none" stroke="#dbeafe" strokeWidth="2" />

        {/* Electrons */}
        <g
          className={nodeClass('electron')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('electron')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('electron')}
        >
          <circle cx="240" cy="120" r="10" fill={selected('electron') ? '#4338ca' : '#6366f1'} />
          <text x="255" y="124" fontSize="10" fill="#1e3a8a">
            e-
          </text>
        </g>
        <g
          className={nodeClass('electron')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('electron')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('electron')}
        >
          <circle cx="80" cy="120" r="10" fill={selected('electron') ? '#4338ca' : '#6366f1'} />
          <text x="58" y="124" fontSize="10" fill="#1e3a8a">
            e-
          </text>
        </g>

        {/* Nucleus container */}
        <g
          className={nodeClass('nucleus')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('nucleus')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('nucleus')}
        >
          <circle
            cx="160"
            cy="120"
            r="32"
            fill={selected('nucleus') ? '#bae6fd' : '#e0f2fe'}
            stroke={selected('nucleus') ? '#0284c7' : '#38bdf8'}
            strokeWidth="3"
          />
          <text x="160" y="124" textAnchor="middle" fontSize="10" fill="#0f172a">
            Nucleus
          </text>
        </g>

        {/* Protons */}
        <g
          className={nodeClass('proton')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('proton')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('proton')}
        >
          <circle cx="147" cy="116" r="9" fill={selected('proton') ? '#ea580c' : '#f97316'} />
          <text x="147" y="119" textAnchor="middle" fontSize="10" fill="#fff">
            +
          </text>
        </g>
        <g
          className={nodeClass('proton')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('proton')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('proton')}
        >
          <circle cx="173" cy="124" r="9" fill={selected('proton') ? '#ea580c' : '#f97316'} />
          <text x="173" y="127" textAnchor="middle" fontSize="10" fill="#fff">
            +
          </text>
        </g>

        {/* Neutrons */}
        <g
          className={nodeClass('neutron')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('neutron')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('neutron')}
        >
          <circle cx="172" cy="108" r="8" fill={selected('neutron') ? '#64748b' : '#94a3b8'} />
          <text x="172" y="111" textAnchor="middle" fontSize="9" fill="#fff">
            n
          </text>
        </g>
        <g
          className={nodeClass('neutron')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('neutron')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('neutron')}
        >
          <circle cx="151" cy="129" r="8" fill={selected('neutron') ? '#64748b' : '#94a3b8'} />
          <text x="151" y="132" textAnchor="middle" fontSize="9" fill="#fff">
            n
          </text>
        </g>

        {/* Atomic number badge */}
        <g
          className={nodeClass('atomic-number')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('atomic-number')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('atomic-number')}
        >
          <rect
            x="222"
            y="24"
            width="80"
            height="28"
            rx="8"
            fill={selected('atomic-number') ? '#1d4ed8' : '#2563eb'}
          />
          <text x="262" y="42" textAnchor="middle" fontSize="11" fill="#fff">
            Atomic #
          </text>
        </g>

        {/* Atom click target */}
        <g
          className={nodeClass('atom')}
          role="button"
          tabIndex={0}
          onClick={() => onSelect('atom')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('atom')}
        >
          <rect
            x="18"
            y="24"
            width="64"
            height="28"
            rx="8"
            fill={selected('atom') ? '#0f766e' : '#14b8a6'}
          />
          <text x="50" y="42" textAnchor="middle" fontSize="11" fill="#fff">
            Atom
          </text>
        </g>
      </svg>
    </DiagramContainer>
  );
}
