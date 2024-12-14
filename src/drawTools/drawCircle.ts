interface I_Circle {
  x: number;
  y: number;
  r: number;
}

export function drawCircle(
  context: CanvasRenderingContext2D,
  circle: I_Circle,
  { lineWidth = 1, strokeColor = "red" } = {}
) {
  context.beginPath();
  context.moveTo(circle.x + circle.r, circle.y);
  context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeColor;
  context.stroke();
}
