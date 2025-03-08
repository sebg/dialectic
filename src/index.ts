import { getModel } from "./ai.js";
import { loadPersonas, runPersonaConversation } from "./conversation.js";
import { generateMarkdownReport } from "./report_generation.js";
import { generateSummary } from "./summarizer.js";
import { log } from "./logger.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { shuffle } from "lodash-es";
import type { ConversationTurn } from "./conversation.js";

const argv = yargs(hideBin(process.argv))
  .option("model", {
    alias: "m",
    type: "string",
    demandOption: true,
  })
  .option("question", {
    alias: "q",
    type: "string",
    demandOption: true,
  })
  .option("context", {
    alias: "c",
    type: "string",
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    default: false,
  })
  .option("summarizer", {
    alias: "s",
    type: "boolean",
    default: true,
  })
  .option("random", {
    alias: "r",
    type: "boolean",
    default: false,
    description: "Randomize the order of personas in the conversation",
  })
  .parseSync();

async function runDialectic() {
  const personas = loadPersonas();
  const model = getModel(argv.model);

  const order = argv.random ? shuffle(personas.map((p) => p.name)) : undefined;

  log("Running Persona Conversation");
  const responses: ConversationTurn[] = await runPersonaConversation(
    personas,
    argv.question,
    model,
    order,
    argv.verbose,
  );

  log("Conversation completed");

  let summary = "";
  if (argv.summarizer) {
    summary = await generateSummary(argv.question, responses, argv.verbose);
    log("Summary generated");
  }

  const reportPath = generateMarkdownReport(argv.question, responses, summary);
  log(`Report generated at ${reportPath}`);
}

runDialectic().catch((err) => log(`Error: ${err}`));
