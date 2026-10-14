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
  tagline: "Your public IP, location and ISP, instantly",
  appDescription:
    "A free tool that shows your public IPv4 and IPv6 address, approximate location, time zone, internet provider (ASN) and reverse DNS hostname, and looks up the network, owner and location of any IP address or domain.",
  color: "#0891b2",
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
      text: "Run curl ip.dealwithmuhammad.com to get just your IP, or add /json for every detail.",
    },
    {
      title: "Private and ad-free",
      text: "No ads, no trackers selling your data, and your IP address is never stored.",
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
      q: "How do I hide or change my IP address?",
      a: "Use a VPN, a proxy or the Tor Browser to show a different IP address to websites. Restarting your router or switching between Wi-Fi and mobile data often gives you a new IP from your provider too.",
    },
    {
      q: "How do I find my IP from the command line?",
      a: "Run curl ip.dealwithmuhammad.com to print your IP address, or curl ip.dealwithmuhammad.com/json for your IP with location, time zone and ISP as JSON. Use curl -4 or curl -6 to force IPv4 or IPv6.",
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
};
