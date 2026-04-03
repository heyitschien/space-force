import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { GeneralScience } from './components/topics/GeneralScience';
import { QuizModal } from './components/QuizModal';
import { AsvabPracticeTest } from './components/AsvabPracticeTest';
import { GeneralScienceTestLauncher } from './components/GeneralScienceTestLauncher';
import { ArithmeticReasoningTestLauncher } from './components/ArithmeticReasoningTestLauncher';
import { ArithmeticReasoning } from './components/topics/ArithmeticReasoning';
import { PracticeMenu } from './components/PracticeMenu';
import { TestHistoryModal } from './components/TestHistoryModal';
import { AstronomyPage } from './pages/AstronomyPage';
import { BiologyPage } from './pages/BiologyPage';
import { ChemistryPage } from './pages/ChemistryPage';
import { EarthSciencePage } from './pages/EarthSciencePage';
import { MeasurementPhysicsPage } from './pages/MeasurementPhysicsPage';
import { WordKnowledgePage } from './pages/WordKnowledgePage';
import { ParagraphComprehensionPage } from './pages/ParagraphComprehensionPage';
import { WordKnowledgeTestLauncher } from './components/WordKnowledgeTestLauncher';
import { ParagraphComprehensionTestLauncher } from './components/ParagraphComprehensionTestLauncher';
import { ArTopicPage } from './components/ArTopicPage';
import { ArPatternsPage } from './components/ArPatternsPage';
import { PatternRecognitionDrill } from './components/PatternRecognitionDrill';
import {
  MATH_SECTION_IDS_FOR_HASH,
  readActiveCategory,
  writeActiveCategory,
  readMkSection,
  writeMkSection,
  categoryFromHash,
} from './utils/mathStudyNavPersistence';

const MATH_SECTION_IDS = MATH_SECTION_IDS_FOR_HASH;

type ActiveCategory = 'general-science' | 'arithmetic-reasoning' | 'mathematics-knowledge';

function resolveInitialCategory(): ActiveCategory {
  if (typeof window === 'undefined') return 'general-science';
  const hash = window.location.hash.slice(1);
  const fromHash = categoryFromHash(hash);
  if (fromHash) return fromHash;
  return readActiveCategory() ?? 'general-science';
}

function resolveInitialSection(category: ActiveCategory): string {
  if (category === 'mathematics-knowledge') {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if ((MATH_SECTION_IDS_FOR_HASH as readonly string[]).includes(hash)) return hash;
    }
    const s = readMkSection();
    if (s && (MATH_SECTION_IDS_FOR_HASH as readonly string[]).includes(s)) return s;
    return 'algebra';
  }
  return 'general-science';
}

const SEARCH_TERMS: Record<string, string[]> = {
  'general-science': [
    'astronomy',
    'planet',
    'solar system',
    'asteroid',
    'light-year',
    'venus',
    'jupiter',
    'mars',
    'biology',
    'human body',
    'cell',
    'nucleus',
    'osmosis',
    'heart',
    'intestines',
    'carnivore',
    'kingdom',
    'white blood cells',
    'chemistry',
    'atom',
    'atomic number',
    'electron',
    'proton',
    'element',
    'compound',
    'mixture',
    'oxidation',
    'acid',
    'earth',
    'crust',
    'mantle',
    'core',
    'biosphere',
    'igneous',
    'pumice',
    'sedimentary',
    'metamorphic',
    'tropical rainforest',
    'biome',
    'meter',
    'centimeter',
    'kilometer',
    'celsius',
    'boiling',
    'speed of light',
    'velocity',
    'energy',
    'power',
    'watts',
    'melting point',
    'newton',
    'force',
  ],
  algebra: ['slope', 'quadratic', 'line', 'distance', 'midpoint', 'coordinate'],
  'geometry-2d': ['triangle', 'pythagorean', 'circle', 'polygon', 'trapezoid', 'area'],
  'geometry-3d': ['volume', 'surface', 'cube', 'cylinder', 'sphere', 'pyramid', 'cone'],
  'exponents-radicals': ['exponent', 'radical', 'power', 'root'],
  factoring: ['factor', 'gcf', 'trinomial', 'grouping'],
  'probability-stats': ['mean', 'median', 'mode', 'probability', 'statistics'],
  'units-conversions': ['unit', 'convert', 'length', 'mass', 'capacity', 'time'],
  'special-topics': ['interest', 'distance', 'rate', 'temperature', 'pemdas', 'percent'],
  'arithmetic-reasoning': ['fractions', 'decimals', 'percents', 'ratios', 'averages', 'word problem', 'rate', 'distance', 'time'],
};

function sectionMatchesSearch(sectionId: string, term: string): boolean {
  if (!term.trim()) return true;
  const terms = SEARCH_TERMS[sectionId] ?? [];
  const lower = term.toLowerCase();
  return terms.some((t) => t.includes(lower) || lower.includes(t));
}

export default function App() {
  return (
    <Routes>
      <Route path="/astronomy" element={<AstronomyPage />} />
      <Route path="/biology" element={<BiologyPage />} />
      <Route path="/chemistry" element={<ChemistryPage />} />
      <Route path="/earth-science" element={<EarthSciencePage />} />
      <Route path="/measurement-physics" element={<MeasurementPhysicsPage />} />
      <Route path="/word-knowledge" element={<WordKnowledgePage />} />
      <Route path="/paragraph-comprehension" element={<ParagraphComprehensionPage />} />
      <Route path="/arithmetic-reasoning/patterns" element={<ArPatternsPage />} />
      <Route path="/arithmetic-reasoning/pattern-drill" element={<PatternRecognitionDrill />} />
      <Route path="/arithmetic-reasoning/:topicId" element={<ArTopicPage />} />
      <Route path="/" element={<MathStudyPage />} />
    </Routes>
  );
}

function MathStudyPage() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(() => resolveInitialCategory());
  const [activeSection, setActiveSection] = useState(() =>
    resolveInitialSection(resolveInitialCategory()),
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [asvabPracticeOpen, setAsvabPracticeOpen] = useState(false);
  const [generalSciencePracticeOpen, setGeneralSciencePracticeOpen] = useState(false);
  const [arithmeticReasoningPracticeOpen, setArithmeticReasoningPracticeOpen] = useState(false);
  const [wordKnowledgePracticeOpen, setWordKnowledgePracticeOpen] = useState(false);
  const [paragraphComprehensionPracticeOpen, setParagraphComprehensionPracticeOpen] =
    useState(false);
  const [testHistoryOpen, setTestHistoryOpen] = useState(false);
  const [testHistoryMountKey, setTestHistoryMountKey] = useState(0);

  const handleCategorySelect = (categoryId: string, sectionId?: string) => {
    if (!['general-science', 'arithmetic-reasoning', 'mathematics-knowledge'].includes(categoryId)) return;
    const cat = categoryId as ActiveCategory;
    setActiveCategory(cat);
    writeActiveCategory(cat);
    if (sectionId) {
      if (cat === 'mathematics-knowledge') {
        writeMkSection(sectionId);
        setActiveSection(sectionId);
      }
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    if (location.pathname !== '/') return;
    const hash = location.hash.slice(1);
    if (!hash) return;
    const cat = categoryFromHash(hash);
    if (!cat) return;

    const scrollTargetId = hash === 'arithmetic-reasoning' ? 'arithmetic-reasoning' : hash;
    queueMicrotask(() => {
      setActiveCategory(cat);
      writeActiveCategory(cat);
      if ((MATH_SECTION_IDS_FOR_HASH as readonly string[]).includes(hash)) {
        setActiveSection(hash);
        writeMkSection(hash);
      }
      setTimeout(() => {
        document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (activeCategory !== 'mathematics-knowledge') return;
    const handleScroll = () => {
      let current = '';
      for (const id of MATH_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = id;
        }
      }
      if (current) {
        setActiveSection(current);
        writeMkSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenMobileNav={() => setMobileNavOpen(true)}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4 lg:flex-row">
        <main className="min-w-0 flex-1 space-y-12 pb-24 lg:order-2 lg:w-3/4">
          {activeCategory === 'general-science' && (
            <GeneralScience visible={sectionMatchesSearch('general-science', searchTerm)} />
          )}
          {activeCategory === 'arithmetic-reasoning' && (
            <ArithmeticReasoning visible={sectionMatchesSearch('arithmetic-reasoning', searchTerm)} />
          )}
          {activeCategory === 'mathematics-knowledge' && (
            <>
              <Algebra visible={sectionMatchesSearch('algebra', searchTerm)} />
              <Geometry2D visible={sectionMatchesSearch('geometry-2d', searchTerm)} />
              <Geometry3D visible={sectionMatchesSearch('geometry-3d', searchTerm)} />
              <ExponentsRadicals visible={sectionMatchesSearch('exponents-radicals', searchTerm)} />
              <Factoring visible={sectionMatchesSearch('factoring', searchTerm)} />
              <ProbabilityStats visible={sectionMatchesSearch('probability-stats', searchTerm)} />
              <UnitsConversions visible={sectionMatchesSearch('units-conversions', searchTerm)} />
              <SpecialTopics visible={sectionMatchesSearch('special-topics', searchTerm)} />
            </>
          )}
        </main>

        <div className="hidden shrink-0 lg:order-1 lg:block lg:w-1/4">
          <Sidebar
            activeSection={activeSection}
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
            variant="desktop"
          />
        </div>
      </div>

      {mobileNavOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-dvh w-[min(100vw,22rem)] max-w-full shadow-2xl lg:hidden">
            <Sidebar
              activeSection={activeSection}
              activeCategory={activeCategory}
              onCategorySelect={handleCategorySelect}
              variant="drawer"
              onNavigate={() => setMobileNavOpen(false)}
              onCloseDrawer={() => setMobileNavOpen(false)}
            />
          </div>
        </>
      )}

      <PracticeMenu
        onGeneralScienceTest={() => setGeneralSciencePracticeOpen(true)}
        onArithmeticReasoningTest={() => setArithmeticReasoningPracticeOpen(true)}
        onWordKnowledgeTest={() => setWordKnowledgePracticeOpen(true)}
        onParagraphComprehensionTest={() => setParagraphComprehensionPracticeOpen(true)}
        onMathPracticeTest={() => setAsvabPracticeOpen(true)}
        onPracticeQuestion={() => setQuizOpen(true)}
        onTestHistory={() => {
          setTestHistoryMountKey((k) => k + 1);
          setTestHistoryOpen(true);
        }}
      />

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <TestHistoryModal
        key={testHistoryMountKey}
        isOpen={testHistoryOpen}
        onClose={() => setTestHistoryOpen(false)}
      />
      {asvabPracticeOpen && <AsvabPracticeTest onClose={() => setAsvabPracticeOpen(false)} />}
      {generalSciencePracticeOpen && (
        <GeneralScienceTestLauncher onClose={() => setGeneralSciencePracticeOpen(false)} />
      )}
      {arithmeticReasoningPracticeOpen && (
        <ArithmeticReasoningTestLauncher onClose={() => setArithmeticReasoningPracticeOpen(false)} />
      )}
      {wordKnowledgePracticeOpen && (
        <WordKnowledgeTestLauncher onClose={() => setWordKnowledgePracticeOpen(false)} />
      )}
      {paragraphComprehensionPracticeOpen && (
        <ParagraphComprehensionTestLauncher
          onClose={() => setParagraphComprehensionPracticeOpen(false)}
        />
      )}
    </div>
  );
}
