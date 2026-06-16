/**
 * System schematics — the engineer's equivalent of Lando's helmet liveries
 * (DESIGN-SPEC §3.5). Pure SVG line-art in tokens (currentColor = caller's
 * text color; --volt accents). Server-renderable, no JS. `animate` enables the
 * Hall-of-Fame hover state (D4-A: static → animated SVG) via CSS classes.
 */
export type SchematicKind =
  | "pipeline"
  | "lock"
  | "ast"
  | "api"
  | "migration"
  | "deploy"
  | "loop";

const stroke = "currentColor";

export function Schematic({
  kind,
  className,
  animate = false,
}: {
  kind: SchematicKind;
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      className={className}
      role="img"
      aria-hidden="true"
      data-animate={animate}
    >
      {kind === "pipeline" && <Pipeline />}
      {kind === "lock" && <Lock />}
      {kind === "ast" && <Ast />}
      {kind === "api" && <Api />}
      {kind === "migration" && <Migration />}
      {kind === "deploy" && <Deploy />}
      {kind === "loop" && <Loop />}
    </svg>
  );
}

/* AutoDocxPdf: orchestrator → 4 agents → assembler */
function Pipeline() {
  const agents = [
    { y: 18, label: "doc" },
    { y: 44, label: "shot" },
    { y: 70, label: "mmd" },
    { y: 96, label: "asm" },
  ];
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <rect x="6" y="50" width="22" height="20" rx="2" />
      {agents.map((a, i) => (
        <g key={a.label}>
          <path
            d={`M28 60 C 44 60, 44 ${a.y + 7}, 60 ${a.y + 7}`}
            opacity="0.6"
            className="schematic-line"
            style={{ animationDelay: `${i * 120}ms` }}
          />
          <rect x="60" y={a.y} width="34" height="14" rx="2" />
          <path
            d={`M94 ${a.y + 7} C 110 ${a.y + 7}, 110 60, 126 60`}
            opacity="0.6"
            className="schematic-line"
            style={{ animationDelay: `${i * 120 + 60}ms` }}
          />
        </g>
      ))}
      <rect
        x="126"
        y="50"
        width="26"
        height="20"
        rx="2"
        stroke="var(--volt)"
      />
    </g>
  );
}

/* TicketFlow: request → [redis lock · FOR UPDATE · version] → commit */
function Lock() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <circle cx="16" cy="60" r="8" />
      <path d="M24 60 H44" className="schematic-line" />
      {[
        { x: 44, label: "lock" },
        { x: 80, label: "forUpd" },
        { x: 116, label: "ver" },
      ].map((b, i) => (
        <rect
          key={b.label}
          x={b.x}
          y="48"
          width="28"
          height="24"
          rx="2"
          stroke={i === 2 ? "var(--volt)" : stroke}
          className="schematic-line"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
      <path d="M72 60 H80 M108 60 H116" className="schematic-line" />
    </g>
  );
}

/* Client API: request → service → datastore (plot-management / voting APIs) */
function Api() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <circle cx="14" cy="60" r="7" />
      <path d="M21 60 H50" className="schematic-line" />
      <rect x="50" y="48" width="34" height="24" rx="2" />
      <path
        d="M84 60 H110"
        className="schematic-line"
        style={{ animationDelay: "120ms" }}
      />
      <g stroke="var(--volt)">
        <ellipse cx="130" cy="48" rx="14" ry="5" />
        <path d="M116 48 V72 a14 5 0 0 0 28 0 V48" />
      </g>
    </g>
  );
}

/* Zero-downtime migration: old store → new store (Firebase → Postgres) */
function Migration() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <rect x="10" y="44" width="40" height="32" rx="2" />
      <path d="M55 60 H104" className="schematic-line" />
      <path d="M97 53 L106 60 L97 67" className="schematic-line" />
      <rect
        x="110"
        y="44"
        width="40"
        height="32"
        rx="2"
        stroke="var(--volt)"
      />
    </g>
  );
}

/* Deploy: nginx → VM running containers (Azure VM, two environments) */
function Deploy() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <rect x="6" y="50" width="24" height="20" rx="2" />
      <path d="M30 60 H52" className="schematic-line" />
      <rect x="52" y="34" width="100" height="52" rx="3" opacity="0.8" />
      {[
        [64, 44],
        [64, 64],
        [110, 44],
        [110, 64],
      ].map(([x, y], i) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="32"
          height="12"
          rx="2"
          stroke={i === 0 ? "var(--volt)" : stroke}
          className="schematic-line"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </g>
  );
}

/* Agent loop: a self-feeding cycle with a watched node (field notes) */
function Loop() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <path
        d="M80 30 A30 30 0 1 1 53 47"
        className="schematic-line"
        opacity="0.7"
      />
      <path d="M53 47 L49 38 L60 41 Z" fill={stroke} stroke="none" />
      <circle
        cx="80"
        cy="60"
        r="9"
        stroke="var(--volt)"
        fill="var(--volt)"
        fillOpacity="0.15"
      />
    </g>
  );
}

/* SkillForge: AST tree → indexed skill node */
function Ast() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <circle cx="80" cy="18" r="6" />
      <path d="M80 24 L48 46 M80 24 L112 46" className="schematic-line" />
      <circle cx="48" cy="52" r="6" />
      <circle cx="112" cy="52" r="6" />
      <path
        d="M48 58 L32 84 M48 58 L64 84 M112 58 L96 84 M112 58 L128 84"
        className="schematic-line"
        style={{ animationDelay: "120ms" }}
      />
      {[32, 64, 96].map((x) => (
        <circle key={x} cx={x} cy="90" r="5" />
      ))}
      <circle cx="128" cy="90" r="6" stroke="var(--volt)" fill="var(--volt)" fillOpacity="0.15" />
    </g>
  );
}
