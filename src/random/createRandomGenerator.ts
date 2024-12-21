/**
 * Creates a random number generator based on a given probability density function (PDF).
 *
 * This function discretizes the provided PDF to compute the corresponding cumulative distribution
 * function (CDF), and returns a function that generates random numbers following the given PDF.
 *
 * ### Example
 * ```ts
 * // Define a probability density function
 * const pdf = (x: number) => Math.exp(-x * x * 4); // Gaussian-like function
 *
 * // Create a random number generator
 * const randomGenerator = createRandomGenerator(pdf);
 *
 * // Generate random samples
 * console.log(randomGenerator());
 * ```
 *
 * * ![randomFunctions](./randomFunctions.png)
 *
 * @param f The probability density function (PDF). Must be non-negative and normalized over the range [0, 1].
 * @returns A function that generates random numbers in the range [0, 1] based on the provided PDF.
 */
export function createRandomGenerator(f: (x: number) => number) {
  const nPts = 1000;
  const dx = 1 / (nPts - 1);

  // Calculate PDF data
  const pdfData = Array.from({ length: nPts }, (_, idx) => [
    idx * dx,
    f(idx * dx),
  ]);

  // Calculate CDF data
  const cdfData = pdfData.slice(1).reduce(
    (a, b) => [...a, [b[0], a[a.length - 1][1] + dx * b[1]]],
    [[0, 0]], // Initialize CDF starting point
  );

  // Max value of the CDF
  const maxD = Math.max(...cdfData.map((d) => d[1]));

  // Return a random number generator function
  return function sample() {
    const x = Math.random() * maxD;
    const idx = cdfData.findIndex((d) => d[1] > x);
    return cdfData[idx][0];
  };
}
