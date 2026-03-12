import { useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-950">
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-700 bg-slate-900/90 px-4 py-3 backdrop-blur">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Math Study
        </Link>
        <h1 className="text-lg font-bold text-white sm:text-xl">Solar System — ASVAB Astronomy Prep</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFactsGrid((s) => !s)}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-600"
          >
            {showFactsGrid ? 'Hide Facts' : 'Quick Facts'}
          </button>
          <button
            onClick={() => setGeneralScienceTestOpen(true)}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
          >
            General Science Test
          </button>
          <button
            onClick={() => setQuizOpen(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Quiz
          </button>
        </div>
      </header>

      {/* Full-screen 3D canvas */}
      <main className="relative min-h-0 flex-1">
        <SolarSystem3D
          onPlanetSelect={setSelectedId}
          selectedId={selectedId}
          fullScreen
          showLabels
        />
        <PlanetInfoPanel selectedId={selectedId} onClose={() => setSelectedId(null)} />
      </main>

      {/* Quick facts overlay */}
      {showFactsGrid && (
        <div className="absolute bottom-4 right-4 left-4 z-10 max-h-[40vh] overflow-y-auto rounded-xl border border-slate-600 bg-slate-900/95 p-4 shadow-2xl backdrop-blur sm:left-auto sm:right-6 sm:max-w-sm">
          <h3 className="mb-3 font-bold text-white">ASVAB Quick Facts</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {ASVAB_FACTS_CARDS.map((f) => (
              <div
                key={f.id}
                className="rounded-lg border border-slate-600 bg-slate-800/80 p-3"
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

      <p className="absolute bottom-2 left-0 right-0 z-10 text-center text-xs text-slate-500 pointer-events-none">
        Drag to rotate · Scroll to zoom · Click a planet for ASVAB facts
      </p>

      <AstronomyQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      {generalScienceTestOpen && (
        <GeneralScienceTestLauncher onClose={() => setGeneralScienceTestOpen(false)} />
      )}
    </div>
  );
}
