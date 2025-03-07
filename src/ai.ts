import * as dotenv from "dotenv";
dotenv.config();

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { readFileSync } from "fs";
import * as path from "path";
import { shuffle } from "lodash-es";
import { log } from "./logger.js";

export interface Persona {
  name: string;
  prompt: string;
}

export interface PersonaResponse {
  speaker: string; // previously 'name'
  message: string; // previously 'response'
}

export interface ConversationTurn {
  speaker: string;
  message: string;
  respondingTo?: string; // Optional since first message won't have this
}

export function loadPersonas(): Persona[] {
  const filePath = path.join(process.cwd(), "src", "personas.json");
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as Persona[];
}

export function getModel(modelProvider: string) {
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

export async function askAI(
  question: string,
  model: any,
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

// UPDATED FUNCTION WITH CONVERSATION LOGIC
export async function askPersonasConversation(
  personas: Persona[],
  model: any,
  question: string,
  verbose: boolean,
): Promise<ConversationTurn[]> {
  const conversation: ConversationTurn[] = [];

  let previousResponse = question;

  for (const persona of personas) {
    const response = await askAI(
      previousResponse,
      model,
      persona.prompt,
      verbose,
    );

    conversation.push({
      speaker: persona.name,
      message: response,
      respondingTo: previousResponse,
    });

    previousResponse = `${persona.name} said: "${response}"\n\n${question}`;
  }

  return conversation;
}
