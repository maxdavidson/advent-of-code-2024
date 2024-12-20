import { lines } from "../utils.ts";

const DIRECTIONS = [
  // right
  [1, 0],
  // down
  [0, 1],
  // left
  [-1, 0],
  // up
  [0, -1],
] as const;

export function solve(input: string, maxCheatDist: number): number {
  const tiles = lines(input).flatMap(Iterator.from).toArray();

  const size = Math.sqrt(tiles.length);

  if (!Number.isInteger(size)) {
    throw new Error("Not a square!");
  }

  const startPos = tiles.indexOf("S");
  const endPos = tiles.indexOf("E");

  if (startPos === -1 || endPos === -1) {
    throw new Error("No start or end pos found!");
  }

  const bestPath = [];
  const bestDists = new Uint32Array(size ** 2).fill(-1);

  {
    const parents = new Map<number, number>();
    const queue = [endPos];

    bestDists[endPos] = 0;

    let pos;
    while ((pos = queue.shift()) !== undefined) {
      const dist = bestDists[pos]!;

      const x = pos % size;
      const y = (pos - x) / size;

      for (const [dx, dy] of DIRECTIONS) {
        const nextX = x + dx;
        const nextY = y + dy;

        if (0 <= nextX && nextX < size && 0 <= nextY && nextY < size) {
          const nextPos = size * nextY + nextX;
          if (tiles[nextPos] !== "#") {
            const nextDist = dist + 1;
            const bestDist = bestDists[nextPos]!;
            if (nextDist < bestDist) {
              bestDists[nextPos] = nextDist;
              parents.set(nextPos, pos);
              queue.push(nextPos);
            }
          }
        }
      }
    }

    let nextPos: number | undefined = startPos;
    do {
      bestPath.push(nextPos);
    } while ((nextPos = parents.get(nextPos)) !== undefined);
  }

  const startDist = bestDists[startPos]!;

  let counts = 0;

  for (const pos of bestPath) {
    const x = pos % size;
    const y = (pos - x) / size;

    const dist = startDist - bestDists[pos]!;

    for (let dx = -maxCheatDist; dx <= maxCheatDist; dx += 1) {
      for (let dy = -maxCheatDist; dy <= maxCheatDist; dy += 1) {
        const cheatDist = Math.abs(dx) + Math.abs(dy);

        if (cheatDist <= maxCheatDist) {
          const nextX = x + dx;
          const nextY = y + dy;

          if (0 <= nextX && nextX < size && 0 <= nextY && nextY < size) {
            const nextPos = size * nextY + nextX;
            const remainingDist = bestDists[nextPos];

            if (remainingDist !== undefined) {
              const diff = startDist - (dist + cheatDist + remainingDist);

              if (100 <= diff) {
                counts += 1;
              }
            }
          }
        }
      }
    }
  }

  return counts;
}

export function part1(input: string): number {
  return solve(input, 2);
}

export function part2(input: string): number {
  return solve(input, 20);
}
