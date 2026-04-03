import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { ArPattern } from '../data/ar20Patterns';
import {
  AR_20_PATTERNS,
  AR_CORE_PATTERN_IDS,
  PATTERN_STEMS,
  getPatternById,
  getStemsForPatternSet,
} from '../data/ar20Patterns';
import { usePersistMathStudyCategory } from '../hooks/usePersistMathStudyCategory';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type DrillMode = 'core' | 'all';

export function PatternRecognitionDrill() {
  usePersistMathStudyCategory('arithmetic-reasoning');
  const [searchParams, setSearchParams] = useSearchParams();
  const [drillMode, setDrillMode] = useState<DrillMode>(() =>
    searchParams.get('mode') === 'core' ? 'core' : 'all',
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const shuffledStems = useMemo(() => {
    if (drillMode === 'core') {
      return shuffle(getStemsForPatternSet(AR_CORE_PATTERN_IDS));
    }
    return shuffle([...PATTERN_STEMS]);
  }, [drillMode]);

  useEffect(() => {
    queueMicrotask(() => {
      setCurrentIndex(0);
      setSelectedId(null);
      setCorrectCount(0);
      setIsComplete(false);
    });
  }, [drillMode]);

  const setMode = useCallback(
    (mode: DrillMode) => {
      setDrillMode(mode);
      if (mode === 'core') {
        setSearchParams({ mode: 'core' }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    },
    [setSearchParams],
  );

  const stem = shuffledStems[currentIndex];

  const { correctPattern, options } = useMemo(() => {
    if (!stem) return { correctPattern: null, options: [] as ArPattern[] };

    const correct = getPatternById(stem.patternId);
    if (!correct) return { correctPattern: null, options: [] };

    const wrongPatterns = AR_20_PATTERNS.filter((p) => p.id !== correct.id);
    const wrong = shuffle(wrongPatterns).slice(0, 3);
    const opts = shuffle([correct, ...wrong]);

    return { correctPattern: correct, options: opts };
  }, [stem]);

  const handleSelect = (patternId: number) => {
    if (selectedId !== null) return;
    setSelectedId(patternId);
    if (patternId === correctPattern?.id) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex >= shuffledStems.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedId(null);
    }
  };

  if (shuffledStems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <Link to="/arithmetic-reasoning/patterns" className="font-medium text-rose-600 hover:text-rose-700">
          ← Back to Patterns
        </Link>
        <p className="mt-8 text-slate-600">No drill stems available for this mode.</p>
      </div>
    );
  }

  if (isComplete) {
    const pct = Math.round((correctCount / shuffledStems.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <Link
              to="/arithmetic-reasoning/patterns"
              className="font-medium text-rose-600 hover:text-rose-700"
            >
              ← Back to Patterns
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-12 text-center">
          <h1 className="mb-4 text-2xl font-bold text-rose-800">Pattern Drill Complete</h1>
          <p className="mb-2 text-4xl font-bold text-slate-800">
            {correctCount} / {shuffledStems.length} correct
          </p>
          <p className="mb-8 text-slate-600">
            {pct}% — {pct >= 80 ? 'Strong recognition!' : 'Keep practicing.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setCurrentIndex(0);
                setSelectedId(null);
                setCorrectCount(0);
                setIsComplete(false);
              }}
              className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-500"
            >
              Try Again
            </button>
            <Link
              to="/arithmetic-reasoning/patterns"
              className="rounded-xl border-2 border-rose-600 px-6 py-3 font-semibold text-rose-600 hover:bg-rose-50"
            >
              Back to Patterns
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/arithmetic-reasoning/patterns"
            className="font-medium text-rose-600 hover:text-rose-700"
          >
            ← Back to Patterns
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500">
              {currentIndex + 1} of {shuffledStems.length} · {correctCount} correct
            </span>
          </div>
        </div>
        <div className="mx-auto mt-3 flex max-w-2xl flex-wrap gap-2 px-4 pb-3 sm:px-0">
          <span className="w-full text-xs font-semibold uppercase tracking-wide text-slate-500 sm:w-auto sm:py-2">
            Drill set
          </span>
          <button
            type="button"
            onClick={() => setMode('core')}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              drillMode === 'core'
                ? 'bg-rose-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Core ({getStemsForPatternSet(AR_CORE_PATTERN_IDS).length} stems)
          </button>
          <button
            type="button"
            onClick={() => setMode('all')}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              drillMode === 'all'
                ? 'bg-rose-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            All patterns ({PATTERN_STEMS.length} stems)
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-amber-600">
          Solve in under 10 seconds
        </p>
        <p className="mb-8 text-xl font-medium text-slate-800">Which pattern applies?</p>
        <p className="mb-8 rounded-xl border-2 border-slate-200 bg-white p-6 text-lg font-medium text-slate-800 shadow-sm">
          {stem?.stem}
        </p>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = selectedId === opt.id;
            const isCorrect = opt.id === correctPattern?.id;
            const showResult = selectedId !== null;

            let bg = 'bg-white border-slate-200 hover:border-rose-300';
            if (showResult) {
              if (isCorrect) bg = 'border-emerald-400 bg-emerald-50';
              else if (isSelected && !isCorrect) bg = 'border-red-400 bg-red-50';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                disabled={selectedId !== null}
                className={`w-full rounded-xl border-2 p-4 text-left transition-colors ${bg}`}
              >
                <span className="font-bold text-rose-700">#{opt.id}</span>{' '}
                <span className="font-medium text-slate-800">{opt.name}</span>
                <p className="mt-1 font-mono text-sm text-slate-600">{opt.formula}</p>
              </button>
            );
          })}
        </div>

        {selectedId !== null && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <p className="mb-2 font-semibold text-slate-800">
              {selectedId === correctPattern?.id ? 'Correct!' : 'Not quite.'}
            </p>
            <p className="text-slate-600">{correctPattern?.quickExample}</p>
            <button
              type="button"
              onClick={handleNext}
              className="mt-4 rounded-lg bg-rose-600 px-4 py-2 font-medium text-white hover:bg-rose-500"
            >
              {currentIndex >= shuffledStems.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
