export const site = {
  name: 'Mark Jesper Pillerva',
  brand: 'White Cat Dev',
  role: 'Front-end developer',
  location: 'Ontario, Canada',
  email: 'whitecat123dev@gmail.com',
  url: 'https://whitecatdev.vercel.app',
  description:
    'Mark Jesper Pillerva — front-end developer in Ontario, Canada. React, Next.js and Tailwind interfaces built with an engineer’s eye for detail.',
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/mark123jesper', handle: '@mark123jesper' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mark123jesper/', handle: '@mark123jesper' },
  { label: 'X', href: 'https://twitter.com/shironekomaru69', handle: '@shironekomaru69' },
  { label: 'Facebook', href: 'https://www.facebook.com/mark123jesper', handle: '@mark123jesper' },
]

export const stats = [
  { value: '2 yrs', label: 'in software' },
  { value: '12+', label: 'projects shipped' },
  { value: '5', label: 'roles so far' },
]

export const marqueeWords = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Laravel',
  'GraphQL',
  'Figma',
]

export const facts = [
  { label: 'Based in', value: 'Ontario, Canada' },
  { label: 'Focus', value: 'Front-end, design systems, motion' },
  { label: 'Education', value: 'B.S. Electrical Engineering, TUP' },
  { label: 'Training', value: 'Software Engineering, KodeGo PH' },
  { label: 'Studio', value: 'White Cat Dev' },
]

export const skillGroups = [
  {
    title: 'Front-end',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Vue.js',
      'Gatsby',
      'Tailwind CSS',
      'SASS',
      'Bootstrap',
      'jQuery',
    ],
  },
  {
    title: 'Back-end & data',
    items: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'GraphQL', 'MySQL', 'MongoDB', 'Python'],
  },
  {
    title: 'Design',
    items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
  },
  {
    title: 'Workflow',
    items: ['VS Code', 'WebStorm', 'PhpStorm', 'Git', 'GitHub', 'GitLab', 'Postman', 'Vercel', 'Netlify', 'Heroku'],
  },
]

export type Project = {
  title: string
  year: string
  description: string
  tags: string[]
  image: string
  live?: string
  source?: string
  caseStudy?: string
}

export const featuredProjects: Project[] = [
  {
    title: 'Everly Wedding Planner',
    year: '2026',
    description:
      'A free, no-signup wedding dashboard: budget, guest replies, seating, suppliers, checklist, wedding-day run sheet and an assistant that reads the numbers.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    image: '/projects/everly.jpg',
    live: 'https://everly-wedding-planner.vercel.app',
    source: 'https://github.com/mark123jesper/everly-wedding-planner',
    caseStudy: '/work/everly-wedding-planner',
  },
  {
    title: 'Safety, Sparkle & Green',
    year: '2026',
    description:
      'A booking site for a Toronto-area home cleaning service: service pages, a two-minute booking flow and email confirmations.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    image: '/projects/safety-sparkle.jpg',
    live: 'https://www.ssghouseservices.ca',
    caseStudy: '/work/safety-sparkle',
  },
  {
    title: 'Escuela de Sto. Rosario',
    year: '2022',
    description:
      'A school web app with an inquiry and enrollee pipeline, Firebase-backed listings and Auth0 admin access.',
    tags: ['React', 'Material UI', 'Firebase', 'Auth0'],
    image: '/projects/escuela.jpg',
    live: 'https://react-school-web-app.vercel.app/',
    source: 'https://github.com/mark123jesper/react-school-web-app',
  },
  {
    title: 'Mern Memories',
    year: '2022',
    description:
      'A full-stack social feed — posts, likes and editing — built to learn the MERN stack end to end.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: '/projects/memories.jpg',
    live: 'https://mern-mermories.vercel.app/',
    source: 'https://github.com/mark123jesper/mern_mermories',
  },
  {
    title: 'DigiLife Magazine',
    year: '2021',
    description:
      'My first KodeGo project: a magazine and digital-services site in plain HTML, CSS and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/digilife.jpg',
    live: 'https://mark123jesper.github.io/digi-life-magazine/',
    source: 'https://github.com/mark123jesper/digi-life-magazine',
  },
  {
    title: '(dot)Logix',
    year: '2021',
    description:
      'A group build for a fictional web-development studio, with a scroll-driven Bootstrap front end.',
    tags: ['Bootstrap', 'jQuery', 'JavaScript'],
    image: '/projects/dotlogix.jpg',
    live: 'https://dot-logix.vercel.app/',
    source: 'https://github.com/mark123jesper/dot-logix',
  },
  {
    title: 'Chainlink',
    year: '2021',
    description:
      'A blockchain forum and social app — my first Laravel and Vue full-stack build, backed by MySQL.',
    tags: ['Laravel', 'PHP', 'Vue.js', 'MySQL'],
    image: '/projects/chainlink.jpg',
    source: 'https://github.com/mark123jesper/laravel-blog',
  },
  {
    title: 'React Meetups',
    year: '2022',
    description:
      'A meetup CRUD prototype on React and React-Bootstrap, with Firebase as a tiny JSON database.',
    tags: ['React', 'React-Bootstrap', 'Firebase'],
    image: '/projects/meetups.jpg',
    live: 'https://react-meetup-rosy.vercel.app/',
    source: 'https://github.com/mark123jesper/react-meetup',
  },
]

export const moreProjects = [
  {
    title: 'White Cat Gaming',
    description: 'A gaming-site concept sharing the design vocabulary of this portfolio.',
    tags: ['React', 'Material UI'],
    live: 'https://whitecatgaming.vercel.app/',
    source: 'https://github.com/mark123jesper/gaming-site',
  },
  {
    title: 'Healthcare Login Form',
    description: 'Login and registration screens with client-side validation only.',
    tags: ['HTML', 'Bootstrap', 'JavaScript'],
    live: 'https://healthcare-regform.netlify.app/',
    source: 'https://github.com/mark123jesper/healthcare-registration',
  },
  {
    title: 'Mark.bit',
    description: 'My first portfolio — Bootstrap scrollspy with plain CSS and jQuery everywhere else.',
    tags: ['HTML', 'CSS', 'jQuery'],
    live: 'https://mark123jesper-beta.vercel.app/',
    source: 'https://github.com/mark123jesper/mark123jesper-v1',
  },
  {
    title: 'React Journals',
    description: 'A small to-do journal in React.',
    tags: ['React', 'Bootstrap'],
    live: 'https://react-journals.vercel.app/',
    source: 'https://github.com/mark123jesper/react-journals',
  },
  {
    title: 'Task and Thoughts',
    description: 'CRUD to-dos persisted to localStorage as JSON.',
    tags: ['React', 'localStorage'],
    live: 'https://react-tasks-thoughts.vercel.app/',
    source: 'https://github.com/mark123jesper/react-todos',
  },
]

export const clientWork = [
  {
    title: 'Finpay',
    description:
      'A payment aggregator for merchants and consumers — PayPal, debit and credit cards via manual entry or NFC.',
    tags: ['React', 'Laravel', 'GraphQL', 'Tailwind CSS'],
  },
  {
    title: 'Kwikpay',
    description:
      'A progressive web app for merchant registration and shopper checkout, with Google Pay alongside card payments.',
    tags: ['React', 'Gatsby', 'Next.js', 'GraphQL'],
  },
  {
    title: 'Joltpay',
    description: 'A rebranded build of the Kwikpay platform, carried through a major interface revamp.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Timpay',
    description: 'A second rebrand of the same payments platform, with its own identity and flows.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'ChangeGPS',
    description: 'Accounting software for business structuring and tax planning.',
    tags: ['React', 'Next.js', 'Laravel', 'GraphQL'],
  },
]

export const experience = [
  {
    period: 'Oct 2023 — Present',
    company: 'Tim Hortons',
    role: 'Food Counter Attendant',
    location: 'Ontario, Canada',
    points: [
      'Prepare food and beverages for customers, including baking and order taking.',
      'Run the front counter and cash, keeping service quick through peak hours.',
    ],
  },
  {
    period: 'Oct 2021 — Nov 2023',
    company: 'Fligno Software Philippines Inc.',
    role: 'Associate Software Engineer',
    location: 'Mandaluyong City · Cagayan de Oro City',
    points: [
      'Worked across a range of client web projects with the development team.',
      'Shipped bug fixes and wrote documentation for existing development projects.',
      'Contributed front-end work to FinTech products including Finpay, Kwikpay and ChangeGPS.',
    ],
  },
  {
    period: 'Feb 2021 — Jul 2021',
    company: 'Kennedy Energy and Development Corp.',
    role: 'Team Leader',
    location: 'Mandaluyong City, Philippines',
    points: [
      'Led a team of up to four while holding the line on customer service standards.',
      'Ran construction and installation of telecommunications power upgrades, including site surveys.',
    ],
  },
  {
    period: 'Aug 2018 — Aug 2020',
    company: 'Powercraft Solutions and Data Infrastructure, Inc.',
    role: 'Field Service Engineer',
    location: 'Pasig City, Philippines',
    points: [
      'Installed, repaired and calibrated systems and equipment on site.',
      'Tested equipment performance and demonstrated operation and servicing to customers.',
      'Recommended design changes and upgrades to improve system performance.',
    ],
  },
  {
    period: 'Apr 2021 — Jun 2021',
    company: 'Mekanismo, Inc.',
    role: 'Engineering Internship',
    location: 'Taguig City, Philippines',
    points: [
      'Supported the technical team through the commissioning phase of a project.',
      'Assisted with project research, field work and preliminary design calculations.',
    ],
  },
]

export const education = [
  {
    period: 'Oct 2024',
    title: 'Bachelor’s Degree — Electrical Engineering',
    school: 'University of Toronto (ECA)',
    location: 'Toronto, ON, Canada',
  },
  {
    period: 'Jan 2023',
    title: 'TESOL Certification',
    school: 'International Open Academy',
    location: 'Remote',
  },
  {
    period: 'Jul 2021 — Oct 2021',
    title: 'Software Engineering',
    school: 'KodeGo PH',
    location: 'Taguig City, Philippines',
  },
  {
    period: 'Mar 2014 — Jul 2018',
    title: 'Bachelor’s Degree — Electrical Engineering',
    school: 'Technological University of the Philippines',
    location: 'Taguig City, Philippines',
  },
]
