import { Suspense } from "react";

import { DetailGrid, DetailGridSkeleton, type Detail } from "./detail-grid";
import { LocalTime } from "./local-time";
import { flagEmoji } from "@/lib/geo";
import { asnLookup, reverseDns } from "@/lib/network";
import type { Visitor } from "@/lib/visitor";

export function VisitorDetails({ visitor }: { visitor: Visitor }) {
  const g = visitor.geo;
  const location: Detail[] = [
    { label: "City", value: g?.city },
    { label: "Region", value: g?.region },
    { label: "Country", value: g?.country ? `${flagEmoji(g.countryCode)} ${g.country}` : undefined },
    { label: "Postal code", value: g?.postalCode, mono: true },
    {
      label: "Time zone",
      value: g?.timezone ? (
        <>
          {g.timezone.replace(/_/g, " ")}
          <LocalTime timeZone={g.timezone} />
        </>
      ) : undefined,
    },
    {
      label: "Coordinates (approx.)",
      value:
        g?.latitude != null && g?.longitude != null
          ? `${g.latitude.toFixed(3)}, ${g.longitude.toFixed(3)}`
          : undefined,
      mono: true,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <DetailGrid items={location} />
      {visitor.class.kind === "public" ? (
        <Suspense fallback={<DetailGridSkeleton />}>
          <NetworkDetails ip={visitor.ip} />
        </Suspense>
      ) : (
        <p className="rounded-2xl border border-border bg-surface-secondary/60 p-4 text-sm text-muted">
          <strong className="text-foreground">{visitor.class.label}.</strong> {visitor.class.note}
        </p>
      )}
    </div>
  );
}

async function NetworkDetails({ ip }: { ip: string }) {
  const [asn, hostname] = await Promise.all([asnLookup(ip), reverseDns(ip)]);
  return (
    <DetailGrid
      items={[
        { label: "Internet provider (ISP)", value: asn?.name },
        { label: "ASN", value: asn ? `AS${asn.asn}` : undefined, mono: true },
        { label: "Network", value: asn?.prefix, mono: true },
        { label: "Hostname (reverse DNS)", value: hostname, mono: true, wide: true },
      ]}
    />
  );
}
