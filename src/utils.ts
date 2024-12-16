export function* lines(input: string): Generator<string> {
  let prevLine: string | undefined;

  for (const match of input.matchAll(/^.*$/gm)) {
    if (prevLine !== undefined) {
      yield prevLine;
    }
    prevLine = match[0];
  }

  if (prevLine !== undefined && prevLine !== "") {
    yield prevLine;
  }
}

export function* range(from: number, toExclusive: number): Generator<number> {
  for (let i = from; i < toExclusive; i += 1) {
    yield i;
  }
}

export function binarySearch<T>(
  items: ArrayLike<T>,
  item: T,
  comparator: (a: T, b: T) => number,
): number {
  let low = 0;
  let high = items.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    switch (Math.sign(comparator(items[mid]!, item))) {
      case 0:
        return mid;

      case -1:
        low = mid + 1;
        break;

      case 1:
        high = mid;
        break;
    }
  }

  return low;
}
