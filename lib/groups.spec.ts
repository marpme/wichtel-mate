import { describe, expect, it } from "vitest";
import { userMap } from "./groups";

describe("group selection", () => {
  it("should contain all members of each group", () => {
    expect(userMap.size).toBe(9);
  });
});
