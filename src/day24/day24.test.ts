import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day24.ts";

const [INPUT, INPUT_TEST_0, INPUT_TEST_1] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-0.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test-1.txt", import.meta.url), "utf-8"),
]);

suite("day24", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST_0), 4);
    t.assert.equal(part1(INPUT_TEST_1), 2024);
    t.assert.equal(part1(INPUT), 42_410_633_905_894);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT), "cqm,mps,vcv,vjv,vwp,z13,z19,z25");
  });
});
