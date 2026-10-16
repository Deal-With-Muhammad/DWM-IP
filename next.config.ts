import type { NextConfig } from "next";

// Command-line clients get the bare IP at "/", like icanhazip or ifconfig.me.
const CLI_AGENTS =
  "(?:curl|Wget|HTTPie|httpie|xh|PowerShell|WindowsPowerShell|Go-http-client|python-requests|python-httpx|aiohttp|libwww-perl|Fetch)/.*";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Partial prerendering: each page's static shell is served from the CDN and the
  // visitor-specific parts (their IP, location, ISP) stream in per request.
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  devIndicators: false,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "header", key: "user-agent", value: CLI_AGENTS }],
          destination: "/api/ip",
        },
        { source: "/json", destination: "/api/json" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
