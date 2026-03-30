import { useState } from 'react';
import { FileText, History, Shuffle, TrendingUp, X } from 'lucide-react';
import type { ParagraphComprehensionTestMode } from '../utils/testResults';
import { ParagraphComprehensionPracticeTest } from './ParagraphComprehensionPracticeTest';
import { TestHistoryModal } from './TestHistoryModal';

interface ParagraphComprehensionTestLauncherProps {
  onClose: () => void;
}

const MODES: { id: ParagraphComprehensionTestMode; label: string; description: string }[] = [
  {
    id: 'adaptive',
    label: 'Adaptive (CAT-style)',
    description: 'Difficulty adjusts to you. Harder questions = more points.',
  },
  {
    id: 'practice-1',
    label: 'Practice Test 1',
    description: '15 questions from practice-1.pdf',
  },
  {
    id: 'practice-2',
    label: 'Practice Test 2',
    description: '15 questions from practice-2.pdf',
  },
  {
    id: 'practice-3',
    label: 'Practice Test 3',
    description: '15 questions from practice-3.pdf (same Wiley PC set as Test 1)',
  },
  {
    id: 'mix',
    label: 'Mix',
    description: '15 random questions from all 3 tests',
  },
];

export function ParagraphComprehensionTestLauncher({
  onClose,
}: ParagraphComprehensionTestLauncherProps) {
  const [selectedMode, setSelectedMode] = useState<ParagraphComprehensionTestMode | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  if (selectedMode) {
    return (
      <ParagraphComprehensionPracticeTest
        onClose={() => {
          setSelectedMode(null);
          onClose();
        }}
        mode={selectedMode}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50 p-4 md:p-8 font-sans">
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow-lg hover:text-slate-900"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Paragraph Comprehension Practice Test
        </h1>
        <p className="mb-6 text-slate-600">
          Choose a test mode. Each run has 15 questions and a 13-minute timer.
        </p>
        <button
          onClick={() => setHistoryOpen(true)}
          className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white py-3 font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-800"
        >
          <History className="h-5 w-5" />
          Test History
        </button>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setSelectedMode(mode.id)}
              className="flex flex-col items-start gap-2 rounded-xl border-2 border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50/50"
            >
              {mode.id === 'adaptive' ? (
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              ) : mode.id === 'mix' ? (
                <Shuffle className="h-8 w-8 text-emerald-600" />
              ) : (
                <FileText className="h-8 w-8 text-emerald-600" />
              )}
              <span className="text-lg font-bold text-slate-900">{mode.label}</span>
              <span className="text-sm text-slate-500">{mode.description}</span>
            </button>
          ))}
        </div>
      </div>
      <TestHistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        section="paragraph-comprehension"
      />
    </div>
  );
}
