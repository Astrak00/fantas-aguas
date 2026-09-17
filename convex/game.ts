import { mutation, query, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Only the newest game is "live"; starting a new one replaces it on screen.
async function latest(ctx: QueryCtx) {
  return ctx.db.query("games").order("desc").first();
}

export const get = query({
  args: {},
  handler: async (ctx) => {
    const game = await latest(ctx);
    if (!game) return null;
    const rosco = await ctx.db.get(game.roscoId);
    return rosco ? { ...game, rosco } : null;
  },
});

export const start = mutation({
  args: { roscoId: v.id("roscos"), player: v.string() },
  handler: async (ctx, { roscoId, player }) => {
    const rosco = await ctx.db.get(roscoId);
    if (!rosco) throw new Error("Rosco not found");
    await ctx.db.insert("games", {
      roscoId,
      player,
      results: rosco.questions.map(() => "pending" as const),
      current: 0,
    });
  },
});

export const answer = mutation({
  args: { action: v.union(v.literal("correct"), v.literal("wrong"), v.literal("skip")) },
  handler: async (ctx, { action }) => {
    const game = await latest(ctx);
    if (!game) return;
    const results = [...game.results];
    if (action !== "skip") results[game.current] = action;
    // advance to the next pending letter, wrapping around; -1 when none left
    const n = results.length;
    let next = -1;
    for (let i = 1; i <= n; i++) {
      const j = (game.current + i) % n;
      if (results[j] === "pending") { next = j; break; }
    }
    await ctx.db.patch(game._id, { results, current: next });
  },
});

export const end = mutation({
  args: {},
  handler: async (ctx) => {
    const game = await latest(ctx);
    if (game) await ctx.db.delete(game._id);
  },
});
