/**
 * Generates a random floating-point number within a specified range.
 *
 * The returned value is greater than or equal to `min` and less than `max`.
 *
 * @param min - The lower bound of the range (inclusive).
 * @param max - The upper bound of the range (exclusive).
 *
 * @returns A random floating-point number between `min` (inclusive) and `max` (exclusive).
 *
 * @example
 * ```typescript
 * // Generate a random float between 0 and 1
 * const result1 = randomFloat(0, 1);
 *
 * // Generate a random float between 10 and 20
 * const result2 = randomFloat(10, 20);
 *
 * // Generate a random float between -5 and 5
 * const result3 = randomFloat(-5, 5);
 * ```
 */
export function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
