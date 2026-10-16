import { Suspense } from "react";

import { AboutSections } from "@/components/about-sections";
import { BrowserInfo } from "@/components/ip/browser-info";
import { LookupPanel } from "@/components/ip/lookup-panel";
import {
  DetailsSkeleton,
  HeroSkeleton,
  MapSkeleton,
  VisitorBrowserInfo,
  VisitorDetailsSlot,
  VisitorHero,
  VisitorMap,
} from "@/components/ip/visitor-slots";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildJsonLd, jsonLdString } from "@/lib/seo";
import { site } from "@/lib/site";

// Everything outside <Suspense> is prerendered and served straight from the CDN;
// the visitor's IP, location and network stream in from the server per request
// (never cached, see components/ip/visitor-slots.tsx).
export default function Home() {
  return (
    <div className="relative isolate">
      <div className="page-backdrop" aria-hidden />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(buildJsonLd()) }} />
      <SiteHeader />
      <main id="main">
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-4 px-4 sm:mt-10 sm:px-6">
          <section
            aria-labelledby="ip-title"
            className="grid grid-cols-1 gap-6 rounded-3xl border border-border bg-surface p-5 shadow-xl shadow-black/5 sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
          >
            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 id="ip-title" className="text-sm font-medium text-muted">
                  What is my IP address?
                </h1>
                <Suspense fallback={<HeroSkeleton />}>
                  <VisitorHero />
                </Suspense>
              </div>
              <p className="text-sm leading-relaxed text-muted">{site.answer}</p>
              <Suspense fallback={<DetailsSkeleton />}>
                <VisitorDetailsSlot />
              </Suspense>
            </div>
            <Suspense fallback={<MapSkeleton />}>
              <VisitorMap />
            </Suspense>
          </section>

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <LookupPanel />
            <Suspense fallback={<BrowserInfo />}>
              <VisitorBrowserInfo />
            </Suspense>
          </div>
        </div>
        <AboutSections />
      </main>
      <SiteFooter />
    </div>
  );
}
