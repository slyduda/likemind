import { expect, test } from "vitest";
import { sum } from "@/utils";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("random weighted value without weights is between min and max", () => {
  const min = 1;
  const max = 10;
  const val = randomWeightedValue(min, max);
  expect(val).toBeGreaterThanOrEqual(min);
  expect(val).toBeLessThanOrEqual(max);
});

test("random weighted value with weight only on 3 is chosen", () => {
  const min = 1;
  const max = 10;
  const val = randomWeightedValue(min, max, [0, 0, 1]);
  expect(val === 3).toBeTruthy();
});

test("random weighted value cannot be greater than max", () => {
  const min = 1;
  const max = 2;
  const val = randomWeightedValue(min, max, [0, 0, 1]);
  expect(val).toBeGreaterThanOrEqual(min);
  expect(val).toBeLessThanOrEqual(max);
});
