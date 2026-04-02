export interface AvPrinciple {
  id: string;
  part: 'area' | 'volume' | 'other';
  title: string;
  formula: string;
  meaning?: string;
  exampleProblem: string;
  exampleWork: string;
  exampleAnswer: string;
  practiceProblem: string;
  practiceAnswer: string;
}

export interface AvDrillItem {
  problem: string;
  answer: string;
}

export interface AvPatternRow {
  name: string;
  moves: string;
}

export const AV_INTRO = {
  headline: 'LEVEL 5 — AREA & VOLUME (ARITHMETIC REASONING)',
  tagline: 'ASVAB tests translation: words → shape → formula → units → solve.',
  insight:
    'Flooring, square yards, and cost-per-area show up on real forms. Separate “covering a surface” (area) from “filling space” (volume).',
  goals: [
    'Name the shape, pick the right formula (rectangle, square, triangle, circle; prism, cube, cylinder).',
    'Convert square feet ↔ square yards: 1 yd² = 9 ft².',
    'Chain area → unit match → cost when the price is per ft² or per yd².',
    'Use the Pythagorean theorem for pole-and-shadow “line from tip to tip” problems.',
    'Watch π ≈ 3.14 unless the problem says otherwise.',
  ],
};

/** Same spine as the markdown lesson opening. */
export const AV_CORE_PIPELINE = `Words  →  Shape  →  Formula  →  Units  →  Solve`;

export const AV_AREA_PRINCIPLES: AvPrinciple[] = [
  {
    id: 'rect',
    part: 'area',
    title: 'Rectangle',
    formula: 'Area = length × width',
    meaning: 'Count how many squares fit inside the rectangle.',
    exampleProblem: 'Carpet a 12 ft × 12 ft room (area in square feet).',
    exampleWork: 'A = 12 × 12 = 144',
    exampleAnswer: '144 ft²',
    practiceProblem: 'Room 10 ft × 15 ft. Area in ft²?',
    practiceAnswer: '10 × 15 = 150 ft²',
  },
  {
    id: 'square',
    part: 'area',
    title: 'Square',
    formula: 'A = s²',
    exampleProblem: 'Side length = 9 (same units).',
    exampleWork: 'A = 9² = 81',
    exampleAnswer: '81 square units',
    practiceProblem: 'Side = 7 → area?',
    practiceAnswer: '7² = 49',
  },
  {
    id: 'triangle',
    part: 'area',
    title: 'Triangle',
    formula: 'A = (1/2) × base × height',
    exampleProblem: 'Base = 10, height = 6.',
    exampleWork: 'A = (1/2)(10)(6) = 30',
    exampleAnswer: '30 square units',
    practiceProblem: 'Base 8, height 5 → area?',
    practiceAnswer: '(1/2)(8)(5) = 20',
  },
  {
    id: 'circle',
    part: 'area',
    title: 'Circle',
    formula: 'A = π r²   (use π ≈ 3.14 unless told otherwise)',
    exampleProblem: 'Radius = 3.',
    exampleWork: 'A = 3.14 × 3² = 3.14 × 9 = 28.26',
    exampleAnswer: '28.26 square units',
    practiceProblem: 'Diameter = 10 → radius 5 → area?',
    practiceAnswer: '3.14 × 25 = 78.5',
  },
];

export const AV_UNIT_CONVERSIONS = `1 yard = 3 feet
1 square yard = 9 square feet   (3 ft × 3 ft)`;

export const AV_UNIT_EXAMPLE_PROBLEM =
  'Carpet: 16 ft × 18 ft. How many square yards? (From ASVAB-style wording.)';

export const AV_UNIT_EXAMPLE_WORK = `Step 1 — Area in ft²:  16 × 18 = 288
Step 2 — ft² → yd²:   288 ÷ 9 = 32
Answer: 32 yd²`;

export const AV_UNIT_PRACTICE: AvDrillItem[] = [
  { problem: '180 ft² → how many yd²?', answer: '180 ÷ 9 = 20 yd²' },
  { problem: '90 ft² → how many yd²?', answer: '90 ÷ 9 = 10 yd²' },
];

export const AV_VOLUME_PRINCIPLES: AvPrinciple[] = [
  {
    id: 'prism',
    part: 'volume',
    title: 'Rectangular prism (box)',
    formula: 'V = length × width × height',
    exampleProblem: 'Box 4 × 3 × 2 (same units).',
    exampleWork: 'V = 4 × 3 × 2 = 24',
    exampleAnswer: '24 cubic units',
    practiceProblem: '5 × 4 × 3 → volume?',
    practiceAnswer: '60 cubic units',
  },
  {
    id: 'cube',
    part: 'volume',
    title: 'Cube',
    formula: 'V = s³',
    exampleProblem: 'Side 4.',
    exampleWork: 'V = 4³ = 64',
    exampleAnswer: '64 cubic units',
    practiceProblem: 'Side = 6 → volume?',
    practiceAnswer: '216 cubic units',
  },
  {
    id: 'cylinder',
    part: 'volume',
    title: 'Cylinder (less common)',
    formula: 'V = π r² h',
    exampleProblem: 'r = 2, h = 5 (π ≈ 3.14).',
    exampleWork: 'V = 3.14 × 4 × 5 = 62.8',
    exampleAnswer: '62.8 cubic units',
    practiceProblem: 'r = 3, h = 4 → volume?',
    practiceAnswer: '3.14 × 9 × 4 = 113.04',
  },
];

/** Matches pool / topic copy (pole–shadow right triangle). */
export const AV_PYTHAGOREAN = {
  title: 'Right triangle — pole & shadow',
  formula: 'a² + b² = c²   (legs a and b, hypotenuse c)',
  exampleProblem: 'Pole 6 ft, shadow 8 ft. Distance from pole tip to shadow tip?',
  exampleWork: '6² + 8² = 36 + 64 = 100 → c = √100',
  exampleAnswer: '10 ft',
  practiceProblem: 'Pole 8 ft, shadow 6 ft. Same question?',
  practiceAnswer: '8² + 6² = 64 + 36 = 100 → 10 ft',
};

export const AV_ASVAB_PATTERNS: AvPatternRow[] = [
  { name: 'Flooring / carpet', moves: 'Area → convert units if needed → multiply by cost per ft² or yd².' },
  { name: 'Cost optimization', moves: 'Total material needed → compare unit cost (e.g. paint buckets).' },
  { name: 'Space per person', moves: 'Total area ÷ number of people.' },
  { name: 'Packing / capacity', moves: 'Volume ÷ size of one unit (how many fit).' },
];

export const AV_PATTERN_WALKTHROUGH = {
  problem: 'Room 10 × 20 ft, cost $2 per ft².',
  work: 'A = 10 × 20 = 200 ft²\nCost = 200 × 2 = $400',
  answer: '$400',
};

export const AV_MASTER_INSIGHT: string[] = [
    'Area = covering a surface. Volume = filling a space.',
    'Ask: “Is the answer in ft² or yd²?” Match units before multiplying price.',
    'Diameter given? Cut radius in half before A = πr².',
];

export const AV_MIXED_DRILL: AvDrillItem[] = [
  { problem: 'Garden 15 ft × 20 ft. Square feet?', answer: '300 ft²' },
  {
    problem: '$3 per yd². Room 12 ft × 15 ft. Total cost?',
    answer: '12×15 = 180 ft² → 180÷9 = 20 yd² → 20×3 = $60',
  },
  { problem: 'Box 4 × 5 × 3 ft. Volume?', answer: '60 ft³' },
  { problem: 'Circular pool, radius 7 ft. Area (π = 3.14)?', answer: '3.14 × 49 = 153.86 ft²' },
  { problem: 'Room 200 ft². Each tile 2 ft². Tiles needed?', answer: '200 ÷ 2 = 100 tiles' },
];

export const AV_NEXT_LINKS: { label: string; href: string }[] = [
  { label: 'Unit conversion', href: '/arithmetic-reasoning/unit-conversion' },
  { label: 'Ratios & proportions', href: '/arithmetic-reasoning/ratios' },
  { label: 'All AR patterns', href: '/arithmetic-reasoning/patterns' },
];
