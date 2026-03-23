import type { ReasoningStep, SolvedProblem } from './ratiosProportionsContent';

export type { SolvedProblem };

export const RATE_QUANTITY_INTRO = {
  headline: '⚡ LEVEL 2 — RATE × QUANTITY (MASTER SYSTEM)',
  tagline: 'Alright Chien — this is where your Arithmetic Reasoning game becomes ELITE.',
  insight:
    "We're going to build this like a system you can reuse for ANY ASVAB problem.",
  goals: [
    'Lock in Total = Rate × Quantity and the three rearranged forms.',
    'Recognize the five ASVAB pattern families (cost, pay, speed, production, cycles).',
    'Run the four-step master method: rate → quantity → match units → apply formula.',
    'Build speed with drills from easy through elite.',
  ],
};

export const RATE_QUANTITY_CORE = {
  title: '🔥 CORE IDEA (Lock This In)',
  coreIdeaLead: '👉 Every ASVAB rate problem is THIS:',
  coreFormula: 'Total = Rate × Quantity',
  threeFormsTitle: '🧠 THE 3 FORMS (You MUST be fluent)',
  threeForms: [
    'Total = Rate × Quantity',
    'Rate = Total ÷ Quantity',
    'Quantity = Total ÷ Rate',
  ],
  triangleTitle: '👉 This is your triangle:',
  triangleArt: `        Total
      /       \\
   Rate     Quantity`,
  triangleMantras: ['Cover one → divide', 'Want one → divide', 'Have both → multiply'],
};

export const RATE_QUANTITY_PATTERNS = [
  {
    title: '🔴 Pattern 1 — Cost Problems',
    bullets: ['$ per item', '$ per mile', '$ per hour'],
    exampleLead: '👉 Example from your test:',
    exampleLines: ['Tow truck: $3.50 per mile × 12 miles', 'Answer: $42'],
  },
  {
    title: '🔴 Pattern 2 — Work / Pay',
    bullets: ['$/hour', 'pages/hour', 'words per payment'],
    exampleLead: '👉 Example:',
    exampleLines: ['Writer earns $3 per 300 words'],
  },
  {
    title: '🔴 Pattern 3 — Speed / Motion',
    bullets: ['mph', 'km/h'],
    exampleLead: '👉 Example:',
    exampleLines: ['75 km/h → convert to mph'],
  },
  {
    title: '🔴 Pattern 4 — Production / Rates',
    bullets: ['machines', 'workers', 'printing cards'],
    exampleLead: '👉 Example:',
    exampleLines: ['printing cost vs selling price'],
  },
  {
    title: '🔴 Pattern 5 — Time Cycles',
    bullets: ['every X minutes', 'per day', 'per week'],
    exampleLead: '👉 Example:',
    exampleLines: ['checking email every 80 minutes'],
  },
];

export const RATE_QUANTITY_PATTERN_SECTION_INTRO =
  'From your practice tests, these show up constantly:';

export const RATE_QUANTITY_MASTER_METHOD = {
  title: '🧠 MASTER METHOD (THIS IS YOUR WEAPON)',
  subtitle: '⚡ STEP-BY-STEP SYSTEM',
  steps: [
    {
      title: '1. IDENTIFY THE RATE',
      body: '👉 "per" = divide',
    },
    {
      title: '2. IDENTIFY THE QUANTITY',
      body: '👉 how many units?',
    },
    {
      title: '3. MATCH UNITS',
      body: '🚨 MOST IMPORTANT RULE',
      bullets: ['miles with miles', 'hours with hours', 'words with words'],
    },
    {
      title: '4. APPLY FORMULA',
      body: '👉 Multiply or divide cleanly',
    },
  ],
};

export const RATE_QUANTITY_WORKED_EXAMPLES: SolvedProblem[] = [
  {
    title: '🟢 Example 1 — EASY',
    prompt: 'Apples cost $2.50 per pound. 4 pounds?',
    steps: [
      {
        step: 'Rate = 2.50',
        why: 'Dollars per pound is the cost rate.',
      },
      {
        step: 'Quantity = 4',
        why: 'You are buying 4 pounds — that is the quantity at that rate.',
      },
      {
        step: 'Total = 2.50 × 4 = 10',
        why: 'Total = Rate × Quantity. Same units: dollars for pounds.',
      },
    ],
    answer: '$10',
  },
  {
    title: '🟡 Example 2 — ASVAB STYLE',
    prompt: 'Tow truck: $3.50 per mile × 12 miles',
    steps: [
      {
        step: 'Rate = 3.50',
        why: 'Cost per mile is the rate.',
      },
      {
        step: 'Quantity = 12',
        why: '12 miles is how many units you traveled at that rate.',
      },
      {
        step: 'Total = 3.50 × 12 = 42',
        why: 'Multiply rate × quantity for total cost. ✔️ EXACT ASVAB problem.',
      },
    ],
    answer: '$42',
  },
  {
    title: '🟡 Example 3 — FIND RATE',
    prompt: '$12 for 3 items → price per item?',
    steps: [
      {
        step: 'Rate = Total ÷ Quantity',
        why: 'You want dollars per one item — divide total cost by number of items.',
      },
      {
        step: 'Rate = 12 ÷ 3 = 4',
        why: '$12 split across 3 items → $4 per item.',
      },
    ],
    answer: '$4 per item',
  },
  {
    title: '🔵 Example 4 — TIME RATE',
    prompt: '8 blocks in 30 minutes → 6 blocks?',
    steps: [
      {
        step: 'Step 1: Rate — 8 blocks / 30 min',
        why: 'The situation links blocks to minutes; keep that relationship.',
      },
      {
        step: 'Step 2: Use proportion — 6 blocks → ?',
        why: 'Fewer blocks should take proportionally less time.',
      },
      {
        step: '6/8 = x/30',
        why: 'Scale time the same way blocks scale: 6 is 6/8 of 8.',
      },
      {
        step: 'x = 22.5 minutes',
        why: 'Cross multiply: 6 × 30 ÷ 8 = 22.5. ✔️ Appears in your test.',
      },
    ],
    answer: '22.5 minutes',
  },
  {
    title: '🔵 Example 5 — UNIT CONVERSION RATE',
    prompt: '75 km/h → mph',
    steps: [
      {
        step: 'Use conversion: 1 km ≈ 0.62 miles',
        why: 'Speed in km/h must become miles per hour — convert the distance unit.',
      },
      {
        step: '75 × 0.62 ≈ 46.5 ≈ 47 mph',
        why: 'Each hour you travel 75 km; multiply by miles per km. ✔️ Test pattern.',
      },
    ],
    answer: '≈ 47 mph',
  },
  {
    title: '🔴 Example 6 — ADVANCED (WORDS RATE)',
    prompt: '$3 per 300 words → 760 words',
    steps: [
      {
        step: 'Step 1: unit rate — 3 / 300 = 0.01 per word',
        why: 'Divide pay by words to get dollars per word.',
      },
      {
        step: 'Step 2: multiply — 0.01 × 760 = $7.60',
        why: 'Total = rate per word × word count. ✔️ EXACT test problem.',
      },
    ],
    answer: '$7.60',
  },
];

export interface RateQuantityMentalModel {
  title: string;
  question?: string;
  formula?: string;
  note?: string;
}

export const RATE_QUANTITY_MENTAL_MODELS: RateQuantityMentalModel[] = [
  {
    title: '🧩 MODEL: The triangle',
    formula: RATE_QUANTITY_CORE.triangleArt,
    note: 'Cover one → divide. Want one → divide. Have both → multiply.',
  },
  {
    title: '🧩 MODEL: "per" language',
    question: '"Per" signals a rate — often found by dividing total by how many.',
  },
  {
    title: '🧩 MODEL: Unit matching',
    question: 'Before you multiply or divide, are miles with miles, hours with hours?',
  },
];

export const RATE_QUANTITY_DRILL_SETS: Array<{
  title: string;
  items: Array<{ problem: string; answer: string; steps: ReasoningStep[] }>;
}> = [
  {
    title: '🟢 EASY DRILLS',
    items: [
      {
        problem: '$5 per item × 6 items = ?',
        answer: '$30',
        steps: [
          {
            step: 'Total = 5 × 6 = 30',
            why: 'Rate × quantity = total cost.',
          },
        ],
      },
      {
        problem: '10 miles at $2/mile = ?',
        answer: '$20',
        steps: [
          {
            step: 'Total = 2 × 10 = 20',
            why: 'Dollars per mile × miles = total dollars.',
          },
        ],
      },
      {
        problem: '4 hours at $12/hour = ?',
        answer: '$48',
        steps: [
          {
            step: 'Total = 12 × 4 = 48',
            why: 'Pay rate × hours worked = total pay.',
          },
        ],
      },
    ],
  },
  {
    title: '🟡 MEDIUM',
    items: [
      {
        problem: '15 items cost $45 → cost per item?',
        answer: '$3 per item',
        steps: [
          {
            step: 'Rate = 45 ÷ 15 = 3',
            why: 'Total ÷ quantity = cost per item.',
          },
        ],
      },
      {
        problem: '120 miles in 3 hours → speed?',
        answer: '40 mph',
        steps: [
          {
            step: 'Speed = 120 ÷ 3 = 40 mph',
            why: 'Distance ÷ time = miles per hour.',
          },
        ],
      },
      {
        problem: '$18/hour × 35 hours = ?',
        answer: '$630',
        steps: [
          {
            step: 'Total = 18 × 35 = 630',
            why: 'Hourly rate × hours = total pay.',
          },
        ],
      },
    ],
  },
  {
    title: '🔵 HARD (ASVAB LEVEL)',
    items: [
      {
        problem: 'A worker produces 240 parts in 8 hours. How many in 5 hours?',
        answer: '150 parts',
        steps: [
          {
            step: 'Rate = 240 ÷ 8 = 30 parts per hour',
            why: 'Parts ÷ hours = production rate.',
          },
          {
            step: '30 × 5 = 150 parts',
            why: 'Rate × hours = parts made.',
          },
        ],
      },
      {
        problem: 'A machine makes 18 units every 6 minutes. How many in 20 minutes?',
        answer: '60 units',
        steps: [
          {
            step: 'Rate = 18 ÷ 6 = 3 units per minute',
            why: 'Units ÷ minutes = units per minute.',
          },
          {
            step: '3 × 20 = 60 units',
            why: 'Rate × minutes = total units.',
          },
        ],
      },
      {
        problem: 'A car travels 150 miles using 5 gallons. Find mpg.',
        answer: '30 mpg',
        steps: [
          {
            step: 'mpg = 150 ÷ 5 = 30',
            why: 'Miles per gallon = miles ÷ gallons.',
          },
        ],
      },
    ],
  },
  {
    title: '🔴 ELITE (REAL ASVAB THINKING)',
    items: [
      {
        problem:
          'A printer costs $0.18 per card and sells for $0.30. Overhead = $6000. How many cards to break even?',
        answer: '50,000 cards',
        steps: [
          {
            step: 'Profit per card = 0.30 − 0.18 = 0.12',
            why: 'Each card earns selling price minus cost.',
          },
          {
            step: 'Cards to cover overhead = 6000 ÷ 0.12 = 50,000',
            why: 'Total fixed cost ÷ profit per unit = break-even count. 👉 THIS is from your exam.',
          },
        ],
      },
      {
        problem:
          'A person works: Mon & Thu: 10am–12pm, 1pm–7pm. Sat: 9am–12pm. $1/hour → weekly pay?',
        answer: '$19',
        steps: [
          {
            step: 'Mon: (12−10) + (19−13) = 2 + 6 = 8 hours',
            why: 'Morning block + afternoon block on one weekday.',
          },
          {
            step: 'Thu: same schedule → 8 hours',
            why: 'Same hours as Monday.',
          },
          {
            step: 'Sat: 12 − 9 = 3 hours',
            why: 'Saturday morning only.',
          },
          {
            step: 'Total hours = 8 + 8 + 3 = 19 → Pay = $19',
            why: '$1/hour × total hours. ✔️ multi-time rate problem.',
          },
        ],
      },
      {
        problem: 'Email every 80 minutes in 8-hour shift. How many times?',
        answer: '6 times',
        steps: [
          {
            step: '8 hours = 8 × 60 = 480 minutes',
            why: 'Convert shift length to minutes to match the cycle.',
          },
          {
            step: '480 ÷ 80 = 6',
            why: 'How many 80-minute intervals fit in the shift. ✔️ cycle rate.',
          },
        ],
      },
    ],
  },
];

export const RATE_QUANTITY_SPEED_SECTION = {
  title: '⚡ SPEED DRILLS (CRITICAL FOR ASVAB)',
  subtitle: 'You should be able to answer these in <10 sec:',
};

export const RATE_QUANTITY_SPEED_DRILLS: Array<{ problem: string; answer: string }> = [
  { problem: '$4 × 25 = ?', answer: '$100' },
  { problem: '300 ÷ 3 = ?', answer: '100' },
  { problem: '60 ÷ 4 = ?', answer: '15' },
  { problem: '5 × 18 = ?', answer: '90' },
  { problem: '120 ÷ 6 = ?', answer: '20' },
];

export const RATE_QUANTITY_TRAPS = [
  {
    title: '❌ Trap 1: Ignoring Units',
    body: 'Mixing hours and minutes',
  },
  {
    title: '❌ Trap 2: Not Converting First',
    body: 'Feet vs yards\nkm vs miles',
  },
  {
    title: '❌ Trap 3: Overthinking',
    body: 'Most are simple multiplication',
  },
  {
    title: '❌ Trap 4: Hidden Rate',
    body: 'Sometimes rate is IMPLIED\n\nExample:\n"every 80 minutes" → that IS the rate',
  },
];

export const RATE_QUANTITY_STRATEGY = {
  title: '🧠 FINAL STRATEGY (MEMORIZE THIS)',
  insight: '👉 When you see ANY problem:',
  steps: [
    'Find "per" → RATE',
    'Find how many → QUANTITY',
    'Match units',
    'Multiply or divide',
  ],
};
