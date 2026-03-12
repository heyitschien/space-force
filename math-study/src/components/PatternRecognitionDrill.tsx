import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  AR_20_PATTERNS,
  PATTERN_STEMS,
  getPatternById,
} from '../data/ar20Patterns';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function PatternRecognitionDrill() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { stems, correctPattern, options } = useMemo(() => {
    const allStems = shuffle(PATTERN_STEMS);
    const stem = allStems[currentIndex];
    if (!stem) return { stems: allStems, correctPattern: null, options: [] };

    const correct = getPatternById(stem.patternId);
    if (!correct) return { stems: allStems, correctPattern: null, options: [] };

    const wrongPatterns = AR_20_PATTERNS.filter((p) => p.id !== correct.id);
    const wrong = shuffle(wrongPatterns).slice(0, 3);
    const opts = shuffle([correct, ...wrong]);

    return { stems: allStems, correctPattern: correct, options: opts };
  }, [currentIndex]);

  const stem = stems[currentIndex];
  const handleSelect = (patternId: number) => {
    if (selectedId !== null) return;
    setSelectedId(patternId);
    if (patternId === correctPattern?.id) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex >= stems.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedId(null);
    }
  };

  if (stems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <Link to="/arithmetic-reasoning/patterns" className="text-rose-600 hover:text-rose-700 font-medium">
          ← Back to 20 Patterns
        </Link>
        <p className="mt-8 text-slate-600">No drill stems available.</p>
      </div>
    );
  }

  if (isComplete) {
    const pct = Math.round((correctCount / stems.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <Link
              to="/arithmetic-reasoning/patterns"
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              ← Back to 20 Patterns
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-12 text-center">
          <h1 className="mb-4 text-2xl font-bold text-rose-800">Pattern Drill Complete</h1>
          <p className="mb-2 text-4xl font-bold text-slate-800">
            {correctCount} / {stems.length} correct
          </p>
          <p className="mb-8 text-slate-600">{pct}% — {pct >= 80 ? 'Strong recognition!' : 'Keep practicing.'}</p>
          <div className="flex justify-center gap-4">
            <button
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
              Back to 20 Patterns
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            to="/arithmetic-reasoning/patterns"
            className="text-rose-600 hover:text-rose-700 font-medium"
          >
            ← Back to 20 Patterns
          </Link>
          <span className="text-sm text-slate-500">
            Question {currentIndex + 1} of {stems.length} · {correctCount} correct
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-amber-600">
          Solve in under 10 seconds
        </p>
        <p className="mb-8 text-xl font-medium text-slate-800">
          Which pattern applies?
        </p>
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
              if (isCorrect) bg = 'bg-emerald-50 border-emerald-400';
              else if (isSelected && !isCorrect) bg = 'bg-red-50 border-red-400';
            }

            return (
              <button
                key={opt.id}
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
            <p className="text-slate-600">
              {correctPattern?.quickExample}
            </p>
            <button
              onClick={handleNext}
              className="mt-4 rounded-lg bg-rose-600 px-4 py-2 font-medium text-white hover:bg-rose-500"
            >
              {currentIndex >= stems.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
