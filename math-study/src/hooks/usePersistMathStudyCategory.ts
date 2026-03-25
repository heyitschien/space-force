import { useEffect } from 'react';
import {
  writeActiveCategory,
  type MathStudyActiveCategory,
} from '../utils/mathStudyNavPersistence';

export function usePersistMathStudyCategory(category: MathStudyActiveCategory): void {
  useEffect(() => {
    writeActiveCategory(category);
  }, [category]);
}
