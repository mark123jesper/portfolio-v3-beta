# Mark Jesper Pillerva — Portfolio

Personal portfolio for Mark Jesper Pillerva (White Cat Dev), rebuilt from the v3 beta into a single-page,
editorial-style site: warm paper palette, serif display type, dark mode and a scroll-driven layout. Every featured
project has a case study at `/work/<slug>`, indexed at `/work`.

## Stack

- Next.js (pages router) + TypeScript
- Tailwind CSS with CSS-variable colour tokens for light/dark themes
- next-themes, Framer Motion, next/font (Fraunces + Rubik)
- Vercel Analytics

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm install` also installs the git hooks (see below). An existing `pre-commit` hook that differs is left alone; run
`npm run hooks:install -- --force` to replace it, keeping a `.bak`.

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint
npm run lastmod      # refresh the sitemap dates from git
npm run check:content # validate the hand-edited content
npm run images       # regenerate WebP variants + lib/image-sizes.ts
npm run cards        # rebuild the share cards (needs pip install Pillow)
npm run indexnow     # ping Bing/Yandex after a deploy (see below)
```

## Structure

- `lib/site.ts` — profile, skills, experience, projects, stats, and the site's `updated` date
- `lib/case-studies.ts` — case-study copy, sections and screenshots; one entry per page under `/work/`
- `lib/images.ts` / `lib/image-sizes.ts` — intrinsic sizes and WebP `srcset` helpers
- `components/sections/` — hero, about, work, skills, path, contact
- `components/` — navigation, footer, cursor, theme toggle, page head, lightbox, JSON-LD
- `pages/work/index.tsx` — index of every case study
- `pages/work/[slug].tsx` — case-study template, generated from `lib/case-studies.ts` at build time
- `pages/sitemap.xml.tsx` — sitemap with a `lastmod` per URL
- `public/projects/` — project screenshots (1280×800, Food Trip 1440×900)
- `public/case/` — case-study section captures
- `public/og/` — one 1200×630 share card per case study, built by `npm run cards`
- `public/logo-mark-light.png` / `logo-mark-dark.png` — White Cat Dev mark, one per theme
- `public/og.png` / `og-square.png` — home share cards, 1200×630 and 1200×1200

Content edits happen in `lib/`; no component changes are needed to update copy, add a project or add a case study.
Adding a case study to `lib/case-studies.ts` adds it to the sitemap, the `/work` index and the share cards.

## Sitemap dates

Every `<lastmod>` comes from git, not from memory:

- a case study uses the newer of the last commit touching its entry in `lib/case-studies.ts` and the last commit
  touching its cover or gallery images;
- the home page uses the newer of the newest study and the last commit touching `lib/site.ts`, `pages/index.tsx`,
  `pages/work/index.tsx`, `components/sections`, the nav/footer/head or `styles/globals.css`.

`npm run lastmod` rewrites both, and `npm run lastmod:check` fails when they drift. The pre-commit hook runs that check
plus `check:content`, so a date or a missing image cannot reach a commit.

## Search engines

1. Verify the domain in [Search Console](https://search.google.com/search-console) with a DNS record, or by dropping
   the HTML verification file it gives you into `public/` (it is served from the site root).
2. Verify the site in [Bing Webmaster Tools](https://www.bing.com/webmasters), which can import the Search Console
   property.
3. Submit `https://whitecatdev.vercel.app/sitemap.xml` in both. `public/robots.txt` already points at it.

After a deploy, `npm run indexnow` reads the live sitemap and submits every URL to IndexNow (Bing, Yandex, Seznam)
using the key file in `public/`. `npm run indexnow -- --dry` prints the list without sending.

Lighthouse runs weekly against production from `.github/workflows/lighthouse.yml`; accessibility and SEO below 0.9 fail
the run. Vercel Analytics is mounted in `pages/_app.tsx` and reports once the project has it enabled in the dashboard.
