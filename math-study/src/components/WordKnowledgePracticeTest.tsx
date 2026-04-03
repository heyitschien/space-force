import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
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
import wordKnowledgeData from '../data/wordKnowledgePracticeQuestions.json';
import { saveWkResult, type WordKnowledgeTestMode } from '../utils/testResults';
import {
  selectNextQuestion,
  getDifficulty,
  DIFFICULTY_POINTS,
  type Difficulty,
} from '../utils/adaptiveQuestions';

interface WordKnowledgePracticeTestProps {
  onClose: () => void;
  mode?: WordKnowledgeTestMode;
}

type OptionId = 'A' | 'B' | 'C' | 'D';

interface QuestionOption {
  id: OptionId;
  text: string;
}

interface WkQuestion {
  id: string;
  order?: number;
  text: string;
  options: QuestionOption[];
  correct: OptionId;
  source: string;
  bucket?: string;
  difficulty?: Difficulty;
}

interface WkData {
  meta: {
    section: string;
    timeMinutes: number;
    questionsPerTest: number;
    sources: string[];
  };
  questions: WkQuestion[];
}

const DATA = wordKnowledgeData as WkData;
const REFERENCE_SECONDS = DATA.meta.timeMinutes * 60;
const QUESTIONS_PER_TEST = DATA.meta.questionsPerTest;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getFirstMediumQuestion(): WkQuestion | null {
  const medium = DATA.questions.filter((q) => (q.difficulty ?? 'medium') === 'medium');
  if (medium.length === 0) return DATA.questions[0] ?? null;
  return medium[Math.floor(Math.random() * medium.length)];
}

function getQuestionsForMode(mode: WordKnowledgeTestMode): WkQuestion[] {
  if (mode === 'adaptive') {
    const first = getFirstMediumQuestion();
    return first ? [first] : [];
  }
  if (mode === 'mix') {
    const shuffled = shuffleArray(DATA.questions);
    return shuffled.slice(0, Math.min(QUESTIONS_PER_TEST, shuffled.length));
  }
  const source = mode;
  const filtered = DATA.questions
    .filter((q) => q.source === source)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return filtered.slice(0, Math.min(QUESTIONS_PER_TEST, filtered.length));
}

export function WordKnowledgePracticeTest({
  onClose,
  mode = 'mix',
}: WordKnowledgePracticeTestProps) {
  const [phase, setPhase] = useState<'start' | 'running' | 'complete'>('start');
  const [questions, setQuestions] = useState<WkQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<OptionId | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [weightedScore, setWeightedScore] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<
    Array<{ question: WkQuestion; selectedAnswer: OptionId; correct: boolean }>
  >([]);
  const savedRef = useRef(false);

  const startTest = useCallback(() => {
    const selected = getQuestionsForMode(mode);
    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setWeightedScore(0);
    setElapsedSeconds(0);
    setAnswerHistory([]);
    savedRef.current = false;
    setPhase('running');
  }, [mode]);

  const currentQuestion = questions[currentIndex];
  const correctOptionText = currentQuestion
    ? currentQuestion.options.find((o) => o.id === currentQuestion.correct)?.text
    : '';

  useEffect(() => {
    if (phase !== 'running') return;

    const timer = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'complete') return;
    if (savedRef.current) return;
    savedRef.current = true;

    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const finalTimeUsed = elapsedSeconds;
    const overReferencePace = elapsedSeconds > REFERENCE_SECONDS;
    const missed = answerHistory.filter((a) => !a.correct);
    const maxWeighted =
      mode === 'adaptive'
        ? questions.reduce((sum, q) => sum + DIFFICULTY_POINTS[getDifficulty(q)], 0)
        : undefined;
    const missedByDifficulty =
      mode === 'adaptive'
        ? missed.reduce(
            (acc, { question }) => {
              const d = getDifficulty(question);
              acc[d] = (acc[d] ?? 0) + 1;
              return acc;
            },
            { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>,
          )
        : undefined;

    saveWkResult({
      date: new Date().toISOString(),
      mode,
      score,
      total: questions.length,
      percentage: pct,
      timeUsedSeconds: finalTimeUsed,
      timeExpired: overReferencePace,
      missedQuestionIds: missed.map((a) => a.question.id),
      attemptDetails: answerHistory.map((a) => ({
        questionId: a.question.id,
        selected: a.selectedAnswer,
        correct: a.question.correct,
      })),
      ...(mode === 'adaptive' && {
        weightedScore,
        maxWeightedScore: maxWeighted,
        missedByDifficulty,
      }),
    });
  }, [phase, mode, score, questions, elapsedSeconds, answerHistory, weightedScore]);

  const handleAnswerSelect = (optionId: OptionId) => {
    if (showFeedback || phase !== 'running') return;
    setSelectedAnswer(optionId);
    setShowFeedback(true);
    const correct = optionId === currentQuestion.correct;
    if (correct) {
      setScore((s) => s + 1);
      setWeightedScore((w) => w + DIFFICULTY_POINTS[getDifficulty(currentQuestion)]);
    }
    setAnswerHistory((prev) => [
      ...prev,
      { question: currentQuestion, selectedAnswer: optionId, correct },
    ]);
  };

  const handleNext = () => {
    if (mode === 'adaptive') {
      const lastEntry = answerHistory[answerHistory.length - 1];
      const lastCorrect = lastEntry?.correct ?? false;
      const lastDifficulty = lastEntry ? getDifficulty(lastEntry.question) : 'medium';
      const usedIds = new Set(questions.map((q) => q.id));
      const next = selectNextQuestion(DATA.questions as WkQuestion[], usedIds, lastDifficulty, lastCorrect);
      if (next && questions.length < QUESTIONS_PER_TEST) {
        setQuestions((prev) => [...prev, next]);
        setCurrentIndex(questions.length);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setPhase('complete');
      }
    } else if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setPhase('complete');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Word Knowledge Practice Test</h1>
          <p className="mb-6 text-slate-600">
            Up to {QUESTIONS_PER_TEST} questions • {DATA.meta.timeMinutes} min reference (ASVAB section time)
          </p>
          <p className="mb-8 text-center text-sm text-slate-500">
            Questions extracted from practice-1, practice-2, and practice-3. A stopwatch runs while you
            work; you can finish the full test even past the reference time.
          </p>
          <button
            onClick={startTest}
            className="rounded-xl bg-violet-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-violet-500 active:scale-95"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    const percentage =
      questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const finalTimeUsed = elapsedSeconds;
    const overReferencePace = elapsedSeconds > REFERENCE_SECONDS;
    const missedQuestions = answerHistory.filter((a) => !a.correct);
    const maxWeighted =
      mode === 'adaptive'
        ? questions.reduce((sum, q) => sum + DIFFICULTY_POINTS[getDifficulty(q)], 0)
        : undefined;
    const missedByDifficulty =
      mode === 'adaptive'
        ? missedQuestions.reduce(
            (acc, { question }) => {
              const d = getDifficulty(question);
              acc[d] = (acc[d] ?? 0) + 1;
              return acc;
            },
            { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>,
          )
        : undefined;

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
          <div className="bg-violet-900 p-8 text-center text-white">
            <Award className="mx-auto mb-4 h-16 w-16 text-amber-400" />
            <h1 className="mb-2 text-3xl font-bold">Test Complete</h1>
            <p className="font-medium text-violet-200">Word Knowledge — ASVAB Prep</p>
          </div>
          <div className="p-8">
            {mode === 'adaptive' && maxWeighted != null && (
              <div className="mb-6 rounded-xl border-2 border-violet-200 bg-violet-50/50 p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-violet-700">
                  Weighted Score (CAT-style)
                </p>
                <p className="text-2xl font-black text-violet-900">
                  {weightedScore} / {maxWeighted} pts
                </p>
                <p className="mt-1 text-xs text-slate-600">easy=1, medium=2, hard=3</p>
                {missedByDifficulty &&
                  (() => {
                    const correctByDiff = answerHistory
                      .filter((a) => a.correct)
                      .reduce(
                        (acc, a) => {
                          const d = getDifficulty(a.question);
                          acc[d] = (acc[d] ?? 0) + 1;
                          return acc;
                        },
                        {} as Record<Difficulty, number>,
                      );
                    return (
                      <div className="mt-3 flex flex-wrap gap-4 text-sm">
                        <span>
                          Correct: {correctByDiff.easy ?? 0} easy, {correctByDiff.medium ?? 0}{' '}
                          medium, {correctByDiff.hard ?? 0} hard
                        </span>
                        <span className="text-red-600">
                          Missed: {missedByDifficulty.easy} easy, {missedByDifficulty.medium}{' '}
                          medium, {missedByDifficulty.hard} hard
                        </span>
                      </div>
                    );
                  })()}
              </div>
            )}
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
                <p className="text-4xl font-black text-slate-900">{formatTime(finalTimeUsed)}</p>
                <p className="mt-1 text-sm text-slate-400">
                  Reference: {DATA.meta.timeMinutes} min —{' '}
                  {overReferencePace ? 'Over reference pace' : 'Within reference pace'}
                </p>
              </div>
            </div>

            {missedByDifficulty && (missedByDifficulty.hard ?? 0) > 0 && (
              <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
                Hard items to review — these are high-value on the real CAT.
              </div>
            )}
            {missedQuestions.length > 0 && (
              <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
                  <BookOpen className="h-5 w-5 text-violet-600" />
                  Review Missed Questions
                </h3>
                <ul className="space-y-4">
                  {missedQuestions.map(({ question, selectedAnswer }) => {
                    const wrongText =
                      question.options.find((o) => o.id === selectedAnswer)?.text ?? '';
                    const correctText =
                      question.options.find((o) => o.id === question.correct)?.text ?? '';
                    const diff = getDifficulty(question);
                    return (
                      <li
                        key={question.id}
                        className="rounded-lg border border-slate-200 bg-white p-4"
                      >
                        {mode === 'adaptive' && (
                          <span
                            className={`mb-2 inline-block rounded px-2 py-0.5 text-xs font-bold uppercase ${
                              diff === 'hard'
                                ? 'bg-amber-100 text-amber-800'
                                : diff === 'medium'
                                  ? 'bg-slate-200 text-slate-700'
                                  : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {diff}
                          </span>
                        )}
                        <p className="mb-2 font-medium text-slate-800">{question.text}</p>
                        <p className="mb-1 text-sm">
                          <span className="text-red-600">Your answer: {wrongText}</span>
                        </p>
                        <p className="mb-2 text-sm">
                          <span className="font-medium text-green-700">Correct: {correctText}</span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <button
                onClick={startTest}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-violet-500"
              >
                <RotateCcw className="h-5 w-5" />
                Retake Test
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

  if (!currentQuestion) {
    return null;
  }

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
            <h2 className="text-xs font-black uppercase tracking-widest text-violet-600">
              ASVAB Prep
            </h2>
            <h1 className="text-2xl font-bold text-slate-900">Word Knowledge</h1>
          </div>
          <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
            <div className="text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-left">
              Elapsed{' '}
              <span
                className={`font-mono text-sm normal-case ${
                  elapsedSeconds > REFERENCE_SECONDS ? 'text-amber-700' : 'text-slate-800'
                }`}
              >
                {formatTime(elapsedSeconds)}
              </span>
              <span className="text-slate-400"> · Ref {DATA.meta.timeMinutes} min</span>
            </div>
            <div
              className={`flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm ${
                elapsedSeconds > REFERENCE_SECONDS ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'
              }`}
            >
              <Clock className="h-4 w-4 text-slate-400" />
              <span
                className={`font-mono font-bold ${
                  elapsedSeconds > REFERENCE_SECONDS ? 'text-amber-800' : 'text-slate-700'
                }`}
              >
                {formatTime(elapsedSeconds)}
              </span>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="mr-2 text-sm text-slate-400">Q</span>
              <span className="font-bold text-slate-900">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
          </div>
        </div>

        <progress
          className="mb-8 h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-violet-600 [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-violet-600"
          value={currentIndex + 1}
          max={questions.length}
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 bg-slate-50 px-8 py-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Word Knowledge
            </span>
          </div>

          <div className="p-8">
            <p className="mb-8 text-2xl font-semibold leading-relaxed text-slate-800">
              {currentQuestion.text}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentQuestion.options.map((option) => {
                let buttonStyle = 'border-slate-200 hover:border-violet-400 hover:bg-violet-50';
                let icon: ReactNode = null;

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
                  buttonStyle = 'border-violet-500 bg-violet-50 ring-2 ring-violet-100';
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
                            ? 'bg-violet-600 text-white'
                            : 'bg-slate-100 text-slate-500'
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
                    <p className="text-base text-slate-400">Correct answer: {correctOptionText}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-5 font-bold text-white shadow-lg transition-all hover:bg-violet-500 active:scale-[0.98]"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Word Knowledge • 11 min reference • up to 35 questions
        </p>
      </div>
    </div>
  );
}
