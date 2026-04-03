import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, CloudUpload, X } from 'lucide-react';
import {
  getResults,
  getArResults,
  getWkResults,
  getPcResults,
  getMathEnduranceResults,
  isTestHistoryCloudSyncConfigured,
  syncAllLocalAttemptsToServer,
  type QuestionAttemptDetail,
} from '../utils/testResults';
import {
  lookupQuestionForHistory,
  optionText,
  type HistoryLookupSection,
} from '../utils/testHistoryLookup';

export type TestHistorySection = HistoryLookupSection;

interface TestHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Opens with this tab selected (e.g. section launcher). */
  initialSection?: TestHistorySection;
}

interface UnifiedResult {
  id: string;
  date: string;
  mode: string;
  percentage: number;
  timeUsedSeconds: number;
  score: number;
  total: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
  attemptDetails?: QuestionAttemptDetail[];
  weightedScore?: number;
  maxWeightedScore?: number;
}

interface WrongDetailRow {
  questionId: string;
  selected?: QuestionAttemptDetail['selected'];
  correct?: QuestionAttemptDetail['correct'];
}

const TABS: { section: TestHistorySection; label: string; accent: string }[] = [
  { section: 'general-science', label: 'General Science', accent: 'text-amber-700 border-amber-300' },
  { section: 'arithmetic-reasoning', label: 'Arithmetic Reasoning', accent: 'text-rose-700 border-rose-300' },
  { section: 'word-knowledge', label: 'Word Knowledge', accent: 'text-violet-700 border-violet-300' },
  { section: 'paragraph-comprehension', label: 'Paragraph Comprehension', accent: 'text-emerald-700 border-emerald-300' },
  { section: 'math-endurance', label: 'Math Practice (Phase 0)', accent: 'text-slate-800 border-slate-400' },
];

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

function formatModeLabel(mode: string): string {
  if (mode === 'mix') return 'Mix';
  if (mode === 'adaptive') return 'Adaptive';
  if (mode === 'phase-0') return 'Phase 0 endurance';
  return `Practice Test ${mode.replace('practice-', '')}`;
}

function loadResultsForSection(section: TestHistorySection): UnifiedResult[] {
  switch (section) {
    case 'general-science':
      return getResults().map((r) => ({ ...r, mode: r.mode }));
    case 'arithmetic-reasoning':
      return getArResults().map((r) => ({ ...r, mode: r.mode }));
    case 'word-knowledge':
      return getWkResults().map((r) => ({ ...r, mode: r.mode }));
    case 'paragraph-comprehension':
      return getPcResults().map((r) => ({ ...r, mode: r.mode }));
    case 'math-endurance':
      return getMathEnduranceResults().map((r) => ({ ...r, mode: r.mode }));
    default:
      return [];
  }
}

function scoreColorClass(section: TestHistorySection): string {
  if (section === 'word-knowledge') return 'text-violet-600';
  if (section === 'paragraph-comprehension') return 'text-emerald-600';
  if (section === 'math-endurance') return 'text-slate-800';
  if (section === 'arithmetic-reasoning') return 'text-rose-600';
  return 'text-indigo-600';
}

export function TestHistoryModal({ isOpen, onClose, initialSection }: TestHistoryModalProps) {
  const [activeSection, setActiveSection] = useState<TestHistorySection>(
    () => initialSection ?? 'general-science'
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [syncBusy, setSyncBusy] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const results = loadResultsForSection(activeSection);
  const pctClass = scoreColorClass(activeSection);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl md:max-w-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-6">
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">Test History</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-white px-2 pt-2">
          <div className="flex gap-1 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map(({ section, label, accent }) => (
              <button
                key={section}
                type="button"
                onClick={() => {
                  setActiveSection(section);
                  setExpandedId(null);
                }}
                className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors md:px-3 md:text-sm ${
                  activeSection === section
                    ? `border-slate-800 bg-slate-900 text-white`
                    : `border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 ${accent.split(' ')[0]}`
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[min(65vh,32rem)] overflow-y-auto p-4 md:p-6">
          {results.length === 0 ? (
            <p className="text-center text-slate-500">No test results yet for this section.</p>
          ) : (
            <p className="mb-3 text-center text-xs text-slate-500">
              Showing up to 50 most recent attempts per section (stored on this device).
            </p>
          )}
          <ul className="space-y-3">
            {results.map((r) => {
              const expanded = expandedId === r.id;
              const wrongDetails: WrongDetailRow[] =
                r.attemptDetails && r.attemptDetails.length > 0
                  ? r.attemptDetails.filter((a) => a.selected !== a.correct)
                  : r.missedQuestionIds.map((questionId) => ({ questionId }));

              return (
                <li
                  key={r.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(r.id)}
                    className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-slate-100/80"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-2">
                      {expanded ? (
                        <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                      ) : (
                        <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800">{formatDate(r.date)}</p>
                        <p className="text-sm text-slate-500">{formatModeLabel(r.mode)}</p>
                        {r.timeExpired && (
                          <p className="text-xs font-medium text-amber-700">Over reference pace</p>
                        )}
                        {r.maxWeightedScore != null && r.weightedScore != null && (
                          <p className="text-xs text-slate-600">
                            Weighted: {r.weightedScore} / {r.maxWeightedScore} pts
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-black ${pctClass}`}>{r.percentage}%</span>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        {formatTime(r.timeUsedSeconds)}
                      </div>
                    </div>
                  </button>

                  {expanded && (
                    <div className="space-y-4 border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        Score {r.score} / {r.total} · {r.missedQuestionIds.length} missed
                      </p>
                      {wrongDetails.length === 0 ? (
                        <p className="text-sm text-emerald-700">No missed questions — perfect run.</p>
                      ) : (
                        <ul className="space-y-4">
                          {wrongDetails.map((detail, idx) => {
                            const selected = detail.selected;
                            const correctLetter = detail.correct;
                            const q = lookupQuestionForHistory(activeSection, detail.questionId);
                            const displayCorrect = correctLetter ?? q?.correct;

                            return (
                              <li
                                key={`${r.id}-miss-${detail.questionId}-${idx}`}
                                className="rounded-lg border border-slate-200 bg-slate-50/80 p-3"
                              >
                                {q?.subsection && (
                                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {q.subsection}
                                  </p>
                                )}
                                {q?.passage && (
                                  <p className="mb-2 text-xs leading-relaxed text-slate-600 italic">
                                    {q.passage}
                                  </p>
                                )}
                                <p className="mb-2 text-sm font-semibold text-slate-900">
                                  {q?.text ?? `Question ID: ${detail.questionId}`}
                                </p>
                                <div className="space-y-1 text-sm text-slate-700">
                                  <p>
                                    <span className="font-medium text-red-700">Your answer:</span>{' '}
                                    {selected != null ? optionText(q, selected) : '(not saved for this attempt)'}
                                  </p>
                                  <p>
                                    <span className="font-medium text-emerald-800">Correct:</span>{' '}
                                    {displayCorrect != null ? optionText(q, displayCorrect) : '—'}
                                  </p>
                                </div>
                                {q?.explanation && (
                                  <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-600">
                                    {q.explanation}
                                  </p>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 md:px-6">
          {!isTestHistoryCloudSyncConfigured() ? (
            <p className="text-center text-xs text-slate-500">
              Cloud backup is off. Set <span className="font-mono">VITE_TEST_HISTORY_API_URL</span> (and
              matching API key if required), run <span className="font-mono">npm run dev:vercel</span> on
              port 3000 beside <span className="font-mono">npm run dev</span>, then reload.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled={syncBusy}
                onClick={async () => {
                  setSyncBusy(true);
                  setSyncMessage(null);
                  const { configured, pushed, failed, errors } = await syncAllLocalAttemptsToServer();
                  setSyncBusy(false);
                  if (!configured) {
                    setSyncMessage('Sync URL is not configured.');
                    return;
                  }
                  if (failed === 0) {
                    setSyncMessage(`Uploaded ${pushed} attempt(s) to Neon (duplicates skipped on server).`);
                  } else {
                    setSyncMessage(
                      `Uploaded ${pushed}, failed ${failed}. ${errors.slice(0, 3).join(' ')}${errors.length > 3 ? '…' : ''}`
                    );
                  }
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-100 disabled:opacity-60"
              >
                <CloudUpload className="h-4 w-4" />
                {syncBusy ? 'Uploading…' : 'Upload all on-device attempts to Neon'}
              </button>
              {syncMessage && (
                <p className="text-center text-xs text-slate-600">{syncMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
