import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { deepDives } from "@/content/deepdives";
import { Schematic, type SchematicKind } from "@/components/ui/Schematic";
import { Reveal } from "@/components/ui/Reveal";
import { SoftwareJsonLd } from "@/components/ui/JsonLd";

const schematicFor: Record<string, SchematicKind> = {
  skillforge: "ast",
  autodocxpdf: "pipeline",
  ticketflow: "lock",
  "market-research": "pipeline",
  "ai-bubble": "ast",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Ishan Kumar`,
    description: project.oneLiner,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const dive = deepDives[slug];
  if (!project || !dive) notFound();

  return (
    <main id="main" className="px-6 pb-32 pt-32 md:px-16">
      <SoftwareJsonLd project={project} />
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#work"
          className="font-mono text-sm text-bone-dim transition-colors hover:text-bone"
        >
          ← work
        </Link>

        {/* Hero: name + year + mono stat strip */}
        <Reveal className="mt-8">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight text-bone">
              {project.name}
            </h1>
            <span className="shrink-0 font-mono text-sm text-bone-dim">
              {project.year}
              {project.wip && <span className="ml-2 text-volt">wip</span>}
            </span>
          </div>
          <p className="mt-2 font-mono text-sm text-volt">{project.stat}</p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center text-bone-dim">
          <Schematic
            kind={schematicFor[slug]}
            className="h-40 w-auto"
            animate
          />
        </Reveal>

        <Section title="The problem">{dive.what}</Section>
        <Section title="The constraint">{dive.constraint}</Section>

        <Reveal className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-wider text-bone-dim">
            What the git log says
          </h2>
          <ul className="mt-4 space-y-2 border-l border-volt-dim pl-5">
            {dive.gitLog.map((line, i) => (
              <li
                key={i}
                className="font-mono text-xs leading-relaxed text-bone-dim"
              >
                <span className="text-volt">$</span> {line}
              </li>
            ))}
          </ul>
        </Reveal>

        <Section title="What I learnt">{dive.learnt}</Section>

        <Reveal className="mt-12 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-volt-dim px-3 py-1 font-mono text-xs text-bone-dim"
            >
              {s}
            </span>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex gap-6 font-mono text-sm">
          {project.repo && (
            <a href={project.repo} className="text-volt hover:underline">
              repo ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} className="text-volt hover:underline">
              live ↗
            </a>
          )}
        </Reveal>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mt-16">
      <h2 className="font-mono text-sm uppercase tracking-wider text-bone-dim">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-bone">{children}</p>
    </Reveal>
  );
}
