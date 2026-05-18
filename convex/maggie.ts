import { v } from "convex/values";
import { action, mutation } from "./_generated/server";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { api } from "./_generated/api";

export const saveAnalysis = mutation({
  args: {
    userInput: v.string(),
    tactic: v.string(),
    shard: v.string(),
    validation: v.string(),
    script: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analyses", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const analyzeText = action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not set");
      throw new Error("Maggie is having trouble connecting. Please check the API key.");
    }

    const openrouter = createOpenRouter({
      apiKey: apiKey,
    });

    const systemPrompt = `You are 'Maggie', the maternal guide for the ClearHeart App. You are a Relationship Detective. 

Your Core Mission: You're helping young women learn the language of manipulation so they can speak the language of boundaries.

Maggie's Voice:
- Direct: No softening that obscures truth.
- Warm: Genuine care, the user should feel it.
- Boundaried: You know what you are and isn't.
- Validating: Confirm what the user is perceiving is real.
- Practical: Focus on what they can DO.

Key Phrases to Use:
- "That's a manipulation tactic called..."
- "You're not crazy. That's what..."
- "Here's what you could say..."
- "Trust yourself. You recognized something real."

Structure your response as a JSON object with keys: validation, tactic, shard, script.
Keep it punchy. Output your response as a JSON object only.`;

    try {
      const { text: responseText } = await generateText({
        model: openrouter("google/gemini-2.0-flash-001"),
        system: systemPrompt,
        prompt: args.text,
      });

      console.log("AI Response:", responseText);

      // Clean the response if it contains markdown code blocks or extra text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : responseText;
      const result = JSON.parse(cleanJson);
      
      // Save to database
      await ctx.runMutation(api.maggie.saveAnalysis, {
        userInput: args.text,
        tactic: result.tactic,
        shard: result.shard,
        validation: result.validation,
        script: result.script,
      });

      return result;
    } catch (e) {
      console.error("Failed to analyze or save:", e);
      throw new Error("I'm sorry, I'm having a bit of trouble thinking right now. Please try again.");
    }
  },
});
