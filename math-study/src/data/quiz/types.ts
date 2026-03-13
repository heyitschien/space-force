export type QuizMode = 'mastery' | 'speed' | 'mixed' | 'challenge';

export type QuizDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: OptionId; text: string }[];
  correct: OptionId;
  bucket: string;
  difficulty: QuizDifficulty;
  explanation?: string;
  quizId?: string;
}

export interface QuizConfig {
  quizId: string;
  title: string;
  questionCount: number;
  timeLimitSeconds?: number;
  mode: QuizMode;
  topicId?: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
  answerHistory: Array<{
    question: QuizQuestion;
    selectedAnswer: OptionId;
    correct: boolean;
  }>;
}
