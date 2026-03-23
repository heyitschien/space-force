import type { QuizConfig } from './types';

/** Maps topicId to mastery and speed quizIds for Level 2 AR */
export const AR_LEVEL2_TOPIC_QUIZ_IDS: Record<
  string,
  { mastery: string; speed: string }
> = {
  ratios: { mastery: 'ratios-mastery', speed: 'ratios-speed' },
  'rate-multiply': {
    mastery: 'rate-multiply-mastery',
    speed: 'rate-multiply-speed',
  },
};

const MASTERY_MINUTES = 12;
const SPEED_SECONDS = 90;

export const AR_LEVEL2_QUIZ_CONFIGS: Record<string, QuizConfig> = {
  'ratios-mastery': {
    quizId: 'ratios-mastery',
    title: 'Ratios & Proportions Mastery Quiz',
    questionCount: 15,
    timeLimitSeconds: MASTERY_MINUTES * 60,
    mode: 'mastery',
    topicId: 'ratios',
  },
  'ratios-speed': {
    quizId: 'ratios-speed',
    title: 'Ratios & Proportions Speed Drill',
    questionCount: 10,
    timeLimitSeconds: SPEED_SECONDS,
    mode: 'speed',
    topicId: 'ratios',
  },
  'rate-multiply-mastery': {
    quizId: 'rate-multiply-mastery',
    title: 'Rate × Quantity Mastery Quiz',
    questionCount: 15,
    timeLimitSeconds: MASTERY_MINUTES * 60,
    mode: 'mastery',
    topicId: 'rate-multiply',
  },
  'rate-multiply-speed': {
    quizId: 'rate-multiply-speed',
    title: 'Rate × Quantity Speed Drill',
    questionCount: 10,
    timeLimitSeconds: SPEED_SECONDS,
    mode: 'speed',
    topicId: 'rate-multiply',
  },
};

export const BUCKET_TO_STUDY_PATH: Record<string, string> = {
  ratios: '/arithmetic-reasoning/ratios',
  'rate-multiply': '/arithmetic-reasoning/rate-multiply',
  averages: '/arithmetic-reasoning/averages',
};
