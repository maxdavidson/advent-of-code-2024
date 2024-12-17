const PATTERN =
  /^Register A: (\d+)$\n^Register B: (\d+)$\n^Register C: (\d+)$\n\n^Program: (\d+(?:,\d+)*)$/m;

interface Program {
  regA: number;
  regB: number;
  regC: number;
  instr: Uint8Array;
}

function createProgram(input: string): Program {
  const [_, regA, regB, regC, instr] = input.match(PATTERN)!;
  return {
    regA: Number(regA!),
    regB: Number(regB!),
    regC: Number(regC!),
    instr: Uint8Array.from(instr!.split(",")),
  };
}

function* runProgram({ regA, regB, regC, instr }: Program) {
  let pc = 0;

  while (pc + 1 < instr.length) {
    const opcode = instr[pc]!;
    const operand = instr[pc + 1]!;

    let compoOperand;

    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        compoOperand = operand;
        break;
      case 4:
        compoOperand = regA;
        break;
      case 5:
        compoOperand = regB;
        break;
      case 6:
        compoOperand = regC;
        break;
      default:
        throw new Error("Invalid operand");
    }

    switch (opcode) {
      case 0:
        regA = regA >> compoOperand;
        break;

      case 1:
        regB ^= operand;
        break;

      case 2:
        regB = compoOperand & 0b111;
        break;

      case 3:
        if (regA !== 0) {
          pc = operand - 2;
        }
        break;

      case 4:
        regB ^= regC;
        break;

      case 5:
        yield compoOperand & 0b111;
        break;

      case 6:
        regB = regA >> compoOperand;
        break;

      case 7:
        regC = regA >> compoOperand;
        break;

      default:
        throw new TypeError(`Invalid opcode: ${opcode}`);
    }

    pc += 2;
  }
}

export function part1(input: string): string {
  const program = createProgram(input);

  return runProgram(program).toArray().join(",");
}

export function part2(input: string): bigint {
  const program = createProgram(input);

  function solve(regA: number) {
    const prevRegA = program.regA;
    try {
      program.regA = regA;
      const [value] = runProgram(program);
      return value!;
    } finally {
      program.regA = prevRegA;
    }
  }

  function findSolution2(index: number, prevRegA: bigint): bigint | undefined {
    if (index === -1) {
      return prevRegA;
    }

    for (let i = 0n; i < 8n; i += 1n) {
      const nextRegA = (prevRegA << 3n) | i;
      if (solve(Number(nextRegA)) === program.instr[index]) {
        const solution = findSolution2(index - 1, nextRegA);
        if (solution !== undefined) {
          return solution;
        }
      }
    }

    return undefined;
  }

  function findSolution(): bigint | undefined {
    const lastIndex = program.instr.length - 1;

    for (let nextRegA = 0n; nextRegA < 1024n; nextRegA += 1n) {
      if (solve(Number(nextRegA)) === program.instr[lastIndex]) {
        const solution = findSolution2(lastIndex - 1, nextRegA);
        if (solution !== undefined) {
          return solution;
        }
      }
    }

    return undefined;
  }

  return findSolution()!;
}
