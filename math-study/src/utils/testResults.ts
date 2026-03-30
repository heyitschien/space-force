const GS_STORAGE_KEY = 'asvab-general-science-results';
const AR_STORAGE_KEY = 'asvab-arithmetic-reasoning-results';
const WK_STORAGE_KEY = 'asvab-word-knowledge-results';
const PC_STORAGE_KEY = 'asvab-paragraph-comprehension-results';

export type GeneralScienceTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';
export type ArithmeticReasoningTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';
export type WordKnowledgeTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';
export type ParagraphComprehensionTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';

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
  weightedScore?: number;
  maxWeightedScore?: number;
  missedByDifficulty?: { easy: number; medium: number; hard: number };
}

export interface ArTestResult {
  id: string;
  date: string;
  mode: ArithmeticReasoningTestMode;
  score: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
  weightedScore?: number;
  maxWeightedScore?: number;
  missedByDifficulty?: { easy: number; medium: number; hard: number };
}

export interface WkTestResult {
  id: string;
  date: string;
  mode: WordKnowledgeTestMode;
  score: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
  weightedScore?: number;
  maxWeightedScore?: number;
  missedByDifficulty?: { easy: number; medium: number; hard: number };
}

export interface PcTestResult {
  id: string;
  date: string;
  mode: ParagraphComprehensionTestMode;
  score: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
  weightedScore?: number;
  maxWeightedScore?: number;
  missedByDifficulty?: { easy: number; medium: number; hard: number };
}

export function saveResult(result: Omit<TestResult, 'id'>): void {
  const full: TestResult = {
    ...result,
    id: crypto.randomUUID(),
  };
  const existing = getResults();
  const updated = [full, ...existing];
  try {
    localStorage.setItem(GS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage full or disabled
  }
}

export function getResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(GS_STORAGE_KEY);
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

export function saveArResult(result: Omit<ArTestResult, 'id'>): void {
  const full: ArTestResult = {
    ...result,
    id: crypto.randomUUID(),
  };
  const existing = getArResults();
  const updated = [full, ...existing];
  try {
    localStorage.setItem(AR_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage full or disabled
  }
}

export function getArResults(): ArTestResult[] {
  try {
    const raw = localStorage.getItem(AR_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is ArTestResult =>
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

export function saveWkResult(result: Omit<WkTestResult, 'id'>): void {
  const full: WkTestResult = {
    ...result,
    id: crypto.randomUUID(),
  };
  const existing = getWkResults();
  const updated = [full, ...existing];
  try {
    localStorage.setItem(WK_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage full or disabled
  }
}

export function getWkResults(): WkTestResult[] {
  try {
    const raw = localStorage.getItem(WK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is WkTestResult =>
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

export function savePcResult(result: Omit<PcTestResult, 'id'>): void {
  const full: PcTestResult = {
    ...result,
    id: crypto.randomUUID(),
  };
  const existing = getPcResults();
  const updated = [full, ...existing];
  try {
    localStorage.setItem(PC_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage full or disabled
  }
}

export function getPcResults(): PcTestResult[] {
  try {
    const raw = localStorage.getItem(PC_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is PcTestResult =>
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
