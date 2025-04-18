import express from "express";
import { ApolloServer } from "apollo-server-express";

const world = "world";

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}
