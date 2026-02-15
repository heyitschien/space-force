import { DiagramContainer } from './DiagramContainer';

type Mode = 'slope' | 'distance' | 'midpoint';

interface CoordinatePlaneDiagramProps {
  mode?: Mode;
}

export function CoordinatePlaneDiagram({ mode = 'slope' }: CoordinatePlaneDiagramProps) {
  const x1 = 25;
  const y1 = 70;
  const x2 = 85;
  const y2 = 30;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return (
    <DiagramContainer aspectRatio={1.5} aria-label={`Coordinate plane with two points for ${mode}`}>
      <svg viewBox="0 0 120 100" className="max-h-44 w-full">
        <line x1="15" y1="50" x2="105" y2="50" stroke="#9ca3af" strokeWidth="1" />
        <line x1="60" y1="5" x2="60" y2="95" stroke="#9ca3af" strokeWidth="1" />
        {[20, 40, 80, 100].map((x) => (
          <line key={`v${x}`} x1={x} y1="48" x2={x} y2="52" stroke="#d1d5db" strokeWidth="0.5" />
        ))}
        {[20, 40, 60, 80].map((y) => (
          <line key={`h${y}`} x1="58" y1={y} x2="62" y2={y} stroke="#d1d5db" strokeWidth="0.5" />
        ))}
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2563eb" strokeWidth="2" />
        <circle cx={x1} cy={y1} r="4" fill="#2563eb" />
        <circle cx={x2} cy={y2} r="4" fill="#2563eb" />
        <text x={x1 - 2} y={y1 + 14} fontSize="9" fill="#1e40af" fontWeight="600">(x₁,y₁)</text>
        <text x={x2 - 2} y={y2 - 6} fontSize="9" fill="#1e40af" fontWeight="600">(x₂,y₂)</text>
        {mode === 'midpoint' && (
          <>
            <circle cx={mx} cy={my} r="3" fill="#dc2626" />
            <text x={mx + 4} y={my} fontSize="9" fill="#dc2626" fontWeight="600">M</text>
          </>
        )}
        {mode === 'slope' && (
          <text x="62" y="52" fontSize="8" fill="#6b7280">rise / run</text>
        )}
      </svg>
    </DiagramContainer>
  );
}
