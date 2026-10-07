# Wale Adventure

Next.js App Router, TypeScript and Tailwind frontend for private and custom Sulawesi tours, operated from North Sulawesi. The existing visual system, local fonts and responsive components are retained.

```bash
npm install
npm run dev
```

Routes: `/`, `/tours`, `/destinations`, `/about`, `/gallery`, `/faq`, `/contact`, 13 `/tours/[slug]` pages, and 13 `/destinations/[slug]` pages. Tomohon uses `/destinations/tomohon` and retains `/tours/minahasa-highlands`. Catalogs and navigation are grouped into North Sulawesi, South Sulawesi, Central Sulawesi and Gorontalo.

Business content: `lib/wale-content.ts`. Booking links use WhatsApp `+62 851 1123 6875`; email is `info@waleadventure.com`. There is no backend or contact form. Tour quotations require confirmation from the Wale Adventure team.

Destination details use a separate template based on the Banggai reference page. Destination-specific planning content is in `lib/destination-content.ts`; Tours retains its existing design. Suggested stay lengths, visit ideas, travel notes and accommodation areas are visibly labeled as sample content. They are not customer reviews, verified accommodation listings or confirmed package inclusions. Replace or verify these examples with the operator before publishing.

The three existing Bunaken, Tangkoko and Minahasa Highlands tours retain their source details. Ten additional destinations are custom-tour inquiries: availability, itinerary, duration, transportation and inclusions require confirmation before booking.

Starting prices are **indicative per private group**, not verified business rates. Review `startingPriceIdr` in `lib/wale-content.ts` with the operator before publishing. Pricing disclaimers and WhatsApp links remain visible on cards and tour pages; no official price offer schema is generated.

Photographs reuse local Wale Adventure assets and selected restored clone images. Regional or landscape illustrations are labeled honestly in alt text where a destination-specific image is unavailable. Font licenses are in `public/fonts`. Image permissions should be confirmed by the site owner before publishing.

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
npm test
```

The smoke check requires a running server. Set `TEST_ORIGIN` for another port. Legacy tour URLs redirect permanently to their current routes.
