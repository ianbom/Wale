# Wale Adventure

Next.js App Router, TypeScript and Tailwind frontend for private North Sulawesi tours. The existing visual system, local fonts and responsive components are retained.

```bash
npm install
npm run dev
```

Routes: `/`, `/tours`, `/tours/minahasa-highlands`, `/tours/tangkoko`, `/tours/bunaken`, `/about`, `/destinations`, `/gallery`, `/faq`, `/contact`.

Business content: `lib/wale-content.ts`. Booking links use WhatsApp `+62 851 1123 6875`; email is `info@waleadventure.com`. There is no backend or contact form. Tour quotations require confirmation from the Wale Adventure team.

Tour facts and locally stored photographs originate from Wale Adventure's public homepage and tour pages. Font licenses are in `public/fonts`. Image permissions should be confirmed by the site owner before publishing.

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
npm test
```

The smoke check requires a running server. Set `TEST_ORIGIN` for another port. Legacy tour URLs redirect permanently to their current routes.
