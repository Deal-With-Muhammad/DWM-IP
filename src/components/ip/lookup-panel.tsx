"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, Label, Spinner, TextField } from "@heroui/react";
import { Search } from "lucide-react";

import { CopyButton } from "./copy-button";
import { DetailGrid } from "./detail-grid";
import { LocationMap } from "./location-map";
import { trackEvent } from "@/lib/dwm";
import { flagEmoji } from "@/lib/geo";
import type { LookupResult } from "@/lib/network";

const EXAMPLES = ["8.8.8.8", "1.1.1.1", "github.com", "2606:4700:4700::1111"];

/** Lookup for any IP or domain. Landing pages pass their own heading, placeholder and examples. */
export function LookupPanel({
  title = "Look up any IP or domain",
  description = "See who owns an address, where it's registered and its hostname.",
  placeholder = "8.8.8.8 or example.com",
  examples = EXAMPLES,
}: {
  title?: string;
  description?: string;
  placeholder?: string;
  examples?: string[];
}) {
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const run = useCallback(async (q: string, opts: { scroll?: boolean } = {}) => {
    const value = q.trim();
    if (!value) return;
    setQuery(value);
    setPending(true);
    try {
      const res = await fetch(`/api/lookup?q=${encodeURIComponent(value)}`);
      const data = (await res.json()) as LookupResult;
      setResult(data);
      if (data.ok) {
        trackEvent(`lookup-${data.kind}`);
        const url = new URL(location.href);
        url.searchParams.set("q", data.query);
        history.replaceState(null, "", url);
      }
      if (opts.scroll)
        requestAnimationFrame(() =>
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
        );
    } catch {
      setResult({ ok: false, query: value, error: "Lookup failed. Check your connection and try again." });
    } finally {
      setPending(false);
    }
  }, []);

  // Shared links like ?q=8.8.8.8 run straight away.
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once on mount
    if (q) run(q, { scroll: true });
  }, [run]);

  return (
    <section
      aria-labelledby="lookup-title"
      className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5 shadow-xl shadow-black/5 sm:p-6"
    >
      <div>
        <h2 id="lookup-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>

      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
      >
        <TextField
          className="min-w-0 flex-1"
          value={query}
          onChange={setQuery}
          aria-label="IP address or domain"
        >
          <Label className="sr-only">IP address or domain</Label>
          <Input
            placeholder={placeholder}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="url"
            className="font-mono"
          />
        </TextField>
        <Button type="submit" variant="primary" isPending={pending} className="flex-none">
          {pending ? <Spinner size="sm" color="current" /> : <Search className="size-4" aria-hidden />}
          Look up
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <span>Try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => run(ex)}
            className="rounded-full border border-border px-2.5 py-1 font-mono transition-colors hover:border-accent/50 hover:text-foreground"
          >
            {ex}
          </button>
        ))}
      </div>

      <div ref={resultRef} aria-live="polite" className="scroll-mt-6">
        {result ? <LookupResultView result={result} /> : null}
      </div>
    </section>
  );
}

function LookupResultView({ result }: { result: LookupResult }) {
  if (!result.ok) {
    return (
      <p className="rounded-2xl border border-danger/30 bg-danger/8 p-4 text-sm text-danger">
        {result.error}
      </p>
    );
  }
  const d = result.details;
  const g = d.geo;
  const place = [g?.city, g?.region, g?.country].filter(Boolean).join(", ");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface-secondary/60 py-2 pr-2 pl-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">
            {result.kind === "domain" ? result.query : `IPv${d.version} address`}
          </p>
          <p className="truncate font-mono text-base font-semibold">{d.ip}</p>
        </div>
        <CopyButton value={d.ip} label="Copy IP" size="sm" variant="ghost" />
      </div>

      {result.kind === "domain" && result.addresses.length > 1 ? (
        <p className="text-xs text-muted">
          {result.query} has {result.addresses.length} addresses:{" "}
          <span className="font-mono text-foreground/80">{result.addresses.join(", ")}</span>. Showing the
          first.
        </p>
      ) : null}

      {d.class.kind !== "public" ? (
        <p className="rounded-2xl border border-border bg-surface-secondary/60 p-4 text-sm text-muted">
          <strong className="text-foreground">{d.class.label}.</strong> {d.class.note}
        </p>
      ) : (
        <>
          <DetailGrid
            items={[
              {
                label: "Location (approx.)",
                value: place ? `${flagEmoji(g?.countryCode)} ${place}` : undefined,
                wide: true,
              },
              { label: "Organization", value: d.asn?.name ?? d.rdap?.owner },
              { label: "ASN", value: d.asn ? `AS${d.asn.asn}` : undefined, mono: true },
              { label: "Network", value: d.rdap?.cidr ?? d.asn?.prefix, mono: true },
              { label: "Network name", value: d.rdap?.name, mono: true },
              { label: "Registered owner", value: d.rdap?.owner },
              { label: "Registry", value: d.rdap?.registry ?? d.asn?.registry },
              { label: "Time zone", value: g?.timezone },
              { label: "Abuse contact", value: d.rdap?.abuseEmail, mono: true },
              { label: "Hostname (reverse DNS)", value: d.hostname, mono: true, wide: true },
            ]}
          />
          <div className="h-56">
            <LocationMap geo={g} label={place || d.ip} />
          </div>
        </>
      )}
    </div>
  );
}
