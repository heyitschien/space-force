export type CelestialId =
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'asteroid-belt'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'proxima-centauri'
  | 'light-year';

export interface CelestialFact {
  id: CelestialId;
  name: string;
  fact: string;
  memoryAnchor?: string;
  color: string;
}

export interface AstronomyQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  memoryAnchor?: string;
}

export const PLANET_FACTS: CelestialFact[] = [
  {
    id: 'sun',
    name: 'Sun',
    fact: 'The star at the center of our solar system.',
    color: '#fbbf24',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    fact: 'Closest planet to the Sun; smallest planet.',
    color: '#9ca3af',
  },
  {
    id: 'venus',
    name: 'Venus',
    fact: 'Brightest planet in the sky (after the Sun and Moon).',
    memoryAnchor: '"Venus" = Visible / very bright.',
    color: '#fcd34d',
  },
  {
    id: 'earth',
    name: 'Earth',
    fact: 'Our home planet; only known planet with life.',
    color: '#3b82f6',
  },
  {
    id: 'mars',
    name: 'Mars',
    fact: 'Atmosphere is composed mostly of carbon dioxide (CO₂).',
    memoryAnchor: 'Mars = CO₂ atmosphere.',
    color: '#ef4444',
  },
  {
    id: 'asteroid-belt',
    name: 'Asteroid Belt',
    fact: 'Located between Mars and Jupiter.',
    memoryAnchor: 'Asteroids sit in the Mars–Jupiter middle.',
    color: '#a78bfa',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    fact: 'Largest planet in the solar system.',
    memoryAnchor: '"Jupiter is Giant."',
    color: '#f59e0b',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    fact: 'Has prominent rings; one of four ringed planets.',
    memoryAnchor: '4 planets have rings: Jupiter, Saturn, Uranus, Neptune.',
    color: '#eab308',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    fact: 'Named after the Greek god who personified the sky.',
    memoryAnchor: 'Uranus = sky god.',
    color: '#22d3ee',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    fact: 'Has rings; farthest major planet from the Sun.',
    memoryAnchor: '4 planets have rings: Jupiter, Saturn, Uranus, Neptune.',
    color: '#6366f1',
  },
  {
    id: 'proxima-centauri',
    name: 'Proxima Centauri',
    fact: 'Closest star to Earth (other than the Sun).',
    memoryAnchor: 'Proxima = closest star.',
    color: '#f472b6',
  },
  {
    id: 'light-year',
    name: 'Light-Year',
    fact: 'The distance light travels in one year.',
    memoryAnchor: 'Light-year = distance, not time.',
    color: '#a5f3fc',
  },
];

export const ASVAB_FACTS_CARDS = PLANET_FACTS.filter(
  (f) =>
    f.id === 'jupiter' ||
    f.id === 'venus' ||
    f.id === 'asteroid-belt' ||
    f.id === 'mars' ||
    f.id === 'uranus' ||
    f.id === 'saturn' ||
    f.id === 'proxima-centauri' ||
    f.id === 'light-year'
);

export function getFactById(id: CelestialId): CelestialFact | undefined {
  return PLANET_FACTS.find((f) => f.id === id);
}

export const ASTRONOMY_QUIZ_QUESTIONS: AstronomyQuizQuestion[] = [
  {
    id: 'largest-planet',
    prompt: 'Which planet is the largest in the solar system?',
    options: ['Earth', 'Mars', 'Saturn', 'Jupiter'],
    correctAnswer: 'Jupiter',
    explanation: 'Jupiter is the biggest planet in our solar system.',
    memoryAnchor: 'Jupiter is Giant.',
  },
  {
    id: 'brightest-planet',
    prompt: 'Which planet is the brightest in the sky after the Sun and Moon?',
    options: ['Mars', 'Saturn', 'Venus', 'Mercury'],
    correctAnswer: 'Venus',
    explanation: 'Venus appears brightest from Earth because it reflects a lot of sunlight and is relatively close to us.',
    memoryAnchor: '"Venus" = Visible / very bright.',
  },
  {
    id: 'asteroid-belt-location',
    prompt: 'Where is the asteroid belt located?',
    options: ['Around Mercury', 'Between Mars and Jupiter', 'Beyond Neptune', 'Inside Venus orbit'],
    correctAnswer: 'Between Mars and Jupiter',
    explanation: 'The asteroid belt sits in the middle of Mars and Jupiter.',
    memoryAnchor: 'Asteroids sit in the Mars-Jupiter middle.',
  },
  {
    id: 'mars-atmosphere',
    prompt: 'The atmosphere of Mars is composed mostly of what gas?',
    options: ['Oxygen', 'Carbon dioxide', 'Helium', 'Hydrogen'],
    correctAnswer: 'Carbon dioxide',
    explanation: 'Mars has a thin atmosphere made mostly of carbon dioxide, not oxygen.',
    memoryAnchor: 'Mars = CO2 atmosphere.',
  },
  {
    id: 'ringed-planets-count',
    prompt: 'How many planets in our solar system have rings?',
    options: ['One', 'Two', 'Three', 'Four'],
    correctAnswer: 'Four',
    explanation: 'Jupiter, Saturn, Uranus, and Neptune all have ring systems.',
    memoryAnchor: '4 planets have rings: Jupiter, Saturn, Uranus, Neptune.',
  },
  {
    id: 'uranus-name',
    prompt: 'Which planet is named after the Greek god who personified the sky?',
    options: ['Neptune', 'Mars', 'Uranus', 'Mercury'],
    correctAnswer: 'Uranus',
    explanation: 'Uranus is named after the Greek sky god.',
    memoryAnchor: 'Uranus = sky god.',
  },
  {
    id: 'closest-star',
    prompt: 'Other than the Sun, which star is closest to Earth?',
    options: ['Rigel', 'Betelgeuse', 'Antares', 'Proxima Centauri'],
    correctAnswer: 'Proxima Centauri',
    explanation: 'Proxima Centauri is the closest known star to Earth after the Sun.',
    memoryAnchor: 'Proxima = closest star.',
  },
  {
    id: 'light-year-definition',
    prompt: 'What is a light-year?',
    options: [
      'The brightness of light at 30,000 miles',
      'The distance light travels in one year',
      'Seventeen Earth years',
      'A unit of time',
    ],
    correctAnswer: 'The distance light travels in one year',
    explanation: 'A light-year measures distance, not time.',
    memoryAnchor: 'Light-year = distance, not time.',
  },
];
