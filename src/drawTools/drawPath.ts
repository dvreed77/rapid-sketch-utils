import { T_Path } from '../types';

type T_DRAW_OPTIONS = {
  drawPts: boolean;
  lineWidth: number;
  strokeColor: string | CanvasGradient;
  fillColor: string | CanvasGradient | null;
  closePath: boolean;
};

export function drawPathNew(
  context: CanvasRenderingContext2D,
  path: T_Path,
  {
    drawPts = false,
    lineWidth = 1,
    strokeColor = 'red',
    fillColor = 'red',
    closePath = false,
  }: Partial<T_DRAW_OPTIONS> = {},
) {
  context.beginPath();
  const [x, y] = path[0];
  context.moveTo(x, y);

  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    context.lineTo(x, y);
  }
  if (closePath) {
    context.closePath();
  }

  if (strokeColor) {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeColor;
    context.stroke();
  }

  if (fillColor) {
    context.fillStyle = fillColor;
    context.fill();
  }

  if (drawPts) {
    context.beginPath();
    const [x, y] = path[0];
    context.moveTo(x, y);
    context.arc(path[0][0], path[0][1], 5 * lineWidth, 0, 2 * Math.PI);
    context.fillStyle = 'green';
    context.fill();

    context.beginPath();
    for (let i = 1; i < path.length; i++) {
      const [x, y] = path[i];
      context.moveTo(x, y);
      context.arc(x, y, 2 * lineWidth, 0, 2 * Math.PI);
    }
    context.fillStyle = 'black';
    context.fill();
  }
}

export function drawPath(
  context: CanvasRenderingContext2D,
  path: T_Path,
  {
    drawPts = false,
    lineWidth = 1,
    strokeColor = 'red',
    fillColor = 'red',
    closePath = false,
  }: Partial<T_DRAW_OPTIONS> = {},
) {
  context.beginPath();
  const [x, y] = path[0];
  context.moveTo(x, y);

  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    context.lineTo(x, y);
  }
  if (closePath) {
    context.closePath();
  }

  if (strokeColor) {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeColor;
    context.stroke();
  }

  if (fillColor) {
    context.fillStyle = fillColor;
    context.fill();
  }

  if (drawPts) {
    context.beginPath();
    const [x, y] = path[0];
    context.moveTo(x, y);
    context.arc(path[0][0], path[0][1], 5 * lineWidth, 0, 2 * Math.PI);
    context.fillStyle = 'green';
    context.fill();

    context.beginPath();
    for (let i = 1; i < path.length; i++) {
      const [x, y] = path[i];
      context.moveTo(x, y);
      context.arc(x, y, 2 * lineWidth, 0, 2 * Math.PI);
    }
    context.fillStyle = 'black';
    context.fill();
  }
}
