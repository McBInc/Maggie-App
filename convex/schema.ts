import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tactics: defineTable({
    tacticId: v.number(),
    title: v.string(),
    description: v.string(),
    category: v.string(), // e.g., "Sanctuary", "Substance", etc.
    fullContent: v.string(),
    isStarter: v.boolean(),
    videoUrl: v.optional(v.string()),
  }).index("by_tacticId", ["tacticId"]),

  questions: defineTable({
    questionId: v.number(),
    text: v.string(),
    category: v.string(),
    order: v.number(),
    healthySign: v.string(),
    potentialConcern: v.string(),
    redFlag: v.string(),
  }).index("by_order", ["order"]),

  analyses: defineTable({
    userId: v.optional(v.string()),
    userInput: v.string(),
    tactic: v.string(),
    shard: v.string(),
    validation: v.string(),
    script: v.string(),
    createdAt: v.number(),
  }),

  vault: defineTable({
    userId: v.optional(v.string()),
    text: v.string(),
    audioStorageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
