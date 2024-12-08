import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day07.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day07", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 3749);
    t.assert.equal(part1(INPUT), 12_553_187_650_171);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 11_387);
    t.assert.equal(part2(INPUT), 96_779_702_119_491);
  });
});
