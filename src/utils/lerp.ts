/**
 * Linearly interpolates between two values based on a given ratio.
 *
 * The interpolation is calculated using the formula:
 *
 * ```
 * result = min * (1 - t) + max * t;
 * ```
 *
 * @param min - The starting value of the interpolation.
 * @param max - The ending value of the interpolation.
 * @param t - A ratio between 0 and 1 that determines the weight of `max`.
 *   A value of 0 returns `min`, a value of 1 returns `max`, and values in between return the interpolated result.
 *
 * @returns The interpolated value.
 *
 * @example
 * ```typescript
 * const result = lerp(0, 100, 0.5); // Returns 50
 * const result2 = lerp(10, 20, 0.25); // Returns 12.5
 * ```
 */
export function lerp(min: number, max: number, t: number) {
  return min * (1 - t) + max * t;
}
