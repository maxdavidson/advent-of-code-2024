const PATTERN =
  /^Button A: X\+(\d+), Y\+(\d+)$\r?\n^Button B: X\+(\d+), Y\+(\d+)$\r?\n^Prize: X=(\d+), Y=(\d+)$/gm;

function* parseInput(input: string) {
  for (const [_, ...captures] of input.matchAll(PATTERN)) {
    const [aX, aY, bX, bY, priceX, priceY] = captures.map(Number);

    yield {
      aX: aX!,
      aY: aY!,
      bX: bX!,
      bY: bY!,
      priceX: priceX!,
      priceY: priceY!,
    };
  }
}

export function part1(input: string): number {
  let totalPrice = 0;

  for (const { aX, aY, bX, bY, priceX, priceY } of parseInput(input)) {
    const a = (priceX * bY - priceY * bX) / (aX * bY - aY * bX);
    const b = (priceX - a * aX) / bX;

    if (Number.isInteger(a) && Number.isInteger(b)) {
      totalPrice += 3 * a + b;
    }
  }

  return totalPrice;
}

export function part2(input: string): number {
  let totalPrice = 0;

  for (let { aX, aY, bX, bY, priceX, priceY } of parseInput(input)) {
    priceX += 1e13;
    priceY += 1e13;

    const a = (priceX * bY - priceY * bX) / (aX * bY - aY * bX);
    const b = (priceX - a * aX) / bX;

    if (Number.isInteger(a) && Number.isInteger(b)) {
      totalPrice += 3 * a + b;
    }
  }

  return totalPrice;
}
