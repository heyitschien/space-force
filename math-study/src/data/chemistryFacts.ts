export type ChemistryTopicId =
  | 'atom'
  | 'nucleus'
  | 'proton'
  | 'neutron'
  | 'electron'
  | 'atomic-number'
  | 'element'
  | 'molecule'
  | 'compound'
  | 'mixture'
  | 'oxidation'
  | 'acids'
  | 'chlorophyll';

export interface ChemistryFact {
  id: ChemistryTopicId;
  name: string;
  fact: string;
  contrast?: string;
  example?: string;
  memoryAnchor?: string;
  color: string;
  section: 'atomic' | 'matter' | 'processes';
}

export interface ChemistryQuizQuestion {
  id: string;
  topicId: ChemistryTopicId;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  distractorTip?: string;
  memoryAnchor?: string;
}

export const CHEMISTRY_FACTS: ChemistryFact[] = [
  {
    id: 'atom',
    name: 'Atom',
    fact: 'Smallest part of an element that still behaves like that element.',
    contrast: 'Atom is smaller than molecule and compound.',
    example: 'One oxygen atom is still oxygen.',
    memoryAnchor: 'Atom = smallest element unit.',
    color: '#38bdf8',
    section: 'atomic',
  },
  {
    id: 'nucleus',
    name: 'Nucleus',
    fact: 'Dense center of the atom containing protons and neutrons.',
    contrast: 'Electrons are outside the nucleus in shells/orbitals.',
    example: 'Atomic number depends on protons in the nucleus.',
    memoryAnchor: 'Nucleus = center core.',
    color: '#0ea5e9',
    section: 'atomic',
  },
  {
    id: 'proton',
    name: 'Proton',
    fact: 'Positively charged particle in the nucleus.',
    contrast: 'Electron is negative and outside the nucleus.',
    example: 'Hydrogen has 1 proton.',
    memoryAnchor: 'Proton = positive.',
    color: '#f97316',
    section: 'atomic',
  },
  {
    id: 'neutron',
    name: 'Neutron',
    fact: 'Neutral particle in the nucleus.',
    contrast: 'Protons are positive, electrons are negative.',
    example: 'Carbon-12 has 6 neutrons.',
    memoryAnchor: 'Neutron = neutral.',
    color: '#94a3b8',
    section: 'atomic',
  },
  {
    id: 'electron',
    name: 'Electron',
    fact: 'Negatively charged particle around the nucleus.',
    contrast: 'Atomic number is based on protons, not electrons.',
    example: 'Electrons can move in reactions and electricity.',
    memoryAnchor: 'Electron = negative.',
    color: '#6366f1',
    section: 'atomic',
  },
  {
    id: 'atomic-number',
    name: 'Atomic Number',
    fact: 'Number of protons in an atom’s nucleus.',
    contrast: 'Not number of electrons or neutrons.',
    example: 'Atomic number 8 means oxygen.',
    memoryAnchor: 'Atomic number = protons.',
    color: '#2563eb',
    section: 'atomic',
  },
  {
    id: 'element',
    name: 'Element',
    fact: 'Pure substance made of one type of atom.',
    contrast: 'Compound has two or more different elements bonded.',
    example: 'Gold is an element.',
    memoryAnchor: 'Element = one atom type.',
    color: '#14b8a6',
    section: 'matter',
  },
  {
    id: 'molecule',
    name: 'Molecule',
    fact: 'Two or more atoms chemically bonded together.',
    contrast: 'Mixture is physical blending, not chemical bonding.',
    example: 'O2 is a molecule.',
    memoryAnchor: 'Molecule = bonded atoms.',
    color: '#10b981',
    section: 'matter',
  },
  {
    id: 'compound',
    name: 'Compound',
    fact: 'Substance made of two or more different elements chemically bonded.',
    contrast: 'Element is one type; mixture is not chemically bonded.',
    example: 'Water (H2O) is a compound.',
    memoryAnchor: 'Compound = different elements bonded.',
    color: '#22c55e',
    section: 'matter',
  },
  {
    id: 'mixture',
    name: 'Mixture',
    fact: 'Physical combination of substances with no new chemical bonds.',
    contrast: 'Compound forms chemical bonds; mixture does not.',
    example: 'Saltwater is a mixture.',
    memoryAnchor: 'Mixture = physical blend.',
    color: '#84cc16',
    section: 'matter',
  },
  {
    id: 'oxidation',
    name: 'Oxidation',
    fact: 'Loss of electrons in a reaction (ASVAB test framing).',
    contrast: 'Reduction is gain of electrons.',
    example: 'If a species loses electrons, it is oxidized.',
    memoryAnchor: 'Oxidation = electron loss.',
    color: '#ef4444',
    section: 'processes',
  },
  {
    id: 'acids',
    name: 'Acids',
    fact: 'Substances with pH below 7 and commonly sour taste.',
    contrast: 'Bases have pH above 7.',
    example: 'Lemon juice is acidic.',
    memoryAnchor: 'Acid = pH below 7, sour.',
    color: '#f43f5e',
    section: 'processes',
  },
  {
    id: 'chlorophyll',
    name: 'Chlorophyll',
    fact: 'Green pigment that helps plants perform photosynthesis.',
    contrast: 'Hemoglobin is a blood protein, not plant pigment.',
    example: 'Leaves are green because of chlorophyll.',
    memoryAnchor: 'Chlorophyll = green photosynthesis pigment.',
    color: '#65a30d',
    section: 'processes',
  },
];

export const CHEMISTRY_FACTS_CARDS = CHEMISTRY_FACTS.filter((fact) =>
  ['electron', 'atomic-number', 'atom', 'compound', 'mixture', 'oxidation', 'acids'].includes(
    fact.id
  )
);

export function getChemistryFactById(id: ChemistryTopicId): ChemistryFact | undefined {
  return CHEMISTRY_FACTS.find((f) => f.id === id);
}

export const CHEMISTRY_QUIZ_QUESTIONS: ChemistryQuizQuestion[] = [
  {
    id: 'electron-charge',
    topicId: 'electron',
    prompt: 'What charge does an electron have?',
    options: ['Positive', 'Neutral', 'Negative', 'Variable'],
    correctAnswer: 'Negative',
    explanation: 'Electrons carry a negative charge.',
    distractorTip: 'Protons are positive; electrons are negative.',
    memoryAnchor: 'Electron = negative.',
  },
  {
    id: 'atomic-number-definition',
    topicId: 'atomic-number',
    prompt: 'Atomic number is determined by the number of what?',
    options: ['Neutrons', 'Electrons', 'Protons', 'Orbitals'],
    correctAnswer: 'Protons',
    explanation: 'Atomic number equals the number of protons in the nucleus.',
    distractorTip: 'Electron count can change in ions; proton count defines identity.',
    memoryAnchor: 'Atomic number = protons.',
  },
  {
    id: 'smallest-element-unit',
    topicId: 'atom',
    prompt: 'What is the smallest part of an element that still behaves like that element?',
    options: ['Nucleus', 'Molecule', 'Atom', 'Mixture'],
    correctAnswer: 'Atom',
    explanation: 'An atom is the smallest unit that retains element behavior.',
    distractorTip: 'A nucleus alone is not a full element unit.',
    memoryAnchor: 'Atom = smallest element unit.',
  },
  {
    id: 'oxidation-definition',
    topicId: 'oxidation',
    prompt: 'In common ASVAB framing, oxidation is the _____ of electrons.',
    options: ['Gain', 'Loss', 'Sharing', 'Neutralization'],
    correctAnswer: 'Loss',
    explanation: 'Oxidation is loss of electrons.',
    distractorTip: 'Reduction is gain of electrons.',
    memoryAnchor: 'Oxidation = electron loss.',
  },
  {
    id: 'acid-property',
    topicId: 'acids',
    prompt: 'Which is a typical property of acids?',
    options: ['pH above 7', 'Sweet taste', 'Sour taste', 'No ions'],
    correctAnswer: 'Sour taste',
    explanation: 'Acids usually taste sour and have pH below 7.',
    distractorTip: 'pH above 7 corresponds to bases.',
    memoryAnchor: 'Acid = pH below 7, sour.',
  },
  {
    id: 'compound-vs-mixture',
    topicId: 'compound',
    prompt: 'What best describes a compound?',
    options: [
      'Single type of atom',
      'Physical blend only',
      'Different elements chemically bonded',
      'Any two solids mixed',
    ],
    correctAnswer: 'Different elements chemically bonded',
    explanation: 'Compounds are formed by chemical bonds between different elements.',
    distractorTip: 'Mixtures are physical blends without new chemical bonds.',
    memoryAnchor: 'Compound = different elements bonded.',
  },
  {
    id: 'chlorophyll-role',
    topicId: 'chlorophyll',
    prompt: 'Chlorophyll is primarily associated with which process?',
    options: ['Respiration in animals', 'Photosynthesis in plants', 'Blood clotting', 'Digestion'],
    correctAnswer: 'Photosynthesis in plants',
    explanation: 'Chlorophyll is the green pigment plants use for photosynthesis.',
    distractorTip: 'Hemoglobin is blood-related; chlorophyll is plant-related.',
    memoryAnchor: 'Chlorophyll = photosynthesis.',
  },
  {
    id: 'element-definition',
    topicId: 'element',
    prompt: 'What is an element?',
    options: [
      'A physical blend of substances',
      'A pure substance of one atom type',
      'Any bonded group of atoms',
      'A charged particle',
    ],
    correctAnswer: 'A pure substance of one atom type',
    explanation: 'Elements contain only one kind of atom.',
    distractorTip: 'Compounds include different elements.',
    memoryAnchor: 'Element = one atom type.',
  },
  {
    id: 'nucleus-location',
    topicId: 'nucleus',
    prompt: 'Where are protons and neutrons located?',
    options: ['In electron clouds', 'In the nucleus', 'In compounds only', 'In mixtures'],
    correctAnswer: 'In the nucleus',
    explanation: 'Protons and neutrons are both found in the nucleus.',
    distractorTip: 'Electrons are outside the nucleus.',
    memoryAnchor: 'Nucleus = proton + neutron center.',
  },
  {
    id: 'mixture-definition',
    topicId: 'mixture',
    prompt: 'Which best defines a mixture?',
    options: [
      'One type of atom only',
      'Chemical bond between different elements',
      'Physical blend without new chemical bonds',
      'Substance with fixed proton count',
    ],
    correctAnswer: 'Physical blend without new chemical bonds',
    explanation: 'Mixtures are physical combinations; substances keep their own identities.',
    distractorTip: 'Compounds require chemical bonding.',
    memoryAnchor: 'Mixture = physical blend.',
  },
];

export interface ChemistryRecallDrillItem {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  topicId: ChemistryTopicId;
}

export const CHEMISTRY_RECALL_DRILL_ITEMS: ChemistryRecallDrillItem[] = [
  {
    id: 'electron-charge',
    question: 'Charge of electron?',
    correctAnswer: 'Negative',
    options: ['Positive', 'Neutral', 'Negative'],
    topicId: 'electron',
  },
  {
    id: 'atomic-number-basis',
    question: 'Atomic number is based on what?',
    correctAnswer: 'Protons',
    options: ['Protons', 'Electrons', 'Neutrons'],
    topicId: 'atomic-number',
  },
  {
    id: 'smallest-element-unit',
    question: 'Smallest part of element that still acts like element?',
    correctAnswer: 'Atom',
    options: ['Nucleus', 'Atom', 'Molecule'],
    topicId: 'atom',
  },
  {
    id: 'oxidation-meaning',
    question: 'Oxidation means gain or loss of electrons?',
    correctAnswer: 'Loss',
    options: ['Gain', 'Loss'],
    topicId: 'oxidation',
  },
  {
    id: 'acid-ph',
    question: 'Acid pH is above or below 7?',
    correctAnswer: 'Below 7',
    options: ['Above 7', 'Below 7'],
    topicId: 'acids',
  },
  {
    id: 'compound-vs-mixture',
    question: 'Compound or mixture: chemically bonded?',
    correctAnswer: 'Compound',
    options: ['Compound', 'Mixture'],
    topicId: 'compound',
  },
  {
    id: 'chlorophyll-role',
    question: 'Chlorophyll supports what process?',
    correctAnswer: 'Photosynthesis',
    options: ['Photosynthesis', 'Digestion', 'Respiration'],
    topicId: 'chlorophyll',
  },
  {
    id: 'proton-location',
    question: 'Protons are located where?',
    correctAnswer: 'Nucleus',
    options: ['Nucleus', 'Outer shell', 'Mixture'],
    topicId: 'proton',
  },
];

export interface ChemistryTrapChecklistItem {
  id: string;
  pair: string;
  distinction: string;
  topicIds: ChemistryTopicId[];
}

export const CHEMISTRY_TRAP_CHECKLIST_ITEMS: ChemistryTrapChecklistItem[] = [
  {
    id: 'electron-vs-proton',
    pair: 'Electron vs Proton',
    distinction: 'Electron = negative. Proton = positive.',
    topicIds: ['electron', 'proton'],
  },
  {
    id: 'atomic-number-vs-electrons',
    pair: 'Atomic number vs electrons',
    distinction: 'Atomic number is proton count, not electron count.',
    topicIds: ['atomic-number', 'proton', 'electron'],
  },
  {
    id: 'atom-vs-molecule',
    pair: 'Atom vs Molecule',
    distinction: 'Atom is single smallest unit; molecule is bonded atoms.',
    topicIds: ['atom', 'molecule'],
  },
  {
    id: 'compound-vs-mixture',
    pair: 'Compound vs Mixture',
    distinction: 'Compound = chemical bond. Mixture = physical blend.',
    topicIds: ['compound', 'mixture'],
  },
  {
    id: 'oxidation-vs-reduction',
    pair: 'Oxidation vs Reduction',
    distinction: 'Oxidation = electron loss. Reduction = electron gain.',
    topicIds: ['oxidation'],
  },
  {
    id: 'acid-vs-base',
    pair: 'Acid vs Base',
    distinction: 'Acid has pH below 7 and sour property.',
    topicIds: ['acids'],
  },
];
