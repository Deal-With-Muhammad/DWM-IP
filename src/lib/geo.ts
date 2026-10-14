// Browser-safe location helpers (no Node imports), shared by server and client code.

export type Geo = {
  city?: string;
  region?: string;
  countryCode?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
};

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function countryName(code?: string) {
  if (!code || !/^[A-Z]{2}$/.test(code)) return undefined;
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function flagEmoji(code?: string) {
  if (!code || !/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

export function placeLabel(geo?: Geo | null) {
  if (!geo) return "";
  return [geo.city, geo.region, geo.country].filter(Boolean).join(", ");
}
