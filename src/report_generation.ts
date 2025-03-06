import * as fs from "fs";
import * as path from "path";
import { log } from "./logger.js";

export function generateMarkdownReport(
  question: string,
  responses: Record<string, string>,
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `./reports/report-${timestamp}.md`;

  let markdown = `# Dialectic Report\n\n`;
  markdown += `**Question:** ${question}\n\n`;
  markdown += `**Generated on:** ${new Date().toLocaleString()}\n\n`;
  markdown += `---\n\n`;

  for (const [persona, response] of Object.entries(responses)) {
    markdown += `## Response from ${persona}\n\n${responses[persona]}\n\n---\n\n`;
  }

  fs.writeFileSync(filename, markdown);
  log(`Report generated at ${filename}`);
}
