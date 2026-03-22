export type ArPatternFamily = 'percent' | 'ratio-rate' | 'motion-work' | 'geometry' | 'arithmetic';

export type ArPatternPriority = 'core' | 'standard';

export interface ArPattern {
  id: number;
  name: string;
  formula: string;
  quickExample: string;
  topicIds: string[];
  family: ArPatternFamily;
  /** High-yield patterns for 80/20 study — shown on cards and core drill mode */
  priority?: ArPatternPriority;
  /** Short phrase cues that signal this pattern */
  triggerPhrases?: string[];
  /** Display-only speed goal (no timer enforcement in app v1) */
  timeTargetLabel?: string;
}

/** Highest-yield pattern IDs: percent + ratio/rate + unit conversion + motion */
export const AR_CORE_PATTERN_IDS = [1, 2, 3, 4, 5, 11, 14, 15] as const;

const AR_CORE_PATTERN_ID_SET = new Set<number>(AR_CORE_PATTERN_IDS);

export function getCorePatternIds(): readonly number[] {
  return AR_CORE_PATTERN_IDS;
}

export function isCorePattern(patternId: number): boolean {
  return AR_CORE_PATTERN_ID_SET.has(patternId);
}

export const AR_PATTERN_FAMILIES: Array<{ id: ArPatternFamily; label: string }> = [
  { id: 'percent', label: 'Percent Patterns' },
  { id: 'ratio-rate', label: 'Ratio / Rate Patterns' },
  { id: 'motion-work', label: 'Motion & Work' },
  { id: 'geometry', label: 'Geometry' },
  { id: 'arithmetic', label: 'Arithmetic Mechanics' },
];

export interface PatternStem {
  stem: string;
  patternId: number;
}

export const AR_20_PATTERNS: ArPattern[] = [
  {
    id: 1,
    name: 'Distance / Speed / Time',
    formula: 'd = rt',
    quickExample: '60 mph × 3 hr = 180 mi',
    topicIds: ['rate-distance-time'],
    family: 'motion-work',
    priority: 'core',
    triggerPhrases: ['mph', 'km/h', 'miles per hour', 'how far', 'how long to drive'],
    timeTargetLabel: 'Under 20 sec',
  },
  {
    id: 2,
    name: 'Percentage of a Number',
    formula: 'part = whole × (percent ÷ 100)',
    quickExample: '20% of 150 = 30',
    topicIds: ['percents'],
    family: 'percent',
    priority: 'core',
    triggerPhrases: ['% of', 'percent of', 'tip on', 'what is … % of'],
    timeTargetLabel: 'Under 20 sec',
  },
  {
    id: 3,
    name: 'Percentage Increase / Decrease',
    formula: 'new = original × (1 ± percent/100)',
    quickExample: '$50 + 20% = $60',
    topicIds: ['percents'],
    family: 'percent',
    priority: 'core',
    triggerPhrases: ['increased by', 'decreased by', '% off', '% discount', 'markup'],
    timeTargetLabel: 'Under 20 sec',
  },
  {
    id: 4,
    name: 'Ratio Problems',
    formula: 'a:b → scale factor, then multiply',
    quickExample: '3:2, 15 boys → 10 girls',
    topicIds: ['ratios'],
    family: 'ratio-rate',
    priority: 'core',
    triggerPhrases: ['ratio', 'to … (boys to girls)', 'for every'],
    timeTargetLabel: 'Under 25 sec',
  },
  {
    id: 5,
    name: 'Proportion Problems',
    formula: 'unit rate × quantity = total',
    quickExample: '3 pencils $6 → 10 pencils $20',
    topicIds: ['ratios', 'rate-multiply'],
    family: 'ratio-rate',
    priority: 'core',
    triggerPhrases: ['per hour', 'per mile', 'per item', 'per pound', 'cost for N'],
    timeTargetLabel: 'Under 20 sec',
  },
  {
    id: 6,
    name: 'Work Rate Problems',
    formula: 'rate = 1/time; combined = sum of rates',
    quickExample: '1 worker 6 hr → 2 workers 3 hr',
    topicIds: ['work-rate'],
    family: 'motion-work',
  },
  {
    id: 7,
    name: 'Average Problems',
    formula: 'average = sum ÷ count',
    quickExample: '(80 + 90 + 70) ÷ 3 = 80',
    topicIds: ['averages'],
    family: 'ratio-rate',
  },
  {
    id: 8,
    name: 'Mixture Problems',
    formula: 'Cross method: high−target, target−low',
    quickExample: '10% + 30% → 20% = 1:1 mix',
    topicIds: ['mixture'],
    family: 'ratio-rate',
  },
  {
    id: 9,
    name: 'Area of Rectangle',
    formula: 'A = lw',
    quickExample: '12 ft × 15 ft = 180 ft²',
    topicIds: ['area-volume'],
    family: 'geometry',
  },
  {
    id: 10,
    name: 'Pythagorean Theorem',
    formula: 'a² + b² = c²',
    quickExample: '3² + 4² = 25 → c = 5',
    topicIds: ['area-volume'],
    family: 'geometry',
  },
  {
    id: 11,
    name: 'Unit Conversion',
    formula: 'multiply by conversion factor',
    quickExample: '2 miles = 2 × 5280 = 10,560 ft',
    topicIds: ['unit-conversion'],
    family: 'arithmetic',
    priority: 'core',
    triggerPhrases: ['convert', 'how many … in', 'feet to inches', 'gallons to quarts'],
    timeTargetLabel: 'Under 30 sec',
  },
  {
    id: 12,
    name: 'Fraction Operations',
    formula: 'common denominator for add/subtract',
    quickExample: '1/3 + 1/6 = 2/6 + 1/6 = 1/2',
    topicIds: ['fractions'],
    family: 'arithmetic',
  },
  {
    id: 13,
    name: 'Decimal Multiplication',
    formula: 'ignore decimals, multiply, then place',
    quickExample: '2.5 × 0.4 = 1.00',
    topicIds: ['decimals'],
    family: 'arithmetic',
  },
  {
    id: 14,
    name: 'Profit / Loss',
    formula: 'percent profit = (profit ÷ cost) × 100',
    quickExample: 'Buy $40, sell $55 → 37.5% profit',
    topicIds: ['percents', 'inequalities'],
    family: 'percent',
    priority: 'core',
    triggerPhrases: ['profit', 'sell for', 'cost', 'markup', 'percent profit'],
    timeTargetLabel: 'Under 25 sec',
  },
  {
    id: 15,
    name: 'Simple Interest',
    formula: 'interest = principal × rate × time',
    quickExample: '$1000 × 5% × 1 yr = $50',
    topicIds: ['percents', 'rate-multiply'],
    family: 'percent',
    priority: 'core',
    triggerPhrases: ['simple interest', 'principal', 'annual rate', 'per year'],
    timeTargetLabel: 'Under 25 sec',
  },
  {
    id: 16,
    name: 'Algebra Equation',
    formula: 'isolate variable with inverse operations',
    quickExample: '2x + 6 = 14 → x = 4',
    topicIds: ['word-problem-setup'],
    family: 'arithmetic',
  },
  {
    id: 17,
    name: 'Multiplying Fractions',
    formula: 'multiply numerators, multiply denominators',
    quickExample: '2/3 × 3/4 = 6/12 = 1/2',
    topicIds: ['fractions'],
    family: 'arithmetic',
  },
  {
    id: 18,
    name: 'Weighted Average',
    formula: 'target sum = target avg × (n + 1)',
    quickExample: '4 tests avg 80 → need 105 for 85',
    topicIds: ['averages'],
    family: 'ratio-rate',
  },
  {
    id: 19,
    name: 'Probability',
    formula: 'P = favorable ÷ total',
    quickExample: '3 red, 7 blue → P(red) = 3/10',
    topicIds: ['ratios'],
    family: 'ratio-rate',
  },
  {
    id: 20,
    name: 'Geometry Triangle Area',
    formula: 'A = ½bh',
    quickExample: 'base 10, height 6 → area = 30',
    topicIds: ['area-volume'],
    family: 'geometry',
  },
  {
    id: 21,
    name: 'Order of Operations',
    formula: 'P → E → M/D → A/S',
    quickExample: '6 + 3 × 4 = 18',
    topicIds: ['order-of-operations'],
    family: 'arithmetic',
  },
];

export const PATTERN_STEMS: PatternStem[] = [
  { stem: 'A car travels 60 mph for 3 hours. How far?', patternId: 1 },
  { stem: 'How long to drive 240 miles at 48 mph?', patternId: 1 },
  { stem: 'Two trains leave in opposite directions at 50 and 60 mph. How far apart after 2 hours?', patternId: 1 },
  { stem: 'What is 20% of 150?', patternId: 2 },
  { stem: 'A waitress earns 12% tip on $375 of food. How much tip?', patternId: 2 },
  { stem: '18 out of 24 students passed. What percent passed?', patternId: 2 },
  { stem: '$50 increased by 20%. What is the new value?', patternId: 3 },
  { stem: 'A shirt costs $40. With 25% off, what is the sale price?', patternId: 3 },
  { stem: 'Ratio of boys to girls is 3:2. If 15 boys, how many girls?', patternId: 4 },
  { stem: 'Ratio 2:3, 15 girls. How many boys?', patternId: 4 },
  { stem: '3 pencils cost $6. How much for 10 pencils?', patternId: 5 },
  { stem: 'Apples cost $2.50 per pound. How much for 4 pounds?', patternId: 5 },
  { stem: '1 worker finishes a job in 6 hours. How long with 2 workers?', patternId: 6 },
  { stem: 'Pipe A fills tank in 4 hr, Pipe B in 6 hr. Together?', patternId: 6 },
  { stem: 'Average of 80, 90, 70?', patternId: 7 },
  { stem: 'Scores 85, 90, 88. What on 4th test for average 88?', patternId: 7 },
  { stem: 'Mix 10% acid with 30% acid to get 20%. What ratio?', patternId: 8 },
  { stem: 'Blend $3/lb coffee with $5/lb to get $4/lb. Ratio?', patternId: 8 },
  { stem: 'Room 12 ft × 15 ft. Area in square feet?', patternId: 9 },
  { stem: 'Carpet 12 ft × 18 ft. How many square yards?', patternId: 9 },
  { stem: 'Right triangle legs 3 and 4. Hypotenuse?', patternId: 10 },
  { stem: '6 ft pole, 8 ft shadow. Distance from pole tip to shadow tip?', patternId: 10 },
  { stem: 'Convert 2 miles to feet.', patternId: 11 },
  { stem: '1 gross = 144. 3 bottles per day. How long for 1 gross?', patternId: 11 },
  { stem: '1/3 + 1/6 = ?', patternId: 12 },
  { stem: 'What is 3/4 of 24?', patternId: 12 },
  { stem: '2.5 × 0.4 = ?', patternId: 13 },
  { stem: '1.2 × 3.5 = ?', patternId: 13 },
  { stem: 'Buy for $40, sell for $55. Percent profit?', patternId: 14 },
  { stem: 'Sell $5 each, cost $2 each. How many to make more than $30 profit?', patternId: 14 },
  { stem: '$1000 at 5% for 1 year. Interest?', patternId: 15 },
  { stem: 'Principal $500, rate 4%, 2 years. Simple interest?', patternId: 15 },
  { stem: '2x + 6 = 14. Find x.', patternId: 16 },
  { stem: 'Two numbers sum to 70. One is 8 more. Smaller number?', patternId: 16 },
  { stem: '2/3 × 3/4 = ?', patternId: 17 },
  { stem: '1/3 cup sugar per batch. How many batches from 4 cups?', patternId: 17 },
  { stem: '4 tests average 80. What score to reach 85 average?', patternId: 18 },
  { stem: '5 tests, first 4 avg 88. What on 5th for 90 average?', patternId: 18 },
  { stem: '3 red balls, 7 blue. Probability of red?', patternId: 19 },
  { stem: '13 hearts in 52-card deck. P(heart)?', patternId: 19 },
  { stem: 'Triangle base 10, height 6. Area?', patternId: 20 },
  { stem: 'Right triangle legs 5 and 12. Area?', patternId: 20 },
  { stem: '6 + 3 × 4 = ?', patternId: 21 },
  { stem: '(8 − 2) × 3 = ?', patternId: 21 },
];

export function getStemsForPatternSet(patternIds: readonly number[]): PatternStem[] {
  const set = new Set(patternIds);
  return PATTERN_STEMS.filter((s) => set.has(s.patternId));
}

export function getPatternById(id: number): ArPattern | undefined {
  return AR_20_PATTERNS.find((p) => p.id === id);
}

export function getPatternIdsForTopic(topicId: string): number[] {
  return AR_20_PATTERNS.filter((p) => p.topicIds.includes(topicId)).map((p) => p.id);
}

export function getStemsForPattern(patternId: number): PatternStem[] {
  return PATTERN_STEMS.filter((s) => s.patternId === patternId);
}
