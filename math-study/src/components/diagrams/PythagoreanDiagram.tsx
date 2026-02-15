import { DiagramContainer } from './DiagramContainer';

export function PythagoreanDiagram() {
  return (
    <DiagramContainer aspectRatio={1.2} aria-label="Right triangle with legs a, b and hypotenuse c">
      <svg viewBox="0 0 120 100" className="max-h-48 w-full">
        <polygon
          points="30,75 30,25 90,75"
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <text x="18" y="52" fontSize="12" fill="#059669" fontWeight="600">a</text>
        <text x="55" y="88" fontSize="12" fill="#059669" fontWeight="600">b</text>
        <text x="55" y="48" fontSize="12" fill="#dc2626" fontWeight="600">c</text>
        <path
          d="M 32 27 L 38 27 L 38 33 L 32 33 Z"
          fill="none"
          stroke="#059669"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 88 73 L 88 67 L 82 67 L 82 73 Z"
          fill="none"
          stroke="#059669"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
    </DiagramContainer>
  );
}
