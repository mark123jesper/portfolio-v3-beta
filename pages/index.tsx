import PageHead from '@/components/PageHead'
import JsonLd from '@/components/JsonLd'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Skills from '@/components/sections/Skills'
import Path from '@/components/sections/Path'
import Contact from '@/components/sections/Contact'
import { site, socials } from '@/lib/site'

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      alternateName: site.brand,
      jobTitle: site.role,
      description: site.description,
      url: site.url,
      email: `mailto:${site.email}`,
      image: `${site.url}/og-square.png`,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Ontario',
        addressCountry: 'CA',
      },
      sameAs: socials.map((social) => social.href),
      knowsAbout: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Laravel', 'GraphQL', 'Figma'],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: `${site.brand} — ${site.name}`,
      description: site.description,
      inLanguage: 'en-CA',
      publisher: { '@id': `${site.url}/#person` },
    },
  ],
}

export default function Home() {
  return (
    <>
      <PageHead />
      <JsonLd data={graph} />
      <a
        href="#about"
        className="sr-only rounded-full bg-ink px-5 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Path />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
