import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

// Search engines and AI assistants are all welcome: the more places that can
// describe this tool accurately, the better.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
