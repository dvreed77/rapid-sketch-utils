import { T_Point } from '../types';

/**
 * Calculates the Euclidean distance between two points in 2D space.
 *
 * This function computes the straight-line distance (also known as the Euclidean distance)
 * between two points represented as `[x, y]` coordinates.
 *
 * @param v - The first point, represented as `[x, y]`.
 * @param w - The second point, represented as `[x, y]`.
 *
 * @returns The Euclidean distance between the two points.
 *
 * @example
 * ```typescript
 * // Define two points
 * const point1: T_Point = [0, 0];
 * const point2: T_Point = [3, 4];
 *
 * // Calculate the distance
 * const distance = pointPointDistance(point1, point2);
 * console.log(distance); // 5
 *
 * // Points at the same location
 * const distance2 = pointPointDistance([1, 1], [1, 1]);
 * console.log(distance2); // 0
 * ```
 */
export function pointPointDistance(v: T_Point, w: T_Point) {
  const dx = v[0] - w[0],
    dy = v[1] - w[1];
  return Math.sqrt(dx * dx + dy * dy);
}
