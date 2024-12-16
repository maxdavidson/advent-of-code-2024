import { binarySearch, lines } from "../utils.ts";

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

function compareByScore(a: { score: number }, b: { score: number }): number {
  return a.score - b.score;
}

function dfs(map: readonly string[]) {
  const size = Math.sqrt(map.length);

  if (!Number.isInteger(size)) {
    throw new TypeError("Not a square!");
  }

  const startPos = map.indexOf("S");
  const endPos = map.indexOf("E");

  if (startPos === -1 || endPos === -1) {
    throw new Error("No start or end pos found!");
  }

  const startDir = 0;

  const queue = [{ pos: startPos, dir: startDir, score: 0 }];

  const scores = new Map<number, number>();
  const parents = new Map<number, number[]>();

  let next;
  while ((next = queue.shift()) !== undefined) {
    const { pos, dir, score } = next;

    const key = 4 * pos + dir;

    if (pos === endPos) {
      return { endKey: key, score, parents };
    }

    const x = pos % size;
    const y = (pos - x) / size;

    for (let ddir = -1; ddir <= 1; ddir += 1) {
      const nextDir = (4 + dir + ddir) % 4;

      const [dx, dy] = DIRECTIONS[nextDir]!;
      const nextX = x + dx;
      const nextY = y + dy;

      if (0 <= nextX && nextX < size && 0 <= nextY && nextY < size) {
        const nextPos = size * nextY + nextX;
        const tile = map[nextPos];

        if (tile !== "#") {
          const nextScore = score + 1 + Math.abs(ddir) * 1000;
          const nextKey = 4 * nextPos + nextDir;

          const prevBestScore = scores.get(nextKey);

          if (prevBestScore === undefined || nextScore <= prevBestScore) {
            scores.set(nextKey, nextScore);

            let parentKeys;
            if (
              nextScore !== prevBestScore ||
              (parentKeys = parents.get(nextKey)) === undefined
            ) {
              parents.set(nextKey, [key]);
            } else if (!parentKeys.includes(key)) {
              parentKeys.push(key);
            }

            const item = { pos: nextPos, dir: nextDir, score: nextScore };
            queue.splice(binarySearch(queue, item, compareByScore), 0, item);
          }
        }
      }
    }
  }

  throw new Error("No solution found!");
}

export function part1(input: string): number {
  const map = lines(input).flatMap(Iterator.from).toArray();

  const { score } = dfs(map);

  return score;
}

export function part2(input: string): number {
  const map = lines(input).flatMap(Iterator.from).toArray();

  const { endKey, parents } = dfs(map);

  const visited = new Set<number>();

  const keyStack = [endKey];

  let key;
  while ((key = keyStack.pop()) !== undefined) {
    const dir = key % 4;
    const pos = (key - dir) / 4;

    visited.add(pos);

    const parentKeys = parents.get(key);
    if (parentKeys !== undefined) {
      for (const parentKey of parentKeys) {
        keyStack.push(parentKey);
      }
    }
  }

  return visited.size;
}
