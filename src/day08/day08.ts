import { lines } from "../utils.ts";

function solve(input: string, minSteps: number, maxSteps: number) {
  const map = lines(input).flatMap(Iterator.from).toArray();

  const size = Math.sqrt(map.length);

  if (!Number.isInteger(size)) {
    throw new TypeError("Not a square!");
  }

  const antennas = new Map<string, number[]>();

  for (let pos = 0; pos < map.length; pos += 1) {
    const node = map[pos]!;
    if (node !== ".") {
      let array = antennas.get(node);
      if (array === undefined) {
        array = [];
        antennas.set(node, array);
      }
      array.push(pos);
    }
  }

  const antinodePositions = new Map<number, string>();

  for (const [frequency, positions] of antennas) {
    for (let aIndex = 0; aIndex < positions.length - 1; aIndex += 1) {
      const aPos = positions[aIndex]!;
      const aX = aPos % size;
      const aY = (aPos - aX) / size;

      for (let bIndex = aIndex + 1; bIndex < positions.length; bIndex += 1) {
        const bPos = positions[bIndex]!;
        const bX = bPos % size;
        const bY = (bPos - bX) / size;

        const dX = aX - bX;
        const dY = aY - bY;

        for (let i = minSteps; i <= maxSteps; i += 1) {
          const x = aX + i * dX;
          const y = aY + i * dY;
          if (0 <= x && x < size && 0 <= y && y < size) {
            antinodePositions.set(size * y + x, frequency);
          } else {
            break;
          }
        }

        for (let i = minSteps; i <= maxSteps; i += 1) {
          const x = bX - i * dX;
          const y = bY - i * dY;
          if (0 <= x && x < size && 0 <= y && y < size) {
            antinodePositions.set(size * y + x, frequency);
          } else {
            break;
          }
        }
      }
    }
  }

  return antinodePositions.size;
}

export function part1(input: string): number {
  return solve(input, 1, 1);
}

export function part2(input: string): number {
  return solve(input, 0, Infinity);
}
