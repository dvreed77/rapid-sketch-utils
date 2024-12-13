/**
 * Constrains a given number `n` between a specified minimum (`low`) and maximum (`high`) value.
 *
 * If `n` is less than `low`, the function returns `low`. If `n` is greater than `high`,
 * the function returns `high`. Otherwise, it returns `n` unchanged.
 *
 * @param n - The number to constrain.
 * @param low - The minimum allowable value.
 * @param high - The maximum allowable value.
 *
 * @returns The constrained value of `n`, which will be in the range `[low, high]`.
 *
 * @example
 * ```typescript
 * const constrained1 = constrain(5, 1, 10);  // Returns 5 (within range)
 * const constrained2 = constrain(-5, 1, 10); // Returns 1 (below range)
 * const constrained3 = constrain(15, 1, 10); // Returns 10 (above range)
 * ```
 */
export function constrain(n: number, low: number, high: number) {
  return Math.max(Math.min(n, high), low);
}
