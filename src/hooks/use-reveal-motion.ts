import { useEffect, useState } from "react";

/**
 * Reveal animations are opt-in and desktop-only.
 *
 * On iOS Safari a very tall document plus hundreds of composited
 * (transform/opacity) layers makes WebKit drop painted tiles — the page keeps
 * its scroll height but renders as blank paper. Returning `false` means those
 * blocks render as plain elements: visible on first paint, no layers.
 *
 * Always `false` during SSR and the first client render, so there is no
 * hydration mismatch.
 */
export function useRevealMotion(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return enabled;
}
