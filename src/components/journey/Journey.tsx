"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { EASE_SITE } from "@/lib/choreo";
import { TerminalCursor, TerminalSpinner } from "@/components/ui/Terminal";
import { experience } from "@/content/site";
import { labBlocks } from "@/content/lab";
import {
  journeyPanels,
  roleBullets,
  headlineProjects,
  type JourneyPanel,
} from "@/content/journey";
import { useJourneyChoreo } from "./useJourneyChoreo";

const PROMPT = "ishan@prod:~$";
const commands = journeyPanels.map((p) => p.cmd);

/**
 * The homepage Journey, run as a terminal session. Desktop pins the section and,
 * as you scroll, runs `clear` then types the next command and reveals its output
 * (reversing on the way back) — see useJourneyChoreo. Mobile / reduced-motion /
 * no-JS get a plain readable terminal stack. Panels link into /work + /work/[slug].
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const { pinned, step, text, typed, outputVisible, cursor, busy, activeDot } =
    useJourneyChoreo(sectionRef, commands);

  // Stacked: server render + mobile + reduced-motion. Every screen, readable.
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
            className={`px-6 py-16 md:px-16 ${i > 0 ? "border-t border-volt-dim" : ""}`}
          >
            <div className="mx-auto max-w-4xl">
              <p className="font-mono text-sm text-bone">
                <span className="text-volt-bright">{PROMPT}</span> {panel.cmd}
              </p>
              <Caption panel={panel} />
              <div className="mt-5">
                <PanelBody id={panel.id} />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Pinned: one terminal window; scroll runs the commands.
  const panel = journeyPanels[step];
  const shown = text.slice(0, typed); // characters revealed so far (typewriter)
  return (
    <section
      ref={sectionRef}
      aria-label="Experience, work and interests"
      style={{ height: `${journeyPanels.length * 100}vh` }}
      className="relative border-y border-volt-dim"
    >
      <div className="sticky top-0 flex h-screen items-center px-6 md:px-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="overflow-hidden rounded-lg border border-volt-dim shadow-2xl">
            <div className="flex items-center gap-2 border-b border-volt-dim bg-ink-raise px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-volt-dim" />
              <span className="h-3 w-3 rounded-full bg-volt-dim" />
              <span className="h-3 w-3 rounded-full bg-volt-dim" />
              <span className="ml-3 truncate font-mono text-xs text-bone-dim">
                {PROMPT} {shown}
              </span>
            </div>

            <div className="min-h-[460px] bg-ink-raise p-6 md:p-10">
              <p className="font-mono text-sm text-bone">
                <span className="text-volt-bright">{PROMPT}</span> {shown}
                {cursor && <TerminalCursor />}
              </p>

              <motion.div
                initial={false}
                animate={
                  outputVisible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 10, filter: "blur(3px)" }
                }
                transition={{ duration: 0.42, ease: EASE_SITE }}
                className="mt-6"
              >
                <Caption panel={panel} />
                <div className="mt-5">
                  <PanelBody id={panel.id} />
                </div>
              </motion.div>
            </div>

            <StatusBar
              tags={journeyPanels.map((p) => p.tag)}
              active={activeDot}
              total={journeyPanels.length}
              busy={busy}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Caption({ panel }: { panel: JourneyPanel }) {
  return (
    <p className="font-mono text-xs leading-relaxed text-bone-dim">
      <span className="text-volt-bright"># </span>
      <span className="text-bone">{panel.title}</span> — {panel.blurb}
    </p>
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
    <div className="space-y-6">
      <ol className="space-y-2.5 font-mono text-sm">
        {experience.map((e) => (
          <li key={e.role} className="flex flex-col gap-1 md:flex-row md:gap-6">
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
        whoami --deep → what pulls me
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
      label: "whoami --deep",
      href: "/work",
      note: "what pulls me — curiosities, obsessions & convictions",
    },
    {
      label: "git log",
      href: "https://github.com/Allmight-456",
      note: "the living résumé — every repo",
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

/**
 * tmux/Claude-Code-style status line at the foot of the window (replaces the old
 * floating dots — owner wanted something more intuitive + "terminally"). Left: a
 * Claude-Code spinner while a command runs, else a ready marker. Right: the
 * command breadcrumb with the active one lit, plus a [n/total] counter.
 */
function StatusBar({
  tags,
  active,
  total,
  busy,
}: {
  tags: readonly string[];
  active: number;
  total: number;
  busy: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-volt-dim bg-ink px-4 py-2.5 font-mono text-[11px]">
      <span className="flex min-w-[7rem] items-center gap-2">
        {busy ? (
          <TerminalSpinner />
        ) : (
          <>
            <span className="text-volt-bright">▸</span>
            <span className="text-bone-dim">ready</span>
          </>
        )}
      </span>
      <span aria-hidden="true" className="flex items-center gap-2.5">
        {tags.map((t, i) => (
          <span
            key={t}
            className={
              i === active
                ? "text-volt-bright"
                : "text-bone-dim/40 transition-colors"
            }
          >
            {t}
          </span>
        ))}
        <span className="ml-1 rounded bg-volt-dim/40 px-1.5 py-0.5 text-bone-dim">
          {active + 1}/{total}
        </span>
      </span>
    </div>
  );
}
