import { AUTHOR } from "./dwm";
import { site } from "./site";

// Builds the JSON-LD graph from the same copy that's visible on the page
// (src/lib/site.ts), so structured data never drifts from what people read.

const PERSON_ID = "https://www.dealwithmuhammad.com/#person";

export function buildJsonLd() {
  const person = { "@id": PERSON_ID };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: AUTHOR.name,
        url: AUTHOR.url,
        email: `mailto:${AUTHOR.email}`,
        jobTitle: AUTHOR.jobTitle,
        address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" },
        sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.instagram],
      },
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
        author: person,
        creator: person,
        publisher: person,
        isPartOf: { "@id": `${site.url}/#website` },
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
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: site.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so it can't close the tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
