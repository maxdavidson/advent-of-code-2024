import * as fs from "node:fs/promises";
import { before, suite, test } from "node:test";

import { part1, part2 } from "./day15.ts";

const [INPUT, INPUT_TEST_0, INPUT_TEST_1] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-0.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-1.txt", import.meta.url), "utf-8"),
]);

before(() => {
  process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
});

suite("day15", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST_0), 2_028);
    t.assert.equal(part1(INPUT_TEST_1), 10_092);
    t.assert.equal(part1(INPUT), 1_465_523);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST_0), 1_751);
    t.assert.equal(part2(INPUT_TEST_1), 9_021);
    t.assert.equal(part2(INPUT), 1_471_049);
  });
});
