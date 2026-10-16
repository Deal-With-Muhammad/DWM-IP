import { Suspense } from "react";

import { LandingPage, ToolCard } from "@/components/landing-page";
import { LookupPanel } from "@/components/ip/lookup-panel";
import { IspSkeleton, VisitorIsp } from "@/components/ip/visitor-slots";
import { PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

const page = PAGES["what-is-my-isp"];

export const metadata = pageMetadata(page);

export default function WhatIsMyIspPage() {
  return (
    <LandingPage page={page}>
      <ToolCard label="Your internet provider">
        <Suspense fallback={<IspSkeleton />}>
          <VisitorIsp />
        </Suspense>
      </ToolCard>
      <LookupPanel
        title="Check the ISP of any IP address"
        description="Enter an IP address or domain to see the organisation and network behind it."
        examples={["8.8.8.8", "1.1.1.1", "github.com"]}
      />
    </LandingPage>
  );
}
