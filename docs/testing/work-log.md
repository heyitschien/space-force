# Work Log

## 2025-03-11 — AR Section 2 Study UI + 20 Patterns Enhancement

### AR Section 2 Study UI (from ar_section_2_study_ui plan)

- **arTopicContent.ts**: Topic content for 10 buckets (percents, rate-multiply, unit-conversion, rate-distance-time, fractions, averages, area-volume, ratios, inequalities, word-problem-setup). Each topic: principles, rules, simpleExample, practiceProblems, testQuestionIds.
- **arQuestionLookup.ts**: `getArQuestionById()` to look up questions from the 90-question pool.
- **ArTopicPage.tsx**: Reusable topic page with principles, rules, simple example, practice problems, "From the Test" expandable questions.
- **App.tsx**: Route `/arithmetic-reasoning/:topicId`.
- **Sidebar.tsx**: 10 topic links under AR.
- **ArithmeticReasoning.tsx**: Topic cards grid linking to each topic.
- **ArithmeticReasoningPracticeTest.tsx**: `BUCKET_TO_PATH` updated so "Study X" links route to correct topic pages.

### AR 20 Patterns Enhancement (from ar_20_patterns_enhancement plan)

- **ar20Patterns.ts**: 20 patterns with formula, quickExample, topicIds; 40 pattern stems for drill.
- **ArPatternsPage.tsx**: 20 Patterns overview page at `/arithmetic-reasoning/patterns` with hero, grid of pattern cards, links to topics.
- **PatternRecognitionDrill.tsx**: Instant recognition drill at `/arithmetic-reasoning/pattern-drill` — stems + 4 pattern choices, score, completion screen.
- **ArTopicPage.tsx**: Pattern badges (e.g. #2, #3) linking to patterns page; "Quick method · ~30 sec" badge on Simple Example.
- **arTopicContent.ts**: Added `shortcut` to simpleExample; added 3 gap topics: work-rate, mixture, decimals.
- **ArithmeticReasoning.tsx**: 20 Patterns card, Pattern Drill button, tagline "Recognize the pattern → solve in 10–20 seconds → 90+ AFQT".
- **Sidebar.tsx**: 20 Patterns, Pattern Drill, work-rate, mixture, decimals nav items.
- **App.tsx**: Routes for `/arithmetic-reasoning/patterns` and `/arithmetic-reasoning/pattern-drill`.

### Files Touched

| File | Action |
|------|--------|
| `math-study/src/data/arTopicContent.ts` | Create |
| `math-study/src/data/ar20Patterns.ts` | Create |
| `math-study/src/utils/arQuestionLookup.ts` | Create |
| `math-study/src/components/ArTopicPage.tsx` | Create |
| `math-study/src/components/ArPatternsPage.tsx` | Create |
| `math-study/src/components/PatternRecognitionDrill.tsx` | Create |
| `math-study/src/App.tsx` | Update |
| `math-study/src/components/Sidebar.tsx` | Update |
| `math-study/src/components/topics/ArithmeticReasoning.tsx` | Update |
| `math-study/src/components/ArithmeticReasoningPracticeTest.tsx` | Update |

### Rollback

Revert commit for full rollback.
