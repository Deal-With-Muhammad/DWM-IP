import Link from "next/link";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { LEGAL_UPDATED, type LegalDoc, type LegalSection } from "@/lib/legal";

const LINK_CLASS = "underline underline-offset-2 transition-colors hover:text-accent";
const STRONG_CLASS = "font-semibold text-foreground";
const TEXT_CLASS = "mt-3 leading-relaxed text-foreground/80";
const LIST_CLASS = "mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-foreground/80";

const LINKS = /(me@dealwithmuhammad\.com|\+60 11-3986 5270|https?:\/\/[^\s),]*[^\s),.])/g;

/** Plain text with the contact details and web addresses turned into links. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(LINKS).map((part, i) => {
        if (i % 2 === 0) return part;
        const href = part.startsWith("me@")
          ? `mailto:${part}`
          : part.startsWith("+60")
            ? "https://wa.me/601139865270"
            : part;
        return (
          <a key={part + i} className={LINK_CLASS} href={href}>
            {part}
          </a>
        );
      })}
    </>
  );
}

/** "Label :: text" shows the label in bold. */
function Item({ text }: { text: string }) {
  const split = text.indexOf(" :: ");
  if (split < 0) return <Rich text={text} />;
  return (
    <>
      <strong className={STRONG_CLASS}>{text.slice(0, split)}:</strong> <Rich text={text.slice(split + 4)} />
    </>
  );
}

function Body({ body }: { body: LegalSection["body"] }) {
  return (
    <>
      {body.map((block) =>
        typeof block === "string" ? (
          <p key={block.slice(0, 40)} className={TEXT_CLASS}>
            <Rich text={block} />
          </p>
        ) : (
          <ul key={block[0].slice(0, 40)} className={LIST_CLASS}>
            {block.map((item) => (
              <li key={item.slice(0, 40)}>
                <Item text={item} />
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

/** The shared layout of /privacy and /terms: plain text under the site's own header and footer. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const other =
    doc.path === "/privacy"
      ? { href: "/terms", label: "Terms of Use" }
      : { href: "/privacy", label: "Privacy Policy" };
  return (
    <div className="relative isolate">
      <div className="page-backdrop" aria-hidden />
      <SiteHeader />
      <main id="main" className="mx-auto mt-8 w-full max-w-3xl px-4 sm:mt-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated {LEGAL_UPDATED}</p>
        {doc.intro ? <p className="mt-5 leading-relaxed text-foreground/80">{doc.intro}</p> : null}
        <div className="mt-10 flex flex-col gap-9">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
              <Body body={s.body} />
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">
          See also the{" "}
          <Link className={LINK_CLASS} href={other.href}>
            {other.label}
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
