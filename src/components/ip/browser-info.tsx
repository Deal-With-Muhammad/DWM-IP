"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";

import { DetailGrid } from "./detail-grid";

type Info = { browser: string; os: string; screen: string; language: string; timeZone: string };

function parse(ua: string): Pick<Info, "browser" | "os"> {
  const m = (re: RegExp) => ua.match(re)?.[1];
  const browser =
    (m(/Edg(?:A|iOS)?\/([\d.]+)/) && `Edge ${m(/Edg(?:A|iOS)?\/(\d+)/)}`) ||
    (m(/OPR\/(\d+)/) && `Opera ${m(/OPR\/(\d+)/)}`) ||
    (m(/SamsungBrowser\/(\d+)/) && `Samsung Internet ${m(/SamsungBrowser\/(\d+)/)}`) ||
    (m(/(?:Firefox|FxiOS)\/(\d+)/) && `Firefox ${m(/(?:Firefox|FxiOS)\/(\d+)/)}`) ||
    (m(/(?:Chrome|CriOS)\/(\d+)/) && `Chrome ${m(/(?:Chrome|CriOS)\/(\d+)/)}`) ||
    (m(/Version\/([\d.]+).*Safari/) && `Safari ${m(/Version\/([\d.]+)/)}`) ||
    "Unknown browser";
  const os =
    (/iPhone|iPad|iPod/.test(ua) && `iOS ${(m(/OS (\d+[_\d]*)/) ?? "").replace(/_/g, ".")}`.trim()) ||
    (m(/Android ([\d.]+)/) && `Android ${m(/Android ([\d.]+)/)}`) ||
    (/Windows NT 10/.test(ua) && "Windows 10 or 11") ||
    (/Windows/.test(ua) && "Windows") ||
    (/CrOS/.test(ua) && "ChromeOS") ||
    (/Mac OS X/.test(ua) && "macOS") ||
    (/Linux/.test(ua) && "Linux") ||
    "Unknown";
  return { browser, os };
}

/** Browser, device and a time-zone check that hints at VPNs and proxies. */
export function BrowserInfo({ ipTimeZone }: { ipTimeZone?: string }) {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser details only exist on the client
    setInfo({
      ...parse(navigator.userAgent),
      screen: `${screen.width} × ${screen.height}${devicePixelRatio > 1 ? ` @${Math.round(devicePixelRatio * 10) / 10}x` : ""}`,
      language: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }, []);

  const match = info && ipTimeZone ? sameOffset(info.timeZone, ipTimeZone) : null;

  return (
    <section
      aria-labelledby="browser-title"
      className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5 shadow-xl shadow-black/5 sm:p-6"
    >
      <div>
        <h2 id="browser-title" className="text-lg font-semibold">
          Your browser &amp; device
        </h2>
        <p className="mt-1 text-sm text-muted">What every website can see, besides your IP.</p>
      </div>
      {info ? (
        <>
          <DetailGrid
            items={[
              { label: "Browser", value: info.browser },
              { label: "Operating system", value: info.os },
              { label: "Screen", value: info.screen, mono: true },
              { label: "Language", value: info.language, mono: true },
              { label: "Device time zone", value: info.timeZone, wide: true },
            ]}
          />
          {match != null ? (
            <p
              className={`flex gap-2.5 rounded-2xl border p-3.5 text-sm ${
                match ? "border-success/30 bg-success/8" : "border-warning/40 bg-warning/10"
              }`}
            >
              {match ? (
                <ShieldCheck className="mt-0.5 size-4 flex-none text-success" aria-hidden />
              ) : (
                <ShieldAlert className="mt-0.5 size-4 flex-none text-warning" aria-hidden />
              )}
              <span>
                {match
                  ? "Your device's time zone matches your IP's location, so you're probably not using a VPN or proxy."
                  : `Your device is set to ${info.timeZone}, but your IP points to ${ipTimeZone}. That usually means a VPN, a proxy or Private Relay, or that you're travelling.`}
              </span>
            </p>
          ) : null}
        </>
      ) : (
        <div className="h-40 animate-pulse rounded-2xl bg-default/60" aria-hidden />
      )}
    </section>
  );
}

/** Compares current UTC offsets rather than names (Asia/Kuala_Lumpur and Asia/Singapore are the same). */
function sameOffset(a: string, b: string) {
  const offset = (tz: string) => {
    try {
      const parts = new Intl.DateTimeFormat("en", { timeZone: tz, timeZoneName: "longOffset" }).formatToParts(
        new Date(),
      );
      return parts.find((p) => p.type === "timeZoneName")?.value;
    } catch {
      return undefined;
    }
  };
  const oa = offset(a);
  const ob = offset(b);
  return oa && ob ? oa === ob : null;
}
