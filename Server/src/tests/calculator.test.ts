import { expect } from "chai";
import { resolvers } from "../resolvers/calculator";
import { rateLimiter } from "../utils/rate-limiter";

afterEach(async () => {
  await rateLimiter.delete("test-ip");
});

// Async test suite to test Calculator API's core functionality -
// sum, subtract, multiply, divide, division by 0
describe("Calculator Resolvers", () => {
  const ctx = { ip: "test-ip" }; // mock IP context

  // ** Sum **
  it("adds two numbers", () => {
    const result = resolvers.Query.sum(null, { a: 3, b: 4 });
    expect(result).to.equal(7);
  });

  // ** Subtract **
  it("subtracts two numbers", () => {
    const result = resolvers.Query.subtract(null, { a: 10, b: 4 });
    expect(result).to.equal(6);
  });

  // ** Multiply **
  it("multiplies numbers (within limit)", async () => {
    const result = await resolvers.Query.multiply(null, { a: 3, b: 2 }, ctx);
    expect(result).to.equal(6);
  });

  it("uses fallback IP when none provided", async () => {
    const result = await resolvers.Query.multiply(null, { a: 2, b: 3 }, {});
    expect(result).to.equal(6);
  });

  it("enforces rate limiting on multiply after threshold", async () => {
    // Hit the rate limit (5 times)
    for (let i = 0; i < 5; i++) {
      await resolvers.Query.multiply(null, { a: i, b: 2 }, ctx);
    }

    // 6th request should fail
    try {
      await resolvers.Query.multiply(null, { a: 99, b: 99 }, ctx);
      throw new Error("Expected to be rate-limited, but wasn't");
    } catch (err: any) {
      expect(err.message).to.equal(
        "Too many requests. Please wait before trying again."
      );
    }
  });

  it("resets throttle for a different IP", async () => {
    const result = await resolvers.Query.multiply(
      null,
      { a: 5, b: 5 },
      { ip: "another-ip" }
    );
    expect(result).to.equal(25);
  });

  // ** Divide **
  it("divides two numbers", () => {
    const result = resolvers.Query.divide(null, { a: 10, b: 2 });
    expect(result).to.equal(5);
  });

  it("throws when dividing by zero", () => {
    expect(() => resolvers.Query.divide(null, { a: 10, b: 0 })).to.throw(
      "Cannot divide by zero"
    );
  });
});
