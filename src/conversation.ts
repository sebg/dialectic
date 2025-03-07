import { askAI } from "./ai.js";
import { Persona } from "./ai.js";

export interface PersonaResponse {
  name: string;
  response: string;
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
      .map((res) => `${res.name} said: "${res.response}"`)
      .join("\n\n");

    const fullPrompt = context ? `${context}\n\n${question}` : question;

    const response = await askAI(fullPrompt, model, persona.prompt);

    responses.push({ name: persona.name, response });
  }

  return responses;
}
