export interface ReasoningStep {
  step: string;
  why: string;
}

export interface SolvedProblem {
  title: string;
  prompt: string;
  steps: ReasoningStep[];
  answer: string;
}

export const RATIOS_INTRO = {
  headline: '🧠 LEVEL 2 MASTER LESSON: RATIOS & PROPORTIONS',
  tagline: 'The backbone of ASVAB Arithmetic Reasoning.',
  insight:
    'Almost EVERY hard problem in your practice tests (trucks, paint, meals, speed, mixtures) is secretly a ratio problem in disguise.',
  goals: [
    'Understand ratio = relationship between two quantities.',
    'Master proportion = two equal ratios that scale the same way.',
    'Apply the 3 core ASVAB patterns: direct proportion, unit rate, scale factor.',
    'Build speed with drills from simple to elite.',
  ],
};

export const RATIOS_CORE_PRINCIPLE = {
  title: '🔥 PART 1 — CORE PRINCIPLE (INTUITION FIRST)',
  ratioDefinition: 'A ratio = relationship between two quantities',
  ratioThink: 'For every ___, there are ___',
  ratioExamples: ['3 trucks → 24 houses', '3:4 red to blue balls', '1/2 inch → 1 mile'],
  proportionDefinition: 'A proportion = two equal ratios',
  proportionThink: 'This situation scales the same way',
  proportionExample: '3/24 = x/72',
  goldenRule: 'Ratios are scaling machines',
  goldenRuleDetail: 'If one side changes → the other side scales the same way.',
};

export const RATIOS_PATTERNS = [
  {
    title: '🔹 TYPE 1: DIRECT PROPORTION (most common)',
    cue: 'More → More | Less → Less',
    example: '3 trucks → 24 houses | ? trucks → 72 houses',
    tags: ['direct'],
  },
  {
    title: '🔹 TYPE 2: UNIT RATE (hidden ratio)',
    cue: '"per 1" thinking',
    example: '$3.50 per mile | 12 oz per meal | 8 blocks per 30 minutes',
    tags: ['unit-rate'],
  },
  {
    title: '🔹 TYPE 3: SCALE FACTOR',
    cue: 'How many times bigger?',
    example: '24 → 72 = ×3, so trucks also ×3',
    tags: ['scale'],
  },
];

export const RATIOS_WORKED_EXAMPLES: SolvedProblem[] = [
  {
    title: '🟢 Example 1 (Direct Ratio)',
    prompt: '3 trucks → 24 houses | ? trucks → 72 houses',
    steps: [
      {
        step: 'Identify the ratio: 3 trucks serve 24 houses.',
        why: 'The ratio trucks:houses stays constant. More houses need more trucks.',
      },
      {
        step: 'Find scale factor: 72 ÷ 24 = 3',
        why: 'Houses went from 24 to 72 — that is 3 times as many. So we need 3× the trucks.',
      },
      {
        step: 'Apply to trucks: 3 × 3 = 9 trucks',
        why: 'Original trucks (3) × scale factor (3) = 9. The proportion scales both sides the same way.',
      },
    ],
    answer: '9 trucks',
  },
  {
    title: '🟢 Example 2 (Ratio Split)',
    prompt: 'Ratio 3:4 (red:blue), 80 blue balls',
    steps: [
      {
        step: 'Interpret ratio 3:4: For every 4 blue, there are 3 red.',
        why: 'The ratio red:blue = 3:4 means "3 red per 4 blue" — we work in groups of 4 blue.',
      },
      {
        step: 'Count groups: 80 ÷ 4 = 20 groups',
        why: '80 blue balls ÷ 4 blue per group = 20 groups. Each group has the 3:4 relationship.',
      },
      {
        step: 'Red per group: 3 × 20 = 60 red',
        why: 'Each of the 20 groups has 3 red. So total red = 3 × 20 = 60.',
      },
    ],
    answer: '60 red balls',
  },
  {
    title: '🟢 Example 3 (Map Scale)',
    prompt: '1/2 inch → 1 mile | 4.5 inches → ?',
    steps: [
      {
        step: 'Understand the scale: 1/2 inch on map = 1 mile in real life.',
        why: 'So each half-inch represents 1 mile. We need to count how many half-inches are in 4.5.',
      },
      {
        step: 'Convert 1/2 to decimal: 1/2 = 0.5 inch per mile',
        why: 'Easier to divide: 4.5 ÷ 0.5 tells us "how many 0.5s fit in 4.5."',
      },
      {
        step: '4.5 ÷ 0.5 = 9 half-inches → 9 miles',
        why: '9 half-inches on the map, each = 1 mile, so 9 miles in real life.',
      },
    ],
    answer: '9 miles',
  },
];

export interface RatioMentalModel {
  title: string;
  question?: string;
  formula?: string;
  note?: string;
}

export const RATIOS_MENTAL_MODELS: RatioMentalModel[] = [
  {
    title: '🧩 MODEL 1: "PER ONE" (BEST TOOL)',
    question: 'What is ONE unit worth?',
  },
  {
    title: '🧩 MODEL 2: "SCALE FACTOR"',
    question: 'How many times bigger?',
  },
  {
    title: '🧩 MODEL 3: "CROSS MULTIPLY (BACKUP)"',
    formula: 'a/b = c/d ⇒ ad = bc',
    note: 'If stuck, use cross multiply.',
  },
];

export const RATIOS_DRILL_SETS: Array<{
  title: string;
  items: Array<{ problem: string; answer: string; steps: ReasoningStep[] }>;
}> = [
  {
    title: '🔹 SIMPLE DRILLS (build instinct)',
    items: [
      {
        problem: '2 pencils cost $6 → 1 pencil = ?',
        answer: '$3',
        steps: [
          { step: 'Find cost per 1: $6 ÷ 2 = $3', why: 'Total cost ÷ number of items = cost per item. Ratio: 6 dollars for 2 pencils.' },
        ],
      },
      {
        problem: '5 workers → 20 jobs → 1 worker = ?',
        answer: '4 jobs',
        steps: [
          { step: 'Jobs per worker: 20 ÷ 5 = 4', why: 'Total jobs ÷ workers = jobs per worker. "Per one" thinking.' },
        ],
      },
      {
        problem: '10 miles in 2 hours → speed?',
        answer: '5 mph',
        steps: [
          { step: 'Speed = distance ÷ time: 10 ÷ 2 = 5 mph', why: 'Miles per hour = total miles ÷ hours. Rate = quantity ÷ time.' },
        ],
      },
    ],
  },
  {
    title: '🔹 MEDIUM DRILLS (ASVAB style)',
    items: [
      {
        problem: '4 machines make 80 parts → how many machines for 200 parts?',
        answer: '10 machines',
        steps: [
          { step: 'Parts per machine: 80 ÷ 4 = 20 parts/machine', why: 'Find the unit rate first — how many parts does 1 machine make?' },
          { step: 'Scale factor: 200 ÷ 80 = 2.5', why: 'We need 2.5× more parts, so we need 2.5× more machines.' },
          { step: 'Machines: 4 × 2.5 = 10', why: 'Apply scale to machines. Same ratio: more parts → more machines.' },
        ],
      },
      {
        problem: '6 gallons lasts 3 days → how long will 20 gallons last?',
        answer: '10 days',
        steps: [
          { step: 'Usage rate: 6 gal ÷ 3 days = 2 gal/day', why: 'Gallons per day = total gallons ÷ days. This is the consumption rate.' },
          { step: 'Days from 20 gal: 20 ÷ 2 = 10 days', why: 'Total supply ÷ daily rate = how many days it lasts.' },
        ],
      },
      {
        problem: '12 oz → 3 meals → 60 oz → ?',
        answer: '15 meals',
        steps: [
          { step: 'Oz per meal: 12 ÷ 3 = 4 oz/meal', why: '12 oz feeds 3 meals, so each meal uses 4 oz. Unit rate.' },
          { step: 'Meals from 60 oz: 60 ÷ 4 = 15 meals', why: 'Total oz ÷ oz per meal = number of meals.' },
        ],
      },
    ],
  },
  {
    title: '🔹 HARD DRILLS (multi-step)',
    items: [
      {
        problem: 'A truck carries 2 tons feeding 50 people for 5 days → how many people for 10 days?',
        answer: '25 people',
        steps: [
          { step: 'Same food, double the time (5 → 10 days).', why: 'The truck supply is fixed. If we feed people for twice as long, we can feed half as many.' },
          { step: 'People: 50 ÷ 2 = 25', why: 'Inverse relationship: more days → fewer people. 10 days is 2× longer, so ½ the people.' },
        ],
      },
      {
        problem: '8 workers build a fence in 6 days → how many workers for 3 days?',
        answer: '16 workers',
        steps: [
          { step: 'Half the time (6 → 3 days) needs double the workers.', why: 'Same job, half the time. More workers = less time. Inverse proportion.' },
          { step: 'Workers: 8 × 2 = 16', why: '8 workers for 6 days. For 3 days (½ the time), we need 2× workers = 16.' },
        ],
      },
    ],
  },
  {
    title: '🔥 ELITE DRILLS (ASVAB HARD MODE)',
    items: [
      {
        problem: 'FEMA: Breakfast 12 oz, lunch 18 oz, dinner 18 oz. Truck = 3 tons for 10 days. How many people?',
        answer: '200 people',
        steps: [
          { step: 'Oz per person per day: 12 + 18 + 18 = 48 oz', why: 'Each resident gets 3 meals. Add breakfast + lunch + dinner to get daily need.' },
          { step: 'Oz per person for 10 days: 48 × 10 = 480 oz', why: 'Daily need × 10 days = total oz needed per person for the full period.' },
          { step: 'Convert truck to oz: 3 tons × 2000 lb/ton = 6000 lb', why: '1 ton = 2000 lb. We must convert to match the consumption unit (oz).' },
          { step: '6000 lb × 16 oz/lb = 96,000 oz', why: '1 lb = 16 oz. 6000 × 16 = 96,000 oz total supply.' },
          { step: 'People: 96,000 ÷ 480 = 200', why: 'Total supply ÷ supply per person = number of full people supported.' },
        ],
      },
      {
        problem: 'A car travels 60 miles in 1.5 hours. How far in 5 hours?',
        answer: '200 miles',
        steps: [
          { step: 'Speed: 60 ÷ 1.5 = 40 mph', why: 'Distance ÷ time = speed. 60 miles in 1.5 hours = 40 miles per hour.' },
          { step: 'Distance in 5 hr: 40 × 5 = 200 miles', why: 'Speed × time = distance. Same rate, 5 hours instead of 1.5.' },
        ],
      },
      {
        problem: '3 pipes fill a tank in 6 hours. How long for 6 pipes?',
        answer: '3 hours',
        steps: [
          { step: '6 pipes = 2× the pipes (3 → 6).', why: 'Twice as many pipes fill twice as fast. Inverse: more pipes → less time.' },
          { step: 'Time: 6 ÷ 2 = 3 hours', why: 'Double the pipes = half the time. 6 hours ÷ 2 = 3 hours.' },
        ],
      },
    ],
  },
];

export const RATIOS_STRATEGY = {
  title: '🧠 PART 6 — TEST STRATEGY (THIS IS KEY)',
  insight: 'Most AR questions are: disguised ratios, multi-step scaling, unit conversions + ratios combined.',
  fastMethod: ['1. Identify ratio', '2. Find scale factor', '3. Apply once', '4. DONE'],
  commonTraps: [
    '❌ Mixing units (feet vs yards)',
    '❌ Not scaling BOTH sides',
    '❌ Overcomplicating with equations',
  ],
};

export const RATIOS_FINAL_FRAMEWORK = {
  title: '🧭 FINAL FRAMEWORK (MEMORIZE THIS)',
  steps: [
    { step: 'STEP 1', question: 'What is the ratio?' },
    { step: 'STEP 2', question: 'What changed?' },
    { step: 'STEP 3', question: 'Scale it' },
  ],
  closing: 'Arithmetic Reasoning becomes predictable.',
};
