import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { question } from "./schema";

export const LETTERS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

export const list = query({
  args: {},
  handler: (ctx) => ctx.db.query("roscos").collect(),
});

export const get = query({
  args: { id: v.id("roscos") },
  handler: (ctx, { id }) => ctx.db.get(id),
});

export const create = mutation({
  args: { name: v.string() },
  handler: (ctx, { name }) =>
    ctx.db.insert("roscos", {
      name,
      questions: LETTERS.map((letter) => ({ letter, mode: "starts" as const, question: "", answer: "" })),
    }),
});

export const update = mutation({
  args: { id: v.id("roscos"), name: v.string(), questions: v.array(question) },
  handler: (ctx, { id, ...patch }) => ctx.db.patch(id, patch),
});

export const remove = mutation({
  args: { id: v.id("roscos") },
  handler: (ctx, { id }) => ctx.db.delete(id),
});
