import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { TERMS } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: TERMS.title,
  description: TERMS.description,
  alternates: { canonical: TERMS.path },
  openGraph: {
    type: "website",
    url: TERMS.path,
    siteName: site.name,
    title: `${TERMS.title} | ${site.name}`,
    description: TERMS.description,
    locale: "en_US",
  },
  twitter: { title: `${TERMS.title} | ${site.name}`, description: TERMS.description },
};

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
