import type { MetadataRoute } from "next";

import { PAGE_LIST } from "@/lib/pages";
import { site } from "@/lib/site";

// Fixed dates: bump a page's dateModified (src/lib/site.ts, src/lib/pages.ts) when its copy changes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: site.dateModified, changeFrequency: "monthly", priority: 1 },
    ...PAGE_LIST.map((p) => ({
      url: `${site.url}/${p.slug}`,
      lastModified: p.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/privacy`, lastModified: "2026-11-05", changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: "2026-11-05", changeFrequency: "yearly", priority: 0.3 },
  ];
}
