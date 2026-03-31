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
    'Lock in d = st and the triangle, then match the story to one of six setups: basic motion, separation, catch-up, round-trip average speed, wind/current, or fuel pipeline.',
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
      problem:
        'During a training exercise, a military bus travels on a straight highway at a constant 58 miles per hour for 4 hours without stopping. How far does the bus travel?',
      steps: [
        'Write the core relationship: d = st. Why: this is a constant-speed motion question asking for distance.',
        'Substitute known values: d = 58 × 4. Why: speed is in miles per hour and time is in hours, so units match.',
        'Compute distance: d = 232 miles. Why: multiplying rate by time gives total miles covered.',
      ],
      answer: '232 miles',
    },
    shortcut:
      'Shortcut work:\nd = st\n58 × 4 = 232 miles\nWhy it works: constant rate means equal miles each hour, so multiply once instead of repeated addition.',
    practice: {
      problem:
        'A convoy vehicle maintains 42 miles per hour for 2.5 hours on an interstate route. What distance does it cover?',
      answer:
        'Work: d = st = 42 × 2.5 = 105 miles.\nWhy: when speed stays constant, total distance is rate times elapsed time.',
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
      problem:
        'Two military transport trucks leave the same checkpoint at the same time and travel in opposite directions on the same highway. One truck averages 38 mph and the other averages 46 mph. How far apart are they after 3 hours?',
      steps: [
        'Add rates: 38 + 46 = 84 mph. Why: opposite directions increase separation at the sum of the two speeds.',
        'Multiply by time: distance apart = 84 × 3 = 252 miles. Why: separation rate times elapsed time gives total gap.',
      ],
      answer: '252 miles apart',
    },
    shortcut:
      'Shortcut work:\ncombined separation rate = 38 + 46 = 84 mph\ndistance apart = 84 × 3 = 252 miles\nWhy it works: opposite-direction motion grows the gap at the sum of speeds.',
    practice: {
      problem:
        'At 9:00 a.m., two buses leave the same depot and travel in opposite directions. Bus A averages 55 mph and Bus B averages 65 mph. How far apart are they after 2.5 hours?',
      answer:
        'Work: separation rate = 55 + 65 = 120 mph; distance apart = 120 × 2.5 = 300 miles.\nWhy: opposite directions mean add rates before multiplying by time.',
    },
  },
  {
    id: 3,
    name: 'Catch-Up',
    situation: 'Catch-Up',
    keyTrick: 'subtract speeds',
    visual: 'Alice → → → → (45 mph)\nDave → → → → (?)\n\nAlice leaves 30 minutes earlier.',
    formula:
      'relative speed = faster − slower\ncatch-up time = lead distance ÷ relative speed\nor faster speed = slower speed + (lead distance ÷ catch-up time)',
    example: {
      problem:
        'On an ASVAB-style transportation item: Alice leaves a supply point at 7:00 a.m. and drives at a steady 45 mph along the same route Dave will use. Dave leaves at 7:30 a.m. If Dave catches Alice exactly at 10:00 a.m., what average speed must Dave maintain?',
      steps: [
        'Find the head-start time: 7:30 to 7:00 = 0.5 hour. Why: catch-up always starts by measuring how long the first traveler is moving alone.',
        'Compute lead distance: 45 × 0.5 = 22.5 miles. Why: that is how far ahead Alice is when Dave begins.',
        'Compute Dave travel time: 7:30 to 10:00 = 2.5 hours. Why: the question asks for Dave\'s average speed over his own travel interval.',
        'Find needed relative speed: 22.5 ÷ 2.5 = 9 mph. Why: Dave must close 22.5 miles of gap in 2.5 hours.',
        'Convert to Dave\'s full speed: 45 + 9 = 54 mph. Why: Dave must match Alice\'s 45 mph and add 9 mph to erase the lead.',
      ],
      answer: '54 mph',
    },
    shortcut:
      'Shortcut work:\n1) lead distance = 45 × 0.5 = 22.5 miles\n2) needed extra speed = 22.5 ÷ 2.5 = 9 mph\n3) Dave speed = 45 + 9 = 54 mph\nWhy it works: catch-up depends on closing the lead at the relative-speed gap.',
    practice: {
      problem:
        'A delivery van leaves a warehouse at 48 mph. A second van leaves the same warehouse 15 minutes later and travels 60 mph on the same route. Assuming both keep constant speeds, how long after the second van departs will it catch the first van?',
      answer:
        'Work: lead = 48 × (15/60) = 12 miles; relative speed = 60 − 48 = 12 mph; catch-up time = 12 ÷ 12 = 1 hour.\nWhy: the second van only needs to erase the initial 12-mile lead, and it erases that lead at 12 miles per hour.',
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
      problem:
        'A service vehicle drives 120 miles to a base at 60 mph, then returns along the same 120-mile route at 40 mph due to heavier traffic. What is the vehicle\'s average speed for the entire round trip?',
      steps: [
        'Find outbound time: 120 ÷ 60 = 2 hours. Why: time equals distance divided by speed.',
        'Find return time: 120 ÷ 40 = 3 hours. Why: each leg can have different time when speeds differ.',
        'Find total distance: 120 + 120 = 240 miles. Why: round trip includes both legs.',
        'Find total time: 2 + 3 = 5 hours. Why: average speed must use whole-trip time, not one leg.',
        'Compute average speed: 240 ÷ 5 = 48 mph. Why: average speed is total distance divided by total elapsed time.',
      ],
      answer: '48 mph',
    },
    shortcut:
      'Shortcut work (equal-distance round trip):\naverage speed = 2ab/(a + b)\n= 2(60)(40)/(60 + 40)\n= 4800/100 = 48 mph\nWhy it works: this harmonic-mean shortcut already accounts for unequal times on each leg.',
    practice: {
      problem:
        'A driver travels 140 miles to a work site at 70 mph and returns the same 140 miles at 50 mph. What is the average speed for the full trip?',
      answer:
        'Work: time out = 140/70 = 2 hr; time back = 140/50 = 2.8 hr; total distance = 280 miles; total time = 4.8 hr; average speed = 280/4.8 = 58.3 mph (approx).\nWhy: average speed must combine both legs by total distance over total time.',
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
      problem:
        'A patrol boat moves at 20 mph in still water. The river current is 4 mph. What are the boat\'s downstream speed and upstream speed?',
      steps: [
        'Compute downstream speed: 20 + 4 = 24 mph. Why: current helps the boat when moving with the flow.',
        'Compute upstream speed: 20 − 4 = 16 mph. Why: current resists the boat when moving against the flow.',
      ],
      answer: '24 mph downstream, 16 mph upstream',
    },
    shortcut:
      'Shortcut work:\nwith current: effective speed = base + current\nagainst current: effective speed = base − current\nWhy it works: current is a signed adjustment to still-water speed based on direction.',
    practice: {
      problem:
        'A rescue boat has a still-water speed of 18 mph in a river with a 3 mph current. If it travels 42 miles downstream and then 42 miles upstream, how long is the total trip?',
      answer:
        'Work: downstream speed = 18 + 3 = 21 mph, so downstream time = 42/21 = 2 hr; upstream speed = 18 − 3 = 15 mph, so upstream time = 42/15 = 2.8 hr; total time = 4.8 hr.\nWhy: use direction-adjusted speeds first, then compute each leg\'s time before adding.',
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
      problem:
        'A transport vehicle travels for 7 hours at 48 mph. The vehicle gets 21 miles per gallon, and fuel costs $2.82 per gallon. What is the total fuel cost for the trip?',
      steps: [
        'Find trip distance: 48 × 7 = 336 miles. Why: convert speed and time into total miles first.',
        'Convert miles to gallons: 336 ÷ 21 = 16 gallons. Why: mpg tells how many miles each gallon covers.',
        'Find total cost: 16 × 2.82 = $45.12. Why: total dollars equals gallons needed times price per gallon.',
      ],
      answer: '$45.12',
    },
    shortcut:
      'Shortcut work:\ncost = (speed × time ÷ mpg) × price\na.k.a. (48 × 7 ÷ 21) × 2.82 = 16 × 2.82 = $45.12\nWhy it works: it combines the same pipeline steps into one expression.',
    practice: {
      problem:
        'A vehicle travels 60 mph for 4 hours. It averages 24 mpg, and gas costs $3.00 per gallon. What fuel cost should be budgeted for the trip?',
      answer:
        'Work: distance = 60 × 4 = 240 miles; gallons = 240/24 = 10; cost = 10 × $3.00 = $30.\nWhy: budget problems follow the pipeline miles -> gallons -> dollars.',
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
