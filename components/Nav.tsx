'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import ThemeToggle from '@/components/ThemeToggle'
import { site } from '@/lib/site'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'path', label: 'Path' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const { pathname } = useRouter()
  const { scrollYProgress } = useScroll()
  const onHome = pathname === '/'
  const prefix = onHome ? '' : '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Main">
          <a
            href={onHome ? '#top' : '/'}
            aria-label={`${site.name} — back to top`}
            className="group flex items-center gap-3"
          >
            <img
              src="/logo-mark-light.png"
              alt=""
              aria-hidden
              width={1100}
              height={1100}
              className="h-10 w-10 opacity-80 transition-opacity duration-300 group-hover:opacity-100 dark:hidden"
            />
            <img
              src="/logo-mark-dark.png"
              alt=""
              aria-hidden
              width={1100}
              height={1100}
              className="hidden h-10 w-10 opacity-80 transition-opacity duration-300 group-hover:opacity-100 dark:block"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[13px] font-medium text-ink">{site.name}</span>
              <span className="mt-1 text-[10px] uppercase tracking-label text-muted">{site.brand}</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex lg:gap-7">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`${prefix}#${section.id}`}
                className={`label link-underline py-1 transition-colors ${
                  active === section.id ? 'text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {section.label}
              </a>
            ))}
            <Link
              href="/resume"
              className={`label link-underline py-1 transition-colors ${
                pathname === '/resume' ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              Résumé
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-paper pt-16 md:hidden"
          >
            <div className="shell flex flex-col py-8">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`${prefix}#${section.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-line py-5"
                >
                  <span className="font-display text-3xl text-ink">{section.label}</span>
                  <span className="label text-muted">0{index + 1}</span>
                </a>
              ))}
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-5"
              >
                <span className="font-display text-3xl text-ink">Résumé</span>
                <span className="label text-muted">06</span>
              </Link>
              <a href={`mailto:${site.email}`} className="mt-8 text-sm text-accent" onClick={() => setOpen(false)}>
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
