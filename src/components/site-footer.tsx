import { ArrowUpRight, Globe, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "./brand-marks";
import { VisitCounter } from "./visit-counter";
import { AUTHOR, otherTools } from "@/lib/dwm";
import { site } from "@/lib/site";

const textLink = "inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-accent";
const iconLink =
  "grid size-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 flex w-full max-w-5xl flex-col items-center gap-4 px-4 pb-8 sm:px-6">
      <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 sm:flex-row sm:justify-between">
        <div className="flex min-w-0 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p className="text-sm font-semibold">
            Built by{" "}
            <a className="transition-colors hover:text-accent" href={AUTHOR.url} rel="author noopener">
              {AUTHOR.name}
            </a>
          </p>
          <p className="text-xs text-muted">Web &amp; mobile app developer in {AUTHOR.location}</p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted sm:justify-start">
            <a className={textLink} href={AUTHOR.url} rel="noopener">
              <Globe className="size-3.5" aria-hidden /> dealwithmuhammad.com
            </a>
            <a className={textLink} href={`mailto:${AUTHOR.email}`}>
              <Mail className="size-3.5" aria-hidden /> {AUTHOR.email}
            </a>
            <a className={textLink} href={site.caseStudy} rel="noopener">
              <ArrowUpRight className="size-3.5" aria-hidden /> Case study
            </a>
          </div>
        </div>
        <div className="flex flex-none items-center gap-2">
          <a
            className={iconLink}
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon className="size-4" aria-hidden />
          </a>
          <a
            className={iconLink}
            href={AUTHOR.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="size-4" aria-hidden />
          </a>
        </div>
      </div>

      <nav
        aria-label="More free tools by Muhammad Ahmad"
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted"
      >
        <span className="text-muted/80">More free tools:</span>
        {otherTools(site.id).map((t) => (
          <a key={t.id} className={textLink} href={t.url} title={t.blurb}>
            {t.name}
          </a>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted">
        <span>No ads, no sign-up</span>
        <span aria-hidden>·</span>
        <span>{site.privacyLine}</span>
        <VisitCounter />
      </div>
    </footer>
  );
}
