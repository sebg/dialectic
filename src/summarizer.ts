import { askAI, getModel } from "./ai.js";
import type { ConversationTurn } from "./conversation.js";

export async function generateSummary(
  question: string,
  conversation: ConversationTurn[],
  verbose: boolean = false,
  modelProvider: string = "openai",
): Promise<string> {
  const formattedResponses = conversation
    .map(({ speaker, message }) => `${speaker} said: ${message}`)
    .join("\n\n");

  const summarizerPrompt = `
Summarize the responses concisely into 1-2 paragraphs:
Question: ${question}
Responses: ${formattedResponses}
`;

  const systemPrompt = "You are a concise summarizer of expert opinions.";
  const model = getModel(modelProvider); // Using the model provider passed as parameter

  return await askAI(summarizerPrompt, model, systemPrompt, verbose);
}
