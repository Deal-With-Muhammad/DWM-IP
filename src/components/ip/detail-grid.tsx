import type { ReactNode } from "react";

export type Detail = { label: string; value?: ReactNode; mono?: boolean; wide?: boolean };

/** Label/value grid used for your own IP and for lookups. Empty values are skipped. */
export function DetailGrid({ items }: { items: Detail[] }) {
  const shown = items.filter((i) => i.value != null && i.value !== "");
  if (!shown.length) return null;
  return (
    // Cells draw their own right/bottom borders; the -1px margins hide the outer ones.
    <div className="overflow-hidden rounded-2xl border border-border">
      <dl className="-mr-px -mb-px grid grid-cols-2 sm:grid-cols-3">
        {shown.map((i) => (
          <div
            key={i.label}
            className={`min-w-0 border-r border-b border-border px-3.5 py-3 sm:px-4 ${i.wide ? "col-span-2 sm:col-span-3" : ""}`}
          >
            <dt className="text-xs text-muted">{i.label}</dt>
            <dd className={`mt-0.5 text-sm font-medium break-words ${i.mono ? "font-mono text-[13px]" : ""}`}>
              {i.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function DetailGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border sm:grid-cols-3"
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="border-r border-border px-4 py-3 last:border-r-0">
          <div className="h-3 w-16 animate-pulse rounded bg-default" />
          <div className="mt-2 h-4 w-28 animate-pulse rounded bg-default" />
        </div>
      ))}
    </div>
  );
}
