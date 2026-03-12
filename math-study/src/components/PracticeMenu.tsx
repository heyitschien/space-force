import { useRef, useEffect, useState } from 'react';
import { ClipboardList, History, Lightbulb, FileText } from 'lucide-react';

interface PracticeMenuProps {
  onGeneralScienceTest: () => void;
  onMathPracticeTest: () => void;
  onPracticeQuestion: () => void;
  onTestHistory: () => void;
}

export function PracticeMenu({
  onGeneralScienceTest,
  onMathPracticeTest,
  onPracticeQuestion,
  onTestHistory,
}: PracticeMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className="fixed bottom-8 right-8 z-40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-4 text-white shadow-2xl transition-all hover:bg-indigo-500 hover:scale-105 focus:ring-4 focus:ring-indigo-300"
      >
        <ClipboardList className="h-6 w-6" />
        <span className="font-bold">Practice</span>
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Practice Options
            </p>
          </div>
          <div className="p-2">
            <button
              onClick={() => {
                onGeneralScienceTest();
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-amber-50"
            >
              <div className="rounded-lg bg-amber-100 p-2">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">General Science Test</p>
                <p className="text-xs text-slate-500">25 questions, 11 min</p>
              </div>
            </button>
            <button
              onClick={() => {
                onMathPracticeTest();
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-slate-50"
            >
              <div className="rounded-lg bg-slate-100 p-2">
                <FileText className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Math Practice Test</p>
                <p className="text-xs text-slate-500">Arithmetic & Math Knowledge</p>
              </div>
            </button>
            <button
              onClick={() => {
                onPracticeQuestion();
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50"
            >
              <div className="rounded-lg bg-blue-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Practice Question</p>
                <p className="text-xs text-slate-500">Quick quiz</p>
              </div>
            </button>
            <button
              onClick={() => {
                onTestHistory();
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-slate-50"
            >
              <div className="rounded-lg bg-slate-100 p-2">
                <History className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Test History</p>
                <p className="text-xs text-slate-500">View past results</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
