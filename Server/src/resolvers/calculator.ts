import { rateLimiter } from "../utils/rate-limiter";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    sum: (_: any, { a, b }: { a: number; b: number }) => a + b,
    subtract: (_: any, { a, b }: { a: number; b: number }) => a - b,
    multiply: async (
      _: any,
      { a, b }: { a: number; b: number },
      context: any
    ) => {
      const ip = context.ip || context.req?.ip || "unknown";

      try {
        await rateLimiter.consume(ip);
        return a * b;
      } catch (rejRes) {
        // Throttling mechanism
        throw new GraphQLError(
          "Too many requests. Please wait before trying again.",
          {
            extensions: { code: "TOO_MANY_REQUESTS" },
          }
        );
      }
    },
    divide: (_: any, { a, b }: { a: number; b: number }) => {
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    },
  },
};
