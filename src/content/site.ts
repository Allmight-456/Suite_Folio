// All copy sourced from handoff/docs/CONTENT.md — edit there first, here second.
import { CertSchema, type Cert } from "./schema";

export const hero = {
  eyebrow: "backend & genai engineer",
  name: "ISHAN KUMAR",
  subline: "bengaluru, india · utc+5:30",
  chipFallback: "▸ currently building — SkillForge",
} as const;

export const nav = [
  { label: "work", href: "/work" },
  { label: "lab", href: "/lab" },
  { label: "now", href: "/now" },
  { label: "resume", href: "/resume.pdf" },
  { label: "contact", href: "#contact" },
] as const;

// Message block (§2). Bold spans rendered in --volt.
export const message = {
  parts: [
    { text: "I build " },
    { text: "production", volt: true },
    { text: " backends and " },
    { text: "agentic", volt: true },
    {
      text: " systems — FastAPI and Go services for multinational clients, RAG pipelines that survive ",
    },
    { text: "free-tier rate limits", volt: true },
    { text: ", and migrations that ship with " },
    { text: "zero downtime", volt: true },
    {
      text: ". Then I run long-horizon agent infrastructure to study where the loops ",
    },
    { text: "break", volt: true },
    { text: "." },
  ],
  signature: "ishan@prod:~$",
} as const;

export const worlds = [
  {
    title: "ON PROD",
    blurb: "Production systems, migrations, and the constraints they survived.",
    href: "/work",
  },
  {
    title: "OFF PROD",
    blurb: "Agent boxes, evals, experiments — and what breaks at 3am.",
    href: "/lab",
  },
] as const;

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
