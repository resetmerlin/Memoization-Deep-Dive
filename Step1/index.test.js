import { memoize } from "./index.js";

describe("memoize function", () => {
  let callCount = 0;
  const testFunction = (a, b) => {
    callCount += 1;
    return a + b;
  };

  it("should call the original function only once for the same arguments", () => {
    callCount = 0;
    const memoizedFn = memoize(testFunction);

    memoizedFn(2, 3);
    memoizedFn(2, 3);

    console.log(callCount);

    // Ensure function is only called once
    expect(callCount).toBe(1);
  });

  it("should call the original function again for different arguments", () => {
    callCount = 0;

    const memoizedFn = memoize(testFunction);

    expect(memoizedFn(2, 3)).toBe(5);
    expect(memoizedFn(4, 1)).toBe(5);

    expect(callCount).toBe(2);
  });

  it("should handle edge cases like empty arguments", () => {
    // Reset callCount
    callCount = 0;
    const memoizedFn = memoize(testFunction);

    expect(memoizedFn()).toBeNaN();
    expect(memoizedFn()).toBeNaN();

    expect(callCount).toBe(1);
  });
});
