import type { ReactNode } from 'react';

interface DiagramContainerProps {
  children: ReactNode;
  aspectRatio?: number;
  className?: string;
  'aria-label'?: string;
}

export function DiagramContainer({
  children,
  aspectRatio = 1,
  className = '',
  'aria-label': ariaLabel,
}: DiagramContainerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 ${className}`}
      style={{ aspectRatio: `${aspectRatio}` }}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
