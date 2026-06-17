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
  | "loop"
  | "vector"
  | "scaffold"
  | "editorial"
  | "memory"
  | "harness"
  | "scan";

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
      {kind === "vector" && <Vector />}
      {kind === "scaffold" && <Scaffold />}
      {kind === "editorial" && <Editorial />}
      {kind === "memory" && <Memory />}
      {kind === "harness" && <Harness />}
      {kind === "scan" && <Scan />}
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

/* PDFSage: query → vector space, nearest neighbours highlighted (FAISS/RAG) */
function Vector() {
  const dots = [
    [70, 30], [100, 26], [128, 40],
    [64, 58], [126, 64],
    [74, 90], [104, 92], [132, 86],
  ];
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <circle cx="16" cy="60" r="7" stroke="var(--volt)" />
      <path d="M23 60 H44" className="schematic-line" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" opacity="0.8" />
      ))}
      <g stroke="var(--volt)">
        <circle cx="96" cy="60" r="4" fill="var(--volt)" fillOpacity="0.2" />
        <path
          d="M44 60 H92"
          className="schematic-line"
          style={{ animationDelay: "120ms" }}
        />
        <path
          d="M96 60 L100 26 M96 60 L104 92"
          className="schematic-line"
          style={{ animationDelay: "220ms" }}
          opacity="0.55"
        />
      </g>
    </g>
  );
}

/* RepoMaster: repo → generated scaffolding files (README/Dockerfile/compose) */
function Scaffold() {
  const files = [
    { y: 22, accent: false },
    { y: 52, accent: true },
    { y: 82, accent: false },
  ];
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <rect x="8" y="44" width="34" height="32" rx="2" />
      <path d="M8 54 H42" opacity="0.6" />
      {files.map((f, i) => {
        const col = f.accent ? "var(--volt)" : stroke;
        return (
          <g key={i}>
            <path
              d={`M42 60 C 64 60, 64 ${f.y + 9}, 84 ${f.y + 9}`}
              className="schematic-line"
              style={{ animationDelay: `${i * 120}ms` }}
              opacity="0.6"
            />
            <rect x="84" y={f.y} width="30" height="18" rx="2" stroke={col} />
            <path d={`M89 ${f.y + 6} H104 M89 ${f.y + 11} H100`} stroke={col} opacity="0.7" />
          </g>
        );
      })}
    </g>
  );
}

/* AI_Bubble: an editorial page — heading + text columns (one accent) */
function Editorial() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <rect x="42" y="16" width="76" height="88" rx="3" />
      <rect
        x="54"
        y="28"
        width="38"
        height="7"
        rx="1"
        stroke="var(--volt)"
        fill="var(--volt)"
        fillOpacity="0.18"
      />
      {[48, 58, 68, 78, 88].map((y, i) => (
        <path
          key={y}
          d={`M54 ${y} H${i % 2 ? 98 : 106}`}
          className="schematic-line"
          style={{ animationDelay: `${i * 80}ms` }}
          opacity="0.6"
        />
      ))}
    </g>
  );
}

/* agent-memory: episodic store (cylinder) → procedural cells (accent) */
function Memory() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <g>
        <ellipse cx="40" cy="36" rx="20" ry="6" />
        <path d="M20 36 V78 a20 6 0 0 0 40 0 V36" />
        <path d="M20 57 a20 6 0 0 0 40 0" opacity="0.5" />
      </g>
      <path
        d="M64 58 H90"
        className="schematic-line"
        style={{ animationDelay: "100ms" }}
      />
      <g stroke="var(--volt)">
        <rect x="90" y="38" width="58" height="42" rx="2" />
        {[48, 59, 70].map((y, i) => (
          <path
            key={y}
            d={`M98 ${y} H140`}
            className="schematic-line"
            style={{ animationDelay: `${140 + i * 90}ms` }}
            opacity="0.7"
          />
        ))}
      </g>
    </g>
  );
}

/* harness: input → eval gate (diamond, accent) → pass / fail */
function Harness() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <circle cx="14" cy="60" r="7" />
      <path d="M21 60 H44" className="schematic-line" />
      <path d="M44 60 L70 40 L96 60 L70 80 Z" stroke="var(--volt)" />
      <path
        d="M96 60 H120"
        className="schematic-line"
        style={{ animationDelay: "140ms" }}
      />
      <path
        d="M120 60 L138 44 M120 60 L138 76"
        className="schematic-line"
        style={{ animationDelay: "240ms" }}
        opacity="0.7"
      />
      <circle cx="142" cy="44" r="4" stroke="var(--volt)" />
      <circle cx="142" cy="76" r="4" />
    </g>
  );
}

/* studying / research: a radar sweep over data blips (accent sweep) */
function Scan() {
  return (
    <g stroke={stroke} strokeWidth="1.5">
      <path d="M80 100 A40 40 0 0 1 120 60" opacity="0.4" />
      <path d="M80 100 A28 28 0 0 1 108 72" opacity="0.6" />
      <path d="M80 100 A16 16 0 0 1 96 84" opacity="0.8" />
      <path
        d="M80 100 L118 58"
        stroke="var(--volt)"
        className="schematic-line"
      />
      <circle cx="104" cy="74" r="3" fill="var(--volt)" stroke="var(--volt)" />
      <circle cx="92" cy="86" r="2.5" />
      <circle cx="116" cy="64" r="2.5" />
    </g>
  );
}
