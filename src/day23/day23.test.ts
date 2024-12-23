import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1, part2 } from "./day23.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day23", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST), 7);
    t.assert.equal(part1(INPUT), 1108);
  });

  test("part2", (t) => {
    t.assert.equal(part2(INPUT_TEST), "co,de,ka,ta");
    t.assert.equal(part2(INPUT), "ab,cp,ep,fj,fl,ij,in,ng,pl,qr,rx,va,vf");
  });
});
