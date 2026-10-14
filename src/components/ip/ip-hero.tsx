import { MapPin } from "lucide-react";

import { CopyButton } from "./copy-button";
import { DualStack } from "./dual-stack";
import { flagEmoji, placeLabel } from "@/lib/geo";
import type { Visitor } from "@/lib/visitor";

export function IpHero({ visitor }: { visitor: Visitor }) {
  const place = placeLabel(visitor.geo);
  // Size the address to fit its column: a monospace character is about 0.62em wide.
  const fit = Math.min(10, 84 / (visitor.ip.length * 0.62));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-sm font-medium text-muted">What is my IP address?</h1>
        <div className="@container mt-2 flex items-center gap-3">
          <output
            style={{ fontSize: `clamp(1.25rem, ${fit.toFixed(2)}cqi, 3.75rem)` }}
            className="min-w-0 font-mono leading-tight font-semibold tracking-tight break-all text-foreground"
            aria-label={`Your IP address is ${visitor.ip}`}
          >
            {visitor.ip}
          </output>
          <CopyButton value={visitor.ip} label="Copy IP address" variant="primary" event="copy-ip" />
        </div>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span className="rounded-full bg-accent/12 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
            IPv{visitor.version}
          </span>
          {place ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden />
              <span aria-hidden>{flagEmoji(visitor.geo?.countryCode)}</span> {place}
            </span>
          ) : null}
        </p>
      </div>
      <DualStack serverIp={visitor.ip} serverVersion={visitor.version} />
    </div>
  );
}
