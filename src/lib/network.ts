import "server-only";

import { Resolver } from "node:dns/promises";
import { domainToASCII } from "node:url";

import { classifyIp, countryName, ipVersion, normalizeIp, type Geo, type IpClass } from "./ip";

// Free, key-less public sources only:
//  - Team Cymru's IP-to-ASN DNS service (ISP, ASN, prefix)
//  - reverse DNS (PTR)
//  - RDAP via rdap.org (network name, owner, abuse contact)
//  - GeoJS (approximate location of an IP someone looks up; the visitor's own
//    location comes from Vercel's geo headers instead, see ip.ts)

const resolver = new Resolver({ timeout: 2500, tries: 2 });

export type Asn = {
  asn: number;
  name?: string;
  prefix?: string;
  country?: string;
  /** Display name, e.g. "RIPE NCC". */
  registry?: string;
  /** Team Cymru's key, e.g. "RIPENCC". */
  rir?: string;
  allocated?: string;
};

export type Rdap = {
  name?: string;
  handle?: string;
  range?: string;
  cidr?: string;
  country?: string;
  owner?: string;
  abuseEmail?: string;
  registry?: string;
};

export type IpDetails = {
  ip: string;
  version: 4 | 6;
  class: IpClass;
  hostname?: string;
  asn?: Asn;
  rdap?: Rdap;
  geo?: Geo;
};

export type LookupResult =
  | { ok: true; query: string; kind: "ip" | "domain"; addresses: string[]; details: IpDetails }
  | { ok: false; query: string; error: string };

/* ---------- tiny TTL cache (per server instance) ---------- */

const cache = new Map<string, { at: number; value: unknown }>();
const TTL = 10 * 60 * 1000;

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.value as T;
  const value = await fn();
  if (cache.size > 1000) cache.delete(cache.keys().next().value!);
  cache.set(key, { at: Date.now(), value });
  return value;
}

async function settle<T>(p: Promise<T>): Promise<T | undefined> {
  try {
    return await p;
  } catch {
    return undefined;
  }
}

/* ---------- ASN (Team Cymru) ---------- */

function reverseNibbles(ip: string) {
  if (ipVersion(ip) === 4) return ip.split(".").reverse().join(".");
  // Expand "::" and pad every group to 4 hex digits, then reverse the nibbles.
  const [head, tail = ""] = ip.split("::");
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  const groups = [...h, ...Array(8 - h.length - t.length).fill("0"), ...t];
  return groups
    .map((g) => g.padStart(4, "0"))
    .join("")
    .split("")
    .reverse()
    .join(".");
}

async function txt(name: string) {
  const records = await resolver.resolveTxt(name);
  return records.map((r) => r.join(""));
}

/**
 * "GOOGLE - Google LLC, US" → "Google LLC"; "TTNET-MY - TIME dotCom Berhad No. 14, Jalan …, MY" →
 * "TIME dotCom Berhad". Registries often append the postal address to the organisation name.
 */
export function cleanAsName(raw?: string) {
  if (!raw) return undefined;
  let name = raw.trim().replace(/,\s*[A-Z]{2}$/, "");
  const dash = name.indexOf(" - ");
  if (dash > 0) name = name.slice(dash + 3);
  name = name.split(",")[0];
  name = name.replace(/\s+(No\.?|Lot|Level|Unit|Suite|Floor|\d{2,}).*$/i, "");
  return name.trim() || raw.trim();
}

export function asnLookup(ip: string): Promise<Asn | undefined> {
  return cached(`asn:${ip}`, async () => {
    const zone = ipVersion(ip) === 4 ? "origin.asn.cymru.com" : "origin6.asn.cymru.com";
    const origin = await settle(txt(`${reverseNibbles(ip)}.${zone}`));
    if (!origin?.length) return undefined;
    // "15169 | 8.8.8.0/24 | US | arin | 2023-12-28" (most specific prefix last)
    const rows = origin.map((r) => r.split("|").map((s) => s.trim()));
    rows.sort((a, b) => Number(b[1]?.split("/")[1] ?? 0) - Number(a[1]?.split("/")[1] ?? 0));
    const [asnField, prefix, country, registry, allocated] = rows[0];
    const asn = Number(asnField.split(" ")[0]);
    if (!Number.isFinite(asn)) return undefined;
    // "15169 | US | arin | 2000-03-30 | GOOGLE - Google LLC, US"
    const desc = await settle(txt(`AS${asn}.asn.cymru.com`));
    const name = cleanAsName(desc?.[0]?.split("|")[4]);
    return {
      asn,
      name,
      prefix,
      country,
      registry: registryLabel(registry),
      rir: registry?.toUpperCase(),
      allocated,
    };
  });
}

/* ---------- reverse DNS ---------- */

export function reverseDns(ip: string): Promise<string | undefined> {
  return cached(`ptr:${ip}`, async () => (await settle(resolver.reverse(ip)))?.[0]);
}

/* ---------- RDAP ---------- */

type RdapEntity = {
  roles?: string[];
  vcardArray?: [string, [string, unknown, string, string][]];
  entities?: RdapEntity[];
};

function vcard(e: RdapEntity, field: string) {
  return e.vcardArray?.[1]?.find((x) => x[0] === field)?.[3];
}

function findEntity(entities: RdapEntity[] | undefined, role: string): RdapEntity | undefined {
  for (const e of entities ?? []) {
    if (e.roles?.includes(role)) return e;
    const nested = findEntity(e.entities, role);
    if (nested) return nested;
  }
  return undefined;
}

const UA = "DWM-IP/1.0 (+https://ip.dealwithmuhammad.com)";

/** Each regional registry's RDAP server, keyed by Team Cymru's registry name. */
const RIR_RDAP: Record<string, { url: string; label: string }> = {
  ARIN: { url: "https://rdap.arin.net/registry/ip/", label: "ARIN" },
  RIPENCC: { url: "https://rdap.db.ripe.net/ip/", label: "RIPE NCC" },
  APNIC: { url: "https://rdap.apnic.net/ip/", label: "APNIC" },
  LACNIC: { url: "https://rdap.lacnic.net/rdap/ip/", label: "LACNIC" },
  AFRINIC: { url: "https://rdap.afrinic.net/rdap/ip/", label: "AFRINIC" },
};

export function registryLabel(registry?: string) {
  return registry ? (RIR_RDAP[registry.toUpperCase()]?.label ?? registry.toUpperCase()) : undefined;
}

async function rdapFetch(url: string) {
  const res = await settle(
    fetch(url, {
      headers: { accept: "application/rdap+json, application/json", "user-agent": UA },
      signal: AbortSignal.timeout(4500),
    }),
  );
  return res?.ok ? res : undefined;
}

/** RDAP straight from the registry that holds the block (known from the ASN lookup), else via rdap.org. */
export function rdapLookup(ip: string, registry?: string): Promise<Rdap | undefined> {
  return cached(`rdap:${ip}`, async () => {
    const rir = registry ? RIR_RDAP[registry.toUpperCase()] : undefined;
    const res =
      (rir && (await rdapFetch(rir.url + encodeURIComponent(ip)))) ||
      (await rdapFetch(`https://rdap.org/ip/${encodeURIComponent(ip)}`));
    if (!res?.ok) return undefined;
    const d = await settle(res.json());
    if (!d) return undefined;
    const cidrs = (d.cidr0_cidrs ?? []) as { v4prefix?: string; v6prefix?: string; length: number }[];
    const owner = findEntity(d.entities, "registrant") ?? findEntity(d.entities, "administrative");
    const abuse = findEntity(d.entities, "abuse");
    // The registry that actually answered (rdap.org and RIRs redirect between each other).
    const host = res.url ? new URL(res.url).hostname : "";
    const answered = Object.values(RIR_RDAP).find((r) => host && r.url.includes(host))?.label;
    return {
      name: d.name,
      handle: d.handle,
      range: d.startAddress && d.endAddress ? `${d.startAddress} – ${d.endAddress}` : undefined,
      cidr: cidrs.map((c) => `${c.v4prefix ?? c.v6prefix}/${c.length}`).join(", ") || undefined,
      country: d.country,
      owner: owner ? String(vcard(owner, "fn") ?? "") || undefined : undefined,
      abuseEmail: abuse ? String(vcard(abuse, "email") ?? "") || undefined : undefined,
      registry: answered ?? registryLabel(registry),
    } satisfies Rdap;
  });
}

/* ---------- GeoJS (for looked-up IPs) ---------- */

export function geoLookup(ip: string): Promise<Geo | undefined> {
  return cached(`geo:${ip}`, async () => {
    const res = await settle(
      fetch(`https://get.geojs.io/v1/ip/geo/${encodeURIComponent(ip)}.json`, {
        signal: AbortSignal.timeout(3500),
      }),
    );
    if (!res?.ok) return undefined;
    const d = await settle(res.json());
    if (!d || !d.country_code) return undefined;
    const lat = Number(d.latitude);
    const lon = Number(d.longitude);
    return {
      city: d.city || undefined,
      region: d.region || undefined,
      countryCode: d.country_code,
      country: countryName(d.country_code) ?? d.country,
      latitude: Number.isFinite(lat) ? lat : undefined,
      longitude: Number.isFinite(lon) ? lon : undefined,
      timezone: d.timezone || undefined,
    } satisfies Geo;
  });
}

/* ---------- putting it together ---------- */

export async function ipDetails(
  rawIp: string,
  opts: { geo?: boolean; rdap?: boolean } = {},
): Promise<IpDetails> {
  const ip = normalizeIp(rawIp);
  const version = ipVersion(ip);
  if (!version) throw new Error("Not an IP address");
  const cls = classifyIp(ip);
  if (cls.kind !== "public") return { ip, version, class: cls };
  // RDAP waits for the ASN lookup, which says which registry to ask.
  const asnPromise = asnLookup(ip);
  const [hostname, asn, rdap, geo] = await Promise.all([
    reverseDns(ip),
    asnPromise,
    opts.rdap ? asnPromise.then((a) => rdapLookup(ip, a?.rir)) : undefined,
    opts.geo ? geoLookup(ip) : undefined,
  ]);
  return { ip, version, class: cls, hostname, asn, rdap, geo };
}

const DOMAIN =
  /^(?=.{1,253}$)(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))*\.[a-z][a-z0-9-]{1,62}$/i;

/** Turns whatever someone pasted (URL, domain, IP, "[::1]:443") into a lookup target. */
export function parseQuery(
  input: string,
): { kind: "ip"; value: string } | { kind: "domain"; value: string } | null {
  let q = input.trim();
  if (!q || q.length > 300) return null;
  const asIp = normalizeIp(q);
  if (ipVersion(asIp)) return { kind: "ip", value: asIp };
  // Strip a scheme, path, port or credentials if a URL was pasted.
  try {
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(q)) q = new URL(q).hostname;
  } catch {
    return null;
  }
  q = q
    .replace(/[/?#].*$/, "")
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
  const ipv4WithPort = normalizeIp(q);
  if (ipVersion(ipv4WithPort)) return { kind: "ip", value: ipv4WithPort };
  const ascii = domainToASCII(q.toLowerCase());
  return ascii && DOMAIN.test(ascii) ? { kind: "domain", value: ascii } : null;
}

export async function lookup(input: string): Promise<LookupResult> {
  const parsed = parseQuery(input);
  if (!parsed)
    return {
      ok: false,
      query: input,
      error: "Enter a valid IP address (like 8.8.8.8) or a domain (like google.com).",
    };

  if (parsed.kind === "ip") {
    const details = await ipDetails(parsed.value, { geo: true, rdap: true });
    return { ok: true, query: parsed.value, kind: "ip", addresses: [parsed.value], details };
  }

  const [v4, v6] = await Promise.all([
    settle(resolver.resolve4(parsed.value)),
    settle(resolver.resolve6(parsed.value)),
  ]);
  const addresses = [...(v4 ?? []), ...(v6 ?? [])];
  if (!addresses.length)
    return { ok: false, query: parsed.value, error: `${parsed.value} doesn't point to any IP address.` };
  const details = await ipDetails(addresses[0], { geo: true, rdap: true });
  return { ok: true, query: parsed.value, kind: "domain", addresses, details };
}
