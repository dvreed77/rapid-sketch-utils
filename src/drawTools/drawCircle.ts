import { DrawOptions } from './types';
import { applyDrawOptions } from './utils';

/**
 * Represents a circle's dimensions.
 */
interface I_Circle {
  /**
   * The x-coordinate of the circle's center.
   */
  x: number;

  /**
   * The y-coordinate of the circle's center.
   */
  y: number;

  /**
   * The radius of the circle.
   */
  r: number;
}

/**
 * Draws a circle on the provided canvas context.
 *
 * Supports two different signatures:
 * 1. `(context, x, y, r, drawOptions)`
 * 2. `(context, { x, y, r }, drawOptions)`
 *
 * ### Example
 * ```ts
 * const canvas = document.createElement('canvas');
 * canvas.width = 500;
 * canvas.height = 500;
 * document.body.appendChild(canvas);
 *
 * const context = canvas.getContext('2d')!;
 *
 * // Using individual arguments
 * drawCircle(context, 100, 100, 50, {
 *   fillColor: 'blue',
 *   strokeColor: 'black',
 *   lineWidth: 2,
 * });
 *
 * // Using an object for the circle
 * drawCircle(context, { x: 200, y: 200, r: 75 }, {
 *   strokeColor: 'green',
 *   dashed: true,
 *   dashPattern: [10, 5],
 *   fill: false,
 * });
 * ```
 *
 * ![Circles](./circles.png)
 *
 * @param context The canvas rendering context.
 * @param x The x-coordinate of the circle's center.
 * @param y The y-coordinate of the circle's center.
 * @param r The radius of the circle.
 * @param drawOptions Options for customizing the appearance of the circle.
 */
export function drawCircle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  drawOptions?: DrawOptions,
): void;

/**
 * Draws a circle on the provided canvas context using an object for the circle's dimensions.
 *
 * @param context The canvas rendering context.
 * @param circle The circle dimensions (`x`, `y`, and `r`).
 * @param drawOptions Options for customizing the appearance of the circle.
 */
export function drawCircle(
  context: CanvasRenderingContext2D,
  circle: I_Circle,
  drawOptions?: DrawOptions,
): void;

/**
 * Implementation of the `drawCircle` function. Determines which signature is being used
 * and applies the appropriate logic.
 */
export function drawCircle(
  context: CanvasRenderingContext2D,
  arg1: number | I_Circle,
  arg2?: number | DrawOptions,
  arg3?: number,
  arg4?: DrawOptions,
): void {
  let x: number, y: number, r: number, drawOptions: DrawOptions;

  if (
    typeof arg1 === 'number' &&
    typeof arg2 === 'number' &&
    typeof arg3 === 'number'
  ) {
    // Signature: (context, x, y, r, drawOptions)
    x = arg1;
    y = arg2;
    r = arg3;
    drawOptions = arg4 || {};
  } else if (
    typeof arg1 === 'object' &&
    'x' in arg1 &&
    'y' in arg1 &&
    'r' in arg1
  ) {
    // Signature: (context, {x, y, r}, drawOptions)
    ({ x, y, r } = arg1);
    drawOptions = (arg2 as DrawOptions) || {};
  } else {
    throw new Error('Invalid arguments passed to drawCircle.');
  }

  context.save(); // Save current state for later restoration

  context.beginPath();
  context.moveTo(x + r, y);
  context.arc(x, y, r, 0, 2 * Math.PI);

  applyDrawOptions(context, drawOptions);

  context.restore(); // Restore saved state
}
