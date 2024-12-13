// export function randomF(f: (x: number) => number, nPts = 1000) {
//   const dx = 1 / (nPts - 1);

//   const pdfData: [number, number][] = Array.from({
//     length: nPts,
//   }).map((_, idx) => [idx * dx, f(idx * dx)]);

//   const cdfData: [number, number][] = pdfData
//     .slice(1)
//     .reduce((a, b) => [...a, [b[0], a[a.length - 1][1] + dx * b[1]]], [[0, 0]]);

//   this.pdfData = pdfData;
//   this.cdfData = cdfData;

//   const maxD = Math.max(...cdfData.map((d) => d[1]));

//   return function () {
//     const x = Math.random() * maxD;
//     const idx = cdfData.findIndex((d) => d[1] > x);

//     return cdfData[idx][0];
//   };
// }

export class RandomF {
  f: (x: number) => number;
  nPts: number;
  dx: number;
  pdfData: number[][];
  cdfData: number[][];
  maxD: number;

  constructor(f: (x: number) => number, nPts = 1000) {
    this.f = f;
    this.nPts = nPts;
    this.dx = 1 / (nPts - 1);

    this.pdfData = Array.from({
      length: nPts,
    }).map((_, idx) => [idx * this.dx, f(idx * this.dx)]);

    this.cdfData = this.pdfData
      .slice(1)
      .reduce(
        (a, b) => [...a, [b[0], a[a.length - 1][1] + this.dx * b[1]]],
        [[0, 0]]
      );

    this.maxD = Math.max(...this.cdfData.map((d) => d[1]));
  }

  sample() {
    const x = Math.random() * this.maxD;
    const idx = this.cdfData.findIndex((d) => d[1] > x);

    return this.cdfData[idx][0];
  }
}
// function binarySearch(arr: any, val: any): any {
//   const mid = Math.floor(arr.length / 2);

//   if (arr[mid][1] === val) {
//     return arr[mid];
//   } else if (arr[mid][1] < val && arr.length > 1) {
//     return binarySearch(arr.slice(mid), val);
//   } else if (arr[mid][1] > val && arr.length > 1) {
//     return binarySearch(arr.slice(0, mid), val);
//   } else {
//     return arr[mid];
//   }
// }

// export class random2 {
//   pdfData: [number, number][];
//   cdfData: [number, number][];
//   maxD: number;
//   constructor(f: (x: number) => number, nPts = 1000) {
//     const dx = 1 / (nPts - 1);

//     const pdfData: [number, number][] = Array.from({
//       length: nPts,
//     }).map((_, idx) => [idx * dx, f(idx * dx)]);

//     const cdfData: [number, number][] = pdfData
//       .slice(1)
//       .reduce(
//         (a, b) => [...a, [b[0], a[a.length - 1][1] + dx * b[1]]],
//         [[0, 0]]
//       );

//     this.pdfData = pdfData;
//     this.cdfData = cdfData;
//     this.maxD = Math.max(...cdfData.map((d) => d[1]));
//   }

//   sample() {
//     const x = Math.random() * this.maxD;
//     const s = binarySearch(this.cdfData, x);

//     return s[0];
//   }
// }
