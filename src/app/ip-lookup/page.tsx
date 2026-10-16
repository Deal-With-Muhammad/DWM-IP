import { LandingPage } from "@/components/landing-page";
import { LookupPanel } from "@/components/ip/lookup-panel";
import { PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

const page = PAGES["ip-lookup"];

export const metadata = pageMetadata(page);

export default function IpLookupPage() {
  return (
    <LandingPage page={page}>
      <LookupPanel
        title="Look up an IP address"
        description="Enter an IPv4 or IPv6 address (a domain or URL works too)."
        placeholder="8.8.8.8 or 2001:4860:4860::8888"
        examples={["8.8.8.8", "1.1.1.1", "9.9.9.9", "2606:4700:4700::1111", "2001:4860:4860::8888"]}
      />
    </LandingPage>
  );
}
