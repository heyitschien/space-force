export interface ExampleStep {
  step: string;
  reason?: string;
}

export const PERCENTS_CORE_INTUITION = {
  definition: 'A percent simply means parts out of 100.',
  table: [
    { percent: '50%', meaning: '50 out of 100' },
    { percent: '25%', meaning: '25 out of 100' },
    { percent: '10%', meaning: '10 out of 100' },
    { percent: '1%', meaning: '1 out of 100' },
  ] as const,
  gridConcept:
    'Think of a 100-square grid. If 25 squares are shaded, that is 25%. This visualization is the entire concept. Everything else is just shortcuts.',
};

export const PERCENTS_UNIVERSAL_FORMULA = {
  formula: 'Part = Whole × (Percent ÷ 100)',
  meaning: 'portion = total × percent',
  example: {
    problem: '15% of 80',
    steps: [
      {
        step: 'Convert 15% to decimal: 15 ÷ 100 = 0.15',
        reason:
          "Percent means 'per 100' — we divide by 100 to get the decimal. 15% = 15 out of 100.",
      },
      {
        step: 'Multiply: 80 × 0.15 = 12',
        reason:
          'Part = Whole × Percent. 80 is the whole, 0.15 is 15% as a decimal. We want 15 parts out of every 100 of 80.',
      },
    ],
    answer: '12',
  },
};

export const PERCENTS_PROBLEM_TYPES = [
  { type: 1, question: 'Percent of a number' },
  { type: 2, question: 'What percent is A of B?' },
  { type: 3, question: 'Increase / decrease percent' },
] as const;

export const PERCENTS_TYPE_1 = {
  title: 'Percent of a Number',
  principle: 'Part = Whole × (Percent ÷ 100)',
  examples: [
    {
      problem: '15% of 80',
      steps: [
        {
          step: 'Convert 15% to decimal: 15% = 0.15',
          reason:
            "15% means 15 per 100. To use it in multiplication, divide by 100: 15 ÷ 100 = 0.15.",
        },
        {
          step: '80 × 0.15 = 12',
          reason:
            'Whole (80) × percent as decimal (0.15) = the part. We are taking 15 hundredths of 80.',
        },
      ],
      answer: '12',
    },
    {
      problem: '20% of 375',
      steps: [
        {
          step: '20% = 0.20',
          reason: '20 per 100 = 0.20. Same idea: divide the percent by 100.',
        },
        {
          step: '0.20 × 375 = 75',
          reason:
            '375 is the whole. 20% of 375 means 20 hundredths of 375. 0.20 × 375 gives us that amount.',
        },
      ],
      answer: '75',
    },
  ],
  mentalTrick:
    'Break into 10% chunks. Example: 15% of 80 → 10% = 8, 5% = 4, total = 12. This is how test-takers solve it in 5 seconds.',
};

export const PERCENTS_TYPE_2 = {
  title: 'What Percent Is A of B?',
  principle: 'Percent = (Part ÷ Whole) × 100',
  example: {
    problem: '18 out of 24 students passed. What percent passed?',
    steps: [
      {
        step: '18 ÷ 24 = 0.75',
        reason:
          'Part (18 passed) ÷ whole (24 total) gives the fraction. 0.75 means 75 hundredths — that is the proportion.',
      },
      {
        step: '0.75 × 100 = 75%',
        reason:
          'Percent means "per 100." To convert a decimal to percent, multiply by 100. 0.75 = 75 out of 100 = 75%.',
      },
    ],
    answer: '75%',
  },
  mentalShortcut:
    'Convert fraction. 18/24 simplifies to 3/4. Memorize common fraction–percent pairs.',
  fractionTable: [
    { fraction: '1/2', percent: '50%' },
    { fraction: '1/3', percent: '33%' },
    { fraction: '2/3', percent: '67%' },
    { fraction: '1/4', percent: '25%' },
    { fraction: '3/4', percent: '75%' },
    { fraction: '1/5', percent: '20%' },
  ] as const,
};

export const PERCENTS_TYPE_3 = {
  title: 'Percent Increase / Decrease',
  principle: 'New Price = Original × (1 − Percent ÷ 100)',
  example: {
    problem: 'A shirt costs $40. 25% off.',
    steps: [
      {
        step: '25% off means you pay 75%. So use 1 − 0.25 = 0.75',
        reason:
          '"25% off" means you keep 75% of the price. The multiplier is what you pay, not what you take off.',
      },
      {
        step: '40 × 0.75 = 30',
        reason:
          'Original ($40) × what you pay (0.75) = new price. We are finding 75% of $40.',
      },
    ],
    answer: '$30',
  },
  successiveDiscounts: {
    problem: '$300 item: 20% off, then 15% off',
    wrong: '35% off — WRONG',
    correct: '300 × 0.80 × 0.85 = 204',
    answer: '$204',
    steps: [
      {
        step: 'First discount: 300 × 0.80 = 240',
        reason:
          '20% off means pay 80%. Apply to the original: 300 × 0.80. The 240 is the new price after the first discount.',
      },
      {
        step: 'Second discount: 240 × 0.85 = 204',
        reason:
          '15% off the NEW price (240), not the original. You pay 85% of 240. The base for the second discount is 240, not 300.',
      },
    ],
  },
};

export const PERCENTS_MENTAL_TRICKS = [
  { percent: '10%', shortcut: 'move decimal left' },
  { percent: '1%', shortcut: 'move decimal two places' },
  { percent: '5%', shortcut: 'half of 10%' },
  { percent: '25%', shortcut: 'divide by 4' },
  { percent: '50%', shortcut: 'divide by 2' },
  { percent: '20%', shortcut: 'divide by 5' },
] as const;

export const PERCENTS_ASVAB_TRAPS = [
  {
    title: 'Percent of what number?',
    tip: 'Always identify the base.',
  },
  {
    title: 'Successive discounts',
    tip: 'Never add percentages.',
  },
  {
    title: 'Percent increase vs percent difference',
    tip: 'Always divide by the original number.',
  },
] as const;

export const PERCENTS_MASTER_DRILL = [
  { problem: '15% of 200', answer: '30' },
  { problem: '25% of 160', answer: '40' },
  { problem: '40% of 90', answer: '36' },
  { problem: '12% of 250', answer: '30' },
  { problem: '18 is what percent of 72?', answer: '25%' },
  { problem: '45 is what percent of 60?', answer: '75%' },
  { problem: '$120 jacket, 20% off', answer: '$96' },
  { problem: '$80 item + 7% tax', answer: '$85.60' },
  { problem: '30 increased by 20%', answer: '36' },
  { problem: '90 decreased by 10%', answer: '81' },
] as const;

export type PracticeDifficulty = 'easy' | 'medium' | 'hard' | 'extremelyHard';

export interface PracticeProblem {
  problem: string;
  solution: string;
  reasoning?: string;
}

export const PERCENTS_PRACTICE_BY_DIFFICULTY: Record<
  PracticeDifficulty,
  PracticeProblem[]
> = {
  easy: [
    {
      problem: '15% of 200',
      solution: '0.15 × 200 = 30',
      reasoning:
        '15% = 0.15 (divide by 100). Part = whole × percent, so 200 × 0.15 gives 15 hundredths of 200.',
    },
    {
      problem: '25% of 160',
      solution: '160 ÷ 4 = 40',
      reasoning:
        '25% = 1/4. "Percent of" means multiply. 25% of 160 = 160 × (1/4) = 160 ÷ 4. Dividing by 4 is the shortcut for 25%.',
    },
    {
      problem: '18 is what percent of 72?',
      solution: '18 ÷ 72 = 0.25 = 25%',
      reasoning:
        'Percent = part ÷ whole × 100. Part = 18, whole = 72. 18/72 = 0.25, which is 25 out of 100.',
    },
  ],
  medium: [
    {
      problem: '12% of 250',
      solution: '10% = 25, 2% = 5; 25 + 5 = 30',
      reasoning:
        '12% = 10% + 2%. 10% of 250 = move decimal left = 25. 2% is one-fifth of 10%, so 25 ÷ 5 = 5. Add: 25 + 5 = 30.',
    },
    {
      problem: '45 is what percent of 60?',
      solution: '45 ÷ 60 = 0.75 = 75%',
      reasoning:
        'Part ÷ whole = 45/60 = 3/4 = 0.75. Multiply by 100 to get percent: 75%. Or: 3/4 = 75% from the fraction table.',
    },
    {
      problem: '$120 jacket, 20% off',
      solution: '20% off = pay 80%. 120 × 0.80 = $96',
      reasoning:
        '20% off means you keep 80%. New price = original × 0.80. The 0.80 comes from 1 − 0.20.',
    },
  ],
  hard: [
    {
      problem: 'A car price increases from $18,000 to $21,600. Percent increase?',
      solution: 'Increase = 3,600. 3,600 ÷ 18,000 = 0.20 = 20%',
      reasoning:
        'Percent change = (new − old) ÷ old. Always divide by the ORIGINAL (18,000), not the new price. 3,600/18,000 = 0.20 = 20%.',
    },
    {
      problem: 'A jacket costs $80. Tax is 8%. Total price?',
      solution: '10% = 8, 2% = 1.6. 8 − 1.6 = 6.4. Total: 80 + 6.4 = $86.40',
      reasoning:
        '8% = 10% − 2%. 10% of 80 = 8. 2% = 8 ÷ 5 = 1.6. So 8% = 8 − 1.6 = 6.4. Add tax to original: 80 + 6.4.',
    },
  ],
  extremelyHard: [
    {
      problem: '$300 item: 20% off, then 15% off. Final price?',
      solution: '300 × 0.80 × 0.85 = 204. Final price $204.',
      reasoning:
        'Never add percentages. Apply each discount to the NEW price. First: 300 × 0.80 = 240. Second: 240 × 0.85 = 204. The base for the second discount is 240, not 300.',
    },
    {
      problem: 'A waitress earns 12% tips. She serves $375 worth of food. How much?',
      solution: '10% = 37.5, 2% = 7.5. 37.5 + 7.5 = $45',
      reasoning:
        '12% = 10% + 2%. 10% of 375 = 37.5 (move decimal left). 2% = 37.5 ÷ 5 = 7.5. Add for total tips.',
    },
  ],
};
