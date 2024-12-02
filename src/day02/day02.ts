import { lines, range } from "../utils.ts";

function* reports(input: string) {
  for (const line of lines(input)) {
    yield line.split(" ").map(Number);
  }
}

function isReportAllIncrementing(report: readonly number[]) {
  for (let i = 0; i < report.length - 1; i += 1) {
    const diff = report[i + 1]! - report[i]!;
    if (diff !== 1 && diff !== 2 && diff !== 3) {
      return false;
    }
  }

  return true;
}

function isReportAllDecrementing(report: readonly number[]) {
  for (let i = 0; i < report.length - 1; i += 1) {
    const diff = report[i + 1]! - report[i]!;
    if (diff !== -1 && diff !== -2 && diff !== -3) {
      return false;
    }
  }

  return true;
}

function isReportSafe(report: readonly number[]) {
  return isReportAllIncrementing(report) || isReportAllDecrementing(report);
}

export function part1(input: string): number {
  let count = 0;

  for (const report of reports(input)) {
    if (isReportSafe(report)) {
      count += 1;
    }
  }

  return count;
}

export function part2(input: string): number {
  return reports(input)
    .filter(
      (report) =>
        isReportSafe(report) ||
        range(0, report.length).some((i) =>
          isReportSafe(report.toSpliced(i, 1)),
        ),
    )
    .reduce((count) => count + 1, 0);
}
