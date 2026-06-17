// Hall of Fame cards — copy from handoff/docs/CONTENT.md §5, repos from the
// GitHub README. SkillForge repo link intentionally points at the profile until
// repo visibility is confirmed (PROJECT-DEEP-DIVES verification TODO #2).
import type { SchematicKind } from "@/components/ui/Schematic";
import { ProjectSchema, type Project } from "./schema";

export const projects: Project[] = [
  {
    slug: "skillforge",
    name: "SkillForge",
    year: 2026,
    stat: "~3000 → ~80 tokens (~50×)",
    oneLiner:
      "Procedural memory for AI coding agents — distills LLM bug-fixes into reusable Claude Skill files via AST-based retrieval and human-gated approval.",
    wip: true,
    repo: "https://github.com/Allmight-456",
    stack: ["Python", "AST", "Claude Skills", "MCP", "Multi-agent"],
  },
  {
    slug: "autodocxpdf",
    name: "AutoDocxPdf",
    year: 2025,
    stat: "12 req/min under a 15 RPM ceiling",
    oneLiner:
      "4-agent pipeline that turns any repo into DOCX/PDF documentation — content, screenshots, Mermaid diagrams, assembly. Dockerized; in daily internal use.",
    wip: false,
    repo: "https://github.com/Allmight-456/AutoDocxPdf",
    stack: ["Python", "Gemini API", "Selenium", "Puppeteer", "Docker"],
  },
  {
    slug: "ticketflow",
    name: "TicketFlow",
    year: 2025,
    stat: "0 double-bookings by design",
    oneLiner:
      "Concurrent ticket-booking API in Go — Redis lock + SELECT FOR UPDATE + optimistic version check, immutable audit trail, JWT RBAC.",
    wip: false,
    repo: "https://github.com/Allmight-456/Go_Ticket_booking_app",
    stack: ["Go", "PostgreSQL", "Redis", "JWT", "Docker"],
  },
  {
    slug: "market-research",
    name: "Market Research AI",
    year: 2025,
    stat: "~95% of the research loop automated",
    oneLiner:
      "Multi-agent LangChain pipeline scanning 1000+ data points into company reports and proposals. BYOK model.",
    wip: false,
    repo: "https://github.com/Allmight-456/market-research-catalyst",
    stack: ["Python", "LangChain", "Gemini API", "TypeScript"],
  },
  {
    slug: "ai-bubble",
    name: "AI_Bubble",
    year: 2026,
    stat: "0 dependencies, 1 page, 7 sections",
    oneLiner:
      "A designed editorial knowledge base on AI valuations vs. historical bubbles — vanilla ES modules, print stylesheet, a11y-audited.",
    wip: false,
    repo: "https://github.com/Allmight-456/AI_Bubble",
    live: "https://allmight-456.github.io/AI_Bubble/",
    stack: ["JavaScript", "CSS", "HTML"],
  },
  // Older work — promoted from a dead link-list to real (lightweight) pages.
  // Copy grounded in PROJECT-DEEP-DIVES.md "Older work rail" + research/pdfsage_readme.
  // year is approximate (these predate the 2025 flagships) — owner to verify.
  {
    slug: "pdfsage",
    name: "PDFSage",
    year: 2024,
    tier: "older",
    stat: "FAISS · Gemini Q&A",
    oneLiner:
      "RAG over your PDFs — FAISS vector search + Gemini question-answering.",
    summary:
      "A document Q&A app: upload a PDF/TXT, it chunks and embeds the text with Google Generative AI, stores the vectors in a FAISS index, and answers questions over them via a conversational chain. Streamlit backend, Next.js frontend.",
    repo: "https://github.com/Allmight-456/PDFSage",
    stack: ["Python", "LangChain", "FAISS", "Gemini", "Streamlit", "Next.js"],
  },
  {
    slug: "repomaster",
    name: "RepoMaster",
    year: 2024,
    tier: "older",
    stat: "repo → scaffolding",
    oneLiner:
      "AI scaffolding — generates README, Dockerfile & docker-compose from a repo URL.",
    summary:
      "Point it at a repository and it generates the project scaffolding — README, Dockerfile, docker-compose — from the code it reads. An early take on the 'an agent reads a repo and writes its docs' idea that AutoDocxPdf later matured.",
    repo: "https://github.com/Allmight-456/RepoMaster",
    stack: ["Python", "LLM", "Docker"],
  },
  {
    slug: "irctc",
    name: "irctc-api",
    year: 2024,
    tier: "older",
    stat: "atomic bookings",
    oneLiner:
      "Train-reservation REST API in Express — atomic transactions under concurrent bookings.",
    summary:
      "A train-reservation REST API in Express + PostgreSQL, built to hold up under simultaneous bookings of the same seat via atomic transactions. The first pass at the concurrency problem TicketFlow later solved properly in Go.",
    repo: "https://github.com/Allmight-456/irctc_api_express_postgres",
    stack: ["Node.js", "Express", "PostgreSQL"],
  },
].map((p) => ProjectSchema.parse(p));

export const flagshipProjects = projects.filter((p) => p.tier === "flagship");
export const olderProjects = projects.filter((p) => p.tier === "older");

// Diversified schematic per project (no two share a glyph). Single source of truth
// for the /work/[slug] hero icon (the work tree that also used this was removed).
export const kindForProject: Record<string, SchematicKind> = {
  skillforge: "ast",
  autodocxpdf: "pipeline",
  ticketflow: "lock",
  "market-research": "scan",
  "ai-bubble": "editorial",
  pdfsage: "vector",
  repomaster: "scaffold",
  irctc: "api",
};
