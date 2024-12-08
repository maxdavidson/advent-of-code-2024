import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day08.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day08", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 14);
    t.assert.equal(part1(INPUT), 336);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 34);
    t.assert.equal(part2(INPUT), 1131);
  });
});
