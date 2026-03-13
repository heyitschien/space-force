import type { QuizQuestion } from '../data/quiz/types';
import level1Data from '../data/quiz/arLevel1Quizzes.json';

interface Level1Quiz {
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
 */
export function getQuestionsForQuiz(quizId: string): QuizQuestion[] {
  const data = level1Data as { quizzes: Level1Quiz[] };
  const quiz = data.quizzes.find((q) => q.quizId === quizId);
  if (!quiz) return [];
  return shuffleArray(quiz.questions);
}
