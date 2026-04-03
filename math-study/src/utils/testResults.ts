const GS_STORAGE_KEY = 'asvab-general-science-results';
const AR_STORAGE_KEY = 'asvab-arithmetic-reasoning-results';
const WK_STORAGE_KEY = 'asvab-word-knowledge-results';
const PC_STORAGE_KEY = 'asvab-paragraph-comprehension-results';
const MATH_ENDURANCE_STORAGE_KEY = 'asvab-math-endurance-results';

/** Cap stored attempts per test type to limit localStorage growth. */
const MAX_STORED_PER_KEY = 50;

export type TestAnswerLetter = 'A' | 'B' | 'C' | 'D';

export interface QuestionAttemptDetail {
  questionId: string;
  selected: TestAnswerLetter;
  correct: TestAnswerLetter;
}

export type GeneralScienceTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';
export type ArithmeticReasoningTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';
export type WordKnowledgeTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';
export type ParagraphComprehensionTestMode = 'practice-1' | 'practice-2' | 'practice-3' | 'mix' | 'adaptive';
export type MathEnduranceTestMode = 'phase-0';

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
  /** Per-question responses for review in history (optional for older saves). */
  attemptDetails?: QuestionAttemptDetail[];
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
  attemptDetails?: QuestionAttemptDetail[];
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
  attemptDetails?: QuestionAttemptDetail[];
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
  attemptDetails?: QuestionAttemptDetail[];
  weightedScore?: number;
  maxWeightedScore?: number;
  missedByDifficulty?: { easy: number; medium: number; hard: number };
}

export interface MathEnduranceTestResult {
  id: string;
  date: string;
  mode: MathEnduranceTestMode;
  score: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
  attemptDetails?: QuestionAttemptDetail[];
}

function trimStored<T>(updated: T[]): T[] {
  return updated.slice(0, MAX_STORED_PER_KEY);
}

function testHistoryApiUrl(): string | null {
  const base = import.meta.env.VITE_TEST_HISTORY_API_URL as string | undefined;
  if (!base?.trim() || typeof fetch !== 'function') return null;
  return `${base.replace(/\/$/, '')}/test-attempts`;
}

/** True when the client is configured to POST attempts to your API (local or Vercel). */
export function isTestHistoryCloudSyncConfigured(): boolean {
  return testHistoryApiUrl() != null;
}

/**
 * POST a single attempt to `/test-attempts` (Neon via server). Resolves ok for HTTP 204.
 */
export async function pushAttemptToServer(
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number }> {
  const url = testHistoryApiUrl();
  if (!url) return { ok: false, status: 0 };
  const key = import.meta.env.VITE_TEST_HISTORY_API_KEY as string | undefined;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

/** Upload every attempt in localStorage (all sections) to the server. Skips if API URL unset. */
export async function syncAllLocalAttemptsToServer(): Promise<{
  configured: boolean;
  pushed: number;
  failed: number;
  errors: string[];
}> {
  const url = testHistoryApiUrl();
  if (!url) {
    return { configured: false, pushed: 0, failed: 0, errors: [] };
  }

  const jobs: Array<{ testKind: string; row: Record<string, unknown> }> = [
    ...getResults().map((r) => ({ testKind: 'general-science', row: { ...r } })),
    ...getArResults().map((r) => ({ testKind: 'arithmetic-reasoning', row: { ...r } })),
    ...getWkResults().map((r) => ({ testKind: 'word-knowledge', row: { ...r } })),
    ...getPcResults().map((r) => ({ testKind: 'paragraph-comprehension', row: { ...r } })),
    ...getMathEnduranceResults().map((r) => ({ testKind: 'math-endurance', row: { ...r } })),
  ];

  let pushed = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const { testKind, row } of jobs) {
    const { ok, status } = await pushAttemptToServer({ testKind, ...row });
    if (ok) pushed += 1;
    else {
      failed += 1;
      const id = typeof row.id === 'string' ? row.id : '?';
      errors.push(`${testKind} (${id}): HTTP ${status || 'network'}`);
    }
  }

  return { configured: true, pushed, failed, errors };
}

/** Optional server sync (Neon via Vercel API). No-op if env not set. */
function maybeSyncAttempt(payload: Record<string, unknown>): void {
  void pushAttemptToServer(payload);
}

export function saveResult(result: Omit<TestResult, 'id'>): void {
  const full: TestResult = {
    ...result,
    id: crypto.randomUUID(),
  };
  const existing = getResults();
  const updated = trimStored([full, ...existing]);
  try {
    localStorage.setItem(GS_STORAGE_KEY, JSON.stringify(updated));
    maybeSyncAttempt({ testKind: 'general-science', ...full });
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
  const updated = trimStored([full, ...existing]);
  try {
    localStorage.setItem(AR_STORAGE_KEY, JSON.stringify(updated));
    maybeSyncAttempt({ testKind: 'arithmetic-reasoning', ...full });
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
  const updated = trimStored([full, ...existing]);
  try {
    localStorage.setItem(WK_STORAGE_KEY, JSON.stringify(updated));
    maybeSyncAttempt({ testKind: 'word-knowledge', ...full });
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
  const updated = trimStored([full, ...existing]);
  try {
    localStorage.setItem(PC_STORAGE_KEY, JSON.stringify(updated));
    maybeSyncAttempt({ testKind: 'paragraph-comprehension', ...full });
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

export function saveMathEnduranceResult(result: Omit<MathEnduranceTestResult, 'id'>): void {
  const full: MathEnduranceTestResult = {
    ...result,
    id: crypto.randomUUID(),
  };
  const existing = getMathEnduranceResults();
  const updated = trimStored([full, ...existing]);
  try {
    localStorage.setItem(MATH_ENDURANCE_STORAGE_KEY, JSON.stringify(updated));
    maybeSyncAttempt({ testKind: 'math-endurance', ...full });
  } catch {
    // localStorage full or disabled
  }
}

export function getMathEnduranceResults(): MathEnduranceTestResult[] {
  try {
    const raw = localStorage.getItem(MATH_ENDURANCE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is MathEnduranceTestResult =>
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
