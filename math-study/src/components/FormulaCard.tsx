import type { ReactNode } from 'react';

interface FormulaCardProps {
  title: string;
  children: ReactNode;
  borderColor?: string;
  className?: string;
}

export function FormulaCard({ title, children, borderColor = 'border-blue-500', className = '' }: FormulaCardProps) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm formula-card border-l-4 ${borderColor} ${className}`}>
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}
