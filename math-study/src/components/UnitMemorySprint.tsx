import { useEffect, useMemo, useState } from 'react';
import { UNIT_MEMORY_DECK, type UnitMemoryCard } from '../data/unitConversionContent';
import {
  applyUnitMemoryReview,
  buildUnitMemorySessionCards,
  getUnitMemoryStats,
  recordUnitMemorySession,
  type UnitMemoryStats,
} from '../utils/unitMemoryProgress';

type SprintPhase = 'ready' | 'running' | 'feedback' | 'complete';

const SESSION_SECONDS = 120;
const TARGET_CARD_COUNT = 24;

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

export function UnitMemorySprint() {
  const [phase, setPhase] = useState<SprintPhase>('ready');
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [sessionCards, setSessionCards] = useState<UnitMemoryCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [stats, setStats] = useState<UnitMemoryStats>(() => getUnitMemoryStats(UNIT_MEMORY_DECK));

  const currentCard = sessionCards[currentIndex];
  const answeredCorrectly = selectedIndex === currentCard?.answerIndex;

  useEffect(() => {
    if (phase !== 'running') return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhase('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const accuracy = useMemo(() => {
    if (attemptCount === 0) return 0;
    return Math.round((correctCount / attemptCount) * 100);
  }, [correctCount, attemptCount]);

  const beginSession = () => {
    const cards = buildUnitMemorySessionCards(UNIT_MEMORY_DECK, TARGET_CARD_COUNT);
    recordUnitMemorySession();
    setSessionCards(cards);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setCorrectCount(0);
    setAttemptCount(0);
    setSecondsLeft(SESSION_SECONDS);
    setPhase('running');
    setStats(getUnitMemoryStats(UNIT_MEMORY_DECK));
  };

  const submitAnswer = (index: number) => {
    if (phase !== 'running') return;
    setSelectedIndex(index);
    setAttemptCount((prev) => prev + 1);
    if (index === currentCard.answerIndex) {
      setCorrectCount((prev) => prev + 1);
    }
    setPhase('feedback');
  };

  const handleConfidence = (confidence: 'easy' | 'hard') => {
    if (!currentCard || selectedIndex === null) return;
    applyUnitMemoryReview(currentCard.id, selectedIndex === currentCard.answerIndex, confidence);
    setStats(getUnitMemoryStats(UNIT_MEMORY_DECK));

    const nextIndex = currentIndex + 1;
    if (nextIndex >= sessionCards.length) {
      setPhase('complete');
      return;
    }

    setCurrentIndex(nextIndex);
    setSelectedIndex(null);
    setPhase(secondsLeft > 0 ? 'running' : 'complete');
  };

  const replaySession = () => {
    beginSession();
  };

  if (phase === 'ready') {
    return (
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6">
        <h3 className="text-xl font-bold text-indigo-900">Think About It: 2-Min Unit Memory Game</h3>
        <p className="mt-2 text-sm text-slate-700">
          Retrieval sprint for long-term memory. You get short prompts, immediate feedback, and
          adaptive review scheduling.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <StatCard label="Due Now" value={stats.dueNow} />
          <StatCard label="Mastered" value={stats.mastered} />
          <StatCard label="Daily Streak" value={stats.dailyStreak} />
          <StatCard label="Sessions" value={stats.totalSessions} />
        </div>
        <button
          onClick={beginSession}
          className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Start 2-Min Sprint
        </button>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
        <h3 className="text-xl font-bold text-emerald-900">Sprint Complete</h3>
        <p className="mt-2 text-sm text-slate-700">
          Keep sessions short and frequent. This is how unit facts stick long-term.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <StatCard label="Accuracy" value={`${accuracy}%`} />
          <StatCard label="Correct" value={`${correctCount}/${attemptCount}`} />
          <StatCard label="Mastered" value={stats.mastered} />
          <StatCard label="Due Tomorrow" value={stats.dueTomorrow} />
        </div>
        <button
          onClick={replaySession}
          className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Unit Memory Sprint</p>
          <p className="text-lg font-semibold text-slate-900">
            Card {Math.min(currentIndex + 1, sessionCards.length)} of {sessionCards.length}
          </p>
        </div>
        <div className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 font-mono text-indigo-900">
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="mb-2 text-sm text-slate-500">
        Category: {(currentCard?.tags ?? []).join(', ')}
      </div>
      <p className="mb-5 text-xl font-semibold text-slate-800">{currentCard?.prompt}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {currentCard?.choices.map((choice, idx) => {
          const selected = selectedIndex === idx;
          const isAnswer = idx === currentCard.answerIndex;
          let style = 'border-slate-200 hover:border-indigo-300';
          if (phase === 'feedback') {
            if (isAnswer) style = 'border-emerald-400 bg-emerald-50';
            else if (selected && !isAnswer) style = 'border-rose-400 bg-rose-50';
            else style = 'border-slate-200 opacity-80';
          } else if (selected) {
            style = 'border-indigo-400 bg-indigo-50';
          }
          return (
            <button
              key={idx}
              type="button"
              disabled={phase !== 'running'}
              onClick={() => submitAnswer(idx)}
              className={`rounded-xl border p-4 text-left font-medium text-slate-800 transition-colors ${style}`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {phase === 'feedback' && (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p
            className={`font-semibold ${
              answeredCorrectly ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {answeredCorrectly ? 'Correct' : 'Not quite'}
          </p>
          <p className="mt-1 text-sm text-slate-700">{currentCard?.explanation}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
            How did this feel?
          </p>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => handleConfidence('easy')}
              className="rounded-lg border border-emerald-300 bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800"
            >
              Easy
            </button>
            <button
              onClick={() => handleConfidence('hard')}
              className="rounded-lg border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800"
            >
              Hard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
