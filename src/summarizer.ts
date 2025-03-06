import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateSummary(
  question: string,
  responses: Record<string, string>,
): Promise<string> {
  const combinedResponses = Object.entries(responses)
    .map(([persona, response]) => `## ${persona}\n${response}`)
    .join("\n\n");

  const summarizerPrompt = `
    You are a summarizer agent. Given the question and the responses from several personas, synthesize the responses into a clear, concise summary highlighting key agreements, disagreements, and overall insights.

    ### Question:
    ${question}

    ### Responses:
    ${combinedResponses}

    ### Summary:
  `;

  const { text: summary } = await generateText({
    model: openai("gpt-4o"), // TODO: Make this configurable , defaulting to OpenAI GPT-4o for summarization for now
    system:
      "You are an insightful summarizer, synthesizing expert opinions clearly and concisely.",
    prompt: summarizerPrompt,
  });

  return summary;
}
