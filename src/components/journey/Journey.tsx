"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { experience } from "@/content/site";
import { labBlocks } from "@/content/lab";
import {
  journeyPanels,
  roleBullets,
  headlineProjects,
  type JourneyPanel,
} from "@/content/journey";
import { useJourneyChoreo } from "./useJourneyChoreo";

/**
 * The homepage's pinned horizontal-scroll (owner-directed: replaces the two
 * click-through ON/OFF PROD doors so experience + work + interests are visible
 * without a click). Each panel opens with a shell command, keeping the terminal
 * voice. Desktop pins the section and walks sideways on scroll; mobile,
 * reduced-motion, and no-JS get a plain vertical stack (useJourneyChoreo gate).
 * Panels link into /work and /work/[slug] — the doors' destinations are kept.
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const { pinned, x, progress } = useJourneyChoreo(
    sectionRef,
    journeyPanels.length,
  );

  // Stacked: server render + mobile + reduced-motion. Plain readable sections.
  if (!pinned) {
    return (
      <section
        ref={sectionRef}
        aria-label="Experience, work and interests"
        className="border-y border-volt-dim"
      >
        {journeyPanels.map((panel, i) => (
          <div
            key={panel.id}
            className={`px-6 py-20 md:px-16 ${i > 0 ? "border-t border-volt-dim" : ""}`}
          >
            <div className="mx-auto max-w-4xl">
              <PanelHeader panel={panel} />
              <PanelBody id={panel.id} />
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Pinned: tall outer section, sticky track translated on X by scroll progress.
  return (
    <section
      ref={sectionRef}
      aria-label="Experience, work and interests"
      style={{ height: `${journeyPanels.length * 100}vh` }}
      className="relative border-y border-volt-dim"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {journeyPanels.map((panel) => (
            <div
              key={panel.id}
              className="flex h-full w-screen shrink-0 items-center px-6 md:px-24"
            >
              <div className="mx-auto w-full max-w-4xl">
                <PanelHeader panel={panel} />
                <PanelBody id={panel.id} />
              </div>
            </div>
          ))}
        </motion.div>
        <ProgressDots progress={progress} count={journeyPanels.length} />
      </div>
    </section>
  );
}

function PanelHeader({ panel }: { panel: JourneyPanel }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-sm text-bone-dim">
        <span className="text-volt-bright">ishan@prod:~$</span> {panel.cmd}
      </p>
      <h2 className="font-display mt-3 text-[clamp(1.75rem,5vw,3.5rem)] font-bold tracking-tight text-bone">
        {panel.title}
      </h2>
      <p className="mt-2 max-w-md font-mono text-xs text-bone-dim">
        {panel.blurb}
      </p>
    </div>
  );
}

function PanelBody({ id }: { id: JourneyPanel["id"] }) {
  if (id === "experience") return <ExperienceBody />;
  if (id === "work") return <ShippedBody />;
  if (id === "agentic") return <AgenticBody />;
  return <GoDeeperBody />;
}

function ExperienceBody() {
  return (
    <div className="space-y-8">
      <ol className="space-y-3 font-mono text-sm">
        {experience.map((e) => (
          <li
            key={e.role}
            className="flex flex-col gap-1 md:flex-row md:gap-6"
          >
            <span className="shrink-0 text-bone-dim md:w-48">{e.period}</span>
            <span className="text-bone">{e.role}</span>
          </li>
        ))}
      </ol>
      <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-bone-dim">
        {roleBullets.map((b, i) => (
          <li key={i} className="border-l-2 border-volt-dim pl-4">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShippedBody() {
  return (
    <div className="space-y-5">
      <ul className="space-y-4">
        {headlineProjects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group block border-l-2 border-volt-dim pl-4 transition-colors hover:border-volt"
            >
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-xl text-bone transition-colors group-hover:text-volt">
                  {p.name}
                </span>
                <span className="font-mono text-xs text-volt-bright">
                  {p.stat}
                </span>
                <span className="font-mono text-xs text-bone-dim">
                  · {p.year}
                </span>
              </span>
              <span className="mt-1 block max-w-xl text-sm leading-relaxed text-bone-dim">
                {p.oneLiner}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/work"
        className="inline-block font-mono text-xs text-volt-bright hover:underline"
      >
        ls -la ./work → the full index
      </Link>
    </div>
  );
}

function AgenticBody() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {labBlocks.map((b) => (
        <li key={b.title} className="border-l-2 border-volt-dim pl-4">
          <h3 className="font-display text-lg text-bone">{b.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-bone-dim">{b.body}</p>
        </li>
      ))}
    </ul>
  );
}

function GoDeeperBody() {
  const links = [
    {
      label: "ls -la ./work",
      href: "/work",
      note: "every project, client engagement & field note",
    },
    {
      label: "git log",
      href: "https://github.com/Allmight-456",
      note: "the living résumé",
    },
    { label: "mail -s 'hi'", href: "#contact", note: "start a conversation" },
  ];
  return (
    <ul className="space-y-4 font-mono text-sm">
      {links.map((l) => {
        const external = l.href.startsWith("http");
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group inline-flex flex-col"
            >
              <span className="text-volt-bright group-hover:underline">
                $ {l.label} {external ? "↗" : "→"}
              </span>
              <span className="text-xs text-bone-dim">{l.note}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Decorative progress indicator; the panels themselves carry the content. */
function ProgressDots({
  progress,
  count,
}: {
  progress: MotionValue<number>;
  count: number;
}) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(v * (count - 1)))));
  });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active ? "w-6 bg-volt" : "w-1.5 bg-volt-dim"
          }`}
        />
      ))}
    </div>
  );
}
