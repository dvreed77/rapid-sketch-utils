/**
 * Creates a shuffled copy of the input array using the Fisher-Yates algorithm.
 *
 * This function does not modify the original array. Instead, it returns a new array
 * with the elements randomly shuffled.
 *
 * @typeParam T - The type of elements in the array.
 *
 * @param arr - The array to shuffle.
 *
 * @returns A new array containing the elements of the input array in random order.
 *
 * @example
 * ```typescript
 * // Shuffle an array of numbers
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = randomShuffle(numbers);
 * console.log(shuffledNumbers); // e.g., [3, 1, 5, 2, 4]
 *
 * // Shuffle an array of strings
 * const colors = ["red", "green", "blue"];
 * const shuffledColors = randomShuffle(colors);
 * console.log(shuffledColors); // e.g., ["blue", "red", "green"]
 *
 * // Verify the original array is unchanged
 * console.log(numbers); // [1, 2, 3, 4, 5]
 * ```
 */
export function randomShuffle<T>(arr: T[]) {
  let rand;
  let tmp;
  let len = arr.length;
  const ret = arr.slice();
  while (len) {
    rand = Math.floor(Math.random() * len--);
    tmp = ret[len];
    ret[len] = ret[rand];
    ret[rand] = tmp;
  }
  return ret;
}
