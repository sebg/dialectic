import { askAI } from "./ai.js";

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

export async function runPersonaConversation(
  personas: Persona[],
  question: string,
  model: any,
  order?: string[],
): Promise<PersonaResponse[]> {
  const responses: PersonaResponse[] = [];
  const speakingOrder = order ?? personas.map((p) => p.name);

  for (const personaName of speakingOrder) {
    const persona = personas.find((p) => p.name === personaName);
    if (!persona) {
      throw new Error(`Persona ${personaName} not found.`);
    }

    const context = responses
      .map((res) => `${res.speaker} said: "${res.message}"`)
      .join("\n\n");

    const fullPrompt = context ? `${context}\n\n${question}` : question;

    const response = await askAI(fullPrompt, model, persona.prompt);

    responses.push({ speaker: persona.name, message: response });
  }

  return responses;
}
