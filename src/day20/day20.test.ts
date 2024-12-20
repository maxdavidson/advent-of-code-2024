import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day20.ts";

const [INPUT, _INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day20", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT), 1384);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT), 1_008_542);
  });
});
