import type { ReasoningStep, SolvedProblem } from './ratiosProportionsContent';

export type { SolvedProblem };

export const AVERAGES_INTRO = {
  headline: '⚡ LEVEL 2 — AVERAGES (MEAN) MASTER SYSTEM',
  tagline: 'Visual. Pattern-based. Fast.',
  insight:
    'On the ASVAB you are usually not “doing averages” — you are solving a total problem. Lock in Total = Average × Count.',
  goals: [
    'Mean = fair share: add everything, split evenly.',
    'Fluency: Average = Total ÷ Count and Total = Average × Count (the power move).',
    'Missing score: Target total − current sum.',
    'Drill easy → elite, including classic “average changed after one more test” traps.',
  ],
};

export const AVERAGES_CORE = {
  title: '🔥 MASTER FORMULAS (LOCK THESE IN)',
  coreIdeaLead: '👉 Two equations cover almost everything:',
  coreFormula: 'Average = Total ÷ Count\n\nTotal = Average × Count   ← ASVAB power move',
  threeFormsTitle: '🧠 HOW TO THINK ON THE TEST',
  threeForms: [
    'Find an average → add known values, divide by how many.',
    'Find a missing value to hit a target average → use Total = Avg × Count.',
    'Missing = (Target average × total count) − current sum.',
  ],
  triangleTitle: '👉 Elite mantra',
  triangleArt: `👉 AVERAGE = FAIR SHARE

👉 THE TEST CARES ABOUT TOTALS

Target total = Avg × Count
Missing = Target total − Current sum`,
  triangleMantras: [
    'What total do I NEED?',
    'What total do I HAVE?',
    'Subtract → what’s missing?',
  ],
};

export const AVERAGES_PATTERNS = [
  {
    title: '🎯 Pattern — Find the average (mean)',
    bullets: ['Add all values', 'Divide by how many there are'],
    exampleLead: '👉 Example:',
    exampleLines: ['Scores 70, 80, 90 → sum 240 → 240 ÷ 3 = 80'],
  },
  {
    title: '🎯 Pattern — Missing value to hit a target average',
    bullets: [
      'Target total = target average × total count (including the missing one)',
      'Missing = target total − sum of what you already have',
    ],
    exampleLead: '👉 Example (ASVAB style):',
    exampleLines: [
      'Scores 85, 90, 88; want average 88 on 4 tests',
      'Target total = 88 × 4 = 352; current sum = 263; missing = 352 − 263 = 89',
    ],
  },
];

export const AVERAGES_PATTERN_SECTION_INTRO =
  'Recognize which game you are playing — plain mean vs. target-total missing value.';

export const AVERAGES_MASTER_METHOD = {
  title: '🧠 STEP-BY-STEP SYSTEM (USE EVERY TIME)',
  subtitle: '⚡ THREE STEPS',
  steps: [
    {
      title: '1. ADD WHAT YOU HAVE',
      body: '👉 Sum every score, dollar amount, lap time, etc. you already know.',
    },
    {
      title: '2. FIND TARGET TOTAL',
      body: '👉 Target total = (target average) × (total number of values after the new one).',
    },
    {
      title: '3. SUBTRACT',
      body: '👉 Missing value = target total − current sum. For a plain average, skip step 2 and divide the sum by count.',
    },
  ],
};

export const AVERAGES_WORKED_EXAMPLES: SolvedProblem[] = [
  {
    title: '🟢 Example 1 — Plain average',
    prompt: 'Average of 70, 80, and 90?',
    steps: [
      {
        step: 'Sum = 70 + 80 + 90 = 240',
        why: 'Add every value before splitting.',
      },
      {
        step: 'Average = 240 ÷ 3 = 80',
        why: 'Mean = total ÷ count (3 scores).',
      },
    ],
    answer: '80',
  },
  {
    title: '🟡 Example 2 — Missing test score (classic)',
    prompt: 'Scores 85, 90, 88. What score on the 4th test for an average of 88?',
    steps: [
      {
        step: 'Current sum = 85 + 90 + 88 = 263',
        why: 'Add what you already have.',
      },
      {
        step: 'Target total = 88 × 4 = 352',
        why: 'Total = average × count — you need 352 points across 4 tests.',
      },
      {
        step: 'Missing = 352 − 263 = 89',
        why: 'What you need minus what you have is the next score.',
      },
    ],
    answer: '89',
  },
  {
    title: '🟡 Example 3 — Jenny (word problem)',
    prompt: 'Grades 93, 89, 96, 98. Target average 95. What is needed on the next test?',
    steps: [
      {
        step: 'Current sum = 93 + 89 + 96 + 98 = 376',
        why: 'Four known grades.',
      },
      {
        step: 'Target total = 95 × 5 = 475',
        why: 'Five tests total at average 95.',
      },
      {
        step: 'Missing = 475 − 376 = 99',
        why: 'Next test score to reach the target total.',
      },
    ],
    answer: '99',
  },
  {
    title: '🔵 Example 4 — Grocery average (decimals)',
    prompt: 'Monthly totals $120.37, $108.45, $114.86. Average monthly spending?',
    steps: [
      {
        step: 'Sum = 120.37 + 108.45 + 114.86 = 343.68',
        why: 'Add the three months.',
      },
      {
        step: 'Average = 343.68 ÷ 3 = 114.56',
        why: 'Divide by 3 months.',
      },
    ],
    answer: '$114.56',
  },
  {
    title: '🔴 Example 5 — ASVAB trap: average after 4, then after 5',
    prompt:
      'A student’s average after 4 tests is 86. After a 5th test, the average is 88. What was the 5th score?',
    steps: [
      {
        step: 'Total after 4 = 86 × 4 = 344',
        why: 'Total = average × count — no raw scores needed.',
      },
      {
        step: 'Total after 5 = 88 × 5 = 440',
        why: 'New average × new count.',
      },
      {
        step: '5th score = 440 − 344 = 96',
        why: 'The increase in total is exactly the new test score.',
      },
    ],
    answer: '96',
  },
];

export interface AveragesMentalModel {
  title: string;
  question?: string;
  formula?: string;
  note?: string;
}

export const AVERAGES_MENTAL_MODELS: AveragesMentalModel[] = [
  {
    title: '🧩 MODEL: Fair share',
    question: 'Average is “split the total evenly across everyone.”',
  },
  {
    title: '🧩 MODEL: Total first',
    formula: 'Target total = Avg × Count\nMissing = Target − Current sum',
    note: 'Most ASVAB “average” word problems are really this.',
  },
  {
    title: '🧩 MODEL: Five-year-old version',
    note: 'You need a certain total points. You already have some. How many more points do you need? That’s the missing score.',
  },
];

export const AVERAGES_DRILL_SETS: Array<{
  title: string;
  items: Array<{ problem: string; answer: string; steps: ReasoningStep[] }>;
}> = [
  {
    title: '🟢 LEVEL 1 — EASY (build speed)',
    items: [
      {
        problem: 'A student scores 72, 78, and 80 on three tests. What is the average?',
        answer: '76⅔ (or ≈ 76.67)',
        steps: [
          { step: 'Sum = 72 + 78 + 80 = 230', why: 'Add all scores.' },
          { step: 'Average = 230 ÷ 3', why: 'Three tests → divide by 3.' },
        ],
      },
      {
        problem: 'Three friends spend $12, $15, and $18 on lunch. Average spent?',
        answer: '$15',
        steps: [
          { step: 'Sum = 12 + 15 + 18 = 45', why: 'Total dollars.' },
          { step: '45 ÷ 3 = 15', why: 'Average for 3 people.' },
        ],
      },
      {
        problem: 'Lap times 60 s, 66 s, 54 s. Average lap time?',
        answer: '60 seconds',
        steps: [
          { step: 'Sum = 60 + 66 + 54 = 180', why: 'Total seconds.' },
          { step: '180 ÷ 3 = 60', why: 'Mean of three laps.' },
        ],
      },
    ],
  },
  {
    title: '🟡 LEVEL 2 — MEDIUM (missing value)',
    items: [
      {
        problem: 'Scores 84, 88, 90. What score on test 4 for an average of 88?',
        answer: '90',
        steps: [
          { step: 'Current sum = 262', why: '84 + 88 + 90.' },
          { step: 'Target total = 88 × 4 = 352', why: 'Four tests at 88 average.' },
          { step: 'Missing = 352 − 262 = 90', why: 'Target minus current.' },
        ],
      },
      {
        problem: 'Earnings $500, $650, $550 over three weeks. Week 4 amount for a $600 average?',
        answer: '$700',
        steps: [
          { step: 'Current sum = 1700', why: '500 + 650 + 550.' },
          { step: 'Target = 600 × 4 = 2400', why: 'Four weeks at $600 avg.' },
          { step: '2400 − 1700 = 700', why: 'Fourth week must be $700.' },
        ],
      },
      {
        problem: 'Points 18, 22, 20, 24 in four games. Points in game 5 for a 21 average?',
        answer: '21',
        steps: [
          { step: 'Current sum = 84', why: 'Sum of four games.' },
          { step: 'Target = 21 × 5 = 105', why: 'Five games at 21 ppg.' },
          { step: '105 − 84 = 21', why: 'Fifth game score.' },
        ],
      },
    ],
  },
  {
    title: '🔴 LEVEL 3 — HARD (word tricks)',
    items: [
      {
        problem:
          'Production: 120, 135, 150, 145 units over four days. Five-day average is 140. How many units on day 5?',
        answer: '150',
        steps: [
          { step: 'Current sum = 550', why: '120 + 135 + 150 + 145.' },
          { step: 'Target total = 140 × 5 = 700', why: 'Five days at 140 average.' },
          { step: '700 − 550 = 150', why: 'Day 5 production.' },
        ],
      },
      {
        problem:
          'Average after 4 tests is 86. After a 5th test, average is 88. Score on the 5th test?',
        answer: '96',
        steps: [
          { step: 'Total after 4 = 86 × 4 = 344', why: 'Use average × count.' },
          { step: 'Total after 5 = 88 × 5 = 440', why: 'New situation.' },
          { step: '440 − 344 = 96', why: 'Fifth score.' },
        ],
      },
    ],
  },
  {
    title: '🔥 LEVEL 4 — ELITE',
    items: [
      {
        problem:
          'Driver averages 50 miles/day over 6 days. After 7 days, average is 54 mi/day. Miles on day 7?',
        answer: '78 miles',
        steps: [
          { step: 'Total first 6 = 50 × 6 = 300', why: 'Average × days.' },
          { step: 'Total 7 days = 54 × 7 = 378', why: 'New average × 7.' },
          { step: 'Day 7 = 378 − 300 = 78', why: 'Difference is seventh day.' },
        ],
      },
      {
        problem:
          'A student wants an average of 90 across 6 tests. After 5 tests the scores are 88, 92, 85, 91, and 87. The teacher drops the lowest score before calculating the average. What score is needed on the 6th test to achieve a 90 average?',
        answer: '92',
        steps: [
          {
            step: 'After 6 tests, one score is dropped → the final average uses 5 scores.',
            why: 'Count what actually goes into the mean: 6 − 1 = 5.',
          },
          {
            step: 'Target sum of the 5 kept scores = 90 × 5 = 450.',
            why: 'Total = average × count for the scores that count.',
          },
          {
            step: 'Sum of the five known tests = 88 + 92 + 85 + 91 + 87 = 443.',
            why: 'Add everything you have before the sixth test.',
          },
          {
            step: 'Let x = 6th test. Total of all six = 443 + x. If the minimum stays 85 (true when x ≥ 85), sum after dropping the low = (443 + x) − 85 = 358 + x.',
            why: 'The dropped score is the smallest of the six; here 85 stays lowest if x is not below 85.',
          },
          {
            step: '358 + x = 450 → x = 92.',
            why: 'Set kept sum equal to target.',
          },
          {
            step: 'Check: with 92, the six scores are 88, 92, 85, 91, 87, 92 — lowest is still 85; (443 + 92 − 85) ÷ 5 = 450 ÷ 5 = 90.',
            why: 'If x were below 85, you would drop x instead and could not reach 90 from the remaining sum of 443.',
          },
        ],
      },
    ],
  },
];

export const AVERAGES_SPEED_SECTION = {
  title: '⚡ SPEED DRILLS (MENTAL MATH)',
  subtitle: 'Quick totals and divisions you should recognize fast:',
};

export const AVERAGES_SPEED_DRILLS: Array<{ problem: string; answer: string }> = [
  { problem: '70 + 80 + 90 = ?', answer: '240' },
  { problem: '240 ÷ 3 = ?', answer: '80' },
  { problem: '88 × 4 = ?', answer: '352' },
  { problem: '95 × 5 = ?', answer: '475' },
  { problem: '86 × 4 = ?', answer: '344' },
  { problem: '88 × 5 = ?', answer: '440' },
];

export const AVERAGES_TRAPS = [
  {
    title: '❌ Trap 1: Wrong count',
    body: 'Use the total number of tests/items AFTER the missing one is included.\n\nExample: “4th test” means divide by 4 for the target total, not 3.',
  },
  {
    title: '❌ Trap 2: Dividing when you need a total',
    body: 'If the question asks what score is needed to reach an average, start with Total = Avg × Count — not another round of division.',
  },
  {
    title: '❌ Trap 3: No raw scores given',
    body: '“Average after 4 is 86” still gives total = 86 × 4. You do not need the individual grades.',
  },
  {
    title: '❌ Trap 4: Dropped scores or special rules',
    body: 'If one score is dropped or only certain tests count, rebuild the sum and the count before using the target-total method.',
  },
];

export const AVERAGES_STRATEGY = {
  title: '🧠 FINAL SIMPLIFICATION (MEMORIZE)',
  insight: '👉 On almost every ASVAB average problem:',
  steps: [
    'Find current total (sum of known values).',
    'Find target total (average you want × final count).',
    'Subtract → missing piece (or divide for plain mean).',
  ],
};
