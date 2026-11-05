import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { PRIVACY } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.description,
  alternates: { canonical: PRIVACY.path },
  openGraph: {
    type: "website",
    url: PRIVACY.path,
    siteName: site.name,
    title: `${PRIVACY.title} | ${site.name}`,
    description: PRIVACY.description,
    locale: "en_US",
  },
  twitter: { title: `${PRIVACY.title} | ${site.name}`, description: PRIVACY.description },
};

export default function Page() {
  return <LegalPage doc={PRIVACY} />;
}
