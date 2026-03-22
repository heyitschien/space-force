# ASVAB Study Portal — App Architecture & Content Overview

**Purpose:** This document provides a high-level executive and technical overview of the math-study app. It is intended for agents and developers who need to understand exactly what the app contains, how it is structured, what data exists for each section, and what features are implemented.

**App location:** `math-study/` (Vite + React + TypeScript)  
**Deployment:** Vercel at `asvab-study-portal.vercel.app`  
**Root directory (Vercel):** `math-study`

---

## 1. Executive Summary

The ASVAB Study Portal is a web application for preparing for the Armed Services Vocational Aptitude Battery (ASVAB). It covers all 9 ASVAB subtests, with **3 sections fully built** (General Science, Arithmetic Reasoning, Mathematics Knowledge) and **6 sections marked "Coming Soon"**.

### Core Features

- **Study content:** Topic pages with facts, principles, rules, examples, and practice problems
- **Practice tests:** Timed, ASVAB-formatted tests with multiple modes including **CAT-style adaptive**
- **Quizzes & drills:** Section-specific quizzes, recall drills, pattern recognition drills, trap checklists
- **Test history:** LocalStorage-backed history for General Science and Arithmetic Reasoning
- **Search:** Formula/content search across sections
- **Diagrams:** Interactive and static diagrams for science and math concepts

### Design Philosophy

- **Pattern-first (AR):** 20 ASVAB math patterns with instant-recognition drill
- **CAT simulation:** Adaptive mode where difficulty branches on correct/wrong; weighted scoring (easy=1, medium=2, hard=3)
- **Bucket-to-topic mapping:** Missed questions link to specific study topics
- **90+ AFQT target:** Messaging and UX emphasize speed and pattern recognition

---

## 2. Section-by-Section Inventory

### 2.1 General Science (Subtest 1)

**Status:** Active  
**Time:** 11 minutes, 25 questions (real ASVAB)  
**Sidebar:** 5 items

| Subsection | Route | Data Source | Content Type |
|------------|-------|-------------|--------------|
| Astronomy | `/astronomy` | `planetFacts.ts` | Planet facts, 3D solar system, quiz |
| Biology | `/biology` | `biologyFacts.ts` | Cell, systems, blood, classification; facts, quiz, recall drill, trap checklist |
| Chemistry & Atoms | `/chemistry` | `chemistryFacts.ts` | Atomic structure, matter, processes; facts, quiz, recall drill, trap checklist |
| Earth Science | `/earth-science` | `earthScienceFacts.ts` | Layers, rocks, biomes, composition; facts, quiz, recall drill, trap checklist |
| Measurement & Physics | `/measurement-physics` | `measurementPhysicsFacts.ts` | Metrics, temperature, light, motion, energy; facts, quiz, recall drill, trap checklist |

**Practice questions:** `generalSciencePracticeQuestions.json`  
- 75 questions total (25 × 3 practice tests)  
- Buckets: `astronomy`, `biology`, `chemistry`, `earth-science`, `measurement-physics`  
- Each question has `difficulty`: `easy` \| `medium` \| `hard`  
- Sources: `practice-1`, `practice-2`, `practice-3`

**Bucket → Study Path:**
- `astronomy` → `/astronomy`
- `biology` → `/biology`
- `chemistry` → `/chemistry`
- `earth-science` → `/earth-science`
- `measurement-physics` → `/measurement-physics`

---

### 2.2 Arithmetic Reasoning (Subtest 2)

**Status:** Active  
**Time:** 36 minutes, 30 questions (real ASVAB)  
**Sidebar:** 17 items (Overview, 20 Patterns, Pattern Drill, 14 topics)

#### Structure

| Item | Route / Anchor | Purpose |
|------|----------------|---------|
| Overview | `#arithmetic-reasoning` | Key skills, topic cards grid, Practice Test, Pattern Drill |
| 20 Patterns | `/arithmetic-reasoning/patterns` | Grid of 20 ASVAB math patterns with formula, example, Study links |
| Pattern Drill | `/arithmetic-reasoning/pattern-drill` | Instant-recognition quiz: stem → pick pattern |
| Topic pages | `/arithmetic-reasoning/:topicId` | Principles, rules, simple example, practice problems, "From the Test" |

#### Topics (14)

| Topic ID | Title | Patterns (from ar20Patterns) |
|----------|-------|-----------------------------|
| `percents` | Percents | #2, #3, #14 |
| `rate-multiply` | Rate × Quantity | #5, #15 |
| `unit-conversion` | Unit Conversion | #11 |
| `rate-distance-time` | Distance, Speed & Time | #1 |
| `fractions` | Fractions | #12, #17 |
| `averages` | Averages | #7, #18 |
| `area-volume` | Area & Volume | #9, #10, #20 |
| `ratios` | Ratios & Proportions | #4, #5, #19 |
| `inequalities` | Inequalities & Break-Even | #14 |
| `word-problem-setup` | Word Problem Setup | #16 |
| `work-rate` | Work Rate | #6 |
| `mixture` | Mixture Problems | #8 |
| `decimals` | Decimal Operations | #13 |

**Topic content (ArTopic):** `arTopicContent.ts`  
- Each topic: `id`, `title`, `description`, `principles[]`, `rules[]`, `simpleExample`, `practiceProblems[]`, `testQuestionIds[]`  
- `testQuestionIds` links to real questions from the 90-question pool  
- Optional `shortcut` on `simpleExample` for speed cues

**20 Patterns:** `ar20Patterns.ts`  
- `AR_20_PATTERNS`: id, name, formula, quickExample, topicIds[]  
- `PATTERN_STEMS`: stem, patternId (for Pattern Recognition Drill)  
- Helpers: `getPatternById`, `getPatternIdsForTopic`, `getStemsForPattern`

**Practice questions:** `arithmeticReasoningPracticeQuestions.json`  
- 90 questions total  
- Buckets: `percents`, `rate-multiply`, `unit-conversion`, `rate-distance-time`, `fractions`, `averages`, `area-volume`, `ratios`, `inequalities`, `word-problem-setup`  
- Each question has `difficulty`: `easy` \| `medium` \| `hard`  
- Sources: `practice-1`, `practice-2`, `practice-3`

**Bucket → Study Path (BUCKET_TO_PATH):**
- All 10 buckets map to `/arithmetic-reasoning/{topicId}`  
- `work-rate`, `mixture`, `decimals` have topic pages but no bucket in the 90-pool

---

### 2.3 Mathematics Knowledge (Subtest 5)

**Status:** Active  
**Content:** Inline in topic components (no separate data files)  
**Sidebar:** 8 items (scroll anchors)

| Section ID | Label | Anchor |
|------------|-------|--------|
| `algebra` | Algebra & Lines | `#algebra` |
| `geometry-2d` | 2D Geometry | `#geometry-2d` |
| `geometry-3d` | 3D Volume & Surface Area | `#geometry-3d` |
| `exponents-radicals` | Exponents & Radicals | `#exponents-radicals` |
| `factoring` | Factoring Guide | `#factoring` |
| `probability-stats` | Stats & Probability | `#probability-stats` |
| `units-conversions` | Units & Conversions | `#units-conversions` |
| `special-topics` | Special Topics | `#special-topics` |

**Components:** `Algebra.tsx`, `Geometry2D.tsx`, `Geometry3D.tsx`, `ExponentsRadicals.tsx`, `Factoring.tsx`, `ProbabilityStats.tsx`, `UnitsConversions.tsx`, `SpecialTopics.tsx`  
**Diagrams:** CoordinatePlaneDiagram, PythagoreanDiagram, CircleDiagram, TriangleDiagram, TrapezoidDiagram, RectangleDiagram, PolygonDiagram, Shape3DViewer, etc.

---

### 2.4 Word Knowledge (Subtest 3)

**Status:** Coming Soon  
**Sidebar:** Placeholder only

---

### 2.5 Paragraph Comprehension (Subtest 4)

**Status:** Coming Soon  
**Sidebar:** Placeholder only

---

### 2.6 Electronics Information (Subtest 6)

**Status:** Coming Soon  
**Sidebar:** Placeholder only

---

### 2.7 Auto and Shop (Subtest 7)

**Status:** Coming Soon  
**Sidebar:** Placeholder only

---

### 2.8 Mechanical Comprehension (Subtest 8)

**Status:** Coming Soon  
**Sidebar:** Placeholder only

---

### 2.9 Assembling Objects (Subtest 9)

**Status:** Coming Soon  
**Sidebar:** Placeholder only

---

## 3. Practice Tests & Testing Methods

### 3.1 General Science Practice Test

**Component:** `GeneralSciencePracticeTest.tsx`  
**Launcher:** `GeneralScienceTestLauncher.tsx` (mode selection)

| Mode | Description | Questions | Time |
|------|-------------|-----------|------|
| `adaptive` | CAT-style: difficulty branches; weighted scoring | 25 | 11 min |
| `practice-1` | From practice-1.pdf | 25 | 11 min |
| `practice-2` | From practice-2.pdf | 25 | 11 min |
| `practice-3` | From practice-3.pdf | 25 | 11 min |
| `mix` | Random from all 3 tests | 25 | 11 min |

**Adaptive logic:**  
- Start with medium question  
- Correct → next harder; Wrong → next easier  
- Weighted score: easy=1, medium=2, hard=3 pts  
- Post-test: weighted score, difficulty breakdown, difficulty badges on missed items, "Hard items to review" callout

---

### 3.2 Arithmetic Reasoning Practice Test

**Component:** `ArithmeticReasoningPracticeTest.tsx`  
**Launcher:** `ArithmeticReasoningTestLauncher.tsx` (mode selection)

| Mode | Description | Questions | Time |
|------|-------------|-----------|------|
| `adaptive` | CAT-style: difficulty branches; weighted scoring | 30 | 36 min |
| `practice-1` | From practice-1.pdf | 30 | 36 min |
| `practice-2` | From practice-2.pdf | 30 | 36 min |
| `practice-3` | From practice-3.pdf | 30 | 36 min |
| `mix` | Random from all 3 tests | 30 | 36 min |

**Adaptive logic:** Same as General Science.  
**Post-test:** "Study X" links to `/arithmetic-reasoning/{bucket}` via BUCKET_TO_PATH.

---

### 3.3 Math Practice Test (AsvabPracticeTest)

**Component:** `AsvabPracticeTest.tsx`  
**Scope:** Arithmetic Reasoning + Mathematics Knowledge  
**Mode:** Single fixed set of 27 questions (no mode selector)  
**Data:** Inline `QUESTIONS` array in component

---

## 4. Quizzes, Drills & Auxiliary Features

### 4.1 Section-Specific Quiz Modals

| Component | Section | Data |
|-----------|---------|------|
| `AstronomyQuizModal` | Astronomy | `ASTRONOMY_QUIZ_QUESTIONS` from planetFacts |
| `BiologyQuizModal` | Biology | `BIOLOGY_QUIZ_QUESTIONS` |
| `ChemistryQuizModal` | Chemistry | `CHEMISTRY_QUIZ_QUESTIONS` |
| `EarthScienceQuizModal` | Earth Science | `EARTH_SCIENCE_QUIZ_QUESTIONS` |
| `MeasurementPhysicsQuizModal` | Measurement & Physics | `MEASUREMENT_PHYSICS_QUIZ_QUESTIONS` |

### 4.2 Recall Drills (60 sec)

| Component | Data |
|-----------|------|
| `BiologyRecallDrill` | `RECALL_DRILL_ITEMS` |
| `ChemistryRecallDrill` | `CHEMISTRY_RECALL_DRILL_ITEMS` |
| `EarthScienceRecallDrill` | `EARTH_SCIENCE_RECALL_DRILL_ITEMS` |
| `MeasurementPhysicsRecallDrill` | `MEASUREMENT_PHYSICS_RECALL_DRILL_ITEMS` |

### 4.3 Trap Checklists

| Component | Data |
|-----------|------|
| `BiologyTrapChecklist` | `TRAP_CHECKLIST_ITEMS` |
| `ChemistryTrapChecklist` | `CHEMISTRY_TRAP_CHECKLIST_ITEMS` |
| `EarthScienceTrapChecklist` | `EARTH_SCIENCE_TRAP_CHECKLIST_ITEMS` |
| `MeasurementPhysicsTrapChecklist` | `MEASUREMENT_PHYSICS_TRAP_CHECKLIST_ITEMS` |

### 4.4 Pattern Recognition Drill (AR)

**Component:** `PatternRecognitionDrill.tsx`  
**Route:** `/arithmetic-reasoning/pattern-drill`  
**Data:** `PATTERN_STEMS` from ar20Patterns.ts  
**Flow:** Show stem → 4 pattern choices → select → correct/incorrect → next → completion screen with score

### 4.5 General Practice Question (QuizModal)

**Component:** `QuizModal.tsx`  
**Data:** Inline 5 math questions  
**Trigger:** Practice Menu → "Practice Question"

---

## 5. Data Schemas & Formats

### 5.1 Practice Question (JSON)

```json
{
  "meta": {
    "section": "General Science" | "Arithmetic Reasoning",
    "timeMinutes": 11 | 36,
    "questionsPerTest": 25 | 30,
    "sources": ["practice-1", "practice-2", "practice-3"]
  },
  "questions": [
    {
      "id": "gs-001" | "ar-p1-001",
      "order": 1,
      "text": "...",
      "options": [{ "id": "A"|"B"|"C"|"D", "text": "..." }],
      "correct": "A"|"B"|"C"|"D",
      "source": "practice-1"|"practice-2"|"practice-3",
      "bucket": "astronomy"|"percents"|...,
      "difficulty": "easy"|"medium"|"hard"
    }
  ]
}
```

### 5.2 ArTopic

```ts
{
  id: string;
  title: string;
  description: string;
  principles: string[];
  rules: string[];
  simpleExample: { problem: string; solution: string; shortcut?: string };
  practiceProblems: Array<{ problem: string; solution: string }>;
  testQuestionIds: string[];
}
```

### 5.3 ArPattern

```ts
{
  id: number;
  name: string;
  formula: string;
  quickExample: string;
  topicIds: string[];
}
```

### 5.4 PatternStem

```ts
{
  stem: string;
  patternId: number;
}
```

### 5.5 Fact (General Science)

```ts
{
  id: string;
  name: string;
  fact: string;
  contrast?: string;
  example?: string;
  memoryAnchor?: string;
  color: string;
  section: string;
}
```

### 5.6 Test Result (localStorage)

```ts
{
  id: string;
  date: string;
  mode: 'practice-1'|'practice-2'|'practice-3'|'mix'|'adaptive';
  score: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
  missedQuestionIds: string[];
  weightedScore?: number;      // adaptive only
  maxWeightedScore?: number;  // adaptive only
  missedByDifficulty?: { easy: number; medium: number; hard: number };
}
```

---

## 6. Routes

| Route | Component |
|-------|-----------|
| `/` | MathStudyPage (home) |
| `/astronomy` | AstronomyPage |
| `/biology` | BiologyPage |
| `/chemistry` | ChemistryPage |
| `/earth-science` | EarthSciencePage |
| `/measurement-physics` | MeasurementPhysicsPage |
| `/arithmetic-reasoning/patterns` | ArPatternsPage |
| `/arithmetic-reasoning/pattern-drill` | PatternRecognitionDrill |
| `/arithmetic-reasoning/:topicId` | ArTopicPage |

**SPA fallback:** `vercel.json` rewrites all non-file paths to `/index.html`.

---

## 7. Key Utilities

| File | Purpose |
|------|---------|
| `adaptiveQuestions.ts` | `getNextDifficulty`, `selectNextQuestion`, `getDifficulty`, `DIFFICULTY_POINTS` |
| `arQuestionLookup.ts` | `getArQuestionById(id)` |
| `testResults.ts` | `saveResult`, `getResults`, `saveArResult`, `getArResults` |

---

## 8. UI Components Summary

### Global

- **Header:** Search, Home
- **Sidebar:** Table of contents, category expand/collapse
- **PracticeMenu:** Floating button → General Science Test, AR Test, Math Practice Test, Practice Question, Test History
- **TestHistoryModal:** View past results (GS or AR)

### Diagrams (src/components/diagrams/)

AtomicStructureDiagram, BiomesDiagram, BloodCellsDiagram, BodySystemsDiagram, CellDiagram, ChemicalProcessesDiagram, CircleDiagram, ClassificationDiagram, CoordinatePlaneDiagram, EarthLayersDiagram, EnergyPowerDiagram, LightConstantsDiagram, MatterClassificationDiagram, MetricConversionDiagram, MotionConceptsDiagram, PolygonDiagram, PythagoreanDiagram, RectangleDiagram, RockTypesDiagram, Shape3DViewer, SolarSystem3D, TemperatureScaleDiagram, TrapezoidDiagram, TriangleDiagram

---

## 9. Extending the App

### Adding a new AR topic

1. Add entry to `AR_TOPICS` in `arTopicContent.ts`
2. Add to Sidebar in `Sidebar.tsx`
3. If it has pool questions, add bucket to `arithmeticReasoningPracticeQuestions.json` and `BUCKET_TO_PATH`

### Adding a new practice test mode

1. Extend `ArithmeticReasoningTestMode` or `GeneralScienceTestMode` in testResults.ts
2. Add mode to MODES in the launcher
3. Implement selection logic in `getQuestionsForMode` or adaptive flow

### Adding a new section (e.g., Word Knowledge)

1. Add category and items to `CATEGORIES` in Sidebar.tsx
2. Create data file(s) and page component
3. Add route in App.tsx
4. Add to PracticeMenu if practice test exists

---

## 10. File Reference

| Path | Purpose |
|------|---------|
| `math-study/src/App.tsx` | Routes, MathStudyPage, search, category state |
| `math-study/src/components/Sidebar.tsx` | Nav structure |
| `math-study/src/components/Header.tsx` | Search, Home |
| `math-study/src/components/PracticeMenu.tsx` | Practice options |
| `math-study/src/components/ArithmeticReasoning.tsx` | AR overview |
| `math-study/src/components/ArTopicPage.tsx` | AR topic page |
| `math-study/src/components/ArPatternsPage.tsx` | 20 Patterns grid |
| `math-study/src/components/PatternRecognitionDrill.tsx` | Pattern drill |
| `math-study/src/components/ArithmeticReasoningTestLauncher.tsx` | AR test mode picker |
| `math-study/src/components/ArithmeticReasoningPracticeTest.tsx` | AR test |
| `math-study/src/components/GeneralScienceTestLauncher.tsx` | GS test mode picker |
| `math-study/src/components/GeneralSciencePracticeTest.tsx` | GS test |
| `math-study/src/components/AsvabPracticeTest.tsx` | Math practice test |
| `math-study/src/data/arTopicContent.ts` | AR topics |
| `math-study/src/data/ar20Patterns.ts` | 20 patterns, stems |
| `math-study/src/data/arithmeticReasoningPracticeQuestions.json` | AR questions |
| `math-study/src/data/generalSciencePracticeQuestions.json` | GS questions |
| `math-study/src/utils/adaptiveQuestions.ts` | Adaptive logic |
| `math-study/src/utils/arQuestionLookup.ts` | AR question lookup |
| `math-study/src/utils/testResults.ts` | Test history |
| `math-study/vercel.json` | SPA rewrites |
