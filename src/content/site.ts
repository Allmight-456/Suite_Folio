// All copy sourced from handoff/docs/CONTENT.md — edit there first, here second.
import { CertSchema, type Cert } from "./schema";

// Canonical origin. D7: deployed on Netlify at this subdomain; swap to the bought
// domain (ishankumar.dev) when DNS is set, and 301 the old URL. Feeds metadataBase,
// OpenGraph, sitemap, robots and JSON-LD — keep it in sync with the live host.
export const SITE_URL = "https://ishan-kumar.netlify.app";

export const hero = {
  eyebrow: "backend & genai engineer",
  name: "ISHAN KUMAR",
  subline: "bengaluru, india · utc+5:30",
  chipFallback: "▸ currently building — SkillForge",
} as const;

export const nav = [
  { label: "work", href: "/work" },
  // "lab" / off-prod field notes now live in the unified /work index (redundancy
  // cleanup) — deep-link straight to that directory. /lab still 301s here.
  { label: "lab", href: "/work#field-notes" },
  { label: "now", href: "/now" },
  // "the best resume is a git log" — the nav resume points at the GitHub profile
  // (the living résumé). The downloadable PDF still lives at /resume.pdf via the
  // footer for recruiters who want a file.
  { label: "resume", href: "https://github.com/Allmight-456" },
  { label: "contact", href: "#contact" },
] as const;

// Message block (§2). Bold spans rendered in --volt. Tighter than the v1 line:
// two beats (what I ship / what I chase) instead of a feature list, so it earns
// its own section. Stays inside CONTENT.md's facts registry.
type MessagePart = { text: string; volt?: boolean };
export const message: {
  eyebrow: string;
  parts: MessagePart[];
  signature: string;
} = {
  eyebrow: "$ whoami",
  parts: [
    { text: "I ship " },
    { text: "production", volt: true },
    { text: " backends — Go and FastAPI under real rate limits, migrations with " },
    { text: "zero downtime", volt: true },
    { text: ". Then I run the " },
    { text: "agent", volt: true },
    { text: " loops that sit on top of them until they " },
    { text: "break", volt: true },
    { text: " — because that's where the engineering actually is." },
  ],
  signature: "ishan@prod:~$",
};

// whoami boot-sequence (CONTENT.md §1–2). Reuses hero + message copy VERBATIM —
// the terminal is a presentation of the same facts, never a new claim. Rendered
// by components/whoami, which types the commands on scroll-in and reveals output.
export const whoami = {
  prompt: "ishan@prod:~$",
  lines: [
    { kind: "cmd", text: "whoami" },
    { kind: "out", text: `${hero.name.toLowerCase()} · ${hero.eyebrow}` },
    { kind: "cmd", text: "cat role.txt" },
    { kind: "out", parts: message.parts },
  ],
} as const;

// (The two ON/OFF PROD "doors" were replaced by the homepage Journey section —
// components/journey — so experience + work + interests show without a click.)

export const stackMarquee = [
  "Go",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "Azure",
  "LangChain",
  "Claude",
  "Gemini",
  "MCP",
] as const;

export const experience = [
  {
    period: "sept 2025 – present",
    role: "SWE-1 · Rayvector Technologies · Bengaluru",
  },
  { period: "may 2025 – aug 2025", role: "SWE Intern · Rayvector Technologies" },
  { period: "dec 2021 – june 2025", role: "B.Tech CSE · RGIPT" },
] as const;

export const certs: Cert[] = [
  {
    date: "apr 2026",
    issuer: "Google",
    name: "Orchestrate Complex Multi-Agent Workflows",
    id: "#23424455",
  },
  {
    date: "apr 2026",
    issuer: "Databricks",
    name: "AI Agent Fundamentals",
    id: "#178739338",
  },
].map((c) => CertSchema.parse(c));

export const footer = {
  closing: "The best resume is a git log.",
  links: [
    { label: "email", href: "mailto:bhardwajishansingh@gmail.com" },
    { label: "linkedin", href: "https://linkedin.com/in/ishan-kumar-" },
    { label: "github", href: "https://github.com/Allmight-456" },
    { label: "x", href: "https://x.com/kuma10296" },
    // TODO(owner): hashnode URL — not present in CONTENT.md or the GitHub README;
    // facts registry forbids inventing it. Re-add once supplied.
    { label: "resume.pdf", href: "/resume.pdf" },
  ],
  lastLine: "© 2026 ishan kumar · next.js · view source",
} as const;
