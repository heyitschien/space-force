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
