import { ImageResponse } from "next/og";

// Default OG image (TECH-ARCHITECTURE §5) in the terminal-pane style.
export const runtime = "edge";
export const alt = "Ishan Kumar — Backend & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tokens inlined (Edge runtime can't read CSS vars) — kept in sync with globals.css.
const INK = "#0a0a0f";
const BONE = "#e8e6e1";
const BONE_DIM = "#8b8a94";
const VOLT = "#5b5bf0";
const PHOSPHOR = "#9be89b";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: INK,
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ color: BONE_DIM, fontSize: 28 }}>
          backend &amp; ai engineer
        </div>
        <div
          style={{
            color: BONE,
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginTop: 12,
          }}
        >
          ISHAN KUMAR
        </div>
        <div style={{ color: BONE_DIM, fontSize: 28, marginTop: 24 }}>
          bengaluru, india · utc+5:30
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            color: PHOSPHOR,
            fontSize: 30,
          }}
        >
          <span style={{ color: BONE_DIM }}>ishan@prod:~$</span>
          <span style={{ marginLeft: 16 }}>tail -f ./now.log</span>
          <span
            style={{
              marginLeft: 8,
              width: 16,
              height: 32,
              background: VOLT,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
