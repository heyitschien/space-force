import { useCallback, useEffect, useMemo, useState } from 'react';
import { MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS } from '../data/measurementPhysicsFacts';

interface MeasurementPhysicsRecallDrillProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRILL_SECONDS = 60;

function shuffleOptions(options: string[]): string[] {
  const copy = [...options];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function MeasurementPhysicsRecallDrill({
  isOpen,
  onClose,
}: MeasurementPhysicsRecallDrillProps) {
  const [phase, setPhase] = useState<'ready' | 'running' | 'done'>('ready');
  const [secondsLeft, setSecondsLeft] = useState(DRILL_SECONDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [missedIds, setMissedIds] = useState<string[]>([]);

  const itemsWithShuffledOptions = useMemo(
    () =>
      MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS.map((item) => ({
        ...item,
        options: shuffleOptions(item.options),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- phase resets shuffle when drill restarts
    [phase],
  );

  const currentItem = itemsWithShuffledOptions[currentIndex];

  const reset = useCallback(() => {
    setPhase('ready');
    setSecondsLeft(DRILL_SECONDS);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setMissedIds([]);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleStart = useCallback(() => {
    setPhase('running');
    setSecondsLeft(DRILL_SECONDS);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setMissedIds([]);
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (phase !== 'running' || !currentItem) return;
      setSelectedAnswer(answer);
      const correct = answer === currentItem.correctAnswer;
      if (correct) {
        setScore((s) => s + 1);
      } else {
        setMissedIds((prev) =>
          prev.includes(currentItem.id) ? prev : [...prev, currentItem.id]
        );
      }
      if (currentIndex >= MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS.length - 1) {
        setPhase('done');
      } else {
        setTimeout(() => {
          setCurrentIndex((i) => i + 1);
          setSelectedAnswer(null);
        }, 300);
      }
    },
    [phase, currentItem, currentIndex]
  );

  useEffect(() => {
    if (phase !== 'running') return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhase('done');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l18 18"
            />
          </svg>
        </button>

        {phase === 'ready' && (
          <div className="py-4">
            <h2 className="text-2xl font-bold text-slate-800">
              60-Second Recall Drill
            </h2>
            <p className="mt-3 text-slate-600">
              Answer Measurement & Physics questions fast. Target: 9/10+ under
              60 seconds.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleStart}
                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-500"
              >
                Start drill
              </button>
              <button
                onClick={handleClose}
                className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {phase === 'running' && currentItem && (
          <div className="py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                {currentIndex + 1} / {MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS.length}
              </span>
              <span
                className={`text-lg font-bold ${
                  secondsLeft <= 10 ? 'text-red-600' : 'text-slate-700'
                }`}
              >
                {secondsLeft}s
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-indigo-600 transition-all"
                style={{ width: `${(secondsLeft / DRILL_SECONDS) * 100}%` }}
              />
            </div>
            <p className="mt-6 text-lg font-medium text-slate-700">
              {currentItem.question}
            </p>
            <div className="mt-4 grid gap-2">
              {currentItem.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    selectedAnswer === null
                      ? 'border-slate-200 hover:border-indigo-200 hover:bg-indigo-50'
                      : option === currentItem.correctAnswer
                        ? 'border-green-300 bg-green-50'
                        : option === selectedAnswer
                          ? 'border-red-300 bg-red-50'
                          : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="py-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Drill complete
            </h2>
            <p className="mt-3 text-slate-600">
              You got {score} out of {MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS.length}{' '}
              correct.
            </p>
            {score >= 9 && (
              <p className="mt-2 text-sm font-medium text-indigo-700">
                Strong recall speed. Keep repeating to lock memory.
              </p>
            )}
            {missedIds.length > 0 && (
              <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h4 className="font-medium text-indigo-800">
                  Review these concepts:
                </h4>
                <ul className="mt-2 list-inside list-disc text-sm text-indigo-700">
                  {missedIds.map((id) => {
                    const item = MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS.find(
                      (entry) => entry.id === id
                    );
                    return item ? (
                      <li key={id}>
                        {item.question} {'->'} {item.correctAnswer}
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleStart}
                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-500"
              >
                Try again
              </button>
              <button
                onClick={handleClose}
                className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
