export type EarthScienceTopicId =
  | 'crust'
  | 'mantle'
  | 'core'
  | 'biosphere'
  | 'atmosphere'
  | 'lithosphere'
  | 'igneous'
  | 'sedimentary'
  | 'metamorphic'
  | 'pumice'
  | 'tropical-rainforest'
  | 'desert'
  | 'tundra'
  | 'grassland'
  | 'deciduous-forest'
  | 'crust-oxygen';

export interface EarthScienceFact {
  id: EarthScienceTopicId;
  name: string;
  fact: string;
  contrast?: string;
  example?: string;
  memoryAnchor?: string;
  color: string;
  section: 'layers' | 'rocks' | 'biomes' | 'composition';
}

export interface EarthScienceQuizQuestion {
  id: string;
  topicId: EarthScienceTopicId;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  distractorTip?: string;
  memoryAnchor?: string;
}

export const EARTH_SCIENCE_FACTS: EarthScienceFact[] = [
  {
    id: 'crust',
    name: 'Crust',
    fact: 'Outermost solid layer of Earth; where we live; thinnest layer.',
    contrast: 'Not mantle or core.',
    example: 'Where we live; thinnest layer.',
    memoryAnchor: 'Crust = outermost layer.',
    color: '#b45309',
    section: 'layers',
  },
  {
    id: 'mantle',
    name: 'Mantle',
    fact: 'Middle layer of Earth; thickest; mostly solid rock.',
    contrast: 'Not crust (outermost) or core (innermost).',
    example: 'Lies between crust and core.',
    memoryAnchor: 'Mantle = middle, thickest.',
    color: '#d97706',
    section: 'layers',
  },
  {
    id: 'core',
    name: 'Core',
    fact: 'Innermost layer of Earth; very hot; mostly iron.',
    contrast: 'Not crust or mantle.',
    example: 'Center of Earth.',
    memoryAnchor: 'Core = innermost, hot, iron.',
    color: '#ea580c',
    section: 'layers',
  },
  {
    id: 'biosphere',
    name: 'Biosphere',
    fact: 'Where life exists on Earth (land, water, air where organisms live).',
    contrast: 'Not atmosphere alone; upper atmosphere has no life.',
    example: 'Oceans, land surface, soil, lower atmosphere.',
    memoryAnchor: 'Biosphere = where life exists.',
    color: '#16a34a',
    section: 'layers',
  },
  {
    id: 'atmosphere',
    name: 'Atmosphere',
    fact: 'Layer of gases around Earth.',
    contrast: 'Biosphere is where life exists; atmosphere is gases.',
    example: 'Nitrogen, oxygen, and other gases.',
    memoryAnchor: 'Atmosphere = gases.',
    color: '#0ea5e9',
    section: 'layers',
  },
  {
    id: 'lithosphere',
    name: 'Lithosphere',
    fact: 'Rigid outer layer: crust + upper mantle.',
    contrast: 'Not biosphere (life) or atmosphere (gases).',
    example: 'The solid rocky shell of Earth.',
    memoryAnchor: 'Lithosphere = rigid rock layer.',
    color: '#78716c',
    section: 'layers',
  },
  {
    id: 'igneous',
    name: 'Igneous Rock',
    fact: 'Rock formed from cooled magma or lava.',
    contrast: 'Not sedimentary (compressed sediments) or metamorphic (heat/pressure).',
    example: 'Pumice, granite, basalt.',
    memoryAnchor: 'Igneous = cooled magma/lava.',
    color: '#dc2626',
    section: 'rocks',
  },
  {
    id: 'sedimentary',
    name: 'Sedimentary Rock',
    fact: 'Rock formed from compressed sediments (sand, mud, shells).',
    contrast: 'Not igneous or metamorphic.',
    example: 'Sandstone, shale, limestone.',
    memoryAnchor: 'Sedimentary = compressed sediments.',
    color: '#ca8a04',
    section: 'rocks',
  },
  {
    id: 'metamorphic',
    name: 'Metamorphic Rock',
    fact: 'Rock formed when existing rock is changed by heat and pressure.',
    contrast: 'Not igneous or sedimentary.',
    example: 'Marble (from limestone), slate (from shale).',
    memoryAnchor: 'Metamorphic = heat + pressure.',
    color: '#7c3aed',
    section: 'rocks',
  },
  {
    id: 'pumice',
    name: 'Pumice',
    fact: 'Light, porous igneous rock from fast-cooling lava with trapped gas bubbles.',
    contrast: 'Not sedimentary or metamorphic.',
    example: 'Floats on water; volcanic origin.',
    memoryAnchor: 'Pumice = igneous.',
    color: '#e11d48',
    section: 'rocks',
  },
  {
    id: 'tropical-rainforest',
    name: 'Tropical Rainforest',
    fact: 'Biome with high rainfall and high temperatures year-round.',
    contrast: 'Not desert (dry) or tundra (cold).',
    example: 'Amazon, Congo basin.',
    memoryAnchor: 'Tropical rainforest = high rainfall + high temp.',
    color: '#15803d',
    section: 'biomes',
  },
  {
    id: 'desert',
    name: 'Desert',
    fact: 'Biome with very low rainfall.',
    contrast: 'Not tropical rainforest (wet) or grassland.',
    example: 'Sahara, Mojave.',
    memoryAnchor: 'Desert = very low rainfall.',
    color: '#c2410c',
    section: 'biomes',
  },
  {
    id: 'tundra',
    name: 'Tundra',
    fact: 'Biome that is very cold with short growing season.',
    contrast: 'Not tropical rainforest (hot) or desert.',
    example: 'Arctic regions.',
    memoryAnchor: 'Tundra = very cold.',
    color: '#0369a1',
    section: 'biomes',
  },
  {
    id: 'grassland',
    name: 'Grassland',
    fact: 'Biome with moderate rainfall; grasses dominate.',
    contrast: 'Not tropical rainforest (wet) or desert (dry).',
    example: 'Prairies, savannas.',
    memoryAnchor: 'Grassland = moderate rainfall, grasses.',
    color: '#65a30d',
    section: 'biomes',
  },
  {
    id: 'deciduous-forest',
    name: 'Deciduous Forest',
    fact: 'Biome with moderate seasons; trees lose leaves.',
    contrast: 'Not tropical rainforest (no leaf drop) or tundra.',
    example: 'Eastern US forests.',
    memoryAnchor: 'Deciduous = trees lose leaves.',
    color: '#2d5016',
    section: 'biomes',
  },
  {
    id: 'crust-oxygen',
    name: 'Oxygen in Crust',
    fact: 'Most abundant element in Earth\'s crust by mass (~46%).',
    contrast: 'Not silicon (second most abundant).',
    example: 'Combines with other elements to form silicates, oxides, carbonates.',
    memoryAnchor: 'Oxygen = most abundant in crust.',
    color: '#0284c7',
    section: 'composition',
  },
];

export const EARTH_SCIENCE_FACTS_CARDS = EARTH_SCIENCE_FACTS.filter((fact) =>
  ['crust', 'biosphere', 'igneous', 'pumice', 'tropical-rainforest', 'crust-oxygen'].includes(
    fact.id
  )
);

export function getEarthScienceFactById(
  id: EarthScienceTopicId
): EarthScienceFact | undefined {
  return EARTH_SCIENCE_FACTS.find((f) => f.id === id);
}

export const EARTH_SCIENCE_QUIZ_QUESTIONS: EarthScienceQuizQuestion[] = [
  {
    id: 'crust-outermost',
    topicId: 'crust',
    prompt: 'What is Earth\'s outermost layer?',
    options: ['Mantle', 'Core', 'Crust', 'Lithosphere'],
    correctAnswer: 'Crust',
    explanation: 'The crust is the outermost solid layer of Earth.',
    distractorTip: 'Mantle is the middle layer; core is innermost.',
    memoryAnchor: 'Crust = outermost layer.',
  },
  {
    id: 'biosphere-definition',
    topicId: 'biosphere',
    prompt: 'Where does life exist on Earth?',
    options: ['Atmosphere only', 'Biosphere', 'Core', 'Crust only'],
    correctAnswer: 'Biosphere',
    explanation: 'The biosphere is where life exists (land, water, air where organisms live).',
    distractorTip: 'Atmosphere is gases; biosphere includes life.',
    memoryAnchor: 'Biosphere = where life exists.',
  },
  {
    id: 'igneous-formation',
    topicId: 'igneous',
    prompt: 'What type of rock forms from cooled lava?',
    options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Limestone'],
    correctAnswer: 'Igneous',
    explanation: 'Igneous rocks form from cooled magma or lava.',
    distractorTip: 'Sedimentary = compressed sediments; metamorphic = heat/pressure.',
    memoryAnchor: 'Igneous = cooled magma/lava.',
  },
  {
    id: 'pumice-type',
    topicId: 'pumice',
    prompt: 'A rock floats on water. What type is it likely to be?',
    options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Limestone'],
    correctAnswer: 'Igneous',
    explanation: 'Pumice is a light, porous igneous rock that can float.',
    distractorTip: 'Pumice is igneous, not sedimentary.',
    memoryAnchor: 'Pumice = igneous.',
  },
  {
    id: 'tropical-rainforest-climate',
    topicId: 'tropical-rainforest',
    prompt: 'Which biome is characterized by high rainfall and high temperatures?',
    options: ['Desert', 'Tundra', 'Tropical rainforest', 'Grassland'],
    correctAnswer: 'Tropical rainforest',
    explanation: 'Tropical rainforests have high rainfall and high temperatures year-round.',
    distractorTip: 'Desert = low rainfall; tundra = cold.',
    memoryAnchor: 'Tropical rainforest = high rainfall + high temp.',
  },
  {
    id: 'crust-oxygen',
    topicId: 'crust-oxygen',
    prompt: 'What is the most abundant element in Earth\'s crust by mass?',
    options: ['Silicon', 'Aluminum', 'Iron', 'Oxygen'],
    correctAnswer: 'Oxygen',
    explanation: 'Oxygen is the most abundant element in Earth\'s crust (~46%).',
    distractorTip: 'Silicon is second most abundant.',
    memoryAnchor: 'Oxygen = most abundant in crust.',
  },
  {
    id: 'mantle-layer',
    topicId: 'mantle',
    prompt: 'Which is the middle layer of Earth?',
    options: ['Crust', 'Core', 'Mantle', 'Lithosphere'],
    correctAnswer: 'Mantle',
    explanation: 'The mantle is the middle layer between crust and core.',
    distractorTip: 'Crust = outermost; core = innermost.',
    memoryAnchor: 'Mantle = middle, thickest.',
  },
  {
    id: 'sedimentary-formation',
    topicId: 'sedimentary',
    prompt: 'Sedimentary rock forms from what?',
    options: ['Cooled lava', 'Heat and pressure', 'Compressed sediments', 'Volcanic gases'],
    correctAnswer: 'Compressed sediments',
    explanation: 'Sedimentary rocks form from compressed sediments (sand, mud, shells).',
    distractorTip: 'Igneous = cooled lava; metamorphic = heat/pressure.',
    memoryAnchor: 'Sedimentary = compressed sediments.',
  },
  {
    id: 'metamorphic-formation',
    topicId: 'metamorphic',
    prompt: 'Metamorphic rock forms when existing rock is changed by what?',
    options: ['Cooling only', 'Compression only', 'Heat and pressure', 'Evaporation'],
    correctAnswer: 'Heat and pressure',
    explanation: 'Metamorphic rocks form from existing rocks under heat and pressure.',
    distractorTip: 'Igneous = cooling; sedimentary = compression of sediments.',
    memoryAnchor: 'Metamorphic = heat + pressure.',
  },
  {
    id: 'desert-climate',
    topicId: 'desert',
    prompt: 'Deserts are characterized by what type of rainfall?',
    options: ['High rainfall', 'Moderate rainfall', 'Very low rainfall', 'Seasonal only'],
    correctAnswer: 'Very low rainfall',
    explanation: 'Deserts have very low rainfall.',
    distractorTip: 'Tropical rainforest = high rainfall.',
    memoryAnchor: 'Desert = very low rainfall.',
  },
  {
    id: 'three-rock-types',
    topicId: 'igneous',
    prompt: 'What are the three main types of rocks?',
    options: [
      'Igneous, Sedimentary, Metamorphic',
      'Granite, Sandstone, Marble',
      'Lava, Sand, Heat',
      'Crust, Mantle, Core',
    ],
    correctAnswer: 'Igneous, Sedimentary, Metamorphic',
    explanation: 'The three main rock types are igneous, sedimentary, and metamorphic.',
    distractorTip: 'Crust, mantle, core are Earth layers, not rock types.',
    memoryAnchor: 'Igneous, Sedimentary, Metamorphic.',
  },
  {
    id: 'atmosphere-definition',
    topicId: 'atmosphere',
    prompt: 'What is the atmosphere?',
    options: [
      'Where life exists',
      'Layer of gases around Earth',
      'Rigid rock layer',
      'Innermost Earth layer',
    ],
    correctAnswer: 'Layer of gases around Earth',
    explanation: 'The atmosphere is the layer of gases around Earth.',
    distractorTip: 'Biosphere = where life exists; lithosphere = rigid rock.',
    memoryAnchor: 'Atmosphere = gases.',
  },
];

export interface EarthScienceRecallDrillItem {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  topicId: EarthScienceTopicId;
}

export const EARTH_SCIENCE_RECALL_DRILL_ITEMS: EarthScienceRecallDrillItem[] = [
  {
    id: 'crust-outermost',
    question: 'Earth\'s outermost layer?',
    correctAnswer: 'Crust',
    options: ['Crust', 'Mantle', 'Core'],
    topicId: 'crust',
  },
  {
    id: 'biosphere',
    question: 'Where does life exist (sphere)?',
    correctAnswer: 'Biosphere',
    options: ['Biosphere', 'Atmosphere', 'Lithosphere'],
    topicId: 'biosphere',
  },
  {
    id: 'igneous-formation',
    question: 'Rock type formed from cooled lava?',
    correctAnswer: 'Igneous',
    options: ['Igneous', 'Sedimentary', 'Metamorphic'],
    topicId: 'igneous',
  },
  {
    id: 'pumice-example',
    question: 'Example of igneous rock?',
    correctAnswer: 'Pumice',
    options: ['Pumice', 'Sandstone', 'Marble'],
    topicId: 'pumice',
  },
  {
    id: 'tropical-rainforest',
    question: 'Biome with high rainfall + high temperatures?',
    correctAnswer: 'Tropical rainforest',
    options: ['Tropical rainforest', 'Desert', 'Tundra'],
    topicId: 'tropical-rainforest',
  },
  {
    id: 'crust-oxygen',
    question: 'Most abundant element in Earth\'s crust?',
    correctAnswer: 'Oxygen',
    options: ['Oxygen', 'Silicon', 'Iron'],
    topicId: 'crust-oxygen',
  },
  {
    id: 'three-rock-types',
    question: 'Three main rock types?',
    correctAnswer: 'Igneous, Sedimentary, Metamorphic',
    options: ['Igneous, Sedimentary, Metamorphic', 'Crust, Mantle, Core', 'Sand, Lava, Heat'],
    topicId: 'igneous',
  },
  {
    id: 'mantle-layer',
    question: 'Middle layer of Earth?',
    correctAnswer: 'Mantle',
    options: ['Crust', 'Mantle', 'Core'],
    topicId: 'mantle',
  },
  {
    id: 'sedimentary-formation',
    question: 'Rock type from compressed sediments?',
    correctAnswer: 'Sedimentary',
    options: ['Igneous', 'Sedimentary', 'Metamorphic'],
    topicId: 'sedimentary',
  },
  {
    id: 'pumice-type',
    question: 'Pumice is igneous, sedimentary, or metamorphic?',
    correctAnswer: 'Igneous',
    options: ['Igneous', 'Sedimentary', 'Metamorphic'],
    topicId: 'pumice',
  },
];

export interface EarthScienceTrapChecklistItem {
  id: string;
  pair: string;
  distinction: string;
  topicIds: EarthScienceTopicId[];
}

export const EARTH_SCIENCE_TRAP_CHECKLIST_ITEMS: EarthScienceTrapChecklistItem[] = [
  {
    id: 'crust-vs-mantle-core',
    pair: 'Crust vs Mantle vs Core',
    distinction: 'Crust = outermost. Mantle = middle. Core = innermost.',
    topicIds: ['crust', 'mantle', 'core'],
  },
  {
    id: 'biosphere-vs-atmosphere',
    pair: 'Biosphere vs Atmosphere vs Lithosphere',
    distinction: 'Biosphere = where life exists. Atmosphere = gases. Lithosphere = rigid rock.',
    topicIds: ['biosphere', 'atmosphere', 'lithosphere'],
  },
  {
    id: 'igneous-vs-sedimentary-metamorphic',
    pair: 'Igneous vs Sedimentary vs Metamorphic',
    distinction: 'Igneous = cooled lava. Sedimentary = compressed sediments. Metamorphic = heat + pressure.',
    topicIds: ['igneous', 'sedimentary', 'metamorphic'],
  },
  {
    id: 'pumice-igneous',
    pair: 'Pumice = igneous',
    distinction: 'Pumice is igneous, not sedimentary or metamorphic.',
    topicIds: ['pumice', 'igneous'],
  },
  {
    id: 'tropical-rainforest-climate',
    pair: 'Tropical rainforest = high rainfall + high temp',
    distinction: 'Desert = low rainfall. Tundra = cold.',
    topicIds: ['tropical-rainforest', 'desert', 'tundra'],
  },
  {
    id: 'oxygen-vs-silicon',
    pair: 'Oxygen = most abundant in crust',
    distinction: 'Oxygen is most abundant; silicon is second.',
    topicIds: ['crust-oxygen'],
  },
  {
    id: 'sedimentary-compressed',
    pair: 'Sedimentary = compressed sediments',
    distinction: 'Not cooled lava (igneous) or heat/pressure (metamorphic).',
    topicIds: ['sedimentary'],
  },
  {
    id: 'metamorphic-heat-pressure',
    pair: 'Metamorphic = heat + pressure',
    distinction: 'Existing rock changed by heat and pressure.',
    topicIds: ['metamorphic'],
  },
];
