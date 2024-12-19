import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day19.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day19", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 6);
    t.assert.equal(part1(INPUT), 267);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 16);
    t.assert.equal(part2(INPUT), 796_449_099_271_652);
  });
});
