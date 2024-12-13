import { randomFloat } from './randomFloat';

/**
 * Generates a random integer within a specified range.
 *
 * The returned value is greater than or equal to `min` and less than or equal to `max`.
 *
 * @param min - The lower bound of the range (inclusive).
 * @param max - The upper bound of the range (inclusive).
 *
 * @returns A random integer between `min` and `max`, inclusive.
 *
 * @example
 * ```typescript
 * // Generate a random integer between 1 and 10
 * const result1 = randomInt(1, 10);
 *
 * // Generate a random integer between -5 and 5
 * const result2 = randomInt(-5, 5);
 *
 * // Generate a random integer between 0 and 100
 * const result3 = randomInt(0, 100);
 * ```
 */
export function randomInt(min: number, max: number) {
  return Math.floor(randomFloat(min, max + 1));
}
