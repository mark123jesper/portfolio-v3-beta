export type CaseShot = {
  src: string
  alt: string
  caption: string
}

export type CaseStudy = {
  slug: string
  title: string
  kicker: string
  year: string
  role: string
  summary: string
  stack: string[]
  live: string
  liveLabel: string
  source?: string
  sourceNote?: string
  cover: { src: string; alt: string }
  sections: { title: string; body: string }[]
  shots: CaseShot[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'everly-wedding-planner',
    title: 'Everly Wedding Planner',
    kicker: 'Product build',
    year: '2026',
    role: 'Design, front-end and back-end',
    summary:
      'A wedding planner that keeps the whole wedding in one place — budget, guest replies, seating, suppliers, checklist and the wedding-day run sheet — with an assistant that reads the plan before it answers.',
    stack: ['Next.js App Router', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Stripe', 'Turnstile'],
    live: 'https://everly-wedding-planner.vercel.app',
    liveLabel: 'everly-wedding-planner.vercel.app',
    source: 'https://github.com/mark123jesper/everly-wedding-planner',
    cover: { src: '/projects/everly.jpg', alt: 'The Everly landing page' },
    sections: [
      {
        title: 'One plan object, eleven views',
        body:
          'Every tab — overview, budget, guests, seating, suppliers, checklist, wedding day, details, honeymoon, assistant, share — reads and writes a single plan document. The numbers that matter are derived in one place: cost per head comes from the budget split and the confirmed guest count, committed spending comes from the budget lines, and overdue tasks come from the checklist and the wedding date. Tabs can disagree about layout, not about arithmetic.',
      },
      {
        title: 'An assistant that can see the plan',
        body:
          'The assistant is not a chat window bolted to the side. Before a question is answered, a brief is assembled from the plan — what is committed against the budget, which invitations are still unanswered, what is due next — and that brief is what the model reasons over. The reply talks about this couple’s wedding, using their own numbers, instead of generic planning advice.',
      },
      {
        title: 'Guests reply without an account',
        body:
          'Owners share a link; each guest gets a reply token and answers for their own party, so an eighty-guest list never needs eighty sign-ups. Lists can be pasted in or imported from a CSV, and everything guests type is sanitised before it lands in the plan — the couple’s data stays theirs, and the reply page never sees the budget.',
      },
      {
        title: 'A beta with a queue',
        body:
          'The plan is capped at fifty accounts. When the last one is taken the site switches to a waitlist rather than quietly degrading, paid access and donations run through Stripe checkout, and Turnstile guards the public forms. Accounts keep login, recovery codes and a guarded plan route so a returning couple lands back where they left off.',
      },
      {
        title: 'Printed matter from the same data',
        body:
          'The invitation card, the print-friendly run sheet and the QR code that links to the invitation are generated from the plan itself, with six colour palettes and an optional custom heading. Change a detail in the app and the card follows — there is no second copy of the wedding to keep in sync.',
      },
    ],
    shots: [
      {
        src: '/case/everly-tabs.jpg',
        alt: 'The eleven planning tabs laid out as cards',
        caption:
          'Each tab is a view over the same plan: the guest count feeds the cost per head, and suppliers feed the budget rather than sitting beside it.',
      },
      {
        src: '/case/everly-plan.jpg',
        alt: 'The create-a-plan form asking for two names and a date',
        caption:
          'Starting a plan asks only for two names and a date. The budget split and the 45-day checklist are derived from that, so the first screen is not a form of thirty fields.',
      },
    ],
  },
  {
    slug: 'safety-sparkle',
    title: 'Safety, Sparkle & Green',
    kicker: 'Client build',
    year: '2026',
    role: 'Design, front-end and back-end',
    summary:
      'A booking site for a Scarborough cleaning company: priced services, a two-minute request form, and an admin dashboard that runs the week — with bookings in MongoDB and email confirmations that stay optional.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4', 'MongoDB', 'Resend', 'Zod'],
    live: 'https://www.ssghouseservices.ca',
    liveLabel: 'ssghouseservices.ca',
    sourceNote: 'The repository is private — happy to walk through the code on request.',
    cover: { src: '/projects/safety-sparkle.jpg', alt: 'The Safety, Sparkle & Green landing page' },
    sections: [
      {
        title: 'One page that does three jobs',
        body:
          'The landing page has to sell the service, list it with prices and take the booking, without turning into three sites. Prices come from a single service catalogue with a base price, per-bedroom and per-bathroom rates and a duration; the estimate the customer sees is calculated from those numbers, so a quote can never drift from the menu above it.',
      },
      {
        title: 'The reference is the primary key',
        body:
          'Each booking’s document id doubles as the customer-facing reference (SS-7K4QDA), so there is one identifier everywhere instead of a database id plus a reference that can fall out of step. MongoDB guarantees uniqueness, a duplicate-key retry covers the rare collision, and indexes on the date and status fields are created on first connect rather than in a migration nobody runs.',
      },
      {
        title: 'A dashboard that runs the week',
        body:
          'The team signs in to a bookings list with status filters and a week-by-week schedule. Moving a booking between pending, scheduled, completed, declined and cancelled emails the customer the new date and arrival window, keeps a reschedule history capped at the last twenty changes, and locks the date once a job is closed — enforced in the form and again on the server.',
      },
      {
        title: 'No user table',
        body:
          'There is one admin account and an optional read-only member, both configured by environment variables: scrypt password hashes, a signed session cookie, and roles decided by which variable an address lives in. Revoking someone is an edit in Vercel, not a database migration, and every request re-checks the session instead of trusting a long-lived token.',
      },
      {
        title: 'Proof it works after deploy',
        body:
          'A health endpoint pings the database, validates the mail key and says exactly what is missing; a preflight script checks the environment before you deploy; a smoke test books a job against the live site, confirms it reaches the dashboard and deletes it again. Turnstile is wired so a missing key can never block a real booking.',
      },
    ],
    shots: [
      {
        src: '/case/ssg-services.jpg',
        alt: 'Six cleaning services with prices and what is included',
        caption:
          'Services, prices and inclusions come from the catalogue the team edits in the dashboard — what customers read here is what the booking form quotes.',
      },
      {
        src: '/case/ssg-booking.jpg',
        alt: 'The booking form with an estimated quote',
        caption:
          'The request form prices the job from the same catalogue and confirms the estimate before anything is sent. No account, no payment up front.',
      },
    ],
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug)
