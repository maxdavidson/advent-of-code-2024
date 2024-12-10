import { lines } from "../utils.ts";

function trails(input: string): IteratorObject<IteratorObject<number>> {
  const map = lines(input).flatMap(Iterator.from).map(Number).toArray();

  const size = Math.sqrt(map.length);

  if (!Number.isInteger(size)) {
    throw new TypeError("Not a square!");
  }

  function* endPositions(
    pos: number,
    expectedValue: number,
  ): Generator<number> {
    const value = map[pos]!;

    if (value !== expectedValue) {
      return;
    }

    if (value === 9) {
      yield pos;
      return;
    }

    const x = pos % size;
    const y = (pos - x) / size;

    if (0 <= x - 1) {
      yield* endPositions(size * y + (x - 1), value + 1);
    }

    if (0 <= y - 1) {
      yield* endPositions(size * (y - 1) + x, value + 1);
    }

    if (x + 1 < size) {
      yield* endPositions(size * y + (x + 1), value + 1);
    }

    if (y + 1 < size) {
      yield* endPositions(size * (y + 1) + x, value + 1);
    }
  }

  return map
    .entries()
    .filter(([_pos, value]) => value === 0)
    .map(([pos, value]) => endPositions(pos, value));
}

export function part1(input: string): number {
  return trails(input)
    .map((trail) => new Set(trail).size)
    .reduce((a, b) => a + b, 0);
}

export function part2(input: string): number {
  return trails(input)
    .map((trail) => trail.toArray().length)
    .reduce((a, b) => a + b, 0);
}
