import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const question = v.object({
  letter: v.string(),
  mode: v.union(v.literal("starts"), v.literal("contains")),
  question: v.string(),
  answer: v.string(),
});

export const result = v.union(v.literal("pending"), v.literal("correct"), v.literal("wrong"));

export default defineSchema({
  roscos: defineTable({
    name: v.string(),
    questions: v.array(question),
  }),
  games: defineTable({
    roscoId: v.id("roscos"),
    player: v.string(),
    results: v.array(result),
    current: v.number(),
  }),
  settings: defineTable({ light: v.boolean() }),
});
