export interface WpPattern {
  id: number;
  name: string;
  situation: string;
  keyTrick: string;
  visual: string;
  translation: string;
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
  warning?: string;
}

export interface WpSpeedDrillItem {
  problem: string;
  answer: string;
}

export interface WpTranslationRow {
  phrase: string;
  math: string;
}

export interface WpWorkedStudioItem {
  label: string;
  problem: string;
  lines: string[];
  answer: string;
}

export interface WpPatternQuizItem {
  id: string;
  question: string;
  patternChoices: string;
  reveal: string;
}

export interface WpQuickRecognitionRow {
  phrase: string;
  think: string;
}

export interface WpMistakeItem {
  title: string;
  detail: string;
}

export interface WpNavLink {
  label: string;
  href: string;
}

export const WP_INTRO = {
  headline: 'LEVEL 4 — WORD PROBLEM SETUP (PATTERN #16)',
  tagline: 'Translation first: turn the story into math before you calculate.',
  insight:
    'Pick one of four habits — number relationships, grouping / remainder, capacity / round up, or not enough information — then interpret the answer (remainder vs next whole trip).',
  goals: [
    'State exactly what the question wants: smaller number, remainder in last room, or whole buses/trips.',
    'Define the unknown before equations; often let x = the smaller or simpler quantity.',
    'Translate sentence by sentence: sum → add, is → =, more than → +, less than → subtract (watch order).',
    'Divide for grouping: remainder = answer for “partial room”; quotient + 1 when you need everyone transported.',
    'Ignore numbers that do not change the target (extra miles, “urgent,” etc.) unless they affect a rate limit.',
    'Use cannot be determined when a named angle or side is ambiguous without a diagram.',
  ],
};

export const WP_PATTERN_MAP: Array<{ pattern: number; situation: string; keyTrick: string }> = [
  { pattern: 1, situation: 'Number relationships', keyTrick: 'Define x; build x and (x ± k) or (kx ± m)' },
  { pattern: 2, situation: 'Grouping / remainder', keyTrick: 'Divide; “partial group” → remainder' },
  { pattern: 3, situation: 'Capacity / round up', keyTrick: 'Divide; leftover people/items → +1 trip or bus' },
  { pattern: 4, situation: 'CBD / ambiguous', keyTrick: 'Do not force a number if the target is under-specified' },
];

export const WP_PATTERNS: WpPattern[] = [
  {
    id: 1,
    name: 'Number relationships',
    situation: 'Number relationships',
    keyTrick: 'Define x; build x and (x ± k)',
    visual: 'Smaller = x\nLarger = x + 8\nSum 70 → x + (x + 8) = 70',
    translation:
      'sum, total → +\nis, equals → =\nmore than → +\nless than → subtract from the unknown (“8 less than x” → x − 8)\ntwice a number → 2x\nthree times → 3x',
    example: {
      problem:
        'The sum of two numbers is 70. One number is 8 more than the other. What is the smaller number?',
      steps: [
        'Let x = smaller; larger = x + 8. Why: one quantity is expressed relative to the other.',
        'Equation: x + (x + 8) = 70 → 2x = 62 → x = 31. Why: sum means add both numbers.',
      ],
      answer: '31',
    },
    shortcut: 'Smaller first: x + (x + k) = sum → 2x = sum − k → x = (sum − k) / 2',
    practice: {
      problem: 'The sum of two numbers is 50. One is 10 more than the other. Smaller number?',
      answer: 'x + (x+10) = 50 → x = 20',
    },
  },
  {
    id: 2,
    name: 'Grouping / remainder',
    situation: 'Grouping / remainder',
    keyTrick: 'Quotient = full groups; remainder = partial group',
    visual: '47 people ÷ 6 per room\n → 7 full rooms … 5 left in last room',
    translation:
      'Divide total by group size.\nIf they ask “how many in the room that is not full” → answer is the **remainder**, not the quotient.',
    example: {
      problem:
        '47 participants, 6 per room. How many in the room that is not full?',
      steps: [
        '47 ÷ 6 = 7 remainder 5. Why: 7 rooms are full of 6; 5 people remain.',
        'They want the incomplete room count → 5. Why: remainder is the people in the partial room.',
      ],
      answer: '5',
    },
    shortcut: '“Partial room / row / stack” → divide, take remainder only',
    practice: {
      problem: '38 students, rooms of 5. How many in the room that is not full?',
      answer: '38 ÷ 5 = 7 r3 → 3',
    },
    warning: 'Do not answer with 7 — that is how many **full** rooms, not people in the last room.',
  },
  {
    id: 3,
    name: 'Capacity / round up',
    situation: 'Capacity / round up',
    keyTrick: 'Any leftover people need one more trip or bus',
    visual: '104 people, 42 per trip\n104 ÷ 42 = 2 r20 → need 3 trips',
    translation:
      '“How many buses / trips / vans **needed**?” → divide; if remainder > 0, answer = quotient + 1.\nIgnore extra story details (miles, “in one day”) unless they cap speed or time.',
    example: {
      problem:
        '42 passengers per plane trip. How many trips to move 104 people (extra: 100 miles, 1 day)?',
      steps: [
        'Use 104 and 42 only for trip count. Why: miles/days are distractors unless a limit is given.',
        '104 ÷ 42 = 2 r20 → 2 trips move 84; 20 still need a ride. Why: partial trips do not exist.',
      ],
      answer: '3',
    },
    shortcut: 'Trips/buses/boxes needed: ⌈total ÷ capacity⌉ or quotient + (remainder > 0 ? 1 : 0)',
    practice: {
      problem: '65 people, buses hold 12. How many buses needed?',
      answer: '65 ÷ 12 = 5 r5 → 6 buses',
    },
    warning: 'Same division as “remainder” problems — read the **question target** carefully.',
  },
  {
    id: 4,
    name: 'Cannot be determined',
    situation: 'Ambiguous target',
    keyTrick: 'Named angle or side without a diagram may be CBD',
    visual: 'Parallelogram: one angle 70°\nDistinct measures in figure: 70° and 110° (determinate)\n“Measure of angle B” with no diagram → may be CBD',
    translation:
      'Opposite angles equal; adjacent sum to 180°.\n“What are the two angle measures?” → often 70° and 110° (determinate).\n“What is angle B?” with no labels → may be **cannot be determined**.',
    example: {
      problem: 'Parallelogram; one angle is 70°. What are the two distinct angle measures in the figure?',
      steps: [
        'Adjacent angles: 180° − 70° = 110°. Why: consecutive angles in a parallelogram are supplementary.',
        'Opposite angles match, so the two distinct measures are 70° and 110°. Why: that fully describes the shape.',
      ],
      answer: '70° and 110°',
    },
    shortcut: 'CBD when the problem names a specific vertex but gives no diagram to fix which measure applies',
    practice: {
      problem: 'True/false: If a story is vague about which quantity it wants, stop and ask if CBD applies.',
      answer: 'True — do not invent a diagram.',
    },
    warning: 'Do not confuse “two measures in the figure” (often determinate) with “angle B only” (often CBD).',
  },
];

export const WP_SPEED_DRILL: WpSpeedDrillItem[] = [
  { problem: '90 ÷ 20 for “people in last partial boat” (capacity 20) — answer type?', answer: 'Remainder → 10' },
  { problem: 'Same 90 people — how many **full** boats **needed**?', answer: 'Round up → 5 boats' },
  { problem: 'Sum 60; one number 14 more than the other. Smaller?', answer: 'x + (x+14) = 60 → x = 23' },
  { problem: '2x + 7 = 21. x?', answer: 'x = 7' },
  { problem: '41 pencils, 12 per box, **boxes needed** for all?', answer: '41 ÷ 12 = 3 r5 → 4 boxes' },
  { problem: '125 ÷ 14 for “students in **incomplete** group”?', answer: 'Remainder → 13' },
  { problem: '125 ÷ 14 for **vans needed** (14 each)?', answer: 'Round up → 9 vans' },
  { problem: '104 ÷ 42 partial trips planned — people still left after 2 trips?', answer: '104 − 84 = 20 → need 3rd trip' },
  { problem: 'Difference of two numbers is 10; sum is 40. Smaller?', answer: 'x + (x+10) = 40 → x = 15' },
  { problem: 'Twice a number minus 6 equals 18. Equation and x?', answer: '2x − 6 = 18 → x = 12' },
];

export const WP_TRANSLATION_ROWS: WpTranslationRow[] = [
  { phrase: 'sum, total', math: 'add (+)' },
  { phrase: 'more than', math: 'add (+)' },
  { phrase: 'less than', math: 'subtract from the unknown (watch order)' },
  { phrase: 'difference', math: 'subtract (−)' },
  { phrase: 'product', math: 'multiply (×)' },
  { phrase: 'of (fraction/percent)', math: 'multiply (×)' },
  { phrase: 'quotient', math: 'divide (÷)' },
  { phrase: 'per', math: 'divide or rate' },
  { phrase: 'is, was, equals', math: '=' },
];

export const WP_ORDER_TRAPS = `8 more than a number     →  x + 8
8 less than a number     →  x − 8
difference of x and 8    →  x − 8
8 less than twice x      →  2x − 8   (NOT 8 − 2x)
5 less than a number     →  x − 5   (NOT 5 − x)`;

export const WP_REMAINDER_CASE_PROMPTS =
  'How many in the last partial room · how many left over · how many in the incomplete group · remainder after full groups';

export const WP_ROUNDUP_CASE_PROMPTS =
  'How many buses / trips / vans / boxes / rooms needed · enough capacity for everyone · full loads except possibly the last';

export const WP_SAME_DIVISION_TRAP =
  'Same division (e.g. 38 ÷ 5 = 7 r3): “How many in the last partial room?” → 3. “How many rooms needed?” → 8.';

export const WP_DISTRACTOR_STORY =
  '42 passengers per trip. How many trips for 104 people 100 miles in 1 day? Miles and “1 day” do not change trip count unless a rate or daily cap is stated — use people ÷ capacity only.';

export const WP_CBD_REMINDER =
  'Determinate: “What are the two distinct angle measures in a parallelogram if one angle is 70°?” → 70° and 110°. CBD more often when they ask for angle B (or another named part) without a labeled figure — you cannot fix which valid measure they mean.';

export const WP_BRIDGE_PATTERNS: string[] = [
  'This lesson is the translation layer before specialized tabs: ratios, rate × quantity, distance–speed–time, work rate, percents, mixtures, inequalities / break-even.',
  'On the test, name the story pattern first, then use another tab’s formula only if the story needs it.',
];

export const WP_WORKED_STUDIO: WpWorkedStudioItem[] = [
  {
    label: 'Studio A — remainder wording',
    problem:
      'There are 47 convention participants. Each dorm room holds 6. How many participants are in the room that is not full?',
    lines: [
      '47 ÷ 6 = 7 remainder 5.',
      'They want the incomplete room, not how many full rooms → use the remainder.',
    ],
    answer: '5',
  },
  {
    label: 'Studio B — round up + distractors',
    problem: '42 passengers per plane trip. How many trips to transport 104 people 100 miles in 1 day?',
    lines: [
      'Use 104 ÷ 42 only — miles and “1 day” do not limit trips here.',
      '104 ÷ 42 = 2 r20 → need a third trip for the last 20 people.',
    ],
    answer: '3 trips',
  },
];

export const WP_PATTERN_QUIZ: WpPatternQuizItem[] = [
  {
    id: 'wpq-1',
    question: 'Sum of two numbers is 48. One is 12 more than the other. Smaller number?',
    patternChoices: 'A number · B remainder · C round up · D CBD',
    reveal: 'A — x + (x+12) = 48 → x = 18.',
  },
  {
    id: 'wpq-2',
    question: '71 people, rooms of 9. How many in the room that is not full?',
    patternChoices: 'A · B · C · D',
    reveal: 'B — 71 ÷ 9 = 7 r8 → 8.',
  },
  {
    id: 'wpq-3',
    question: 'Same 71 people — how many rooms needed for everyone?',
    patternChoices: 'A · B · C · D',
    reveal: 'C — 71 ÷ 9 → round up → 8 rooms.',
  },
  {
    id: 'wpq-4',
    question: 'Parallelogram, one angle 55°. What is angle B? No diagram.',
    patternChoices: 'A · B · C · D',
    reveal: 'D — cannot determine which measure sits at B without a figure.',
  },
  {
    id: 'wpq-5',
    question: 'Shuttle holds 25. How many trips for 80 people?',
    patternChoices: 'A · B · C · D',
    reveal: 'C — 80 ÷ 25 = 3 r5 → 4 trips.',
  },
  {
    id: 'wpq-6',
    question: 'Three times a number, minus 5, equals 19. The number?',
    patternChoices: 'A · B · C · D',
    reveal: 'A — 3x − 5 = 19 → x = 8.',
  },
];

export const WP_QUICK_RECOGNITION: WpQuickRecognitionRow[] = [
  { phrase: 'sum of two numbers', think: 'add two expressions; tie to one variable' },
  { phrase: 'one is k more than the other', think: 'x and x + k (define smaller first)' },
  { phrase: 'in the room / row that is not full', think: 'divide → remainder' },
  { phrase: 'buses, trips, boxes, rooms needed', think: 'divide → round up if remainder' },
  { phrase: 'extra miles or “urgent mission” only', think: 'distractor unless rate/time caps load' },
  { phrase: 'named angle, no diagram', think: 'possible CBD' },
];

export const WP_COMMON_MISTAKES: WpMistakeItem[] = [
  {
    title: 'Quotient instead of remainder',
    detail:
      '47 ÷ 6 → answering 7 for people in the last partial room. 7 counts full rooms; the incomplete room has 5.',
  },
  {
    title: 'Remainder instead of round up',
    detail: '65 ÷ 12 = 5 r5 for “how many buses” → 6 buses, not 5. Leftover people still need a ride.',
  },
  {
    title: 'Sloppy variable',
    detail: 'Mixing up which quantity is x makes the equation wrong — pick smaller or simpler first and stick to it.',
  },
  {
    title: 'Chasing distractors',
    detail: 'Ask “does this number change what they asked for?” If not, ignore it.',
  },
  {
    title: 'Forcing a guess when CBD fits',
    detail: 'If the target is under-specified, cannot be determined is a legitimate answer.',
  },
];

export const WP_CLOSING_SUMMARY: string[] = [
  'Identify the exact target (smaller number, remainder, round-up count, or CBD).',
  'Define x; translate each clause; solve; then interpret (remainder vs ceil vs CBD).',
  'Re-read for distractors before you bubble.',
];

export const WP_NEXT_STEPS: WpNavLink[] = [
  { label: 'Pattern drill', href: '/arithmetic-reasoning/pattern-drill' },
  { label: 'All AR patterns (#16)', href: '/arithmetic-reasoning/patterns' },
  { label: 'Distance, speed & time', href: '/arithmetic-reasoning/rate-distance-time' },
  { label: 'Work rate', href: '/arithmetic-reasoning/work-rate' },
];
