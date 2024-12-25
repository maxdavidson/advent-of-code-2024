import { lines } from "../utils.ts";

export function part1(input: string): number {
  const locks: number[][] = [];
  const keys: number[][] = [];

  for (const schema of input.split("\n\n")) {
    const heights: number[] = [];

    const [firstRow] = lines(schema);
    const isLock = firstRow?.[0] === "#";

    for (const line of lines(schema).drop(1).take(5)) {
      for (let i = 0; i < line.length; i += 1) {
        heights[i] = (heights[i] ?? 0) + (line[i] === "#" ? 1 : 0);
      }
    }

    if (isLock) {
      locks.push(heights);
    } else {
      keys.push(heights);
    }
  }

  let pairsCount = 0;

  for (const lock of locks) {
    nextKey: for (const key of keys) {
      if (lock.length !== key.length) {
        continue;
      }

      for (let i = 0; i < lock.length; i += 1) {
        if (5 < lock[i]! + key[i]!) {
          continue nextKey;
        }
      }

      pairsCount += 1;
    }
  }

  return pairsCount;
}
