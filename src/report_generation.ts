import { writeFileSync } from "fs";
import * as path from "path";

export function generateMarkdownReport(
  question: string,
  responses: Record<string, string>,
  summary: string,
): string {
  const timestamp = new Date().toISOString();
  const filename = `report-${timestamp}.md`;
  const reportPath = path.join(process.cwd(), "reports", filename);

  let content = `# Dialectic Report\n\n`;
  content += `**Question:** ${question}\n\n`;
  content += `**Generated on:** ${new Date().toLocaleString()}\n\n---\n\n`;

  for (const [persona, response] of Object.entries(responses)) {
    content += `## Response from ${persona}\n\n${response}\n\n---\n\n`;
  }

  content += `## Summarized Insights\n\n${summary}\n\n`;

  writeFileSync(reportPath, content);

  return reportPath;
}
