// Contract test (TECH-ARCHITECTURE §3): pins the README snapshot so format
// drift breaks CI, not production. Refresh the fixture when the README evolves.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseNowLog } from "./nowlog";

const fixture = readFileSync(
  join(__dirname, "__fixtures__", "readme-2026-06-10.md"),
  "utf8",
);

describe("parseNowLog", () => {
  it("parses every <details> entry in the now.log section", () => {
    const entries = parseNowLog(fixture);
    expect(entries.length).toBe(7);
  });

  it("extracts tag, emoji, and title from the summary line", () => {
    const [first] = parseNowLog(fixture);
    expect(first.tag).toBe("Building");
    expect(first.emoji).toBe("🛠️");
    expect(first.title).toMatch(/^SkillForge/);
  });

  it("collects markdown links from entry bodies", () => {
    const entries = parseNowLog(fixture);
    const memory = entries.find((e) => /memory/i.test(e.tag));
    expect(memory?.links.some((l) => l.href.includes("mem0"))).toBe(true);
  });

  it("does not leak project-table content past the section end", () => {
    const entries = parseNowLog(fixture);
    for (const e of entries) {
      expect(e.bodyMd).not.toContain("ls ./projects");
    }
  });

  it("throws on unrecognizable input (caller falls back to snapshot)", () => {
    expect(() => parseNowLog("# empty readme")).toThrow();
  });
});
