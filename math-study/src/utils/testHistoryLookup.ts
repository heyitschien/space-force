import generalScienceData from '../data/generalSciencePracticeQuestions.json';
import arithmeticReasoningData from '../data/arithmeticReasoningPracticeQuestions.json';
import wordKnowledgeData from '../data/wordKnowledgePracticeQuestions.json';
import paragraphComprehensionData from '../data/paragraphComprehensionPracticeQuestions.json';
import { ASVAB_PHASE0_QUESTIONS } from '../data/asvabPhase0EnduranceQuestions';

export type HistoryLookupSection =
  | 'general-science'
  | 'arithmetic-reasoning'
  | 'word-knowledge'
  | 'paragraph-comprehension'
  | 'math-endurance';

export interface HistoryQuestionDisplay {
  id: string;
  text: string;
  passage?: string;
  options: Array<{ id: string; text: string }>;
  correct: string;
  explanation?: string;
  subsection?: string;
}

type JsonQuestion = {
  id: string;
  text: string;
  passage?: string;
  options: Array<{ id: string; text: string }>;
  correct: string;
  explanation?: string;
  bucket?: string;
  source?: string;
  section?: string;
};

const GS_QUESTIONS = (generalScienceData as { questions: JsonQuestion[] }).questions;
const AR_QUESTIONS = (arithmeticReasoningData as { questions: JsonQuestion[] }).questions;
const WK_QUESTIONS = (wordKnowledgeData as { questions: JsonQuestion[] }).questions;
const PC_QUESTIONS = (paragraphComprehensionData as { questions: JsonQuestion[] }).questions;

const gsById = new Map(GS_QUESTIONS.map((q) => [q.id, q]));
const arById = new Map(AR_QUESTIONS.map((q) => [q.id, q]));
const wkById = new Map(WK_QUESTIONS.map((q) => [q.id, q]));
const pcById = new Map(PC_QUESTIONS.map((q) => [q.id, q]));
const meById = new Map(ASVAB_PHASE0_QUESTIONS.map((q) => [q.id, q]));

export function lookupQuestionForHistory(
  section: HistoryLookupSection,
  questionId: string
): HistoryQuestionDisplay | null {
  if (section === 'math-endurance') {
    const q = meById.get(questionId);
    if (!q) return null;
    return {
      id: q.id,
      text: q.text,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
      subsection: q.section,
    };
  }

  let raw: JsonQuestion | undefined;
  switch (section) {
    case 'general-science':
      raw = gsById.get(questionId);
      break;
    case 'arithmetic-reasoning':
      raw = arById.get(questionId);
      break;
    case 'word-knowledge':
      raw = wkById.get(questionId);
      break;
    case 'paragraph-comprehension':
      raw = pcById.get(questionId);
      break;
    default:
      return null;
  }

  if (!raw) return null;

  return {
    id: raw.id,
    text: raw.text,
    passage: raw.passage,
    options: raw.options,
    correct: raw.correct,
    explanation: raw.explanation,
    subsection: raw.bucket ?? raw.source,
  };
}

export function optionText(question: HistoryQuestionDisplay | null, letter: string): string {
  if (!question) return letter;
  const o = question.options.find((opt) => opt.id === letter);
  return o ? `${letter}: ${o.text}` : letter;
}
