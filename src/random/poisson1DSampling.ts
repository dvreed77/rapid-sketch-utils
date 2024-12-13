interface I_Props {
  bounds: [number, number];
  n: number;
  k?: number;
}

export function* poisson1DSampling({ bounds, n, k = 30 }: I_Props) {
  const [min, max] = bounds;
  if (!(max > min)) throw new Error("max > min");
  const width = max - min;
  const radius = width / (n * 1.5);
  const cellSize = radius * Math.SQRT1_2;
  const gridWidth = Math.ceil(width / cellSize);
  const grid = new Array(gridWidth);
  const queue: number[] = [];
  let queueSize = 0;

  function far(x: number) {
    const i = (x / cellSize) | 0;
    const i0 = Math.max(i - 2, 0);
    const i1 = Math.min(i + 3, gridWidth);
    for (let i = i0; i < i1; ++i) {
      const s = grid[i];
      if (s) {
        const dx = s - x;
        if (Math.abs(dx) < radius) return false;
      }
    }
    return true;
  }

  function sample(x: number) {
    queue.push(x);
    grid[(x / cellSize) | 0] = x;

    ++queueSize;
    return x + min;
  }

  yield sample(Math.random() * width);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
  // Bostock using esoteric js again
  sampling: while (queueSize) {
    const i = (Math.random() * queueSize) | 0;
    const s = queue[i];
    for (let j = 0; j < k; ++j) {
      const r = Math.random();
      const x = s + (r < 0.5 ? -1 : +1) * (radius + Math.random() * radius);
      if (0 <= x && x < width && far(x)) {
        yield sample(x);
        continue sampling;
      }
    }
    queue[i] = queue[--queueSize];
    queue.length = queueSize;
  }
}
