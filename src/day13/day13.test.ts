import * as fs from "node:fs/promises";
import {  suite, test } from "node:test";

import { part1, part2 } from "./day13.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);


suite("day13", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 480);
    t.assert.equal(part1(INPUT), 35_082);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 875_318_608_908);
    t.assert.equal(part2(INPUT), 82_570_698_600_470);
  });
});
