export interface WrPattern {
  id: number;
  name: string;
  situation: string;
  keyTrick: string;
  visual: string;
  formula: string;
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
}

export interface WrSpeedDrillItem {
  problem: string;
  answer: string;
}

export const WR_INTRO = {
  headline: 'LEVEL 3 — WORK RATE (RATES FIRST, TIME SECOND)',
  tagline: 'Pipe and crew problems on the ASVAB are pattern recognition: always convert to jobs per hour.',
  insight:
    'Treat one full job as “1 unit.” Rate = 1 ÷ time alone. Together: add rates. Opposing (fill vs drain): subtract. Multi-step stories: finish phase 1, then attack the remainder with the new net rate — same logic as distance = speed × time.',
  goals: [
    'Convert every “finishes in T hours” to rate = 1/T job per hour.',
    'Same job, same direction: add rates; time to finish = 1 ÷ combined rate.',
    'Fill vs drain: net rate = (fill rate) − (drain rate); watch partial tanks.',
    'Partial work / late join: work done = rate × time, then combine on what is left.',
    'Together then someone leaves: phase 1 at combined rate, phase 2 at one worker’s rate.',
  ],
};

export const WR_PATTERN_MAP: Array<{ pattern: number; situation: string; keyTrick: string }> = [
  { pattern: 1, situation: 'Together (same job)', keyTrick: 'add rates 1/a + 1/b' },
  { pattern: 2, situation: 'Fill vs drain', keyTrick: 'subtract opposing rate' },
  { pattern: 3, situation: 'Partial / late join', keyTrick: 'phases: remainder ÷ new rate' },
  { pattern: 4, situation: 'Together then leaves', keyTrick: 'phase 1 + phase 2' },
  { pattern: 5, situation: 'Scaling / three pipes', keyTrick: 'n × one rate, or sum of three 1/t' },
];

export const WR_PATTERNS: WrPattern[] = [
  {
    id: 1,
    name: 'Together',
    situation: 'Together',
    keyTrick: 'add rates',
    visual:
      'Worker A  → rate 1/a ──► 1 job\nWorker B  → rate 1/b ──► same job\nNet: 1/a + 1/b jobs per hour',
    formula: 'combined rate = 1/a + 1/b + …\ntime to finish one job = 1 ÷ combined rate',
    example: {
      problem:
        'Maria can paint a certain room in 4 hours alone. James can paint that same room in 6 hours alone. If they work together, how many hours will it take to paint the room?',
      steps: [
        'Maria’s rate = 1/4 room per hour; James’s rate = 1/6 room per hour.',
        'Together: 1/4 + 1/6 = 5/12 of the room per hour.',
        'Time for one room: 1 ÷ (5/12) = 12/5 = 2.4 hours.',
      ],
      answer: '2.4 hours (12/5 hr)',
    },
    shortcut: 'Harmonic-style setup: add fractions of “job per hour,” then flip.',
    practice: {
      problem:
        'Two fire hoses fill the same water tank when used alone: hose A in 3 hours and hose B in 6 hours. If both are used together starting from empty, how many hours to fill the tank?',
      answer: '1/3 + 1/6 = 1/2 → 2 hours',
    },
  },
  {
    id: 2,
    name: 'Fill vs drain',
    situation: 'Fill vs drain',
    keyTrick: 'subtract rates',
    visual: 'IN  +1/4 tank/hr  ──►\nOUT −1/8 tank/hr  ◄──\nNet toward full: 1/4 − 1/8',
    formula: 'net rate = rate_in − rate_out\ntime = amount needed ÷ net rate',
    example: {
      problem:
        'A water tank is empty. An inlet pipe can fill the whole tank in 4 hours. A drain pipe can empty a full tank in 8 hours. If both pipes are opened at the same time, how many hours will it take to fill the tank?',
      steps: [
        'Inlet adds 1/4 of the tank per hour; drain removes 1/8 per hour.',
        'Net rate toward full: 1/4 − 1/8 = 1/8 of the tank per hour.',
        'Starting empty (0), need 1 full tank: time = 1 ÷ (1/8) = 8 hours.',
      ],
      answer: '8 hours',
    },
    shortcut: 'Drain flips the sign — never average the two times.',
    practice: {
      problem:
        'An inlet can fill an empty pool in 5 hours alone. A drain can empty a full pool in 10 hours alone. If both run at once from an empty pool, the net fill rate toward full is how much of the pool per hour? (Answer as a fraction of the pool.)',
      answer: '1/5 − 1/10 = 1/10 of the pool per hour',
    },
  },
  {
    id: 3,
    name: 'Partial work / late join',
    situation: 'Partial',
    keyTrick: 'phases',
    visual: 'Phase 1: one rate × time → part done\nPhase 2: new crew on (1 − part done)',
    formula: 'work done = rate × time\nremainder time = (1 − done) ÷ new combined rate',
    example: {
      problem:
        'One mechanic can overhaul an engine in 12 hours alone. The mechanic works alone for 4 hours, then a second mechanic with the same rate joins. How many total hours from the start until the overhaul is done?',
      steps: [
        'First 4 hr: 4 × (1/12) = 1/3 of the job done',
        'Two workers: 2/12 = 1/6 of the job per hour',
        'Remainder 2/3 at 1/6/hr → (2/3) ÷ (1/6) = 4 hr',
        'Total = 4 + 4 = 8 hours',
      ],
      answer: '8 hours',
    },
    shortcut: 'Always convert “how much is left?” before starting phase 2.',
    practice: {
      problem:
        'Private Alden can complete a forms package in 10 hours alone. Private Boyd is equally fast. Alden works 2 hours alone, then both finish together. How many total hours does the package take from the start?',
      answer: '2 + 4 = 6 hr (2/10 done; 8/10 at 2/10 per hr = 4 hr)',
    },
  },
  {
    id: 4,
    name: 'Together then leaves',
    situation: 'Leaves',
    keyTrick: 'two phases',
    visual: 'Phase 1: (r1 + r2) × t1 = work1\nPhase 2: r1 × t2 = 1 − work1',
    formula: 'combined rate × time together = portion done\none rate × extra time = remainder',
    example: {
      problem:
        'Technician K can calibrate a device in 5 hours alone. Technician L can calibrate the same device in 10 hours alone. They work together for 2 hours, then L stops and K finishes alone. How many additional hours does K need after L stops?',
      steps: [
        'Together: 1/5 + 1/10 = 3/10 of the job per hour',
        'In 2 hr: 2 × 3/10 = 3/5 done; 2/5 left',
        'K alone: (2/5) ÷ (1/5) = 2 more hours',
      ],
      answer: '2 more hours',
    },
    shortcut: 'Read “how much longer” vs “total time” — answer what they asked.',
    practice: {
      problem:
        'Crew A can refuel a plane in 4 hours alone; crew B can do the same refuel in 6 hours alone. Both work together for 1 hour, then crew B leaves. How many more hours does crew A need to finish?',
      answer: 'Together 5/12 done; 7/12 left at 1/4/hr → 7/3 hr',
    },
  },
  {
    id: 5,
    name: 'Scaling / three pipes',
    situation: 'Scaling',
    keyTrick: 'multiply or triple sum',
    visual:
      '3 same-speed workers: rate_total = 3 × (1/T_one)\n3 pipes (different): 1/t1 + 1/t2 + 1/t3',
    formula: 'identical workers: n × (1/time for one alone)\nthree rates: sum then flip to time',
    example: {
      problem:
        'An empty tank has three inlet lines. Alone, the first could fill the tank in 6 hours, the second in 12 hours, and the third in 18 hours. All three are opened together. How many hours to fill the tank?',
      steps: [
        'Combined rate: 1/6 + 1/12 + 1/18 = 6/36 + 3/36 + 2/36 = 11/36 per hour',
        'Time = 36/11 ≈ 3.27 hours',
      ],
      answer: '36/11 hr ≈ 3.27 hr',
    },
    shortcut: 'Scaling: triple the crew (same skill) → triple the rate.',
    practice: {
      problem:
        'Three warehouse clerks, all equally fast, can unpack a delivery in 6 hours working together. How long would one clerk need to unpack the same delivery alone?',
      answer: 'Combined rate 1/6; one worker 1/18 → 18 hours',
    },
  },
];

export const WR_SPEED_DRILL: WrSpeedDrillItem[] = [
  {
    problem:
      'If one person completes a job in 6 hours alone, what fraction of the job does the person finish in one hour?',
    answer: '1/6 of the job per hour',
  },
  {
    problem:
      'If one machine completes a run in 12 hours alone, what fraction of the run does it finish in one hour?',
    answer: '1/12 of the run per hour',
  },
  {
    problem:
      'Worker rates are 1/4 job/hr and 1/6 job/hr on the same task. What is their combined rate?',
    answer: '5/12 job per hour',
  },
  {
    problem:
      'A combined rate of 5/12 job per hour is used on one full job. How many hours to finish?',
    answer: '12/5 = 2.4 hours',
  },
  {
    problem:
      'An inlet adds 1/4 of a tank per hour and a drain removes 1/8 of a tank per hour. Net gain per hour toward full?',
    answer: '1/8 of the tank per hour',
  },
  {
    problem:
      'Two painters each need 8 hours alone to paint the same room. Working together, how many hours do they need to paint the whole room?',
    answer: 'Combined rate 2/8 = 1/4 room per hour → 4 hours total',
  },
  {
    problem: 'How many hours to complete half a job at a steady rate of 1/10 job per hour?',
    answer: '5 hours',
  },
];
