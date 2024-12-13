import { T_Line, T_Point } from '../types';

/**
 * Calculates a point on a line segment at a given ratio `t` (default is the midpoint).
 *
 * The function computes the interpolated point on the line segment defined by two points,
 * using the linear interpolation formula:
 *
 * ```
 * [x, y] = [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]
 * ```
 *
 * @param line - The line segment represented as a tuple of two points `[T_Point, T_Point]`.
 * @param t - The interpolation ratio, where:
 *   - `t = 0` returns the starting point of the line.
 *   - `t = 1` returns the ending point of the line.
 *   - `t = 0.5` (default) returns the midpoint of the line.
 *
 * @returns The interpolated point on the line at the given ratio `t`.
 *
 * @example
 * ```typescript
 * // Define a line segment
 * const line: T_Line = [[0, 0], [10, 10]];
 *
 * // Get the midpoint (t = 0.5)
 * const mid = interpolateLine(line); // [5, 5]
 *
 * // Get the point 25% along the line (t = 0.25)
 * const quarter = interpolateLine(line, 0.25); // [2.5, 2.5]
 *
 * // Get the endpoint (t = 1)
 * const end = interpolateLine(line, 1); // [10, 10]
 * ```
 */
export function interpolateLine(
  [[x1, y1], [x2, y2]]: T_Line,
  t = 0.5,
): T_Point {
  return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
}
