export const resolvers = {
  Query: {
    sum: (_: any, { a, b }: { a: number; b: number }) => a + b,
    subtract: (_: any, { a, b }: { a: number; b: number }) => a - b,
    multiply: (_: any, { a, b }: { a: number; b: number }) => a * b,
    divide: (_: any, { a, b }: { a: number; b: number }) => {
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    },
  },
};
