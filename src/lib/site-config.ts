import type { ToolId } from "./dwm";

/** A block of explanatory copy: paragraphs, a term/text list and/or terminal commands. */
export type ContentSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: { term: string; text: string }[];
  commands?: { label: string; command: string }[];
};

/** Everything that describes one DWM tool. The page copy, metadata, JSON-LD, OG image and manifest all read from it. */
export type SiteConfig = {
  id: ToolId;
  name: string;
  /** Other names people search for, for JSON-LD. */
  alternateNames: string[];
  url: string;
  host: string;
  /** <title> of the home page (≤ 60 chars where possible). */
  title: string;
  /** Meta description (≤ 160 chars). */
  description: string;
  /** One or two plain sentences under the H1 that answer the query directly. */
  answer: string;
  /** Short line under the app name in the header. */
  tagline: string;
  /** Longer, factual description for the WebApplication JSON-LD. */
  appDescription: string;
  /** Accent colour (hex) for the theme, icon and share image. */
  color: string;
  keywords: string[];
  featureList: string[];
  howTo: { name: string; description: string; steps: { name: string; text: string }[] };
  features: { title: string; text: string }[];
  /** Extra explanatory sections on the home page, between the features and the FAQ. */
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  /** ISO date the page copy was last reviewed (sitemap, JSON-LD dateModified). */
  dateModified: string;
  /** The same date for people, e.g. "October 2026". */
  updatedLabel: string;
  /** Chips on the share image. */
  ogChips: string[];
  /** The two lines of the share image headline. */
  ogHeadline: [string, string];
  /** Case study on the portfolio. */
  caseStudy: string;
  /** Short privacy line in the footer. */
  privacyLine: string;
};
