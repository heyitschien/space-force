import { useState } from 'react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTIONS = [
  { q: 'What is the slope between (1, 2) and (3, 6)?', options: ['1', '2', '3', '4'], correct: '2' },
  { q: 'Find the volume of a cube with side length 4.', options: ['12', '16', '32', '64'], correct: '64' },
  { q: 'Evaluate 0! (zero factorial).', options: ['0', '1', 'Undefined', 'Infinity'], correct: '1' },
  { q: 'What is the sum of interior angles of a pentagon (5 sides)?', options: ['180°', '360°', '540°', '720°'], correct: '540°' },
  { q: 'Solve for x in x² - 9 = 0.', options: ['3 only', '-3 only', '3 or -3', '0'], correct: '3 or -3' },
];

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(() => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);

  const handleAnswer = (opt: string) => {
    if (opt === currentQ.correct) {
      setFeedback('Correct! Great job.');
    } else {
      setFeedback(`Incorrect. The correct answer is ${currentQ.correct}.`);
    }
  };

  const handleClose = () => {
    setFeedback(null);
    setCurrentQ(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
          title="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Quick Practice</h2>
        <div>
          <p className="text-lg mb-6">{currentQ.q}</p>
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="option-btn w-full p-3 border rounded-lg hover:bg-blue-50 text-left transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        {feedback && (
          <p
            className={`mt-6 p-4 rounded-lg font-bold ${
              feedback.startsWith('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}
