import type { NavItem } from '../types/studyNav';

/** Single source of truth for Arithmetic Reasoning links (sidebar + lesson full index). */
export const ARITHMETIC_REASONING_NAV_ITEMS: NavItem[] = [
  { id: 'ar-section-entry', label: 'Entry', isSectionHeader: true },
  { id: 'arithmetic-reasoning-overview', label: 'Overview', href: '#arithmetic-reasoning' },
  { id: 'ar-20-patterns', label: 'AR Patterns', href: '/arithmetic-reasoning/patterns' },
  { id: 'ar-pattern-drill', label: 'Pattern Drill', href: '/arithmetic-reasoning/pattern-drill' },
  { id: 'ar-section-l1', label: 'Level 1 (Number mechanics)', isSectionHeader: true },
  { id: 'ar-order-of-operations', label: 'Order of Operations (PEMDAS)', href: '/arithmetic-reasoning/order-of-operations' },
  { id: 'ar-decimals', label: 'Decimal Operations', href: '/arithmetic-reasoning/decimals' },
  { id: 'ar-fractions', label: 'Fractions', href: '/arithmetic-reasoning/fractions' },
  { id: 'ar-percents', label: 'Percents', href: '/arithmetic-reasoning/percents' },
  { id: 'ar-unit-conversion', label: 'Unit Conversion', href: '/arithmetic-reasoning/unit-conversion' },
  { id: 'ar-section-l2', label: 'Level 2 (Ratio thinking)', isSectionHeader: true },
  { id: 'ar-ratios', label: 'Ratios & Proportions', href: '/arithmetic-reasoning/ratios' },
  { id: 'ar-rate-multiply', label: 'Rate × Quantity', href: '/arithmetic-reasoning/rate-multiply' },
  { id: 'ar-averages', label: 'Averages', href: '/arithmetic-reasoning/averages' },
  { id: 'ar-mixture', label: 'Mixture Problems', href: '/arithmetic-reasoning/mixture' },
  { id: 'ar-section-l3', label: 'Level 3 (Motion & work)', isSectionHeader: true },
  { id: 'ar-rate-distance-time', label: 'Distance, Speed & Time', href: '/arithmetic-reasoning/rate-distance-time' },
  { id: 'ar-work-rate', label: 'Work Rate', href: '/arithmetic-reasoning/work-rate' },
  { id: 'ar-section-l4', label: 'Level 4 (Word problem)', isSectionHeader: true },
  { id: 'ar-word-problem-setup', label: 'Word Problem Setup', href: '/arithmetic-reasoning/word-problem-setup' },
  { id: 'ar-section-l5', label: 'Level 5 (Geometry)', isSectionHeader: true },
  { id: 'ar-area-volume', label: 'Area & Volume', href: '/arithmetic-reasoning/area-volume' },
  { id: 'ar-section-l6', label: 'Level 6 (Algebra)', isSectionHeader: true },
  { id: 'ar-inequalities', label: 'Inequalities', href: '/arithmetic-reasoning/inequalities' },
];
