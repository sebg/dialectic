import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

type PersonaResponse = {
  name: string;
  response: string;
};

export async function generateSummary(
  question: string,
  responses: PersonaResponse[],
): Promise<string> {
  const formattedResponses = responses
    .map((persona) => `${persona.name}: ${persona.response}`)
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
