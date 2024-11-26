import * as fs from "node:fs/promises";
import { beforeEach, suite, test } from "node:test";

import { scheduler } from "node:timers/promises";
import { part1, part2 } from "./day00.ts";

const INPUT = await fs.readFile(new URL("input.txt", import.meta.url), "utf-8");

suite("day00", function () {
  beforeEach(() => {
    console.clear();
  });

  test("part1 works", async (t) => {
    t.assert.equal(part1(INPUT), 0);
    await scheduler.wait(1000);
  });

  test("part2 works", (t) => {
    t.assert.equal(part2(INPUT), 0);
  });
});
