import { DiagramContainer } from './DiagramContainer';

export function CircleDiagram() {
  return (
    <DiagramContainer aspectRatio={1} aria-label="Circle with radius r and diameter d">
      <svg viewBox="0 0 100 100" className="max-h-44 w-full">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="90"
          y2="50"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          stroke="#dc2626"
          strokeWidth="1.5"
          strokeDasharray="3"
        />
        <text x="72" y="55" fontSize="11" fill="#059669" fontWeight="600">r</text>
        <text x="48" y="5" fontSize="10" fill="#6b7280">d = 2r</text>
      </svg>
    </DiagramContainer>
  );
}
