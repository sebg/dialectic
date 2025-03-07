import { writeFileSync } from "fs";
import * as path from "path";

type PersonaResponse = {
  name: string;
  response: string;
};

export function generateMarkdownReport(
  question: string,
  responses: PersonaResponse[],
  summary: string,
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `report-${timestamp}.md`;
  const filePath = path.join(process.cwd(), "reports", fileName);

  const formattedResponses = responses
    .map(
      ({ name, response }) => `
## Response from ${name}

${response}

---`,
    )
    .join("\n");

  const content = `
# Dialectic Report

**Question:** ${question}

**Generated on:** ${new Date().toLocaleString()}

---

${formattedResponses}

## Summarized Insights

${summary}
`;

  writeFileSync(filePath, content.trim());
  return filePath;
}
