import { clientIpFrom } from "@/lib/ip";
import { lookup } from "@/lib/network";
import { rateLimit } from "@/lib/rate-limit";

/** GET /api/lookup?q=8.8.8.8 or ?q=example.com */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const limit = rateLimit(clientIpFrom(request.headers) ?? "unknown");
  if (!limit.ok) {
    return Response.json(
      { ok: false, query: q, error: "Too many lookups. Please wait a minute and try again." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } },
    );
  }
  const result = await lookup(q);
  return Response.json(result, {
    status: result.ok ? 200 : 400,
    headers: { "access-control-allow-origin": "*", "cache-control": "public, max-age=0, s-maxage=600" },
  });
}
