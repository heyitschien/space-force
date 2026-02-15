declare module 'react-katex' {
  import type { FC } from 'react';
  interface MathProps {
    math: string;
  }
  export const BlockMath: FC<MathProps>;
  export const InlineMath: FC<MathProps>;
}
