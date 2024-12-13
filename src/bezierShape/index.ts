import { applyToPoint, Matrix, identity } from 'transformation-matrix';

type BezierPoint = {
  x: number;
  y: number;
  handles?: {
    a: Vec2;
    b: Vec2;
  };
};

/**
 * Represents a 2D vector.
 */
type Vec2 = [number, number];

export type DrawConfig = {
  fillColor?: string | null;
  strokeColor?: string;
  strokeWidth?: number;
  debug?: boolean;
};

/**
 * Represents a shape composed of Bezier points and handles transformations, rendering, and drawing.
 *
 * @example
 * // Create a new shape and add points
 * const shape = new BezierShape();
 * shape.addPoint([100, 100]);
 * shape.addPoint([200, 200], {
 *   quadraticHandle: { vec: [0.5, 0.5], size: 50 },
 * });
 *
 * // Transform the shape
 * shape.transform(identity());
 *
 * // Draw the shape on a canvas
 * const canvas = document.createElement('canvas');
 * const ctx = canvas.getContext('2d')!;
 * shape.draw(ctx, { strokeColor: 'blue', strokeWidth: 2, debug: true });
 *
 * @document bezierShape.md
 */
export class BezierShape {
  points: BezierPoint[] = [];
  mat: Matrix = identity();
  addPoint(
    point: [number, number],
    handles?: { quadraticHandle: { vec: Vec2; size: number } },
  ) {
    const newPoint: BezierPoint = {
      x: point[0],
      y: point[1],
    };

    if (handles) {
      const a: Vec2 = [
        point[0] -
          handles.quadraticHandle.vec[0] * handles.quadraticHandle.size,
        point[1] -
          handles.quadraticHandle.vec[1] * handles.quadraticHandle.size,
      ];
      const b: Vec2 = [
        point[0] +
          handles.quadraticHandle.vec[0] * handles.quadraticHandle.size,
        point[1] +
          handles.quadraticHandle.vec[1] * handles.quadraticHandle.size,
      ];

      newPoint.handles = {
        a: a,
        b: b,
      };
    }

    this.points.push(newPoint);
  }

  trabsform(matrix: Matrix) {
    this.mat = matrix;
    for (let i = 0; i < this.points.length; i++) {
      const point = applyToPoint(matrix, [this.points[i].x, this.points[i].y]);
      this.points[i].x = point[0];
      this.points[i].y = point[1];

      if (this.points[i].handles) {
        if (this.points[i].handles!.a) {
          this.points[i].handles!.a = applyToPoint(
            matrix,
            this.points[i].handles!.a,
          );
        }

        this.points[i].handles!.b = applyToPoint(
          matrix,
          this.points[i].handles!.b,
        );
      }
    }
  }
  draw(ctx: CanvasRenderingContext2D, drawConfig?: DrawConfig) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      const currentPoint = this.points[i];

      let nextPoint: BezierPoint;
      if (i === this.points.length - 1) {
        nextPoint = this.points[0];
      } else {
        nextPoint = this.points[i + 1];
      }

      const cur = currentPoint.handles ? 'handles' : 'no handles';
      const nex = nextPoint.handles ? 'handles' : 'no handles';

      if (cur == 'handles' && nex == 'handles') {
        console.log('quadratic');
      } else if (cur == 'no handles' && nex == 'no handles') {
        console.log('line');
      } else if (cur == 'handles' && nex == 'no handles') {
        const control = currentPoint.handles!.b;
        const pt = [nextPoint.x, nextPoint.y];
        ctx.quadraticCurveTo(control[0], control[1], pt[0], pt[1]);
      } else if (cur == 'no handles' && nex == 'handles') {
        const control = nextPoint.handles!.a!;
        const pt = [nextPoint.x, nextPoint.y];

        ctx.quadraticCurveTo(control[0], control[1], pt[0], pt[1]);
      }
    }

    ctx.closePath();

    if (drawConfig?.strokeColor) {
      ctx.strokeStyle = drawConfig.strokeColor;
      ctx.lineWidth = drawConfig.strokeWidth ?? 1;
      ctx.stroke();
    }

    if (drawConfig?.fillColor) {
      ctx.fillStyle = drawConfig.fillColor ?? 'black';
      ctx.fill();
    }

    if (drawConfig?.debug) {
      for (let i = 0; i < this.points.length; i++) {
        const currentPoint = this.points[i];

        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
        ctx.fill();

        let nextPoint: BezierPoint;
        if (i === this.points.length - 1) {
          nextPoint = this.points[0];
        } else {
          nextPoint = this.points[i + 1];
        }

        if (currentPoint.handles) {
          ctx.beginPath();
          ctx.moveTo(currentPoint.x, currentPoint.y);
          ctx.lineTo(currentPoint.handles.a[0], currentPoint.handles.a[1]);
          ctx.stroke();
        }

        if (nextPoint.handles) {
          ctx.beginPath();
          ctx.moveTo(nextPoint.x, nextPoint.y);
          ctx.lineTo(nextPoint.handles.b[0], nextPoint.handles.b[1]);
          ctx.stroke();
        }
      }

      const origin = applyToPoint(this.mat, [0, 0]);
      //draw a circle at 0,0
      ctx.beginPath();
      ctx.arc(origin[0], origin[1], 10, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();
    }
  }
}
