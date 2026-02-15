import { DiagramContainer } from './DiagramContainer';

export function RectangleDiagram() {
  return (
    <DiagramContainer aspectRatio={1.5} aria-label="Rectangle with length L and width W">
      <svg viewBox="0 0 120 80" className="max-h-40 w-full">
        <rect
          x="15"
          y="15"
          width="90"
          height="50"
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <text x="58" y="8" fontSize="11" fill="#059669" fontWeight="600">L</text>
        <text x="108" y="42" fontSize="11" fill="#059669" fontWeight="600">W</text>
      </svg>
    </DiagramContainer>
  );
}
