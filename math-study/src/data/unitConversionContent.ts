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

export type UnitMemoryTag =
  | 'length'
  | 'weight'
  | 'volume'
  | 'count'
  | 'area'
  | 'mixed'
  | 'reverse'
  | 'rate';

export interface UnitMemoryCard {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  tags: UnitMemoryTag[];
}

export const UNIT_CONVERSION_INTRO = {
  headline: '🧠 Unit Conversion Master System',
  goals: [
    'Understand the conversion structure, not just memorized facts.',
    'See visual patterns so setup is fast and reliable.',
    'Practice from easy to elite difficulty with full reasoning.',
    'Transfer these skills into real ASVAB word problems.',
  ],
};

export const UNIT_CONVERSION_LEVEL1 = {
  title: '🔷 Level 1 — Core Principle',
  goldenRule: 'Conversions are multiplying by 1 in a new form.',
  fractionExample: [
    '1 gallon / 4 quarts = 1',
    '5 gal * (4 qt / 1 gal) = 20 qt',
  ],
  cancellationLaw: 'If units do not cancel correctly, the setup is wrong.',
};

export const UNIT_CONVERSION_FACTS = [
  {
    group: '📏 Length',
    facts: ['1 ft = 12 in', '1 yd = 3 ft', '1 mile = 5280 ft'],
  },
  {
    group: '⚖️ Weight',
    facts: ['1 lb = 16 oz', '1 ton = 2000 lb'],
  },
  {
    group: '🧪 Volume',
    facts: ['1 gallon = 4 quarts'],
  },
  {
    group: '🔢 Count',
    facts: ['1 dozen = 12', '1 gross = 144'],
  },
  {
    group: '🌍 Approximation',
    facts: ['1 km ≈ 5/8 mile'],
  },
];

export const UNIT_CONVERSION_PATTERNS = [
  {
    title: '🟢 Type 1 — Basic Conversion',
    example: 'Convert 6 gallons to quarts',
    setup: '6 * 4 = 24',
    why: 'Use the direct factor (1 gal = 4 qt), so each gallon contributes 4 quarts.',
  },
  {
    title: '🟡 Type 2 — Multi-Step Chain',
    example: 'Tons to pounds to ounces',
    setup: 'tons -> lb -> oz',
    why: 'You cannot jump units safely if you do not know a direct factor. Chain through known facts.',
  },
  {
    title: '🔵 Type 3 — Area (Squared Units)',
    example: 'Convert ft^2 to yd^2',
    setup: '1 yd^2 = 9 ft^2',
    why: 'Area uses squared length, so conversion factor must also be squared (3^2 = 9).',
  },
  {
    title: '🟠 Type 4 — Rate + Conversion',
    example: '2 gallons per week',
    setup: 'convert units, then apply per-time rate',
    why: 'Rate problems combine unit conversion with time scaling. Keep each step isolated.',
  },
  {
    title: '🔴 Type 5 — Mixed Units',
    example: '3 ft 8 in to inches',
    setup: '3 * 12 + 8 = 44 in',
    why: 'You must convert all parts to one common unit before adding.',
  },
];

export const UNIT_CONVERSION_PRACTICE: Array<{
  level: string;
  problems: SolvedProblem[];
}> = [
  {
    level: '🟢 Easy Level (Build Confidence)',
    problems: [
      {
        title: 'Problem 1',
        prompt: 'Convert 8 gallons to quarts.',
        steps: [
          {
            step: '8 * 4 = 32 qt',
            why: 'Each gallon contains 4 quarts, so multiply by 4.',
          },
        ],
        answer: '32 quarts',
      },
      {
        title: 'Problem 2',
        prompt: 'Convert 5 dozen to items.',
        steps: [
          {
            step: '5 * 12 = 60',
            why: 'A dozen means 12 items, so scale by 12.',
          },
        ],
        answer: '60 items',
      },
      {
        title: 'Problem 3',
        prompt: 'Convert 3 feet to inches.',
        steps: [
          {
            step: '3 * 12 = 36',
            why: 'One foot has 12 inches, so multiply by 12.',
          },
        ],
        answer: '36 inches',
      },
    ],
  },
  {
    level: '🟡 Medium Level (Real ASVAB Style)',
    problems: [
      {
        title: 'Problem 4',
        prompt: 'How many ounces are in 3 pounds?',
        steps: [
          {
            step: '3 * 16 = 48',
            why: 'One pound has 16 ounces, so convert with a direct factor.',
          },
        ],
        answer: '48 oz',
      },
      {
        title: 'Problem 5',
        prompt: 'Convert 180 ft^2 to yd^2.',
        steps: [
          {
            step: '180 / 9 = 20',
            why: 'Use 1 yd^2 = 9 ft^2, so divide by 9 when moving to larger square units.',
          },
        ],
        answer: '20 yd^2',
      },
      {
        title: 'Problem 6',
        prompt: 'A family drinks 3 gallons/week. How many quarts in 2 weeks?',
        steps: [
          {
            step: '3 * 2 = 6 gal',
            why: 'First scale by time to get total gallons used.',
          },
          {
            step: '6 * 4 = 24 qt',
            why: 'Then convert gallons to quarts using 4 qt per gallon.',
          },
        ],
        answer: '24 quarts',
      },
    ],
  },
  {
    level: '🔴 Hard Level (Real ASVAB Level)',
    problems: [
      {
        title: 'Problem 7',
        prompt: 'A gross is 144 units. If 3 are used per day, how many days will it last?',
        steps: [
          {
            step: '144 / 3 = 48',
            why: 'Convert gross to total units, then divide by daily usage rate.',
          },
        ],
        answer: '48 days',
      },
      {
        title: 'Problem 8',
        prompt: 'A family uses 2 gallons of milk per week. How many weeks will 26 quarts last?',
        steps: [
          {
            step: '2 gal/week = 8 qt/week',
            why: 'Convert weekly usage to quarts so units match the supply.',
          },
          {
            step: '26 / 8 = 3.25',
            why: 'Weeks = total quarts divided by quarts per week.',
          },
        ],
        answer: '3.25 weeks',
      },
      {
        title: 'Problem 9',
        prompt: 'A carpet is 16 ft by 18 ft. Find area in square yards.',
        steps: [
          {
            step: '16 * 18 = 288 ft^2',
            why: 'Area of rectangle is length times width.',
          },
          {
            step: '288 / 9 = 32 yd^2',
            why: 'Convert square feet to square yards using factor 9.',
          },
        ],
        answer: '32 yd^2',
      },
    ],
  },
  {
    level: '⚫ Elite Level (Multi-Layer Problems)',
    problems: [
      {
        title: 'Problem 10 — FEMA Style',
        prompt:
          "As a FEMA planner, you must supply meals after a tornado. A breakfast ration weighs 12 oz and both lunch and dinner weigh 18 oz each. One food truck carries 3 tons. If each resident gets 3 meals per day for 10 days, how many full residents can one truck support?",
        steps: [
          {
            step: 'Per person per day: 12 + 18 + 18 = 48 oz/day',
            why: 'Add breakfast, lunch, and dinner to get one-day food need per person.',
          },
          {
            step: 'Per person for 10 days: 48 * 10 = 480 oz',
            why: 'Multiply the daily rate by total days to get total ounces needed per person.',
          },
          {
            step: 'Truck supply in ounces: 3 tons * 2000 lb/ton * 16 oz/lb = 96,000 oz',
            why: 'Convert truck capacity to the same unit (ounces) before dividing.',
          },
          {
            step: 'People supported: 96,000 / 480 = 200',
            why: 'Total available ounces divided by ounces needed per person gives full residents supported.',
          },
        ],
        answer: '200 full people',
      },
      {
        title: 'Problem 11 — Mixed + Planning',
        prompt: 'A board needs 4 pieces, each 3 ft 8 in. How many feet are needed?',
        steps: [
          {
            step: '3 * 12 + 8 = 44 in per piece',
            why: 'Convert mixed feet/inches into one unit before multiplication.',
          },
          {
            step: '44 * 4 = 176 in total',
            why: 'Multiply by number of equal pieces.',
          },
          {
            step: '176 / 12 = 14.67 ft -> round to 15 ft',
            why: 'Material planning uses whole-foot purchase, so round up.',
          },
        ],
        answer: '15 ft (practical purchase amount)',
      },
      {
        title: 'Problem 12 — Hidden Chain',
        prompt:
          'A truck carries 2 tons of food. Each meal is 24 oz. Each person eats 3 meals/day. How many people for 5 days?',
        steps: [
          {
            step: '2 * 2000 * 16 = 64000 oz',
            why: 'Convert total supply from tons to ounces to match meal unit.',
          },
          {
            step: '24 * 3 = 72 oz/person/day',
            why: 'Find daily requirement for one person.',
          },
          {
            step: '72 * 5 = 360 oz/person for 5 days',
            why: 'Scale daily requirement over full timeline.',
          },
          {
            step: '64000 / 360 = 177.78 -> 177 full people',
            why: 'Use full-people capacity, so round down for complete support.',
          },
        ],
        answer: '177 full people',
      },
      {
        title: 'Problem 13 — Decimal Tons + Ounces',
        prompt:
          'A shelter has 1.8 tons of dry food. Each person needs 64 oz/day for 6 days. How many full people can be supported?',
        steps: [
          {
            step: 'Total food: 1.8 * 2000 * 16 = 57600 oz',
            why: 'Convert tons to pounds, then pounds to ounces so units match consumption.',
          },
          {
            step: 'Per person for 6 days: 64 * 6 = 384 oz',
            why: 'Multiply daily requirement by days.',
          },
          {
            step: 'People supported: 57600 / 384 = 150',
            why: 'Divide total available ounces by ounces needed per person.',
          },
          {
            step: 'Accuracy check: 1 ton = 32000 oz, so 1.8 tons should be 57600 oz (not 576000)',
            why: 'This catches the extra-zero place-value mistake.',
          },
        ],
        answer: '150 full people',
      },
      {
        title: 'Problem 14 — Gross + Daily Use',
        prompt:
          'A clinic receives 2 gross masks. If one patient uses 9 masks/day for 4 days, how many full patients can be supplied?',
        steps: [
          {
            step: 'Convert supply: 2 gross = 2 * 144 = 288 masks',
            why: 'Use the count conversion before any rate work.',
          },
          {
            step: 'Per patient total: 9 * 4 = 36 masks',
            why: 'Find total masks needed per patient for the full period.',
          },
          {
            step: 'Patients supported: 288 / 36 = 8',
            why: 'Total supply divided by need per patient gives full patients.',
          },
        ],
        answer: '8 full patients',
      },
      {
        title: 'Problem 15 — Area + Waste Factor',
        prompt:
          'A room is 24 ft by 15 ft. Flooring is sold by square yards, and you must buy 10% extra for cuts. How many square yards should you buy?',
        steps: [
          {
            step: 'Room area: 24 * 15 = 360 ft^2',
            why: 'Compute area in square feet first.',
          },
          {
            step: 'Convert area: 360 / 9 = 40 yd^2',
            why: 'Use 1 yd^2 = 9 ft^2 (square conversion, not divide by 3).',
          },
          {
            step: 'Add waste: 40 * 1.10 = 44 yd^2',
            why: 'A 10% overage means multiply by 1.10.',
          },
        ],
        answer: '44 yd^2',
      },
      {
        title: 'Problem 16 — Tons to Pounds + Full Capacity',
        prompt:
          'A feed truck carries 2.5 tons. Each animal needs 5 lb/day for 12 days. How many full animals can be supported?',
        steps: [
          {
            step: 'Convert supply: 2.5 * 2000 = 5000 lb',
            why: 'Demand is in pounds, so convert tons to pounds first.',
          },
          {
            step: 'Per animal total: 5 * 12 = 60 lb',
            why: 'Find full-period need per animal.',
          },
          {
            step: 'Animals supported: 5000 / 60 = 83.33 -> 83 full animals',
            why: 'Use only complete support counts, so round down.',
          },
        ],
        answer: '83 full animals',
      },
      {
        title: 'Problem 17 — Mixed Length + Remaining Stock',
        prompt:
          'You need 18 cables, each 2 ft 9 in. A spool has 60 yd of cable. After cutting all 18, how many feet remain?',
        steps: [
          {
            step: 'Each cable: 2 * 12 + 9 = 33 in',
            why: 'Convert mixed units to a single unit before multiplying.',
          },
          {
            step: 'Total needed: 33 * 18 = 594 in = 49.5 ft',
            why: 'Convert inches back to feet for comparison with spool length.',
          },
          {
            step: 'Spool length: 60 yd * 3 = 180 ft',
            why: 'Convert yards to feet to match units.',
          },
          {
            step: 'Remaining cable: 180 - 49.5 = 130.5 ft',
            why: 'Subtract used length from total available length.',
          },
        ],
        answer: '130.5 ft remain',
      },
      {
        title: 'Problem 18 — Gallons + Quarts + Multi-Day',
        prompt:
          'A soup kitchen has 28 gallons of broth. Each person needs 3 quarts/day for 4 days. How many full people can be served?',
        steps: [
          {
            step: 'Convert supply: 28 * 4 = 112 quarts',
            why: 'Demand is in quarts/day, so convert gallons to quarts first.',
          },
          {
            step: 'Per person total: 3 * 4 = 12 quarts',
            why: 'Multiply daily requirement by number of days.',
          },
          {
            step: 'People served: 112 / 12 = 9.33 -> 9 full people',
            why: 'Round down to count only fully supported people.',
          },
        ],
        answer: '9 full people',
      },
      {
        title: 'Problem 19 — Miles to Feet + Interval Trap',
        prompt:
          'An evacuation route is 2.5 miles long. Cones are placed every 40 feet, including both endpoints. How many cones are needed?',
        steps: [
          {
            step: 'Convert distance: 2.5 * 5280 = 13200 ft',
            why: 'Spacing is in feet, so route length must be in feet.',
          },
          {
            step: 'Find intervals: 13200 / 40 = 330 intervals',
            why: 'Each interval is one 40-foot gap.',
          },
          {
            step: 'Cones = intervals + 1 = 331',
            why: 'Including both endpoints means one more cone than intervals.',
          },
        ],
        answer: '331 cones',
      },
      {
        title: 'Problem 20 — Capacity Reserve + Box Count',
        prompt:
          'A pallet limit is 1.2 tons. Packaging materials take 120 lb of that limit. If each box weighs 7.5 lb, how many full boxes can be loaded?',
        steps: [
          {
            step: 'Convert capacity: 1.2 * 2000 = 2400 lb',
            why: 'Box weight is in pounds, so convert tons to pounds first.',
          },
          {
            step: 'Usable weight: 2400 - 120 = 2280 lb',
            why: 'Reserve weight must be removed before dividing.',
          },
          {
            step: 'Boxes: 2280 / 7.5 = 304',
            why: 'Divide usable pounds by pounds per box.',
          },
        ],
        answer: '304 full boxes',
      },
      {
        title: 'Problem 21 — Yards to Feet + Grouping',
        prompt:
          'A banner shop has 45 yards of fabric. Each banner uses 3 strips, and each strip is 2 ft 6 in long. How many full banners can be made?',
        steps: [
          {
            step: 'Total fabric: 45 * 3 = 135 ft',
            why: 'Convert yards to feet to match strip length unit.',
          },
          {
            step: 'One banner needs: 2.5 ft * 3 = 7.5 ft',
            why: 'Convert 2 ft 6 in to 2.5 ft, then multiply by strips per banner.',
          },
          {
            step: 'Banners: 135 / 7.5 = 18',
            why: 'Divide total available feet by feet required per banner.',
          },
        ],
        answer: '18 full banners',
      },
      {
        title: 'Problem 22 — Daily Gallons + Packaging Units',
        prompt:
          'A camp uses 1.75 gallons of sanitizer per day for 12 days. Sanitizer is sold in 2-quart bottles. How many bottles are needed?',
        steps: [
          {
            step: 'Total gallons: 1.75 * 12 = 21 gallons',
            why: 'Scale daily use over the full timeline first.',
          },
          {
            step: 'Convert to quarts: 21 * 4 = 84 quarts',
            why: 'Bottle size is in quarts, so total must be in quarts.',
          },
          {
            step: 'Bottles needed: 84 / 2 = 42',
            why: 'Each bottle provides 2 quarts.',
          },
        ],
        answer: '42 bottles',
      },
    ],
  },
];

export const UNIT_CONVERSION_STRATEGIES = [
  {
    title: '⚔️ Strategy 1 — Always convert first',
    tip: 'Never mix different units in the same equation line.',
  },
  {
    title: '⚔️ Strategy 2 — Look for chains',
    tip: 'If you see tons, ounces, days, and people together, it is a multi-step chain.',
  },
  {
    title: '⚔️ Strategy 3 — Watch for squares',
    tip: 'ft^2 <-> yd^2 requires dividing or multiplying by 9, not 3.',
  },
  {
    title: '⚔️ Strategy 4 — Estimate for sanity',
    tip: 'Check magnitude quickly to catch direction mistakes.',
  },
];

export const UNIT_CONVERSION_DRILL_SETS: Array<{
  title: string;
  items: Array<{ problem: string; answer: string; why: string }>;
}> = [
  {
    title: '🧪 Drill Set A (Easy)',
    items: [
      {
        problem: '7 gallons -> quarts',
        answer: '28 quarts',
        why: 'Multiply by 4 because 1 gallon = 4 quarts.',
      },
      {
        problem: '4 dozen -> items',
        answer: '48 items',
        why: 'Multiply by 12 because 1 dozen = 12.',
      },
      {
        problem: '6 ft -> inches',
        answer: '72 inches',
        why: 'Multiply by 12 because 1 foot = 12 inches.',
      },
    ],
  },
  {
    title: '🧪 Drill Set B (Medium)',
    items: [
      {
        problem: '5 lb -> oz',
        answer: '80 oz',
        why: 'Multiply by 16 because 1 lb = 16 oz.',
      },
      {
        problem: '360 ft^2 -> yd^2',
        answer: '40 yd^2',
        why: 'Divide by 9 because 1 yd^2 = 9 ft^2.',
      },
      {
        problem: '3 gallons/day for 4 days -> quarts',
        answer: '48 quarts',
        why: '3 * 4 = 12 gallons, then 12 * 4 = 48 quarts.',
      },
    ],
  },
  {
    title: '🧪 Drill Set C (Hard)',
    items: [
      {
        problem: '1.5 tons -> oz',
        answer: '48000 oz',
        why: '1.5 * 2000 = 3000 lb, then 3000 * 16 = 48000 oz.',
      },
      {
        problem: 'Four pieces each 3 ft 8 in -> total feet',
        answer: '15 ft (rounded up)',
        why: 'Each piece is 44 in, total 176 in, then 176 / 12 = 14.67 ft -> round up.',
      },
      {
        problem: '2 tons food, 24 oz/meal, 3 meals/day, 5 days -> people',
        answer: '177 full people',
        why: 'Convert supply to ounces, compute per-person total ounces, then divide.',
      },
    ],
  },
  {
    title: '🧪 Drill Set D (Elite)',
    items: [
      {
        problem: 'Design a FEMA-style chain conversion from your own numbers.',
        answer: 'Any valid setup with full unit cancellation.',
        why: 'This tests whether you can build, not just solve, conversion systems.',
      },
      {
        problem: 'Combine conversion + rate + time + division in one scenario.',
        answer: 'Must show each step with unit cancellation.',
        why: 'ASVAB hard questions hide multiple patterns in one story.',
      },
    ],
  },
];

export const UNIT_MEMORY_DECK: UnitMemoryCard[] = [
  {
    id: 'umc-001',
    prompt: '1 yard = ? feet',
    choices: ['2', '3', '4', '6'],
    answerIndex: 1,
    explanation: 'Direct length fact: 1 yd = 3 ft.',
    tags: ['length'],
  },
  {
    id: 'umc-002',
    prompt: '1 foot = ? inches',
    choices: ['10', '12', '16', '18'],
    answerIndex: 1,
    explanation: 'Direct length fact: 1 ft = 12 in.',
    tags: ['length'],
  },
  {
    id: 'umc-003',
    prompt: '1 mile = ? feet',
    choices: ['1320', '2640', '5280', '10000'],
    answerIndex: 2,
    explanation: 'Direct length fact: 1 mile = 5,280 ft.',
    tags: ['length'],
  },
  {
    id: 'umc-004',
    prompt: '16 oz = ? pound',
    choices: ['1/4', '1/2', '1', '2'],
    answerIndex: 2,
    explanation: 'Inverse of the core fact 1 lb = 16 oz.',
    tags: ['weight', 'reverse'],
  },
  {
    id: 'umc-005',
    prompt: '1 pound = ? ounces',
    choices: ['8', '12', '16', '24'],
    answerIndex: 2,
    explanation: 'Direct weight fact: 1 lb = 16 oz.',
    tags: ['weight'],
  },
  {
    id: 'umc-006',
    prompt: '2000 pounds = ? ton',
    choices: ['1/2', '1', '2', '20'],
    answerIndex: 1,
    explanation: 'Inverse of the core fact 1 ton = 2,000 lb.',
    tags: ['weight', 'reverse'],
  },
  {
    id: 'umc-007',
    prompt: '1 ton = ? pounds',
    choices: ['1000', '1500', '2000', '5000'],
    answerIndex: 2,
    explanation: 'Core fact: 1 ton = 2,000 lb.',
    tags: ['weight'],
  },
  {
    id: 'umc-008',
    prompt: '1 gallon = ? quarts',
    choices: ['2', '3', '4', '8'],
    answerIndex: 2,
    explanation: 'Direct volume fact: 1 gal = 4 qt.',
    tags: ['volume'],
  },
  {
    id: 'umc-009',
    prompt: '4 quarts = ? gallon',
    choices: ['1/4', '1/2', '1', '4'],
    answerIndex: 2,
    explanation: 'Inverse of the core fact 1 gal = 4 qt.',
    tags: ['volume', 'reverse'],
  },
  {
    id: 'umc-010',
    prompt: '1 dozen = ? items',
    choices: ['10', '12', '24', '144'],
    answerIndex: 1,
    explanation: 'Count fact: 1 dozen means 12 items.',
    tags: ['count'],
  },
  {
    id: 'umc-011',
    prompt: '1 gross = ? items',
    choices: ['12', '24', '120', '144'],
    answerIndex: 3,
    explanation: 'Count fact: 1 gross = 144.',
    tags: ['count'],
  },
  {
    id: 'umc-012',
    prompt: '12 items = ? dozen',
    choices: ['1/2', '1', '2', '12'],
    answerIndex: 1,
    explanation: 'Inverse of the core fact 1 dozen = 12.',
    tags: ['count', 'reverse'],
  },
  {
    id: 'umc-013',
    prompt: '1 yd^2 = ? ft^2',
    choices: ['3', '6', '9', '12'],
    answerIndex: 2,
    explanation: 'Square conversion: (3 ft)^2 = 9 ft^2.',
    tags: ['area'],
  },
  {
    id: 'umc-014',
    prompt: '9 ft^2 = ? yd^2',
    choices: ['1/9', '1', '3', '9'],
    answerIndex: 1,
    explanation: 'Inverse square fact: 9 ft^2 equals 1 yd^2.',
    tags: ['area', 'reverse'],
  },
  {
    id: 'umc-015',
    prompt: '1 km is approximately ? mile',
    choices: ['1/4', '1/2', '5/8', '1'],
    answerIndex: 2,
    explanation: 'Approximation fact used in ASVAB contexts: 1 km ≈ 5/8 mile.',
    tags: ['length'],
  },
  {
    id: 'umc-016',
    prompt: '12 inches = ? foot',
    choices: ['1/2', '1', '2', '12'],
    answerIndex: 1,
    explanation: 'Inverse of 1 ft = 12 in.',
    tags: ['length', 'reverse'],
  },
  {
    id: 'umc-017',
    prompt: '3 feet = ? yard',
    choices: ['1/3', '1', '3', '9'],
    answerIndex: 1,
    explanation: 'Inverse of 1 yd = 3 ft.',
    tags: ['length', 'reverse'],
  },
  {
    id: 'umc-018',
    prompt: '144 items = ? gross',
    choices: ['1/12', '1', '12', '144'],
    answerIndex: 1,
    explanation: 'Inverse of the count fact 1 gross = 144.',
    tags: ['count', 'reverse'],
  },
];

export const UNIT_CONVERSION_FINAL_NOTES = {
  finalTruth:
    'You are not just learning conversions. You are learning how to break real systems into step-by-step math.',
  advantage: [
    'Most people memorize facts and panic on word problems.',
    'You will identify structure, convert correctly, and solve in clean steps.',
  ],
};
