import { Clock, X } from 'lucide-react';
import { getResults, getArResults } from '../utils/testResults';

type TestHistorySection = 'general-science' | 'arithmetic-reasoning';

interface TestHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  section?: TestHistorySection;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function TestHistoryModal({ isOpen, onClose, section = 'general-science' }: TestHistoryModalProps) {
  if (!isOpen) return null;

  const results = section === 'arithmetic-reasoning' ? getArResults() : getResults();
  const sectionLabel = section === 'arithmetic-reasoning' ? 'Arithmetic Reasoning' : 'General Science';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-900">{sectionLabel} Test History</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {results.length === 0 ? (
            <p className="text-center text-slate-500">No test results yet.</p>
          ) : (
            <ul className="space-y-3">
              {results.map((r) => (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{formatDate(r.date)}</p>
                    <p className="text-sm text-slate-500">
                      {r.mode === 'mix' ? 'Mix' : `Practice Test ${r.mode.replace('practice-', '')}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-indigo-600">{r.percentage}%</span>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      {formatTime(r.timeUsedSeconds)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
