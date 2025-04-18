import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    sum(a: Float!, b: Float!): Float!
    subtract(a: Float!, b: Float!): Float!
    multiply(a: Float!, b: Float!): Float!
    divide(a: Float!, b: Float!): Float!
  }
`;
