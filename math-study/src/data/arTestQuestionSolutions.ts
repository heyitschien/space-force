export interface ArTestSolutionStep {
  step: string;
  reason?: string;
}

export interface ArTestQuestionSolution {
  patternLabel: string;
  solutionSteps: ArTestSolutionStep[];
}

export const AR_TEST_QUESTION_SOLUTIONS: Record<string, ArTestQuestionSolution> = {
  // Fractions
  'ar-p1-011': {
    patternLabel: 'Fraction of a quantity (how much left)',
    solutionSteps: [
      {
        step: 'Total bought: 1/4 + 1/3 + 1/6. Common denominator 12: 3/12 + 4/12 + 2/12 = 9/12 = 3/4.',
        reason:
          'We need a common denominator to add fractions — 12 works for 4, 3, and 6. Convert each fraction, then add.',
      },
      {
        step: 'Fraction left: 1 − 3/4 = 1/4.',
        reason: 'The whole is 1. If 3/4 was sold, the remainder is 1 − 3/4.',
      },
      {
        step: 'Pies left: 1/4 × 20 = 5.',
        reason: '"Fraction of a number" means multiply: 1/4 of 20 pies = 1/4 × 20.',
      },
    ],
  },
  'ar-p2-017': {
    patternLabel: 'Rate × quantity (cups per ounce)',
    solutionSteps: [
      {
        step: 'Each cup needs 2/5 oz. So cups = total oz ÷ (2/5).',
        reason:
          'Dividing by a fraction flips it: "how many 2/5s fit in 40?" is the same as 40 × (5/2).',
      },
      {
        step: '40 ÷ (2/5) = 40 × (5/2) = 100 cups.',
        reason: 'Dividing by 2/5 is the same as multiplying by 5/2 — that gives how many cups we can make.',
      },
    ],
  },
  'ar-p2-024': {
    patternLabel: 'Fraction of a number (reverse)',
    solutionSteps: [
      {
        step: '"One-third of predicted" means actual = predicted × (1/3).',
        reason: '"Of" means multiply. So $120k is 1/3 of the predicted amount.',
      },
      {
        step: '120,000 = predicted × (1/3), so predicted = 120,000 ÷ (1/3) = 120,000 × 3 = $360,000.',
        reason: 'To undo multiplication by 1/3, we divide by 1/3 — which is the same as multiplying by 3.',
      },
    ],
  },
  // Percents
  'ar-p1-005': {
    patternLabel: 'Percent of a number',
    solutionSteps: [
      {
        step: '12% of $375 = 0.12 × 375 = $45.',
        reason: 'Percent means "per 100" — convert 12% to 0.12, then multiply by the whole amount.',
      },
    ],
  },
  'ar-p2-001': {
    patternLabel: 'Percent not present',
    solutionSteps: [
      {
        step: 'Guests not present: 120 − 90 = 30.',
        reason: 'We want the percent who did NOT come — so first find how many that is.',
      },
      {
        step: 'Percent: 30 ÷ 120 = 0.25 = 25%.',
        reason: 'Percent = part ÷ whole × 100. Here, part = 30 (not present), whole = 120 (invited).',
      },
    ],
  },
  'ar-p2-029': {
    patternLabel: 'Successive discounts',
    solutionSteps: [
      {
        step: 'First discount (20% off): 300 × 0.80 = 240.',
        reason: '20% off means you pay 80% of the original. 80% = 0.80.',
      },
      {
        step: 'Second discount (15% off): 240 × 0.85 = $204.',
        reason: 'Apply the next discount to the NEW price (240), not the original. 15% off = pay 85%.',
      },
    ],
  },
  // Unit Conversion
  'ar-p1-003': {
    patternLabel: 'Gross and daily rate',
    solutionSteps: [
      {
        step: '1 gross = 144 bottles.',
        reason: 'A gross is a unit of 12 dozen, so 12 × 12 = 144.',
      },
      {
        step: '144 ÷ 3 bottles/day = 48 days.',
        reason: 'If we use 3 per day, we divide total by daily rate to get how many days it lasts.',
      },
    ],
  },
  'ar-p1-025': {
    patternLabel: 'Multi-step conversion (tons → oz → residents)',
    solutionSteps: [
      {
        step: 'Oz per person per day: 12 + 18 + 18 = 48 oz.',
        reason: 'Each resident gets 3 meals: breakfast (12 oz) + lunch (18) + dinner (18).',
      },
      {
        step: '3 tons = 6,000 lb = 96,000 oz.',
        reason: '1 ton = 2,000 lb, 1 lb = 16 oz. So 3 × 2,000 × 16 = 96,000 oz total.',
      },
      {
        step: 'Oz per day for 10 days: 96,000 ÷ 10 = 9,600 oz/day.',
        reason: 'The truck carries 10 days of food, so we divide total oz by 10 to get daily supply.',
      },
      {
        step: 'Residents: 9,600 ÷ 48 = 200.',
        reason: 'Each person needs 48 oz/day. 9,600 oz ÷ 48 = how many people we can feed per day.',
      },
    ],
  },
  'ar-p2-022': {
    patternLabel: 'Quarts to gallons, then weeks',
    solutionSteps: [
      {
        step: '26 quarts = 26 ÷ 4 = 6.5 gallons.',
        reason: '1 gallon = 4 quarts. Divide quarts by 4 to convert to gallons.',
      },
      {
        step: '6.5 gal ÷ 2 gal/week = 3.25 weeks.',
        reason: 'We consume 2 gallons per week. Divide total gallons by weekly rate to get weeks.',
      },
    ],
  },
};
