export interface LessonReasoningStep {
  step: string;
  why: string;
}

export interface LessonSolvedProblem {
  title: string;
  prompt: string;
  steps: LessonReasoningStep[];
  answer: string;
}

export interface LessonFactGroup {
  group: string;
  facts: string[];
}

export interface LessonPatternCard {
  title: string;
  example: string;
  setup: string;
  why: string;
}

export interface LessonDrillItem {
  problem: string;
  answer: string;
  why: string;
}

export interface LessonDrillSet {
  title: string;
  items: LessonDrillItem[];
}

export interface StructuredLessonContent {
  introHeadline: string;
  introSummary: string;
  goals: string[];
  coreTitle: string;
  goldenRule: string;
  formulaLines: string[];
  cancellationLaw: string;
  factsTitle: string;
  factGroups: LessonFactGroup[];
  patternsTitle: string;
  patterns: LessonPatternCard[];
  practiceTitle: string;
  practiceGroups: Array<{
    level: string;
    problems: LessonSolvedProblem[];
  }>;
  strategiesTitle: string;
  strategies: Array<{ title: string; tip: string }>;
  drillsTitle: string;
  drillSets: LessonDrillSet[];
  finalTitle: string;
  finalTruth: string;
  advantage: string[];
}

export const STRUCTURED_LESSON_CONTENT: Record<string, StructuredLessonContent> = {
  'order-of-operations': {
    introHeadline: '🧠 PEMDAS Master System',
    introSummary:
      'Train expression control so word problems with operations never trap you under time pressure.',
    goals: [
      'Identify operation priority instantly.',
      'Avoid left-to-right mistakes when precedence changes.',
      'Break long expressions into clean checkpoints.',
      'Handle nested parentheses and exponents calmly.',
    ],
    coreTitle: '🔷 Level 1 — Core Principle',
    goldenRule: 'Do the highest-priority operation first, not the first operation you see.',
    formulaLines: [
      'P -> E -> M/D (left to right) -> A/S (left to right)',
      '6 + 3 * 4 = 6 + 12 = 18',
      '(6 + 3) * 4 = 9 * 4 = 36',
    ],
    cancellationLaw:
      'If your result changes only because you reordered equal-priority operations incorrectly, your setup is wrong.',
    factsTitle: '🔷 Level 2 — Must-Remember Rules',
    factGroups: [
      {
        group: '📌 Priority',
        facts: [
          'Parentheses first',
          'Exponents second',
          'Multiplication/division before addition/subtraction',
        ],
      },
      {
        group: '↔️ Equal Priority',
        facts: [
          'Multiply and divide left to right',
          'Add and subtract left to right',
          'Do not reorder to make numbers look easier unless mathematically valid',
        ],
      },
      {
        group: '⚠️ Common Trap',
        facts: ['6 + 3 * 4 is 18, not 36', '20 - 8 / 4 is 18, not 3'],
      },
    ],
    patternsTitle: '🔷 Level 3 — Tested Patterns',
    patterns: [
      {
        title: '🟢 Type 1 — Basic Priority',
        example: '14 - 2 * 5',
        setup: '14 - 10 = 4',
        why: 'Multiplication has higher priority than subtraction.',
      },
      {
        title: '🟡 Type 2 — Parentheses Control',
        example: '(8 + 2) * 3',
        setup: '10 * 3 = 30',
        why: 'Parentheses force the order before multiplication.',
      },
      {
        title: '🔵 Type 3 — Exponent + Mixed Ops',
        example: '7 + 2 * 3^2',
        setup: '7 + 2 * 9 = 25',
        why: 'Exponent is evaluated before multiplication.',
      },
      {
        title: '🟠 Type 4 — Long Chain',
        example: '4 + 18 / 6 * 5',
        setup: '4 + 3 * 5 = 19',
        why: 'Division and multiplication are equal priority, so move left to right.',
      },
      {
        title: '🔴 Type 5 — Nested Grouping',
        example: '3 * {8 - [6 - (4 - 1)]}',
        setup: '3 * (8 - 3) = 15',
        why: 'Work from innermost grouping outward to preserve structure.',
      },
    ],
    practiceTitle: '🔷 Level 4 — Easy to Elite Training',
    practiceGroups: [
      {
        level: '🟢 Easy Level',
        problems: [
          {
            title: 'Problem 1',
            prompt: 'Evaluate: 6 + 3 * 4',
            steps: [
              { step: '3 * 4 = 12', why: 'Multiply before adding.' },
              { step: '6 + 12 = 18', why: 'After multiplication, add remaining terms.' },
            ],
            answer: '18',
          },
          {
            title: 'Problem 2',
            prompt: 'Evaluate: (9 - 4) * 2',
            steps: [
              { step: '9 - 4 = 5', why: 'Parentheses go first.' },
              { step: '5 * 2 = 10', why: 'Now multiply the simplified value.' },
            ],
            answer: '10',
          },
        ],
      },
      {
        level: '🟡 Medium Level',
        problems: [
          {
            title: 'Problem 3',
            prompt: 'Evaluate: 20 - 12 / 3 + 2',
            steps: [
              { step: '12 / 3 = 4', why: 'Division before addition/subtraction.' },
              {
                step: '20 - 4 + 2 = 16 + 2 = 18',
                why: 'Then evaluate add/subtract left to right.',
              },
            ],
            answer: '18',
          },
          {
            title: 'Problem 4',
            prompt: 'Evaluate: 4 + 2 * 3^2',
            steps: [
              { step: '3^2 = 9', why: 'Exponent before multiplication.' },
              { step: '2 * 9 = 18', why: 'Then multiply.' },
              { step: '4 + 18 = 22', why: 'Then add.' },
            ],
            answer: '22',
          },
        ],
      },
      {
        level: '🔴 Hard Level',
        problems: [
          {
            title: 'Problem 5',
            prompt: 'Evaluate: 24 / (6 - 2) + 5 * 2',
            steps: [
              { step: '6 - 2 = 4', why: 'Parentheses first.' },
              { step: '24 / 4 = 6', why: 'Division next.' },
              { step: '5 * 2 = 10', why: 'Multiplication next.' },
              { step: '6 + 10 = 16', why: 'Add remaining terms.' },
            ],
            answer: '16',
          },
          {
            title: 'Problem 6',
            prompt: 'Evaluate: 50 - [6 + 2 * (4^2 - 10)]',
            steps: [
              { step: '4^2 = 16', why: 'Exponent first.' },
              { step: '16 - 10 = 6', why: 'Inner parentheses simplify next.' },
              { step: '2 * 6 = 12', why: 'Then multiply inside brackets.' },
              { step: '6 + 12 = 18', why: 'Finish bracket expression.' },
              { step: '50 - 18 = 32', why: 'Final subtraction.' },
            ],
            answer: '32',
          },
        ],
      },
    ],
    strategiesTitle: '🔷 Level 5 — Test Strategy',
    strategies: [
      { title: '⚔️ Strategy 1', tip: 'Circle grouping symbols first before computing.' },
      { title: '⚔️ Strategy 2', tip: 'Mark exponents before touching multiplication.' },
      { title: '⚔️ Strategy 3', tip: 'When in doubt, rewrite line-by-line after each priority step.' },
      { title: '⚔️ Strategy 4', tip: 'Never do addition before multiplication in mixed expressions.' },
    ],
    drillsTitle: '🔷 Level 6 — Speed Drills',
    drillSets: [
      {
        title: '🧪 Drill Set A (Fast Priority)',
        items: [
          { problem: '9 + 2 * 5', answer: '19', why: 'Multiply first, then add.' },
          { problem: '18 / 3 + 7', answer: '13', why: 'Divide before adding.' },
          { problem: '(7 + 1) * 2', answer: '16', why: 'Parentheses first.' },
        ],
      },
      {
        title: '🧪 Drill Set B (Mixed)',
        items: [
          { problem: '4 + 18 / 6 * 5', answer: '19', why: 'Do / and * left to right.' },
          { problem: '2 + 3^2 * 2', answer: '20', why: 'Exponent, then multiply, then add.' },
          { problem: '30 / 5 * 2', answer: '12', why: 'Equal-priority operations left to right.' },
        ],
      },
    ],
    finalTitle: '🚀 Final Truth',
    finalTruth:
      'PEMDAS is not memorization only. It is control over mathematical structure under pressure.',
    advantage: [
      'You stop making “first operation seen” mistakes.',
      'You solve dense expressions with confidence and repeatability.',
    ],
  },
  decimals: {
    introHeadline: '🧠 Decimal Operations Master System',
    introSummary:
      'Build fast and accurate decimal fluency for money, rate, and precision AR problems.',
    goals: [
      'Place decimals correctly under pressure.',
      'Handle decimal division by making divisors whole.',
      'Use estimation to catch impossible answers.',
      'Translate money contexts into clean decimal math.',
    ],
    coreTitle: '🔷 Level 1 — Core Principle',
    goldenRule: 'Treat decimals as whole-number operations first, then place the decimal logically.',
    formulaLines: [
      '2.5 * 0.4 -> 25 * 4 = 100 -> 1.00',
      '3.6 / 0.4 -> 36 / 4 = 9',
      '12.6 / 0.3 -> 126 / 3 = 42',
    ],
    cancellationLaw:
      'If decimal placement creates an answer with the wrong magnitude, your decimal position is wrong.',
    factsTitle: '🔷 Level 2 — Must-Remember Rules',
    factGroups: [
      {
        group: '✖️ Multiplication',
        facts: [
          'Ignore decimal points first, multiply as integers.',
          'Total decimal places in factors = decimal places in product.',
        ],
      },
      {
        group: '➗ Division',
        facts: [
          'Move decimal in divisor to make it whole.',
          'Move decimal in dividend by the same amount to keep value equivalent.',
        ],
      },
      {
        group: '🧾 Estimation',
        facts: [
          '4.9 * 2.1 is near 5 * 2 = 10',
          '0.84 / 0.2 should be bigger than 0.84 (dividing by a number less than 1)',
        ],
      },
    ],
    patternsTitle: '🔷 Level 3 — Tested Patterns',
    patterns: [
      {
        title: '🟢 Type 1 — Decimal Multiplication',
        example: '1.2 * 3.5',
        setup: '12 * 35 = 420 -> 4.20',
        why: 'Compute integer product first, then restore decimal places.',
      },
      {
        title: '🟡 Type 2 — Decimal Division',
        example: '3.6 / 0.4',
        setup: '36 / 4 = 9',
        why: 'Shift decimals together to make divisor whole and simplify.',
      },
      {
        title: '🔵 Type 3 — Money Multiplication',
        example: '$1.25 * 6',
        setup: '7.50',
        why: 'Money contexts are decimal multiplication in disguise.',
      },
      {
        title: '🟠 Type 4 — Mixed Operations',
        example: '(2.4 * 0.5) + 1.08',
        setup: '1.2 + 1.08 = 2.28',
        why: 'Compute one chunk at a time, then combine.',
      },
      {
        title: '🔴 Type 5 — Estimate + Verify',
        example: '4.9 * 2.1',
        setup: 'about 10, exact 10.29',
        why: 'Estimate first to reject outlier options quickly.',
      },
    ],
    practiceTitle: '🔷 Level 4 — Easy to Elite Training',
    practiceGroups: [
      {
        level: '🟢 Easy Level',
        problems: [
          {
            title: 'Problem 1',
            prompt: 'Compute: 2.5 * 0.4',
            steps: [
              { step: '25 * 4 = 100', why: 'Ignore decimal points first.' },
              { step: 'Two decimal places total -> 1.00', why: 'Restore place value.' },
            ],
            answer: '1',
          },
          {
            title: 'Problem 2',
            prompt: 'Compute: 0.06 * 0.5',
            steps: [
              { step: '6 * 5 = 30', why: 'Integer multiplication first.' },
              { step: 'Three decimal places total -> 0.030', why: 'Place decimal correctly.' },
            ],
            answer: '0.03',
          },
        ],
      },
      {
        level: '🟡 Medium Level',
        problems: [
          {
            title: 'Problem 3',
            prompt: 'Compute: 3.6 / 0.4',
            steps: [
              {
                step: 'Move decimals one place: 36 / 4',
                why: 'Equivalent scaling removes decimal divisor.',
              },
              { step: '36 / 4 = 9', why: 'Then divide normally.' },
            ],
            answer: '9',
          },
          {
            title: 'Problem 4',
            prompt: 'A notebook costs $1.25. What is the cost of 6 notebooks?',
            steps: [
              { step: '1.25 * 6 = 7.50', why: 'Rate times quantity.' },
            ],
            answer: '$7.50',
          },
        ],
      },
      {
        level: '🔴 Hard Level',
        problems: [
          {
            title: 'Problem 5',
            prompt: 'Compute: 12.6 / 0.3',
            steps: [
              { step: '126 / 3', why: 'Shift decimal one place in both numbers.' },
              { step: '126 / 3 = 42', why: 'Standard division.' },
            ],
            answer: '42',
          },
          {
            title: 'Problem 6',
            prompt: 'A worker earns $18.75/hour. How much in 8 hours?',
            steps: [
              { step: '18.75 * 8 = 150.00', why: 'Multiply hourly rate by hours worked.' },
              { step: 'Check estimate: about 19*8=152', why: 'Result magnitude is reasonable.' },
            ],
            answer: '$150',
          },
        ],
      },
    ],
    strategiesTitle: '🔷 Level 5 — Test Strategy',
    strategies: [
      { title: '⚔️ Strategy 1', tip: 'Estimate first before exact computation.' },
      { title: '⚔️ Strategy 2', tip: 'For division, make the divisor whole immediately.' },
      { title: '⚔️ Strategy 3', tip: 'Track decimal places on scratch paper to avoid mental slips.' },
      { title: '⚔️ Strategy 4', tip: 'In money problems, keep two decimals to preserve cents.' },
    ],
    drillsTitle: '🔷 Level 6 — Speed Drills',
    drillSets: [
      {
        title: '🧪 Drill Set A (Fast Multiplication)',
        items: [
          { problem: '0.5 * 0.2', answer: '0.1', why: '5*2=10 with two decimal places.' },
          { problem: '1.2 * 3.5', answer: '4.2', why: '12*35=420 then two decimal places.' },
          { problem: '0.25 * 16', answer: '4', why: 'Quarter of 16.' },
        ],
      },
      {
        title: '🧪 Drill Set B (Fast Division + Money)',
        items: [
          { problem: '4.8 / 0.6', answer: '8', why: '48/6 after decimal shift.' },
          { problem: '0.84 / 0.2', answer: '4.2', why: '84/20 = 4.2.' },
          { problem: '$2.50 * 4', answer: '$10', why: 'Money multiplication.' },
        ],
      },
    ],
    finalTitle: '🚀 Final Truth',
    finalTruth:
      'Decimals are place-value logic. Once magnitude and placement are controlled, AR decimal questions become routine.',
    advantage: [
      'You avoid decimal-placement traps automatically.',
      'You can verify answers quickly with estimation and context.',
    ],
  },
  fractions: {
    introHeadline: '🧠 Fractions Master System',
    introSummary:
      'Build fraction fluency for ratio, rate, part-whole, and work-style AR questions.',
    goals: [
      'Simplify before computing to reduce errors.',
      'Use common denominators cleanly and quickly.',
      'Divide by fractions using reciprocal logic with confidence.',
      'Translate word statements into fraction equations.',
    ],
    coreTitle: '🔷 Level 1 — Core Principle',
    goldenRule: 'Fractions represent relationships; simplify structure first, then compute.',
    formulaLines: [
      'a/b + c/d -> common denominator',
      'a/b * c/d -> (a*c)/(b*d)',
      'a/b / c/d -> a/b * d/c',
    ],
    cancellationLaw:
      'If you do not simplify when possible, arithmetic complexity grows and error risk spikes.',
    factsTitle: '🔷 Level 2 — Must-Remember Rules',
    factGroups: [
      {
        group: '➕ Add/Subtract',
        facts: [
          'Find common denominator first.',
          'Only numerators add/subtract directly once denominators match.',
        ],
      },
      {
        group: '✖️ Multiply',
        facts: ['Multiply numerator by numerator and denominator by denominator.', 'Cross-cancel before multiplying when possible.'],
      },
      {
        group: '➗ Divide',
        facts: ['Invert the second fraction and multiply.', 'Check if result should grow or shrink by comparing divisor to 1.'],
      },
    ],
    patternsTitle: '🔷 Level 3 — Tested Patterns',
    patterns: [
      {
        title: '🟢 Type 1 — Fraction of a Number',
        example: '3/4 of 24',
        setup: '24 * 3/4 = 18',
        why: '“Of” means multiplication by the fraction.',
      },
      {
        title: '🟡 Type 2 — Common Denominator',
        example: '1/2 + 1/4',
        setup: '2/4 + 1/4 = 3/4',
        why: 'Equal denominators allow valid combination.',
      },
      {
        title: '🔵 Type 3 — Reciprocal Division',
        example: '3/5 / 1/2',
        setup: '3/5 * 2/1 = 6/5',
        why: 'Division by fraction is multiply by reciprocal.',
      },
      {
        title: '🟠 Type 4 — Solve for Whole',
        example: '2/5 of x = 18',
        setup: 'x = 18 * 5/2 = 45',
        why: 'Undo multiplication by multiplying by reciprocal.',
      },
      {
        title: '🔴 Type 5 — Word Relationship',
        example: 'One number is 3/5 of another; sum is 64',
        setup: '3k + 5k = 64 -> k=8',
        why: 'Convert ratio words into proportion structure.',
      },
    ],
    practiceTitle: '🔷 Level 4 — Easy to Elite Training',
    practiceGroups: [
      {
        level: '🟢 Easy Level',
        problems: [
          {
            title: 'Problem 1',
            prompt: 'What is 3/4 of 24?',
            steps: [
              { step: '24 * 3/4', why: '“Of” means multiply.' },
              { step: '24/4 = 6, then 6*3 = 18', why: 'Simplify division first.' },
            ],
            answer: '18',
          },
          {
            title: 'Problem 2',
            prompt: 'Compute: 1/2 + 1/4',
            steps: [
              { step: '1/2 = 2/4', why: 'Make common denominator.' },
              { step: '2/4 + 1/4 = 3/4', why: 'Add numerators after matching denominators.' },
            ],
            answer: '3/4',
          },
        ],
      },
      {
        level: '🟡 Medium Level',
        problems: [
          {
            title: 'Problem 3',
            prompt: 'Compute: 3/5 / 1/2',
            steps: [
              { step: '3/5 * 2/1', why: 'Invert and multiply.' },
              { step: '6/5', why: 'Multiply numerators and denominators.' },
            ],
            answer: '6/5',
          },
          {
            title: 'Problem 4',
            prompt: 'A recipe uses 1/3 cup per batch. How many batches from 4 cups?',
            steps: [
              { step: '4 / (1/3)', why: 'Batches = total amount divided by amount per batch.' },
              { step: '4 * 3 = 12', why: 'Divide by a fraction using reciprocal.' },
            ],
            answer: '12 batches',
          },
        ],
      },
      {
        level: '🔴 Hard Level',
        problems: [
          {
            title: 'Problem 5',
            prompt: 'If 600 is one-fifth more than x, find x.',
            steps: [
              { step: '600 = 6/5 * x', why: 'One-fifth more means multiply by 6/5.' },
              { step: 'x = 600 * 5/6 = 500', why: 'Undo by reciprocal multiplication.' },
            ],
            answer: '500',
          },
          {
            title: 'Problem 6',
            prompt: 'One number is 3/5 of another. Their sum is 64. Find both.',
            steps: [
              { step: 'Let numbers be 3k and 5k', why: 'Convert ratio relation into scaled parts.' },
              { step: '8k = 64 -> k = 8', why: 'Sum of parts gives scale.' },
              { step: 'Numbers are 24 and 40', why: 'Substitute k into each part.' },
            ],
            answer: '24 and 40',
          },
        ],
      },
    ],
    strategiesTitle: '🔷 Level 5 — Test Strategy',
    strategies: [
      { title: '⚔️ Strategy 1', tip: 'Simplify first whenever possible.' },
      { title: '⚔️ Strategy 2', tip: 'Use common denominator only when adding/subtracting.' },
      { title: '⚔️ Strategy 3', tip: 'For division, say out loud: keep-change-flip.' },
      { title: '⚔️ Strategy 4', tip: 'Translate wording carefully: “of” = multiply, “out of” = part/whole.' },
    ],
    drillsTitle: '🔷 Level 6 — Speed Drills',
    drillSets: [
      {
        title: '🧪 Drill Set A (Core)',
        items: [
          { problem: '1/2 of 18', answer: '9', why: 'Multiply by 1/2.' },
          { problem: '2/3 + 1/6', answer: '5/6', why: 'Use denominator 6.' },
          { problem: '2/7 * 14', answer: '4', why: '14 * 2/7.' },
        ],
      },
      {
        title: '🧪 Drill Set B (Reciprocal + Word)',
        items: [
          { problem: '1/2 / 1/4', answer: '2', why: 'Multiply by 4/1.' },
          { problem: '5/8 / 5', answer: '1/8', why: '5/8 * 1/5.' },
          {
            problem: 'If 2/5 of x is 18, find x',
            answer: '45',
            why: 'Multiply 18 by 5/2.',
          },
        ],
      },
    ],
    finalTitle: '🚀 Final Truth',
    finalTruth:
      'Fractions are relationship math. Once relationships are translated correctly, the arithmetic becomes straightforward.',
    advantage: [
      'You can decode fraction word problems instead of guessing.',
      'You solve quickly by simplifying and structuring before heavy computation.',
    ],
  },
};
