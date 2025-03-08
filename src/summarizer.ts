import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { ConversationTurn } from "./conversation.js";

export async function generateSummary(
  question: string,
  conversation: ConversationTurn[],
): Promise<string> {
  const formattedResponses = conversation
    .map(({ speaker, message }) => `${speaker} said: ${message}`)
    .join("\n\n");

  const summarizerPrompt = `
Summarize the responses concisely into 1-2 paragraphs:
Question: ${question}
Responses: ${formattedResponses}
`;

  const { text: summary } = await generateText({
    model: openai("gpt-4o"), // TODO: Make this configurable , defaulting to OpenAI GPT-4o for summarization for now
    system: "You are a concise summarizer of expert opinions.",
    prompt: summarizerPrompt,
  });

  return summary;
}
