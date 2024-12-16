import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day16.ts";

const [INPUT, INPUT_TEST_0, INPUT_TEST_1] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-0.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-1.txt", import.meta.url), "utf-8"),
]);

suite("day16", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST_0), 7_036);
    t.assert.equal(part1(INPUT_TEST_1), 11_048);
    t.assert.equal(part1(INPUT), 92_432);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST_0), 45);
    t.assert.equal(part2(INPUT_TEST_1), 64);
    t.assert.equal(part2(INPUT), 458);
  });
});
