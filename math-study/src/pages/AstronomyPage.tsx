import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { AstronomyQuizModal } from '../components/AstronomyQuizModal';
import { GeneralScienceTestLauncher } from '../components/GeneralScienceTestLauncher';
import { SolarSystem3D } from '../components/diagrams/SolarSystem3D';
import { getFactById, ASVAB_FACTS_CARDS } from '../data/planetFacts';
import type { CelestialId } from '../data/planetFacts';

function PlanetInfoPanel({ selectedId, onClose }: { selectedId: CelestialId | null; onClose: () => void }) {
  if (!selectedId) return null;

  const fact = getFactById(selectedId);
  if (!fact) return null;

  return (
    <div
      className="absolute bottom-4 left-4 right-4 z-20 max-w-md rounded-xl border-2 border-indigo-300 bg-white/95 p-6 shadow-2xl backdrop-blur sm:left-6 sm:right-auto"
      style={{ borderLeft: `6px solid ${fact.color}` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{fact.name}</h3>
          <p className="mt-2 text-slate-700">{fact.fact}</p>
          {fact.memoryAnchor && (
            <p className="mt-3 text-sm font-medium text-indigo-600">{fact.memoryAnchor}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function AstronomyPage() {
  const [selectedId, setSelectedId] = useState<CelestialId | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [showFactsGrid, setShowFactsGrid] = useState(false);
  const [generalScienceTestOpen, setGeneralScienceTestOpen] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const mobileActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileActionsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (mobileActionsRef.current && !mobileActionsRef.current.contains(e.target as Node)) {
        setMobileActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [mobileActionsOpen]);

  return (
    <div className="fixed inset-0 flex min-h-0 h-dvh flex-col bg-slate-950">
      <header className="flex shrink-0 flex-col gap-2 border-b border-slate-700 bg-slate-900/90 px-3 py-2 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white sm:px-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden text-sm font-medium sm:inline">Back to Math Study</span>
          </Link>
          <h1 className="min-w-0 flex-1 text-sm font-bold leading-tight text-white sm:flex-none sm:text-lg md:text-xl">
            <span className="line-clamp-2 sm:truncate sm:whitespace-nowrap">Solar System — ASVAB Astronomy Prep</span>
          </h1>
        </div>

        <div className="flex items-center justify-end gap-2 sm:shrink-0">
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setShowFactsGrid((s) => !s)}
              className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-600 md:px-4"
            >
              {showFactsGrid ? 'Hide Facts' : 'Quick Facts'}
            </button>
            <button
              type="button"
              onClick={() => setGeneralScienceTestOpen(true)}
              className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500 md:px-4"
            >
              General Science Test
            </button>
            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 md:px-4"
            >
              Quiz
            </button>
          </div>

          <div className="relative sm:hidden" ref={mobileActionsRef}>
            <button
              type="button"
              onClick={() => setMobileActionsOpen((o) => !o)}
              className="rounded-lg bg-slate-700 p-2 text-white hover:bg-slate-600"
              aria-haspopup="true"
              aria-controls="astronomy-header-more"
              aria-label="More actions"
            >
              <MoreHorizontal className="h-6 w-6" />
            </button>
            {mobileActionsOpen && (
              <div
                id="astronomy-header-more"
                className="absolute right-0 top-full z-30 mt-1 min-w-[12rem] overflow-hidden rounded-lg border border-slate-600 bg-slate-900 py-1 shadow-xl"
              >
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm font-medium text-white hover:bg-slate-800"
                  onClick={() => {
                    setShowFactsGrid((s) => !s);
                    setMobileActionsOpen(false);
                  }}
                >
                  {showFactsGrid ? 'Hide Quick Facts' : 'Quick Facts'}
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm font-medium text-white hover:bg-slate-800"
                  onClick={() => {
                    setGeneralScienceTestOpen(true);
                    setMobileActionsOpen(false);
                  }}
                >
                  General Science Test
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm font-medium text-white hover:bg-slate-800"
                  onClick={() => {
                    setQuizOpen(true);
                    setMobileActionsOpen(false);
                  }}
                >
                  Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative min-h-0 flex-1">
        <SolarSystem3D
          onPlanetSelect={setSelectedId}
          selectedId={selectedId}
          fullScreen
          showLabels
        />
        <PlanetInfoPanel selectedId={selectedId} onClose={() => setSelectedId(null)} />

        {showFactsGrid && (
          <div className="absolute bottom-16 left-3 right-3 z-10 max-h-[min(40vh,320px)] overflow-y-auto rounded-xl border border-slate-600 bg-slate-900/95 p-3 shadow-2xl backdrop-blur sm:bottom-20 sm:left-auto sm:right-4 sm:max-w-sm sm:p-4">
            <h3 className="mb-2 font-bold text-white sm:mb-3">ASVAB Quick Facts</h3>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
              {ASVAB_FACTS_CARDS.map((f) => (
                <div
                  key={f.id}
                  className="rounded-lg border border-slate-600 bg-slate-800/80 p-2 sm:p-3"
                  style={{ borderLeft: `4px solid ${f.color}` }}
                >
                  <h4 className="font-bold text-white">{f.name}</h4>
                  <p className="mt-1 text-sm text-slate-300">{f.fact}</p>
                  {f.memoryAnchor && (
                    <p className="mt-2 text-xs font-medium text-indigo-400">{f.memoryAnchor}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="pointer-events-none absolute bottom-2 left-0 right-0 z-10 text-center text-[10px] text-slate-500 sm:text-xs">
          Drag to rotate · Scroll to zoom · Click a planet for ASVAB facts
        </p>
      </main>

      <AstronomyQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      {generalScienceTestOpen && (
        <GeneralScienceTestLauncher onClose={() => setGeneralScienceTestOpen(false)} />
      )}
    </div>
  );
}
