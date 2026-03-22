import type { QuizQuestion } from '../data/quiz/types';
import level1Data from '../data/quiz/arLevel1Quizzes.json';
import level2Data from '../data/quiz/arLevel2Quizzes.json';

interface ArQuiz {
  quizId: string;
  title: string;
  topicId: string;
  quizType: string;
  questionCount: number;
  questions: QuizQuestion[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Get questions for a quiz by quizId. Returns shuffled copy for variety.
 * Checks Level 1 and Level 2 quiz sources.
 */
export function getQuestionsForQuiz(quizId: string): QuizQuestion[] {
  const l1 = level1Data as { quizzes: ArQuiz[] };
  const l2 = level2Data as { quizzes: ArQuiz[] };
  const quiz = l1.quizzes.find((q) => q.quizId === quizId)
    ?? l2.quizzes.find((q) => q.quizId === quizId);
  if (!quiz) return [];
  return shuffleArray(quiz.questions);
}
