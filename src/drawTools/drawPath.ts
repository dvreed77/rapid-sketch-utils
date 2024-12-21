import { T_Path } from '../types';
import { DrawOptions } from './types';
import { applyDrawOptions } from './utils';

/**
 * Extended options for drawing paths, including whether to close the path.
 */
interface ExtendedDrawOptions extends DrawOptions {
  /**
   * Whether to close the path by connecting the last point to the first. Default is `true`.
   */
  closePath?: boolean;
}

/**
 * Draws a path on the provided canvas context.
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
 * // Default options
 * drawPath(context, [[50, 50], [150, 100], [100, 200], [50, 150]]);
 *
 * // Draw an open path
 * const openPath: T_Path = [
 *   [50, 50],
 *   [150, 100],
 *   [100, 200],
 *   [50, 150],
 * ];
 *
 * drawPath(context, openPath, {
 *   strokeColor: 'blue',
 *   lineWidth: 2,
 *   closePath: false,
 * });
 *
 * // Draw a closed polygon
 * const closedPath: T_Path = [
 *   [200, 200],
 *   [300, 200],
 *   [250, 300],
 * ];
 *
 * drawPath(context, closedPath, {
 *   strokeColor: 'red',
 *   fillColor: 'rgba(255, 0, 0, 0.3)',
 *   lineWidth: 3,
 *   closePath: true,
 * });
 * ```
 *
 * ![Paths](./paths.png)
 *
 * @param context The canvas rendering context.
 * @param path The array of points defining the path, where each point is a tuple `[x, y]`.
 * @param drawOptions Options for customizing the appearance of the path.
 */
export function drawPath(
  context: CanvasRenderingContext2D,
  path: T_Path,
  drawOptions: Partial<ExtendedDrawOptions> = {},
): void {
  // Merge drawOptions with defaults
  const options: Partial<ExtendedDrawOptions> = {
    closePath: true, // Default closePath to true
    ...drawOptions,
  };

  context.beginPath();
  const [x, y] = path[0];
  context.moveTo(x, y);

  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    context.lineTo(x, y);
  }

  // Close the path if the `closePath` option is true
  if (options.closePath) {
    context.closePath();
  }

  applyDrawOptions(context, options);
}
