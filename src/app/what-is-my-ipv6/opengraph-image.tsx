import { OG_SIZE, renderOgImage } from "@/lib/og";
import { PAGES } from "@/lib/pages";

const page = PAGES["what-is-my-ipv6"];

export const alt = `${page.label}: ${page.blurb}. By Muhammad Ahmad.`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ headline: page.ogHeadline, chips: page.ogChips });
}
