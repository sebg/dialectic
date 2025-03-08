import { askAI } from "./ai.js";
import { log } from "./logger.js";
import { readFileSync } from "fs";
import * as path from "path";

export interface Persona {
  name: string;
  prompt: string;
}

export interface PersonaResponse {
  speaker: string;
  message: string;
}

export interface ConversationTurn extends PersonaResponse {
  respondingTo?: string; // Optional since first message won't have this
}

export function loadPersonas(): Persona[] {
  const filePath = path.join(process.cwd(), "src", "personas.json");
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as Persona[];
}

export async function runPersonaConversation(
  personas: Persona[],
  question: string,
  model: any,
  order?: string[],
  verbose: boolean = false,
): Promise<ConversationTurn[]> {
  const conversation: ConversationTurn[] = [];
  const speakingOrder = order ?? personas.map((p) => p.name);
  let previousPrompt = question;

  for (const personaName of speakingOrder) {
    const persona = personas.find((p) => p.name === personaName);
    if (!persona) {
      throw new Error(`Persona ${personaName} not found.`);
    }

    const context = conversation
      .map((res) => `${res.speaker} said: "${res.message}"`)
      .join("\n\n");

    const fullPrompt = context ? `${context}\n\n${question}` : question;

    const response = await askAI(fullPrompt, model, persona.prompt, verbose);

    conversation.push({
      speaker: persona.name,
      message: response,
      respondingTo: previousPrompt,
    });

    previousPrompt = fullPrompt;
  }

  return conversation;
}
