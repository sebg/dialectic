import { readFileSync } from "fs";
import { askAllPersonas } from "./ai.js";
import { generateMarkdownReport } from "./report_generation.js";
import { generateSummary } from "./summarizer.js";
import { log } from "./logger.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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

type PersonaResponse = {
  name: string;
  response: string;
};

async function runDialectic() {
  const { model, question, context: contextPath, verbose, summarizer } = argv;

  let context = contextPath;
  if (context) {
    context = readFileSync(context, "utf-8");
  }

  const fullQuestion = context ? `${context}\n\n${question}` : question;

  log("Asking all personas for their thoughts");
  const responses: PersonaResponse[] = await askAllPersonas(
    model,
    fullQuestion,
    verbose,
  );
  log("Received responses from all personas");

  let summary = "";
  if (summarizer) {
    log("Generating summary of responses");
    summary = await generateSummary(fullQuestion, responses);
    log("Generated summary of responses");
  }

  log("Generating markdown report");
  const reportPath = generateMarkdownReport(fullQuestion, responses, summary);
  log(`Report generated at ${reportPath}`);
}

runDialectic().catch((err) => log(`Error: ${err}`));
