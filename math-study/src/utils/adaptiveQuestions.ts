export type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_ORDER: Difficulty[] = ['easy', 'medium', 'hard'];

export function getNextDifficulty(current: Difficulty, correct: boolean): Difficulty {
  const idx = DIFFICULTY_ORDER.indexOf(current);
  if (correct && idx < 2) return DIFFICULTY_ORDER[idx + 1];
  if (!correct && idx > 0) return DIFFICULTY_ORDER[idx - 1];
  return current;
}

export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export interface QuestionWithDifficulty {
  id: string;
  difficulty?: Difficulty;
}

export function selectNextQuestion<T extends QuestionWithDifficulty>(
  pool: T[],
  usedIds: Set<string>,
  currentDifficulty: Difficulty,
  lastCorrect: boolean
): T | null {
  const nextDiff = getNextDifficulty(currentDifficulty, lastCorrect);
  const available = pool.filter((q) => !usedIds.has(q.id));
  if (available.length === 0) return null;

  const matching = available.filter((q) => (q.difficulty ?? 'medium') === nextDiff);
  if (matching.length > 0) {
    return matching[Math.floor(Math.random() * matching.length)];
  }
  const idx = DIFFICULTY_ORDER.indexOf(nextDiff);
  const adjacent = [
    DIFFICULTY_ORDER[Math.max(0, idx - 1)],
    DIFFICULTY_ORDER[Math.min(2, idx + 1)],
  ].filter((d) => d !== nextDiff);
  for (const d of adjacent) {
    const fallback = available.filter((q) => (q.difficulty ?? 'medium') === d);
    if (fallback.length > 0) {
      return fallback[Math.floor(Math.random() * fallback.length)];
    }
  }
  return available[Math.floor(Math.random() * available.length)];
}

export function getDifficulty(q: QuestionWithDifficulty): Difficulty {
  return (q.difficulty ?? 'medium') as Difficulty;
}
