export interface DstPattern {
  id: number;
  name: string;
  situation: string;
  keyTrick: string;
  visual: string;
  formula: string;
  example: {
    problem: string;
    steps: string[];
    answer: string;
  };
  shortcut: string;
  practice: {
    problem: string;
    answer: string;
  };
}

export interface DstSpeedDrillItem {
  problem: string;
  answer: string;
}

export interface DstTestQuestionSolution {
  patternLabel: string;
  solutionSteps: string[];
}

export const DST_INTRO = {
  headline: 'LEVEL 3 — DISTANCE, SPEED & TIME (MASTER THE 6 PATTERNS)',
  tagline: 'Motion problems on the ASVAB are pattern recognition first, algebra second.',
  insight:
    'Lock in d = vt and the triangle, then match the story to one of six setups: basic motion, separation, catch-up, round-trip average speed, wind/current, or fuel pipeline.',
  goals: [
    'Use Distance = Speed × Time (and speed = d/t, time = d/s) with consistent units.',
    'Opposite directions: add speeds, then multiply by time.',
    'Catch-up: head start distance, then relative speed (faster − slower).',
    'Round trip: average speed = total distance ÷ total time (not the average of the two speeds).',
    'Wind/current: ground speed = still water/air speed ± current.',
    'Fuel: chain hours × mph → miles → mpg → gallons → price.',
  ],
};

export const DST_PATTERN_MAP: Array<{ pattern: number; situation: string; keyTrick: string }> = [
  { pattern: 1, situation: 'Basic Motion', keyTrick: 'multiply' },
  { pattern: 2, situation: 'Opposite Directions', keyTrick: 'add speeds' },
  { pattern: 3, situation: 'Catch-Up', keyTrick: 'subtract speeds' },
  { pattern: 4, situation: 'Round Trip', keyTrick: 'total distance ÷ total time' },
  { pattern: 5, situation: 'Wind / Current', keyTrick: 'add or subtract current' },
  { pattern: 6, situation: 'Fuel / Efficiency', keyTrick: 'multi-step pipeline' },
];

export const DST_PATTERNS: DstPattern[] = [
  {
    id: 1,
    name: 'Basic Motion',
    situation: 'Basic Motion',
    keyTrick: 'multiply',
    visual: '🚗 → → → → →\nspeed = 60 mph\ntime = 3 hours',
    formula: 'distance = speed × time',
    example: {
      problem: 'A car travels 60 mph for 3 hours.',
      steps: ['distance = 60 × 3', 'distance = 180 miles'],
      answer: '180 miles',
    },
    shortcut: 'Think repeated addition: 60 + 60 + 60',
    practice: {
      problem: 'A car drives 48 mph for 5 hours. Distance = ?',
      answer: '48 × 5 = 240 miles',
    },
  },
  {
    id: 2,
    name: 'Opposite Directions',
    situation: 'Opposite Directions',
    keyTrick: 'add speeds',
    visual: '← 55 mph   START   70 mph →',
    formula: 'distance apart = (speed1 + speed2) × time',
    example: {
      problem: 'Two trains travel 55 mph and 70 mph for 3 hours.',
      steps: ['55 + 70 = 125', '125 × 3 = 375'],
      answer: '375 miles apart',
    },
    shortcut: 'Always add speeds first.',
    practice: {
      problem: 'Two cars leave a point at 40 mph and 50 mph. Distance after 2 hours?',
      answer: '(40 + 50) × 2 = 180 miles',
    },
  },
  {
    id: 3,
    name: 'Catch-Up',
    situation: 'Catch-Up',
    keyTrick: 'subtract speeds',
    visual: 'Alice → → → → (45 mph)\nDave → → → → (?)\n\nAlice leaves 30 minutes earlier.',
    formula: 'relative speed = faster − slower\nlead distance ÷ catch-up time',
    example: {
      problem: 'Alice travels 45 mph. Dave leaves 30 min later. How fast must Dave go to catch up 3 hours after he leaves?',
      steps: [
        'Head start: 0.5 hr',
        'Distance lead: 45 × 0.5 = 22.5 miles',
        'Alice total travel: 45 × 3 = 135 miles',
        'Dave travel time: 2.5 hours',
        'Speed needed: 135 ÷ 2.5 = 52.5 mph',
      ],
      answer: '52.5 mph',
    },
    shortcut: 'lead distance ÷ catch-up time',
    practice: {
      problem: 'A runner travels 6 mph. Another leaves 10 minutes later at 8 mph. How long to catch up?',
      answer: 'Lead: 6 × (10/60) = 1 mile. Relative speed: 8 − 6 = 2 mph. Time: 1 ÷ 2 = 0.5 hr = 30 min',
    },
  },
  {
    id: 4,
    name: 'Round Trip / Average Speed',
    situation: 'Round Trip',
    keyTrick: 'total distance ÷ total time',
    visual: 'Drive 60 mph going, 40 mph returning\nDistance each way = 120 miles',
    formula: 'average speed = total distance ÷ total time',
    example: {
      problem: 'Drive 60 mph going, 40 mph returning. Distance each way = 120 miles.',
      steps: [
        'Time going: 120 ÷ 60 = 2 hours',
        'Time returning: 120 ÷ 40 = 3 hours',
        'Total distance: 240 miles',
        'Total time: 5 hours',
        'Average speed: 240 ÷ 5 = 48 mph',
      ],
      answer: '48 mph',
    },
    shortcut: 'Average speed is NOT the average of speeds.',
    practice: {
      problem: 'Drive 70 mph going, 50 mph returning. Distance = 140 miles each way. Average speed = ?',
      answer: 'Time: 140÷70 + 140÷50 = 2 + 2.8 = 4.8 hr. 280 ÷ 4.8 ≈ 58.3 mph',
    },
  },
  {
    id: 5,
    name: 'Wind / Current',
    situation: 'Wind / Current',
    keyTrick: 'add or subtract current',
    visual: 'Boat → current\nBoat ← against current',
    formula: 'downstream = boat + current\nupstream = boat − current',
    example: {
      problem: 'Boat speed = 20 mph, Current = 4 mph',
      steps: ['Downstream: 20 + 4 = 24 mph', 'Upstream: 20 − 4 = 16 mph'],
      answer: '24 mph downstream, 16 mph upstream',
    },
    shortcut: 'Add with current, subtract against.',
    practice: {
      problem: 'Boat speed = 18 mph, Current = 3 mph. Downstream = ? Upstream = ?',
      answer: 'Downstream: 21 mph. Upstream: 15 mph',
    },
  },
  {
    id: 6,
    name: 'Fuel Cost',
    situation: 'Fuel / Efficiency',
    keyTrick: 'multi-step pipeline',
    visual: 'speed × time → distance → distance ÷ mpg → gallons → gallons × price → total cost',
    formula: 'distance = speed × time\ngallons = distance ÷ mpg\ncost = gallons × price',
    example: {
      problem: '48 mph for 7 hours. 21 mpg. $2.82/gal.',
      steps: [
        'Distance: 48 × 7 = 336 miles',
        'Gallons: 336 ÷ 21 = 16',
        'Cost: 16 × 2.82 = $45.12',
      ],
      answer: '$45.12',
    },
    shortcut: 'Pipeline: distance → gallons → cost',
    practice: {
      problem: '60 mph for 4 hours. 24 mpg. $3.00/gal. Cost?',
      answer: '240 mi ÷ 24 = 10 gal. 10 × 3 = $30',
    },
  },
];

export const DST_SPEED_DRILL: DstSpeedDrillItem[] = [
  { problem: '60 mph × 4 hr = ?', answer: '240 miles' },
  { problem: '45 mph × 6 hr = ?', answer: '270 miles' },
  { problem: '240 miles ÷ 60 mph = ?', answer: '4 hours' },
  { problem: '70 mph × 3 hr = ?', answer: '210 miles' },
];

export const DST_TEST_QUESTION_SOLUTIONS: Record<string, DstTestQuestionSolution> = {
  'ar-p1-010': {
    patternLabel: 'Catch-Up',
    solutionSteps: [
      'Alice head start: 30 min = 0.5 hr',
      'Distance lead: 45 × 0.5 = 22.5 miles',
      'Alice total when Dave catches: 45 × 3 = 135 miles',
      'Dave travel time: 2.5 hours',
      'Dave speed needed: 135 ÷ 2.5 = 52.5 mph',
    ],
  },
  'ar-p1-026': {
    patternLabel: 'Opposite Directions',
    solutionSteps: [
      'Add speeds: 55 + 70 = 125 mph',
      'Distance apart: 125 × 3 = 375 miles',
    ],
  },
  'ar-p1-030': {
    patternLabel: 'Fuel Cost',
    solutionSteps: [
      'Distance: 48 × 7 = 336 miles',
      'Gallons: 336 ÷ 21 = 16',
      'Cost: 16 × 2.82 = $45.12',
    ],
  },
};
