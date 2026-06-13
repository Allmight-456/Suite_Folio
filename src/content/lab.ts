// /lab content (CONTENT.md §7) — present-tense, honestly hedged. Single
// curated page (DECISIONS D5-A); writing links out to Hashnode/LinkedIn/X.
export const labBlocks = [
  {
    title: "Agent boxes",
    body: "Hermes & OpenClaw, self-hosted on a Hostinger VPS, kept alive to watch where production-grade agent loops degrade: tool-loop convergence, memory bleed across runs, behavior under sustained load. Notes feed back into SkillForge.",
  },
  {
    title: "Harness engineering",
    body: "Wiring guardrails and evals into the LLM workflow, not bolting them on after. Open question: pre-tool, post-tool, or a separate critic agent?",
  },
  {
    title: "Memory",
    body: "mem0 (episodic, vector-backed) vs SkillForge (procedural, AST-indexed): two halves of the same problem.",
  },
  {
    title: "Retrieval",
    body: "PageIndex and tree-structured retrieval; moving past vector-only RAG.",
  },
] as const;

// TODO(owner): Hashnode handle not in any source doc (README says only
// "cross-posted to LinkedIn and X"). Add the Hashnode link once supplied.
export const writingLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ishan-kumar-" },
  { label: "X", href: "https://x.com/kuma10296" },
] as const;
