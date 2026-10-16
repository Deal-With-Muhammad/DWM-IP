import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// PNG home-screen icon for iOS, drawn from public/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Read at module scope so the icon is prerendered (see src/lib/og.tsx).
const svg = await readFile(join(process.cwd(), "public/icon.svg"));

export default function AppleIcon() {
  return new ImageResponse(
    <img src={`data:image/svg+xml;base64,${svg.toString("base64")}`} width={180} height={180} alt="" />,
    size,
  );
}
