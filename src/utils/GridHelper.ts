import { T_Point } from '../types';

interface I_Props {
  density: number;
  width: number;
  height: number;
}

export class GridHelper {
  nCols: number;
  nRows: number;
  cellSize: number;
  grid: T_Point[] = [];
  constructor({ density, width, height }: I_Props) {
    this.cellSize = Math.min(width, height) / (density - 1); // Cell size based on density and smallest dimension
    this.nCols = Math.ceil(width / this.cellSize); // Number of columns based on width
    this.nRows = Math.ceil(height / this.cellSize); // Number of rows based on height

    for (let i = 0; i < this.nRows + 1; i++) {
      for (let j = 0; j < this.nCols + 1; j++) {
        const pt: T_Point = [
          j * this.cellSize, // x-coordinate
          i * this.cellSize, // y-coordinate
        ];
        this.grid.push(pt);
      }
    }
  }

  draw(context: CanvasRenderingContext2D, r = 5) {
    context.beginPath();
    this.grid.forEach((pt) => {
      const [x, y] = pt;

      context.moveTo(x, y);
      context.arc(x, y, r, 0, 2 * Math.PI);
    });
    context.fillStyle = 'gray';
    context.fill();
  }
}
