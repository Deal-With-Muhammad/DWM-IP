"use client";

import { useEffect, useState } from "react";
import { Info, ShieldCheck } from "lucide-react";

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
export function DualStack({
  serverIp,
  serverVersion,
  verdict = false,
}: {
  serverIp: string;
  serverVersion: 4 | 6;
  /** Also say in words whether the connection has IPv6 (the IPv6 page). */
  verdict?: boolean;
}) {
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

  const rows = (
    <dl className="grid gap-2 sm:grid-cols-2">
      <Row label="IPv4" state={v4} empty="Not detected" />
      <Row label="IPv6" state={v6} empty="Not available" />
    </dl>
  );
  if (!verdict) return rows;

  return (
    <div className="flex flex-col gap-3">
      {rows}
      <p
        aria-live="polite"
        className={`flex gap-2.5 rounded-2xl border p-3.5 text-sm ${
          v6.status === "ok"
            ? "border-success/30 bg-success/8"
            : v6.status === "none"
              ? "border-warning/40 bg-warning/10"
              : "border-border bg-surface-secondary/60 text-muted"
        }`}
      >
        {v6.status === "ok" ? (
          <ShieldCheck className="mt-0.5 size-4 flex-none text-success" aria-hidden />
        ) : v6.status === "none" ? (
          <Info className="mt-0.5 size-4 flex-none text-warning" aria-hidden />
        ) : null}
        <span>
          {v6.status === "ok"
            ? "Your connection supports IPv6. Sites that offer IPv6 reach you over it."
            : v6.status === "none"
              ? "No IPv6 address detected, so this connection is IPv4 only. Everything still works; see below for why and what to check."
              : "Checking for IPv6…"}
        </span>
      </p>
    </div>
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
