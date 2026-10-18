/**
 * This tool's logo, the same art as public/icon.svg, the favicon and the launcher tile.
 * The header clips it to its rounded tile.
 */
export function BrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <rect width="512" height="512" fill="#1a7fbf" />
      <g transform="translate(72 72) scale(.72)">
        <path
          d="M232 96h40a120 120 0 0 1 0 240h-36L178 424V140A44 44 0 0 1 222 96Z M220 216a52 52 0 1 0 104 0a52 52 0 1 0 -104 0Z"
          fill="#ffffff"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}
