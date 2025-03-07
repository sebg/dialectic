import { loadPersonas, getModel, askPersonasConversation } from "./ai.js";
import { generateMarkdownReport } from "./report_generation.js";
import { generateSummary } from "./summarizer.js";
import { log } from "./logger.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { shuffle } from "lodash-es";
import type { ConversationTurn } from "./ai.js";

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
  .parseSync();

async function runDialectic() {
  const personas = loadPersonas();
  const model = getModel(argv.model);

  const order = argv.random ? shuffle(personas.map((p) => p.name)) : undefined;

  log("Running Persona Conversation");
  const responses: ConversationTurn[] = await askPersonasConversation(
    personas,
    model,
    argv.question,
    argv.verbose,
  );

  log("Conversation completed");

  let summary = "";
  if (argv.summarizer) {
    summary = await generateSummary(argv.question, responses);
    log("Summary generated");
  }

  const reportPath = generateMarkdownReport(argv.question, responses, summary);
  log(`Report generated at ${reportPath}`);
}

runDialectic().catch((err) => log(`Error: ${err}`));
