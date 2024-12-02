import { lines } from "../utils.ts";

function* pairs(input: string): Generator<[number, number]> {
  for (const line of lines(input)) {
    const [a, b] = line.split(/\s+/, 2);
    yield [Number(a!), Number(b!)];
  }
}

export function part1(input: string): number {
  const listA = [];
  const listB = [];

  for (const [a, b] of pairs(input)) {
    listA.push(a);
    listB.push(b);
  }

  const comparator = (a: number, b: number) => a - b;

  listA.sort(comparator);
  listB.sort(comparator);

  let sum = 0;

  for (let i = 0; i < listA.length; i += 1) {
    sum += Math.abs(listA[i]! - listB[i]!);
  }

  return sum;
}

export function part2(input: string): number {
  const listA = [];
  const listB = new Map<number, number>();

  for (const [a, b] of pairs(input)) {
    listA.push(a);
    listB.set(b, (listB.get(b) ?? 0) + 1);
  }

  let sum = 0;

  for (const num of listA) {
    sum += num * (listB.get(num) ?? 0);
  }

  return sum;
}
