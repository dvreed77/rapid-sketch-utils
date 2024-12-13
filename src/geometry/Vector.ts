import { T_Line, T_Point } from '../types';

/**
 * Represents a 2D vector and provides various operations for vector arithmetic and transformations.
 *
 * This class is useful for geometric computations, transformations, and rendering in 2D space.
 */
export class Vector {
  /**
   * The x-coordinate of the vector.
   */
  x: number;

  /**
   * The y-coordinate of the vector.
   */
  y: number;

  /**
   * Creates a new `Vector` instance.
   *
   * @param point - The initial coordinates of the vector as `[x, y]`. Defaults to `[0, 0]`.
   */
  constructor([x, y]: T_Point = [0, 0]) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Adds multiple vectors together.
   *
   * @param vectors - An array of vectors to add.
   * @returns A new vector representing the sum of all input vectors.
   */
  static add(vectors: Vector[]): Vector {
    const reducer = (previousValue: Vector, currentValue: Vector) =>
      previousValue.add(currentValue);
    return vectors.reduce(reducer, new Vector());
  }

  /**
   * Computes the average of multiple vectors.
   *
   * @param vectors - An array of vectors to average.
   * @returns A new vector representing the average of all input vectors.
   */
  static average(vectors: Vector[]): Vector {
    return Vector.add(vectors).divide(vectors.length);
  }

  /**
   * Creates a vector from a line segment.
   *
   * @param line - A line segment represented as two points `[start, end]`.
   * @returns A vector from the start to the end of the line segment.
   */
  static fromLine(line: T_Line): Vector {
    const dx = line[1][0] - line[0][0];
    const dy = line[1][1] - line[0][1];
    return new Vector([dx, dy]);
  }

  /**
   * Converts the vector into a point.
   *
   * @returns The vector as a point `[x, y]`.
   */
  toPoint(): T_Point {
    return [this.x, this.y];
  }

  /**
   * Creates a copy of the vector.
   *
   * @returns A new `Vector` instance with the same coordinates.
   */
  copy(): Vector {
    return new Vector([this.x, this.y]);
  }

  /**
   * Adds another vector to this vector.
   *
   * @param v - The vector to add.
   * @returns The updated vector.
   */
  add(v: Vector): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * Subtracts another vector from this vector.
   *
   * @param v - The vector to subtract.
   * @returns The updated vector.
   */
  subtract(v: Vector): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Multiplies the vector by a scalar.
   *
   * @param m - The scalar to multiply by.
   * @returns The updated vector.
   */
  multiply(m: number): this {
    this.x *= m;
    this.y *= m;
    return this;
  }

  /**
   * Divides the vector by a scalar.
   *
   * @param d - The scalar to divide by.
   * @returns The updated vector.
   */
  divide(d: number): this {
    this.x /= d;
    this.y /= d;
    return this;
  }

  /**
   * Sets the vector's coordinates.
   *
   * @param point - The new coordinates `[x, y]`.
   */
  set([x, y]: T_Point): void {
    this.x = x;
    this.y = y;
  }

  /**
   * The magnitude (length) of the vector.
   */
  get magnitude(): number {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * The angle of the vector in radians.
   */
  get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Sets the vector's magnitude while preserving its direction.
   *
   * @param mag - The new magnitude.
   * @returns The updated vector.
   */
  setMagnitude(mag: number): this {
    return this.normalize().multiply(mag);
  }

  /**
   * Reverses the vector's direction.
   *
   * @returns The updated vector.
   */
  reverse(): this {
    return this.setAngle(this.angle + Math.PI);
  }

  /**
   * Sets the vector's angle while preserving its magnitude.
   *
   * @param angle - The new angle in radians.
   * @returns The updated vector.
   */
  setAngle(angle: number): this {
    const m = this.magnitude;
    this.x = m * Math.cos(angle);
    this.y = m * Math.sin(angle);
    return this;
  }

  /**
   * Normalizes the vector to a unit vector.
   *
   * @returns The updated vector.
   */
  normalize(): this {
    this.divide(this.magnitude);
    return this;
  }

  /**
   * Draws the vector on a canvas.
   *
   * @param context - The 2D rendering context of the canvas.
   * @param origin - The origin point from which the vector starts, defaulting to `[0, 0]`.
   * @param options - Additional options, such as stroke color.
   */
  draw(
    context: CanvasRenderingContext2D,
    origin: Vector | T_Point = [0, 0],
    options?: { color?: string },
  ): void {
    if (origin instanceof Vector) {
      origin = [origin.x, origin.y];
    }

    const startPt = origin;

    const endPt: T_Point = [origin[0] + this.x, origin[1] + this.y];

    context.beginPath();
    context.moveTo(startPt[0], startPt[1]);
    context.lineTo(endPt[0], endPt[1]);

    const strokeColor = options?.color || '#aaa';
    const fillColor = options?.color || 'green';
    context.strokeStyle = strokeColor;
    context.lineWidth = 1;
    context.stroke();

    const angle = this.angle;
    const headLen = 8;

    context.beginPath();
    context.moveTo(endPt[0], endPt[1]);
    context.lineTo(
      endPt[0] - headLen * Math.cos(angle - Math.PI / 6),
      endPt[1] - headLen * Math.sin(angle - Math.PI / 6),
    );
    context.lineTo(
      endPt[0] - headLen * Math.cos(angle + Math.PI / 6),
      endPt[1] - headLen * Math.sin(angle + Math.PI / 6),
    );
    context.fillStyle = fillColor;
    context.fill();
  }
}
