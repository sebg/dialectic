import * as dotenv from 'dotenv';
dotenv.config();
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
export async function askAI(question, modelProvider) {
    let model;
    switch (modelProvider) {
        case 'openai':
            model = openai('gpt-4o');
            break;
        case 'anthropic':
            model = anthropic('claude-3');
            break;
        case 'google':
            model = google('gemini-pro');
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
