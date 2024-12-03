export function part1(input: string): number {
  return input
    .matchAll(/mul\((\d+),(\d+)\)/g)
    .map((match) => Number(match[1]) * Number(match[2]))
    .reduce((a, b) => a + b, 0);
}

export function part2(input: string): number {
  let enabled = true;
  let sum = 0;

  for (const match of input.matchAll(/mul\((\d+),(\d+)\)|do(?:n't)?/g)) {
    if (match[0] === "do") {
      enabled = true;
    } else if (match[0] === "don't") {
      enabled = false;
    } else if (enabled) {
      sum += Number(match[1]) * Number(match[2]);
    }
  }

  return sum;
}
