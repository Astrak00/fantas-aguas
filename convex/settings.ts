import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => (await ctx.db.query("settings").first()) ?? { light: false },
});

export const toggleLight = mutation({
  args: {},
  handler: async (ctx) => {
    const s = await ctx.db.query("settings").first();
    if (s) await ctx.db.patch(s._id, { light: !s.light });
    else await ctx.db.insert("settings", { light: true });
  },
});
