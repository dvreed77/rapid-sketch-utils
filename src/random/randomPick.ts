import { randomInt } from './randomInt';

/**
 * Selects a random element from an array.
 *
 * This function uses `randomInt` to generate a random index within the bounds of the array
 * and returns the element at that index.
 *
 * @typeParam T - The type of elements in the array.
 *
 * @param array - The array to pick a random element from. Must not be empty.
 *
 * @returns A randomly selected element from the array.
 *
 * @throws Will throw an error if the array is empty.
 *
 * @example
 * ```typescript
 * // Pick a random number from an array
 * const numbers = [1, 2, 3, 4, 5];
 * const randomNumber = randomPick(numbers);
 * console.log(randomNumber); // e.g., 3
 *
 * // Pick a random string from an array
 * const colors = ["red", "green", "blue"];
 * const randomColor = randomPick(colors);
 * console.log(randomColor); // e.g., "green"
 * ```
 */
export function randomPick<T>(array: T[]) {
  return array[randomInt(0, array.length - 1)];
}
