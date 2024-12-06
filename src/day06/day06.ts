import { lines } from "../utils.ts";

export function part1(input: string): number {
  const map = lines(input).toArray();

  let xStart;
  let yStart;

  outer: for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y]!.length; x += 1) {
      if (map[y]![x]! === "^") {
        xStart = x;
        yStart = y;
        break outer;
      }
    }
  }

  if (xStart === undefined || yStart === undefined) {
    throw new TypeError("Could not find starting point!");
  }

  const visited = new Set<number>();

  let x = xStart;
  let y = yStart;

  let dx = 0;
  let dy = -1;

  for (;;) {
    visited.add(map.length * y + x);

    const next = map[y + dy]?.[x + dx];

    if (next === undefined) {
      break;
    }

    if (next === "#") {
      // Turn right
      [dx, dy] = [-dy, dx];
    }

    x += dx;
    y += dy;
  }

  return visited.size;
}

export function part2(input: string): number {
  const map = lines(input)
    .map((line) => Array.from(line))
    .toArray();

  let xStart: number | undefined;
  let yStart: number | undefined;

  outer: for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y]!.length; x += 1) {
      if (map[y]![x]! === "^") {
        xStart = x;
        yStart = y;
        break outer;
      }
    }
  }

  if (xStart === undefined || yStart === undefined) {
    throw new TypeError("Could not find starting point!");
  }

  const candidates = new Set<number>();

  {
    const visited = new Set<number>();

    let x = xStart;
    let y = yStart;
    let dx = 0;
    let dy = -1;

    for (;;) {
      visited.add(map.length * y + x);

      const next = map[y + dy]?.[x + dx];
      if (next === undefined) {
        break;
      } else if (next === "#") {
        // Turn right
        [dx, dy] = [-dy, dx];
      }

      x += dx;
      y += dy;
    }

    for (const num of visited) {
      const x = num % map.length;
      const y = (num - x) / map.length;

      for (let dx = -1; dx <= 1; dx += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
          const nextY = y + dy;
          if (0 < nextY && nextY < map.length) {
            const nextX = x + dx;
            if (0 < nextX && nextX < map[nextY]!.length) {
              candidates.add(map.length * nextY + nextX);
            }
          }
        }
      }
    }
  }

  const dxStart = 0;
  const dyStart = -1;

  const visited = new Int8Array(map.length ** 2);

  let sum = 0;

  for (const candidate of candidates) {
    const xObstruct = candidate % map.length;
    const yObstruct = (candidate - xObstruct) / map.length;

    visited.fill(0);

    let x = xStart;
    let y = yStart;
    let dx = dxStart;
    let dy = dyStart;

    loop: for (;;) {
      const pos = map.length * y + x;
      const dir = 4 * dy + dx;

      if (visited[pos] === dir) {
        sum += 1;
        break loop;
      }

      visited[pos] = dir;

      for (;;) {
        if (y + dy === yObstruct && x + dx === xObstruct) {
          // Turn right
          let prevDx = dx;
          dx = -dy;
          dy = prevDx;
        } else {
          const next = map[y + dy]?.[x + dx];
          if (next === undefined) {
            break loop;
          } else if (next === "#") {
            // Turn right
            let prevDx = dx;
            dx = -dy;
            dy = prevDx;
          } else {
            break;
          }
        }
      }

      x += dx;
      y += dy;
    }
  }

  return sum;
}
