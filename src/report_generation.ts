import { writeFileSync, existsSync, mkdirSync } from "fs";
import * as path from "path";
import { ConversationTurn } from "./conversation.js";

export function generateMarkdownReport(
  question: string,
  conversation: ConversationTurn[],
  summary: string,
): string {
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const fileName = `report-${timestamp}.md`;

  const reportDir = path.join(process.cwd(), "reports");

  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, fileName);

  const conversationMarkdown = conversation
    .map(({ speaker, message, respondingTo }) => {
      const responseLine = respondingTo
        ? `**${speaker}** *(responding to ${respondingTo})*:\n\n${message}`
        : `**${speaker}**:\n\n${message}`;
      return `${responseLine}\n\n---\n`;
    })
    .join("\n");

  const content = `
# Dialectic Report (Conversational)

**Question:** ${question}

**Generated on:** ${new Date().toLocaleString()}

---

${conversationMarkdown}

## Summarized Insights

${summary}
`;

  writeFileSync(reportPath, content);
  return reportPath;
}
