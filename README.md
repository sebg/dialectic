# Dialectic

**Dialectic** is an open-source AI panel research tool that enables users to simulate conversations between AI personas to rapidly surface diverse AI-generated perspectives, accelerating creativity and decision-making.

## Features

- Define AI personas in `personas.json`
- Ask questions and generate responses from LLM Provider of your choice (current options: OpenAI, Anthropic & Google)
- Aggregate responses into structured markdown reports
- Built-in summarizer agent for concise, insightful overviews
- Live logging for better CLI feedback
- Code linting and formatting with ESLint & Prettier
- Flexible CLI options

## Installation

```sh
git clone https://github.com/sebg/dialectic.git
cd dialectic
npm install
```

## Usage

Dialectic offers flexible command-line arguments:

| Argument       | Short | Required | Default | Description                                      |
| -------------- | ----- | -------- | ------- | ------------------------------------------------ |
| `--model`      | `-m`  | Yes      | -       | Model provider (`openai`, `anthropic`, `google`) |
| `--question`   | `-q`  | Yes      | -       | The question to ask the AI personas              |
| `--summarizer` | `-s`  | No       | `true`  | Generate summarized insights from responses      |
| `--verbose`    | `-v`  | No       | `false` | Detailed logging of AI queries and responses     |
| `--context`    | `-c`  | No       | -       | Path to a text file providing additional context |

### Example

```sh
npm run start -- --model openai --question "What do experts think of AI regulation?" --verbose
```

To include additional context from a file:

```sh
npm run start -- --model anthropic --question "How should startups approach AI ethics?" --context ./path/to/context.txt
```

To disable summarization:

```sh
npm run start -- --model google --question "What's the future of remote work?" --summarizer false
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

Create a `.env` file and add your API keys:

```
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key
```

## License

This project is licensed under the Apache 2.0 License.
