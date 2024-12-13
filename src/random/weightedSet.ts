/**
 * Represents an item with an associated weight for selection in a weighted random set.
 */
interface WeightedItem {
  /** The value of the item. */
  value: number;
  /** The weight associated with the item. Must be non-negative. */
  weight: number;
}

/**
 * Selects a random value from a weighted set of items.
 *
 * @param set - An array of items with associated weights.
 *
 * @returns The selected item's value.
 *
 * @throws If the input array is empty or if weights sum to 0.
 *
 * @example
 * ```typescript
 * const items: WeightedItem[] = [
 *   { value: 1, weight: 5 },
 *   { value: 2, weight: 3 },
 *   { value: 3, weight: 2 },
 * ];
 * const result = weightedPick(items); // Randomly picks based on weights
 * ```
 */
export function weightedPick(set: WeightedItem[]): number {
  if (set.length === 0) {
    throw new Error('The weighted set must not be empty.');
  }
  return set[weightedPickIndex(set)].value;
}

/**
 * Selects the index of a random item from a weighted set.
 *
 * @param set - An array of items with associated weights.
 *
 * @returns The index of the selected item.
 *
 * @throws If the input array is empty or if weights sum to 0.
 */
function weightedPickIndex(set: WeightedItem[]): number {
  if (set.length === 0) {
    throw new Error('The weighted set must not be empty.');
  }
  const weights = set.map((item) => item.weight);
  return pickWeightedIndex(weights);
}

/**
 * Selects a random index based on an array of weights.
 *
 * @param weights - An array of weights. Each weight must be non-negative.
 *
 * @returns The index of the selected weight.
 *
 * @throws If the weights array is empty or if the sum of weights is 0.
 *
 * @example
 * ```typescript
 * const weights = [5, 3, 2];
 * const index = pickWeightedIndex(weights); // Randomly picks 0, 1, or 2 based on weights
 * ```
 */
function pickWeightedIndex(weights: number[]): number {
  const totalWeight = weights.reduce((agg, c) => c + agg, 0);
  if (totalWeight <= 0) {
    throw new Error('Weights must sum to a value greater than 0.');
  }

  let random = Math.random() * totalWeight;
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      return i;
    }
    random -= weights[i];
  }
  return 0; // Fallback, though it should rarely be reached
}
