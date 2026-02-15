# Math Study Portal

A modern React application for ASVAB math study materials. Built from the original `docs/references/math-reference.html` with a component-based architecture for easy extension.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **KaTeX** (via react-katex) for math rendering

## Getting Started

```bash
cd math-study
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Search bar + title
│   ├── Sidebar.tsx         # Table of contents navigation
│   ├── FormulaCard.tsx     # Reusable formula card
│   ├── Math.tsx            # KaTeX wrapper for LaTeX
│   ├── QuizModal.tsx       # Practice question modal
│   ├── UnitConverter.tsx   # Interactive unit converter
│   └── topics/             # One component per learning topic
│       ├── Algebra.tsx
│       ├── Geometry2D.tsx
│       ├── Geometry3D.tsx
│       ├── ExponentsRadicals.tsx
│       ├── Factoring.tsx
│       ├── ProbabilityStats.tsx
│       ├── UnitsConversions.tsx
│       └── SpecialTopics.tsx
├── App.tsx
└── main.tsx
```

## Features

- **Search** – Filter sections by keyword (slope, circle, volume, etc.)
- **Sticky sidebar** – Active section highlighting on scroll
- **Practice quiz** – Random practice questions
- **Unit converter** – Length, mass, capacity, time, temperature, speed
- **Responsive layout** – Mobile-friendly design

## Adding New Content

1. Create a new component in `src/components/topics/`
2. Add the section ID to `Sidebar` and `App.tsx`
3. Add search terms to `SEARCH_TERMS` in `App.tsx` for discoverability
