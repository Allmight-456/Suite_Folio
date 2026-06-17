// Skills for the terminal "skill --all" card. Owner-supplied list, sharpened and
// enriched from the GitHub README knowledge base (src/lib/__fixtures__) and the
// project deep-dives — curated, not exhaustive. `niche: true` flags the standout /
// depth items, which the card paints in the accent so the niche stuff is what
// catches the eye. `detail` adds a hover breakdown. Mirrored in CONTENT.md §8.
import { SkillGroupSchema, type SkillGroup } from "./schema";

export const skills: SkillGroup[] = [
  {
    label: "languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", { name: "Go", niche: true }],
  },
  {
    label: "frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML/CSS",
      { name: "accessibility", detail: "a11y · reduced-motion · semantic", niche: true },
    ],
  },
  {
    label: "backend & apis",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "GraphQL",
      { name: "REST design", detail: "versioning · pagination · idempotency", niche: true },
      { name: "Clean Architecture", niche: true },
      "JWT · RBAC",
      {
        name: "distributed locking",
        detail: "Redis lock · SELECT FOR UPDATE · optimistic version",
        niche: true,
      },
      { name: "rate limiting", detail: "sliding-window · Redis + Lua", niche: true },
      "multi-tenancy",
    ],
  },
  {
    label: "cloud & devops",
    items: [
      { name: "AWS", detail: "EC2 · Lambda · S3 · IAM · API Gateway · CloudWatch" },
      { name: "Azure", detail: "VM · Blob Storage · Flexible Server" },
      "Docker",
      { name: "multi-stage builds", niche: true },
      "Nginx",
      "CI/CD",
      "Linux",
    ],
  },
  {
    label: "databases & caching",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Firebase Firestore",
      { name: "Redis", detail: "caching · pub/sub · rate limiting" },
      { name: "vector search", detail: "FAISS", niche: true },
      { name: "indexing & query tuning", niche: true },
      { name: "JSONB", niche: true },
    ],
  },
  {
    label: "ai / ml",
    items: [
      { name: "RAG pipelines", niche: true },
      "LangChain",
      { name: "multi-agent orchestration", niche: true },
      { name: "AST-based retrieval", niche: true },
      { name: "procedural & episodic memory", detail: "SkillForge · mem0", niche: true },
      { name: "MCP", detail: "Model Context Protocol", niche: true },
      { name: "Claude Skills", niche: true },
      { name: "tree retrieval", detail: "PageIndex · agentic RAG", niche: true },
      { name: "evals & guardrails", niche: true },
      "Gemini API",
      "OpenAI API",
    ],
  },
  {
    label: "security & quality",
    items: [
      "secure coding",
      { name: "authN / authZ", niche: true },
      "secrets management",
      "unit & integration testing",
      "Jest",
      "Pytest",
      "Git",
    ],
  },
  {
    label: "tooling",
    items: [
      "Git",
      "Postman",
      { name: "Repomix", niche: true },
      "Puppeteer",
      "Selenium",
      { name: "mermaid-cli", niche: true },
      { name: "Claude Code", niche: true },
      "Cursor",
    ],
  },
].map((g) => SkillGroupSchema.parse(g));
