import { lines, memoize } from "../utils.ts";

const GRID = "789456123 0A ^@<v>";
const GRID_WIDTH = 3;
const GRID_HEIGHT = GRID.length / GRID_WIDTH;

const DIRECTIONS = [
  [">", 1, 0],
  ["v", 0, 1],
  ["<", -1, 0],
  ["^", 0, -1],
] as const;

const uniquePathsBetween = memoize(
  (startTile, endTile) => `${startTile}${endTile}`,
  (startTile: string, endTile: string): readonly string[] => {
    const startPos = GRID.indexOf(startTile);
    const endPos = GRID.indexOf(endTile);

    if (startPos === -1 || endPos === -1) {
      throw new RangeError("No tile pos found!");
    }

    const queue = [{ pos: startPos, seq: "" }];
    const costs = new Map<number, number>();
    const sequences = [];

    let next;
    while ((next = queue.shift()) !== undefined) {
      const { pos, seq } = next;

      if (pos === endPos) {
        sequences.push(seq);
        continue;
      }

      const x = pos % GRID_WIDTH;
      const y = (pos - x) / GRID_WIDTH;

      for (const [dir, dx, dy] of DIRECTIONS) {
        const nextX = x + dx;
        const nextY = y + dy;

        if (
          0 <= nextX &&
          nextX < GRID_WIDTH &&
          0 <= nextY &&
          nextY < GRID_HEIGHT
        ) {
          const nextPos = GRID_WIDTH * nextY + nextX;
          const nextSeq = seq + dir;
          const nextCost = nextSeq.length;
          const prevBestCost = costs.get(nextPos);
          if (
            GRID[nextPos] !== " " &&
            (prevBestCost === undefined || nextCost <= prevBestCost)
          ) {
            costs.set(nextPos, nextCost);
            queue.push({ pos: nextPos, seq: seq.concat(dir) });
          }
        }
      }
    }

    return sequences;
  },
);

const shortestSequenceLength = memoize(
  (sequence, depth, limit) => `${sequence},${depth},${limit}`,
  (sequence: string, depth: number, limit: number): number => {
    if (depth > limit) {
      return sequence.length;
    }

    let sequenceLength = 0;

    let prevTile = depth === 0 ? "A" : "@";

    for (let nextTile of sequence) {
      if (0 < depth && nextTile === "A") {
        nextTile = "@";
      }

      let shortestSubSequenceLength = Infinity;

      for (const nextPath of uniquePathsBetween(prevTile, nextTile)) {
        shortestSubSequenceLength = Math.min(
          shortestSubSequenceLength,
          shortestSequenceLength(nextPath + "@", depth + 1, limit),
        );
      }

      sequenceLength += shortestSubSequenceLength;

      prevTile = nextTile;
    }

    return sequenceLength;
  },
);

function solve(input: string, limit: number): number {
  const codes = lines(input);

  let sum = 0;

  for (const code of codes) {
    const length = shortestSequenceLength(code, 0, limit);
    const numeric = Number.parseInt(code.slice(0, -1));
    sum += length * numeric;
  }

  return sum;
}

export function part1(input: string): number {
  return solve(input, 2);
}

export function part2(input: string): number {
  return solve(input, 25);
}
