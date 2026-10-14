import { headers } from "next/headers";

import { AboutSections } from "@/components/about-sections";
import { BrowserInfo } from "@/components/ip/browser-info";
import { IpHero } from "@/components/ip/ip-hero";
import { LocationMap } from "@/components/ip/location-map";
import { LookupPanel } from "@/components/ip/lookup-panel";
import { VisitorDetails } from "@/components/ip/visitor-details";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { placeLabel } from "@/lib/geo";
import { buildJsonLd, jsonLdString } from "@/lib/seo";
import { getVisitor } from "@/lib/visitor";

export default async function Home() {
  const visitor = await getVisitor(await headers());

  return (
    <div className="relative isolate">
      <div className="page-backdrop" aria-hidden />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(buildJsonLd()) }} />
      <SiteHeader />
      <main id="main">
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-4 px-4 sm:mt-10 sm:px-6">
          <section
            aria-label="Your IP address"
            className="grid grid-cols-1 gap-6 rounded-3xl border border-border bg-surface p-5 shadow-xl shadow-black/5 sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
          >
            {visitor ? (
              <>
                <div className="flex min-w-0 flex-col gap-5">
                  <IpHero visitor={visitor} />
                  <VisitorDetails visitor={visitor} />
                </div>
                <LocationMap geo={visitor.geo} label={placeLabel(visitor.geo) || "your location"} />
              </>
            ) : (
              <div className="lg:col-span-2">
                <h1 className="text-xl font-semibold">What is my IP address?</h1>
                <p className="mt-2 text-muted">
                  We couldn&apos;t detect your IP address right now. Please reload the page in a moment.
                </p>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <LookupPanel />
            <BrowserInfo ipTimeZone={visitor?.geo?.timezone} />
          </div>
        </div>
        <AboutSections />
      </main>
      <SiteFooter />
    </div>
  );
}
