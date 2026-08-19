import type { ReactNode } from "react";

/**
 * Simplified monochrome glyphs for AI assistants — currentColor only,
 * no brand assets, no colour, in keeping with the ink/paper design system.
 */
const PATHS: Record<string, ReactNode> = {

  chatgpt: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M4.6 7.8l14.8 8.4M19.4 7.8L4.6 16.2" />
    </>
  ),
  claude: (
    <>
      <path d="M7 19 12 5l5 14" />
      <path d="M9.2 14h5.6" />
    </>
  ),
  perplexity: (
    <>
      <rect x="4" y="4" width="16" height="16" />
      <path d="M12 4v16M4 12h16" />
    </>
  ),
  grok: (
    <>
      <path d="M5 19 19 5" />
      <path d="M13 5h6v6" />
    </>
  ),
  copilot: (
    <>
      <path d="M4 14c0-4 3.6-7 8-7s8 3 8 7-3.6 5-8 5-8-1-8-5Z" />
      <path d="M9 13.5h.01M15 13.5h.01" />
    </>
  ),
  mistral: (
    <>
      <path d="M4 5v14M9.3 5v14M14.7 5v14M20 5v14" />
      <path d="M4 5h5.3M14.7 5H20M9.3 12h5.4" />
    </>
  ),
};

export function AiIcon({ name, className }: { name: string; className?: string }) {
  const glyph = PATHS[name] ?? PATHS["perplexity"];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      className={className}
    >
      {glyph}
    </svg>
  );
}
