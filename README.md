# Mark Jesper Pillerva — Portfolio

Personal portfolio for Mark Jesper Pillerva (White Cat Dev), rebuilt from the v3 beta into a single-page,
editorial-style site: warm paper palette, serif display type, dark mode and a scroll-driven layout. The two most
recent builds also have long-form case studies at `/work/<slug>`.

## Stack

- Next.js (pages router) + TypeScript
- Tailwind CSS with CSS-variable colour tokens for light/dark themes
- next-themes, Framer Motion, next/font (Fraunces + Rubik)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
npm run cards   # rebuild the share cards (needs pip install Pillow)
```

## Structure

- `lib/site.ts` — all portfolio content: profile, skills, experience, projects, stats
- `lib/case-studies.ts` — case-study copy, sections and screenshots; one entry per page under `/work/`
- `components/sections/` — hero, about, work, skills, path, contact
- `components/` — navigation, footer, cursor, theme toggle, page head, shared UI
- `pages/work/[slug].tsx` — case-study template, generated from `lib/case-studies.ts` at build time
- `pages/sitemap.xml.tsx` — sitemap built from the site URL and the case-study slugs; `public/robots.txt` points at it
- `public/projects/` — project screenshots (1280×800)
- `public/case/` — case-study section captures
- `public/logo-mark-light.png` / `logo-mark-dark.png` — White Cat Dev mark, one per theme (1100×1100, transparent)
- `public/og.png` / `og-square.png` — share cards, 1200×630 and 1200×1200. Copy lives in `scripts/make-share-cards.py`

Content edits happen in `lib/`; no component changes are needed to update copy, add a project or add a case study.
Adding a case study to `lib/case-studies.ts` also adds it to the sitemap.
