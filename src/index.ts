import { askAllPersonas } from "./ai.js";
import { generateMarkdownReport } from "./report_generation.js";
import { generateSummary } from "./summarizer.js";
import { log } from "./logger.js";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: npm run start <model> <question>");
  process.exit(1);
}

const modelProvider = args[0];
const question = args.slice(1).join(" ");

async function runDialectic() {
  log("Asking all personas for their thoughts");
  const responses = await askAllPersonas(modelProvider, question);
  log("Received responses from all personas");
  log("Generating summary of responses");
  const summary = await generateSummary(question, responses);
  log("Generated summary of responses");
  log("Generating markdown report");
  const reportPath = generateMarkdownReport(question, responses, summary);
  log(`Report generated at ${reportPath}`);
}

runDialectic().catch((err) => log(`Error: ${err}`));
