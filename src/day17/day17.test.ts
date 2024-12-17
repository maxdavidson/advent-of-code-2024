import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day17.ts";

const [INPUT, INPUT_TEST_0, INPUT_TEST_1] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-0.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-1.txt", import.meta.url), "utf-8"),
]);

suite("day17", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST_0), "4,6,3,5,6,3,5,2,1,0");
    t.assert.equal(part1(INPUT), "6,5,7,4,5,7,3,1,0");
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST_1), 117_440);
    t.assert.equal(part2(INPUT), 105_875_099_912_602n);
  });
});
