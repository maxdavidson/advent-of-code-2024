function createBlinker(maxDepth: number) {
  const cache = new Map<number, number>();

  return function blink(value: number, depth = 0): number {
    if (maxDepth <= depth) {
      return 1;
    }

    const key = maxDepth * value + depth;

    let count = cache.get(key);

    if (count !== undefined) {
      return count;
    }

    if (value === 0) {
      count = blink(1, depth + 1);
    } else {
      const digits = Math.floor(Math.log10(value)) + 1;
      if (digits % 2 === 0) {
        count =
          blink(Math.floor(value / 10 ** (digits / 2)), depth + 1) +
          blink(value % 10 ** (digits / 2), depth + 1);
      } else {
        count = blink(value * 2024, depth + 1);
      }
    }

    cache.set(key, count);

    return count;
  };
}

export function part1(input: string): number {
  const stones = input.split(" ").map(Number);

  const blink = createBlinker(25);

  let sum = 0;

  for (const stone of stones) {
    sum += blink(stone);
  }

  return sum;
}

export function part2(input: string): number {
  const stones = input.split(" ").map(Number);

  const blink = createBlinker(75);

  let sum = 0;

  for (const stone of stones) {
    sum += blink(stone);
  }

  return sum;
}
