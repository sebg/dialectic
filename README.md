# Dialectic

**Dialectic** is an open-source AI panel research tool that enables users to simulate conversations between AI personas to explore different perspectives on a topic.

## Features
- Define AI personas in `personas.json`
- Ask questions and generate responses from multiple AI models (OpenAI, Anthropic, Google)
- Aggregate responses into structured reports

## Installation
```sh
git clone https://github.com/sebg/dialectic.git
cd dialectic
npm install
```

## Usage
```sh
npm run start "What do experts think about AI regulation?"
```

## Environment Variables
Create a `.env` file and add your API keys:
```
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key
```

## License
This project is licensed under the Apache 2.0 License.