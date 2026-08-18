// Canonical site origin (see project knowledge: custom domain).
export const SITE_URL = "https://ppwr.clickscale.dev";

// Shared social preview image (paper-label card in public/).
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_ALT =
  "ES Iepakojuma Ceļvedis — PPWR, Regula (ES) 2025/40, EPR maksu kalkulators 27 valstīm";

/** og:image + twitter:image tags for a leaf route. */
export const socialImageMeta = [
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: OG_IMAGE_ALT },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: OG_IMAGE },
  { name: "twitter:image:alt", content: OG_IMAGE_ALT },
];

/** Self-referencing og:url for a leaf route path (e.g. "/celvedis"). */
export const canonicalUrl = (path: string) => `${SITE_URL}${path}`;
