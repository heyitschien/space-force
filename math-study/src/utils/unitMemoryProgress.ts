import type { UnitMemoryCard } from '../data/unitConversionContent';

const UNIT_MEMORY_STORAGE_KEY = 'asvab-unit-memory-progress-v1';
const TEN_MINUTES_MS = 10 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type Confidence = 'easy' | 'hard';

export interface UnitMemoryCardProgress {
  cardId: string;
  attempts: number;
  correctAttempts: number;
  streak: number;
  lastSeenAt: number | null;
  nextDueAt: number;
}

interface UnitMemoryStore {
  cardProgress: Record<string, UnitMemoryCardProgress>;
  lastSessionDay: string | null;
  dailyStreak: number;
  totalSessions: number;
}

export interface UnitMemoryStats {
  dueNow: number;
  dueTomorrow: number;
  mastered: number;
  dailyStreak: number;
  totalSessions: number;
}

function defaultCardProgress(cardId: string): UnitMemoryCardProgress {
  return {
    cardId,
    attempts: 0,
    correctAttempts: 0,
    streak: 0,
    lastSeenAt: null,
    nextDueAt: 0,
  };
}

function defaultStore(): UnitMemoryStore {
  return {
    cardProgress: {},
    lastSessionDay: null,
    dailyStreak: 0,
    totalSessions: 0,
  };
}

function toDayString(timestampMs: number): string {
  return new Date(timestampMs).toISOString().slice(0, 10);
}

function dayDifference(dayA: string, dayB: string): number {
  const a = new Date(`${dayA}T00:00:00.000Z`).getTime();
  const b = new Date(`${dayB}T00:00:00.000Z`).getTime();
  return Math.round((a - b) / ONE_DAY_MS);
}

function readStore(): UnitMemoryStore {
  try {
    const raw = localStorage.getItem(UNIT_MEMORY_STORAGE_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return defaultStore();
    const store = parsed as Partial<UnitMemoryStore>;
    return {
      cardProgress: store.cardProgress ?? {},
      lastSessionDay: store.lastSessionDay ?? null,
      dailyStreak: typeof store.dailyStreak === 'number' ? store.dailyStreak : 0,
      totalSessions: typeof store.totalSessions === 'number' ? store.totalSessions : 0,
    };
  } catch {
    return defaultStore();
  }
}

function writeStore(store: UnitMemoryStore): void {
  try {
    localStorage.setItem(UNIT_MEMORY_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage unavailable/full
  }
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function interleaveByTag(cards: UnitMemoryCard[]): UnitMemoryCard[] {
  const groups = new Map<string, UnitMemoryCard[]>();
  cards.forEach((card) => {
    const key = card.tags[0] ?? 'other';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(card);
  });

  const keys = shuffle(Array.from(groups.keys()));
  const result: UnitMemoryCard[] = [];
  let remaining = true;

  while (remaining) {
    remaining = false;
    keys.forEach((key) => {
      const group = groups.get(key);
      if (group && group.length > 0) {
        result.push(group.shift()!);
        remaining = true;
      }
    });
  }

  return result;
}

function getCardProgress(store: UnitMemoryStore, cardId: string): UnitMemoryCardProgress {
  return store.cardProgress[cardId] ?? defaultCardProgress(cardId);
}

function getNextIntervalMs(correct: boolean, confidence: Confidence, streak: number): number {
  if (!correct) return TEN_MINUTES_MS;
  const easySchedule = [ONE_DAY_MS, 3 * ONE_DAY_MS, 7 * ONE_DAY_MS, 14 * ONE_DAY_MS, 30 * ONE_DAY_MS];
  const hardSchedule = [TEN_MINUTES_MS, ONE_DAY_MS, 3 * ONE_DAY_MS, 7 * ONE_DAY_MS, 14 * ONE_DAY_MS];
  const schedule = confidence === 'easy' ? easySchedule : hardSchedule;
  return schedule[Math.min(streak, schedule.length - 1)];
}

export function getUnitMemoryStats(deck: UnitMemoryCard[], nowMs = Date.now()): UnitMemoryStats {
  const store = readStore();
  const tomorrowMs = nowMs + ONE_DAY_MS;

  let dueNow = 0;
  let dueTomorrow = 0;
  let mastered = 0;

  deck.forEach((card) => {
    const progress = getCardProgress(store, card.id);
    const accuracy = progress.attempts > 0 ? progress.correctAttempts / progress.attempts : 0;
    if (progress.nextDueAt <= nowMs) dueNow += 1;
    if (progress.nextDueAt > nowMs && progress.nextDueAt <= tomorrowMs) dueTomorrow += 1;
    if (progress.streak >= 3 && accuracy >= 0.85) mastered += 1;
  });

  return {
    dueNow,
    dueTomorrow,
    mastered,
    dailyStreak: store.dailyStreak,
    totalSessions: store.totalSessions,
  };
}

export function recordUnitMemorySession(nowMs = Date.now()): UnitMemoryStats {
  const store = readStore();
  const today = toDayString(nowMs);
  const lastDay = store.lastSessionDay;

  if (!lastDay) {
    store.dailyStreak = 1;
  } else if (lastDay !== today) {
    const delta = dayDifference(today, lastDay);
    if (delta === 1) store.dailyStreak += 1;
    else if (delta > 1) store.dailyStreak = 1;
  }

  if (lastDay !== today) {
    store.totalSessions += 1;
    store.lastSessionDay = today;
  }

  writeStore(store);
  return {
    dueNow: 0,
    dueTomorrow: 0,
    mastered: 0,
    dailyStreak: store.dailyStreak,
    totalSessions: store.totalSessions,
  };
}

export function buildUnitMemorySessionCards(
  deck: UnitMemoryCard[],
  targetCount = 20,
  nowMs = Date.now()
): UnitMemoryCard[] {
  const store = readStore();

  const due: UnitMemoryCard[] = [];
  const unseen: UnitMemoryCard[] = [];
  const future: UnitMemoryCard[] = [];

  deck.forEach((card) => {
    const progress = getCardProgress(store, card.id);
    if (progress.attempts === 0) unseen.push(card);
    else if (progress.nextDueAt <= nowMs) due.push(card);
    else future.push(card);
  });

  due.sort((a, b) => getCardProgress(store, a.id).nextDueAt - getCardProgress(store, b.id).nextDueAt);

  const pool = [
    ...due,
    ...shuffle(unseen),
    ...shuffle(future),
  ].slice(0, Math.max(targetCount, 1));

  return interleaveByTag(pool);
}

export function applyUnitMemoryReview(
  cardId: string,
  correct: boolean,
  confidence: Confidence,
  nowMs = Date.now()
): UnitMemoryCardProgress {
  const store = readStore();
  const current = getCardProgress(store, cardId);

  const attempts = current.attempts + 1;
  const correctAttempts = current.correctAttempts + (correct ? 1 : 0);
  const streak = correct ? current.streak + 1 : 0;
  const nextIntervalMs = getNextIntervalMs(correct, confidence, streak);

  const updated: UnitMemoryCardProgress = {
    ...current,
    attempts,
    correctAttempts,
    streak,
    lastSeenAt: nowMs,
    nextDueAt: nowMs + nextIntervalMs,
  };

  store.cardProgress[cardId] = updated;
  writeStore(store);
  return updated;
}

export function getUnitMemoryCardProgress(cardId: string): UnitMemoryCardProgress {
  const store = readStore();
  return getCardProgress(store, cardId);
}
