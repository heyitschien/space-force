import type { QuizConfig } from './types';

/** Maps topicId to mastery and speed quizIds for Level 1 AR */
export const AR_LEVEL1_TOPIC_QUIZ_IDS: Record<
  string,
  { mastery: string; speed: string }
> = {
  'order-of-operations': { mastery: 'pemdas-mastery', speed: 'pemdas-speed' },
  decimals: { mastery: 'decimals-mastery', speed: 'decimals-speed' },
  fractions: { mastery: 'fractions-mastery', speed: 'fractions-speed' },
  percents: { mastery: 'percents-mastery', speed: 'percents-speed' },
  'unit-conversion': { mastery: 'unit-conversion-mastery', speed: 'unit-conversion-speed' },
};

/** Time limits from level-1-ar.json (minutes → seconds) */
const MASTERY_MINUTES = 12;
const SPEED_SECONDS = 90;
const MIXED_MINUTES = 16;
const CHALLENGE_MINUTES = 18;

export const AR_LEVEL1_QUIZ_CONFIGS: Record<string, QuizConfig> = {
  'pemdas-mastery': {
    quizId: 'pemdas-mastery',
    title: 'PEMDAS Mastery Quiz',
    questionCount: 15,
    timeLimitSeconds: MASTERY_MINUTES * 60,
    mode: 'mastery',
    topicId: 'order-of-operations',
  },
  'pemdas-speed': {
    quizId: 'pemdas-speed',
    title: 'PEMDAS Speed Drill',
    questionCount: 10,
    timeLimitSeconds: SPEED_SECONDS,
    mode: 'speed',
    topicId: 'order-of-operations',
  },
  'decimals-mastery': {
    quizId: 'decimals-mastery',
    title: 'Decimal Operations Mastery Quiz',
    questionCount: 15,
    timeLimitSeconds: MASTERY_MINUTES * 60,
    mode: 'mastery',
    topicId: 'decimals',
  },
  'decimals-speed': {
    quizId: 'decimals-speed',
    title: 'Decimal Operations Speed Drill',
    questionCount: 10,
    timeLimitSeconds: SPEED_SECONDS,
    mode: 'speed',
    topicId: 'decimals',
  },
  'fractions-mastery': {
    quizId: 'fractions-mastery',
    title: 'Fractions Mastery Quiz',
    questionCount: 15,
    timeLimitSeconds: 14 * 60,
    mode: 'mastery',
    topicId: 'fractions',
  },
  'fractions-speed': {
    quizId: 'fractions-speed',
    title: 'Fractions Speed Drill',
    questionCount: 10,
    timeLimitSeconds: 100,
    mode: 'speed',
    topicId: 'fractions',
  },
  'percents-mastery': {
    quizId: 'percents-mastery',
    title: 'Percents Mastery Quiz',
    questionCount: 15,
    timeLimitSeconds: 14 * 60,
    mode: 'mastery',
    topicId: 'percents',
  },
  'percents-speed': {
    quizId: 'percents-speed',
    title: 'Percents Speed Drill',
    questionCount: 10,
    timeLimitSeconds: SPEED_SECONDS,
    mode: 'speed',
    topicId: 'percents',
  },
  'unit-conversion-mastery': {
    quizId: 'unit-conversion-mastery',
    title: 'Unit Conversion Mastery Quiz',
    questionCount: 15,
    timeLimitSeconds: 14 * 60,
    mode: 'mastery',
    topicId: 'unit-conversion',
  },
  'unit-conversion-speed': {
    quizId: 'unit-conversion-speed',
    title: 'Unit Conversion Speed Drill',
    questionCount: 10,
    timeLimitSeconds: 100,
    mode: 'speed',
    topicId: 'unit-conversion',
  },
  'level1-mixed-test': {
    quizId: 'level1-mixed-test',
    title: 'Level 1 Mixed Test',
    questionCount: 20,
    timeLimitSeconds: MIXED_MINUTES * 60,
    mode: 'mixed',
    topicId: 'level-1',
  },
  'level1-challenge-test': {
    quizId: 'level1-challenge-test',
    title: 'Level 1 Challenge Test',
    questionCount: 25,
    timeLimitSeconds: CHALLENGE_MINUTES * 60,
    mode: 'challenge',
    topicId: 'level-1',
  },
};

export const BUCKET_TO_STUDY_PATH: Record<string, string> = {
  'order-of-operations': '/arithmetic-reasoning/order-of-operations',
  decimals: '/arithmetic-reasoning/decimals',
  fractions: '/arithmetic-reasoning/fractions',
  percents: '/arithmetic-reasoning/percents',
  'unit-conversion': '/arithmetic-reasoning/unit-conversion',
  'rate-multiply': '/arithmetic-reasoning/rate-multiply',
};
