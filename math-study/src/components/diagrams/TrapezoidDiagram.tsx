import { DiagramContainer } from './DiagramContainer';

export function TrapezoidDiagram() {
  return (
    <DiagramContainer aspectRatio={1.3} aria-label="Trapezoid with bases b1, b2 and height h">
      <svg viewBox="0 0 120 90" className="max-h-44 w-full">
        <polygon
          points="25,75 95,75 75,15 45,15"
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="15"
          x2="60"
          y2="75"
          stroke="#dc2626"
          strokeWidth="1.5"
          strokeDasharray="4"
        />
        <text x="35" y="88" fontSize="10" fill="#059669" fontWeight="600">b₁</text>
        <text x="78" y="88" fontSize="10" fill="#059669" fontWeight="600">b₂</text>
        <text x="64" y="48" fontSize="11" fill="#dc2626" fontWeight="600">h</text>
      </svg>
    </DiagramContainer>
  );
}
