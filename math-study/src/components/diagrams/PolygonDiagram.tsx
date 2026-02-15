import { DiagramContainer } from './DiagramContainer';

export function PolygonDiagram() {
  const cx = 50;
  const cy = 50;
  const r = 35;
  const n = 5;
  const points = Array.from({ length: n }, (_, i) => {
    const angle = (i * 360 / n - 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');

  return (
    <DiagramContainer aspectRatio={1} aria-label="Pentagon showing interior angle sum 180(n-2)">
      <svg viewBox="0 0 100 100" className="max-h-44 w-full">
        <polygon
          points={points}
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <text x="50" y="25" fontSize="9" fill="#6b7280">α</text>
        <text x="78" y="42" fontSize="9" fill="#6b7280">β</text>
        <text x="70" y="78" fontSize="9" fill="#6b7280">γ</text>
        <text x="30" y="78" fontSize="9" fill="#6b7280">δ</text>
        <text x="22" y="42" fontSize="9" fill="#6b7280">ε</text>
        <text x="42" y="58" fontSize="8" fill="#9ca3af">n=5</text>
      </svg>
    </DiagramContainer>
  );
}
