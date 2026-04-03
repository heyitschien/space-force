import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AlertCircle, Award, BookOpen, CheckCircle2, ChevronRight, Clock, RotateCcw, X, Zap } from 'lucide-react';
import {
  ASVAB_PHASE0_QUESTIONS,
  type AsvabPhase0OptionId,
  type AsvabPhase0Question,
} from '../data/asvabPhase0EnduranceQuestions';
import { saveMathEnduranceResult } from '../utils/testResults';

interface AsvabPracticeTestProps {
  onClose: () => void;
}

const QUESTIONS = ASVAB_PHASE0_QUESTIONS;

export function AsvabPracticeTest({ onClose }: AsvabPracticeTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AsvabPhase0OptionId | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<
    Array<{ question: AsvabPhase0Question; selectedAnswer: AsvabPhase0OptionId; correct: boolean }>
  >([]);
  const savedRef = useRef(false);

  useEffect(() => {
    if (quizComplete) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizComplete, startTime]);

  useEffect(() => {
    if (!quizComplete) return;
    if (savedRef.current) return;
    savedRef.current = true;

    const pct = Math.round((score / QUESTIONS.length) * 100);
    const missed = answerHistory.filter((a) => !a.correct);
    saveMathEnduranceResult({
      date: new Date().toISOString(),
      mode: 'phase-0',
      score,
      total: QUESTIONS.length,
      percentage: pct,
      timeUsedSeconds: elapsedTime,
      timeExpired: false,
      missedQuestionIds: missed.map((a) => a.question.id),
      attemptDetails: answerHistory.map((a) => ({
        questionId: a.question.id,
        selected: a.selectedAnswer,
        correct: a.question.correct,
      })),
    });
  }, [quizComplete, score, answerHistory, elapsedTime]);

  const handleAnswerSelect = (optionId: AsvabPhase0OptionId) => {
    if (showExplanation) return;
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    if (optionId === QUESTIONS[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    const q = QUESTIONS[currentQuestion];
    if (selectedAnswer == null) return;
    const correct = selectedAnswer === q.correct;
    setAnswerHistory((prev) => [...prev, { question: q, selectedAnswer, correct }]);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setAnswerHistory([]);
    savedRef.current = false;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizComplete) {
    const percentage = Math.round((score / QUESTIONS.length) * 100);

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50 p-4 md:p-8 font-sans">
        <button
          onClick={onClose}
          className="fixed right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow-lg hover:text-slate-900"
          aria-label="Close ASVAB practice test"
          title="Close ASVAB practice test"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-slate-900 p-8 text-center text-white">
            <Award className="mx-auto mb-4 h-16 w-16 text-yellow-400" />
            <h1 className="mb-2 text-3xl font-bold">Drill Complete!</h1>
            <p className="font-medium text-slate-400">Phase 0 Mastery: 27-Question Endurance Check</p>
          </div>

          <div className="p-8">
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-500">Final Score</p>
                <p className="text-4xl font-black text-slate-900">{percentage}%</p>
                <p className="mt-1 text-sm text-slate-400">
                  {score} / {QUESTIONS.length} Correct
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-500">Time taken</p>
                <p className="text-4xl font-black text-slate-900">{formatTime(elapsedTime)}</p>
                <p className="mt-1 text-sm text-slate-400">Avg: {(elapsedTime / QUESTIONS.length).toFixed(1)}s / q</p>
              </div>
            </div>

            <div className="mb-8 space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-800">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Air Force Readiness Analysis:
              </h3>
              {percentage >= 90 ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                  <strong>Master Level (AFQT 85+ Potential):</strong> Your speed and accuracy are elite. You are reading the
                  reverse-logic problems correctly without second-guessing. Proceed to Algebra Fundamentals (Part 2).
                </div>
              ) : percentage >= 75 ? (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
                  <strong>Solid Base (AFQT 65-75 Range):</strong> You are consistent but might be rushing on the PEMDAS or Ratio
                  steps. Review your speed-drill mistakes specifically.
                </div>
              ) : (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                  <strong>Re-calibration Required:</strong> Your endurance dropped mid-test. Focus on decimal and fraction
                  conversions first. Do not move forward until you hit 80% on this drill.
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <button
                onClick={resetQuiz}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95"
              >
                <RotateCcw className="h-5 w-5" />
                Retake Endurance Drill
              </button>
              <button
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-4 font-bold text-slate-800 transition-all hover:bg-slate-50"
              >
                Close Practice Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-100 p-4 md:p-8 font-sans">
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow-lg hover:text-slate-900"
        aria-label="Close ASVAB practice test"
        title="Close ASVAB practice test"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="mb-0.5 text-xs font-black uppercase tracking-widest text-blue-600">Air Force Master Prep</h2>
              <h1 className="text-2xl font-bold text-slate-900">Endurance Drill: Phase 0</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="font-mono font-bold text-slate-700">{formatTime(elapsedTime)}</span>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="mr-2 text-sm text-slate-400">Q</span>
              <span className="font-bold text-slate-900">
                {currentQuestion + 1} / {QUESTIONS.length}
              </span>
            </div>
          </div>
        </div>

        <progress
          className="mb-8 h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-blue-600 [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-blue-600"
          value={currentQuestion + 1}
          max={QUESTIONS.length}
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{question.section}</span>
            {question.section.includes('SPEED') && (
              <span className="rounded bg-yellow-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-yellow-700">
                Fast Attack Only
              </span>
            )}
          </div>

          <div className="p-8">
            <p className="mb-8 text-2xl font-semibold leading-relaxed text-slate-800">{question.text}</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {question.options.map((option) => {
                let buttonStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50';
                let icon: ReactNode = null;

                if (showExplanation) {
                  if (option.id === question.correct) {
                    buttonStyle = 'border-green-500 bg-green-50 ring-2 ring-green-100';
                    icon = <CheckCircle2 className="h-5 w-5 text-green-600" />;
                  } else if (selectedAnswer === option.id) {
                    buttonStyle = 'border-red-400 bg-red-50';
                    icon = <AlertCircle className="h-5 w-5 text-red-500" />;
                  } else {
                    buttonStyle = 'border-slate-100 opacity-50';
                  }
                } else if (selectedAnswer === option.id) {
                  buttonStyle = 'border-blue-500 bg-blue-50 ring-2 ring-blue-100';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showExplanation}
                    className={`flex items-center justify-between rounded-xl border-2 p-6 text-left transition-all duration-200 ${buttonStyle}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                          selectedAnswer === option.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="text-lg font-bold text-slate-800">{option.text}</span>
                    </div>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className="border-t border-slate-800 bg-slate-900 p-8 transition-opacity duration-300">
              <div className="mb-6 flex items-start gap-4">
                <div
                  className={`rounded-lg p-2 ${
                    selectedAnswer === question.correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {selectedAnswer === question.correct ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <AlertCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold uppercase tracking-wider text-white">
                    {selectedAnswer === question.correct ? 'Objective Secured' : 'Correction Required'}
                  </h4>
                  <p className="whitespace-pre-line text-base italic leading-relaxed text-slate-400">{question.explanation}</p>
                </div>
              </div>

              <button
                onClick={nextQuestion}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-5 font-bold text-white shadow-lg transition-all hover:bg-blue-500 active:scale-[0.98]"
              >
                {currentQuestion < QUESTIONS.length - 1 ? 'Proceed to Next Target' : 'Final Mission Report'}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Phase 0: Fundamentals • Speed and Accuracy Protocol
        </p>
      </div>
    </div>
  );
}
