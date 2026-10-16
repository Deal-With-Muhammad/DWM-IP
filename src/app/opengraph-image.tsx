import { OG_SIZE, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

// Social share card (also used for twitter:image). Generated at build time.

export const alt = `${site.name}: ${site.tagline}. By Muhammad Ahmad.`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage();
}
