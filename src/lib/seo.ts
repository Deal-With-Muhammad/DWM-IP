import type { Metadata } from "next";

import { AUTHOR } from "./dwm";
import type { LandingPage } from "./pages";
import { site } from "./site";

// Builds the JSON-LD graph from the same copy that's visible on the page
// (src/lib/site.ts), so structured data never drifts from what people read.

const PERSON_ID = "https://www.dealwithmuhammad.com/#person";
const person = { "@id": PERSON_ID };

const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  url: AUTHOR.url,
  email: `mailto:${AUTHOR.email}`,
  jobTitle: AUTHOR.jobTitle,
  address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" },
  sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.instagram],
};

const faqNode = (id: string, faqs: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: person,
      },
      {
        "@type": "WebApplication",
        "@id": `${site.url}/#app`,
        name: site.name,
        alternateName: site.alternateNames,
        url: `${site.url}/`,
        description: site.appDescription,
        image: `${site.url}/opengraph-image`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires a modern browser with JavaScript.",
        inLanguage: "en",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: site.featureList,
        dateModified: site.dateModified,
        author: person,
        creator: person,
        publisher: person,
        isPartOf: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: `${site.url}/`,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        dateModified: site.dateModified,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": `${site.url}/#app` },
        author: person,
      },
      {
        "@type": "HowTo",
        "@id": `${site.url}/#how-to`,
        name: site.howTo.name,
        description: site.howTo.description,
        tool: { "@type": "HowToTool", name: site.name },
        step: site.howTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${site.url}/#how-to`,
        })),
      },
      faqNode(`${site.url}/#faq`, site.faqs),
    ],
  };
}

export const pageUrl = (page: LandingPage) => `${site.url}/${page.slug}`;

/** JSON-LD for a keyword landing page: the page, its tool, breadcrumbs, how-to and FAQ. */
export function buildPageJsonLd(page: LandingPage) {
  const url = pageUrl(page);
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${page.title} | ${site.name}`,
        description: page.description,
        inLanguage: "en",
        dateModified: page.dateModified,
        isPartOf: { "@id": `${site.url}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#app` },
        author: person,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: page.appName,
        url,
        description: page.answer,
        image: `${url}/opengraph-image`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires a modern browser with JavaScript.",
        inLanguage: "en",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: page.featureList,
        dateModified: page.dateModified,
        author: person,
        creator: person,
        publisher: person,
        isPartOf: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "HowTo",
        "@id": `${url}#how-to`,
        name: page.howTo.name,
        step: page.howTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${url}#how-to`,
        })),
      },
      faqNode(`${url}#faq`, page.faqs),
    ],
  };
}

/** Metadata for a landing page. og:image comes from the opengraph-image file in its folder. */
export function pageMetadata(page: LandingPage): Metadata {
  const title = `${page.title} | ${site.name}`;
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      url: `/${page.slug}`,
      siteName: site.name,
      title,
      description: page.description,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description: page.description },
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so it can't close the tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
