import { useMemo, useState } from 'react';
import {
  BIOLOGY_QUIZ_QUESTIONS,
  type BiologyQuizQuestion,
} from '../data/biologyFacts';

interface BiologyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function shuffleQuestions(questions: BiologyQuizQuestion[]): BiologyQuizQuestion[] {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleOptions(options: string[]): string[] {
  const copy = [...options];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestionSet(
  questions: BiologyQuizQuestion[]
): BiologyQuizQuestion[] {
  return shuffleQuestions(questions).map((q) => ({
    ...q,
    options: shuffleOptions(q.options),
  }));
}

export function BiologyQuizModal({
  isOpen,
  onClose,
}: BiologyQuizModalProps) {
  const totalQuestions = BIOLOGY_QUIZ_QUESTIONS.length;
  const [quizSeed, setQuizSeed] = useState(0);
  const [retryMode, setRetryMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [missedQuestionIds, setMissedQuestionIds] = useState<string[]>([]);

  const missedSet = useMemo(() => new Set(missedQuestionIds), [missedQuestionIds]);
  const currentPool = useMemo(
    () =>
      retryMode
        ? BIOLOGY_QUIZ_QUESTIONS.filter((q) => missedSet.has(q.id))
        : BIOLOGY_QUIZ_QUESTIONS,
    [retryMode, missedSet]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps -- quizSeed forces new set on reset
  const questions = useMemo(() => buildQuestionSet(currentPool), [quizSeed, currentPool]);

  const currentQuestion = questions[currentIndex];
  const isComplete = currentIndex >= questions.length;

  const resetQuiz = () => {
    setQuizSeed((seed) => seed + 1);
    setRetryMode(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setMissedQuestionIds([]);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  const handleAnswer = (option: string) => {
    if (showFeedback || isComplete) return;

    setSelectedAnswer(option);
    setShowFeedback(true);

    if (option === currentQuestion.correctAnswer) {
      setScore((value) => value + 1);
      return;
    }

    setMissedQuestionIds((previous) =>
      previous.includes(currentQuestion.id)
        ? previous
        : [...previous, currentQuestion.id]
    );
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      if (!retryMode && missedQuestionIds.length > 0) {
        setRetryMode(true);
        setQuizSeed((seed) => seed + 1);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        return;
      }

      setCurrentIndex(questions.length);
      setSelectedAnswer(null);
      setShowFeedback(false);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

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

        {!isComplete && (
          <>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  {retryMode ? 'Retry Your Missed Biology Questions' : 'Test Your Biology Knowledge'}
                </h2>
                <span className="text-sm font-medium text-slate-500">
                  {currentIndex + 1} / {questions.length}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {retryMode
                  ? 'Focused review for questions you missed'
                  : 'ASVAB General Science biology and human body review'}
              </p>
              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-emerald-600 transition-all"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <p className="mb-6 text-lg font-medium text-slate-700">
                {currentQuestion.prompt}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;

                  let answerClasses =
                    'w-full rounded-lg border p-3 text-left transition-all ';

                  if (!showFeedback) {
                    answerClasses +=
                      'border-slate-200 hover:border-emerald-200 hover:bg-emerald-50';
                  } else if (isCorrect) {
                    answerClasses +=
                      'border-green-300 bg-green-50 text-green-900';
                  } else if (isSelected) {
                    answerClasses += 'border-red-300 bg-red-50 text-red-900';
                  } else {
                    answerClasses += 'border-slate-200 bg-slate-50 text-slate-500';
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={showFeedback}
                      className={answerClasses}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {showFeedback && (
              <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                <p
                  className={`font-bold ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? 'Correct.'
                    : `Not quite. The correct answer is ${currentQuestion.correctAnswer}.`}
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  {currentQuestion.explanation}
                </p>
                {selectedAnswer !== currentQuestion.correctAnswer && currentQuestion.distractorTip && (
                  <p className="mt-3 text-sm text-slate-700">
                    Why this is tricky: {currentQuestion.distractorTip}
                  </p>
                )}
                {currentQuestion.memoryAnchor && (
                  <p className="mt-3 text-sm font-medium text-emerald-700">
                    Memory anchor: {currentQuestion.memoryAnchor}
                  </p>
                )}
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700"
                  >
                    {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {isComplete && (
          <div className="py-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Biology quiz complete
            </h2>
            <p className="mt-3 text-slate-600">
              You got {score} out of {totalQuestions} questions correct.
            </p>
            {missedQuestionIds.length > 0 && (
              <p className="mt-2 text-sm text-slate-600">
                You reviewed {missedQuestionIds.length} missed concept{missedQuestionIds.length === 1 ? '' : 's'} in a retry round.
              </p>
            )}
            <p className="mt-2 text-sm text-slate-500">
              Review the quick facts, then restart to lock the facts into memory.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={resetQuiz}
                className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Restart quiz
              </button>
              <button
                onClick={handleClose}
                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50"
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
