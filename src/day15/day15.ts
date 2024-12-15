import { lines } from "../utils.ts";

type Dir = readonly [dx: number, dy: number];

const dirMap: Record<string, Dir> = {
  ["<"]: [-1, 0],
  ["v"]: [0, 1],
  [">"]: [1, 0],
  ["^"]: [0, -1],
};

const tileMap: Record<string, [string, string]> = {
  ["O"]: ["[", "]"],
  ["@"]: ["@", "."],
};

export function part1(input: string): number {
  const [rawTiles, rawDirections] = input.split("\n\n");

  if (rawTiles === undefined || rawDirections === undefined) {
    throw new TypeError("Invalid input!");
  }

  const tiles = lines(rawTiles).flatMap(Iterator.from).toArray();

  const size = Math.sqrt(tiles.length);

  if (!Number.isInteger(size)) {
    throw new TypeError("Not a square!");
  }

  function canMove(pos: number, dir: Dir): number {
    const tile = tiles[pos]!;

    if (tile === "@" || tile === "O") {
      const [dx, dy] = dir;

      const x = pos % size;
      const y = (pos - x) / size;

      const nextX = x + dx;
      const nextY = y + dy;

      if (0 <= nextX && nextX < size && 0 <= nextY && nextY < size) {
        const nextPos = size * nextY + nextX;
        const nextTile = tiles[nextPos]!;

        if (
          nextTile === "." ||
          (nextTile === "O" && canMove(nextPos, dir) !== nextPos)
        ) {
          return nextPos;
        }
      }
    }

    return pos;
  }

  function tryMove(pos: number, dir: Dir): number {
    const nextPos = canMove(pos, dir);

    if (nextPos !== pos) {
      tryMove(nextPos, dir);
      tiles[nextPos] = tiles[pos]!;
      tiles[pos] = ".";
    }

    return nextPos;
  }

  let robotPos = tiles.indexOf("@");

  if (robotPos === -1) {
    throw new Error("No robot found!");
  }

  const dirs = lines(rawDirections).flatMap(Iterator.from);

  for (const dir of dirs) {
    robotPos = tryMove(robotPos, dirMap[dir]!);
  }

  return tiles.reduce((sum, val, pos) => {
    if (val === "O") {
      const x = pos % size;
      const y = (pos - x) / size;
      const score = 100 * y + x;
      return sum + score;
    }

    return sum;
  }, 0);
}

export function part2(input: string): number {
  const [rawTiles, rawDirections] = input.split("\n\n");

  if (rawTiles === undefined || rawDirections === undefined) {
    throw new TypeError("Invalid input!");
  }

  const tiles = lines(rawTiles)
    .flatMap(Iterator.from)
    .flatMap((tile) => tileMap[tile] ?? [tile, tile])
    .toArray();

  const height = Math.sqrt(tiles.length / 2);

  if (!Number.isInteger(height)) {
    throw new TypeError("Not a square!");
  }

  const width = height * 2;

  function canMove(pos: number, dir: Dir): number {
    const tile = tiles[pos]!;

    if (tile === "@" || tile === "[" || tile === "]") {
      const [dx, dy] = dir;

      const x = pos % width;
      const y = (pos - x) / width;

      const nextX = x + dx;
      const nextY = y + dy;

      if (0 <= nextX && nextX < width && 0 <= nextY && nextY < height) {
        const nextPos = width * nextY + nextX;
        const nextTile = tiles[nextPos]!;

        if (nextTile === ".") {
          return nextPos;
        }

        if (dy === 0) {
          if (nextTile === "[" || nextTile === "]") {
            if (canMove(nextPos, dir) !== nextPos) {
              return nextPos;
            }
          }
        } else if (dx === 0) {
          if (nextTile === "[") {
            if (canMove(nextPos, dir) !== nextPos) {
              const nextNeighborPos = width * nextY + (nextX + 1);
              if (canMove(nextNeighborPos, dir) !== nextNeighborPos) {
                return nextPos;
              }
            }
          }

          if (nextTile === "]") {
            if (canMove(nextPos, dir) !== nextPos) {
              const nextNeighborPos = width * nextY + (nextX - 1);
              if (canMove(nextNeighborPos, dir) !== nextNeighborPos) {
                return nextPos;
              }
            }
          }
        }
      }
    }

    return pos;
  }

  function tryMove(pos: number, dir: Dir): number {
    const nextPos = canMove(pos, dir);

    if (nextPos !== pos) {
      tryMove(nextPos, dir);

      const tile = tiles[pos]!;
      tiles[nextPos] = tiles[pos]!;
      tiles[pos] = ".";

      const [dx, _dy] = dir;
      if (dx === 0) {
        const x = pos % width;
        const y = (pos - x) / width;
        if (tile === "[") {
          tryMove(width * y + (x + 1), dir);
        } else if (tile === "]") {
          tryMove(width * y + (x - 1), dir);
        }
      }
    }

    return nextPos;
  }

  let robotPos = tiles.indexOf("@");
  if (robotPos === -1) {
    throw new Error("No robot found!");
  }

  const dirs = lines(rawDirections).flatMap(Iterator.from).toArray();

  for (const dir of dirs) {
    robotPos = tryMove(robotPos, dirMap[dir]!);
  }

  return tiles.reduce((sum, val, pos) => {
    if (val === "[") {
      const x = pos % width;
      const y = (pos - x) / width;
      const score = 100 * y + x;
      return sum + score;
    }

    return sum;
  }, 0);
}
