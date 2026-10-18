import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// PNG home-screen icon for iOS, drawn from public/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Read at module scope so the icon is prerendered (see src/lib/og.tsx).
// iOS rounds the corners itself, so draw the tile full-bleed (transparent corners turn black there).
const svg = (await readFile(join(process.cwd(), "public/icon.svg"), "utf8")).replace('rx="112"', 'rx="0"');

export default function AppleIcon() {
  return new ImageResponse(
    <img
      src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`}
      width={180}
      height={180}
      alt=""
    />,
    size,
  );
}
