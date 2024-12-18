import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day18.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day18", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST, 7, 12), 22);
    t.assert.equal(part1(INPUT, 71, 1024), 364);
  });

  test("part2", (t) => {
    t.assert.deepEqual(part2(INPUT_TEST, 7), [6, 1]);
    t.assert.deepEqual(part2(INPUT, 71), [52, 28]);
  });
});
