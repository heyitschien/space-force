import arData from '../data/arithmeticReasoningPracticeQuestions.json';

interface QuestionOption {
  id: string;
  text: string;
}

interface ArQuestion {
  id: string;
  order?: number;
  text: string;
  options: QuestionOption[];
  correct: string;
  source: string;
  bucket?: string;
}

const questions = (arData as { questions: ArQuestion[] }).questions;

export function getArQuestionById(id: string): ArQuestion | null {
  return questions.find((q) => q.id === id) ?? null;
}
