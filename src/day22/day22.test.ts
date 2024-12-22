import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day22.ts";

const [INPUT, INPUT_TEST_0, INPUT_TEST_1] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-0.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-1.txt", import.meta.url), "utf-8"),
]);

suite("day22", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST_0), 37_327_623);
    t.assert.equal(part1(INPUT), 20_071_921_341);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST_1), 23);
    t.assert.equal(part2(INPUT), 2242);
  });
});
