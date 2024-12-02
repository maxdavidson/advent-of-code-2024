export function* lines(input: string): Generator<string> {
  for (const match of input.matchAll(/^.+$/gm)) {
    yield match[0];
  }
}

export function* range(from: number, toExclusive: number): Generator<number> {
  for (let i = from; i < toExclusive; i += 1) {
    yield i;
  }
}
