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
  /** ISO date of the study's last commit — bump it when the study or its images change. */
  updated: string
  role: string
  summary: string
  stack: string[]
  live?: string
  liveLabel?: string
  source?: string
  sourceNote?: string
  cover: { src: string; alt: string }
  sections: { title: string; body: string }[]
  shots?: CaseShot[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'food-trip',
    updated: '2026-11-20',
    title: 'Food Trip',
    kicker: 'Product build',
    year: '2026',
    role: 'Design, front-end and back-end',
    summary:
      'A weekly meal planner that takes the deciding out of dinner: a week built from your filters, one grocery list sorted by aisle, a cook mode for the phone on the counter, and four ChatGPT features that only ever work from Food Trip’s own recipe library.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'OpenAI'],
    live: 'https://food-trip-ai.vercel.app',
    liveLabel: 'food-trip-ai.vercel.app',
    sourceNote: 'The repository is private — happy to walk through the code on request.',
    cover: { src: '/projects/foodtrip.jpg', alt: 'The Food Trip home page' },
    sections: [
      {
        title: 'A week built from filters, not from scratch',
        body:
          'A plan is seven days of breakfast, lunch and dinner, but you never fill it slot by slot. Household size, the diets that apply, a cook-time ceiling and the ingredients you refuse to eat are stored once on the preferences page, and the planner assembles a week from the library using only meals that survive those filters. Autofill, per-slot reassignment, clearing a slot and copying last week sit on top of that as small tools rather than as the main event. Leftovers are a first-class answer: marking a meal as leftovers reuses the previous night instead of sending you shopping again.',
      },
      {
        title: 'One list, merged and sorted by aisle',
        body:
          'The grocery page is derived, never typed. It walks the whole week, merges the same ingredient across recipes, scales every quantity to the household size and subtracts what the pantry page says is already in the cupboard. Rows are grouped in aisle order — produce, dairy, dry goods — because a list you shop in the order of the shop is a list you finish, and ticks persist so a mid-trip refresh does not lose your place. Metric and imperial are converted at render time from one stored quantity, so switching units never edits the plan.',
      },
      {
        title: 'Four AI features, each with a fence around it',
        body:
          'ChatGPT does four jobs behind four routes: build a week from the filters, propose three alternatives for one slot, write a recipe from what is in the pantry, and turn a recipe URL into a library entry. Each prompt carries part of Food Trip’s own catalogue, so the model is choosing from real recipes with real ingredient lists instead of inventing dishes that would not survive the grocery page. The guardrails matter more than the prompts: per-account daily call and token limits, a per-feature quota, a twelve-hour response cache, a fallback model when the first is busy, and honest errors — 503 when the key is missing, 429 when a limit is hit. Without a key every non-AI feature still works.',
      },
      {
        title: 'Cook mode is a screen, not a printout',
        body:
          'Cook mode shows one step at a time with the quantities scaled to the table, reads timers out of the step text, keeps the screen awake while you work, lets you tick ingredients off as they go in and moves with the keyboard. A service worker caches the pages you have opened plus a dedicated offline page, and the manifest makes the whole thing installable, which is the difference between a recipe site and something you actually use with wet hands. The recipe page itself is the unit everything else is built from — ingredients, numbered method and an estimated nutrition panel per serving.',
      },
      {
        title: 'Nothing leaves the browser until you sign in',
        body:
          'Without an account the plan, the pantry and the templates live in localStorage and are never sent anywhere. Signing in is a Supabase magic link, and plans then sync to your own row under row-level security, which is what the paid tier actually buys. A shared week is encoded into the URL, so a link can be read by anyone without an account. The Sunday email is a cron route guarded by a bearer secret and sent through Resend, and Stripe checkout with a webhook is wired but optional: if billing is not configured the upgrade button says so plainly instead of failing.',
      },
    ],
    shots: [
      {
        src: '/case/foodtrip-home.jpg',
        alt: 'The Food Trip home page with the hero heading and recipe cards',
        caption:
          'The home page states the one promise the app keeps — a week of dinners planned from your filters — and describes the four AI features next to the plan they feed.',
      },
      {
        src: '/case/foodtrip-recipe.jpg',
        alt: 'A Food Trip recipe page with ingredients and numbered method',
        caption:
          'Every recipe is a real record: ingredients that scale by serving, a numbered method, aisle data and estimated nutrition. Adding it to a week puts each ingredient on the list automatically.',
      },
    ],
  },
  {
    slug: 'everly-wedding-planner',
    updated: '2026-11-18',
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
    updated: '2026-11-18',
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
  {
    slug: 'white-cat-v2',
    updated: '2026-11-20',
    title: 'White Cat Developer v2',
    kicker: 'Site rebuild',
    year: '2023',
    role: 'Design and front-end',
    summary:
      'The second version of this site: a pale-teal, sidebar-led single page where the navigation never scrolls away, a cat mark in the corner, and one button that flips the whole palette.',
    stack: ['React', 'Vite', 'JavaScript', 'CSS'],
    live: 'https://mark123jesper-v2.vercel.app',
    liveLabel: 'mark123jesper-v2.vercel.app',
    cover: { src: '/projects/v2.jpg', alt: 'The v2 home screen: teal sidebar and welcome heading' },
    sections: [
      {
        title: 'A sidebar instead of a menu bar',
        body:
          'Navigation sits in a fixed left rail — the cat mark at the top, then Home, About, Skill and Project — while the right pane holds the content and swaps what it shows. Nothing competes with the heading, which is the whole screen: “Welcome to White Cat Developer’s Den”, a one-line subtitle and a single Contact Me button. A traditional top bar would have eaten the space that made that opening feel calm.',
      },
      {
        title: 'One button for the lights',
        body:
          'A single toggle in the bottom-left corner of the rail flips a small set of colour variables between the pale teal day palette and its navy counterpart, and writes the choice to localStorage. On the next visit the app reads it back when it initialises, so the site opens in whichever mode you left it in. No theme library, no flash of the wrong palette, and one control instead of a settings menu.',
      },
      {
        title: 'Where the cat came from',
        body:
          'This was the first version to call the site White Cat Dev and to put the cat mark on the brand rather than a photo of me. It also carried a fuller CV than v1 — Fligno, the Finpay and Kwikpay era — plus the corporate projects, education and skills. The current site keeps the monogram and the name; the sidebar and the teal did not survive, but the idea of a single page with nowhere to get lost did.',
      },
    ],
    shots: [
      {
        src: '/case/v2-home.jpg',
        alt: 'The v2 home screen with the fixed teal sidebar',
        caption:
          'The rail holds the cat mark and four destinations; the right pane holds one heading, one subtitle and one button. Nothing else competes with the opening screen.',
      },
      {
        src: '/case/v2-projects.jpg',
        alt: 'The projects list in v2, each card opening a live site',
        caption:
          'Projects were part of the same page rather than a route of their own — the work sat beside the about and skills sections, one click from the rail.',
      },
    ],
  },
  {
    slug: 'escuela-de-sto-rosario',
    updated: '2026-11-20',
    title: 'Escuela de Sto. Rosario',
    kicker: 'School site build',
    year: '2022',
    role: 'Front-end, routing and portal UI',
    summary:
      'A school website with admissions, programmes and two portals — a parent-facing enquiry funnel on a Firebase database, and an admin grid that reads every enquiry back.',
    stack: ['React', 'React Router', 'Material UI', 'React-Bootstrap', 'Auth0', 'Firebase Realtime DB'],
    live: 'https://react-school-web-app.vercel.app/',
    liveLabel: 'react-school-web-app.vercel.app',
    source: 'https://github.com/mark123jesper/react-school-web-app',
    cover: { src: '/projects/escuela.jpg', alt: 'The school landing page with enrolment announcements' },
    sections: [
      {
        title: 'A site with two front doors',
        body:
          'Parents get the public pages: home, about, the preschool gallery, programmes and admission. Staff get a teacher portal, students get their own. Routes switch through a TransitionGroup fade, and a ScrollToTop component resets the window on every navigation — small things, but without them a long admissions page left you halfway down the next screen with no explanation.',
      },
      {
        title: 'Real data, no server of its own',
        body:
          'The contact form writes to an inquiry list and the admission form to an enrollee list, both in Firebase’s Realtime Database, called through its plain JSON endpoints rather than the SDK. The teacher portal fetches both lists, turns the objects into rows and shows them in Material UI data grids behind tabs, so the office sees enquiries and enrolments without anyone maintaining a backend.',
      },
      {
        title: 'Two kinds of sign-in, one lesson',
        body:
          'The teacher portal goes through Auth0 with a redirect back to /teacher-portal. The student portal is a front-end demo: a form that flips a boolean and shows the student dashboard, with no server check behind it. It was fine for a prototype, but an admin screen that can read every family’s enquiry is exactly the wrong place for a demo login — that is the habit I took into later builds, where the session is checked again on every request.',
      },
    ],
    shots: [
      {
        src: '/case/escuela-home.jpg',
        alt: 'The school home page with its announcement carousel',
        caption:
          'The public front door: a carousel for enrolment announcements, then the sections parents actually came for — about, preschool, programmes and contact.',
      },
      {
        src: '/case/escuela-about.jpg',
        alt: 'The About page with the school history and mission',
        caption:
          'Inner pages are their own routes rather than scroll targets, so a parent can be sent straight to the admissions information and land in the right place.',
      },
    ],
  },
  {
    slug: 'mern-memories',
    updated: '2026-11-20',
    title: 'Mern Memories',
    kicker: 'Learning build',
    year: '2022',
    role: 'Full-stack',
    summary:
      'A social feed of photo memories — posts, tags, likes and editing — built to learn the MERN stack end to end, from the Mongoose schema to the Redux store.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'Material UI'],
    live: 'https://mern-mermories.vercel.app/',
    liveLabel: 'mern-mermories.vercel.app',
    source: 'https://github.com/mark123jesper/mern_mermories',
    cover: { src: '/projects/memories.jpg', alt: 'The memories feed with a create form above it' },
    sections: [
      {
        title: 'One schema, the whole feed',
        body:
          'A memory is a title, a message, a creator, a list of tags, a base64 image and a list of user ids that liked it, all in one Mongoose model. The Express routes follow the data: list everything in public, then create, edit, delete and like behind an auth middleware. Likes are stored as ids rather than a counter, so the same person cannot like a post twice and the number is always a length, never a number that can drift.',
      },
      {
        title: 'Two tokens, one middleware',
        body:
          'Sign-in issues a JWT signed with a secret, and the client can also sign in with Google through react-google-login. Rather than two middleware paths, the auth file looks at the token: short means my own JWT and it verifies the signature, long means a Google ID token and it decodes the subject instead. It worked, and it taught me why relying on token length is a shortcut — today I would name the issuer in the request and verify each one properly.',
      },
      {
        title: 'State kept in one place',
        body:
          'The client is split into api, actions, reducers and components, with Redux and redux-thunk handling every fetch, so the feed, the edit form and the like button all read the same store. Material UI cards and a moment-formatted timestamp do the presentation. Half the value of the project was the folder structure: learning where a request belongs before writing it.',
      },
    ],
    shots: [
      {
        src: '/case/memories-auth.jpg',
        alt: 'The sign-in card with email and Google options',
        caption:
          'One auth screen covers both token types: an email and password form for the app’s own JWT, and a Google button that returns an ID token to the same middleware.',
      },
      {
        src: '/case/memories-signup.jpg',
        alt: 'The sign-up form asking for a name, email and password',
        caption:
          'Registration collects the name that appears on every card the person posts. Likes are stored as user ids, so the count is always the length of that list.',
      },
    ],
  },
  {
    slug: 'digilife-magazine',
    updated: '2026-11-20',
    title: 'DigiLife Magazine',
    kicker: 'First KodeGo build',
    year: '2021',
    role: 'Design and front-end',
    summary:
      'My first project at KodeGo: a magazine and digital-services site in plain HTML, CSS and JavaScript, with a page per section and a page per writer.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://mark123jesper.github.io/digi-life-magazine/',
    liveLabel: 'mark123jesper.github.io/digi-life-magazine',
    source: 'https://github.com/mark123jesper/digi-life-magazine',
    cover: { src: '/projects/digilife.jpg', alt: 'The DigiLife Magazine home page' },
    sections: [
      {
        title: 'Six pages, no build step',
        body:
          'Home, business, lifestyle, sports, about us and contact us are six separate HTML files sharing a main stylesheet and adding their own — business.css, lifestyle.css, sports.css. No framework, no bundler, no npm: the folder opens in a browser and works. Making the same navigation, footer and card rhythm behave across six files by hand is where I first felt the cost of repetition, and why componentisation made sense later.',
      },
      {
        title: 'A front page made of parts',
        body:
          'The home page is a masthead, a category dropdown, a social bar and a grid of article cards that drop into their sections. Categories that were not part of the assignment stayed as placeholders in the menu rather than pretending to be pages, and every section got its own accent so the sections read apart at a glance.',
      },
      {
        title: 'A page per writer',
        body:
          'The site had three authors, so it got three author pages — francis.html, mark.html and jonaadres.html — with a short bio and a portrait. Nobody asked for them. They were the first time I built something because a site felt unfinished without it, which is roughly the instinct the rest of this portfolio runs on.',
      },
    ],
    shots: [
      {
        src: '/case/digilife-business.jpg',
        alt: 'The business section page with its article grid',
        caption:
          'Each section kept its own stylesheet on top of the shared one, so the business page could carry an accent and a card rhythm the sports page did not.',
      },
      {
        src: '/case/digilife-sports.jpg',
        alt: 'The sports section page',
        caption:
          'Six hand-built pages with the same masthead, dropdown and footer — and no build step between editing a file and seeing it in the browser.',
      },
    ],
  },
  {
    slug: 'dot-logix',
    updated: '2026-11-20',
    title: '(dot)Logix',
    kicker: 'Group build',
    year: '2021',
    role: 'Front-end and motion',
    summary:
      'A group build for a fictional web-development studio: a scroll-driven Bootstrap front end with a full-screen sidebar menu, a preloader and SASS partials compiled into one stylesheet.',
    stack: ['HTML', 'SASS', 'Bootstrap 5', 'jQuery', 'Swiper'],
    live: 'https://dot-logix.vercel.app/',
    liveLabel: 'dot-logix.vercel.app',
    source: 'https://github.com/mark123jesper/dot-logix',
    cover: { src: '/projects/dotlogix.jpg', alt: 'The (dot)Logix studio home page' },
    sections: [
      {
        title: 'A studio site with a big entrance',
        body:
          'The page opens on a loader, then hands over to a layout that animates in as you scroll: services, demos, articles, blogs, careers and contact, with a Swiper slider and a full-screen sidebar menu instead of a conventional navbar. Open and close are two small functions that set the sidebar width, which is either exactly right or a mess — there was no in-between, and that made it a good place to learn where CSS transitions earn their keep.',
      },
      {
        title: 'Twelve partials, one file to link',
        body:
          'The styles are SASS partials — navbar, sidebar, services, demos, blogs, articles, careers, contact, footer, loader, about and a video slider — compiled down to compiled-style.css, the only stylesheet the page loads. Splitting source by section and shipping one file is the habit I still use: the browser never waits on twelve requests, and the file you edit is still small.',
      },
      {
        title: 'The portfolio beside the studio',
        body:
          'A separate portfolio folder went in alongside the agency site — profile, about and contact pages with their own stylesheet and photography — because a design studio that cannot show work is not convincing. There is also a folder of abandoned pages, kept rather than deleted. The site itself is fictional; the practice of building the thing the page claims to be was not.',
      },
    ],
    shots: [
      {
        src: '/case/dotlogix-home.jpg',
        alt: 'The (dot)Logix landing screen with its video hero',
        caption:
          'The entrance is a full-bleed video slide behind the wordmark, with the “Request a Proposal” control pinned to the bottom-left corner instead of a conventional navbar.',
      },
      {
        src: '/case/dotlogix-menu.jpg',
        alt: 'The slide-in proposal panel with its project-type checkboxes',
        caption:
          'That corner control slides a panel over the page — the enquiry form lives inside the navigation rather than on a separate contact page.',
      },
    ],
  },
  {
    slug: 'chainlink',
    updated: '2026-11-21',
    title: 'Chainlink',
    kicker: 'First full-stack build',
    year: '2021',
    role: 'Full-stack',
    summary:
      'A blockchain forum and social app — my first Laravel and Vue build: questions, replies, categories, likes and notifications in MySQL, with replies updating live over Pusher.',
    stack: ['Laravel', 'PHP', 'Vue 2', 'Vuetify', 'MySQL', 'JWT', 'Pusher'],
    source: 'https://github.com/mark123jesper/laravel-blog',
    sourceNote: 'No live link — the original database and API keys are long gone, so the repository is the record.',
    cover: { src: '/projects/chainlink.jpg', alt: 'The Chainlink forum interface' },
    sections: [
      {
        title: 'A forum with four tables that matter',
        body:
          'Questions, replies, categories and likes, plus the notifications table Laravel gives you. Resource routes cover questions, categories and replies, and two small endpoints handle like and unlike. The schema carries the rules: a reply belongs to a question and a user, a like belongs to a reply and a user, and a category groups questions. Getting those relationships right before writing a screen was the actual lesson of the project.',
      },
      {
        title: 'JWT instead of sessions',
        body:
          'Because the front end is a Vue app talking to a JSON API, auth runs on tymon/jwt-auth with signup, login, logout, refresh and me under /api/auth, rather than Laravel’s session guard. The Laravel side still serves the app: three catch-all web routes return the same view, so opening /question/some-slug directly or refreshing that page does not 404 — the detail that makes a history-mode router feel like a real site.',
      },
      {
        title: 'Live replies, and the first inbox',
        body:
          'LikeEvent and DeleteReplyEvent implement ShouldBroadcast and go out over Pusher, so a like in one browser lands in another without a refresh, and a database notification feeds an inbox screen. Vue Router with Vuetify and a markdown editor handled the writing side. It is the project where the back end stopped being a mystery: routes, middleware, events and migrations all had to agree before anything worked.',
      },
    ],
    shots: [
      {
        src: '/case/chainlink-model.jpg',
        alt: 'A card listing Chainlink’s MySQL tables and its Vue front-end pieces',
        caption:
          'No deploy survived, so this is the build from the inside: the tables in database/migrations and the Vue, Vuetify, Pusher and JWT pieces in resources/js.',
      },
    ],
  },
  {
    slug: 'react-meetups',
    updated: '2026-11-20',
    title: 'React Meetups',
    kicker: 'Learning build',
    year: '2022',
    role: 'Front-end',
    summary:
      'A meetup CRUD prototype on React and React Router, with Firebase as a tiny JSON database and a favourites list kept in context.',
    stack: ['React', 'React Router', 'Firebase Realtime DB', 'CSS Modules'],
    live: 'https://react-meetup-rosy.vercel.app/',
    liveLabel: 'react-meetup-rosy.vercel.app',
    source: 'https://github.com/mark123jesper/react-meetup',
    cover: { src: '/projects/meetups.jpg', alt: 'The React Meetups listing page' },
    sections: [
      {
        title: 'Three routes, one layout',
        body:
          'All meetups, new meetup and favourites share a Layout with a navigation bar that carries the count, and each component owns a CSS module rather than reaching into a global stylesheet. It is the smallest app in this portfolio, and the one that made routing click: the URL is the state, and a page that can be linked to is a page that can be refreshed.',
      },
      {
        title: 'Firebase as a JSON box',
        body:
          'Instead of pulling in the Firebase SDK, the app calls the Realtime Database’s REST endpoint for meetups.json — a GET that returns an object keyed by id, and a POST when a meetup is added. Mapping that object into an array with the key folded in as id is done in one place, and the list refetches when it mounts, so a new meetup is on screen without any cache to invalidate.',
      },
      {
        title: 'Favourites without a store',
        body:
          'Favourites live in a context: add, remove, check and a total, consumed by the nav badge and the cards. No Redux, no persistence, no accounts — refresh the page and the list is empty again. That was the point of the exercise, and the honest limit of it: a context is a fine place for a list you can afford to lose.',
      },
    ],
    shots: [
      {
        src: '/case/meetups-home.jpg',
        alt: 'The All Meetups listing with an Add to Favorites button on each card',
        caption:
          'The list is fetched from a single Firebase endpoint when the page mounts — no store to invalidate, and a new meetup is on screen after a refresh.',
      },
      {
        src: '/case/meetups-new.jpg',
        alt: 'The New Meetup form with title, image, address and description fields',
        caption:
          'Adding a meetup posts to the same endpoint and navigates back to the list. The favourites count in the nav is the only shared state in the app.',
      },
    ],
  },
  {
    slug: 'mark-bit',
    updated: '2026-11-20',
    title: 'Mark.bit',
    kicker: 'First portfolio',
    year: '2021',
    role: 'Design and front-end',
    summary:
      'My first portfolio: a terminal-green single page with a typewriter heading, Bootstrap scrollspy navigation pinned to the bottom edge, and a preloader in front of it all.',
    stack: ['HTML', 'CSS', 'Bootstrap 5', 'jQuery'],
    live: 'https://mark123jesper-beta.vercel.app/',
    liveLabel: 'mark123jesper-beta.vercel.app',
    source: 'https://github.com/mark123jesper/mark123jesper-v1',
    cover: { src: '/projects/markbit.jpg', alt: 'The Mark.bit home screen in green on black' },
    sections: [
      {
        title: 'A portfolio that looked like a terminal',
        body:
          'Green on near-black, a monospaced face, a prompt line reading `<mark.bit>` across the bottom with the navigation: Top, About Me, Skills, Projects, Contact. Bootstrap’s scrollspy set body data attributes, so the active item followed the page as you read. Choosing a look that was not a template was the first design decision of the site — and the reason it still reads as mine.',
      },
      {
        title: 'A typewriter and a loader',
        body:
          'The heading types and deletes a rotating list of phrases one character at a time, with the cursor sitting at the end of the line. A small TxtRotate class does it in about forty lines of JavaScript and a recursive setTimeout. A preloader covers the page until load, which is exactly the kind of flourish I would now cut — it delays the one thing a portfolio should do quickly, which is show the work.',
      },
      {
        title: 'The folder of references',
        body:
          'Beside the page sits list-of-website.md: a running list of sites kept as references — a music feed, a shoe shop, a Japanese photography portfolio — screenshots and links, saved because something in each one worked. Building the portfolio was really the excuse to look at a lot of other people’s, and keeping the list is the habit that survived: every version of this site since has started the same way.',
      },
    ],
    shots: [
      {
        src: '/case/markbit-home.jpg',
        alt: 'The Mark.bit home screen in green on black',
        caption:
          'The heading types itself out above the fold while the prompt-line navigation at the bottom edge tracks the section you are reading.',
      },
      {
        src: '/case/markbit-projects.jpg',
        alt: 'The projects section listing educational work with live demos',
        caption:
          'Project cards carried a screenshot, a short note on what was learned and a live demo link — the same shape this portfolio still uses.',
      },
    ],
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug)

export const getNextCaseStudy = (slug: string) => {
  const index = caseStudies.findIndex((study) => study.slug === slug)
  if (index === -1) return undefined
  return caseStudies[(index + 1) % caseStudies.length]
}
