# DWM IP

**What is my IP address?** A free, ad-free tool at [ip.dealwithmuhammad.com](https://ip.dealwithmuhammad.com): your public IPv4/IPv6, location, ISP/ASN and hostname, plus a lookup for any IP or domain.

Part of the free DWM tools by [Muhammad Ahmad](https://www.dealwithmuhammad.com).

## Stack

Next.js 16 (App Router) · React 19 · HeroUI v3 · Tailwind CSS v4 · TypeScript

## Data sources (all free, no API keys)

| What | Source |
| --- | --- |
| Visitor IP + location | Vercel edge headers (`x-real-ip`, `x-vercel-ip-*`) |
| ISP / ASN / prefix | Team Cymru IP-to-ASN over DNS |
| Hostname | Reverse DNS (PTR) |
| Owner, network, abuse contact | RDAP from the regional registry (fallback rdap.org) |
| Location of looked-up IPs | GeoJS |
| The "other" IP family | ipify (IPv4-only / IPv6-only endpoints, called from the browser) |

## Endpoints

- `curl ip.dealwithmuhammad.com` → plain-text IP (CLI user agents are rewritten to `/api/ip` in `next.config.ts`)
- `curl ip.dealwithmuhammad.com/json` → JSON
- `GET /api/lookup?q=8.8.8.8` → lookup JSON

## Develop

```bash
npm install
npm run dev
```

Locally the request comes from localhost, so the dev server fetches your machine's public IP instead (see `src/lib/visitor.ts`).

Shared DWM pieces: `dwm.js` (cookie-free analytics) and `dwm-apps.js` (the 9-dot app launcher) are served by the portfolio at `https://www.dealwithmuhammad.com`. Set `NEXT_PUBLIC_DWM_ORIGIN` to point them at a local portfolio server.
