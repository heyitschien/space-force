import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Algebra } from './components/topics/Algebra';
import { Geometry2D } from './components/topics/Geometry2D';
import { Geometry3D } from './components/topics/Geometry3D';
import { ExponentsRadicals } from './components/topics/ExponentsRadicals';
import { Factoring } from './components/topics/Factoring';
import { ProbabilityStats } from './components/topics/ProbabilityStats';
import { UnitsConversions } from './components/topics/UnitsConversions';
import { SpecialTopics } from './components/topics/SpecialTopics';
import { QuizModal } from './components/QuizModal';

const SECTION_IDS = [
  'algebra',
  'geometry-2d',
  'geometry-3d',
  'exponents-radicals',
  'factoring',
  'probability-stats',
  'units-conversions',
  'special-topics',
] as const;

const SEARCH_TERMS: Record<string, string[]> = {
  algebra: ['slope', 'quadratic', 'line', 'distance', 'midpoint', 'coordinate'],
  'geometry-2d': ['triangle', 'pythagorean', 'circle', 'polygon', 'trapezoid', 'area'],
  'geometry-3d': ['volume', 'surface', 'cube', 'cylinder', 'sphere', 'pyramid', 'cone'],
  'exponents-radicals': ['exponent', 'radical', 'power', 'root'],
  factoring: ['factor', 'gcf', 'trinomial', 'grouping'],
  'probability-stats': ['mean', 'median', 'mode', 'probability', 'statistics'],
  'units-conversions': ['unit', 'convert', 'length', 'mass', 'capacity', 'time'],
  'special-topics': ['interest', 'distance', 'rate', 'temperature', 'pemdas', 'percent'],
};

function sectionMatchesSearch(sectionId: string, term: string): boolean {
  if (!term.trim()) return true;
  const terms = SEARCH_TERMS[sectionId] ?? [];
  const lower = term.toLowerCase();
  return terms.some((t) => t.includes(lower) || lower.includes(t));
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('algebra');
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = id;
        }
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row p-4 gap-8">
        <Sidebar activeSection={activeSection} />

        <main className="lg:w-3/4 space-y-12 pb-24">
          <Algebra visible={sectionMatchesSearch('algebra', searchTerm)} />
          <Geometry2D visible={sectionMatchesSearch('geometry-2d', searchTerm)} />
          <Geometry3D visible={sectionMatchesSearch('geometry-3d', searchTerm)} />
          <ExponentsRadicals visible={sectionMatchesSearch('exponents-radicals', searchTerm)} />
          <Factoring visible={sectionMatchesSearch('factoring', searchTerm)} />
          <ProbabilityStats visible={sectionMatchesSearch('probability-stats', searchTerm)} />
          <UnitsConversions visible={sectionMatchesSearch('units-conversions', searchTerm)} />
          <SpecialTopics visible={sectionMatchesSearch('special-topics', searchTerm)} />
        </main>
      </div>

      <button
        onClick={() => setQuizOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transform hover:scale-110 transition-all flex items-center gap-2 z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-bold">Practice Question</span>
      </button>

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
