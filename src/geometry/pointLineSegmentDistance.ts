import { T_Line, T_Point } from '../types';
import { pointPointSquaredDistance } from './pointPointSquaredDistance';

/**
 * Calculates the squared distance from a point to the closest point on a line segment.
 *
 * This function computes the shortest distance between a given point and a line segment
 * by projecting the point onto the line and determining the nearest point on the segment.
 *
 * The returned distance is squared for performance reasons. If you need the actual distance,
 * you can compute the square root of the result.
 *
 * @param point - The point to measure the distance from, represented as `[x, y]`.
 * @param line - The line segment, represented as a tuple of two points `[start, end]`.
 *
 * @returns The squared distance from the point to the closest point on the line segment.
 *
 * @example
 * ```typescript
 * // Define a point and a line segment
 * const point: T_Point = [5, 5];
 * const line: T_Line = [[0, 0], [10, 0]];
 *
 * // Calculate the squared distance
 * const distance = pointLineSegmentDistance(point, line);
 * console.log(distance); // 25 (actual distance is sqrt(25) = 5)
 *
 * // Point lies directly on the line
 * const onLinePoint: T_Point = [5, 0];
 * const distance2 = pointLineSegmentDistance(onLinePoint, line);
 * console.log(distance2); // 0
 * ```
 */
export function pointLineSegmentDistance(point: T_Point, [start, end]: T_Line) {
  const [px, py] = point;
  const [[x1, y1], [x2, y2]] = [start, end];
  const dx = x2 - x1;
  const dy = y2 - y1;

  const dLine = pointPointSquaredDistance(start, end);

  const t = ((px - x1) * dx + (py - y1) * dy) / dLine;

  let md: T_Point;

  if (t <= 0) {
    md = start;
  } else if (t >= 1) {
    md = end;
  } else {
    md = [x1 + t * dx, y1 + t * dy];
  }

  return pointPointSquaredDistance(point, md);
}
