/**
 * Generates an array of numbers from 0 to `n - 1`.
 *
 * @param n - The length of the array to generate.
 * @returns An array of numbers starting from 0 to `n - 1`.
 *
 * @example
 * ```typescript
 * const result = range(5); // Returns [0, 1, 2, 3, 4]
 * const empty = range(0); // Returns []
 * ```
 */
export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}
