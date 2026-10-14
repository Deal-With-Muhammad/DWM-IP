import type { Geo } from "@/lib/geo";

/** OpenStreetMap embed around the approximate location. Lazy, no API key, no cookies. */
export function LocationMap({ geo, label }: { geo?: Geo | null; label: string }) {
  if (geo?.latitude == null || geo?.longitude == null) return null;
  const { latitude: lat, longitude: lon } = geo;
  const d = 0.35;
  const bbox = [lon - d, lat - d * 0.6, lon + d, lat + d * 0.6].map((n) => n.toFixed(4)).join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(4)},${lon.toFixed(4)}`;
  return (
    <figure className="relative h-full min-h-64 overflow-hidden rounded-2xl border border-border bg-surface-secondary">
      <iframe
        title={`Map of ${label}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="absolute inset-0 size-full"
      />
      {/* Filters on cross-origin iframes can render black, so dark mode just dims the map. */}
      <div className="pointer-events-none absolute inset-0 hidden bg-black/20 dark:block" aria-hidden />
      <figcaption className="pointer-events-none absolute top-2 left-2 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] text-muted shadow-sm backdrop-blur">
        Approximate area
      </figcaption>
    </figure>
  );
}
