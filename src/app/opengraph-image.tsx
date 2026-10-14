import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

// Social share card (also used for twitter:image). Generated at build time.

export const alt = `${site.name}: ${site.tagline}. By Muhammad Ahmad.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Mixes a hex colour with white (amount 0–1), since the image renderer has no color-mix(). */
function tint(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(n >> 16)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`;
}

export default async function OpengraphImage() {
  const [medium, semibold, icon] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/icon.svg")),
  ]);
  const iconSrc = `data:image/svg+xml;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#0d1015",
        backgroundImage: `radial-gradient(circle at 18% -10%, ${site.color}66 0%, transparent 55%), radial-gradient(circle at 100% 110%, ${site.color}33 0%, transparent 50%)`,
        color: "#ffffff",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <img src={iconSrc} width={76} height={76} alt="" style={{ borderRadius: 20 }} />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, letterSpacing: -0.5 }}>{site.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 600, letterSpacing: -2, lineHeight: 1.08 }}>
          {site.ogHeadline[0]}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            letterSpacing: -2,
            lineHeight: 1.08,
            color: tint(site.color, 0.45),
          }}
        >
          {site.ogHeadline[1]}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
          {site.ogChips.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.16)",
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "#d4d8e0",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          fontWeight: 500,
          color: "#9aa3b2",
        }}
      >
        <div style={{ display: "flex" }}>by Muhammad Ahmad · dealwithmuhammad.com</div>
        <div style={{ display: "flex", color: "#e5e7eb" }}>{site.host}</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
