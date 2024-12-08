import { lines } from "../utils.ts";

type Operator = (a: number, b: number) => number;

const add: Operator = (a, b) => a + b;
const multiply: Operator = (a, b) => a * b;
const concat: Operator = (a, b) =>
  a * 10 ** (Math.floor(Math.log10(b)) + 1) + b;

function solve(input: string, operators: readonly Operator[]): number {
  const equations = lines(input).map((line) => {
    const [result, operands] = line.split(": ", 2);
    return {
      result: Number(result!),
      operands: operands!.split(" ").map(Number),
    };
  });

  function isSolution(
    result: number,
    operands: readonly number[],
    index = 0,
    acc = 0,
  ): boolean {
    if (result < acc) {
      return false;
    }

    const operand = operands[index];

    if (operand === undefined) {
      return result === acc;
    }

    for (const operator of operators) {
      if (isSolution(result, operands, index + 1, operator(acc, operand))) {
        return true;
      }
    }

    return false;
  }

  return equations
    .filter(({ result, operands }) => isSolution(result, operands))
    .map(({ result }) => result)
    .reduce((a, b) => a + b, 0);
}

export function part1(input: string): number {
  return solve(input, [add, multiply]);
}

export function part2(input: string): number {
  return solve(input, [add, multiply, concat]);
}
