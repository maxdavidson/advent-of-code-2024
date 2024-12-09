import { range } from "../utils.ts";

export function part1(input: string): number {
  const diskMap = Iterator.from(input.trim()).map(Number).toArray();

  const blocks = new Uint16Array(diskMap.length * 5);

  let pos = 0;

  for (const [index, num] of diskMap.entries()) {
    const nextPos = pos + num;
    if (blocks.length <= nextPos) {
      throw new RangeError("overflow!");
    }
    if (index % 2 === 0) {
      blocks.fill(index / 2 + 1, pos, nextPos);
    }
    pos = nextPos;
  }

  let emptyPos = blocks.indexOf(0, 0);

  for (let pos = blocks.length - 1; 0 <= pos && emptyPos <= pos; pos -= 1) {
    if (blocks[pos]! !== 0) {
      blocks[emptyPos] = blocks[pos]!;
      blocks[pos] = 0;
      emptyPos = blocks.indexOf(0, emptyPos + 1);
    }
  }

  return blocks.reduce(
    (sum, value, index) => sum + Math.max(0, value - 1) * index,
    0,
  );
}

export function part2(input: string): number {
  const diskMap = Iterator.from(input.trim()).map(Number).toArray();

  const files: { pos: number; size: number; id: number }[] = [];
  let empties: { pos: number; size: number }[] = [];

  let pos = 0;

  for (let diskMapIndex = 0; diskMapIndex < diskMap.length; diskMapIndex += 2) {
    const fileSize = diskMap[diskMapIndex]!;
    files.push({ id: diskMapIndex / 2, pos, size: fileSize });
    pos += fileSize;

    if (diskMapIndex + 1 < diskMap.length) {
      const emptySize = diskMap[diskMapIndex + 1]!;
      empties.push({ pos, size: emptySize });
      pos += emptySize;
    }
  }

  for (let fileIndex = files.length - 1; 0 <= fileIndex; fileIndex -= 1) {
    const file = files[fileIndex]!;

    for (let emptyindex = 0; emptyindex < empties.length; emptyindex += 1) {
      const empty = empties[emptyindex]!;

      if (file.pos <= empty.pos) {
        break;
      }

      if (file.size <= empty.size) {
        file.pos = empty.pos;
        empty.pos += file.size;
        empty.size -= file.size;
        if (empty.size === 0) {
          empties.splice(emptyindex, 1);
        }
        break;
      }
    }
  }

  return files
    .values()
    .flatMap((file) =>
      range(file.pos, file.pos + file.size).map((index) => file.id * index),
    )
    .reduce((a, b) => a + b, 0);
}
