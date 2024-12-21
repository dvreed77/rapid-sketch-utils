/**
 * Options for drawing the circle.
 */
export interface DrawOptions {
  /**
   * The fill color of the circle. Default is `transparent` (no fill).
   */
  fillColor?: string;

  /**
   * The stroke color of the circle. Default is `red`.
   */
  strokeColor?: string;

  /**
   * The width of the stroke. Default is `1`.
   */
  lineWidth?: number;

  /**
   * Whether to use a dashed stroke. Default is `false` (solid stroke).
   */
  dashed?: boolean;

  /**
   * The pattern for dashed lines, defined as an array of numbers where
   * the even indices represent lengths of dashes and odd indices represent
   * lengths of gaps. Default is `[5, 5]`.
   */
  dashPattern?: number[];
}
