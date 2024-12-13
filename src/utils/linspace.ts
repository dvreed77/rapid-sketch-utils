import { range } from 'd3';

/**
 * Generates an array of evenly spaced numbers between `x1` and `x2`.
 *
 * By default, the range is exclusive of the endpoint (`x2`). If the `inclusive` option is set to `true`,
 * the endpoint will be included.
 *
 * @param x1 - The starting value of the range.
 * @param x2 - The ending value of the range.
 * @param n - The number of intervals to divide the range into. Defaults to 100.
 * @param inclusive - Whether to include the endpoint (`x2`) in the range. Defaults to `false`.
 *
 * @returns An array of evenly spaced numbers between `x1` and `x2`.
 *
 * @example
 * ```typescript
 * const result = linspace(0, 1, 5);
 * // Returns [0, 0.2, 0.4, 0.6, 0.8]
 *
 * const result2 = linspace(0, 1, 5, true);
 * // Returns [0, 0.25, 0.5, 0.75, 1]
 *
 * const result3 = linspace(10, 20, 2, true);
 * // Returns [10, 20]
 * ```
 *
 * @see {@link https://github.com/d3/d3-array#range | d3.range Documentation}
 */
export function linspace(
  x1: number,
  x2: number,
  n = 100,
  inclusive = false,
): number[] {
  const dx = (x2 - x1) / (inclusive ? n - 1 : n);
  const result = range(x1, x2, dx);
  if (inclusive && result[result.length - 1] !== x2) {
    result.push(x2);
  }
  return result;
}
