/**
 * Determines whether a random event occurs based on a given threshold.
 *
 * Generates a random number between 0 (inclusive) and 1 (exclusive) and
 * checks if it is greater than the provided threshold.
 *
 * @param threshold - A number between 0 and 1 representing the probability
 *   threshold. A higher threshold decreases the chance of the event occurring.
 *
 * @returns `true` if the random number is greater than the threshold, otherwise `false`.
 *
 * @example
 * ```typescript
 * // 50% chance of returning true
 * const result = randomChance(0.5);
 *
 * // 90% chance of returning false
 * const unlikely = randomChance(0.9);
 *
 * // 10% chance of returning true
 * const rareEvent = randomChance(0.1);
 * ```
 */
export function randomChance(threshold: number) {
  return Math.random() > threshold;
}
