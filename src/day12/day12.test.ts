import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day12.ts";

const [INPUT, INPUT_TEST_0, INPUT_TEST_1, INPUT_TEST_2] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-0.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-1.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-2.txt", import.meta.url), "utf-8"),
]);

suite("day12", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST_0), 140);
    t.assert.equal(part1(INPUT_TEST_1), 772);
    t.assert.equal(part1(INPUT_TEST_2), 1930);
    t.assert.equal(part1(INPUT), 1_304_764);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST_0), 80);
    t.assert.equal(part2(INPUT_TEST_1), 436);
    t.assert.equal(part2(INPUT_TEST_2), 1206);
    t.assert.equal(part2(INPUT), 811_148);
  });
});
