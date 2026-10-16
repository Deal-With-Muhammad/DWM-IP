import type { ContentSection } from "./site-config";

// Keyword landing pages. Each one is a real tool page (the lookup or your own
// ISP / IPv6 check is on it), with copy written for that search. Keep every
// claim accurate to what src/lib/network.ts and the components actually do.

export type LandingSlug = "ip-lookup" | "domain-to-ip" | "what-is-my-isp" | "what-is-my-ipv6";

export type LandingPage = {
  slug: LandingSlug;
  /** Descriptive anchor text for links to this page. */
  label: string;
  /** One-line summary for link cards. */
  blurb: string;
  /** <title> without the " | DWM IP" suffix. */
  title: string;
  description: string;
  h1: string;
  /** Answer-first intro under the H1. */
  answer: string;
  /** Name for the page's WebApplication JSON-LD. */
  appName: string;
  featureList: string[];
  howTo: { name: string; steps: { name: string; text: string }[] };
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  ogHeadline: [string, string];
  ogChips: string[];
  dateModified: string;
  /** The same date for people, e.g. "October 2026". */
  updatedLabel: string;
};

const UPDATED = "2026-10-16";
const UPDATED_LABEL = "October 2026";

const ipLookup: LandingPage = {
  slug: "ip-lookup",
  label: "IP address lookup",
  blurb: "Owner, ISP, ASN, registry, abuse contact and location of any IP",
  title: "IP Address Lookup: Owner, ISP & Location of Any IP",
  description:
    "Look up any IPv4 or IPv6 address to see its owner, ISP and ASN, network range, registry, abuse contact, hostname and approximate location. Free, no sign-up.",
  h1: "IP address lookup",
  answer:
    "Enter any IPv4 or IPv6 address to see who it belongs to: the organisation and ASN that run it, the network and owner registered with the regional internet registry, its abuse contact, reverse DNS hostname and approximate location.",
  appName: "DWM IP Address Lookup",
  featureList: [
    "Look up any public IPv4 or IPv6 address",
    "Organisation, ISP and ASN (autonomous system number)",
    "Network range, network name and registered owner (RDAP)",
    "Regional internet registry and abuse contact",
    "Reverse DNS hostname",
    "Approximate city, region, country and time zone with a map",
    "Shareable result links",
  ],
  howTo: {
    name: "How to look up an IP address",
    steps: [
      {
        name: "Enter the IP address",
        text: "Type or paste an IPv4 address like 8.8.8.8 or an IPv6 address like 2606:4700:4700::1111. You can also paste a URL or domain and it's resolved for you.",
      },
      {
        name: "Press Look up",
        text: "DWM IP asks the internet routing tables, the regional registry and reverse DNS about that address, usually in a second or two.",
      },
      {
        name: "Read and share the result",
        text: "You'll see the organisation, ASN, network, owner, registry, abuse contact, hostname and approximate location. The address bar updates, so you can copy the link to share the result.",
      },
    ],
  },
  sections: [
    {
      id: "what-it-shows",
      heading: "What an IP lookup tells you",
      items: [
        {
          term: "Organisation and ASN",
          text: "The network that announces the address on the internet, such as an ISP, mobile carrier, cloud provider or company, with its autonomous system number. This comes from Team Cymru's IP-to-ASN service.",
        },
        {
          term: "Network range and owner",
          text: "The block the address belongs to (for example 8.8.8.0/24), its network name and the registered owner, read over RDAP from ARIN, RIPE NCC, APNIC, LACNIC or AFRINIC.",
        },
        {
          term: "Abuse contact",
          text: "The email address the network's owner has published for reporting spam, scanning or attacks from that range.",
        },
        {
          term: "Hostname",
          text: "The reverse DNS (PTR) name, when the owner has set one. It often names the provider or the kind of connection, like a mobile or broadband pool.",
        },
        {
          term: "Approximate location",
          text: "The city, region, country and time zone the address is registered to in GeoJS's geolocation data, shown on a map.",
        },
      ],
    },
    {
      id: "limits",
      heading: "What an IP lookup can't tell you",
      paragraphs: [
        "An IP lookup identifies a network, not a person. It won't give you anyone's name, phone number or street address: only the provider can link an address to a customer, and they normally only do that for a court order or the police.",
        "Location is an estimate. For home and mobile connections it's often the provider's regional hub, tens of kilometres from the real user. For VPNs, proxies, iCloud Private Relay and CDNs you'll see the service's location, not the person behind it.",
      ],
    },
    {
      id: "special",
      heading: "Private and special addresses",
      paragraphs: [
        "Some addresses never appear on the public internet, so they have no owner or location. DWM IP recognises them and explains what they are instead:",
      ],
      items: [
        {
          term: "Private (10.x, 172.16–31.x, 192.168.x, fc00::/7)",
          text: "Handed out by routers inside homes and offices.",
        },
        {
          term: "Carrier-grade NAT (100.64.0.0/10)",
          text: "Used by providers that share one public IP between many customers.",
        },
        {
          term: "Loopback, link-local and documentation",
          text: "127.0.0.1 and ::1 point back at your own device, 169.254.x and fe80:: are self-assigned, and 192.0.2.x, 198.51.100.x, 203.0.113.x and 2001:db8:: are reserved for examples.",
        },
      ],
    },
    {
      id: "uses",
      heading: "Common reasons to look up an IP",
      items: [
        {
          term: "A sign-in alert from an unknown place",
          text: "See whether the address belongs to a mobile carrier near you, a VPN, or a hosting company on the other side of the world.",
        },
        {
          term: "Server logs and firewalls",
          text: "Find out who is behind repeated requests or scans, and which range to block.",
        },
        {
          term: "Spam and phishing emails",
          text: "Look up the sending server's IP from the email's Received headers, then report it to the abuse contact.",
        },
        {
          term: "Checking a service's hosting",
          text: "See which cloud, CDN or provider an address belongs to before you allow it through a firewall.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How do I look up an IP address?",
      a: "Type or paste the IP address into the box on this page and press Look up. DWM IP shows the organisation and ASN that run it, the registered network and owner, the abuse contact, the reverse DNS hostname and an approximate location.",
    },
    {
      q: "Can I find out who owns an IP address?",
      a: "You can find the organisation that owns or runs it: an internet provider, mobile carrier, hosting company, university or business, as registered with the regional internet registry. You can't find the individual customer using it; only the provider knows that.",
    },
    {
      q: "Can an IP lookup find someone's exact location?",
      a: "No. IP geolocation is approximate and usually points to the provider's network in a city or region, not a home. VPNs, proxies and mobile networks often show a location far from the real user.",
    },
    {
      q: "Why do different IP lookup sites show different locations?",
      a: "Each site uses its own geolocation database, and those databases are built from registry records, provider feeds and measurements that disagree, especially at city level. Country is usually right; the city is a best guess.",
    },
    {
      q: "How do I report abuse from an IP address?",
      a: "Look the address up and use the abuse contact shown in the result. That's the email the network's owner publishes in the registry for spam, scanning and attack reports. Include the IP, the exact time with time zone, and the relevant log lines.",
    },
    {
      q: "Does it work with IPv6 addresses?",
      a: "Yes. Paste any IPv6 address, in full or shortened form, such as 2001:4860:4860::8888. The same owner, network, hostname and location details are shown.",
    },
    {
      q: "Is the IP lookup free? Are my lookups saved?",
      a: "It's free, with no sign-up and no ads. The addresses you look up aren't saved by DWM IP; results may be cached for a few minutes so repeat lookups are fast. There's a limit of 60 lookups a minute to keep the free data sources usable for everyone.",
    },
  ],
  ogHeadline: ["IP address lookup", "Owner, ISP & location"],
  ogChips: ["IPv4 & IPv6", "ASN & owner", "Abuse contact", "Free"],
  dateModified: UPDATED,
  updatedLabel: UPDATED_LABEL,
};

const domainToIp: LandingPage = {
  slug: "domain-to-ip",
  label: "Domain to IP lookup",
  blurb: "Find the IPv4 and IPv6 addresses of any website",
  title: "Domain to IP Lookup: Find Any Website's IP Address",
  description:
    "Find a website's IP address: enter a domain or URL to see its IPv4 (A) and IPv6 (AAAA) addresses and the network, owner and location behind them. Free.",
  h1: "Domain to IP lookup",
  answer:
    "Type a domain such as example.com, or paste a full URL, to find the IP addresses it points to. You'll see every IPv4 (A) and IPv6 (AAAA) address in its DNS, and who runs the network behind the first one.",
  appName: "DWM Domain to IP Lookup",
  featureList: [
    "Find the IPv4 (A) and IPv6 (AAAA) addresses of any domain",
    "Paste a full URL: the scheme, path and port are stripped",
    "Works with subdomains and international domain names",
    "Hosting organisation, ASN and network of the first address",
    "Approximate location of the server with a map",
    "Shareable result links",
  ],
  howTo: {
    name: "How to find a website's IP address",
    steps: [
      {
        name: "Enter the domain",
        text: "Type a domain like github.com or a subdomain like mail.example.com. Pasting a full link such as https://example.com/page works too.",
      },
      {
        name: "Press Look up",
        text: "DWM IP asks DNS for the domain's A (IPv4) and AAAA (IPv6) records, following any CNAME aliases along the way.",
      },
      {
        name: "Read the addresses",
        text: "Every address the domain points to is listed, and the first one is looked up in full: hosting organisation, ASN, network, owner and approximate location.",
      },
    ],
  },
  sections: [
    {
      id: "how-dns-works",
      heading: "How a domain becomes an IP address",
      paragraphs: [
        "Computers connect to IP addresses, not names. When you open a website, your device asks a DNS resolver for the domain's A records (IPv4 addresses) and AAAA records (IPv6 addresses), then connects to one of them.",
        "A domain can point to several addresses for load balancing or redundancy, and many domains can share one address on the same server. Some names are aliases (CNAME records) for another name, which is then resolved to an IP.",
      ],
    },
    {
      id: "command-line",
      heading: "Find a domain's IP from the command line",
      paragraphs: [
        "Every operating system has a DNS tool built in. Replace example.com with the domain you want:",
      ],
      commands: [
        { label: "Windows (Command Prompt or PowerShell)", command: "nslookup example.com" },
        { label: "Mac and Linux, IPv4", command: "dig +short example.com A" },
        { label: "Mac and Linux, IPv6", command: "dig +short example.com AAAA" },
        { label: "Mac and Linux, both", command: "host example.com" },
      ],
    },
    {
      id: "cdn",
      heading: "Why the IP might not be the website's own server",
      items: [
        {
          term: "CDNs and proxies",
          text: "Sites behind Cloudflare, Fastly, Akamai or Amazon CloudFront point their DNS at the CDN, so the address you see belongs to the CDN, not the origin server. That's by design, and this tool only shows what public DNS returns.",
        },
        {
          term: "Load balancing",
          text: "Big sites hand out different addresses depending on where you are and when you ask, so two lookups can return different IPs.",
        },
        {
          term: "Shared hosting",
          text: "Thousands of small sites can share one IP. Typing that IP into a browser usually won't open the site you looked up.",
        },
      ],
    },
    {
      id: "uses",
      heading: "When you'd look up a domain's IP",
      items: [
        {
          term: "Checking a DNS change",
          text: "After moving a site or changing hosts, confirm the domain now points to the new server's address.",
        },
        {
          term: "Firewall and allow lists",
          text: "Find the addresses a service uses before you allow them through a firewall or VPN.",
        },
        {
          term: "Finding a site's host",
          text: "See which hosting company, cloud or CDN a website runs on.",
        },
        {
          term: "Troubleshooting",
          text: "If a site won't load, check that its domain still resolves to an address at all.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How do I find the IP address of a website?",
      a: "Enter the website's domain, for example wikipedia.org, in the box on this page and press Look up. You'll see all the IPv4 and IPv6 addresses it points to. From a terminal, run nslookup example.com on Windows or dig +short example.com on Mac and Linux.",
    },
    {
      q: "Can a website have more than one IP address?",
      a: "Yes. Most large sites have several IPv4 addresses and several IPv6 addresses for load balancing and redundancy, and DWM IP lists all of them. Your browser picks one and falls back to another if it fails.",
    },
    {
      q: "Why does a website's IP address change between lookups?",
      a: "Large sites and CDNs rotate addresses and answer differently depending on location, so repeated lookups can return different IPs. A site can also move to a new host, which changes its IP for everyone.",
    },
    {
      q: "Why does the IP belong to Cloudflare instead of the website?",
      a: "The site uses Cloudflare (or another CDN or proxy) in front of its real server, and its DNS points to the CDN. The origin server's address is deliberately kept private, and a DNS lookup can't reveal it.",
    },
    {
      q: "What's the difference between an A record and an AAAA record?",
      a: "An A record maps a domain to an IPv4 address, written like 203.0.113.10. An AAAA record maps it to an IPv6 address, written like 2001:db8::10. Many domains have both, and DWM IP shows them all.",
    },
    {
      q: "Can I open a website by typing its IP address?",
      a: "Sometimes. It works for a site with its own dedicated server, but sites on shared hosting or behind a CDN usually show an error or a different page, because the server needs the domain name to know which site you want.",
    },
    {
      q: "Does it work with subdomains and international domains?",
      a: "Yes. Subdomains like mail.example.com or api.example.com work, and international names like bücher.de are converted to their DNS form (xn--bcher-kva.de) automatically.",
    },
  ],
  ogHeadline: ["Domain to IP lookup", "Find any website's IP"],
  ogChips: ["A & AAAA records", "Hosting network", "Paste a URL", "Free"],
  dateModified: UPDATED,
  updatedLabel: UPDATED_LABEL,
};

const whatIsMyIsp: LandingPage = {
  slug: "what-is-my-isp",
  label: "What is my ISP",
  blurb: "See which internet provider you're connected through",
  title: "What Is My ISP? Check Your Internet Provider & ASN",
  description:
    "See which internet provider you're connected through right now, with its ASN, IP range and hostname. Works on Wi-Fi, mobile data and VPNs. Free, no sign-up.",
  h1: "What is my ISP?",
  answer:
    "Your internet provider is shown below, detected from your public IP address: the company that runs the network you're on right now, with its autonomous system number (ASN) and IP range.",
  appName: "DWM What Is My ISP",
  featureList: [
    "Shows the internet provider of your current connection",
    "Autonomous system number (ASN) and IP range",
    "Your public IP and reverse DNS hostname",
    "Works on Wi-Fi, mobile data, VPNs and proxies",
    "Check the provider of any other IP address",
  ],
  howTo: {
    name: "How to find out who your internet provider is",
    steps: [
      {
        name: "Open this page",
        text: "On the connection you want to check: your home Wi-Fi, your phone's mobile data, or your office network.",
      },
      {
        name: "Read your provider",
        text: "The provider's name, ASN and IP range appear at the top, worked out from the public IP address your connection uses.",
      },
      {
        name: "Compare connections",
        text: "Switch between Wi-Fi and mobile data, or turn a VPN on and off, and reload. The provider changes with the network you're using.",
      },
    ],
  },
  sections: [
    {
      id: "how",
      heading: "How your ISP is detected",
      paragraphs: [
        "Every public IP address is part of a block announced on the internet by one network, identified by an autonomous system number (ASN). DWM IP takes the IP your connection uses, finds the ASN that announces it through Team Cymru's IP-to-ASN service, and shows the organisation registered to that ASN.",
        "The reverse DNS hostname is shown too, when your provider sets one. It often contains the provider's own domain, which helps when the registered name is a parent company you don't recognise.",
      ],
    },
    {
      id: "unexpected",
      heading: "Why the name might not be the company you pay",
      items: [
        {
          term: "Parent or wholesale networks",
          text: "Smaller brands often resell another company's network, and registries list the legal name of the network owner rather than the brand on your bill.",
        },
        {
          term: "VPNs and proxies",
          text: "With a VPN on, you'll see the VPN's hosting provider instead of your ISP. That's how you know the VPN is working.",
        },
        {
          term: "iCloud Private Relay and similar",
          text: "Private Relay sends Safari traffic through partners such as Akamai, Cloudflare and Fastly, so one of those appears instead of your provider.",
        },
        {
          term: "Cloud and hosting companies",
          text: "If you see Amazon, Google Cloud, Microsoft, DigitalOcean or similar, your traffic is going through a server, VPN or proxy rather than straight from your provider.",
        },
      ],
    },
    {
      id: "asn",
      heading: "What is an ASN?",
      paragraphs: [
        "An autonomous system is a network run by one organisation, such as an internet provider, a mobile carrier, a cloud provider or a large company. Each one has a number (an ASN, written like AS15169) that other networks use to route traffic to it. Your ISP's ASN identifies its whole network, not you.",
      ],
    },
    {
      id: "without-a-tool",
      heading: "Other ways to find your internet provider",
      items: [
        {
          term: "Your bill or account",
          text: "The provider's name is on every invoice and in the welcome email.",
        },
        {
          term: "Your router",
          text: "The router's label or admin page usually shows the provider's name or its login details.",
        },
        {
          term: "Your building",
          text: "If internet came with your flat or office, the landlord or building manager arranged it and knows the provider.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is my ISP?",
      a: "Your ISP (internet service provider) is the company whose network your device is connected through right now. It's shown at the top of this page, worked out from your public IP address, along with its ASN and IP range.",
    },
    {
      q: "What does ISP stand for?",
      a: "Internet service provider: the company that connects you to the internet, whether that's a broadband or fibre provider at home, a mobile carrier on your phone, or your company's network at work.",
    },
    {
      q: "Why does it show a different company from the one I pay?",
      a: "Many providers run on a parent company's or wholesaler's network, and the internet registries list the network owner's legal name. The hostname shown on this page often contains your provider's own domain, which can confirm it.",
    },
    {
      q: "Why does it show my VPN instead of my provider?",
      a: "Because websites see the VPN's IP address, not yours, and that address belongs to the VPN's hosting network. Turn the VPN off and reload to see your real provider.",
    },
    {
      q: "Can my ISP see what I do online?",
      a: "Your ISP can see which servers you connect to and when, and usually which domain names you look up. With HTTPS it can't see the pages, messages or passwords inside those connections. A VPN hides the destinations from your ISP, but the VPN provider can then see them instead.",
    },
    {
      q: "How do I check the ISP of another IP address?",
      a: "Use the lookup box on this page: enter any IP address or domain and you'll see the organisation and ASN that run it, plus its registered owner, registry and approximate location.",
    },
    {
      q: "Is this ISP checker free?",
      a: "Yes. There's no sign-up and no ads, and your IP address is used only to answer your request. It's never stored.",
    },
  ],
  ogHeadline: ["What is my ISP?", "Your internet provider"],
  ogChips: ["ISP name", "ASN", "IP range", "Free"],
  dateModified: UPDATED,
  updatedLabel: UPDATED_LABEL,
};

const whatIsMyIpv6: LandingPage = {
  slug: "what-is-my-ipv6",
  label: "What is my IPv6 address",
  blurb: "See your IPv6 address and whether your connection supports IPv6",
  title: "What Is My IPv6 Address? Check If You Have IPv6",
  description:
    "See your public IPv6 and IPv4 addresses side by side and find out whether your internet connection supports IPv6. Instant, free, no sign-up.",
  h1: "What is my IPv6 address?",
  answer:
    "Your IPv6 address, if your connection has one, is shown below next to your IPv4 address. Your browser checks each one separately, so you can see at a glance whether your network supports IPv6.",
  appName: "DWM What Is My IPv6",
  featureList: [
    "Shows your public IPv6 address and IPv4 address",
    "Tells you whether your connection supports IPv6",
    "Each protocol is checked separately from your browser",
    "Look up any IPv6 address's owner, network and location",
  ],
  howTo: {
    name: "How to check your IPv6 address",
    steps: [
      {
        name: "Open this page",
        text: "On the device and network you want to check. Your IPv4 and IPv6 addresses are checked as soon as it loads.",
      },
      {
        name: "Read the result",
        text: "If an IPv6 address appears, your connection supports IPv6. If it says no IPv6 address was detected, you're on IPv4 only.",
      },
      {
        name: "Copy or look it up",
        text: "Copy your address with one click, or paste any IPv6 address into the lookup box to see its owner, network and location.",
      },
    ],
  },
  sections: [
    {
      id: "ipv4-vs-ipv6",
      heading: "IPv4 vs IPv6",
      items: [
        {
          term: "IPv4",
          text: "32-bit addresses written as four numbers, like 203.0.113.42. There are only about 4.3 billion of them, so providers share them between customers.",
        },
        {
          term: "IPv6",
          text: "128-bit addresses written in hexadecimal, like 2001:db8:85a3::8a2e:370:7334. There are enough for every device to have its own public address.",
        },
        {
          term: "Dual stack",
          text: "Most networks with IPv6 also keep IPv4, so you have both and your device uses whichever works best for each site.",
        },
      ],
    },
    {
      id: "no-ipv6",
      heading: "Why you might not have an IPv6 address",
      items: [
        {
          term: "Your provider doesn't offer it yet",
          text: "Many home and business providers still only hand out IPv4, or only enable IPv6 on newer plans and equipment.",
        },
        {
          term: "Your router isn't passing it on",
          text: "The router has to request an IPv6 prefix from your provider and hand addresses to your devices. Look for an IPv6 setting (often called native, DHCPv6 or prefix delegation) in its admin page.",
        },
        {
          term: "It's turned off on your device or VPN",
          text: "IPv6 can be disabled in a network adapter's settings, and some VPNs block IPv6 to stop it bypassing the tunnel.",
        },
        {
          term: "The check was blocked",
          text: "Your browser checks IPv6 by contacting ipify's IPv6-only address. A strict ad blocker or firewall can block that, which also shows as no IPv6.",
        },
      ],
    },
    {
      id: "full-test",
      heading: "Need a deeper IPv6 test?",
      paragraphs: [
        "This page answers the everyday question: do you have IPv6, and what's the address? If you're troubleshooting a network, test-ipv6.com also checks DNS over IPv6, large packets and fallback behaviour.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is my IPv6 address?",
      a: "Your public IPv6 address is shown at the top of this page, if your connection has one. It's the address websites see when you connect to them over IPv6. If it says no IPv6 address was detected, your connection is IPv4 only.",
    },
    {
      q: "Why don't I have an IPv6 address?",
      a: "Usually because your internet provider doesn't offer IPv6 on your plan yet, or your router isn't requesting it. It can also be switched off on your device or blocked by a VPN. Everything still works over IPv4.",
    },
    {
      q: "Can I have both IPv4 and IPv6?",
      a: "Yes, and most IPv6 connections do. This is called dual stack: your device has both addresses and uses IPv6 for sites that support it and IPv4 for the rest.",
    },
    {
      q: "Why does my IPv6 address keep changing?",
      a: "Most phones and computers use temporary IPv6 addresses for privacy and replace them regularly, often daily. Some providers also change the whole prefix they give your router from time to time.",
    },
    {
      q: "Is IPv6 faster than IPv4?",
      a: "Not inherently. Speed depends on your provider's network. IPv6 can be slightly quicker on networks that would otherwise route IPv4 through carrier-grade NAT, but most people won't notice a difference.",
    },
    {
      q: "Should I disable IPv6?",
      a: "Usually not. Modern systems are built to use it, and some services work better over IPv6. Disabling it is mostly a troubleshooting step or a VPN leak precaution.",
    },
    {
      q: "Can I get my IPv6 address from the terminal?",
      a: "Use this page in a browser. ip.dealwithmuhammad.com is reached over IPv4, so curl ip.dealwithmuhammad.com shows your IPv4 address. On your own machine, ip -6 addr (Linux), ifconfig (Mac) or ipconfig (Windows) lists the IPv6 addresses your device has.",
    },
  ],
  ogHeadline: ["What is my IPv6 address?", "Do you have IPv6?"],
  ogChips: ["IPv6", "IPv4", "Dual stack", "Free"],
  dateModified: UPDATED,
  updatedLabel: UPDATED_LABEL,
};

export const PAGES: Record<LandingSlug, LandingPage> = {
  "ip-lookup": ipLookup,
  "domain-to-ip": domainToIp,
  "what-is-my-isp": whatIsMyIsp,
  "what-is-my-ipv6": whatIsMyIpv6,
};

export const PAGE_LIST: LandingPage[] = Object.values(PAGES);
