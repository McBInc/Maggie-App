import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const getEntries = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("vault")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const addEntry = mutation({
  args: {
    userId: v.optional(v.string()),
    text: v.string(),
    audioStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("vault", {
      userId: args.userId,
      text: args.text,
      audioStorageId: args.audioStorageId,
      createdAt: Date.now(),
    });
  },
});

export const removeEntry = mutation({
  args: { id: v.id("vault") },
  handler: async (ctx, args) => {
    const entry = await ctx.db.get(args.id);
    if (entry?.audioStorageId) {
      await ctx.storage.delete(entry.audioStorageId);
    }
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const transcribe = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const file = await ctx.storage.get(args.storageId);
    if (!file) throw new Error("File not found");

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OPENROUTER_API_KEY not set");

    const formData = new FormData();
    // Convex Blob to File-like object
    formData.append("file", file as any, "audio.m4a");
    formData.append("model", "openai/whisper-1");

    const response = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData as any,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Transcription error:", error);
      throw new Error(`Transcription failed: ${response.statusText}`);
    }

    const result = (await response.json()) as { text: string };
    return result.text;
  },
});
