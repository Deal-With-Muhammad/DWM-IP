import { asnLookup, reverseDns } from "@/lib/network";
import { getVisitor } from "@/lib/visitor";

export const dynamic = "force-dynamic";

const CORS = { "access-control-allow-origin": "*", "cache-control": "no-store" };

/** `curl ip.dealwithmuhammad.com/json` → the visitor's IP with location, time zone and network. */
export async function GET(request: Request) {
  const visitor = await getVisitor(request.headers);
  if (!visitor)
    return Response.json({ error: "Couldn't detect your IP address." }, { status: 500, headers: CORS });

  const isPublic = visitor.class.kind === "public";
  const [asn, hostname] = isPublic
    ? await Promise.all([asnLookup(visitor.ip), reverseDns(visitor.ip)])
    : [undefined, undefined];
  const g = visitor.geo;

  return Response.json(
    {
      ip: visitor.ip,
      version: `IPv${visitor.version}`,
      type: visitor.class.kind,
      hostname: hostname ?? null,
      city: g?.city ?? null,
      region: g?.region ?? null,
      country: g?.country ?? null,
      country_code: g?.countryCode ?? null,
      postal_code: g?.postalCode ?? null,
      latitude: g?.latitude ?? null,
      longitude: g?.longitude ?? null,
      timezone: g?.timezone ?? null,
      asn: asn ? `AS${asn.asn}` : null,
      org: asn?.name ?? null,
      network: asn?.prefix ?? null,
    },
    { headers: CORS },
  );
}
