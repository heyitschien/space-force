export interface ArTopic {
  id: string;
  title: string;
  description: string;
  principles: string[];
  rules: string[];
  simpleExample: { problem: string; solution: string; shortcut?: string };
  practiceProblems: Array<{ problem: string; solution: string }>;
  testQuestionIds: string[];
}

export const AR_TOPICS: ArTopic[] = [
  {
    id: 'order-of-operations',
    title: 'Order of Operations (PEMDAS)',
    description: 'Parentheses, exponents, multiply/divide, add/subtract. The order you must follow in every expression.',
    principles: [
      'P → E → M/D (left to right) → A/S (left to right)',
      'Parentheses first; then exponents',
      'Multiplication and division have equal priority — do left to right',
      'Addition and subtraction have equal priority — do left to right',
    ],
    rules: [
      'Step 1: Simplify inside parentheses.',
      'Step 2: Exponents.',
      'Step 3: Multiply and divide left to right.',
      'Step 4: Add and subtract left to right.',
      'Common trap: 6 + 3 × 4 ≠ 36; multiply first → 6 + 12 = 18.',
    ],
    simpleExample: {
      problem: '6 + 3 × 4 = ?',
      solution: '3 × 4 = 12 first. 6 + 12 = 18.',
      shortcut: 'Multiply before add.',
    },
    practiceProblems: [
      {
        problem: '(8 − 2) × 3 = ?',
        solution: '8 − 2 = 6 first. 6 × 3 = 18.',
      },
      {
        problem: '20 ÷ 4 + 3 = ?',
        solution: '20 ÷ 4 = 5 first. 5 + 3 = 8.',
      },
      {
        problem: '2 + 3² × 2 = ?',
        solution: '3² = 9 first. 9 × 2 = 18. 2 + 18 = 20.',
      },
    ],
    testQuestionIds: [],
  },
  {
    id: 'percents',
    title: 'Percents',
    description: 'Percent of a number, percent increase/decrease, tax, tips, discounts.',
    principles: [
      'part = whole × (percent ÷ 100)',
      'percent = (part ÷ whole) × 100',
      'percent change = ((new − old) ÷ old) × 100',
      '"X is Y% more than Z" means X = Z × (1 + Y/100)',
    ],
    rules: [
      'To find a percent of a number: multiply the number by the decimal form (e.g., 12% = 0.12).',
      'To find what percent A is of B: divide A by B and multiply by 100.',
      'For percent increase: new = old × (1 + percent/100).',
      'For successive discounts: apply each discount to the new price (e.g., 20% off then 15% off: price × 0.80 × 0.85).',
      'Mental shortcuts: 10% = move decimal left; 5% = half of 10%; 25% = divide by 4; 50% = divide by 2.',
    ],
    simpleExample: {
      problem: 'What is 15% of 80?',
      solution: '15% of 80 = 0.15 × 80 = 12',
      shortcut: '10% of 80 = 8. 25% = divide by 4 → 20. ~15 sec.',
    },
    practiceProblems: [
      {
        problem: 'A shirt costs $40. With 25% off, what is the sale price?',
        solution: '25% off means you pay 75%. $40 × 0.75 = $30.',
      },
      {
        problem: 'If 18 out of 24 students passed, what percent passed?',
        solution: '18 ÷ 24 = 0.75 = 75%.',
      },
    ],
    testQuestionIds: ['ar-p1-005', 'ar-p2-001', 'ar-p2-029'],
  },
  {
    id: 'rate-multiply',
    title: 'Rate × Quantity',
    description: 'Cost per unit, hourly pay, monthly payments, savings per item.',
    principles: [
      'total = rate × quantity',
      'quantity = total ÷ rate',
      'rate = total ÷ quantity',
    ],
    rules: [
      'Identify the rate (cost per unit, pay per hour, etc.) and the quantity.',
      'Multiply rate × quantity to get the total.',
      'For savings: (original price − sale price) × number of items.',
      'For total cost with down payment: down + (monthly payment × number of months).',
    ],
    simpleExample: {
      problem: 'If apples cost $2.50 per pound, how much for 4 pounds?',
      solution: '$2.50 × 4 = $10.00',
    },
    practiceProblems: [
      {
        problem: 'A worker earns $18/hour. How much for a 35-hour week?',
        solution: '$18 × 35 = $630.',
      },
      {
        problem: 'You save $1.50 per case on 6 cases. Total savings?',
        solution: '$1.50 × 6 = $9.00.',
      },
    ],
    testQuestionIds: ['ar-p1-001', 'ar-p1-021', 'ar-p2-028'],
  },
  {
    id: 'unit-conversion',
    title: 'Unit Conversion',
    description: 'Converting between units: gross, tons, ounces, feet, yards, quarts, gallons.',
    principles: [
      '1 gross = 144',
      '1 ton = 2,000 lb; 1 lb = 16 oz',
      '1 yd = 3 ft; 1 yd² = 9 ft²',
      '1 km ≈ 5/8 mile',
      '1 dozen = 12; 1 gallon = 4 quarts',
    ],
    rules: [
      'Write the conversion as a fraction so units cancel (e.g., 288 ft² × 1 yd²/9 ft² = 32 yd²).',
      'For multi-step: convert step by step (tons → lb → oz, then divide by daily ration).',
      'For feet and inches: 1 ft = 12 in; convert to inches, compute, then convert back.',
    ],
    simpleExample: {
      problem: 'Convert 288 ft² to square yards.',
      solution: '288 ft² × (1 yd² / 9 ft²) = 288 ÷ 9 = 32 yd². Units cancel.',
    },
    practiceProblems: [
      {
        problem: 'Convert 5 gallons to quarts.',
        solution: '1 gal = 4 qt, so 5 × 4 = 20 quarts.',
      },
      {
        problem: 'A room is 15 ft × 12 ft. Area in square yards?',
        solution: '15 × 12 = 180 ft². 180 ÷ 9 = 20 yd².',
      },
    ],
    testQuestionIds: ['ar-p1-003', 'ar-p1-025', 'ar-p2-022'],
  },
  {
    id: 'rate-distance-time',
    title: 'Distance, Speed & Time',
    description: 'Master the 6 motion patterns used on the ASVAB',
    principles: [
      'distance = speed × time',
      'time = distance ÷ speed',
      'speed = distance ÷ time',
      'When objects move in opposite directions: total distance = sum of distances.',
    ],
    rules: [
      'For catch-up: find how far the first person traveled, then divide by the chaser\'s time.',
      'For trains moving apart: add their distances (or add speeds × time).',
      'For gas cost: distance = speed × time; gallons = distance ÷ mpg; cost = gallons × price per gallon.',
    ],
    simpleExample: {
      problem: 'A car travels 60 mph for 3 hours. How far?',
      solution: '60 × 3 = 180 miles.',
      shortcut: 'd = rt. ~20 sec.',
    },
    practiceProblems: [
      {
        problem: 'How long to drive 240 miles at 48 mph?',
        solution: '240 ÷ 48 = 5 hours.',
      },
      {
        problem: 'Two cars leave the same point at 50 mph and 60 mph in opposite directions. How far apart after 2 hours?',
        solution: '50×2 + 60×2 = 100 + 120 = 220 miles.',
      },
    ],
    testQuestionIds: ['ar-p1-010', 'ar-p1-026', 'ar-p1-030'],
  },
  {
    id: 'fractions',
    title: 'Fractions',
    description: 'Fraction of a quantity, common denominators, fraction of time.',
    principles: [
      'Fraction of a number: (fraction) × number',
      'To add fractions: find a common denominator',
      '"X is 2/5 of Y" means X = (2/5) × Y, so Y = X ÷ (2/5) = X × (5/2)',
      '"One-fifth more" means multiply by 1.2 (or 6/5)',
      'Always reduce fractions before computing when possible (e.g., 18/24 = 3/4).',
    ],
    rules: [
      'Simplify first: 18/24 = 3/4. Reduces errors and speeds up.',
      'For "how much is left": find total taken (add fractions with common denominator), then subtract from 1.',
      'For "2/5 of 40 hours": 2/5 × 40 = 16.',
      'For "one-fifth more than predicted": actual = predicted × 1.2; solve for predicted.',
    ],
    simpleExample: {
      problem: 'What is 3/4 of 24?',
      solution: '3/4 × 24 = 18.',
    },
    practiceProblems: [
      {
        problem: 'Simplify 18/24, then find 18/24 of 48.',
        solution: '18/24 = 3/4. 3/4 × 48 = 36.',
      },
      {
        problem: 'A recipe needs 1/3 cup sugar per batch. How many batches from 4 cups?',
        solution: '4 ÷ (1/3) = 4 × 3 = 12 batches.',
      },
      {
        problem: 'If 600 is one-fifth more than x, find x.',
        solution: '600 = 1.2x, so x = 600 ÷ 1.2 = 500.',
      },
    ],
    testQuestionIds: ['ar-p1-011', 'ar-p2-017', 'ar-p2-024'],
  },
  {
    id: 'averages',
    title: 'Averages',
    description: 'Mean = sum ÷ count; finding a missing value to hit a target average.',
    principles: [
      'average (mean) = sum of values ÷ number of values',
      'sum = average × number of values',
      'To find missing value: (sum + x) ÷ (n + 1) = target → solve for x',
    ],
    rules: [
      'Add all known values to get the sum.',
      'For target average: (current sum + new value) ÷ (n + 1) = target. Solve for new value.',
      'Formula: new value = target × (n + 1) − current sum.',
    ],
    simpleExample: {
      problem: 'Average of 70, 80, 90?',
      solution: '(70 + 80 + 90) ÷ 3 = 240 ÷ 3 = 80.',
      shortcut: 'Sum ÷ count. ~15 sec.',
    },
    practiceProblems: [
      {
        problem: 'Scores are 85, 90, 88. What score on the 4th test for an average of 88?',
        solution: '(85+90+88+x)÷4 = 88. 263+x = 352. x = 89.',
      },
      {
        problem: 'Monthly spending: $100, $120, $110. Average?',
        solution: '(100+120+110)÷3 = 330÷3 = $110.',
      },
    ],
    testQuestionIds: ['ar-p1-004', 'ar-p1-022', 'ar-p2-023'],
  },
  {
    id: 'area-volume',
    title: 'Area & Volume',
    description: 'Rectangle area, square feet to square yards, Pythagorean theorem.',
    principles: [
      'Rectangle area = length × width',
      '1 yd² = 9 ft² (3 ft × 3 ft)',
      'Pythagorean theorem: a² + b² = c² for right triangles',
    ],
    rules: [
      'For rectangular area in ft²: multiply length × width.',
      'To convert ft² to yd²: divide by 9.',
      'For pole and shadow: pole and shadow form legs of a right triangle; hypotenuse = √(pole² + shadow²).',
    ],
    simpleExample: {
      problem: 'Area of a 10 ft × 8 ft room in square feet?',
      solution: '10 × 8 = 80 ft².',
    },
    practiceProblems: [
      {
        problem: 'A 12 ft × 18 ft carpet. How many square yards?',
        solution: '12×18 = 216 ft². 216 ÷ 9 = 24 yd².',
      },
      {
        problem: 'A 6 ft pole casts an 8 ft shadow. Distance from pole tip to shadow tip?',
        solution: '6² + 8² = 36 + 64 = 100. √100 = 10 ft.',
      },
    ],
    testQuestionIds: ['ar-p1-006', 'ar-p1-007', 'ar-p2-027'],
  },
  {
    id: 'ratios',
    title: 'Ratios & Proportions',
    description: 'Ratios, proportions, scale (map to real), simple probability.',
    principles: [
      'Ratio a:b means a/b; set up proportion a/b = c/d and cross-multiply',
      'Scale: map distance / real distance = constant',
      'Probability = favorable outcomes ÷ total outcomes',
    ],
    rules: [
      'For "3:4 red to blue, 80 blue": red/80 = 3/4, so red = 80 × (3/4) = 60.',
      'For scale ½ in = 1 mile: 4.5 in = 4.5 ÷ 0.5 = 9 miles.',
      'For "3 trucks for 24 homes, how many for 72": 72/24 = 3, so 3 × 3 = 9 trucks.',
    ],
    simpleExample: {
      problem: 'If the ratio of boys to girls is 2:3 and there are 15 girls, how many boys?',
      solution: 'boys/15 = 2/3, so boys = 15 × (2/3) = 10.',
      shortcut: 'Scale factor: 15÷3=5, so 2×5=10. ~20 sec.',
    },
    practiceProblems: [
      {
        problem: '2 cups flour for 12 cookies. How many cups for 36 cookies?',
        solution: '36/12 = 3, so 2 × 3 = 6 cups.',
      },
      {
        problem: 'Probability of drawing a heart from a deck with 13 hearts and 52 cards?',
        solution: '13 ÷ 52 = 1/4.',
      },
    ],
    testQuestionIds: ['ar-p2-012', 'ar-p2-014', 'ar-p2-018'],
  },
  {
    id: 'inequalities',
    title: 'Inequalities & Break-Even',
    description: 'Revenue > cost for profit; comparing unit prices to minimize cost.',
    principles: [
      'Profit when revenue > cost',
      'Break-even: revenue = cost',
      'To minimize cost: compare total price for the quantity needed',
    ],
    rules: [
      'For break-even: set revenue = cost, solve for quantity. Need to sell more than that for profit.',
      'For "least amount of money": compute total cost for each option (e.g., 11×$108 vs 6×$215 for 55 gallons).',
      'Watch for "at least" or "more than" — answer may be the next whole number.',
    ],
    simpleExample: {
      problem: 'Selling at $5 each, cost $2 each. How many to sell to make more than $30 profit?',
      solution: 'Profit per unit = $3. 30 ÷ 3 = 10. Need more than 10, so at least 11.',
    },
    practiceProblems: [
      {
        problem: 'Option A: 10 for $50. Option B: 25 for $110. Which is cheaper per unit?',
        solution: 'A: $5/unit. B: $110/25 = $4.40/unit. B is cheaper.',
      },
      {
        problem: 'Overhead $1000, cost $3/item, sell $5/item. Break-even quantity?',
        solution: '5x = 1000 + 3x → 2x = 1000 → x = 500.',
      },
    ],
    testQuestionIds: ['ar-p1-008', 'ar-p1-024', 'ar-p3-024'],
  },
  {
    id: 'word-problem-setup',
    title: 'Word Problem Setup',
    description: 'Translating words to equations; remainder/division; "cannot be determined".',
    principles: [
      '"Sum of two numbers" → x + y',
      '"One number is 8 more than the other" → y = x + 8',
      'Remainder: 47 ÷ 6 = 7 r5 means 5 in the last room',
      'Sometimes "cannot be determined" when info is insufficient',
    ],
    rules: [
      'Define a variable for the unknown. For "smaller number", let x = smaller, then larger = x + 8.',
      'For "how many in the room that is not full": divide total by capacity; remainder is the answer.',
      'For "how many trips": divide total people by capacity per trip; round up.',
      'Parallelogram: consecutive angles sum to 180°, but "two angles" without specifying which → cannot be determined.',
    ],
    simpleExample: {
      problem: 'Two numbers sum to 50. One is 10 more than the other. Find the smaller.',
      solution: 'x + (x+10) = 50 → 2x = 40 → x = 20.',
    },
    practiceProblems: [
      {
        problem: '65 people, buses hold 12. How many buses needed?',
        solution: '65 ÷ 12 = 5 r5, so 6 buses.',
      },
      {
        problem: '38 students, rooms hold 5. How many in the last room?',
        solution: '38 ÷ 5 = 7 r3, so 3 in the last room.',
      },
    ],
    testQuestionIds: ['ar-p1-002', 'ar-p2-015', 'ar-p2-026'],
  },
  {
    id: 'work-rate',
    title: 'Work Rate',
    description: 'Jobs per hour; combined rates when workers or pipes work together.',
    principles: [
      'rate = 1 ÷ time to complete job',
      'combined rate = sum of individual rates',
      'time = 1 ÷ combined rate',
    ],
    rules: [
      'One worker in 6 hours: rate = 1/6 job per hour.',
      'Two workers: 2 × (1/6) = 1/3 job per hour → 3 hours total.',
      'For pipes: Pipe A fills in 4 hr (rate 1/4), Pipe B in 6 hr (rate 1/6). Together: 1/4 + 1/6 = 5/12 → 12/5 hr.',
    ],
    simpleExample: {
      problem: '1 worker finishes in 6 hours. How long with 2 workers?',
      solution: 'Rate = 1/6 per hour. 2 workers: 2/6 = 1/3 per hour. Time = 1 ÷ (1/3) = 3 hours.',
      shortcut: 'Double workers → half the time. ~20 sec.',
    },
    practiceProblems: [
      {
        problem: 'Pipe A fills tank in 4 hr, Pipe B in 6 hr. How long together?',
        solution: '1/4 + 1/6 = 5/12. Time = 12/5 = 2.4 hours.',
      },
      {
        problem: '3 workers complete a job in 8 hours. How long for 1 worker?',
        solution: 'Combined rate = 1/8. One worker = 1/24. Time = 24 hours.',
      },
    ],
    testQuestionIds: [],
  },
  {
    id: 'mixture',
    title: 'Mixture Problems',
    description: 'Mixing two concentrations to get a target; cross method shortcut.',
    principles: [
      'Cross method: high − target, target − low gives ratio',
      'Ratio parts of high : parts of low',
      'Final concentration = (amount₁ × conc₁ + amount₂ × conc₂) ÷ total amount',
    ],
    rules: [
      'Mix 10% and 30% to get 20%: 30−20=10, 20−10=10 → ratio 1:1.',
      'Mix $3/lb and $5/lb to get $4/lb: 5−4=1, 4−3=1 → 1:1 ratio.',
      'For "how much of each": set up equation or use the ratio.',
    ],
    simpleExample: {
      problem: 'Mix 10% acid with 30% acid to get 20%. What ratio?',
      solution: 'Cross: 30−20=10, 20−10=10. Ratio 1:1 (equal parts of each).',
      shortcut: 'Cross method. ~25 sec.',
    },
    practiceProblems: [
      {
        problem: 'Blend $3/lb coffee with $5/lb to get $4/lb. Ratio?',
        solution: '5−4=1, 4−3=1. 1:1 ratio.',
      },
      {
        problem: 'Mix 15% and 45% to get 30%. Ratio?',
        solution: '45−30=15, 30−15=15. 1:1 ratio.',
      },
    ],
    testQuestionIds: [],
  },
  {
    id: 'decimals',
    title: 'Decimal Operations',
    description: 'Multiplying decimals; place the decimal by counting total places.',
    principles: [
      'Ignore decimals, multiply as whole numbers',
      'Count total decimal places in both factors',
      'Place decimal in product so total places match',
    ],
    rules: [
      '2.5 × 0.4: 25 × 4 = 100. Two places + one place = three. 1.00 (or 1).',
      '1.2 × 3.5: 12 × 35 = 420. One + one = two. 4.20.',
      'For division: move decimals to make divisor whole, then divide.',
    ],
    simpleExample: {
      problem: '2.5 × 0.4 = ?',
      solution: '25 × 4 = 100. 2.5 has 1 place, 0.4 has 1. Product: 1.00.',
      shortcut: 'Multiply, then place decimal. ~15 sec.',
    },
    practiceProblems: [
      {
        problem: '1.2 × 3.5 = ?',
        solution: '12 × 35 = 420. Two decimal places → 4.20.',
      },
      {
        problem: '0.06 × 0.5 = ?',
        solution: '6 × 5 = 30. Two + one = three places → 0.030.',
      },
      {
        problem: '3.6 ÷ 0.4 = ?',
        solution: 'Move decimals: 36 ÷ 4 = 9.',
      },
    ],
    testQuestionIds: [],
  },
];

export function getArTopicById(id: string): ArTopic | undefined {
  return AR_TOPICS.find((t) => t.id === id);
}
