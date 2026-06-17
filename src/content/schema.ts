import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  year: z.number(),
  // "flagship" = full deep-dive page; "older" = lightweight page (summary + links).
  tier: z.enum(["flagship", "older"]).default("flagship"),
  stat: z.string(), // the mono "livery" line, e.g. "~50× token reduction"
  oneLiner: z.string(),
  summary: z.string().optional(), // body for the lightweight (older) page
  wip: z.boolean().default(false),
  repo: z.string().url().optional(),
  live: z.string().url().optional(),
  stack: z.array(z.string()),
});
export type Project = z.infer<typeof ProjectSchema>;

export const LogEntrySchema = z.object({
  tag: z.string(), // 'Building' | 'Running' | ... unknown tags pass through
  emoji: z.string(),
  title: z.string(),
  bodyMd: z.string(),
  links: z.array(z.object({ label: z.string(), href: z.string() })),
});
export type LogEntry = z.infer<typeof LogEntrySchema>;

export const NowLogSchema = z.object({
  entries: z.array(LogEntrySchema),
  fetchedAt: z.string(),
  source: z.string(),
});
export type NowLog = z.infer<typeof NowLogSchema>;

export const FrameSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(), // mono Lando format: `bengaluru, 2025`
  width: z.number(),
  height: z.number(),
});
export type Frame = z.infer<typeof FrameSchema>;

export const CertSchema = z.object({
  date: z.string(),
  issuer: z.string(),
  name: z.string(),
  id: z.string(),
});
export type Cert = z.infer<typeof CertSchema>;

// Skills for the neofetch "stack" card. An item is either a bare name, or an
// object: `detail` (e.g. AWS → its service list) shows as a hover title so the
// card row stays single-line; `niche` flags the standout/depth items, which the
// card renders in the accent (--volt-bright) so the niche stuff is highlighted.
export const SkillItemSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    detail: z.string().optional(),
    niche: z.boolean().optional(),
  }),
]);
export type SkillItem = z.infer<typeof SkillItemSchema>;

export const SkillGroupSchema = z.object({
  label: z.string(),
  items: z.array(SkillItemSchema).min(1),
});
export type SkillGroup = z.infer<typeof SkillGroupSchema>;

// /work "mind" page — curiosity / obsessions / convictions. `evidence.slug` links
// a node to a project page (/work/[slug]) so projects stay woven in, not indexed.
export const MindEvidenceSchema = z.object({ label: z.string(), slug: z.string() });
export const MindItemSchema = z.object({
  name: z.string(),
  detail: z.string(),
  evidence: z.array(MindEvidenceSchema).optional(),
});
export const MindSectionSchema = z.object({
  id: z.enum(["curiosity", "obsessions", "convictions"]),
  label: z.string(), // e.g. "curiosity/"
  descriptor: z.string(), // one-line for the diagram
  command: z.string(), // typed in the terminal
  items: z.array(MindItemSchema).min(1),
});
export type MindSection = z.infer<typeof MindSectionSchema>;
