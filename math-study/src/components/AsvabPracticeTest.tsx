import { useEffect, useState, type ReactNode } from 'react';
import { AlertCircle, Award, BookOpen, CheckCircle2, ChevronRight, Clock, RotateCcw, X, Zap } from 'lucide-react';

interface AsvabPracticeTestProps {
  onClose: () => void;
}

type OptionId = 'A' | 'B' | 'C' | 'D';

interface QuestionOption {
  id: OptionId;
  text: string;
}

interface Question {
  id: number;
  section: string;
  text: string;
  options: QuestionOption[];
  correct: OptionId;
  explanation: string;
}

const QUESTIONS: Question[] = [
  { id: 1, section: 'PART 1: PEMDAS MASTERY', text: 'Simplify the following expression: 12 + [3 × (8 - 2)²] ÷ 9 - 4', options: [{ id: 'A', text: '12' }, { id: 'B', text: '20' }, { id: 'C', text: '24' }, { id: 'D', text: '32' }], correct: 'B', explanation: 'Following PEMDAS: \n1. Parentheses: (8 - 2) = 6 \n2. Exponents: 6² = 36 \n3. Multiplication (inside brackets): 3 × 36 = 108 \n4. Division: 108 ÷ 9 = 12 \n5. Addition/Subtraction: 12 + 12 - 4 = 20.' },
  { id: 2, section: 'PART 1: FRACTIONS & WORD DECODER', text: 'An Air Force technician spends 1/3 of her shift on repairs and 2/5 of her shift on inspections. If she has 4 hours remaining for administrative work, how long was her total shift?', options: [{ id: 'A', text: '12 hours' }, { id: 'B', text: '15 hours' }, { id: 'C', text: '18 hours' }, { id: 'D', text: '20 hours' }], correct: 'B', explanation: 'Common denominator for 1/3 and 2/5 is 15. \n1/3 = 5/15, 2/5 = 6/15. \nTotal used = 11/15. \nRemaining = 4/15. \nIf 4/15 = 4 hours, then 15/15 = 15 hours.' },
  { id: 3, section: 'PART 1: DECIMAL DIVISION', text: 'A fuel tank holds 52.5 gallons. If a generator consumes 0.75 gallons per hour, how many hours will the tank last?', options: [{ id: 'A', text: '60 hours' }, { id: 'B', text: '65 hours' }, { id: 'C', text: '70 hours' }, { id: 'D', text: '75 hours' }], correct: 'C', explanation: 'Shift decimal twice: 5250 ÷ 75. \n75 goes into 150 twice, so 75 into 525 is 7. \nResult is 70.' },
  { id: 4, section: 'PART 1: PERCENT MARKUP/DOWN', text: 'A toolkit originally costs $120. It is marked down by 25% for a sale. After the discount, a 10% oversize shipping fee is added to the sale price. What is the final cost?', options: [{ id: 'A', text: '$90' }, { id: 'B', text: '$99' }, { id: 'C', text: '$102' }, { id: 'D', text: '$108' }], correct: 'B', explanation: '25% of 120 is 30. Sale price = 90. \n10% of 90 is 9. \n90 + 9 = 99.' },
  { id: 5, section: 'PART 4: WORD PROBLEM DECODER', text: "Which equation correctly represents the statement: '7 less than three times a number is 26'?", options: [{ id: 'A', text: '7 - 3x = 26' }, { id: 'B', text: '3x - 7 = 26' }, { id: 'C', text: '3(x - 7) = 26' }, { id: 'D', text: '3x + 7 = 26' }], correct: 'B', explanation: "'7 less than' means -7 at the END. 'Three times a number' is 3x. 'is' is =. \n3x - 7 = 26." },
  { id: 6, section: 'SPEED DRILL: PEMDAS', text: 'Simplify: 20 - (5 + 3)² ÷ 16 + 4', options: [{ id: 'A', text: '8' }, { id: 'B', text: '12' }, { id: 'C', text: '20' }, { id: 'D', text: '24' }], correct: 'C', explanation: '1. (5+3) = 8 \n2. 8² = 64 \n3. 64 ÷ 16 = 4 \n4. 20 - 4 + 4 = 20.' },
  { id: 7, section: 'SPEED DRILL: LESS THAN REVERSAL', text: '12 less than five times a number is 48. Find the number.', options: [{ id: 'A', text: '7.2' }, { id: 'B', text: '10' }, { id: 'C', text: '12' }, { id: 'D', text: '15' }], correct: 'C', explanation: 'Equation: 5x - 12 = 48. \nAdd 12: 5x = 60. \nDivide by 5: x = 12.' },
  { id: 8, section: 'PART 1: PERCENT RECALL', text: 'What is 15% of 200?', options: [{ id: 'A', text: '15' }, { id: 'B', text: '20' }, { id: 'C', text: '30' }, { id: 'D', text: '45' }], correct: 'C', explanation: '10% of 200 is 20. 5% of 200 is half that (10). \n20 + 10 = 30.' },
  { id: 9, section: 'PART 1: FRACTION CAPACITY', text: 'An aircraft uses 1/4 of its fuel on takeoff and 1/2 for cruising. If it has 50 gallons left, what was the total capacity?', options: [{ id: 'A', text: '100 gallons' }, { id: 'B', text: '150 gallons' }, { id: 'C', text: '200 gallons' }, { id: 'D', text: '250 gallons' }], correct: 'C', explanation: '1/4 + 1/2 = 1/4 + 2/4 = 3/4 used. \n1/4 remains. \nIf 1/4 = 50, then total = 50 * 4 = 200.' },
  { id: 10, section: 'PART 1: DECIMAL PIECES', text: 'A wire 6.4 meters long is cut into 0.4 meter pieces. How many pieces are there?', options: [{ id: 'A', text: '14' }, { id: 'B', text: '16' }, { id: 'C', text: '18' }, { id: 'D', text: '20' }], correct: 'B', explanation: '6.4 ÷ 0.4. Move decimal: 64 ÷ 4 = 16.' },
  { id: 11, section: 'PART 1: PERCENT INCREASE', text: 'A supply price increases from $50 to $60. What is the percent increase?', options: [{ id: 'A', text: '10%' }, { id: 'B', text: '15%' }, { id: 'C', text: '20%' }, { id: 'D', text: '25%' }], correct: 'C', explanation: 'Change = $10. Original = $50. \nRatio = 10/50 = 1/5 = 20%.' },
  { id: 12, section: 'PART 4: DIFFERENCE DECODER', text: 'The difference between 100 and twice a number is 40. What is the number?', options: [{ id: 'A', text: '20' }, { id: 'B', text: '30' }, { id: 'C', text: '40' }, { id: 'D', text: '60' }], correct: 'B', explanation: '100 - 2x = 40. \n100 - 40 = 2x \n60 = 2x → x = 30.' },
  { id: 13, section: 'PART 4: RATIO TOTALS', text: 'In a unit, the ratio of men to women is 3:4. If there are 21 men, how many total people are in the unit?', options: [{ id: 'A', text: '28' }, { id: 'B', text: '42' }, { id: 'C', text: '49' }, { id: 'D', text: '56' }], correct: 'C', explanation: 'Men = 3 parts. 3 parts = 21, so 1 part = 7. \nTotal parts = 3 + 4 = 7 parts. \n7 * 7 = 49 total people.' },
  { id: 14, section: 'SPEED DRILL: PEMDAS', text: '(10 + 2) × 3 - 4² ÷ 2', options: [{ id: 'A', text: '10' }, { id: 'B', text: '28' }, { id: 'C', text: '32' }, { id: 'D', text: '40' }], correct: 'B', explanation: '1. (10+2) = 12 \n2. 12 * 3 = 36 \n3. 4² = 16 \n4. 16 ÷ 2 = 8 \n5. 36 - 8 = 28.' },
  { id: 15, section: 'SPEED DRILL: LESS THAN REVERSAL', text: '5 less than half a number is 10. Find the number.', options: [{ id: 'A', text: '15' }, { id: 'B', text: '20' }, { id: 'C', text: '25' }, { id: 'D', text: '30' }], correct: 'D', explanation: 'Equation: 1/2x - 5 = 10. \nAdd 5: 1/2x = 15. \nMultiply by 2: x = 30.' },
  { id: 16, section: 'PART 1: PERCENT LOGIC', text: 'A $200 radio is on sale for 20% off. After the discount, a 5% tax is added. What is the final price?', options: [{ id: 'A', text: '$160' }, { id: 'B', text: '$168' }, { id: 'C', text: '$170' }, { id: 'D', text: '$175' }], correct: 'B', explanation: '1. 20% of 200 = 40. Sale price = 160. \n2. 5% of 160 = 8. \n3. 160 + 8 = 168.' },
  { id: 17, section: 'PART 1: FRACTION REVERSAL', text: 'If 2/3 of a number is 16, what is the number?', options: [{ id: 'A', text: '20' }, { id: 'B', text: '24' }, { id: 'C', text: '32' }, { id: 'D', text: '48' }], correct: 'B', explanation: '2/3x = 16. Multiply by 3/2. \n16 * 3 = 48. 48 ÷ 2 = 24.' },
  { id: 18, section: 'PART 4: SUM DECODER', text: 'The sum of three times a number and 5 is 20. Find the number.', options: [{ id: 'A', text: '5' }, { id: 'B', text: '6' }, { id: 'C', text: '7' }, { id: 'D', text: '10' }], correct: 'A', explanation: '3x + 5 = 20. \n3x = 15. \nx = 5.' },
  { id: 19, section: 'SPEED DRILL: DECIMAL DIVISION', text: 'Evaluate: 48 ÷ 0.12', options: [{ id: 'A', text: '4' }, { id: 'B', text: '40' }, { id: 'C', text: '400' }, { id: 'D', text: '4000' }], correct: 'C', explanation: 'Move decimal twice: 4800 ÷ 12. \n12 * 4 = 48. Add zeros: 400.' },
  { id: 20, section: 'SPEED DRILL: RATIOS', text: 'The ratio of cars to trucks is 1:5. If there are 60 total vehicles, how many are cars?', options: [{ id: 'A', text: '10' }, { id: 'B', text: '12' }, { id: 'C', text: '15' }, { id: 'D', text: '50' }], correct: 'A', explanation: 'Total parts = 1 + 5 = 6. \n60 ÷ 6 = 10 per part. \nCars (1 part) = 10.' },
  { id: 21, section: 'SPEED DRILL: PERCENT', text: '30% of a number is 90. What is the number?', options: [{ id: 'A', text: '270' }, { id: 'B', text: '300' }, { id: 'C', text: '330' }, { id: 'D', text: '400' }], correct: 'B', explanation: '0.3x = 90. \n900 ÷ 3 = 300.' },
  { id: 22, section: 'SPEED DRILL: PEMDAS', text: '5 + 2 × (10 - 7)²', options: [{ id: 'A', text: '23' }, { id: 'B', text: '41' }, { id: 'C', text: '63' }, { id: 'D', text: '121' }], correct: 'A', explanation: '1. (10-7) = 3 \n2. 3² = 9 \n3. 2 * 9 = 18 \n4. 5 + 18 = 23.' },
  { id: 23, section: 'PART 1: COMPLEX PERCENT', text: 'A number increased by 20% of itself is 60. What is the number?', options: [{ id: 'A', text: '40' }, { id: 'B', text: '48' }, { id: 'C', text: '50' }, { id: 'D', text: '55' }], correct: 'C', explanation: 'x + 0.2x = 60 \n1.2x = 60 \n600 ÷ 12 = 50.' },
  { id: 24, section: 'SPEED DRILL: LESS THAN REVERSAL', text: '15 less than four times a number is 25. Find the number.', options: [{ id: 'A', text: '10' }, { id: 'B', text: '12.5' }, { id: 'C', text: '15' }, { id: 'D', text: '20' }], correct: 'A', explanation: '4x - 15 = 25. \n4x = 40. \nx = 10.' },
  { id: 25, section: 'PART 1: FRACTION REMAINDER', text: 'A soldier spends 1/5 of his pay on rent and 2/5 on food. If he has $1,200 left, what is his total pay?', options: [{ id: 'A', text: '$2,000' }, { id: 'B', text: '$2,400' }, { id: 'C', text: '$3,000' }, { id: 'D', text: '$4,000' }], correct: 'C', explanation: 'Used = 1/5 + 2/5 = 3/5. \nRemaining = 2/5. \nIf 2/5 = 1200, then 1/5 = 600. \nTotal (5/5) = 600 * 5 = 3000.' },
  { id: 26, section: 'PART 1: DECIMAL MULTIPLIER', text: 'If 1.5 liters of fuel weigh 1.2 kg, how much do 15 liters weigh?', options: [{ id: 'A', text: '8 kg' }, { id: 'B', text: '10 kg' }, { id: 'C', text: '12 kg' }, { id: 'D', text: '15 kg' }], correct: 'C', explanation: '15 liters is exactly 10 times more than 1.5 liters. \nWeight = 1.2 kg * 10 = 12 kg.' },
  { id: 27, section: 'FINAL DRILL: WORD PROBLEM', text: '18 is 3 more than 3 times a number. Find the number.', options: [{ id: 'A', text: '4' }, { id: 'B', text: '5' }, { id: 'C', text: '6' }, { id: 'D', text: '7' }], correct: 'B', explanation: '18 = 3x + 3. \n15 = 3x. \nx = 5.' },
];

export function AsvabPracticeTest({ onClose }: AsvabPracticeTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<OptionId | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (quizComplete) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizComplete, startTime]);

  const handleAnswerSelect = (optionId: OptionId) => {
    if (showExplanation) return;
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    if (optionId === QUESTIONS[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
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
