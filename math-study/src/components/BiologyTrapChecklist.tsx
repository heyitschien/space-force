import { useState } from 'react';
import { TRAP_CHECKLIST_ITEMS } from '../data/biologyFacts';

interface BiologyTrapChecklistProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BiologyTrapChecklist({
  isOpen,
  onClose,
}: BiologyTrapChecklistProps) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l18 18"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-slate-800">
          Trap-Answer Checklist
        </h2>
        <p className="mt-2 text-slate-600">
          Tap each pair to reveal the distinction. Check off when you know it.
        </p>

        <div className="mt-6 space-y-4">
          {TRAP_CHECKLIST_ITEMS.map((item) => {
            const isRevealed = revealedIds.has(item.id);
            const isChecked = checkedIds.has(item.id);

            return (
              <div
                key={item.id}
                className={`rounded-xl border-2 p-4 transition-all ${
                  isChecked
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleCheck(item.id)}
                    className="mt-1 shrink-0 rounded border-2 border-slate-300 bg-white p-1 focus:ring-2 focus:ring-emerald-400"
                    aria-label={isChecked ? 'Uncheck' : 'Check'}
                  >
                    {isChecked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="block h-5 w-5" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => toggleReveal(item.id)}
                      className="w-full text-left font-medium text-slate-800 hover:text-emerald-700"
                    >
                      {item.pair}
                    </button>
                    {isRevealed && (
                      <p className="mt-2 text-sm text-slate-600">
                        {item.distinction}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
