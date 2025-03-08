import { askAI, SupportedModel } from "./ai.js";
import { log } from "./logger.js";
import { readFileSync } from "fs";
import * as path from "path";

export interface Persona {
  name: string;
  prompt: string;
}

export interface ConversationTurn {
  speaker: string;
  message: string;
  respondingTo?: string; // Optional since first message won't have this
}

export function loadPersonas(): Persona[] {
  try {
    // Try to find personas.json in multiple possible locations
    const possiblePaths = [
      path.join(process.cwd(), "src", "personas.json"),
      path.join(process.cwd(), "personas.json"),
      path.join(__dirname, "personas.json"),
    ];

    let fileContent: string | null = null;
    let foundPath: string | null = null;

    for (const filePath of possiblePaths) {
      try {
        fileContent = readFileSync(filePath, "utf-8");
        foundPath = filePath;
        break;
      } catch (err) {
        // Continue to next path
      }
    }

    if (!fileContent || !foundPath) {
      throw new Error(
        "Could not locate personas.json in any of the expected locations",
      );
    }

    log(`Loaded personas from ${foundPath}`);
    return JSON.parse(fileContent) as Persona[];
  } catch (error) {
    log(`Error loading personas: ${error}`);
    throw error;
  }
}

export async function runPersonaConversation(
  personas: Persona[],
  question: string,
  model: SupportedModel,
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
