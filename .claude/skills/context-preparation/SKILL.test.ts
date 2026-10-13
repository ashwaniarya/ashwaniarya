import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guards for the `context-preparation` skill so an agent can always trigger it:
 * valid frontmatter, every bundled file it points at exists, and the helper
 * script actually runs. Lives next to the skill per the repo rulebook
 * ("a unit test should be localised to the same directory where code is written").
 */
const skillDirectoryPath = path.resolve(__dirname);
const skillMarkdownPath = path.join(skillDirectoryPath, "SKILL.md");
const contextBriefTemplatePath = path.join(
  skillDirectoryPath,
  "references",
  "context-brief-template.md",
);
const collectRepoContextScriptPath = path.join(
  skillDirectoryPath,
  "scripts",
  "collect-repo-context.sh",
);
const evalsPath = path.join(skillDirectoryPath, "evals", "evals.json");

const maximumSkillMarkdownLineCount = 500;

/** Sections the SKILL.md promises every Context Brief will carry. */
const requiredContextBriefSectionHeadings = [
  "## Task",
  "## Ground truth read",
  "## Blast radius",
  "## Conventions that apply",
  "## History and rationale",
  "## Environment and verification",
  "## Diagrams",
  "## Open questions",
  "## TDD handoff",
];

function readSkillMarkdown(): string {
  return readFileSync(skillMarkdownPath, "utf8");
}

function parseFrontmatter(markdown: string): Record<string, string> {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch) {
    return {};
  }
  const frontmatterFields: Record<string, string> = {};
  for (const line of frontmatterMatch[1].split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    frontmatterFields[key] = value;
  }
  return frontmatterFields;
}

describe("context-preparation skill frontmatter", () => {
  it("has a name that matches its directory so the skill resolves", () => {
    const frontmatter = parseFrontmatter(readSkillMarkdown());
    expect(frontmatter.name).toBe(path.basename(skillDirectoryPath));
  });

  it("has a description that names the trigger phrases an agent will see", () => {
    const frontmatter = parseFrontmatter(readSkillMarkdown());
    expect(frontmatter.description).toBeDefined();
    expect(frontmatter.description.length).toBeGreaterThan(80);
    expect(frontmatter.description.toLowerCase()).toContain("context");
    expect(frontmatter.description.toLowerCase()).toContain("before");
  });

  it("stays within the progressive-disclosure budget", () => {
    const lineCount = readSkillMarkdown().split("\n").length;
    expect(lineCount).toBeLessThanOrEqual(maximumSkillMarkdownLineCount);
  });
});

describe("context-preparation skill bundled resources", () => {
  it("ships the Context Brief template the SKILL.md points at", () => {
    expect(existsSync(contextBriefTemplatePath)).toBe(true);
    expect(readSkillMarkdown()).toContain("references/context-brief-template.md");
  });

  it("template carries every section the skill promises", () => {
    const template = readFileSync(contextBriefTemplatePath, "utf8");
    for (const heading of requiredContextBriefSectionHeadings) {
      expect(template).toContain(heading);
    }
  });

  it("ships an executable repo-context collector script", () => {
    expect(existsSync(collectRepoContextScriptPath)).toBe(true);
    const ownerExecuteBit = 0o100;
    expect(statSync(collectRepoContextScriptPath).mode & ownerExecuteBit).toBe(
      ownerExecuteBit,
    );
    expect(readSkillMarkdown()).toContain("scripts/collect-repo-context.sh");
  });

  it("ships eval prompts so the skill can be re-tested", () => {
    const evals = JSON.parse(readFileSync(evalsPath, "utf8")) as {
      skill_name: string;
      evals: Array<{ id: number; prompt: string }>;
    };
    expect(evals.skill_name).toBe("context-preparation");
    expect(evals.evals.length).toBeGreaterThanOrEqual(2);
  });
});

describe("collect-repo-context.sh", () => {
  it("prints every snapshot section and the keyword matches it was given", () => {
    const repositoryRootPath = path.resolve(skillDirectoryPath, "../../..");
    const output = execFileSync(
      "bash",
      [collectRepoContextScriptPath, "SiteHeader"],
      { cwd: repositoryRootPath, encoding: "utf8" },
    );
    for (const sectionHeading of [
      "== Branch and recent history ==",
      "== Package scripts ==",
      "== Ground-truth documents ==",
      "== Source map ==",
      "== Test inventory ==",
      "== Environment ==",
      "== Keyword matches ==",
    ]) {
      expect(output).toContain(sectionHeading);
    }
    expect(output).toContain("app/components/layout/SiteHeader.tsx");
  });
});
