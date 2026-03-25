export type MathStudyActiveCategory =
  | 'general-science'
  | 'arithmetic-reasoning'
  | 'mathematics-knowledge';

export const MATH_SECTION_IDS_FOR_HASH = [
  'algebra',
  'geometry-2d',
  'geometry-3d',
  'exponents-radicals',
  'factoring',
  'probability-stats',
  'units-conversions',
  'special-topics',
] as const;

const STORAGE_KEY_CATEGORY = 'mathStudy:activeCategory';
const STORAGE_KEY_MK_SECTION = 'mathStudy:activeMkSection';

const VALID_CATEGORIES = new Set<string>([
  'general-science',
  'arithmetic-reasoning',
  'mathematics-knowledge',
]);

export function readActiveCategory(): MathStudyActiveCategory | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY_CATEGORY);
    if (v && VALID_CATEGORIES.has(v)) return v as MathStudyActiveCategory;
  } catch {
    /* ignore */
  }
  return null;
}

export function writeActiveCategory(category: MathStudyActiveCategory): void {
  try {
    sessionStorage.setItem(STORAGE_KEY_CATEGORY, category);
  } catch {
    /* ignore */
  }
}

export function readMkSection(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY_MK_SECTION);
  } catch {
    return null;
  }
}

export function writeMkSection(sectionId: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY_MK_SECTION, sectionId);
  } catch {
    /* ignore */
  }
}

export function categoryFromHash(hashWithoutLeadingHash: string): MathStudyActiveCategory | null {
  if (hashWithoutLeadingHash === 'arithmetic-reasoning') return 'arithmetic-reasoning';
  if (
    (MATH_SECTION_IDS_FOR_HASH as readonly string[]).includes(hashWithoutLeadingHash)
  ) {
    return 'mathematics-knowledge';
  }
  return null;
}

export function isMkSectionId(id: string): boolean {
  return (MATH_SECTION_IDS_FOR_HASH as readonly string[]).includes(id);
}
