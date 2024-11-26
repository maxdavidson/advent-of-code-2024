import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day00.ts";

const INPUT = await fs.readFile(new URL("input.txt", import.meta.url), "utf-8");

suite("day00", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT), 0);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT), 0);
  });
});
