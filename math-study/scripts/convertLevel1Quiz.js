/**
 * Converts raw Level 1 quiz JSON (from lve-1-quiz.py) to our schema.
 * Run: node scripts/convertLevel1Quiz.js
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rawPath = join(__dirname, '../src/data/quiz/arLevel1Quizzes.raw.json');
const outPath = join(__dirname, '../src/data/quiz/arLevel1Quizzes.json');

const TOPIC_ID_MAP = {
  pemdas: 'order-of-operations',
  decimals: 'decimals',
  fractions: 'fractions',
  percents: 'percents',
  'unit-conversion': 'unit-conversion',
  'level-1': 'level-1',
};

const OPTION_IDS = ['A', 'B', 'C', 'D'];

function convertQuestion(q, topicId, quizId) {
  const bucket = TOPIC_ID_MAP[topicId] ?? topicId;
  const correctIndex = typeof q.answer === 'number' ? q.answer : parseInt(q.answer, 10);
  const correct = OPTION_IDS[correctIndex] ?? 'A';
  const options = (q.choices || []).map((text, i) => ({
    id: OPTION_IDS[i],
    text: String(text),
  }));
  return {
    id: q.id,
    text: q.stem ?? q.text,
    options,
    correct,
    bucket,
    difficulty: q.difficulty ?? 'medium',
    explanation: q.explanation,
    quizId,
  };
}

function convertQuiz(quiz) {
  const topicId = quiz.topicId ?? 'level-1';
  return {
    quizId: quiz.quizId,
    title: quiz.title,
    topicId: TOPIC_ID_MAP[topicId] ?? topicId,
    quizType: quiz.quizType,
    questionCount: quiz.questionCount,
    questions: (quiz.questions || []).map((q) => convertQuestion(q, topicId, quiz.quizId)),
  };
}

const raw = JSON.parse(readFileSync(rawPath, 'utf-8'));
const converted = {
  levelId: raw.levelId,
  title: raw.title,
  quizzes: raw.quizzes.map(convertQuiz),
};

writeFileSync(outPath, JSON.stringify(converted, null, 2), 'utf-8');
console.log(`Wrote ${outPath} (${converted.quizzes.length} quizzes)`);
