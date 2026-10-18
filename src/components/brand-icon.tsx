/**
 * This tool's mark, drawn in the 512 x 512 space of public/icon.svg (the same art as
 * the favicon and the launcher tile). Size it to the whole brand tile: white parts use
 * currentColor and knock-outs are painted in the brand colour, so no mask ids are needed.
 */
export function BrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <path
        d="M156 146v220M252 366V146h38a66 66 0 0 1 0 132h-38"
        fill="none"
        stroke="currentColor"
        strokeWidth={64}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
