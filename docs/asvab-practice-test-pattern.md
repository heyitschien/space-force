# ASVAB Practice Test Pattern

This document describes the pattern for section-specific ASVAB practice tests in the math-study app.

## JSON Schema

Each section has a JSON file in `math-study/src/data/`:

```json
{
  "meta": {
    "section": "Section Name",
    "timeMinutes": 11,
    "questionsPerTest": 25,
    "sources": ["practice-1", "practice-2", "practice-3"]
  },
  "questions": [
    {
      "id": "gs-001",
      "text": "Question text",
      "options": [
        { "id": "A", "text": "Option A" },
        { "id": "B", "text": "Option B" },
        { "id": "C", "text": "Option C" },
        { "id": "D", "text": "Option D" }
      ],
      "correct": "D",
      "source": "practice-1",
      "bucket": "optional-topic-bucket"
    }
  ]
}
```

- **meta.timeMinutes**: Countdown duration (ASVAB standard: GS 11 min, AR 36 min, MK 24 min)
- **meta.questionsPerTest**: Number of questions per session (e.g., 25 for GS)
- **options**: Always A/B/C/D
- **bucket**: Optional; for analytics or topic tagging (e.g., astronomy, biology)

## Timer Rules

- **Countdown**: Timer runs from `timeMinutes` down to 0
- **On expire**: Stop accepting answers; show completion screen
- **Display**: `MM:SS` format (e.g., `10:32`)

## Adding a New Section

1. Create `{section}PracticeQuestions.json` in `math-study/src/data/`
2. Create `{Section}PracticeTest.tsx` (or reuse a generic component)
3. Load JSON; randomly select `questionsPerTest` questions per session
4. Wire entry point (e.g., button in relevant section or main page)

## Reference Implementation

- **Data**: `math-study/src/data/generalSciencePracticeQuestions.json`
- **Component**: `math-study/src/components/GeneralSciencePracticeTest.tsx`
- **Entry**: General Science section → "General Science Practice Test (25 Q, 11 min)" button

## ASVAB Time Allocations (reference)

| Subtest | Questions | Time |
|---------|-----------|------|
| General Science | 25 | 11 min |
| Arithmetic Reasoning | 30 | 36 min |
| Mathematics Knowledge | 25 | 24 min |
| Word Knowledge | 35 | 11 min |
| Paragraph Comprehension | 15 | 13 min |
