import { expect } from "chai";
import { resolvers } from "../resolvers/calculator";

describe("Calculator Resolvers", () => {
  it("adds two numbers", () => {
    const result = resolvers.Query.sum(null, { a: 3, b: 4 });
    expect(result).to.equal(7);
  });

  it("subtracts two numbers", () => {
    const result = resolvers.Query.subtract(null, { a: 10, b: 4 });
    expect(result).to.equal(6);
  });

  it("multiplies two numbers", () => {
    const result = resolvers.Query.multiply(null, { a: 6, b: 2 });
    expect(result).to.equal(12);
  });

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
