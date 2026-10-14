import { Accordion } from "@heroui/react";
import { BadgeCheck } from "lucide-react";

import { site } from "@/lib/site";

/** How-to, features and FAQ. The same copy feeds the JSON-LD in src/lib/seo.ts. */
export function AboutSections({ intro }: { intro?: React.ReactNode }) {
  return (
    <div className="mx-auto mt-20 flex w-full max-w-5xl flex-col gap-20 px-4 sm:px-6">
      {intro}

      <section id="how-to" aria-labelledby="how-to-title" className="scroll-mt-8">
        <h2 id="how-to-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {site.howTo.name}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {site.howTo.steps.map((s, i) => (
            <li key={s.name} className="rounded-2xl border border-border bg-surface p-5">
              <span className="grid size-8 place-items-center rounded-full bg-accent/12 font-mono text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{s.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

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

      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-8">
        <h2 id="faq-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion className="mt-6 rounded-2xl border border-border bg-surface px-2 sm:px-4">
          {site.faqs.map((f) => (
            <Accordion.Item key={f.q} id={f.q}>
              <Accordion.Heading>
                <Accordion.Trigger className="py-4 text-left font-semibold">
                  {f.q}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="pb-4 leading-relaxed text-muted">{f.a}</Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
