// Hall of Fame cards — copy from handoff/docs/CONTENT.md §5, repos from the
// GitHub README. SkillForge repo link intentionally points at the profile until
// repo visibility is confirmed (PROJECT-DEEP-DIVES verification TODO #2).
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
].map((p) => ProjectSchema.parse(p));

export const olderWork = [
  { name: "RepoMaster", href: "https://github.com/Allmight-456" },
  { name: "PDFSage", href: "https://github.com/Allmight-456" },
  { name: "irctc_api_express_postgres", href: "https://github.com/Allmight-456" },
] as const;
