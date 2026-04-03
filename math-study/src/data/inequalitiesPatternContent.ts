/**
 * Inequalities master lesson — content from 2-arithmetic-reasoning/inequalities.md
 * (student-facing from LEVEL 6; author meta openers/closers omitted).
 */

export interface InequalitySymbolRow {
  symbol: string;
  meaning: string;
  memoryTrick: string;
}

export interface TranslationRow {
  words: string;
  math: string;
}

export interface IneqPrincipleBlock {
  id: number;
  sectionTitle: string;
  translationRows?: TranslationRow[];
  keyBullets?: string[];
  visual: string;
  example: {
    title: string;
    setupLines?: string[];
    work: string;
    answer: string;
  };
  practice: Array<{ id: string; lines: string[]; answer: string }>;
}

export interface IneqDrill {
  id: string;
  title: string;
  storyLines: string[];
  work: string;
  answer: string;
}

export interface IneqExamPattern {
  id: number;
  title: string;
  problem: string;
  solutionLines: string[];
  answer: string;
}

export const INEQ_INTRO = {
  headline: 'LEVEL 6 — INEQUALITIES (ASVAB MASTER LESSON)',
  tagline: 'Profit, break-even, and “minimum quantity” are inequality thinking under word-problem disguise.',
  insight:
    'Not exact: you are finding a range or the smallest whole number that crosses a threshold. Revenue > cost for profit; revenue = cost for break-even; strict “more than” means round up to the next integer.',
  goals: [
    'Read >, <, ≥, ≤ instantly and map “more than / at least” to the right symbol.',
    'Set up revenue and cost with overhead, then solve the inequality for x.',
    'Separate break-even (=) from profit (>) so you do not pick the wrong threshold.',
    'When x > n is not an integer, the ASVAB answer is often the next whole number (round up).',
    'For “least cost,” compare total price to cover the needed amount (containers, packs), not just unit price.',
    'Strip long stories to: selling price → revenue, per-unit cost + fixed cost → cost, then translate words to >, ≥, or =.',
  ],
} as const;

export const INEQ_SYMBOLS: InequalitySymbolRow[] = [
  { symbol: '>', meaning: 'greater than', memoryTrick: '"more than"' },
  { symbol: '<', meaning: 'less than', memoryTrick: '"less than"' },
  { symbol: '≥', meaning: 'at least', memoryTrick: 'includes the number' },
  { symbol: '≤', meaning: 'at most', memoryTrick: 'includes the number' },
];

export const INEQ_TRANSLATION_CHEATSHEET: TranslationRow[] = [
  { words: 'more than', math: '>' },
  { words: 'greater than', math: '>' },
  { words: 'at least', math: '≥' },
  { words: 'no less than', math: '≥' },
];

export const INEQ_PRINCIPLES: IneqPrincipleBlock[] = [
  {
    id: 1,
    sectionTitle: 'PRINCIPLE 1 — “MORE THAN” = STRICTLY GREATER',
    translationRows: INEQ_TRANSLATION_CHEATSHEET,
    visual: `Profit needed: > 30

|----|----|----|----|----|----|
  0   10   20   30   40

We must go PAST 30 → not equal → NEXT number`,
    example: {
      title: 'EXAMPLE 1',
      setupLines: ['Selling price = $5', 'Cost = $2', 'Profit per item = $3', 'Want: profit > $30'],
      work: `3x > 30
x > 10`,
      answer: '11 items',
    },
    practice: [
      {
        id: 'p1-a',
        lines: ['Profit per item = $4', 'Want more than $20'],
        answer: '4x > 20 → x > 5 → 6',
      },
      {
        id: 'p1-b',
        lines: ['Profit per item = $6', 'Want more than $50'],
        answer: '6x > 50 → x > 8.33 → 9',
      },
    ],
  },
  {
    id: 2,
    sectionTitle: 'PRINCIPLE 2 — BREAK-EVEN VS PROFIT',
    keyBullets: ['Break-even → Revenue = Cost', 'Profit → Revenue > Cost'],
    visual: `Revenue line must CROSS cost line

Profit zone →
       /
      /
     /   ← revenue
----/---------
   /
  /
 cost`,
    example: {
      title: 'EXAMPLE 2',
      setupLines: ['Overhead = $1000', 'Cost per item = $3', 'Sell = $5'],
      work: `Revenue = 5x
Cost = 1000 + 3x

5x > 1000 + 3x
2x > 1000
x > 500`,
      answer: '501 items',
    },
    practice: [
      {
        id: 'p2-a',
        lines: ['Overhead = 200', 'Cost = 4', 'Sell = 6', 'Profit?'],
        answer: '6x > 200 + 4x → 2x > 200 → x > 100 → 101',
      },
      {
        id: 'p2-b',
        lines: ['Overhead = 500', 'Cost = 2', 'Sell = 5'],
        answer: '5x > 500 + 2x → 3x > 500 → x > 166.67 → 167',
      },
    ],
  },
  {
    id: 3,
    sectionTitle: 'PRINCIPLE 3 — ROUNDING RULE (CRITICAL)',
    keyBullets: ['x > 10 → answer = 11', 'x ≥ 10 → answer = 10'],
    visual: `x > 10   → jump to 11
x ≥ 10   → stay at 10`,
    example: {
      title: 'ASVAB LOVES THIS TRAP',
      setupLines: [
        'Strict > means you need the next whole number when the problem asks for a minimum count.',
        'Inclusive ≥ means the boundary value can be the answer.',
      ],
      work: '',
      answer: '',
    },
    practice: [
      { id: 'p3-a', lines: ['x > 7'], answer: '8' },
      { id: 'p3-b', lines: ['x ≥ 7'], answer: '7' },
      { id: 'p3-c', lines: ['x > 12.4'], answer: '13' },
    ],
  },
  {
    id: 4,
    sectionTitle: 'PRINCIPLE 4 — MINIMIZING COST (INEQUALITY THINKING)',
    keyBullets: [
      'Hidden inequality logic: “least amount of money.”',
      'Find total cost to cover the requirement; compare options; choose smallest.',
    ],
    visual: 'Compare total cost for the amount you need (packs, containers, gallons).',
    example: {
      title: 'EXAMPLE 3',
      setupLines: ['Option A: 10 for $50', 'Option B: 25 for $110'],
      work: `A = 5 per unit
B = 4.40 per unit`,
      answer: 'B',
    },
    practice: [
      {
        id: 'p4-adv',
        lines: [
          'ADVANCED (REAL TEST STYLE)',
          'Need 55 gallons:',
          'Option A: 11 gallons for $108',
          'Option B: 6 gallons for $215',
          'Step 1 — Cover requirement',
        ],
        answer: `A: 55 ÷ 11 = 5 containers → 5 × 108 = 540
B: 55 ÷ 6 ≈ 9.17 → need 10 containers → 10 × 215 = 2150
→ Option A`,
      },
    ],
  },
];

export const INEQ_FULL_DRILLS: IneqDrill[] = [
  {
    id: 'd1',
    title: 'PROBLEM 1 (REAL STYLE)',
    storyLines: [
      'A printing plant has:',
      'Overhead = $6000 · Cost = $0.18 · Sell = $0.30',
      'How many must they sell to make a profit?',
    ],
    work: `0.30x > 6000 + 0.18x
0.12x > 6000
x > 50,000`,
    answer: '50,001 cards',
  },
  {
    id: 'd2',
    title: 'PROBLEM 2',
    storyLines: [
      'A company sells pens for $2 each. Cost is $1 each + $300 overhead.',
      'How many must be sold for profit?',
    ],
    work: `2x > 300 + x
x > 300`,
    answer: '301 pens',
  },
  {
    id: 'd3',
    title: 'PROBLEM 3',
    storyLines: [
      'A worker earns $15 per job. Expenses are $120.',
      'How many jobs to earn MORE than expenses?',
    ],
    work: `15x > 120
x > 8`,
    answer: '9 jobs',
  },
  {
    id: 'd4',
    title: 'PROBLEM 4 (TRICKY)',
    storyLines: [
      'A store sells items for $8. Cost is $5 each + $150 overhead.',
      'Minimum to break even?',
    ],
    work: `8x = 150 + 5x
3x = 150
x = 50`,
    answer: '50 items',
  },
];

export const INEQ_MASTER_FORMULA = `Profit:
Revenue > Cost

Break-even:
Revenue = Cost`;

export const INEQ_TRANSLATION_SYSTEM: Array<{ phrase: string; action: string }> = [
  { phrase: 'more than', action: '>' },
  { phrase: 'at least', action: '≥' },
  { phrase: 'profit', action: '>' },
  { phrase: 'break-even', action: '=' },
  { phrase: 'least cost', action: 'compare totals' },
];

export const INEQ_SOLVING_FLOW = [
  'Define x',
  'Write revenue',
  'Write cost',
  'Set inequality',
  'Solve',
  'ROUND UP if needed',
] as const;

export const INEQ_FINAL_CHECK = {
  leadIn: 'If you can instantly answer:',
  bullets: [
    'When do I use > vs = ?',
    'Why do I round up?',
    'How to compare bulk pricing?',
    'How to set up revenue vs cost?',
  ],
  closing: "Then you're ASVAB-ready for inequalities",
} as const;

export const INEQ_EXAM_INTRO =
  'Same math, hidden inside long stories — one variation per pattern in real ASVAB style (wordy, slightly disguised).';

export const INEQ_EXAM_PATTERNS: IneqExamPattern[] = [
  {
    id: 1,
    title: 'PATTERN 1 — “MORE THAN” (STRICT INEQUALITY)',
    problem:
      'A small business sells handmade bracelets at a weekend market. Each bracelet sells for $12. The cost to make each bracelet is $7. The owner wants to earn more than $100 in profit for the day. What is the minimum number of bracelets the owner must sell?',
    solutionLines: [
      'Profit per bracelet = 12 − 7 = 5',
      '5x > 100',
      'x > 20',
      'Must go past 20',
    ],
    answer: '21 bracelets',
  },
  {
    id: 2,
    title: 'PATTERN 2 — BREAK-EVEN VS PROFIT',
    problem:
      'A food truck owner spends $800 each month on permits and maintenance. Each meal costs $3 to prepare and is sold for $7. What is the least number of meals the owner must sell in a month to start making a profit?',
    solutionLines: [
      'Revenue = 7x',
      'Cost = 800 + 3x',
      '7x > 800 + 3x',
      '4x > 800',
      'x > 200',
    ],
    answer: '201 meals',
  },
  {
    id: 3,
    title: 'PATTERN 3 — ROUNDING TRAP (HIDDEN DECIMAL)',
    problem:
      'A delivery driver earns $18 per trip. He wants to make more than $250 in one day. What is the minimum number of trips he must complete?',
    solutionLines: ['18x > 250', 'x > 13.89', 'Must round UP'],
    answer: '14 trips',
  },
  {
    id: 4,
    title: 'PATTERN 4 — MINIMUM COST (BULK PURCHASE)',
    problem:
      'A contractor needs 72 bricks for a project. Option A: Packs of 8 bricks for $24. Option B: Packs of 15 bricks for $50. Which option will cost less overall, and what is the total cost?',
    solutionLines: [
      'Option A: 72 ÷ 8 = 9 packs → 9 × 24 = 216',
      'Option B: 72 ÷ 15 = 4.8 → need 5 packs → 5 × 50 = 250',
    ],
    answer: 'Option A is cheaper ($216)',
  },
  {
    id: 5,
    title: 'PATTERN 5 — BREAK-EVEN (EQUALITY)',
    problem:
      'A company produces custom mugs. Fixed costs of $1,200 and each mug costs $4 to make. Each mug sells for $10. How many mugs must the company sell to break even?',
    solutionLines: ['10x = 1200 + 4x', '6x = 1200', 'x = 200'],
    answer: '200 mugs',
  },
  {
    id: 6,
    title: 'PATTERN 6 — REAL ASVAB STYLE (COMBINED DISTRACTION)',
    problem:
      'A school sells raffle tickets for $5 each. $450 upfront on supplies and printing. Each ticket costs $1 to produce. The school wants to raise more than $900 in profit after covering all costs. What is the minimum number of tickets that must be sold?',
    solutionLines: [
      'Revenue = 5x',
      'Cost = 450 + x',
      'Profit condition: 5x > 450 + x + 900',
      '5x > 1350 + x',
      '4x > 1350',
      'x > 337.5',
    ],
    answer: '338 tickets',
  },
];

export const INEQ_TRAINING_TIP = {
  title: 'FINAL TRAINING TIP (THIS IS BIG)',
  when: 'When you see a long problem:',
  stripTitle: 'Strip it down instantly:',
  bullets: [
    'Selling price → revenue',
    'Cost per item + overhead → cost',
    '“More than” → >',
    '“Break-even” → =',
  ],
} as const;

export const INEQ_YOUR_TURN: Array<{ id: string; prompt: string; answer: string }> = [
  {
    id: 'yt1',
    prompt: 'A product sells for $9, costs $4. Want more than $200 profit.',
    answer: 'Profit per unit = 5. 5x > 200 → x > 40 → 41 items',
  },
  {
    id: 'yt2',
    prompt: 'Overhead $600, cost $2, sell $5. Profit?',
    answer: '5x > 600 + 2x → 3x > 600 → x > 200 → 201 items',
  },
  {
    id: 'yt3',
    prompt: 'Need 90 units. Packs: 12 for $36 or 20 for $70. Cheapest?',
    answer:
      'A: 90÷12 = 7.5 → 8 packs → 8×36 = $288. B: 90÷20 = 4.5 → 5 packs → 5×70 = $350. Option A ($288).',
  },
];

export const INEQ_PATTERN_EMOJI: Record<number, string> = {
  1: '📈',
  2: '⚖️',
  3: '🔢',
  4: '🛒',
};

export const INEQ_GOAL_EMOJIS = ['📈', '⚖️', '🔢', '🛒', '💡', '✅'] as const;
