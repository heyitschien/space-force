import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AstronomyQuizModal } from '../AstronomyQuizModal';
import { GeneralScienceTestLauncher } from '../GeneralScienceTestLauncher';
import { SolarSystem3D } from '../diagrams/SolarSystem3D';
import { getFactById, ASVAB_FACTS_CARDS } from '../../data/planetFacts';
import type { CelestialId } from '../../data/planetFacts';

interface GeneralScienceProps {
  visible: boolean;
}

function PlanetInfo({ selectedId }: { selectedId: CelestialId | null }) {
  if (!selectedId) {
    return (
      <div className="max-w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-slate-500 sm:p-6">
        <p className="break-words text-sm">
          Click a planet or the asteroid belt in the 3D view to see ASVAB facts.
        </p>
      </div>
    );
  }

  const fact = getFactById(selectedId);
  if (!fact) return null;

  return (
    <div
      className="max-w-full min-w-0 rounded-xl border-2 border-indigo-200 bg-white p-4 shadow-sm sm:p-6"
      style={{ borderLeft: `4px solid ${fact.color}` }}
    >
      <h3 className="break-words text-xl font-bold text-slate-800">{fact.name}</h3>
      <p className="mt-2 break-words text-slate-700">{fact.fact}</p>
      {fact.memoryAnchor && (
        <p className="mt-3 break-words text-sm font-medium text-indigo-600">{fact.memoryAnchor}</p>
      )}
    </div>
  );
}

export function GeneralScience({ visible }: GeneralScienceProps) {
  const [selectedId, setSelectedId] = useState<CelestialId | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);

  if (!visible) return null;

  return (
    <section id="general-science" className="min-w-0 max-w-full scroll-mt-24 overflow-x-hidden">
      <div className="mb-4 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="mb-2 border-b-2 border-indigo-200 pb-2 text-2xl font-bold text-indigo-800">
            General Science
          </h2>
          <p className="text-slate-600">
            Explore astronomy, biology, chemistry, and Earth science for ASVAB General Science. Click to learn key facts.
          </p>
        </div>
        <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl lg:shrink-0">
          <Link
            to="/astronomy"
            className="rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 sm:text-base"
          >
            Astronomy →
          </Link>
          <Link
            to="/biology"
            className="rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-700 sm:text-base"
          >
            Biology →
          </Link>
          <Link
            to="/chemistry"
            className="rounded-xl bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-sky-700 sm:text-base"
          >
            Chemistry →
          </Link>
          <Link
            to="/earth-science"
            className="rounded-xl bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-amber-500 sm:text-base"
          >
            Earth Science →
          </Link>
          <Link
            to="/measurement-physics"
            className="col-span-1 rounded-xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold leading-snug text-white shadow-md transition-colors hover:bg-violet-500 sm:col-span-2 sm:text-base"
          >
            Measurement &amp; Physics →
          </Link>
        </div>
      </div>

      <div className="mb-8 grid min-h-0 min-w-0 max-w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <div className="min-h-0 min-w-0 max-w-full overflow-hidden">
          <SolarSystem3D onPlanetSelect={setSelectedId} selectedId={selectedId} showLabels />
        </div>
        <div className="flex min-w-0 max-w-full flex-col gap-4">
          <h3 className="text-lg font-semibold text-slate-700">Selected: ASVAB Fact</h3>
          <PlanetInfo selectedId={selectedId} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold text-slate-800">ASVAB Quick Facts</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ASVAB_FACTS_CARDS.map((f) => (
            <div
              key={f.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              style={{ borderLeft: `4px solid ${f.color}` }}
            >
              <h4 className="font-bold text-slate-800">{f.name}</h4>
              <p className="mt-1 text-sm text-slate-600">{f.fact}</p>
              {f.memoryAnchor && (
                <p className="mt-2 text-xs font-medium text-indigo-600">{f.memoryAnchor}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setQuizOpen(true)}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-indigo-700"
        >
          Test Your Astronomy Knowledge
        </button>
        <button
          onClick={() => setPracticeTestOpen(true)}
          className="rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-amber-500"
        >
          General Science Practice Test (25 Q, 11 min)
        </button>
      </div>

      <AstronomyQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      {practiceTestOpen && (
        <GeneralScienceTestLauncher onClose={() => setPracticeTestOpen(false)} />
      )}
    </section>
  );
}
