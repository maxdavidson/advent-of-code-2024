import { lines } from "../utils.ts";

const MASK = (1 << 24) - 1;

function transform(secret: number): number {
  secret = ((secret << 6) ^ secret) & MASK;
  secret = ((secret >> 5) ^ secret) & MASK;
  secret = ((secret << 11) ^ secret) & MASK;
  return secret;
}

export function part1(input: string): number {
  const secrets = lines(input).map(Number);

  let sum = 0;

  for (let secret of secrets) {
    for (let i = 0; i < 2000; i += 1) {
      secret = transform(secret);
    }
    sum += secret;
  }

  return sum;
}

export function part2(input: string): number {
  const secrets = lines(input).map(Number);

  const sequencePrices = new Map<number, number>();

  for (let secret of secrets) {
    const sequences = new Set<number>();

    let diff0 = 0;
    let diff1 = 0;
    let diff2 = 0;
    let diff3 = 0;

    let price = secret % 10;

    for (let i = 0; i < 2000; i += 1) {
      secret = transform(secret);

      const nextPrice = secret % 10;

      diff3 = diff2;
      diff2 = diff1;
      diff1 = diff0;
      diff0 = nextPrice - price;

      if (i >= 3) {
        const key = 20 * (20 * (20 * diff0 + diff1) + diff2) + diff3;
        if (!sequences.has(key)) {
          sequences.add(key);
          sequencePrices.set(key, (sequencePrices.get(key) ?? 0) + nextPrice);
        }
      }

      price = nextPrice;
    }
  }

  return sequencePrices.values().reduce((a, b) => Math.max(a, b), 0);
}
