const STORAGE_KEY = 'asvab-general-science-results';

export type GeneralScienceTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix';

export interface TestResult {
  id: string;
  date: string;
  mode: GeneralScienceTestMode;
  score: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
}

export function saveResult(result: Omit<TestResult, 'id'>): void {
  const full: TestResult = {
    ...result,
    id: crypto.randomUUID(),
  };
  const existing = getResults();
  const updated = [full, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage full or disabled
  }
}

export function getResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is TestResult =>
        r &&
        typeof r === 'object' &&
        typeof r.date === 'string' &&
        typeof r.score === 'number' &&
        typeof r.total === 'number'
    );
  } catch {
    return [];
  }
}
