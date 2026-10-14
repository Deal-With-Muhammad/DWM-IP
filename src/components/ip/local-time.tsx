"use client";

import { useEffect, useState } from "react";

/** Live clock in a time zone, rendered only on the client to avoid hydration mismatches. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the clock only exists on the client
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  let text = "";
  try {
    text = new Intl.DateTimeFormat("en", { timeZone, hour: "numeric", minute: "2-digit" }).format(now);
  } catch {
    return null;
  }
  return <span className="text-muted"> · {text} there</span>;
}
