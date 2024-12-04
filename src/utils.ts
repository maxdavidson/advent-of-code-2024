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
