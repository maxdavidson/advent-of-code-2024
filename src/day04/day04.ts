import { lines } from "../utils.ts";

export function part1(input: string): number {
  const matrix = lines(input).toArray();

  let sum = 0;

  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix[y]!.length; x += 1) {
      if (matrix[y]![x] === "X") {
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (
              matrix[y + dy * 1]?.[x + dx * 1] === "M" &&
              matrix[y + dy * 2]?.[x + dx * 2] === "A" &&
              matrix[y + dy * 3]?.[x + dx * 3] === "S"
            ) {
              sum += 1;
            }
          }
        }
      }
    }
  }

  return sum;
}

export function part2(input: string): number {
  const matrix = lines(input).toArray();

  let sum = 0;

  for (let y = 1; y < matrix.length - 1; y += 1) {
    for (let x = 1; x < matrix[y]!.length - 1; x += 1) {
      if (matrix[y]![x] === "A") {
        const topLeft = matrix[y - 1]![x - 1]!;
        const topRight = matrix[y - 1]![x + 1]!;
        const bottomLeft = matrix[y + 1]![x - 1]!;
        const bottomRight = matrix[y + 1]![x + 1];
        if (
          ((topLeft === "M" && bottomRight === "S") ||
            (topLeft === "S" && bottomRight === "M")) &&
          ((topRight === "M" && bottomLeft === "S") ||
            (topRight === "S" && bottomLeft === "M"))
        ) {
          sum += 1;
        }
      }
    }
  }

  return sum;
}
