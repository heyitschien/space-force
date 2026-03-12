import { useState } from 'react';
import { FileText, History, Shuffle, TrendingUp, X } from 'lucide-react';
import {
  GeneralSciencePracticeTest,
  type GeneralScienceTestMode,
} from './GeneralSciencePracticeTest';
import { TestHistoryModal } from './TestHistoryModal';

interface GeneralScienceTestLauncherProps {
  onClose: () => void;
}

const MODES: { id: GeneralScienceTestMode; label: string; description: string }[] = [
  { id: 'adaptive', label: 'Adaptive (CAT-style)', description: 'Difficulty adjusts to you. Harder questions = more points.' },
  { id: 'practice-1', label: 'Practice Test 1', description: '25 questions from practice-1.pdf' },
  { id: 'practice-2', label: 'Practice Test 2', description: '25 questions from practice-2.pdf' },
  { id: 'practice-3', label: 'Practice Test 3', description: '25 questions from practice-3.pdf' },
  { id: 'mix', label: 'Mix', description: '25 random questions from all 3 tests' },
];

export function GeneralScienceTestLauncher({ onClose }: GeneralScienceTestLauncherProps) {
  const [selectedMode, setSelectedMode] = useState<GeneralScienceTestMode | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  if (selectedMode) {
    return (
      <GeneralSciencePracticeTest
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
          General Science Practice Test
        </h1>
        <p className="mb-6 text-slate-600">
          Choose a test mode. Each test has 25 questions and an 11-minute timer.
        </p>
        <button
          onClick={() => setHistoryOpen(true)}
          className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white py-3 font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700"
        >
          <History className="h-5 w-5" />
          Test History
        </button>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className="flex flex-col items-start gap-2 rounded-xl border-2 border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-indigo-400 hover:bg-indigo-50/50"
            >
              {mode.id === 'adaptive' ? (
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              ) : mode.id === 'mix' ? (
                <Shuffle className="h-8 w-8 text-indigo-600" />
              ) : (
                <FileText className="h-8 w-8 text-indigo-600" />
              )}
              <span className="text-lg font-bold text-slate-900">{mode.label}</span>
              <span className="text-sm text-slate-500">{mode.description}</span>
            </button>
          ))}
        </div>
      </div>
      <TestHistoryModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
}
