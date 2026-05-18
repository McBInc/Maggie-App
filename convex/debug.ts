import { mutation } from "./_generated/server";

export const wipeAllData = mutation({
  args: {},
  handler: async (ctx) => {
    const questions = await ctx.db.query("questions").collect();
    for (const q of questions) {
      await ctx.db.delete(q._id);
    }
    const tactics = await ctx.db.query("tactics").collect();
    for (const t of tactics) {
      await ctx.db.delete(t._id);
    }
    const analyses = await ctx.db.query("analyses").collect();
    for (const a of analyses) {
      await ctx.db.delete(a._id);
    }
  },
});
