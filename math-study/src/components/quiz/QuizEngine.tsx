import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  RotateCcw,
  X,
} from 'lucide-react';
import type { QuizConfig, QuizQuestion, QuizResult, OptionId } from '../../data/quiz/types';
import { DifficultyBadge } from './DifficultyBadge';
import { BUCKET_TO_STUDY_PATH } from '../../data/quiz/arLevel1QuizConfig';

interface QuizEngineProps {
  config: QuizConfig;
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
  onClose: () => void;
  getStudyPath?: (bucket: string) => string | null;
  theme?: 'rose' | 'indigo';
  showDifficultyBadge?: boolean;
}

export function QuizEngine({
  config,
  questions,
  onComplete,
  onClose,
  getStudyPath = (b) => BUCKET_TO_STUDY_PATH[b] ?? null,
  theme = 'rose',
  showDifficultyBadge = true,
}: QuizEngineProps) {
  const [phase, setPhase] = useState<'start' | 'running' | 'complete'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<OptionId | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const totalSeconds = config.timeLimitSeconds ?? 0;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [timeExpired, setTimeExpired] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<
    Array<{ question: QuizQuestion; selectedAnswer: OptionId; correct: boolean }>
  >([]);

  const startTest = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setSecondsLeft(totalSeconds);
    setTimeExpired(false);
    setTimeUsed(0);
    setAnswerHistory([]);
    setPhase('running');
  }, [totalSeconds]);

  const currentQuestion = questions[currentIndex];
  const correctOptionText = currentQuestion
    ? currentQuestion.options.find((o) => o.id === currentQuestion.correct)?.text
    : '';

  useEffect(() => {
    if (phase !== 'running' || totalSeconds <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimeExpired(true);
          setTimeUsed(totalSeconds);
          setPhase('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, totalSeconds]);

  const handleAnswerSelect = (optionId: OptionId) => {
    if (showFeedback || phase !== 'running' || !currentQuestion) return;
    setSelectedAnswer(optionId);
    setShowFeedback(true);
    const correct = optionId === currentQuestion.correct;
    if (correct) setScore((s) => s + 1);
    setAnswerHistory((prev) => [
      ...prev,
      { question: currentQuestion, selectedAnswer: optionId, correct },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const finalHistory = answerHistory;
      const finalScore = finalHistory.filter((a) => a.correct).length;
      setTimeUsed(totalSeconds > 0 ? totalSeconds - secondsLeft : 0);
      setPhase('complete');
      onComplete({
        score: finalScore,
        total: questions.length,
        percentage: questions.length > 0 ? Math.round((finalScore / questions.length) * 100) : 0,
        timeUsedSeconds: totalSeconds > 0 ? totalSeconds - secondsLeft : 0,
        timeExpired,
        missedQuestionIds: finalHistory.filter((a) => !a.correct).map((a) => a.question.id),
        answerHistory: finalHistory,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const btnClass =
    theme === 'rose'
      ? 'rounded-xl bg-rose-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-rose-500 active:scale-95'
      : 'rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-indigo-500 active:scale-95';

  if (phase === 'start') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50 p-4 md:p-8 font-sans">
        <button
          onClick={onClose}
          className="fixed right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow-lg hover:text-slate-900"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">{config.title}</h1>
          <p className="mb-6 text-slate-600">
            {config.questionCount} questions
            {totalSeconds > 0 && ` • ${formatTime(totalSeconds)}`}
          </p>
          <p className="mb-8 text-center text-sm text-slate-500">
            Level 1 Arithmetic Reasoning. Timer starts when you begin.
          </p>
          <button onClick={startTest} className={btnClass}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const finalTimeUsed = timeUsed || (totalSeconds > 0 ? totalSeconds - secondsLeft : 0);
    const missedQuestions = answerHistory.filter((a) => !a.correct);

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50 p-4 md:p-8 font-sans">
        <button
          onClick={onClose}
          className="fixed right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow-lg hover:text-slate-900"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
          <div
            className={
              theme === 'rose'
                ? 'bg-rose-900 p-8 text-center text-white'
                : 'bg-indigo-900 p-8 text-center text-white'
            }
          >
            <Award className="mx-auto mb-4 h-16 w-16 text-amber-400" />
            <h1 className="mb-2 text-3xl font-bold">Quiz Complete</h1>
            <p className="font-medium text-white/80">{config.title}</p>
          </div>
          <div className="p-8">
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Score
                </p>
                <p className="text-4xl font-black text-slate-900">{percentage}%</p>
                <p className="mt-1 text-sm text-slate-400">
                  {score} / {questions.length} correct
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Time
                </p>
                <p className="text-4xl font-black text-slate-900">
                  {formatTime(finalTimeUsed)}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {timeExpired ? 'Time expired' : 'Completed'}
                </p>
              </div>
            </div>

            {missedQuestions.length > 0 && (
              <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
                  <BookOpen className="h-5 w-5 text-rose-600" />
                  Review Missed Questions
                </h3>
                <ul className="space-y-4">
                  {missedQuestions.map(({ question, selectedAnswer: wrong }) => {
                    const wrongText = question.options.find((o) => o.id === wrong)?.text ?? '';
                    const correctText = question.options.find((o) => o.id === question.correct)?.text ?? '';
                    const studyPath = getStudyPath(question.bucket);
                    return (
                      <li
                        key={question.id}
                        className="rounded-lg border border-slate-200 bg-white p-4"
                      >
                        {showDifficultyBadge && (
                          <DifficultyBadge
                            difficulty={question.difficulty}
                            className="mb-2"
                          />
                        )}
                        <p className="mb-2 font-medium text-slate-800">{question.text}</p>
                        <p className="mb-1 text-sm text-red-600">Your answer: {wrongText}</p>
                        <p className="mb-2 text-sm text-green-700 font-medium">
                          Correct: {correctText}
                        </p>
                        {question.explanation && (
                          <p className="mb-2 text-sm text-slate-600">{question.explanation}</p>
                        )}
                        {studyPath && (
                          <Link
                            to={studyPath}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-700"
                          >
                            Study {question.bucket.replace(/-/g, ' ')} →
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <button
                onClick={startTest}
                className={
                  theme === 'rose'
                    ? 'flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-rose-500'
                    : 'flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-indigo-500'
                }
              >
                <RotateCcw className="h-5 w-5" />
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-4 font-bold text-slate-800 transition-all hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-100 p-4 md:p-8 font-sans">
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow-lg hover:text-slate-900"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-rose-600">
              Level 1 AR
            </h2>
            <h1 className="text-2xl font-bold text-slate-900">{config.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            {totalSeconds > 0 && (
              <div
                className={`flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm ${
                  secondsLeft <= 60 ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
                }`}
              >
                <Clock className="h-4 w-4 text-slate-400" />
                <span
                  className={`font-mono font-bold ${
                    secondsLeft <= 60 ? 'text-red-700' : 'text-slate-700'
                  }`}
                >
                  {formatTime(secondsLeft)}
                </span>
              </div>
            )}
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="mr-2 text-sm text-slate-400">Q</span>
              <span className="font-bold text-slate-900">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
          </div>
        </div>

        <progress
          className="mb-8 h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-rose-600 [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-rose-600"
          value={currentIndex + 1}
          max={questions.length}
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 bg-slate-50 px-8 py-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {currentQuestion.bucket.replace(/-/g, ' ')}
            </span>
            {showDifficultyBadge && (
              <DifficultyBadge difficulty={currentQuestion.difficulty} />
            )}
          </div>

          <div className="p-8">
            <p className="mb-8 text-2xl font-semibold leading-relaxed text-slate-800">
              {currentQuestion.text}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentQuestion.options.map((option) => {
                let buttonStyle = 'border-slate-200 hover:border-rose-400 hover:bg-rose-50';
                let icon = null;

                if (showFeedback) {
                  if (option.id === currentQuestion.correct) {
                    buttonStyle = 'border-green-500 bg-green-50 ring-2 ring-green-100';
                    icon = <CheckCircle2 className="h-5 w-5 text-green-600" />;
                  } else if (selectedAnswer === option.id) {
                    buttonStyle = 'border-red-400 bg-red-50';
                    icon = <AlertCircle className="h-5 w-5 text-red-500" />;
                  } else {
                    buttonStyle = 'border-slate-100 opacity-50';
                  }
                } else if (selectedAnswer === option.id) {
                  buttonStyle = 'border-rose-500 bg-rose-50 ring-2 ring-rose-100';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showFeedback}
                    className={`flex items-center justify-between rounded-xl border-2 p-6 text-left transition-all duration-200 ${buttonStyle}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                          selectedAnswer === option.id
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="text-lg font-bold text-slate-800">
                        {option.text}
                      </span>
                    </div>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {showFeedback && (
            <div className="border-t border-slate-800 bg-slate-900 p-8 transition-opacity duration-300">
              <div className="mb-6 flex items-start gap-4">
                <div
                  className={`rounded-lg p-2 ${
                    selectedAnswer === currentQuestion.correct
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {selectedAnswer === currentQuestion.correct ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <AlertCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold uppercase tracking-wider text-white">
                    {selectedAnswer === currentQuestion.correct ? 'Correct' : 'Incorrect'}
                  </h4>
                  {selectedAnswer !== currentQuestion.correct && (
                    <p className="text-base text-slate-400">
                      Correct answer: {correctOptionText}
                    </p>
                  )}
                </div>
              </div>
              {currentQuestion.explanation && (
                <p className="mb-6 text-sm text-slate-300">{currentQuestion.explanation}</p>
              )}
              <button
                onClick={handleNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-5 font-bold text-white shadow-lg transition-all hover:bg-rose-500 active:scale-[0.98]"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
