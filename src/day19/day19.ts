import { lines, memoize } from "../utils.ts";

export function part1(input: string): number {
  const iterator = lines(input);

  const patterns = new Set<string>(iterator.next().value!.split(", "));

  iterator.next();

  const isSolution = memoize(
    (design) => design,
    (design: string): boolean => {
      if (patterns.has(design)) {
        return true;
      }

      for (const prefix of patterns) {
        if (design.startsWith(prefix)) {
          const suffix = design.slice(prefix.length);
          if (isSolution(suffix)) {
            return true;
          }
        }
      }

      return false;
    },
  );

  let count = 0;

  for (const design of iterator) {
    if (isSolution(design)) {
      count += 1;
    }
  }

  return count;
}

export function part2(input: string): number {
  const iterator = lines(input);

  const patterns = new Set<string>(iterator.next().value!.split(", "));

  iterator.next();

  const solutionCount = memoize(
    (design) => design,
    (design: string): number => {
      let count = 0;

      if (patterns.has(design)) {
        count += 1;
      }

      for (const prefix of patterns) {
        if (design.startsWith(prefix)) {
          count += solutionCount(design.slice(prefix.length));
        }
      }

      return count;
    },
  );

  let sum = 0;

  for (const design of iterator) {
    sum += solutionCount(design);
  }

  return sum;
}
