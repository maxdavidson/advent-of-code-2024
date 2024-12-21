import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day21.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day21", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 126_384);
    t.assert.equal(part1(INPUT), 134_120);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 154_115_708_116_294);
    t.assert.equal(part2(INPUT), 167_389_793_580_400);
  });
});
