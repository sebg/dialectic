# Dialectic

**Dialectic** is an open-source AI panel research tool that enables users to simulate conversations between AI personas to explore different perspectives on a topic.

## Features
- Define AI personas in `personas.json`
- Ask questions and generate responses from LLM Provider of your choice (current options: OpenAI, Anthropic & Google)
- Aggregate responses into structured reports
- Live logging for better CLI feedback
- Code linting and formatting with ESLint & Prettier

## Installation
```sh
git clone https://github.com/sebg/dialectic.git
cd dialectic
npm install
```

## Usage

Usage:
CLI => npm run start <model> <question>

```sh
npm run start openai "What do experts think about AI regulation?"
```

## Development

### **Linting & Formatting**
To maintain clean and consistent code:
```sh
npm run lint           # Run ESLint to check for issues
npm run lint -- --fix  # Auto-fix linting issues
npm run format         # Auto-format code with Prettier
```

### **Building the Project**
Before running the project, ensure TypeScript compiles:
```sh
npm run build
```

## Environment Variables
Create a `.env` file and add your API key:
```
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key
```

## License
This project is licensed under the Apache 2.0 License.