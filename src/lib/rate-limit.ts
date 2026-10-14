// Small in-memory limiter for the lookup API (per server instance). Lookups
// only call free public services, so this just keeps one client from hammering them.
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    if (hits.size > 5000) hits.clear();
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  entry.count += 1;
  return { ok: entry.count <= limit, retryAfter: Math.ceil((entry.reset - now) / 1000) };
}
