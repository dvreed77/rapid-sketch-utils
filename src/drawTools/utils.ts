import { DrawOptions } from './types';

const DEFAULT_DRAW_OPTIONS: DrawOptions = {
  fillColor: 'transparent',
  strokeColor: 'red',
  lineWidth: 1,
  dashed: false,
  dashPattern: [5, 5],
};

export function applyDrawOptions(
  context: CanvasRenderingContext2D,
  partialOptions: Partial<DrawOptions> = {},
): DrawOptions {
  const { fillColor, strokeColor, lineWidth, dashed, dashPattern } = {
    ...DEFAULT_DRAW_OPTIONS,
    ...partialOptions,
  };

  // Fill circle if `fillColor` is provided and not 'transparent'
  if (fillColor && fillColor !== 'transparent') {
    context.fillStyle = fillColor;
    context.fill();
  }

  // Stroke circle if `strokeColor` is provided
  if (strokeColor) {
    context.lineWidth = lineWidth!;
    context.strokeStyle = strokeColor;

    if (dashed) {
      context.setLineDash(dashPattern!); // Set dashed line pattern
    } else {
      context.setLineDash([]); // Reset to solid line
    }

    context.stroke();
  }

  return { fillColor, strokeColor, lineWidth, dashed, dashPattern };
}
