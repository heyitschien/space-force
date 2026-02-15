import { useState } from 'react';
import type { ReactNode } from 'react';

interface FormulaCardWithVisualProps {
  title: string;
  children: ReactNode;
  visual?: ReactNode;
  visualLabel?: string;
  borderColor?: string;
  className?: string;
}

export function FormulaCardWithVisual({
  title,
  children,
  visual,
  visualLabel = 'Show visual',
  borderColor = 'border-blue-500',
  className = '',
}: FormulaCardWithVisualProps) {
  const [showVisual, setShowVisual] = useState(false);

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm formula-card border-l-4 ${borderColor} ${className}`}
    >
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      {children}
      {visual && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowVisual((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showVisual ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                Hide visual
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {visualLabel}
              </>
            )}
          </button>
          {showVisual && (
            <div className="mt-3 overflow-hidden transition-all duration-200">
              {visual}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
