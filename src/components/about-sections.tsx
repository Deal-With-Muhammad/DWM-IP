import { BadgeCheck } from "lucide-react";

import { ContentSections, FaqSection, HowToSection, IpToolLinks } from "./content";
import { site } from "@/lib/site";

/** How-to, features, explainers and FAQ. The same copy feeds the JSON-LD in src/lib/seo.ts. */
export function AboutSections({ intro }: { intro?: React.ReactNode }) {
  return (
    <div className="mx-auto mt-20 flex w-full max-w-5xl flex-col gap-20 px-4 sm:px-6">
      {intro}

      <HowToSection name={site.howTo.name} steps={site.howTo.steps} />

      <section aria-labelledby="features-title">
        <h2 id="features-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          What {site.name} does
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f) => (
            <li key={f.title} className="flex gap-3">
              <BadgeCheck className="mt-0.5 size-5 flex-none text-accent" aria-hidden />
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <IpToolLinks />

      <ContentSections sections={site.sections} />

      <FaqSection faqs={site.faqs} updated={site.updatedLabel} />
    </div>
  );
}
