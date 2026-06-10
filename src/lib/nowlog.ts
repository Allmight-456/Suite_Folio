import { NowLogSchema, type LogEntry, type NowLog } from "@/content/schema";
import fallback from "@/content/nowlog.fallback.json";

const README_URL =
  "https://raw.githubusercontent.com/Allmight-456/Allmight-456/main/README.md";

/**
 * Parse the `$ tail -f ./now.log` section of the GitHub profile README.
 * Real format (snapshot: src/lib/__fixtures__/readme-2026-06-10.md):
 *
 *   ```bash
 *   $ tail -f ./now.log
 *   ```
 *   > intro blockquote
 *   <details><summary><b>🛠️  Building — Title…</b></summary> body </details>
 *   …repeated, until the next ```bash fence.
 *
 * Defensive: unknown tags pass through; any parse failure falls back to the
 * last-good snapshot committed at src/content/nowlog.fallback.json.
 */
export function parseNowLog(markdown: string): LogEntry[] {
  const start = markdown.indexOf("$ tail -f ./now.log");
  if (start === -1) throw new Error("now.log heading not found");
  const afterStart = markdown.indexOf("```", start) + 3;
  const end = markdown.indexOf("```bash", afterStart);
  const section = markdown.slice(afterStart, end === -1 ? undefined : end);

  const entries: LogEntry[] = [];
  const detailsRe =
    /<details>\s*<summary><b>([\s\S]*?)<\/b><\/summary>([\s\S]*?)<\/details>/g;
  for (const m of section.matchAll(detailsRe)) {
    const summary = m[1].trim();
    const bodyMd = m[2].trim();

    // summary shape: "🛠️  Building — SkillForge: agents that …"
    const dash = summary.indexOf("—");
    const head = dash === -1 ? summary : summary.slice(0, dash).trim();
    const title = dash === -1 ? "" : summary.slice(dash + 1).trim();
    // head = "🛠️  Building" → emoji (non-word leading cluster) + tag
    const headMatch = head.match(/^(\S+)\s+(.*)$/);
    const emoji = headMatch ? headMatch[1] : "";
    const tag = headMatch ? headMatch[2].trim() : head;

    const links: { label: string; href: string }[] = [];
    for (const lm of bodyMd.matchAll(/\[([^\]]+)\]\((https?:[^)]+)\)/g)) {
      links.push({ label: lm[1], href: lm[2] });
    }

    entries.push({ tag, emoji, title, bodyMd, links });
  }

  if (entries.length === 0) throw new Error("now.log parsed to zero entries");
  return entries;
}

export async function getNowLog(): Promise<NowLog> {
  try {
    const res = await fetch(README_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`README fetch ${res.status}`);
    const entries = parseNowLog(await res.text());
    return NowLogSchema.parse({
      entries,
      fetchedAt: new Date().toISOString(),
      source: "github.com/Allmight-456",
    });
  } catch {
    return NowLogSchema.parse(fallback);
  }
}

/** Hero chip: first Building entry's title, fallback chain per TECH-ARCHITECTURE §3. */
export async function getHeroChip(): Promise<string> {
  const log = await getNowLog();
  const building = log.entries.find((e) => /building/i.test(e.tag));
  if (!building) return "▸ currently building — SkillForge";
  // titles read like "SkillForge: agents that auto-detect their own skills"
  const short = building.title.split(":")[0].trim();
  return `▸ currently building — ${short || "SkillForge"}`;
}
