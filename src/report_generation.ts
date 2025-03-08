import { writeFileSync, existsSync, mkdirSync } from "fs";
import * as path from "path";
import { ConversationTurn } from "./conversation.js";
import { log } from "./logger.js";

// Helper function to ensure a directory exists
function ensureDirectoryExists(dirPath: string): void {
  if (!existsSync(dirPath)) {
    try {
      mkdirSync(dirPath, { recursive: true });
      log(`Created directory: ${dirPath}`);
    } catch (error) {
      log(`Error creating directory ${dirPath}: ${error}`);
      throw error;
    }
  }
}

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
    .map(({ speaker, message, respondingTo }, index) => {
      // Just indicate that the speaker is responding, without including the full previous message
      const isResponse = respondingTo !== undefined;
      const responseLine = isResponse
        ? `**${speaker}** *(response #${index + 1})*:\n\n${message}`
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
