import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  year: z.number(),
  stat: z.string(), // the mono "livery" line, e.g. "~50× token reduction"
  oneLiner: z.string(),
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
