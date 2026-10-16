import { BrowserInfo } from "./browser-info";
import { CopyButton } from "./copy-button";
import { DetailGrid, DetailGridSkeleton } from "./detail-grid";
import { DualStack } from "./dual-stack";
import { IpHero } from "./ip-hero";
import { LocationMap } from "./location-map";
import { VisitorDetails } from "./visitor-details";
import { flagEmoji, placeLabel } from "@/lib/geo";
import { asnLookup, reverseDns } from "@/lib/network";
import { currentVisitor } from "@/lib/visitor";

// The parts of a page that depend on who is asking. Each one is rendered inside
// <Suspense>, so the rest of the page is prerendered and served instantly while
// these stream in at request time. currentVisitor() is cached per request.

export async function VisitorHero() {
  const visitor = await currentVisitor();
  if (!visitor)
    return (
      <p className="text-muted">
        We couldn&apos;t detect your IP address right now. Please reload the page in a moment.
      </p>
    );
  return <IpHero visitor={visitor} />;
}

export async function VisitorDetailsSlot() {
  const visitor = await currentVisitor();
  return visitor ? <VisitorDetails visitor={visitor} /> : null;
}

export async function VisitorMap() {
  const visitor = await currentVisitor();
  return visitor ? (
    <LocationMap geo={visitor.geo} label={placeLabel(visitor.geo) || "your location"} />
  ) : null;
}

export async function VisitorBrowserInfo() {
  const visitor = await currentVisitor();
  return <BrowserInfo ipTimeZone={visitor?.geo?.timezone} />;
}

/** IPv4 and IPv6 side by side, with a sentence saying whether the connection has IPv6. */
export async function VisitorDualStack() {
  const visitor = await currentVisitor();
  if (!visitor)
    return (
      <p className="text-muted">
        We couldn&apos;t detect your IP address right now. Please reload the page in a moment.
      </p>
    );
  return <DualStack serverIp={visitor.ip} serverVersion={visitor.version} verdict />;
}

export function HeroSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden>
      <div className="h-12 w-3/4 animate-pulse rounded-xl bg-default sm:h-14" />
      <div className="h-4 w-40 animate-pulse rounded bg-default" />
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="h-12 animate-pulse rounded-2xl bg-default/60" />
        <div className="h-12 animate-pulse rounded-2xl bg-default/60" />
      </div>
    </div>
  );
}

export function DualStackSkeleton() {
  return (
    <div className="grid gap-2 sm:grid-cols-2" aria-hidden>
      <div className="h-12 animate-pulse rounded-2xl bg-default/60" />
      <div className="h-12 animate-pulse rounded-2xl bg-default/60" />
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <DetailGridSkeleton />
      <DetailGridSkeleton />
    </div>
  );
}

export function MapSkeleton() {
  return <div className="h-full min-h-64 animate-pulse rounded-2xl bg-default/60" aria-hidden />;
}

/** The visitor's internet provider, big, with its ASN and network (the ISP page). */
export async function VisitorIsp() {
  const visitor = await currentVisitor();
  if (!visitor)
    return (
      <p className="text-muted">
        We couldn&apos;t detect your IP address right now. Please reload the page in a moment.
      </p>
    );
  if (visitor.class.kind !== "public")
    return (
      <p className="rounded-2xl border border-border bg-surface-secondary/60 p-4 text-sm text-muted">
        <strong className="text-foreground">{visitor.class.label}.</strong> {visitor.class.note}
      </p>
    );

  const [asn, hostname] = await Promise.all([asnLookup(visitor.ip), reverseDns(visitor.ip)]);
  const g = visitor.geo;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted">Your internet provider</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight break-words sm:text-4xl">
          {asn?.name ?? "Unknown provider"}
        </p>
      </div>
      <DetailGrid
        items={[
          { label: "ASN", value: asn ? `AS${asn.asn}` : undefined, mono: true },
          { label: "Network", value: asn?.prefix, mono: true },
          { label: "Registry", value: asn?.registry },
          {
            label: "Your IP address",
            value: (
              <span className="inline-flex items-center gap-2">
                {visitor.ip}
                <CopyButton
                  value={visitor.ip}
                  label="Copy IP address"
                  size="sm"
                  variant="ghost"
                  event="copy-ip"
                />
              </span>
            ),
            mono: true,
            wide: true,
          },
          { label: "Hostname (reverse DNS)", value: hostname, mono: true, wide: true },
          {
            label: "Location (approx.)",
            value: placeLabel(g) ? `${flagEmoji(g?.countryCode)} ${placeLabel(g)}` : undefined,
            wide: true,
          },
        ]}
      />
    </div>
  );
}

export function IspSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <div className="h-3 w-28 animate-pulse rounded bg-default" />
      <div className="h-10 w-2/3 animate-pulse rounded-xl bg-default" />
      <DetailGridSkeleton />
    </div>
  );
}
