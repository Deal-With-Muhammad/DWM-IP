import { BlockList, isIP } from "node:net";

import { countryName, type Geo } from "./geo";

export { countryName, flagEmoji, placeLabel, type Geo } from "./geo";

/** Where an address sits: only "public" addresses are reachable from the internet. */
export type IpKind =
  | "public"
  | "private"
  | "shared"
  | "loopback"
  | "link-local"
  | "multicast"
  | "documentation"
  | "unspecified"
  | "reserved";

export type IpClass = { kind: IpKind; label: string; note: string };

const RANGES: { kind: Exclude<IpKind, "public">; label: string; note: string; v4: string[]; v6: string[] }[] =
  [
    {
      kind: "private",
      label: "Private address",
      note: "Used inside home and office networks (your router hands these out). It isn't reachable from the internet, so it has no owner or location.",
      v4: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"],
      v6: ["fc00::/7"],
    },
    {
      kind: "shared",
      label: "Carrier-grade NAT address",
      note: "Shared address space (100.64.0.0/10) that internet providers use behind carrier-grade NAT. Many customers share one public IP.",
      v4: ["100.64.0.0/10"],
      v6: [],
    },
    {
      kind: "loopback",
      label: "Loopback address",
      note: "Always points back to the same device (localhost). It never leaves your computer.",
      v4: ["127.0.0.0/8"],
      v6: ["::1/128"],
    },
    {
      kind: "link-local",
      label: "Link-local address",
      note: "Assigned automatically when no router hands out an address. It only works on the local network segment.",
      v4: ["169.254.0.0/16"],
      v6: ["fe80::/10"],
    },
    {
      kind: "multicast",
      label: "Multicast address",
      note: "Used to send one packet to a group of devices, not to identify a single machine.",
      v4: ["224.0.0.0/4"],
      v6: ["ff00::/8"],
    },
    {
      kind: "documentation",
      label: "Documentation address",
      note: "Reserved for examples in books and documentation. It's never used on the real internet.",
      v4: ["192.0.2.0/24", "198.51.100.0/24", "203.0.113.0/24"],
      v6: ["2001:db8::/32"],
    },
    {
      kind: "unspecified",
      label: "Unspecified address",
      note: "Means “no address” or “all addresses on this machine”. It can't be looked up.",
      v4: ["0.0.0.0/8"],
      v6: ["::/128"],
    },
    {
      kind: "reserved",
      label: "Reserved address",
      note: "Set aside by the IETF for special purposes, so it isn't assigned to anyone on the public internet.",
      v4: ["192.0.0.0/24", "198.18.0.0/15", "240.0.0.0/4"],
      v6: ["100::/64", "2001::/23"],
    },
  ];

const lists = RANGES.map((r) => {
  const list = new BlockList();
  for (const cidr of r.v4) {
    const [net, bits] = cidr.split("/");
    list.addSubnet(net, Number(bits), "ipv4");
  }
  for (const cidr of r.v6) {
    const [net, bits] = cidr.split("/");
    list.addSubnet(net, Number(bits), "ipv6");
  }
  return { range: r, list };
});

/** "::ffff:1.2.3.4" → "1.2.3.4" (IPv4 seen through an IPv6 socket). */
export function normalizeIp(raw: string): string {
  const ip = raw.trim().replace(/^\[|\]$/g, "");
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(ip);
  return mapped ? mapped[1] : ip;
}

export function ipVersion(ip: string): 4 | 6 | null {
  const v = isIP(ip);
  return v === 4 || v === 6 ? v : null;
}

export function classifyIp(ip: string): IpClass {
  const version = ipVersion(ip);
  if (!version) return { kind: "reserved", label: "Not an IP address", note: "" };
  const type = version === 4 ? "ipv4" : "ipv6";
  for (const { range, list } of lists) {
    if (list.check(ip, type)) return { kind: range.kind, label: range.label, note: range.note };
  }
  return { kind: "public", label: "Public address", note: "" };
}

/** The visitor's IP as seen by Vercel's edge (which overwrites any client-supplied value). */
export function clientIpFrom(headers: Headers): string | null {
  const candidates = [
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for")?.split(",")[0],
    headers.get("x-forwarded-for")?.split(",")[0],
  ];
  for (const c of candidates) {
    if (!c) continue;
    const ip = normalizeIp(c);
    if (ipVersion(ip)) return ip;
  }
  return null;
}

function header(headers: Headers, name: string) {
  const v = headers.get(name);
  if (!v) return undefined;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

function num(v?: string) {
  const n = v == null ? NaN : Number(v);
  return Number.isFinite(n) ? n : undefined;
}

/** Location of the visitor from Vercel's geo headers. Nothing is sent to a third party. */
export function geoFromHeaders(headers: Headers): Geo | null {
  const countryCode = header(headers, "x-vercel-ip-country")?.toUpperCase();
  if (!countryCode) return null;
  const regionCode = header(headers, "x-vercel-ip-country-region");
  return {
    city: header(headers, "x-vercel-ip-city"),
    // Subdivision codes are only meaningful as text when they're letters (e.g. "CA", "NSW").
    region: regionCode && /^[A-Z]{2,3}$/.test(regionCode) ? regionCode : undefined,
    countryCode,
    country: countryName(countryCode),
    postalCode: header(headers, "x-vercel-ip-postal-code"),
    latitude: num(header(headers, "x-vercel-ip-latitude")),
    longitude: num(header(headers, "x-vercel-ip-longitude")),
    timezone: header(headers, "x-vercel-ip-timezone"),
  };
}
