import { askAllPersonas } from "./ai.js";
import { log } from "./logger.js";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: npm run start <model> <question>");
  console.error(
    "Example: npm run start openai 'What do experts think about AI regulation?'",
  );
  process.exit(1);
}

const modelProvider = args[0]; // "openai", "anthropic", or "google"
const question = args.slice(1).join(" "); // The question to ask

askAllPersonas(modelProvider, question)
  .then(() => {
    log("Successfully queried all personas.");
  })
  .catch((err) => {
    log(`Error:: ${err}.`);
  });
