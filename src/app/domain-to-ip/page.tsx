import { LandingPage } from "@/components/landing-page";
import { LookupPanel } from "@/components/ip/lookup-panel";
import { PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

const page = PAGES["domain-to-ip"];

export const metadata = pageMetadata(page);

export default function DomainToIpPage() {
  return (
    <LandingPage page={page}>
      <LookupPanel
        title="Find a website's IP address"
        description="Enter a domain or subdomain, or paste a full link."
        placeholder="example.com or https://example.com/page"
        examples={["google.com", "github.com", "wikipedia.org", "cloudflare.com"]}
      />
    </LandingPage>
  );
}
