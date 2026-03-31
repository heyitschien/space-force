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
  // Ratios & Proportions
  'ar-p1-001': {
    patternLabel: 'Rate × quantity (easy)',
    solutionSteps: [
      {
        step: 'Identify the rate: $3.50 per mile.',
        reason: 'The tow charge is a constant — each mile costs $3.50. This is a ratio: cost/mile.',
      },
      {
        step: 'Quantity: 12 miles.',
        reason: 'We need the total cost for 12 miles. More miles → more cost (direct proportion).',
      },
      {
        step: 'Cost = rate × quantity = $3.50 × 12 = $42.00.',
        reason: 'Multiply dollars per mile by miles. The units cancel: ($/mile) × miles = $. 3.5 × 12 = 42.',
      },
    ],
  },
  'ar-p2-012': {
    patternLabel: 'Direct proportion (medium)',
    solutionSteps: [
      {
        step: 'Original ratio: 3 trucks serve 24 homes.',
        reason: 'The ratio trucks:homes is constant. If we need more homes served, we need more trucks.',
      },
      {
        step: 'Scale factor: 72 ÷ 24 = 3.',
        reason: 'Houses went from 24 to 72. 72/24 = 3, so we need 3× as many homes served — and 3× the trucks.',
      },
      {
        step: 'Trucks: 3 × 3 = 9 trucks.',
        reason: 'Original trucks (3) × scale factor (3) = 9. Both sides of the ratio scale the same way.',
      },
    ],
  },
  'ar-p2-018': {
    patternLabel: 'Map scale (medium)',
    solutionSteps: [
      {
        step: 'Scale: 1/2 inch on map = 1 mile in real life.',
        reason: 'Each half-inch represents 1 mile. So we count half-inches to get miles.',
      },
      {
        step: '1/2 inch = 0.5 inch. Count half-inches: 4.5 ÷ 0.5 = 9.',
        reason: '4.5 inches ÷ 0.5 inch per mile = 9. That means 9 half-inches, each worth 1 mile.',
      },
      {
        step: '9 half-inches → 9 miles.',
        reason: 'Each half-inch = 1 mile. 9 × 1 mile = 9 miles actual distance.',
      },
    ],
  },
  'ar-p2-014': {
    patternLabel: 'Ratio split (hard)',
    solutionSteps: [
      {
        step: 'Ratio 3:4 (red:blue) means for every 4 blue, there are 3 red.',
        reason: 'The ratio tells us the relationship: 3 red per 4 blue. We work in groups of 4 blue.',
      },
      {
        step: 'Groups of 4 blue: 80 ÷ 4 = 20 groups.',
        reason: '80 blue balls ÷ 4 blue per group = 20. So we have 20 "ratio units" of 4 blue each.',
      },
      {
        step: 'Red balls: 3 × 20 = 60.',
        reason: 'Each group has 3 red. 20 groups × 3 red per group = 60 red balls.',
      },
    ],
  },
  'ar-p1-025': {
    patternLabel: 'Multi-step ratio + unit conversion (elite)',
    solutionSteps: [
      {
        step: 'Oz per person per day: 12 + 18 + 18 = 48 oz.',
        reason: 'Each resident gets 3 meals: breakfast (12 oz) + lunch (18 oz) + dinner (18 oz). Add to get daily need.',
      },
      {
        step: 'Oz per person for 10 days: 48 × 10 = 480 oz.',
        reason: 'Daily need × 10 days = total oz needed per person for the full 10-day period.',
      },
      {
        step: 'Convert tons to pounds: 3 tons × 2000 lb/ton = 6000 lb.',
        reason: '1 ton = 2000 lb. We must convert to pounds first, then to ounces, to match consumption (oz).',
      },
      {
        step: 'Convert pounds to ounces: 6000 lb × 16 oz/lb = 96,000 oz.',
        reason: '1 lb = 16 oz. 6000 × 16 = 96,000 oz total supply. Now both supply and need are in ounces.',
      },
      {
        step: 'Residents: 96,000 ÷ 480 = 200.',
        reason: 'Total supply (oz) ÷ supply per person (oz) = number of full people. 96000/480 = 200.',
      },
    ],
  },
  // Word problem setup
  'ar-p1-002': {
    patternLabel: 'Two-number relationships (sum / difference)',
    solutionSteps: [
      {
        step: 'Let x = smaller number; larger = x + 8.',
        reason: '“One is 8 more than the other” links both numbers to one variable; using the smaller keeps the setup clean.',
      },
      {
        step: 'Sum: x + (x + 8) = 70 → 2x = 62 → x = 31.',
        reason: 'Sum means add both expressions; solve for x to get the smaller number.',
      },
    ],
  },
  'ar-p2-015': {
    patternLabel: 'Grouping / remainder (partial room)',
    solutionSteps: [
      {
        step: '47 ÷ 6 = 7 remainder 5.',
        reason: 'Seven full rooms of 6 use 42 people; five people are left for the room that is not full.',
      },
      {
        step: 'Answer the question asked: 5 in the incomplete room — not 7 (full rooms).',
        reason: 'Remainder answers “how many in the room that is not full”; the quotient counts full groups only.',
      },
    ],
  },
  'ar-p2-026': {
    patternLabel: 'Trips / capacity (round up)',
    solutionSteps: [
      {
        step: 'Need whole trips for 104 people at 42 per trip; 100 miles and 1 day do not change trip count here.',
        reason: 'Unless speed or time caps how many people move per day, extra distance/time details are distractors.',
      },
      {
        step: '104 ÷ 42 = 2 remainder 20. Two trips move 84; 20 people still need another trip.',
        reason: 'Any leftover people require one more full trip.',
      },
      {
        step: 'Total trips = 3.',
        reason: 'Round up: 2 + 1 = 3 trips to transport everyone.',
      },
    ],
  },
};
