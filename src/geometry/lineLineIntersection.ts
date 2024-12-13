import { T_Line, T_Point } from '../types';

/**
 * Calculates the intersection point of two line segments, if it exists.
 *
 * This function determines whether two line segments intersect and returns
 * the intersection point (if any) along with a boolean indicating whether
 * an intersection exists within the bounds of the segments.
 *
 * @param line1 - The first line segment, represented as an array of two points `[T_Point, T_Point]`.
 * @param line2 - The second line segment, represented as an array of two points `[T_Point, T_Point]`.
 *
 * @returns An object containing:
 * - `pt`: The intersection point as `[x, y]`. This value will be the calculated intersection point,
 *   even if it is outside the bounds of the segments.
 * - `doesIntersect`: A boolean indicating whether the intersection lies within both line segments.
 *
 * @example
 * ```typescript
 * // Define two line segments
 * const line1: T_Line = [[0, 0], [10, 10]];
 * const line2: T_Line = [[0, 10], [10, 0]];
 *
 * // Check for intersection
 * const result = lineLineIntersection(line1, line2);
 * console.log(result);
 * // Output: { pt: [5, 5], doesIntersect: true }
 *
 * // Define two non-intersecting line segments
 * const line3: T_Line = [[0, 0], [5, 5]];
 * const line4: T_Line = [[6, 6], [10, 10]];
 *
 * const result2 = lineLineIntersection(line3, line4);
 * console.log(result2);
 * // Output: { pt: [5.5, 5.5], doesIntersect: false }
 * ```
 */
export function lineLineIntersection(
  line1: T_Line,
  line2: T_Line,
): { pt: T_Point | null; doesIntersect: boolean } {
  const [[x1, y1], [x2, y2]] = line1;
  const [[x3, y3], [x4, y4]] = line2;

  const t =
    ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

  const u =
    ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

  const x = x1 + t * (x2 - x1);
  const y = y1 + t * (y2 - y1);
  return {
    pt: [x, y],
    doesIntersect: t >= 0 && t <= 1 && u >= 0 && u <= 1,
  };
}
