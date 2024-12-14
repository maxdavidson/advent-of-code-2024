import * as fs from "node:fs/promises";
import { suite, test } from "node:test";

import { part1 } from "./day14.ts";

const [INPUT, INPUT_TEST] = await Promise.all([
  fs.readFile(new URL("input.txt", import.meta.url), "utf-8"),
  fs.readFile(new URL("input-test.txt", import.meta.url), "utf-8"),
]);

suite("day14", () => {
  test("part1", (t) => {
    t.assert.equal(part1(INPUT_TEST, 11, 7), 12);
    t.assert.equal(part1(INPUT, 101, 103), 224_554_908);
  });
});
