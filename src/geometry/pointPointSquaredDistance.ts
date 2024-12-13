import { T_Point } from '../types';

/**
 * Calculates the squared Euclidean distance between two points in 2D space.
 *
 * This function computes the squared distance (without applying the square root) between two points,
 * which is often used in scenarios where comparing relative distances is sufficient, or performance
 * is critical, as it avoids the computational cost of calculating the square root.
 *
 * @param v - The first point, represented as `[x, y]`.
 * @param w - The second point, represented as `[x, y]`.
 *
 * @returns The squared Euclidean distance between the two points.
 *
 * @example
 * ```typescript
 * // Define two points
 * const point1: T_Point = [0, 0];
 * const point2: T_Point = [3, 4];
 *
 * // Calculate the squared distance
 * const squaredDistance = pointPointSquaredDistance(point1, point2);
 * console.log(squaredDistance); // 25
 *
 * // Comparing distances without needing actual values
 * const point3: T_Point = [6, 8];
 * const dist1 = pointPointSquaredDistance(point1, point2); // 25
 * const dist2 = pointPointSquaredDistance(point1, point3); // 100
 * console.log(dist1 < dist2); // true
 * ```
 *
 * @see Use {@link pointPointDistance} if the actual Euclidean distance is required.
 */
export function pointPointSquaredDistance(v: T_Point, w: T_Point) {
  const dx = v[0] - w[0],
    dy = v[1] - w[1];
  return dx * dx + dy * dy;
}
