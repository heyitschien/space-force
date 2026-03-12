import { useState, type Dispatch, type SetStateAction, type KeyboardEvent } from 'react';
import type { BiologyTopicId } from '../../data/biologyFacts';
import { DiagramContainer } from './DiagramContainer';

interface CellDiagramProps {
  onSelect: (id: BiologyTopicId) => void;
  selectedId: BiologyTopicId | null;
}

function makeClickable(
  id: BiologyTopicId,
  selectedId: BiologyTopicId | null,
  focusedId: BiologyTopicId | null,
  onSelect: (id: BiologyTopicId) => void,
  setFocusedId: Dispatch<SetStateAction<BiologyTopicId | null>>,
  activateWithKeyboard: (e: KeyboardEvent<SVGGElement>, id: BiologyTopicId) => void
) {
  const isSelected = selectedId === id;
  const isFocused = focusedId === id;
  return {
    isSelected,
    isFocused,
    onClick: () => onSelect(id),
    onKeyDown: (e: KeyboardEvent<SVGGElement>) => activateWithKeyboard(e, id),
    onFocus: () => setFocusedId(id),
    onBlur: () => setFocusedId((v) => (v === id ? null : v)),
  };
}

export function CellDiagram({ onSelect, selectedId }: CellDiagramProps) {
  const [focusedId, setFocusedId] = useState<BiologyTopicId | null>(null);

  const activateWithKeyboard = (
    event: KeyboardEvent<SVGGElement>,
    id: BiologyTopicId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const mem = (id: BiologyTopicId) =>
    makeClickable(id, selectedId, focusedId, onSelect, setFocusedId, activateWithKeyboard);

  const nuc = mem('nucleus');
  const membr = mem('cell-membrane');
  const cyto = mem('cytoplasm');
  const mito = mem('mitochondria');
  const osmo = mem('osmosis');
  const diff = mem('diffusion');
  const resp = mem('respiration');
  const cleav = mem('cleavage');
  const gene = mem('gene');
  const proto = mem('protoplasm');

  return (
    <DiagramContainer
      aspectRatio={1.2}
      className="bg-slate-50"
      aria-label="Interactive cell diagram with nucleus, membrane, cytoplasm, mitochondria, osmosis and diffusion"
    >
      <svg
        viewBox="0 0 220 240"
        className="max-h-80 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cell membrane - outer boundary */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select cell membrane fact"
          onClick={membr.onClick}
          onKeyDown={membr.onKeyDown}
          onFocus={membr.onFocus}
          onBlur={membr.onBlur}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="110"
            cy="95"
            rx="80"
            ry="70"
            fill="none"
            stroke={membr.isSelected ? '#16a34a' : '#22c55e'}
            strokeWidth={membr.isSelected || membr.isFocused ? 4 : 2}
            className="transition-all"
          />
          <text x="110" y="178" textAnchor="middle" fontSize="10" fill="#64748b">
            Cell membrane
          </text>
        </g>

        {/* Cytoplasm - gel interior (ring between membrane and nucleus) */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select cytoplasm fact"
          onClick={cyto.onClick}
          onKeyDown={cyto.onKeyDown}
          onFocus={cyto.onFocus}
          onBlur={cyto.onBlur}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="110"
            cy="95"
            rx="75"
            ry="65"
            fill={cyto.isSelected ? '#dcfce7' : '#f0fdf4'}
            stroke="none"
            className="transition-all hover:fill-emerald-50"
          />
          <text x="65" y="95" textAnchor="middle" fontSize="9" fill="#64748b" opacity={cyto.isSelected ? 1 : 0.6}>
            Cytoplasm
          </text>
        </g>

        {/* Mitochondria - bean shape */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select mitochondria fact"
          onClick={mito.onClick}
          onKeyDown={mito.onKeyDown}
          onFocus={mito.onFocus}
          onBlur={mito.onBlur}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="155"
            cy="75"
            rx="18"
            ry="10"
            fill={mito.isSelected ? '#86efac' : '#bbf7d0'}
            stroke={mito.isSelected ? '#16a34a' : '#22c55e'}
            strokeWidth={mito.isSelected || mito.isFocused ? 3 : 1.5}
            transform="rotate(-25 155 75)"
            className="transition-all hover:fill-emerald-200"
          />
          <text x="155" y="77" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600">
            Mito
          </text>
        </g>

        {/* Nucleus - center */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select nucleus fact"
          onClick={nuc.onClick}
          onKeyDown={nuc.onKeyDown}
          onFocus={nuc.onFocus}
          onBlur={nuc.onBlur}
          className="cursor-pointer outline-none"
        >
          <circle
            cx="110"
            cy="95"
            r="28"
            fill={nuc.isSelected ? '#86efac' : '#bbf7d0'}
            stroke={nuc.isSelected ? '#16a34a' : '#22c55e'}
            strokeWidth={nuc.isSelected || nuc.isFocused ? 4 : 2}
            className="transition-all hover:fill-emerald-200"
          />
          <text x="110" y="100" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="600">
            Nucleus
          </text>
        </g>

        {/* Osmosis / Diffusion legend - clickable */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select osmosis fact"
          onClick={osmo.onClick}
          onKeyDown={osmo.onKeyDown}
          onFocus={osmo.onFocus}
          onBlur={osmo.onBlur}
          className="cursor-pointer outline-none"
        >
          <rect
            x="20"
            y="185"
            width="75"
            height="14"
            rx="4"
            fill={osmo.isSelected ? '#bbf7d0' : '#f0fdf4'}
            stroke={osmo.isSelected ? '#16a34a' : '#86efac'}
            strokeWidth={1}
            className="transition-all"
          />
          <text x="57" y="195" textAnchor="middle" fontSize="9" fill="#166534">
            Osmosis
          </text>
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label="Select diffusion fact"
          onClick={diff.onClick}
          onKeyDown={diff.onKeyDown}
          onFocus={diff.onFocus}
          onBlur={diff.onBlur}
          className="cursor-pointer outline-none"
        >
          <rect
            x="125"
            y="185"
            width="75"
            height="14"
            rx="4"
            fill={diff.isSelected ? '#bbf7d0' : '#f0fdf4'}
            stroke={diff.isSelected ? '#16a34a' : '#86efac'}
            strokeWidth={1}
            className="transition-all"
          />
          <text x="162" y="195" textAnchor="middle" fontSize="9" fill="#166534">
            Diffusion
          </text>
        </g>
        {/* Cell processes - second row */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select respiration fact"
          onClick={resp.onClick}
          onKeyDown={resp.onKeyDown}
          onFocus={resp.onFocus}
          onBlur={resp.onBlur}
          className="cursor-pointer outline-none"
        >
          <rect
            x="20"
            y="210"
            width="45"
            height="14"
            rx="4"
            fill={resp.isSelected ? '#bbf7d0' : '#f0fdf4'}
            stroke={resp.isSelected ? '#16a34a' : '#86efac'}
            strokeWidth={1}
            className="transition-all"
          />
          <text x="42" y="220" textAnchor="middle" fontSize="7" fill="#166534">
            Respiration
          </text>
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label="Select cleavage fact"
          onClick={cleav.onClick}
          onKeyDown={cleav.onKeyDown}
          onFocus={cleav.onFocus}
          onBlur={cleav.onBlur}
          className="cursor-pointer outline-none"
        >
          <rect
            x="72"
            y="210"
            width="45"
            height="14"
            rx="4"
            fill={cleav.isSelected ? '#bbf7d0' : '#f0fdf4'}
            stroke={cleav.isSelected ? '#16a34a' : '#86efac'}
            strokeWidth={1}
            className="transition-all"
          />
          <text x="94" y="220" textAnchor="middle" fontSize="7" fill="#166534">
            Cleavage
          </text>
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label="Select gene fact"
          onClick={gene.onClick}
          onKeyDown={gene.onKeyDown}
          onFocus={gene.onFocus}
          onBlur={gene.onBlur}
          className="cursor-pointer outline-none"
        >
          <rect
            x="124"
            y="210"
            width="45"
            height="14"
            rx="4"
            fill={gene.isSelected ? '#bbf7d0' : '#f0fdf4'}
            stroke={gene.isSelected ? '#16a34a' : '#86efac'}
            strokeWidth={1}
            className="transition-all"
          />
          <text x="146" y="220" textAnchor="middle" fontSize="7" fill="#166534">
            Gene
          </text>
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label="Select protoplasm fact"
          onClick={proto.onClick}
          onKeyDown={proto.onKeyDown}
          onFocus={proto.onFocus}
          onBlur={proto.onBlur}
          className="cursor-pointer outline-none"
        >
          <rect
            x="172"
            y="210"
            width="48"
            height="14"
            rx="4"
            fill={proto.isSelected ? '#bbf7d0' : '#f0fdf4'}
            stroke={proto.isSelected ? '#16a34a' : '#86efac'}
            strokeWidth={1}
            className="transition-all"
          />
          <text x="196" y="220" textAnchor="middle" fontSize="7" fill="#166534">
            Protoplasm
          </text>
        </g>
      </svg>
    </DiagramContainer>
  );
}
