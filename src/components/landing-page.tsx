import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ContentSections, FaqSection, HowToSection, IpToolLinks } from "./content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { LandingPage as Page } from "@/lib/pages";
import { buildPageJsonLd, jsonLdString } from "@/lib/seo";
import { site } from "@/lib/site";

/** Shared layout of the keyword landing pages: H1 and answer, the tool, then how-to, explainers and FAQ. */
export function LandingPage({ page, children }: { page: Page; children: React.ReactNode }) {
  return (
    <div className="relative isolate">
      <div className="page-backdrop" aria-hidden />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildPageJsonLd(page)) }}
      />
      <SiteHeader />
      <main id="main">
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-6 px-4 sm:mt-10 sm:px-6">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-muted">
                <li>
                  <Link href="/" className="transition-colors hover:text-accent">
                    {site.name}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3" />
                </li>
                <li aria-current="page">{page.label}</li>
              </ol>
            </nav>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{page.h1}</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">{page.answer}</p>
          </div>
          {children}
        </div>

        <div className="mx-auto mt-20 flex w-full max-w-5xl flex-col gap-20 px-4 sm:px-6">
          <HowToSection name={page.howTo.name} steps={page.howTo.steps} />
          <ContentSections sections={page.sections} />
          <IpToolLinks current={page.slug} />
          <FaqSection faqs={page.faqs} updated={page.updatedLabel} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

/** The bordered card the visitor-specific tool sits in. */
export function ToolCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section
      aria-label={label}
      className="rounded-3xl border border-border bg-surface p-5 shadow-xl shadow-black/5 sm:p-7"
    >
      {children}
    </section>
  );
}
