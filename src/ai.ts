import * as dotenv from "dotenv";
dotenv.config();

import { readFileSync } from "fs";
import * as path from "path";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";

import { log } from "./logger.js";

interface Persona {
  name: string;
  prompt: string;
}

// Load personas from JSON file
function loadPersonas(): Persona[] {
  const filePath = path.join(process.cwd(), "src", "personas.json");
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as Persona[];
}

// Load LLM Model from AI SDK
function getModel(modelProvider: string) {
  switch (modelProvider) {
    case "openai":
      return openai("gpt-4o");
    case "anthropic":
      return anthropic("claude-3");
    case "google":
      return google("gemini-pro");
    default:
      throw new Error("Invalid model provider");
  }
}

// Ask AI
async function askAI(question: string, model: any, systemPrompt: string) {
  log(`Querying model with question: "${question}"`);

  const { text } = await generateText({
    model,
    system: systemPrompt,
    prompt: question,
  });

  log("Response received.");
  return text;
}

// Ask all personas
export async function askAllPersonas(
  modelProvider: string,
  userQuestion: string,
): Promise<void> {
  const personas = loadPersonas();
  const model = getModel(modelProvider);

  for (const persona of personas) {
    console.log(`[Dialectic] Querying Persona: ${persona.name}...`);

    const response = await askAI(userQuestion, model, persona.prompt);

    console.log(`[Dialectic] Response (${persona.name}):\n${response}\n`);
  }
}
