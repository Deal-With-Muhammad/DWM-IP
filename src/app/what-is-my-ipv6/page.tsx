import { Suspense } from "react";

import { LandingPage, ToolCard } from "@/components/landing-page";
import { LookupPanel } from "@/components/ip/lookup-panel";
import { DualStackSkeleton, VisitorDualStack } from "@/components/ip/visitor-slots";
import { PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

const page = PAGES["what-is-my-ipv6"];

export const metadata = pageMetadata(page);

export default function WhatIsMyIpv6Page() {
  return (
    <LandingPage page={page}>
      <ToolCard label="Your IPv6 and IPv4 addresses">
        <Suspense fallback={<DualStackSkeleton />}>
          <VisitorDualStack />
        </Suspense>
      </ToolCard>
      <LookupPanel
        title="Look up an IPv6 address"
        description="Paste any IPv6 address to see its owner, network and approximate location."
        placeholder="2001:4860:4860::8888"
        examples={["2001:4860:4860::8888", "2606:4700:4700::1111", "2620:fe::fe", "google.com"]}
      />
    </LandingPage>
  );
}
