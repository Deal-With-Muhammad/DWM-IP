// Shared across every DWM tool. The live app launcher (the 9-dot menu) is
// served by the portfolio at https://www.dealwithmuhammad.com/dwm-apps.js, so a
// new tool shows up everywhere without redeploying the others. This static list
// only feeds the server-rendered "More free tools" footer links, which search
// engines can crawl.

export const DWM_ORIGIN = process.env.NEXT_PUBLIC_DWM_ORIGIN || "https://www.dealwithmuhammad.com";

export const AUTHOR = {
  name: "Muhammad Ahmad",
  url: "https://www.dealwithmuhammad.com",
  email: "me@dealwithmuhammad.com",
  jobTitle: "Web & Mobile App Developer",
  location: "Kuala Lumpur, Malaysia",
  github: "https://github.com/Deal-With-Muhammad",
  linkedin: "https://www.linkedin.com/in/muhammad-ahmad-7009b8248/",
  instagram: "https://www.instagram.com/dealwithmuhammad/",
  whatsapp: "https://wa.me/601139865270",
};

export type ToolId = "downloader" | "compressor" | "qr" | "bgremove" | "ip" | "emailcheck" | "progress";

export const TOOLS: { id: ToolId; name: string; url: string; blurb: string }[] = [
  {
    id: "downloader",
    name: "DWM Downloader",
    url: "https://downloader.dealwithmuhammad.com",
    blurb: "Download videos from YouTube, Instagram, TikTok and more",
  },
  {
    id: "compressor",
    name: "DWM Compressor",
    url: "https://compressor.dealwithmuhammad.com",
    blurb: "Compress PDFs, images and video in your browser",
  },
  {
    id: "qr",
    name: "DWM QR",
    url: "https://qr.dealwithmuhammad.com",
    blurb: "Custom QR codes with logos, colours, templates and expiry",
  },
  {
    id: "bgremove",
    name: "DWM BG Remover",
    url: "https://bgremove.dealwithmuhammad.com",
    blurb: "Remove image backgrounds with AI, right in your browser",
  },
  {
    id: "ip",
    name: "DWM IP",
    url: "https://ip.dealwithmuhammad.com",
    blurb: "See your public IP address, location and ISP",
  },
  {
    id: "emailcheck",
    name: "DWM Email Checker",
    url: "https://emailcheck.dealwithmuhammad.com",
    blurb: "Check if an email address exists before you send",
  },
  {
    id: "progress",
    name: "Progress 2026",
    url: "https://progress.dealwithmuhammad.com",
    blurb: "How much of the year has gone, live",
  },
];

export const otherTools = (current: ToolId) => TOOLS.filter((t) => t.id !== current);

/** Sends a named event to the shared DWM analytics (dwm.js). Never throws. */
export function trackEvent(name: string) {
  try {
    if (typeof window === "undefined" || !name) return;
    (window as unknown as { dwm?: (n: string) => void }).dwm?.(name);
  } catch {
    /* analytics must never break the app */
  }
}
