export const AR_LEVELS: Array<{ level: number; label: string; topicIds: string[] }> = [
  { level: 1, label: 'Number mechanics', topicIds: ['order-of-operations', 'decimals', 'fractions', 'percents', 'unit-conversion'] },
  { level: 2, label: 'Ratio thinking', topicIds: ['ratios', 'rate-multiply', 'averages', 'mixture'] },
  { level: 3, label: 'Motion & work', topicIds: ['rate-distance-time', 'work-rate'] },
  { level: 4, label: 'Word problem', topicIds: ['word-problem-setup'] },
  { level: 5, label: 'Geometry', topicIds: ['area-volume'] },
  { level: 6, label: 'Algebra', topicIds: ['inequalities'] },
];

export function getLevelForTopic(topicId: string): (typeof AR_LEVELS)[0] | null {
  return AR_LEVELS.find((l) => l.topicIds.includes(topicId)) ?? null;
}
