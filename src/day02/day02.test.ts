import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day02.ts";

const [INPUT_TEST, INPUT] = await Promise.all([
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
]);

suite("day02", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 2);
    t.assert.equal(part1(INPUT), 379);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 4);
    t.assert.equal(part2(INPUT), 430);
  });
});
