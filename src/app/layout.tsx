import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { AUTHOR, DWM_ORIGIN } from "@/lib/dwm";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "Utilities",
  alternates: { canonical: "/" },
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // og:image / twitter:image come from app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="me" href={AUTHOR.url} />
        <link rel="alternate" type="text/plain" title="LLM-friendly summary" href="/llms.txt" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} min-h-dvh overflow-x-clip`}>
        <Providers>{children}</Providers>
        {/* Shared DWM visitor analytics (cookie-free page views + window.dwm(event)).
            Only counts on *.dealwithmuhammad.com, so local dev is ignored. */}
        <Script src={`${DWM_ORIGIN}/dwm.js`} data-site={site.id} strategy="afterInteractive" />
        {/* The 9-dot DWM app launcher, defined as <dwm-apps> by this script. */}
        <Script src={`${DWM_ORIGIN}/dwm-apps.js`} strategy="afterInteractive" />
      </body>
    </html>
  );
}
