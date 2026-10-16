import Link from "next/link";
import { Accordion } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import { PAGE_LIST, type LandingSlug } from "@/lib/pages";
import type { ContentSection } from "@/lib/site-config";

// Building blocks for the explanatory copy on the home page and the landing
// pages. The same copy feeds the JSON-LD in src/lib/seo.ts.

const h2 = "text-2xl font-semibold tracking-tight sm:text-3xl";

export function HowToSection({ name, steps }: { name: string; steps: { name: string; text: string }[] }) {
  return (
    <section id="how-to" aria-labelledby="how-to-title" className="scroll-mt-8">
      <h2 id="how-to-title" className={h2}>
        {name}
      </h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
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
  );
}

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return sections.map((s) => (
    <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-8">
      <h2 id={`${s.id}-title`} className={h2}>
        {s.heading}
      </h2>
      {s.paragraphs?.map((p) => (
        <p key={p} className="mt-4 max-w-3xl leading-relaxed text-muted">
          {p}
        </p>
      ))}
      {s.items ? (
        <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {s.items.map((i) => (
            <div key={i.term} className="border-l-2 border-accent/40 pl-4">
              <dt className="font-semibold">{i.term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{i.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {s.commands ? (
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {s.commands.map((c) => (
            <div key={c.command} className="rounded-2xl border border-border bg-surface p-4">
              <dt className="text-xs text-muted">{c.label}</dt>
              <dd className="mt-1.5 font-mono text-sm break-all">
                <code>{c.command}</code>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  ));
}

export function FaqSection({ faqs, updated }: { faqs: { q: string; a: string }[]; updated: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-8">
      <h2 id="faq-title" className={h2}>
        Frequently asked questions
      </h2>
      <Accordion className="mt-6 rounded-2xl border border-border bg-surface px-2 sm:px-4">
        {faqs.map((f) => (
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
      <p className="mt-4 text-xs text-muted">Updated {updated}</p>
    </section>
  );
}

/** Cards linking to the IP tool pages, with descriptive anchor text. */
export function IpToolLinks({ current, title = "More IP tools" }: { current?: LandingSlug; title?: string }) {
  const pages = PAGE_LIST.filter((p) => p.slug !== current);
  return (
    <section aria-labelledby="ip-tools-title">
      <h2 id="ip-tools-title" className={h2}>
        {title}
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {current ? (
          <li>
            <ToolCard
              href="/"
              label="What is my IP address"
              blurb="Your public IPv4 and IPv6, location and ISP"
            />
          </li>
        ) : null}
        {pages.map((p) => (
          <li key={p.slug}>
            <ToolCard href={`/${p.slug}`} label={p.label} blurb={p.blurb} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ToolCard({ href, label, blurb }: { href: string; label: string; blurb: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/50"
    >
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{label}</span>
        <span className="mt-0.5 block text-sm text-muted">{blurb}</span>
      </span>
      <ArrowRight
        className="size-4 flex-none text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden
      />
    </Link>
  );
}
