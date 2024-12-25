import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1 } from "./day25.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day25", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 3);
    t.assert.equal(part1(INPUT), 2770);
  });
});
