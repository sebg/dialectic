import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import dotenv from 'dotenv';

dotenv.config();

export async function askAI(question: string, modelProvider: string) {
  let model;
  
  switch (modelProvider) {
    case 'openai':
      model = openai('gpt-4o', { apiKey: process.env.OPENAI_API_KEY });
      break;
    case 'anthropic':
      model = anthropic('claude-3', { apiKey: process.env.ANTHROPIC_API_KEY });
      break;
    case 'google':
      model = google('gemini-pro', { apiKey: process.env.GOOGLE_API_KEY });
      break;
    default:
      throw new Error('Invalid model provider');
  }

  const { text } = await generateText({
    model,
    system: 'You are a research assistant providing diverse insights.',
    prompt: question
  });

  return text;
}