import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day05.ts";

const [INPUT_TEST, INPUT] = await Promise.all([
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
]);

suite("day05", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 143);
    t.assert.equal(part1(INPUT), 5452);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 123);
    t.assert.equal(part2(INPUT), 4598);
  });
});
