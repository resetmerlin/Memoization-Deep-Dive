import { fibonacci } from "./index.js";

describe("memoize fibonacci", () => {
  it("should retrieve zero value", () => {
    expect(fibonacci(0)).toBe(0);
  });

  it("should retrieve one value", () => {
    expect(fibonacci(1)).toBe(1);
  });

  it("should retrieve 55 value", () => {
    expect(fibonacci(10)).toBe(55);
  });
});
