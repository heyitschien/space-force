import type { QuizDifficulty } from '../../data/quiz/types';

const DIFFICULTY_STYLES: Record<
  QuizDifficulty,
  { bg: string; text: string; label: string }
> = {
  easy: { bg: 'bg-green-100', text: 'text-green-800', label: 'Easy' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Medium' },
  hard: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Hard' },
  expert: { bg: 'bg-rose-100', text: 'text-rose-800', label: 'Expert' },
};

interface DifficultyBadgeProps {
  difficulty: QuizDifficulty;
  className?: string;
}

export function DifficultyBadge({ difficulty, className = '' }: DifficultyBadgeProps) {
  const style = DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.medium;
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase ${style.bg} ${style.text} ${className}`}
    >
      {style.label}
    </span>
  );
}
