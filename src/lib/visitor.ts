import "server-only";

import { classifyIp, clientIpFrom, geoFromHeaders, ipVersion, type Geo, type IpClass } from "./ip";
import { geoLookup } from "./network";

export type Visitor = { ip: string; version: 4 | 6; class: IpClass; geo: Geo | null };

/**
 * The visitor's own IP and location. In production both come from Vercel's
 * edge headers, so the address is never sent anywhere else. In local dev the
 * request comes from localhost, so the machine's public IP is fetched instead.
 */
export async function getVisitor(headers: Headers): Promise<Visitor | null> {
  let ip = clientIpFrom(headers);
  let geo = geoFromHeaders(headers);

  if (process.env.NODE_ENV !== "production" && (!ip || classifyIp(ip).kind !== "public")) {
    try {
      // DEV_VISITOR_IP shows a sample address instead (used for screenshots).
      ip = process.env.DEV_VISITOR_IP || (await publicIpOfThisMachine());
      geo = (await geoLookup(ip)) ?? null;
    } catch {
      /* offline: show localhost */
    }
  }

  const version = ip ? ipVersion(ip) : null;
  if (!ip || !version) return null;
  return { ip, version, class: classifyIp(ip), geo };
}

async function publicIpOfThisMachine() {
  const res = await fetch("https://api64.ipify.org?format=json", { signal: AbortSignal.timeout(3000) });
  return ((await res.json()) as { ip: string }).ip;
}
