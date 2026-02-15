import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  children: string;
  display?: boolean;
}

export function Math({ children, display = false }: MathProps) {
  if (display) {
    return <BlockMath math={children} />;
  }
  return <InlineMath math={children} />;
}
