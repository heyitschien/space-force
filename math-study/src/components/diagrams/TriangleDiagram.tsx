import { DiagramContainer } from './DiagramContainer';

interface TriangleDiagramProps {
  showAngles?: boolean;
}

export function TriangleDiagram({ showAngles = false }: TriangleDiagramProps) {
  return (
    <DiagramContainer aspectRatio={1.2} aria-label="Triangle with base b and height h labeled">
      <svg viewBox="0 0 120 100" className="max-h-48 w-full">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
          </marker>
        </defs>
        <polygon
          points="60,15 95,85 25,85"
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="15"
          x2="60"
          y2="85"
          stroke="#dc2626"
          strokeWidth="1.5"
          strokeDasharray="4"
        />
        <text x="52" y="92" fontSize="11" fill="#059669" fontWeight="600">b</text>
        <text x="64" y="52" fontSize="11" fill="#dc2626" fontWeight="600">h</text>
        {showAngles && (
          <>
            <text x="35" y="75" fontSize="10" fill="#6b7280">α</text>
            <text x="82" y="75" fontSize="10" fill="#6b7280">β</text>
            <text x="55" y="22" fontSize="10" fill="#6b7280">γ</text>
          </>
        )}
      </svg>
    </DiagramContainer>
  );
}
