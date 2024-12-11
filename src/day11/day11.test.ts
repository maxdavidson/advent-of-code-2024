import { suite, test } from "node:test";

import { part1, part2 } from "./day11.ts";

const INPUT_TEST = "125 17";
const INPUT = "3028 78 973951 5146801 5 0 23533 857";

suite("day11", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 55_312);
    t.assert.equal(part1(INPUT), 198_089);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), 65_601_038_650_482);
    t.assert.equal(part2(INPUT), 236_302_670_835_517);
  });
});
