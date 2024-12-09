import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day09.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day09", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 1928);
    t.assert.equal(part1(INPUT), 6_421_128_769_094);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 2858);
    t.assert.equal(part2(INPUT), 6_448_168_620_520);
  });
});
