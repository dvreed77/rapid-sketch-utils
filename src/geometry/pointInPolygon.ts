import { T_Point, T_Path } from '../types';

/**
 * Determines whether a point is inside a polygon using the ray-casting algorithm.
 *
 * This function checks if a given point lies within the bounds of a polygon by casting a ray
 * from the point and counting the number of times it intersects the edges of the polygon.
 *
 * The polygon is defined as an array of points, and the algorithm assumes the polygon is
 * non-self-intersecting.
 *
 * @param point - The point to check, represented as `[x, y]`.
 * @param path - The polygon, represented as an array of points `[T_Point, T_Point, ...]`, where
 *   each point is `[x, y]`.
 *
 * @returns `true` if the point is inside the polygon; otherwise, `false`.
 *
 * @example
 * ```typescript
 * // Define a point
 * const point: T_Point = [5, 5];
 *
 * // Define a polygon
 * const polygon: T_Path = [
 *   [0, 0],
 *   [10, 0],
 *   [10, 10],
 *   [0, 10],
 * ];
 *
 * // Check if the point is inside the polygon
 * const isInside = pointInPolygon(point, polygon); // Returns true
 *
 * // Check a point outside the polygon
 * const outsidePoint: T_Point = [15, 5];
 * const isOutside = pointInPolygon(outsidePoint, polygon); // Returns false
 * ```
 *
 * @see {@link http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html | Ray-Casting Algorithm Reference}
 */
export function pointInPolygon(point: T_Point, path: T_Path) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  const [px, py] = point;

  let inside = false;
  for (let i = 0, j = path.length - 1; i < path.length; j = i++) {
    const xi = path[i][0],
      yi = path[i][1];
    const xj = path[j][0],
      yj = path[j][1];

    const intersect =
      yi > py != yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}
