import { UNIT_MEMORY_DECK } from './unitConversionContent';

export type Level1MemoryTopicId =
  | 'order-of-operations'
  | 'decimals'
  | 'fractions'
  | 'percents'
  | 'unit-conversion'
  | 'ratios'
  | 'rate-multiply';

export interface Level1MemoryCard {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  tags: string[];
}

const PEMDAS_MEMORY_DECK: Level1MemoryCard[] = [
  {
    id: 'pem-mem-001',
    prompt: 'What does PEMDAS stand for?',
    choices: [
      'Parentheses, Exponents, Multiply/Divide, Add/Subtract',
      'Parentheses, Exponents, Minus/Divide, Add/Subtract',
      'Powers, Equals, Multiply, Divide, Add, Subtract',
      'Parentheses, Exponents, Multiply, Divide, Add, Square',
    ],
    answerIndex: 0,
    explanation: 'Core order: Parentheses -> Exponents -> Multiply/Divide -> Add/Subtract.',
    tags: ['order', 'core-rule'],
  },
  {
    id: 'pem-mem-002',
    prompt: 'Which comes first: multiplication or addition?',
    choices: ['Addition', 'Multiplication', 'They are always equal priority', 'Depends on numbers'],
    answerIndex: 1,
    explanation: 'Multiplication is evaluated before addition unless parentheses change order.',
    tags: ['precedence'],
  },
  {
    id: 'pem-mem-003',
    prompt: 'For multiplication and division, what is the correct rule?',
    choices: ['Do multiplication first', 'Do division first', 'Left to right', 'Highest number first'],
    answerIndex: 2,
    explanation: 'Multiply and divide share precedence, so process left to right.',
    tags: ['left-to-right'],
  },
  {
    id: 'pem-mem-004',
    prompt: 'For addition and subtraction, what is the correct rule?',
    choices: ['Do subtraction first', 'Do addition first', 'Left to right', 'Largest terms first'],
    answerIndex: 2,
    explanation: 'Add and subtract share precedence, so process left to right.',
    tags: ['left-to-right'],
  },
  {
    id: 'pem-mem-005',
    prompt: 'In 6 + 3 * 4, what operation is done first?',
    choices: ['6 + 3', '3 * 4', 'Depends on preference', 'All at once'],
    answerIndex: 1,
    explanation: 'Multiplication has higher precedence than addition.',
    tags: ['trap'],
  },
  {
    id: 'pem-mem-006',
    prompt: 'In (6 + 3) * 4, what operation is done first?',
    choices: ['3 * 4', '6 + 3', 'Depends on value of 4', 'Any order is fine'],
    answerIndex: 1,
    explanation: 'Parentheses force that expression to be evaluated first.',
    tags: ['parentheses'],
  },
  {
    id: 'pem-mem-007',
    prompt: 'Where do exponents fit in order?',
    choices: ['After multiplication', 'After addition', 'Before multiplication/division', 'Last'],
    answerIndex: 2,
    explanation: 'Exponents are evaluated after parentheses and before M/D.',
    tags: ['exponents'],
  },
  {
    id: 'pem-mem-008',
    prompt: 'If no parentheses are present, what controls order?',
    choices: ['Left to right only', 'PEMDAS precedence', 'Number size', 'Operation symbols with largest value'],
    answerIndex: 1,
    explanation: 'Use precedence hierarchy, then left-to-right within equal levels.',
    tags: ['core-rule'],
  },
];

const DECIMALS_MEMORY_DECK: Level1MemoryCard[] = [
  {
    id: 'dec-mem-001',
    prompt: 'For decimal multiplication, first step is:',
    choices: [
      'Place decimal immediately',
      'Multiply as whole numbers first',
      'Round both decimals',
      'Convert to fractions first',
    ],
    answerIndex: 1,
    explanation: 'Compute integer product first, then place decimal at the end.',
    tags: ['multiply-rule'],
  },
  {
    id: 'dec-mem-002',
    prompt: 'Decimal places in product of decimal multiplication come from:',
    choices: [
      'Left factor only',
      'Right factor only',
      'Total decimal places in both factors',
      'Always two places',
    ],
    answerIndex: 2,
    explanation: 'Count decimal places across both factors, then place result decimal.',
    tags: ['multiply-rule'],
  },
  {
    id: 'dec-mem-003',
    prompt: 'For 3.6 / 0.4, you should:',
    choices: [
      'Leave as is and divide directly',
      'Move decimal only in dividend',
      'Move decimal only in divisor',
      'Move decimal in both until divisor is whole',
    ],
    answerIndex: 3,
    explanation: 'Shift both numbers equally so divisor becomes a whole number.',
    tags: ['divide-rule'],
  },
  {
    id: 'dec-mem-004',
    prompt: 'Dividing by a decimal less than 1 usually makes result:',
    choices: ['Smaller', 'Larger', 'Same', 'Impossible to predict'],
    answerIndex: 1,
    explanation: 'Dividing by values below 1 scales upward.',
    tags: ['magnitude-check'],
  },
  {
    id: 'dec-mem-005',
    prompt: 'Best quick sanity check before finalizing decimal answer:',
    choices: ['Use estimation', 'Always round to nearest integer', 'Ignore sign', 'Recompute every step'],
    answerIndex: 0,
    explanation: 'Estimate magnitude first to catch decimal-placement mistakes.',
    tags: ['magnitude-check'],
  },
  {
    id: 'dec-mem-006',
    prompt: 'Money answers should usually be shown with:',
    choices: ['One decimal place', 'Two decimal places', 'No decimals', 'Three decimals'],
    answerIndex: 1,
    explanation: 'Currency convention uses cents: two decimal places.',
    tags: ['money-format'],
  },
  {
    id: 'dec-mem-007',
    prompt: 'For adding/subtracting decimals, align by:',
    choices: ['Largest digit', 'Decimal points', 'First nonzero digit', 'Rightmost digit only'],
    answerIndex: 1,
    explanation: 'Place value alignment requires matching decimal points.',
    tags: ['add-sub-rule'],
  },
  {
    id: 'dec-mem-008',
    prompt: 'The phrase "per" in decimal rate contexts usually signals:',
    choices: ['Addition', 'Subtraction', 'Division', 'Exponent'],
    answerIndex: 2,
    explanation: 'Per indicates unit rate, which is formed by division.',
    tags: ['rate-language'],
  },
];

const FRACTIONS_MEMORY_DECK: Level1MemoryCard[] = [
  {
    id: 'fra-mem-001',
    prompt: 'To add fractions, denominators must be:',
    choices: ['Prime numbers', 'Equal', 'Larger than numerators', 'Even'],
    answerIndex: 1,
    explanation: 'Addition/subtraction requires a common denominator.',
    tags: ['add-sub-rule'],
  },
  {
    id: 'fra-mem-002',
    prompt: 'For fraction division a/b ÷ c/d, correct rewrite is:',
    choices: ['a/b * c/d', 'a/b * d/c', 'b/a * c/d', 'a/c * b/d'],
    answerIndex: 1,
    explanation: 'Division by fraction means multiply by reciprocal.',
    tags: ['divide-rule'],
  },
  {
    id: 'fra-mem-003',
    prompt: 'The word "of" in fraction problems usually means:',
    choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
    answerIndex: 2,
    explanation: '"Of" indicates multiplication with the fraction.',
    tags: ['language-cue'],
  },
  {
    id: 'fra-mem-004',
    prompt: 'Best first move before heavy fraction arithmetic:',
    choices: ['Convert to decimals immediately', 'Simplify where possible', 'Find common denominator always', 'Cross-multiply'],
    answerIndex: 1,
    explanation: 'Simplifying early reduces error and computation load.',
    tags: ['simplify-rule'],
  },
  {
    id: 'fra-mem-005',
    prompt: 'When subtracting fractions, you subtract:',
    choices: ['Denominators only', 'Numerators after common denominator', 'Both top and bottom separately', 'Whichever is larger'],
    answerIndex: 1,
    explanation: 'Only numerators combine after denominators match.',
    tags: ['add-sub-rule'],
  },
  {
    id: 'fra-mem-006',
    prompt: 'To find whole x from (2/5)x = 18, key operation is:',
    choices: ['Multiply by 2/5', 'Divide by 2/5 (or multiply by 5/2)', 'Subtract 2/5', 'Add 2/5'],
    answerIndex: 1,
    explanation: 'Undo multiplication by applying reciprocal operation.',
    tags: ['inverse-rule'],
  },
  {
    id: 'fra-mem-007',
    prompt: 'For multiplication of fractions, product denominator is:',
    choices: ['Sum of denominators', 'Difference of denominators', 'Product of denominators', 'Always 1'],
    answerIndex: 2,
    explanation: 'Multiply denominator by denominator.',
    tags: ['multiply-rule'],
  },
  {
    id: 'fra-mem-008',
    prompt: '"Out of" language in probability/part-whole often maps to:',
    choices: ['Numerator * denominator', 'Part/whole fraction', 'Whole/part fraction', 'Difference quotient'],
    answerIndex: 1,
    explanation: 'Part out of total is represented as part over whole.',
    tags: ['language-cue'],
  },
];

const PERCENTS_MEMORY_DECK: Level1MemoryCard[] = [
  {
    id: 'per-mem-001',
    prompt: '10% of a number can be found by:',
    choices: ['Multiply by 10', 'Move decimal one place left', 'Divide by 2', 'Multiply by 0.01'],
    answerIndex: 1,
    explanation: 'Ten percent is one tenth; shift decimal one place left.',
    tags: ['anchor'],
  },
  {
    id: 'per-mem-002',
    prompt: '5% of a number is:',
    choices: ['Half of 10%', 'Double 10%', 'Same as 50%', 'Always divide by 20 then by 2'],
    answerIndex: 0,
    explanation: '5% is half of 10%.',
    tags: ['anchor'],
  },
  {
    id: 'per-mem-003',
    prompt: '25% of a number is equivalent to:',
    choices: ['Multiply by 0.25 and divide by 2', 'Divide by 4', 'Multiply by 4', 'Divide by 25'],
    answerIndex: 1,
    explanation: '25% equals one fourth.',
    tags: ['anchor'],
  },
  {
    id: 'per-mem-004',
    prompt: '50% of a number is equivalent to:',
    choices: ['Double it', 'Half it', 'Quarter it', 'Subtract 50'],
    answerIndex: 1,
    explanation: '50% equals one half.',
    tags: ['anchor'],
  },
  {
    id: 'per-mem-005',
    prompt: 'Percent of number formula is:',
    choices: ['part = whole / percent', 'part = whole * (percent/100)', 'whole = percent * 100', 'percent = whole * part'],
    answerIndex: 1,
    explanation: 'Convert percent to decimal and multiply by whole.',
    tags: ['formula'],
  },
  {
    id: 'per-mem-006',
    prompt: 'A 20% discount means multiply original price by:',
    choices: ['1.20', '0.80', '0.20', '0.02'],
    answerIndex: 1,
    explanation: 'You keep 80% after a 20% discount.',
    tags: ['discount-rule'],
  },
  {
    id: 'per-mem-007',
    prompt: 'A 15% tax means multiply price by:',
    choices: ['0.85', '1.15', '0.15', '1.50'],
    answerIndex: 1,
    explanation: 'Add 15% to 100%, so multiplier is 1.15.',
    tags: ['increase-rule'],
  },
  {
    id: 'per-mem-008',
    prompt: 'Two discounts of 25% then 10% are:',
    choices: ['Always 35% total', 'Applied sequentially, not added directly', 'Always 15% total', 'Impossible to compare'],
    answerIndex: 1,
    explanation: 'Successive percent changes apply to changing bases.',
    tags: ['trap'],
  },
];

const RATIOS_MEMORY_DECK: Level1MemoryCard[] = [
  {
    id: 'rat-mem-001',
    prompt: 'A ratio represents:',
    choices: [
      'A relationship between two quantities',
      'A single number',
      'An equation with equals',
      'A percentage',
    ],
    answerIndex: 0,
    explanation: 'Ratio = relationship between two quantities (e.g., for every 3 trucks, 24 houses).',
    tags: ['definition'],
  },
  {
    id: 'rat-mem-002',
    prompt: 'A proportion is:',
    choices: [
      'One ratio only',
      'Two equal ratios',
      'A scale factor',
      'A unit rate',
    ],
    answerIndex: 1,
    explanation: 'Proportion = two equal ratios that scale the same way.',
    tags: ['definition'],
  },
  {
    id: 'rat-mem-003',
    prompt: 'The golden rule of ratios:',
    choices: [
      'Add both sides',
      'If one side changes, the other scales the same way',
      'Always cross multiply first',
      'Convert to decimals',
    ],
    answerIndex: 1,
    explanation: 'Ratios are scaling machines — same scale factor applies to both sides.',
    tags: ['golden-rule'],
  },
  {
    id: 'rat-mem-004',
    prompt: 'Direct proportion means:',
    choices: [
      'More → Less',
      'More → More, Less → Less',
      'No relationship',
      'Inverse only',
    ],
    answerIndex: 1,
    explanation: 'Direct proportion: both quantities move in the same direction.',
    tags: ['pattern'],
  },
  {
    id: 'rat-mem-005',
    prompt: 'Unit rate thinking asks:',
    choices: [
      'What is the total?',
      'What is ONE unit worth?',
      'What is the difference?',
      'What is the sum?',
    ],
    answerIndex: 1,
    explanation: '"Per one" is the best tool for ratio problems.',
    tags: ['mental-model'],
  },
  {
    id: 'rat-mem-006',
    prompt: 'Scale factor method asks:',
    choices: [
      'What is the sum?',
      'How many times bigger?',
      'What is the average?',
      'What is the remainder?',
    ],
    answerIndex: 1,
    explanation: 'Find how many times the known quantity changed, then apply to the unknown.',
    tags: ['mental-model'],
  },
  {
    id: 'rat-mem-007',
    prompt: 'Cross multiply backup: a/b = c/d implies:',
    choices: ['a + d = b + c', 'ad = bc', 'a - b = c - d', 'a/b = d/c'],
    answerIndex: 1,
    explanation: 'Cross multiply: ad = bc when a/b = c/d.',
    tags: ['formula'],
  },
  {
    id: 'rat-mem-008',
    prompt: 'Common ratio trap:',
    choices: [
      'Using scale factor correctly',
      'Mixing units (feet vs yards)',
      'Setting up proportion',
      'Finding per-one rate',
    ],
    answerIndex: 1,
    explanation: 'Always match units before scaling.',
    tags: ['trap'],
  },
];

const RATE_MULTIPLY_MEMORY_DECK: Level1MemoryCard[] = [
  {
    id: 'rq-mem-001',
    prompt: 'The master formula for rate problems is:',
    choices: [
      'Total = Rate × Quantity',
      'Total = Rate + Quantity',
      'Rate = Total × Quantity',
      'Quantity = Rate × Total',
    ],
    answerIndex: 0,
    explanation: 'Total = Rate × Quantity. Rearrange: Rate = Total ÷ Quantity; Quantity = Total ÷ Rate.',
    tags: ['core'],
  },
  {
    id: 'rq-mem-002',
    prompt: 'To find a unit rate when you see “per,” you usually:',
    choices: [
      'Multiply the two numbers',
      'Divide so you get “per one”',
      'Add the units',
      'Ignore the units',
    ],
    answerIndex: 1,
    explanation: '“Per” signals a rate — total ÷ how many units gives the rate per one.',
    tags: ['language'],
  },
  {
    id: 'rq-mem-003',
    prompt: 'Before multiplying or dividing, you should:',
    choices: [
      'Guess the answer',
      'Match compatible units (miles with miles, hours with hours)',
      'Always convert to metric',
      'Round everything to whole numbers',
    ],
    answerIndex: 1,
    explanation: 'Matching units is the most important rule — mixed units break the setup.',
    tags: ['units'],
  },
  {
    id: 'rq-mem-004',
    prompt: 'If you know rate and quantity, you find total by:',
    choices: ['Dividing', 'Multiplying', 'Subtracting', 'Averaging'],
    answerIndex: 1,
    explanation: 'Have both rate and quantity → multiply for total.',
    tags: ['triangle'],
  },
  {
    id: 'rq-mem-005',
    prompt: 'If you know total and quantity, you find rate by:',
    choices: [
      'Total × Quantity',
      'Total ÷ Quantity',
      'Quantity ÷ Total',
      'Total − Quantity',
    ],
    answerIndex: 1,
    explanation: 'Rate = Total ÷ Quantity (e.g., $12 for 3 items → $4 per item).',
    tags: ['triangle'],
  },
  {
    id: 'rq-mem-006',
    prompt: '“Every 80 minutes” in a cycle problem usually means:',
    choices: [
      'Ignore the number 80',
      'That interval is your time rate / cycle length',
      'Always multiply by 80',
      'Divide only at the end',
    ],
    answerIndex: 1,
    explanation: 'A stated interval is often the implied rate for counting cycles in a shift.',
    tags: ['trap'],
  },
  {
    id: 'rq-mem-007',
    prompt: 'A common ASVAB trap is:',
    choices: [
      'Using unit rates',
      'Mixing hours and minutes without converting',
      'Writing the question down',
      'Checking answer choices',
    ],
    answerIndex: 1,
    explanation: 'Convert to one time unit before applying rate × quantity or dividing.',
    tags: ['trap'],
  },
  {
    id: 'rq-mem-008',
    prompt: 'For “$3 per 300 words,” pay for 760 words starts with:',
    choices: [
      '3 × 760',
      'Finding dollars per word (3 ÷ 300), then multiplying by 760',
      '300 ÷ 760',
      'Adding 3 and 300',
    ],
    answerIndex: 1,
    explanation: 'Get a unit rate (per word), then multiply by the new word count.',
    tags: ['pattern'],
  },
];

export const LEVEL1_MEMORY_DECKS: Record<Level1MemoryTopicId, Level1MemoryCard[]> = {
  'order-of-operations': PEMDAS_MEMORY_DECK,
  decimals: DECIMALS_MEMORY_DECK,
  fractions: FRACTIONS_MEMORY_DECK,
  percents: PERCENTS_MEMORY_DECK,
  'unit-conversion': UNIT_MEMORY_DECK,
  ratios: RATIOS_MEMORY_DECK,
  'rate-multiply': RATE_MULTIPLY_MEMORY_DECK,
};

export function getLevel1MemoryDeck(topicId: string): Level1MemoryCard[] {
  return LEVEL1_MEMORY_DECKS[topicId as Level1MemoryTopicId] ?? [];
}
