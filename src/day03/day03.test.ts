import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day03.ts";

const INPUT = await fs.readFile(new URL("input.txt", import.meta.url), "utf-8");

suite("day03", () => {
  test("part1", (t) => {
    t.assert.equal(
      part1(
        "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
      ),
      161,
    );
    t.assert.equal(part1(INPUT), 18_960_0467);
  });

  test("part2", (t) => {
    t.assert.equal(
      part2(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
      ),
      48,
    );
    t.assert.equal(part2(INPUT), 107_069_718);
  });
});
