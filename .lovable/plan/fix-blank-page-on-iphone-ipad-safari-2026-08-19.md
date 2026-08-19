# Fix: blank page on iPhone/iPad Safari

## What the users see

The screenshot shows the header and the "Atpakaļ uz augšu" button, but the whole page body is empty cream paper — even the hero. The page still scrolls (the button only appears after 400px), so the content exists in the DOM: iOS Safari simply stops painting it.

## What I checked

- The live site (ppwr.clickscale.dev) and the dev build both render correctly in a desktop Safari/WebKit engine — no JS errors, no failed requests, hero opacity 1. So this is not a broken build or a missing asset; it is iOS-specific rendering.
- The home page document is **23,899 px tall** (the country catalog block alone is ~9,990 px) and it is a single page holding the calculator table, 27 country cards, the timeline, the video block and 18 FAQ items at once.
- Practically every block is a Framer Motion element with `initial opacity/scale/y` + `whileInView`, which makes WebKit promote hundreds of elements to composited layers, on top of Lenis smooth scroll running a transform loop each frame, plus full-bleed gradient layers (`paper-grid`) and a `backdrop-blur` button.

That combination (huge document + many composited layers + rAF scroll loop) is the known iOS Safari memory-pressure failure: the tab keeps its layout and scroll height but discards the painted tiles, leaving blank paper. It matches the report exactly and is why it never shows on desktop.

## The fix (presentation only, no data or logic changes)

1. **Turn off smooth scroll on touch devices.** `SmoothScroll` initialises Lenis only when the device is not coarse-pointer / not iOS. Native scrolling on phones, Lenis stays on desktop.
2. **Render mobile without reveal animations.** In `primitives.tsx` `Press` (and the equivalent inline `motion` usage in Hero, Timeline, Calculator, CountryCatalog, VideoBriefing, Faq), skip `initial`/`whileInView` below the `md` breakpoint and render plain elements. Content is then painted immediately and no compositing layers are created. Desktop behaviour is unchanged.
3. **Stop leaving layers behind after animation.** Where animations do run, set `style={{ willChange: "auto" }}` after completion (or drop `scale` from the reveal, which is what forces the layer) so finished sections fall back to normal painting.
4. **Cut the mobile document height.** On mobile only, show the country catalog in a shorter initial slice with a "Rādīt visas 27 valstis" button, and keep the calculator's per-country result rows collapsed until tapped. Same data, same components — fewer nodes on screen at once.
5. **Avoid a full-height gradient overlay on mobile** (`paper-grid` in the hero) — cap it or hide it under `md`.

## Verification

- WebKit run in an iPhone-sized context (Playwright iPhone descriptor, `is_mobile`), scrolling in stages through the whole 24k px page and screenshotting at each stage — hero, calculator, catalog, timeline, FAQ, footer must all be visible with no blank stretch.
- Same run at desktop width to confirm the Lenis smooth scroll and the reveal animations still work there.
- One check with reduced-motion enabled.

## Note

If it turns out only one specific person is affected, the same measures still apply — this page is heavy enough to be fragile on any older iPhone/iPad. To confirm after shipping I would like to know the device and browser (iPhone Safari, iPad, or an in-app browser like Instagram/Messenger), since in-app WebViews have even tighter memory limits.
