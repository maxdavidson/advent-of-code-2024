import { lines } from "../utils.ts";

function* neighbors(pos: number, size: number): Generator<number> {
  const x = pos % size;
  const y = (pos - x) / size;

  yield 0 <= x - 1 ? size * y + (x - 1) : -1;
  yield 0 <= y - 1 ? size * (y - 1) + x : -1;
  yield x + 1 < size ? size * y + (x + 1) : -1;
  yield y + 1 < size ? size * (y + 1) + x : -1;
}

export function part1(input: string): number {
  const map = lines(input).flatMap(Iterator.from).toArray();

  const size = Math.sqrt(map.length);

  if (!Number.isInteger(size)) {
    throw new Error("Not a square!");
  }

  const visited = new Set<number>();

  let totalPrice = 0;

  const remaining = map.map((_, index) => index).reverse();
  const regionRemaining = [];

  let pos;
  while ((pos = remaining.pop()) !== undefined) {
    if (!visited.has(pos)) {
      const type = map[pos];

      let count = 0;
      let perimeter = 0;

      regionRemaining.push(pos);

      let regionPos;
      while ((regionPos = regionRemaining.pop()) !== undefined) {
        if (!visited.has(regionPos)) {
          visited.add(regionPos);

          count += 1;

          for (const neighborPos of neighbors(regionPos, size)) {
            if (neighborPos === -1 || map[neighborPos] !== type) {
              perimeter += 1;
            } else {
              regionRemaining.push(neighborPos);
            }
          }
        }
      }

      totalPrice += count * perimeter;
    }
  }

  return totalPrice;
}

function countRegions(map: ReadonlySet<number>, size: number): number {
  const remaining = Array.from(map);
  const visited = new Set<number>();

  const regionRemaining = [];

  let regionCount = 0;

  let pos;
  while ((pos = remaining.pop()) !== undefined) {
    if (!visited.has(pos)) {
      regionCount += 1;
      regionRemaining.push(pos);
      let regionPos;
      while ((regionPos = regionRemaining.pop()) !== undefined) {
        if (!visited.has(regionPos)) {
          visited.add(regionPos);
          for (const neighborPos of neighbors(regionPos, size)) {
            if (map.has(neighborPos)) {
              regionRemaining.push(neighborPos);
            }
          }
        }
      }
    }
  }

  return regionCount;
}

export function part2(input: string): number {
  const map = lines(input).flatMap(Iterator.from).toArray();

  const size = Math.sqrt(map.length);

  if (!Number.isInteger(size)) {
    throw new Error("Not a square!");
  }

  const visited = new Set<number>();

  let totalPrice = 0;

  const remaining = map.map((_, index) => index).reverse();
  const regionRemaining = [];

  let pos;
  while ((pos = remaining.pop()) !== undefined) {
    if (!visited.has(pos)) {
      const type = map[pos];

      const region = new Set<number>();

      regionRemaining.push(pos);

      let regionPos;
      while ((regionPos = regionRemaining.pop()) !== undefined) {
        if (!region.has(regionPos)) {
          region.add(regionPos);
          visited.add(regionPos);

          for (const neighborPos of neighbors(regionPos, size)) {
            if (neighborPos !== -1 && map[neighborPos] === type) {
              regionRemaining.push(neighborPos);
            }
          }
        }
      }

      const allEdges: Set<number>[] = [];

      for (const pos of region) {
        neighbors(pos, size).forEach((neighborPos, direction) => {
          if (neighborPos === -1 || map[neighborPos] !== type) {
            (allEdges[direction] ??= new Set()).add(pos);
          }
        });
      }

      for (const edges of allEdges) {
        totalPrice += region.size * countRegions(edges, size);
      }
    }
  }

  return totalPrice;
}
