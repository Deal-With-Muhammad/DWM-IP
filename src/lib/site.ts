import type { SiteConfig } from "./site-config";

// Single source of truth for this site's copy. Keep every claim accurate to
// what the code actually does (src/lib/ip.ts and src/app/api).

export const site: SiteConfig = {
  id: "ip",
  name: "DWM IP",
  alternateNames: ["What is my IP", "My IP address", "IP lookup"],
  url: "https://ip.dealwithmuhammad.com",
  host: "ip.dealwithmuhammad.com",
  title: "What Is My IP Address? Check Your Public IP | DWM IP",
  description:
    "See your public IP address (IPv4 and IPv6), approximate location, ISP and hostname instantly, or look up any IP or domain. Free, no ads, no sign-up.",
  answer:
    "Your public IP address is the one every website and app sees when you connect from this network. It's assigned by your internet provider, or by your VPN if you use one, and DWM IP never stores it.",
  tagline: "Your public IP, location and ISP, instantly",
  appDescription:
    "A free tool that shows your public IPv4 and IPv6 address, approximate location, time zone, internet provider (ASN) and reverse DNS hostname, and looks up the network, owner and location of any IP address or domain.",
  color: "#1a7fbf",
  keywords: [
    "what is my ip",
    "what is my ip address",
    "my ip",
    "my ip address",
    "what's my ip",
    "check my ip",
    "my public ip",
    "ipv4 address",
    "ipv6 address",
    "ip lookup",
    "ip address lookup",
    "ip location",
    "ip checker",
    "isp lookup",
    "asn lookup",
    "whois ip",
    "reverse dns lookup",
    "find ip address of website",
    "DWM IP",
  ],
  featureList: [
    "Shows your public IPv4 and IPv6 address",
    "Approximate city, region, country and time zone",
    "Internet provider and ASN (autonomous system)",
    "Reverse DNS hostname",
    "Look up any IP address or domain name",
    "Plain-text and JSON API for the terminal (curl)",
    "No ads, no sign-up, and no IP addresses stored",
  ],
  howTo: {
    name: "How to find your IP address",
    description: "Find your public IP address, and look up any other IP or domain.",
    steps: [
      {
        name: "Open DWM IP",
        text: "Open ip.dealwithmuhammad.com. Your public IP address appears at the top straight away, with IPv4 and IPv6 shown separately when you have both.",
      },
      {
        name: "Check the details",
        text: "Below it you'll see your approximate location, time zone, internet provider (ISP and ASN) and reverse DNS hostname. Click the copy button to copy your IP.",
      },
      {
        name: "Look up another IP or domain",
        text: "Type any IP address or a domain such as google.com into the lookup box to see its network, owner, country and hostname.",
      },
    ],
  },
  features: [
    {
      title: "IPv4 and IPv6",
      text: "Both of your public addresses, detected separately, so you can tell if your connection supports IPv6.",
    },
    {
      title: "Location and time zone",
      text: "The approximate city, region and country your IP belongs to, with its time zone and a map.",
    },
    {
      title: "ISP and ASN",
      text: "Which network you're on: the internet provider, its autonomous system number and the IP range.",
    },
    {
      title: "Look up any IP or domain",
      text: "Enter an IP address or a domain to see who owns it, where it's registered and its hostname.",
    },
    {
      title: "Made for the terminal",
      text: "Run curl ip.dealwithmuhammad.com to get just your IPv4 address, or add /json for every detail.",
    },
    {
      title: "Private and ad-free",
      text: "No ads, no trackers selling your data, and your IP address is never stored.",
    },
  ],
  sections: [
    {
      id: "what-it-reveals",
      heading: "What your IP address reveals, and what it doesn't",
      paragraphs: [
        "Every website you visit sees your public IP address, because that's where it sends its reply. On its own, an IP address gives away less than most people think.",
      ],
      items: [
        {
          term: "It does show your internet provider",
          text: "IP ranges are registered to the network that runs them, so anyone can see which ISP, mobile carrier, company or VPN you're connected through.",
        },
        {
          term: "It does show a rough area",
          text: "Usually your country and often a city or region, but that's frequently your provider's nearest hub rather than where you are.",
        },
        {
          term: "It can hint at a VPN or proxy",
          text: "Addresses that belong to hosting companies, or a location that doesn't match your device's time zone, suggest traffic is going through a VPN, proxy or relay.",
        },
        {
          term: "It doesn't show your name or street address",
          text: "Only your provider can match an IP to a customer, and that normally needs a legal request. Your IP also doesn't give anyone access to your device or your browsing history.",
        },
      ],
    },
    {
      id: "any-device",
      heading: "How to find your IP address on any device",
      paragraphs: [
        "Your public IP is the same for every device on your Wi-Fi, so opening this page on any of them shows it. Your device also has a private IP (like 192.168.1.20) that only your router uses. Here's where to find that one:",
      ],
      items: [
        {
          term: "Windows",
          text: "Settings → Network & internet → Wi-Fi or Ethernet → your network's properties, and look for IPv4 address. Or run ipconfig in Command Prompt.",
        },
        {
          term: "Mac",
          text: "System Settings → Wi-Fi → Details next to your network, then TCP/IP. Or run ipconfig getifaddr en0 in Terminal.",
        },
        {
          term: "iPhone and iPad",
          text: "Settings → Wi-Fi, tap the ⓘ next to your network and scroll to IP Address.",
        },
        {
          term: "Android",
          text: "Settings → Network & internet → Internet, then tap your Wi-Fi network (the exact menu names vary by phone maker).",
        },
        {
          term: "Linux",
          text: "Run ip addr or hostname -I for private addresses, or curl ip.dealwithmuhammad.com for your public one.",
        },
        {
          term: "Your router",
          text: "The router's admin page (often 192.168.0.1 or 192.168.1.1) shows the public IP your provider gave it, usually under WAN or Internet status.",
        },
      ],
    },
    {
      id: "why-dwm-ip",
      heading: "Why use DWM IP",
      items: [
        {
          term: "IPv4 and IPv6 side by side",
          text: "Your browser checks each one separately, so you can see whether your connection has IPv6 rather than only whichever address it happened to use.",
        },
        {
          term: "Your ISP from routing data",
          text: "The provider name and ASN come from Team Cymru's IP-to-ASN service, the same internet routing data network engineers use.",
        },
        {
          term: "Look up any IP or domain",
          text: "Owner, network range, registry and abuse contact straight from the regional internet registries (RDAP), plus reverse DNS and a map.",
        },
        {
          term: "No ads, no sign-up, nothing stored",
          text: "No banner ads, no VPN offers and no account. Your IP is used to answer your request and is never saved.",
        },
        {
          term: "Works in the terminal",
          text: "curl ip.dealwithmuhammad.com prints your IP, /json returns every detail, and CORS is enabled so other pages can call it.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is my IP address?",
      a: "Your IP address is shown at the top of this page. It's your public IP: the address websites see when you connect to them. It's assigned by your internet provider (or your VPN), and it's usually shared by every device on your Wi-Fi network.",
    },
    {
      q: "What's the difference between IPv4 and IPv6?",
      a: "IPv4 addresses look like 203.0.113.42 and have run out, so many providers share them between customers. IPv6 addresses look like 2001:db8::1 and there are enough for every device. If DWM IP shows only an IPv4 address, your network doesn't support IPv6 yet.",
    },
    {
      q: "Why is my IP location wrong?",
      a: "IP location is an estimate taken from databases that map IP ranges to places, so it often shows your provider's nearest hub rather than your home, and can be off by tens of kilometres or more. A VPN, proxy, iCloud Private Relay or a mobile network will show their location instead of yours.",
    },
    {
      q: "What's the difference between a public and a private IP?",
      a: "Your public IP is the one the internet sees, shown here. Your router gives each device on your network a private IP such as 192.168.1.20 or 10.0.0.5, which only works inside your home or office network.",
    },
    {
      q: "Can someone find my home address from my IP?",
      a: "No. An IP address reveals your internet provider and an approximate area, not your street address. Only your provider can link an IP to a customer, and they normally only do that for law enforcement.",
    },
    {
      q: "Why does my IP address change?",
      a: "Most home and mobile connections get a dynamic IP that the provider can reassign, for example when your router restarts or your phone moves between networks. Switching from Wi-Fi to mobile data, or turning a VPN on or off, also changes the IP websites see.",
    },
    {
      q: "Is my IP address the same on all my devices?",
      a: "On the same Wi-Fi, yes: your router shares one public IP between every phone, laptop and TV on the network. A phone on mobile data, or a device using a VPN, has a different public IP.",
    },
    {
      q: "How do I hide or change my IP address?",
      a: "Use a VPN, a proxy or the Tor Browser to show a different IP address to websites. Restarting your router or switching between Wi-Fi and mobile data often gives you a new IP from your provider too.",
    },
    {
      q: "How can I tell if my VPN is working?",
      a: "Check this page with the VPN off, then on. If it's working, the IP address, location and internet provider all change to the VPN's. DWM IP also compares your device's time zone with your IP's location and tells you when they don't match.",
    },
    {
      q: "How do I find my IP from the command line?",
      a: "Run curl ip.dealwithmuhammad.com to print your IP address, or curl ip.dealwithmuhammad.com/json for your IP with location, time zone and ISP as JSON. The site is reached over IPv4, so the terminal shows your IPv4 address; open the page in a browser to see your IPv6 address too.",
    },
    {
      q: "Do you store my IP address?",
      a: "No. Your IP is used to answer your request and is never saved or logged by DWM IP. The site only counts anonymous page views, and it has no ads.",
    },
    {
      q: "Who made DWM IP?",
      a: "DWM IP was built by Muhammad Ahmad, a web and mobile app developer in Kuala Lumpur, Malaysia. See more of his work at dealwithmuhammad.com or email me@dealwithmuhammad.com.",
    },
  ],
  ogChips: ["IPv4 & IPv6", "Location", "ISP & ASN", "No ads", "100% free"],
  ogHeadline: ["What is my IP address?", "Your IP, location & ISP"],
  caseStudy: "https://www.dealwithmuhammad.com/work/dwm-ip",
  privacyLine: "Your IP address is never stored",
  dateModified: "2026-10-16",
  updatedLabel: "October 2026",
};
