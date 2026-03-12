export type MeasurementPhysicsTopicId =
  | 'meter-cm'
  | 'kilometer'
  | 'celsius-boiling'
  | 'celsius-freezing'
  | 'speed-of-light'
  | 'light-year'
  | 'velocity'
  | 'speed'
  | 'energy'
  | 'power'
  | 'melting-point'
  | 'boiling-point'
  | 'newton-first'
  | 'newton-second'
  | 'newton-third';

export interface MeasurementPhysicsFact {
  id: MeasurementPhysicsTopicId;
  name: string;
  fact: string;
  contrast?: string;
  example?: string;
  memoryAnchor?: string;
  color: string;
  section: 'metrics' | 'temperature' | 'light' | 'motion' | 'energy';
}

export interface MeasurementPhysicsQuizQuestion {
  id: string;
  topicId: MeasurementPhysicsTopicId;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  distractorTip?: string;
  memoryAnchor?: string;
}

export const MEASUREMENT_PHYSICS_FACTS: MeasurementPhysicsFact[] = [
  {
    id: 'meter-cm',
    name: '1 meter = 100 cm',
    fact: 'One meter equals 100 centimeters.',
    contrast: 'Not 10 cm; not 100 mm (1 m = 1000 mm).',
    example: 'A meter stick has 100 cm marks.',
    memoryAnchor: '1 m = 100 cm.',
    color: '#6366f1',
    section: 'metrics',
  },
  {
    id: 'kilometer',
    name: '1 kilometer = 1000 m',
    fact: 'One kilometer equals 1000 meters.',
    contrast: 'Not 100 m; not 10,000 m.',
    example: 'A 1 km strip is 1000 m long.',
    memoryAnchor: '1 km = 1000 m.',
    color: '#8b5cf6',
    section: 'metrics',
  },
  {
    id: 'celsius-boiling',
    name: 'Boiling point (water)',
    fact: 'Water boils at 100°C on the Celsius scale.',
    contrast: 'Not 0°C (freezing); not 212° (Fahrenheit).',
    example: 'At sea level, boiling water = 100°C.',
    memoryAnchor: 'Boiling = 100°C.',
    color: '#ef4444',
    section: 'temperature',
  },
  {
    id: 'celsius-freezing',
    name: 'Freezing point (water)',
    fact: 'Water freezes at 0°C on the Celsius scale.',
    contrast: 'Not 100°C (boiling); not 32°F.',
    example: 'Ice melts at 0°C.',
    memoryAnchor: 'Freezing = 0°C.',
    color: '#3b82f6',
    section: 'temperature',
  },
  {
    id: 'speed-of-light',
    name: 'Speed of light',
    fact: 'Light travels at approximately 186,000 miles per second.',
    contrast: 'Per second, not per hour or per minute; not 18,600.',
    example: 'Radio waves travel at speed of light.',
    memoryAnchor: '~186,000 mi/s.',
    color: '#f59e0b',
    section: 'light',
  },
  {
    id: 'light-year',
    name: 'Light-year',
    fact: 'Distance light travels in one year.',
    contrast: 'It is a distance, not a unit of time.',
    example: 'Proxima Centauri is about 4 light-years away.',
    memoryAnchor: 'Light-year = distance.',
    color: '#eab308',
    section: 'light',
  },
  {
    id: 'velocity',
    name: 'Velocity',
    fact: 'Vector quantity: how fast an object moves and the direction it moves.',
    contrast: 'Not speed (scalar, no direction); not acceleration.',
    example: '"60 mph north" is velocity.',
    memoryAnchor: 'Velocity = direction + magnitude.',
    color: '#10b981',
    section: 'motion',
  },
  {
    id: 'speed',
    name: 'Speed',
    fact: 'Scalar quantity; magnitude of motion only.',
    contrast: 'No direction; not velocity.',
    example: '"60 mph" is speed.',
    memoryAnchor: 'Speed = magnitude only.',
    color: '#14b8a6',
    section: 'motion',
  },
  {
    id: 'energy',
    name: 'Energy',
    fact: 'Ability to do work.',
    contrast: 'Not power (rate of work); not force.',
    example: 'Stored energy can do work later.',
    memoryAnchor: 'Energy = ability to do work.',
    color: '#22c55e',
    section: 'energy',
  },
  {
    id: 'power',
    name: 'Power',
    fact: 'Rate of doing work; work per unit time. Measured in watts (W).',
    contrast: 'Not energy (ability); not force.',
    example: 'A 100 W bulb uses 100 joules per second.',
    memoryAnchor: 'Power = watts.',
    color: '#84cc16',
    section: 'energy',
  },
  {
    id: 'melting-point',
    name: 'Melting point',
    fact: 'Temperature at which solid and liquid states exist in equilibrium (solid becomes liquid).',
    contrast: 'Not boiling point (liquid to gas).',
    example: 'Ice melts at 0°C.',
    memoryAnchor: 'Melting = solid-liquid.',
    color: '#06b6d4',
    section: 'temperature',
  },
  {
    id: 'boiling-point',
    name: 'Boiling point',
    fact: 'Temperature at which liquid and gas states exist in equilibrium.',
    contrast: 'Not melting point (solid to liquid).',
    example: 'Water boils at 100°C.',
    memoryAnchor: 'Boiling = liquid-gas.',
    color: '#0ea5e9',
    section: 'temperature',
  },
  {
    id: 'newton-first',
    name: "Newton's 1st law (Inertia)",
    fact: 'Object at rest stays at rest; object in motion stays in motion unless acted on by a force.',
    contrast: 'Not 2nd law (F=ma); not 3rd (action-reaction).',
    example: 'Seatbelt holds you when car stops.',
    memoryAnchor: 'Inertia = resists change.',
    color: '#64748b',
    section: 'motion',
  },
  {
    id: 'newton-second',
    name: "Newton's 2nd law (F = ma)",
    fact: 'Force = mass × acceleration; force needed to accelerate is directly proportional to mass.',
    contrast: 'Not inertia (1st); not action-reaction (3rd).',
    example: 'Heavier object needs more force to accelerate.',
    memoryAnchor: 'F = ma.',
    color: '#475569',
    section: 'motion',
  },
  {
    id: 'newton-third',
    name: "Newton's 3rd law (Action-reaction)",
    fact: 'For every action there is an equal and opposite reaction.',
    contrast: 'Not F=ma; not inertia.',
    example: 'Rocket pushes exhaust; exhaust pushes rocket.',
    memoryAnchor: 'Action-reaction pairs.',
    color: '#334155',
    section: 'motion',
  },
];

export const MEASUREMENT_PHYSICS_FACTS_CARDS = MEASUREMENT_PHYSICS_FACTS.filter(
  (fact) =>
    [
      'meter-cm',
      'kilometer',
      'celsius-boiling',
      'speed-of-light',
      'velocity',
      'energy',
      'power',
      'melting-point',
      'newton-second',
    ].includes(fact.id)
);

export function getMeasurementPhysicsFactById(
  id: MeasurementPhysicsTopicId
): MeasurementPhysicsFact | undefined {
  return MEASUREMENT_PHYSICS_FACTS.find((f) => f.id === id);
}

export const MEASUREMENT_PHYSICS_QUIZ_QUESTIONS: MeasurementPhysicsQuizQuestion[] =
  [
    {
      id: 'meter-cm',
      topicId: 'meter-cm',
      prompt: 'A meter consists of how many centimeters?',
      options: ['10', '100', '1000', '100 millimeters'],
      correctAnswer: '100',
      explanation: '1 meter = 100 centimeters.',
      distractorTip: '1 m = 1000 mm, not 100 mm.',
      memoryAnchor: '1 m = 100 cm.',
    },
    {
      id: 'kilometer',
      topicId: 'kilometer',
      prompt: 'A strip of land 1 kilometer long is equal to how many meters?',
      options: ['100 meters', '1000 meters', '10,000 centimeters', '100 decimeters'],
      correctAnswer: '1000 meters',
      explanation: '1 kilometer = 1000 meters.',
      distractorTip: '1 km = 1000 m.',
      memoryAnchor: '1 km = 1000 m.',
    },
    {
      id: 'celsius-boiling',
      topicId: 'celsius-boiling',
      prompt: 'On the Celsius scale, the boiling point of water is:',
      options: ['0°', '100°', '212°', '373.15°'],
      correctAnswer: '100°',
      explanation: 'Water boils at 100°C on the Celsius scale.',
      distractorTip: '212° is Fahrenheit; 0° is freezing.',
      memoryAnchor: 'Boiling = 100°C.',
    },
    {
      id: 'speed-of-light',
      topicId: 'speed-of-light',
      prompt: 'Light waves travel at a rate of about:',
      options: [
        '186,000 miles per hour',
        '186,000 miles per minute',
        '18,600 miles per hour',
        '186,000 miles per second',
      ],
      correctAnswer: '186,000 miles per second',
      explanation: 'Light travels at approximately 186,000 miles per second.',
      distractorTip: 'Per second, not per hour or per minute.',
      memoryAnchor: '~186,000 mi/s.',
    },
    {
      id: 'light-year',
      topicId: 'light-year',
      prompt: 'One light-year is:',
      options: [
        'The distance traveled by light in one year',
        'The brightness of light at 30,000 miles',
        '17 standard Earth years',
        'A unit of time',
      ],
      correctAnswer: 'The distance traveled by light in one year',
      explanation: 'A light-year is a distance, not a unit of time.',
      distractorTip: 'Light-year = distance.',
      memoryAnchor: 'Light-year = distance.',
    },
    {
      id: 'velocity',
      topicId: 'velocity',
      prompt: 'The vector quantity that measures how fast an object moves and the direction it moves is:',
      options: ['Speed', 'Velocity', 'Momentum', 'Acceleration'],
      correctAnswer: 'Velocity',
      explanation: 'Velocity includes both magnitude and direction.',
      distractorTip: 'Speed is scalar (no direction).',
      memoryAnchor: 'Velocity = direction + magnitude.',
    },
    {
      id: 'energy',
      topicId: 'energy',
      prompt: '_____ is known as the ability to do work.',
      options: ['Power', 'Movement', 'Energy', 'Force'],
      correctAnswer: 'Energy',
      explanation: 'Energy is the ability to do work.',
      distractorTip: 'Power is rate of work (watts).',
      memoryAnchor: 'Energy = ability to do work.',
    },
    {
      id: 'power',
      topicId: 'power',
      prompt: 'Power is the rate of work done. It is measured in:',
      options: ['Decibels', 'Joules', 'Watts', 'Hertz'],
      correctAnswer: 'Watts',
      explanation: 'Power is measured in watts (W).',
      distractorTip: 'Joules measure energy; watts measure power.',
      memoryAnchor: 'Power = watts.',
    },
    {
      id: 'melting-point',
      topicId: 'melting-point',
      prompt: 'The temperature at which a substance\'s solid and liquid states exist in equilibrium is its:',
      options: [
        'Melting point',
        'Boiling point',
        'Anti-freezing point',
        'Concentration point',
      ],
      correctAnswer: 'Melting point',
      explanation: 'Melting point is where solid and liquid exist in equilibrium.',
      distractorTip: 'Boiling point = liquid to gas.',
      memoryAnchor: 'Melting = solid-liquid.',
    },
    {
      id: 'melting-point-alt',
      topicId: 'melting-point',
      prompt: 'The temperature at which a solid becomes a liquid is its:',
      options: [
        'Melting point',
        'Boiling point',
        'Freezing point',
        'Concentration point',
      ],
      correctAnswer: 'Melting point',
      explanation: 'Melting point is when solid becomes liquid.',
      distractorTip: 'Boiling = liquid to gas; freezing = liquid to solid.',
      memoryAnchor: 'Melting = solid-liquid.',
    },
    {
      id: 'newton-second',
      topicId: 'newton-second',
      prompt: 'Newton\'s law that states the force needed to accelerate an object is directly proportional to the mass of the object is:',
      options: ['Gravity', 'Relativity', 'Entropy', 'The 2nd law (F=ma)'],
      correctAnswer: 'The 2nd law (F=ma)',
      explanation: 'F = ma: force is proportional to mass and acceleration.',
      distractorTip: '1st law = inertia; 2nd = F=ma.',
      memoryAnchor: 'F = ma.',
    },
    {
      id: 'celsius-freezing',
      topicId: 'celsius-freezing',
      prompt: 'On the Celsius scale, water freezes at:',
      options: ['0°', '32°', '100°', '273°'],
      correctAnswer: '0°',
      explanation: 'Water freezes at 0°C.',
      distractorTip: '100°C is boiling; 32° is Fahrenheit.',
      memoryAnchor: 'Freezing = 0°C.',
    },
    {
      id: 'speed-vs-velocity',
      topicId: 'velocity',
      prompt: 'Which quantity includes both magnitude and direction?',
      options: ['Speed', 'Velocity', 'Distance', 'Time'],
      correctAnswer: 'Velocity',
      explanation: 'Velocity is a vector (magnitude + direction).',
      distractorTip: 'Speed is scalar (magnitude only).',
      memoryAnchor: 'Velocity = direction + magnitude.',
    },
    {
      id: 'energy-vs-power',
      topicId: 'energy',
      prompt: 'Which describes the ability to do work?',
      options: ['Power', 'Energy', 'Force', 'Watts'],
      correctAnswer: 'Energy',
      explanation: 'Energy is the ability to do work.',
      distractorTip: 'Power = rate of work (watts).',
      memoryAnchor: 'Energy = ability to do work.',
    },
  ];

export interface MeasurementPhysicsRecallDrillItem {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  topicId: MeasurementPhysicsTopicId;
}

export const MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS: MeasurementPhysicsRecallDrillItem[] =
  [
    {
      id: 'meter-cm',
      question: '1 meter = how many centimeters?',
      correctAnswer: '100',
      options: ['100', '10', '1000'],
      topicId: 'meter-cm',
    },
    {
      id: 'kilometer',
      question: '1 kilometer = how many meters?',
      correctAnswer: '1000',
      options: ['1000', '100', '10,000'],
      topicId: 'kilometer',
    },
    {
      id: 'celsius-boiling',
      question: 'Boiling point of water in Celsius?',
      correctAnswer: '100°C',
      options: ['100°C', '0°C', '212°C'],
      topicId: 'celsius-boiling',
    },
    {
      id: 'speed-of-light',
      question: 'Speed of light (approximate, with unit)?',
      correctAnswer: '186,000 mi/s',
      options: ['186,000 mi/s', '186,000 mi/hr', '18,600 mi/s'],
      topicId: 'speed-of-light',
    },
    {
      id: 'light-year',
      question: 'Light-year: distance or time?',
      correctAnswer: 'Distance',
      options: ['Distance', 'Time', 'Speed'],
      topicId: 'light-year',
    },
    {
      id: 'velocity',
      question: 'Velocity vs speed: which has direction?',
      correctAnswer: 'Velocity',
      options: ['Velocity', 'Speed', 'Both'],
      topicId: 'velocity',
    },
    {
      id: 'energy',
      question: 'Energy = ability to do what?',
      correctAnswer: 'Work',
      options: ['Work', 'Power', 'Force'],
      topicId: 'energy',
    },
    {
      id: 'power',
      question: 'Power measured in what unit?',
      correctAnswer: 'Watts',
      options: ['Watts', 'Joules', 'Hertz'],
      topicId: 'power',
    },
    {
      id: 'melting-point',
      question: 'Melting point = solid to what?',
      correctAnswer: 'Liquid',
      options: ['Liquid', 'Gas', 'Plasma'],
      topicId: 'melting-point',
    },
    {
      id: 'newton-second',
      question: 'Newton\'s 2nd law: F = ?',
      correctAnswer: 'ma',
      options: ['ma', 'mv', 'm/v'],
      topicId: 'newton-second',
    },
  ];

export interface MeasurementPhysicsTrapChecklistItem {
  id: string;
  pair: string;
  distinction: string;
  topicIds: MeasurementPhysicsTopicId[];
}

export const MEASUREMENT_PHYSICS_TRAP_CHECKLIST_ITEMS: MeasurementPhysicsTrapChecklistItem[] =
  [
    {
      id: 'speed-of-light-unit',
      pair: 'Speed of light: per second',
      distinction: '~186,000 miles per second, not per hour or per minute.',
      topicIds: ['speed-of-light'],
    },
    {
      id: 'meter-conversion',
      pair: '1 m = 100 cm (not 10 cm)',
      distinction: '1 m = 100 cm; 1 m = 1000 mm (not 100 mm).',
      topicIds: ['meter-cm'],
    },
    {
      id: 'kilometer-conversion',
      pair: '1 km = 1000 m',
      distinction: 'Not 100 m or 10,000 m.',
      topicIds: ['kilometer'],
    },
    {
      id: 'celsius-boiling',
      pair: 'Boiling water = 100°C',
      distinction: 'Not 0° or 212° (Fahrenheit).',
      topicIds: ['celsius-boiling'],
    },
    {
      id: 'velocity-vs-speed',
      pair: 'Velocity = direction + magnitude',
      distinction: 'Speed = magnitude only; velocity includes direction.',
      topicIds: ['velocity', 'speed'],
    },
    {
      id: 'energy-vs-power',
      pair: 'Energy = ability; power = rate (watts)',
      distinction: 'Energy = ability to do work; power = rate of work.',
      topicIds: ['energy', 'power'],
    },
    {
      id: 'melting-vs-boiling',
      pair: 'Melting = solid-liquid; boiling = liquid-gas',
      distinction: 'Melting point = solid-liquid equilibrium; boiling = liquid-gas.',
      topicIds: ['melting-point', 'boiling-point'],
    },
    {
      id: 'light-year-distance',
      pair: 'Light-year = distance',
      distinction: 'Distance light travels in one year; not a unit of time.',
      topicIds: ['light-year'],
    },
    {
      id: 'newton-second',
      pair: 'Newton 2nd: F = ma',
      distinction: 'Force ∝ mass for acceleration; not inertia (1st) or action-reaction (3rd).',
      topicIds: ['newton-second'],
    },
  ];
