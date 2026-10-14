import { Globe } from "lucide-react";

/** This tool's glyph, used in the header tile. Matches public/icon.svg. */
export function BrandIcon({ className }: { className?: string }) {
  return <Globe className={className} strokeWidth={2.2} aria-hidden />;
}
