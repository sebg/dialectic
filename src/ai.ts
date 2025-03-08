import * as dotenv from "dotenv";
dotenv.config();

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { log } from "./logger.js";

// Use a generic type for models since we don't have access to the specific model types
export type SupportedModel = any; // This will be the return type from openai(), anthropic(), or google()
export type ModelProvider = "openai" | "anthropic" | "google";

export function getModel(modelProvider: ModelProvider): SupportedModel {
  switch (modelProvider) {
    case "openai":
      return openai("gpt-4o");
    case "anthropic":
      return anthropic("claude-3");
    case "google":
      return google("gemini-pro");
    default:
      throw new Error(`Invalid model provider: ${modelProvider}`);
  }
}

export async function askAI(
  question: string,
  model: SupportedModel,
  systemPrompt: string,
  verbose = false,
): Promise<string> {
  if (verbose) log(`Querying model with question: "${question}"`);

  const { text } = await generateText({
    model,
    system: systemPrompt,
    prompt: question,
  });

  if (verbose) log("Response received.");
  return text;
}
