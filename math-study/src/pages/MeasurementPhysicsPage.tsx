import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MeasurementPhysicsQuizModal } from '../components/MeasurementPhysicsQuizModal';
import { GeneralScienceTestLauncher } from '../components/GeneralScienceTestLauncher';
import { MeasurementPhysicsRecallDrill } from '../components/MeasurementPhysicsRecallDrill';
import { MeasurementPhysicsTrapChecklist } from '../components/MeasurementPhysicsTrapChecklist';
import { MetricConversionDiagram } from '../components/diagrams/MetricConversionDiagram';
import { TemperatureScaleDiagram } from '../components/diagrams/TemperatureScaleDiagram';
import { LightConstantsDiagram } from '../components/diagrams/LightConstantsDiagram';
import { MotionConceptsDiagram } from '../components/diagrams/MotionConceptsDiagram';
import { EnergyPowerDiagram } from '../components/diagrams/EnergyPowerDiagram';
import {
  MEASUREMENT_PHYSICS_FACTS_CARDS,
  getMeasurementPhysicsFactById,
} from '../data/measurementPhysicsFacts';
import type { MeasurementPhysicsTopicId } from '../data/measurementPhysicsFacts';

const TABS = [
  { id: 'metrics', label: 'Metric Conversion', section: 'metrics' as const },
  { id: 'temperature', label: 'Temperature', section: 'temperature' as const },
  { id: 'light', label: 'Light', section: 'light' as const },
  { id: 'motion', label: 'Motion & Newton', section: 'motion' as const },
  { id: 'energy', label: 'Energy & Power', section: 'energy' as const },
] as const;

const TAB_TOPIC_IDS: Record<
  (typeof TABS)[number]['id'],
  MeasurementPhysicsTopicId[]
> = {
  metrics: ['meter-cm', 'kilometer'],
  temperature: ['celsius-boiling', 'celsius-freezing', 'melting-point', 'boiling-point'],
  light: ['speed-of-light', 'light-year', 'quantum'],
  motion: ['velocity', 'speed', 'newton-first', 'newton-second', 'newton-third'],
  energy: ['energy', 'power'],
};

function MeasurementPhysicsFactInfoPanel({
  selectedId,
  onClose,
}: {
  selectedId: MeasurementPhysicsTopicId | null;
  onClose: () => void;
}) {
  if (!selectedId) return null;
  const fact = getMeasurementPhysicsFactById(selectedId);
  if (!fact) return null;

  return (
    <div
      className="absolute bottom-4 left-4 right-4 z-20 max-w-md rounded-xl border-2 border-indigo-300 bg-white/95 p-6 shadow-2xl backdrop-blur sm:left-6 sm:right-auto"
      style={{ borderLeft: `6px solid ${fact.color}` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{fact.name}</h3>
          <p className="mt-2 text-slate-700">
            <span className="font-medium text-slate-600">Definition: </span>
            {fact.fact}
          </p>
          {fact.contrast && (
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium">Contrast: </span>
              {fact.contrast}
            </p>
          )}
          {fact.example && (
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium">Example: </span>
              {fact.example}
            </p>
          )}
          {fact.memoryAnchor && (
            <p className="mt-3 text-sm font-medium text-indigo-700">
              Memory anchor: {fact.memoryAnchor}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      </div>
    </div>
  );
}

const TAB_CONTRASTS: Record<
  (typeof TABS)[number]['id'],
  Array<{ label: string; topicId: MeasurementPhysicsTopicId }>
> = {
  metrics: [
    { label: '1 m = 100 cm', topicId: 'meter-cm' },
    { label: '1 km = 1000 m', topicId: 'kilometer' },
  ],
  temperature: [
    { label: 'Boiling = 100°C', topicId: 'celsius-boiling' },
    { label: 'Melting = solid-liquid', topicId: 'melting-point' },
  ],
  light: [
    { label: 'Speed of light ~186,000 mi/s', topicId: 'speed-of-light' },
    { label: 'Light-year = distance', topicId: 'light-year' },
  ],
  motion: [
    { label: 'Velocity vs speed', topicId: 'velocity' },
    { label: 'Newton 2nd: F = ma', topicId: 'newton-second' },
  ],
  energy: [
    { label: 'Energy = ability to do work', topicId: 'energy' },
    { label: 'Power = watts', topicId: 'power' },
  ],
};

function ContrastStrip({
  activeTab,
  onSelectTopic,
}: {
  activeTab: (typeof TABS)[number]['id'];
  onSelectTopic: (topicId: MeasurementPhysicsTopicId) => void;
}) {
  const contrasts = TAB_CONTRASTS[activeTab];

  return (
    <div className="mx-auto mt-4 flex max-w-4xl flex-wrap gap-2">
      {contrasts.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelectTopic(item.topicId)}
          className="rounded-full border border-indigo-300 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800 transition-colors hover:bg-indigo-100"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function MeasurementPhysicsPage() {
  const [selectedId, setSelectedId] = useState<MeasurementPhysicsTopicId | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [drillOpen, setDrillOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [showFactsGrid, setShowFactsGrid] = useState(false);
  const [generalScienceTestOpen, setGeneralScienceTestOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('metrics');
  const activeTabTopicIds = TAB_TOPIC_IDS[activeTab];
  const scopedSelectedId = useMemo(
    () =>
      selectedId && activeTabTopicIds.includes(selectedId) ? selectedId : null,
    [activeTabTopicIds, selectedId]
  );

  useEffect(() => {
    if (selectedId && !activeTabTopicIds.includes(selectedId)) {
      setSelectedId(null);
    }
  }, [activeTabTopicIds, selectedId]);

  const renderDiagram = () => {
    switch (activeTab) {
      case 'metrics':
        return (
          <MetricConversionDiagram
            onSelect={setSelectedId}
            selectedId={scopedSelectedId}
          />
        );
      case 'temperature':
        return (
          <TemperatureScaleDiagram
            onSelect={setSelectedId}
            selectedId={scopedSelectedId}
          />
        );
      case 'light':
        return (
          <LightConstantsDiagram
            onSelect={setSelectedId}
            selectedId={scopedSelectedId}
          />
        );
      case 'motion':
        return (
          <MotionConceptsDiagram
            onSelect={setSelectedId}
            selectedId={scopedSelectedId}
          />
        );
      case 'energy':
        return (
          <EnergyPowerDiagram
            onSelect={setSelectedId}
            selectedId={scopedSelectedId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-950">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-700 bg-slate-900/90 px-4 py-3 backdrop-blur">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Math Study
        </Link>
        <h1 className="text-lg font-bold text-white sm:text-xl">
          Measurement & Physics — ASVAB Prep
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowFactsGrid((s) => !s)}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-600"
          >
            {showFactsGrid ? 'Hide Facts' : 'Quick Facts'}
          </button>
          <button
            onClick={() => setDrillOpen(true)}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-600"
          >
            60s Drill
          </button>
          <button
            onClick={() => setChecklistOpen(true)}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-600"
          >
            Trap Checklist
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

      <div className="flex shrink-0 gap-1 border-b border-slate-700 bg-slate-900/50 px-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-indigo-500 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <main className="relative min-h-0 flex-1 overflow-auto bg-slate-900 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-slate-600 bg-white p-6">
            {renderDiagram()}
          </div>
        </div>
        <ContrastStrip activeTab={activeTab} onSelectTopic={setSelectedId} />
        <MeasurementPhysicsFactInfoPanel
          selectedId={scopedSelectedId}
          onClose={() => setSelectedId(null)}
        />
      </main>

      {showFactsGrid && (
        <div className="absolute bottom-4 left-4 right-4 z-10 max-h-[40vh] overflow-y-auto rounded-xl border border-slate-600 bg-slate-900/95 p-4 shadow-2xl backdrop-blur sm:left-auto sm:right-6 sm:max-w-sm">
          <h3 className="mb-3 font-bold text-white">ASVAB Quick Facts</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {MEASUREMENT_PHYSICS_FACTS_CARDS.map((fact) => (
              <div
                key={fact.id}
                className="rounded-lg border border-slate-600 bg-slate-800/80 p-3"
                style={{ borderLeft: `4px solid ${fact.color}` }}
              >
                <h4 className="font-bold text-white">{fact.name}</h4>
                <p className="mt-1 text-sm text-slate-300">{fact.fact}</p>
                {fact.memoryAnchor && (
                  <p className="mt-2 text-xs font-medium text-indigo-300">
                    {fact.memoryAnchor}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="pointer-events-none absolute bottom-2 left-0 right-0 z-10 text-center text-xs text-slate-500">
        Click diagram regions to learn ASVAB facts
      </p>

      {generalScienceTestOpen && (
        <GeneralScienceTestLauncher onClose={() => setGeneralScienceTestOpen(false)} />
      )}
      <MeasurementPhysicsQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
      />
      <MeasurementPhysicsRecallDrill
        isOpen={drillOpen}
        onClose={() => setDrillOpen(false)}
      />
      <MeasurementPhysicsTrapChecklist
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
      />
    </div>
  );
}
