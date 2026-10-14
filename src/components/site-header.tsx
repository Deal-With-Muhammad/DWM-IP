import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import { BrandIcon } from "./brand-icon";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pt-5 sm:px-6 sm:pt-7">
      <Link href="/" className="flex min-w-0 items-center gap-3 rounded-xl" aria-label={`${site.name} home`}>
        <span className="grid size-10 flex-none place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/25">
          <BrandIcon className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-base leading-tight font-semibold">{site.name}</span>
          <span className="block truncate text-xs text-muted">{site.tagline}</span>
        </span>
      </Link>
      <div className="flex flex-none items-center gap-1">
        <ThemeToggle />
        {/* Google-style launcher for every DWM tool (see layout.tsx). */}
        <dwm-apps current={site.id} />
      </div>
    </header>
  );
}
