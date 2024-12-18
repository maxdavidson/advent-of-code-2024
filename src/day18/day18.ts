import { lines } from "../utils.ts";

function* neighbors(pos: number, size: number): Generator<number> {
  const x = pos % size;
  const y = (pos - x) / size;

  if (0 <= x - 1) {
    yield size * y + (x - 1);
  }

  if (0 <= y - 1) {
    yield size * (y - 1) + x;
  }

  if (x + 1 < size) {
    yield size * y + (x + 1);
  }

  if (y + 1 < size) {
    yield size * (y + 1) + x;
  }
}

export function part1(input: string, size: number, count: number): number {
  const map = new Uint8Array(size ** 2);

  for (const line of lines(input).take(count)) {
    const [x, y] = line.split(",").map(Number);
    map[size * y! + x!] = 1;
  }

  const startPos = 0;
  const endPos = map.length - 1;

  const queue = [startPos];
  const distances = new Map<number, number>();

  distances.set(startPos, 0);

  let pos;
  while ((pos = queue.shift()) !== undefined) {
    const distance = distances.get(pos)!;

    if (pos === endPos) {
      return distance;
    }

    const nextDistance = distance + 1;

    for (const neighborPos of neighbors(pos, size)) {
      if (map[neighborPos] === 0) {
        const prevBestDistance = distances.get(neighborPos);
        if (prevBestDistance === undefined || nextDistance < prevBestDistance) {
          distances.set(neighborPos, nextDistance);
          queue.push(neighborPos);
        }
      }
    }
  }

  throw new Error("No solution found!");
}

export function part2(input: string, size: number): [number, number] {
  const map = new Uint8Array(size ** 2);
  const dists = new Uint16Array(size ** 2);
  const poss = new Uint16Array(size ** 2);

  const startPos = 0;
  const endPos = map.length - 1;

  const bytes = lines(input).map((line): [number, number] =>
    // @ts-expect-error
    line.split(",").map(Number),
  );

  nextByte: for (const [byteX, byteY] of bytes) {
    const bytePos = size * byteY + byteX;
    map[bytePos] = 0xff;

    let posIndex = 0;
    poss[posIndex] = startPos;

    dists.fill(0);
    dists[startPos] = 0;

    while (0 <= posIndex) {
      const pos = poss[posIndex--]!;

      if (pos === endPos) {
        continue nextByte;
      }

      const distance = dists[pos]!;
      const nextDistance = distance + 1;

      const x = pos % size;
      const y = (pos - x) / size;

      if (0 <= x - 1) {
        const nextPos = size * y + (x - 1);
        if (map[nextPos] === 0) {
          const prevNextDist = dists[nextPos]!;
          if (dists[nextPos]! === 0 || nextDistance < prevNextDist) {
            dists[nextPos] = nextDistance;
            poss[++posIndex] = nextPos;
          }
        }
      }

      if (0 <= y - 1) {
        const nextPos = size * (y - 1) + x;
        if (map[nextPos] === 0) {
          const prevNextDist = dists[nextPos]!;
          if (prevNextDist === 0 || nextDistance < prevNextDist) {
            dists[nextPos] = nextDistance;
            poss[++posIndex] = nextPos;
          }
        }
      }

      if (x + 1 < size) {
        const nextPos = size * y + (x + 1);
        if (map[nextPos] === 0) {
          const prevNextDist = dists[nextPos]!;
          if (dists[nextPos]! === 0 || nextDistance < prevNextDist) {
            dists[nextPos] = nextDistance;
            poss[++posIndex] = nextPos;
          }
        }
      }

      if (y + 1 < size) {
        const nextPos = size * (y + 1) + x;
        if (map[nextPos] === 0) {
          const prevNextDist = dists[nextPos]!;
          if (dists[nextPos]! === 0 || nextDistance < prevNextDist) {
            dists[nextPos] = nextDistance;
            poss[++posIndex] = nextPos;
          }
        }
      }
    }

    return [byteX!, byteY];
  }

  throw new Error("No solution found!");
}
