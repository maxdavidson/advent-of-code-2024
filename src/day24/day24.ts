const INPUT_PATTERN = /^(\w+): ([01])$/gm;
const OPS_PATTERN = /^(\w+) (\w+) (\w+) -> (\w+)$/gm;

function execute(
  operation: string,
  operandA: boolean,
  operandB: boolean,
): boolean {
  switch (operation) {
    case "AND":
      return operandA && operandB;
    case "OR":
      return operandA || operandB;
    case "XOR":
      return operandA !== operandB;
    default:
      throw new TypeError(`Unknown op: ${operation}`);
  }
}

export function part1(input: string): number {
  const state = new Map(
    input.matchAll(INPUT_PATTERN).map((match) => [match[1]!, match[2] === "1"]),
  );

  const operations = new Map(
    input
      .matchAll(OPS_PATTERN)
      .map((match) => [match[4]!, [match[2]!, match[1]!, match[3]!]] as const),
  );

  function getOutput(outputKey: string): boolean {
    let output = state.get(outputKey);
    if (output === undefined) {
      const [op, keyA, keyB] = operations.get(outputKey)!;
      output = execute(op, getOutput(keyA), getOutput(keyB));
      state.set(outputKey, output);
    }
    return output;
  }

  let output = 0;

  for (let i = 0; i < 100; i += 1) {
    const key = "z" + i.toString().padStart(2, "0");
    if (!operations.has(key)) {
      break;
    }
    if (getOutput(key)) {
      output += 2 ** i;
    }
  }

  return output;
}

export function part2(input: string): string {
  const operations = input
    .matchAll(OPS_PATTERN)
    .map((match) => [match[2]!, match[1]!, match[3]!, match[4]!] as const)
    .toArray();

  const higestOutputKey = operations
    .filter(([, , , key]) => key.startsWith("z"))
    .map(([, , , key]) => key)
    .sort()
    .at(-1)!;

  return operations
    .filter(([operation, operandA, operandB, result]) => {
      if (operation === "XOR") {
        if (
          !result.startsWith("x") &&
          !result.startsWith("y") &&
          !result.startsWith("z") &&
          !operandA.startsWith("x") &&
          !operandA.startsWith("y") &&
          !operandA.startsWith("z") &&
          !operandB.startsWith("x") &&
          !operandB.startsWith("y") &&
          !operandB.startsWith("z")
        ) {
          return true;
        }

        for (const [subOperation, subOperandA, subOperandB] of operations) {
          if (
            (result === subOperandA || result === subOperandB) &&
            subOperation === "OR"
          ) {
            return true;
          }
        }
      } else {
        if (result.startsWith("z") && result !== higestOutputKey) {
          return true;
        }

        if (operation === "AND" && operandA !== "x00" && operandB !== "x00") {
          for (const [subOperation, subOperandA, subOperandB] of operations) {
            if (
              (result === subOperandA || result === subOperandB) &&
              subOperation !== "OR"
            ) {
              return true;
            }
          }
        }
      }

      return false;
    })
    .map(([, , , key]) => key)
    .sort()
    .join(",");
}
