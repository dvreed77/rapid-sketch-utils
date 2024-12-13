import { T_Line, T_Point, T_Path } from '../types';
import { mean, min, max } from 'd3';
import { cloneDeep } from 'lodash';
import { applyToPoint, Matrix } from 'transformation-matrix';

/**
 * Represents a 2D geometric shape with a path and optional holes.
 *
 * This class provides methods for calculating properties, transformations, and rendering the shape.
 *
 * @example
 * ```typescript
 * // Create a shape with a square path and a square hole
 * const shape = new Shape(
 *   [
 *     [0, 0],
 *     [10, 0],
 *     [10, 10],
 *     [0, 10],
 *   ],
 *   [
 *     [
 *       [3, 3],
 *       [5, 3],
 *       [5, 5],
 *       [3, 5],
 *     ],
 *   ]
 * );
 *
 * // Get the shape's center
 * const center = shape.getCenter(); // [5, 5]
 *
 * // Get the bounding rectangle
 * const boundingRect = shape.getBoundingRect(); // [[0, 0], [10, 10]]
 *
 * // Scale the shape by a factor of 2
 * shape.scale(2);
 *
 * // Draw the shape on a canvas
 * shape.draw(context);
 * ```
 */
export class Shape {
  /**
   * The main path of the shape, defined as an array of points.
   */
  path: T_Path;

  /**
   * An array of holes, where each hole is represented as a path.
   */
  holes: T_Path[];

  /**
   * Constructs a new `Shape` instance.
   *
   * @param path - The main path of the shape, represented as an array of points.
   * @param holes - Optional holes, each represented as a path. Defaults to an empty array.
   * @throws Will throw an error if any hole has fewer than 3 points.
   */
  constructor(path: T_Path, holes: T_Path[] = []) {
    this.path = path;

    // Validate and ensure all holes are oriented counter-clockwise
    this.holes = holes.map((h) => {
      if (h.length < 3) {
        throw new Error('Each hole must have at least 3 points.');
      }

      const xA = h[0][0];
      const xB = h[1][0];
      const xC = h[2][0];

      const yA = h[0][1];
      const yB = h[1][1];
      const yC = h[2][1];

      const d = (xB - xA) * (yC - yA) - (xC - xA) * (yB - yA);

      // Reverse hole orientation if clockwise
      return d > 0 ? h : h.reverse();
    });
  }

  /**
   * Calculates the centroid of the shape's main path.
   *
   * @returns The center of the shape as `[x, y]`.
   */
  getCenter(): T_Point {
    const mx = mean(this.path.map((d) => d[0]))!;
    const my = mean(this.path.map((d) => d[1]))!;
    return [mx, my];
  }

  /**
   * Calculates the axis-aligned bounding rectangle of the shape.
   *
   * @returns A tuple of two points: the top-left `[minX, minY]` and bottom-right `[maxX, maxY]`.
   */
  getBoundingRect(): [T_Point, T_Point] {
    const minX = min(this.path.map((d) => d[0]))!;
    const maxX = max(this.path.map((d) => d[0]))!;
    const minY = min(this.path.map((d) => d[1]))!;
    const maxY = max(this.path.map((d) => d[1]))!;
    return [
      [minX, minY],
      [maxX, maxY],
    ];
  }

  /**
   * Creates a deep copy of the shape.
   *
   * @returns A cloned `Shape` instance.
   */
  clone(): Shape {
    return new Shape(cloneDeep(this.path), cloneDeep(this.holes));
  }

  /**
   * Applies a transformation matrix to the shape's path and holes.
   *
   * @param matrix - A transformation matrix to apply.
   * @returns The transformed shape.
   */
  transform(matrix: Matrix): this {
    this.path = this.path.map((pt) => applyToPoint(matrix, pt));
    this.holes = this.holes.map((pts) =>
      pts.map((pt) => applyToPoint(matrix, pt)),
    );
    return this;
  }

  /**
   * Gets the number of faces (edges) in the shape's main path.
   */
  get nFaces(): number {
    return this.path.length;
  }

  /**
   * Retrieves a specific face (edge) of the shape by index.
   *
   * @param faceIdx - The index of the face.
   * @returns The face as a line `[start, end]`.
   */
  getFace(faceIdx: number): T_Line {
    return faceIdx < this.nFaces - 1
      ? [this.path[faceIdx], this.path[faceIdx + 1]]
      : [this.path[faceIdx], this.path[0]];
  }

  /**
   * Scales the shape by a given factor.
   *
   * @param s - The scale factor.
   */
  scale(s: number): void {
    this.path = this.path.map(([x, y]) => [x * s, y * s]);
    this.holes = this.holes.map((hole) => hole.map(([x, y]) => [x * s, y * s]));
  }

  /**
   * Draws the shape on a canvas context, including its holes.
   *
   * @param context - The 2D rendering context of a canvas.
   */
  draw(context: CanvasRenderingContext2D): void {
    const { path, holes } = this;

    // Draw the main path
    context.beginPath();
    context.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) {
      context.lineTo(path[i][0], path[i][1]);
    }
    context.closePath();

    // Draw the holes
    holes.forEach((hole) => {
      context.moveTo(hole[0][0], hole[0][1]);
      for (let i = 1; i < hole.length; i++) {
        context.lineTo(hole[i][0], hole[i][1]);
      }
      context.closePath();
    });
  }
}
