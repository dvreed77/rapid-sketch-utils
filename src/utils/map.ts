import { constrain } from './constrain';

/**
 * Maps a number from one range to another.
 *
 * The function transforms a value `n` from the range `[start1, stop1]` to the range `[start2, stop2]`.
 * Optionally, the output can be constrained to the bounds of the target range.
 *
 * @param n - The number to map.
 * @param start1 - The lower bound of the input range.
 * @param stop1 - The upper bound of the input range.
 * @param start2 - The lower bound of the target range.
 * @param stop2 - The upper bound of the target range.
 * @param withinBounds - If `true`, constrains the output to `[start2, stop2]`. Defaults to `false`.
 *
 * @returns The mapped value, optionally constrained to the target range.
 *
 * @example
 * ```typescript
 * // Map 5 from the range [0, 10] to [0, 100]
 * const result = mapValue(5, 0, 10, 0, 100); // Returns 50
 *
 * // Map 15 from the range [0, 10] to [0, 100], with constraints
 * const constrained = mapValue(15, 0, 10, 0, 100, true); // Returns 100
 *
 * // Reverse mapping
 * const reverse = mapValue(5, 0, 10, 100, 0); // Returns 50
 *
 * // Reverse mapping with constraints
 * const constrainedReverse = mapValue(15, 0, 10, 100, 0, true); // Returns 100
 * ```
 */
export function mapValue(
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  withinBounds = false,
): number {
  // Perform the mapping calculation
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

  // Return without bounds checking
  if (!withinBounds) {
    return newval;
  }

  // Constrain the output to the target range
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}
