import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Skills from '@/components/sections/Skills'
import Path from '@/components/sections/Path'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
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
