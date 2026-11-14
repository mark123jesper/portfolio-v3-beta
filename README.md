# Mark Jesper Pillerva — Portfolio

Personal portfolio for Mark Jesper Pillerva (White Cat Dev), rebuilt from the v3 beta into a single-page,
editorial-style site: warm paper palette, serif display type, dark mode and a scroll-driven layout.

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
```

## Structure

- `lib/site.ts` — all portfolio content: profile, skills, experience, education, projects
- `components/sections/` — hero, about, work, skills, path, contact
- `components/` — navigation, footer, cursor, theme toggle, shared UI
- `public/projects/` — project screenshots (1280×800)
- `public/profile.jpg` — portrait (880×1100)

Content edits happen in `lib/site.ts`; no component changes are needed to update copy or add a project.
