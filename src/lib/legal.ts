// The words of the /privacy and /terms pages. Keep them true to what this site's code does.

export type LegalSection = { heading: string; body: (string | string[])[] };
export type LegalDoc = {
  path: "/privacy" | "/terms";
  title: string;
  description: string;
  intro?: string;
  sections: LegalSection[];
};

export const LEGAL_UPDATED = "5 November 2026";

export const PRIVACY: LegalDoc = {
  path: "/privacy",
  title: "Privacy Policy",
  intro:
    "DWM IP shows you your public IP address and looks up other IP addresses and domains. Here's exactly what happens to that data.",
  description:
    "What DWM IP does with your IP address and lookups, which outside services it uses, and how long anything is kept.",
  sections: [
    {
      heading: "Who runs this site",
      body: [
        "DWM IP (ip.dealwithmuhammad.com) is run by me, Muhammad Ahmad, an individual based in Kuala Lumpur, Malaysia. It's a personal project, not a company, and there's no registered business behind it.",
        "You can reach me at me@dealwithmuhammad.com or on WhatsApp at +60 11-3986 5270.",
      ],
    },
    {
      heading: "What's collected and why",
      body: [
        "I have no accounts, and my code doesn't write your IP address to a database. It does have to handle the following to work:",
        [
          "Your IP address and rough location :: my server reads your IP from the request, plus the approximate city, region, postcode, coordinates and time zone that Vercel attaches to it. That's used to answer your request, in the page or through the plain-text and /json endpoints.",
          "Your network details :: the server looks up your internet provider and hostname from your IP, using Team Cymru's IP-to-ASN service and a reverse DNS lookup.",
          "Your other IP address :: the server only sees the protocol you connected with, so your browser asks ipify (api4.ipify.org or api6.ipify.org) directly for the other one. ipify sees your IP address when it does.",
          "The map :: the map on the page is an OpenStreetMap embed. Your browser sends your IP address and the map's approximate coordinates to OpenStreetMap when it loads.",
          "What you look up :: an IP address or domain you type goes to my server in the request address, for example /api/lookup?q=example.com. The server then queries DNS, Team Cymru, the regional internet registries through RDAP (ARIN, RIPE NCC, APNIC, LACNIC, AFRINIC, or rdap.org as a fallback) and GeoJS.",
          "Browser and device details :: the browser, operating system, screen size, language and time zone panel is worked out in your browser and isn't sent to me.",
          "Visit counts :: every page loads dwm.js, a small counter script from my portfolio site, www.dealwithmuhammad.com. It reports the page path (without the query string), where you came from (saved only as a source name, such as Google), any utm_source or ref tag in the link, the host and path of external links you click, and the name of certain actions: copying your IP, and whether a lookup was for an IP or a domain, never what you looked up. That request also carries your IP address and browser details. My server uses them to make a one-way daily code, so you count once a day per site, and adds your browser, operating system, device type and country (from Vercel) to running totals. The IP address and browser string aren't saved with the totals.",
        ],
      ],
    },
    {
      heading: "Who it's shared with",
      body: [
        [
          "Vercel :: hosts the site. Like any web host it receives your IP address, browser details and the addresses you request, and it may keep request logs under its own policy. I can't turn that off, and I don't control how long Vercel keeps them.",
          "Team Cymru and DNS servers :: receive your IP address, or the IP or domain you look up, as DNS queries.",
          "ipify and OpenStreetMap :: receive your IP address directly from your browser, as described above.",
          "RDAP registries, rdap.org and GeoJS :: receive the IP address you chose to look up, from my server, not your own IP.",
          "Upstash :: runs the Redis database that holds the visit counter's daily codes and totals. The database is in the United States.",
        ],
        "I don't sell your data, and there are no ads or ad trackers on this site. Some of these providers are outside Malaysia, so your data may be handled in other countries, including the United States. Each of these services has its own privacy policy.",
      ],
    },
    {
      heading: "Cookies and browser storage",
      body: [
        "My code sets no cookies. It uses your browser's localStorage for two things: theme (light or dark mode) and dwm:ignore, only if you add ?dwm-ignore=1 to a link, which stops the visit counter in that browser (?dwm-ignore=0 turns it back on). The OpenStreetMap embed is OpenStreetMap's own page, so its policy covers anything it stores.",
      ],
    },
    {
      heading: "How long it's kept",
      body: [
        [
          "Your IP address and lookups :: not saved by my code. Lookup results and your provider details are reused from server memory for up to 10 minutes and are gone when that server instance shuts down. Vercel's network may cache a lookup response for 10 minutes.",
          "The lookup limit :: uses your IP address in server memory to enforce 60 lookups a minute. It isn't written to a database, and it's gone when that server instance shuts down.",
          "Daily visitor codes :: expire after 2 days.",
          "Visit totals :: have no expiry date, and I keep them while the site runs. They're counts rather than records about a person, and they're public at https://www.dealwithmuhammad.com/stats/ip.",
          "The counter's abuse limit :: uses your IP address in server memory for a one-minute window. It isn't written to a database, and it's gone when that server instance shuts down.",
          "Vercel's logs :: kept for as long as Vercel keeps them. Because a lookup is in the request address, it can appear in those logs.",
        ],
      ],
    },
    {
      heading: "Security",
      body: [
        "The site is served over HTTPS and there's no login to break into, because there are no accounts. I hold no security certifications. No system is perfectly secure, so please don't treat this as a guarantee.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask me for access to, correction of, or deletion of personal data I hold about you. Email me@dealwithmuhammad.com and I'll reply as soon as I can. I don't keep your IP address, so there's usually nothing to find. Tell me the date and IP address and I'll check what I can see.",
        "Malaysia's Personal Data Protection Act 2010 is the local law on personal data. If you're in the EU or UK, you also have rights under the GDPR, including the right to object to or restrict how your data is used, to ask for a copy in a portable format, and to complain to your data protection authority.",
      ],
    },
    {
      heading: "Children",
      body: [
        "DWM IP isn't for children under 13. It has no sign-up, so I don't knowingly collect anything about children. If you think a child's data has reached me, email me and I'll delete it.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: ["If what the site does with data changes, I'll update this page and the date at the top."],
    },
  ],
};

export const TERMS: LegalDoc = {
  path: "/terms",
  title: "Terms of Use",
  intro:
    "By using DWM IP you agree to these terms. They're short, and they're written by me, Muhammad Ahmad, an individual, not a company.",
  description:
    "The rules for using DWM IP, a free tool from Muhammad Ahmad that shows your IP address and looks up IPs and domains.",
  sections: [
    {
      heading: "What this is",
      body: [
        "DWM IP shows your public IP address, rough location and internet provider, and looks up the network, owner and location of any IP address or domain, in the browser or from a terminal with curl.",
      ],
    },
    {
      heading: "Free, and provided as-is",
      body: [
        "It's free, with no account and no ads. Location and provider details come from public databases and are estimates. I run it on my own time, and I can change it, limit it or shut it down at any time.",
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        "Please use DWM IP lawfully. In particular, don't:",
        [
          "use it for anything illegal, or to harass, stalk, threaten or try to identify someone from their IP address",
          "use lookups to plan attacks on networks or systems you aren't allowed to test",
          "abuse the service, including scraping or sending bulk automated lookups. Using curl for your own IP now and then is fine",
          "enter content you have no right to use, or pass results off as a verified location or identity",
        ],
      ],
    },
    {
      heading: "Blocking abuse",
      body: [
        "Lookups are rate limited. I can block any address or person from the site if I think they're abusing it, with or without notice.",
      ],
    },
    {
      heading: "No warranties, and limited liability",
      body: [
        "An IP address doesn't tell you who someone is or exactly where they are, and results can be out of date or wrong. Don't rely on them for legal, security or safety decisions.",
        "I make no promises that the site will be accurate, available, secure or fit for any particular purpose. As far as the law allows, I'm not liable for any loss or damage that comes from using it or from being unable to use it. Nothing here limits liability that the law doesn't allow me to limit.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "Malaysian law governs these terms. If the law where you live gives you rights that can't be taken away, you keep those rights.",
      ],
    },
    {
      heading: "Contact",
      body: [
        "Questions about these terms: me@dealwithmuhammad.com or WhatsApp +60 11-3986 5270. I'm an individual in Kuala Lumpur, Malaysia, not a company.",
      ],
    },
  ],
};
