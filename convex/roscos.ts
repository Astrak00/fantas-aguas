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
  handler: (ctx, { name }) => ctx.db.insert("roscos", { name, questions: [] }),
});

export const update = mutation({
  args: { id: v.id("roscos"), name: v.string(), questions: v.array(question) },
  handler: (ctx, { id, name, questions }) => {
    const letters = questions.map((q) => q.letter);
    if (new Set(letters).size !== letters.length) throw new Error("Duplicate letter");
    if (letters.some((l) => !LETTERS.includes(l))) throw new Error("Unknown letter");
    // keep alphabetical (Spanish) order regardless of insertion order
    const sorted = [...questions].sort((a, b) => LETTERS.indexOf(a.letter) - LETTERS.indexOf(b.letter));
    return ctx.db.patch(id, { name, questions: sorted });
  },
});

export const remove = mutation({
  args: { id: v.id("roscos") },
  handler: (ctx, { id }) => ctx.db.delete(id),
});
