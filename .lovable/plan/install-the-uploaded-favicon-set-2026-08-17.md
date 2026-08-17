# Install the uploaded favicon set

Replace the default Lovable icon with the uploaded blue cursor mark across browsers and mobile home screens.

## What changes

- Copy the six uploaded icon files into `public/`, overwriting the existing `public/favicon.ico`:
  - `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`
  - `apple-touch-icon.png` (180x180)
  - `android-chrome-192x192.png`, `android-chrome-512x512.png`
- Update `head().links` in `src/routes/__root.tsx` to reference them:
  - `icon` 32x32 and 16x16 PNG entries, plus the `.ico` fallback
  - `apple-touch-icon` pointing at `/apple-touch-icon.png`
- Verify the icons load (200 responses) in the running preview.

## Notes

- Icons are real files in `public/`, not CDN asset pointers — required for browsers to find them at fixed paths.
- No web manifest / PWA install support is added in this step; say the word if you want the site installable too.
