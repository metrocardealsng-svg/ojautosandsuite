# OJAUTOLOUNGE AND SUITE

Next.js 15 + TypeScript. No backend, no payments, no database. White, black and crimson theme.

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm test           # WhatsApp message + validation unit tests
npm run typecheck
```

## Edit the business content
Everything lives in `src/content/site.ts`: brand, WhatsApp number, address, suites, prices, amenities, menu, images.

- **Add interior photos to a suite** (Ferrari and Porsche are waiting): drop files in `public/images/new/`, then add `{ src, alt, kind: "real", caption? }` to that suite's `images`. The placeholder disappears by itself.
- **Set a price**: `price: { amount: 45000, currency: "NGN" }`. `null` shows "Rate on request".
- **Amenities**: only confirmed ones, in the suite's `amenities` array.
- **Menu**: fill `menu.food` and `menu.drinks`. Empty shows "Menu coming soon".
- **Logo**: `public/brand/logo.png`, set by `brand.logoSrc`.

## Scroll film
`public/video/arrival.mp4` and `.webm` (4.5 s, 720p, keyframe-dense so scrubbing is smooth). It is an AI-made concept visual and is labelled as such on the page. Replace the two files to change it. Reduced-motion visitors get the still poster.
