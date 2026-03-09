import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SolarSystem3D } from '../diagrams/SolarSystem3D';
import { getFactById, ASVAB_FACTS_CARDS } from '../../data/planetFacts';
import type { CelestialId } from '../../data/planetFacts';

interface GeneralScienceProps {
  visible: boolean;
}

const ASTRONOMY_QUIZ_QUESTIONS = [
  {
    q: 'Which planet is the largest in the solar system?',
    options: ['Earth', 'Mars', 'Saturn', 'Jupiter'],
    correct: 'Jupiter',
  },
  {
    q: 'Which planet is the brightest in the sky (after the Sun and Moon)?',
    options: ['Mars', 'Saturn', 'Venus', 'Mercury'],
    correct: 'Venus',
  },
  {
    q: 'Where is the asteroid belt located?',
    options: ['Around Mercury', 'Between Mars and Jupiter', 'Beyond Neptune', 'Inside Venus orbit'],
    correct: 'Between Mars and Jupiter',
  },
  {
    q: 'How many planets in the solar system have rings?',
    options: ['One', 'Two', 'Three', 'Four'],
    correct: 'Four',
  },
  {
    q: 'What is a light-year?',
    options: [
      'The brightness of light at 30,000 miles',
      'The distance light travels in one year',
      '17 standard Earth years',
      'A unit of time',
    ],
    correct: 'The distance light travels in one year',
  },
];

function PlanetInfo({ selectedId }: { selectedId: CelestialId | null }) {
  if (!selectedId) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
        <p className="text-sm">Click a planet or the asteroid belt in the 3D view to see ASVAB facts.</p>
      </div>
    );
  }

  const fact = getFactById(selectedId);
  if (!fact) return null;

  return (
    <div
      className="rounded-xl border-2 border-indigo-200 bg-white p-6 shadow-sm"
      style={{ borderLeft: `4px solid ${fact.color}` }}
    >
      <h3 className="text-xl font-bold text-slate-800">{fact.name}</h3>
      <p className="mt-2 text-slate-700">{fact.fact}</p>
      {fact.memoryAnchor && (
        <p className="mt-3 text-sm font-medium text-indigo-600">{fact.memoryAnchor}</p>
      )}
    </div>
  );
}

function AstronomyQuizModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentQ] = useState(() => ASTRONOMY_QUIZ_QUESTIONS[Math.floor(Math.random() * ASTRONOMY_QUIZ_QUESTIONS.length)]);

  const handleAnswer = (opt: string) => {
    if (opt === currentQ.correct) {
      setFeedback('Correct! Great job.');
    } else {
      setFeedback(`Incorrect. The correct answer is ${currentQ.correct}.`);
    }
  };

  const handleClose = () => {
    setFeedback(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative max-w-lg w-full rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Test Your Astronomy Knowledge</h2>
        <p className="mt-3 text-sm text-slate-500">ASVAB General Science practice</p>
        <div className="mt-6">
          <p className="text-lg font-medium text-slate-700">{currentQ.q}</p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {currentQ.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="w-full rounded-lg border border-slate-200 p-3 text-left transition-all hover:bg-indigo-50 hover:border-indigo-200"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        {feedback && (
          <p
            className={`mt-6 rounded-lg p-4 font-bold ${
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

export function GeneralScience({ visible }: GeneralScienceProps) {
  const [selectedId, setSelectedId] = useState<CelestialId | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  if (!visible) return null;

  return (
    <section id="general-science" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="mb-2 border-b-2 border-indigo-200 pb-2 text-2xl font-bold text-indigo-800">
            General Science — Astronomy
          </h2>
          <p className="text-slate-600">
            Explore our solar system and prepare for ASVAB General Science questions. Click planets to learn key facts.
          </p>
        </div>
        <Link
          to="/astronomy"
          className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition-colors hover:bg-indigo-700"
        >
          Open full-screen view →
        </Link>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <SolarSystem3D onPlanetSelect={setSelectedId} selectedId={selectedId} showLabels />
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-slate-700">Selected: ASVAB Fact</h3>
          <PlanetInfo selectedId={selectedId} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold text-slate-800">ASVAB Quick Facts</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ASVAB_FACTS_CARDS.map((f) => (
            <div
              key={f.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              style={{ borderLeft: `4px solid ${f.color}` }}
            >
              <h4 className="font-bold text-slate-800">{f.name}</h4>
              <p className="mt-1 text-sm text-slate-600">{f.fact}</p>
              {f.memoryAnchor && (
                <p className="mt-2 text-xs font-medium text-indigo-600">{f.memoryAnchor}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setQuizOpen(true)}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-indigo-700"
        >
          Test Your Astronomy Knowledge
        </button>
      </div>

      <AstronomyQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  );
}
