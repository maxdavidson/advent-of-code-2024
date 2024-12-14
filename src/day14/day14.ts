const PATTERN = /^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/gm;

function* parseInput(input: string) {
  for (const [, x, y, dx, dy] of input.matchAll(PATTERN)) {
    yield { x: Number(x), y: Number(y), dx: Number(dx), dy: Number(dy) };
  }
}

export function part1(input: string, width: number, height: number): number {
  const time = 100;

  let topLeft = 0;
  let topRight = 0;
  let bottomLeft = 0;
  let bottomRight = 0;

  const xMid = (width - 1) / 2;
  const yMid = (height - 1) / 2;

  for (const { x, y, dx, dy } of parseInput(input)) {
    const x2 = (((x + time * dx) % width) + width) % width;
    const y2 = (((y + time * dy) % height) + height) % height;

    if (x2 < xMid) {
      if (y2 < yMid) {
        bottomLeft += 1;
      } else if (y2 > yMid) {
        topLeft += 1;
      }
    } else if (x2 > xMid) {
      if (y2 < yMid) {
        bottomRight += 1;
      } else if (y2 > yMid) {
        topRight += 1;
      }
    }
  }

  return topLeft * topRight * bottomLeft * bottomRight;
}
