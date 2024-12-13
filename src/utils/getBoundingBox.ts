import { T_Path, T_Point } from '../types';

export function getBoundingBox(points: T_Path): [T_Point, T_Point] {
  const n = points.length;
  if (n === 0) {
    throw new Error('Expected points to be a non-empty array');
  }
  const d = points[0].length;
  const lo = points[0].slice() as T_Point;
  const hi = points[0].slice() as T_Point;
  for (let i = 1; i < n; ++i) {
    const p = points[i];
    for (let j = 0; j < d; ++j) {
      const x = p[j];
      lo[j] = Math.min(lo[j], x);
      hi[j] = Math.max(hi[j], x);
    }
  }
  return [lo, hi];
}
