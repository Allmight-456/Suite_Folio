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
  roleHighlights,
  careerMark,
  headlineProjects,
  type JourneyPanel,
} from "@/content/journey";
import { useJourneyChoreo } from "./useJourneyChoreo";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { PixelLogo } from "@/components/ui/PixelLogo";

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
        id="career"
        aria-label="Experience, work and interests"
        className="rule-top rule-bottom scroll-mt-20"
      >
        {journeyPanels.map((panel, i) => (
          <div
            key={panel.id}
            className={`px-6 py-16 md:px-16 ${i > 0 ? "border-t border-volt-dim/40" : ""}`}
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
      id="career"
      aria-label="Experience, work and interests"
      style={{ height: `${journeyPanels.length * 100}vh` }}
      className="rule-top rule-bottom relative"
    >
      {/* svh (not vh) so mobile browser chrome doesn't push the window off-screen.
          The window is capped to the viewport and its BODY scrolls: previously a
          fixed min-h-[460px] + padding overflowed the pane on short laptops and
          landscape tablets, hiding the status bar (owner, 2026-08-14). */}
      <div className="sticky top-0 flex h-svh items-center px-4 py-6 sm:px-6 md:px-16">
        <div className="mx-auto flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-volt-dim shadow-2xl">
          <WindowChrome label={`${PROMPT} ${shown}`} />

          <div className="min-h-0 flex-1 overflow-y-auto bg-ink-raise p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="min-h-[min(24rem,42svh)]">
              <p className="font-mono text-xs text-bone sm:text-sm">
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
                className="mt-5 md:mt-6"
              >
                <Caption panel={panel} />
                <div className="mt-4 md:mt-5">
                  <PanelBody id={panel.id} />
                </div>
              </motion.div>
            </div>
          </div>

          <StatusBar
            tags={journeyPanels.map((p) => p.tag)}
            active={activeDot}
            total={journeyPanels.length}
            busy={busy}
          />
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

/**
 * Career panel. Two beats: the role cards (a one-line hook each, then scannable
 * fragments) and then the full timeline underneath. Cards first because nobody
 * reads seven sentences of bullets — the summary is what has to land.
 *
 * The Emergent mark is a rail down the LEFT of both cards, vertically centred
 * against the pair (owner, 2026-08-15) rather than aligned to its own card — it
 * anchors the block the way the pixel robot anchors the skills window.
 */
function ExperienceBody() {
  return (
    <div className="space-y-7">
      <div className="grid gap-x-5 sm:grid-cols-[3.75rem_1fr]">
        <div className="hidden items-center justify-center sm:flex">
          <PixelLogo
            kind={careerMark.kind}
            size={0.375}
            label={`${careerMark.label} logo`}
          />
        </div>

        <div className="space-y-4">
          {roleHighlights.map((group) => (
            <div key={group.at}>
              <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-xs">
                <span className="uppercase tracking-wider text-volt-bright">
                  {group.at}
                </span>
                <span className="text-bone-dim">{group.period}</span>
              </p>
              <p className="mt-1.5 max-w-2xl text-balance text-base leading-snug text-bone md:text-lg">
                {group.summary}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-bone-dim md:text-xs">
                {group.bullets.map((b, i) => (
                  <li key={b} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-volt-dim">
                        ·
                      </span>
                    )}
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ol className="space-y-1.5 border-t border-volt-dim/40 pt-5 font-mono text-xs md:text-sm">
        {experience.map((e) => (
          <li key={e.role} className="flex flex-col gap-0.5 md:flex-row md:gap-6">
            <span className="shrink-0 text-bone-dim md:w-44">{e.period}</span>
            <span className="text-bone">{e.role}</span>
          </li>
        ))}
      </ol>
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
              {p.context && (
                <span className="mt-1.5 flex items-center gap-2 font-mono text-xs text-bone-dim/70">
                  {/* 0.19 is the floor: below ~3px per cell the OpenAI knot
                      loses its lobes and reads as a smudge. */}
                  {p.brand && <PixelLogo kind={p.brand} size={0.19} />}
                  {p.context}
                </span>
              )}
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
    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-volt-dim bg-ink px-3 py-2 font-mono text-[10px] sm:px-4 sm:py-2.5 sm:text-[11px]">
      <span className="flex min-w-0 shrink items-center gap-2 sm:min-w-[7rem]">
        {busy ? (
          <TerminalSpinner />
        ) : (
          <>
            <span className="text-volt-bright">▸</span>
            <span className="truncate text-bone-dim">ready</span>
          </>
        )}
      </span>
      <span aria-hidden="true" className="flex shrink-0 items-center gap-2.5">
        {/* Breadcrumbs are the first thing to go on a narrow pane — the counter
            already carries the position, so the row never wraps or clips. */}
        {tags.map((t, i) => (
          <span
            key={t}
            className={`hidden lg:inline ${
              i === active
                ? "text-volt-bright"
                : "text-bone-dim/40 transition-colors"
            }`}
          >
            {t}
          </span>
        ))}
        <span className="rounded bg-volt-dim/40 px-1.5 py-0.5 text-bone-dim">
          {active + 1}/{total}
        </span>
      </span>
    </div>
  );
}
