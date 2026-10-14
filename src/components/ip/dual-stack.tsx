"use client";

import { useEffect, useState } from "react";

import { CopyButton } from "./copy-button";

type State = { status: "loading" } | { status: "ok"; ip: string } | { status: "none" };

async function probe(url: string): Promise<State> {
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    const { ip } = (await res.json()) as { ip?: string };
    return ip ? { status: "ok", ip } : { status: "none" };
  } catch {
    return { status: "none" };
  }
}

/**
 * The server only sees the protocol your browser happened to use, so the
 * other family is checked from the browser against IPv4-only and IPv6-only
 * endpoints (ipify, a free open-source service).
 */
export function DualStack({ serverIp, serverVersion }: { serverIp: string; serverVersion: 4 | 6 }) {
  const [v4, setV4] = useState<State>(
    serverVersion === 4 ? { status: "ok", ip: serverIp } : { status: "loading" },
  );
  const [v6, setV6] = useState<State>(
    serverVersion === 6 ? { status: "ok", ip: serverIp } : { status: "loading" },
  );

  useEffect(() => {
    let alive = true;
    if (serverVersion !== 4) probe("https://api4.ipify.org?format=json").then((s) => alive && setV4(s));
    if (serverVersion !== 6) probe("https://api6.ipify.org?format=json").then((s) => alive && setV6(s));
    return () => {
      alive = false;
    };
  }, [serverVersion]);

  return (
    <dl className="grid gap-2 sm:grid-cols-2">
      <Row label="IPv4" state={v4} empty="Not detected" />
      <Row label="IPv6" state={v6} empty="Not available" />
    </dl>
  );
}

function Row({ label, state, empty }: { label: string; state: State; empty: string }) {
  return (
    <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-border bg-surface-secondary/60 py-1.5 pr-1.5 pl-4">
      <dt className="w-9 flex-none font-mono text-xs font-semibold text-muted">{label}</dt>
      <dd className="min-w-0 flex-1 truncate font-mono text-sm" aria-live="polite">
        {state.status === "loading" ? (
          <span
            className="inline-block h-3.5 w-32 animate-pulse rounded bg-default align-middle"
            aria-label="Checking"
          />
        ) : state.status === "ok" ? (
          state.ip
        ) : (
          <span className="font-sans text-muted">{empty}</span>
        )}
      </dd>
      {state.status === "ok" ? (
        <CopyButton value={state.ip} label={`Copy ${label}`} size="sm" variant="ghost" event="copy-ip" />
      ) : null}
    </div>
  );
}
