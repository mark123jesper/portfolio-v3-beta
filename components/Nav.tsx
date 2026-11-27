'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence, motion, useReducedMotion, useScroll, type Variants } from 'framer-motion'
import BrandMark from '@/components/BrandMark'
import ThemeToggle from '@/components/ThemeToggle'
import { site } from '@/lib/site'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'path', label: 'Path' },
  { id: 'contact', label: 'Contact' },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const panel: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.2, when: 'afterChildren', staggerChildren: 0.03, staggerDirection: -1 },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.2, delayChildren: 0.04, staggerChildren: 0.05 },
  },
}

const item: Variants = {
  closed: { opacity: 0, y: 18, transition: { duration: 0.2, ease: 'easeIn' } },
  open: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function Nav() {
  const { pathname } = useRouter()
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
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
            <BrandMark className="h-10 w-10 text-ink opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
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
            <motion.button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              whileTap={reduce ? undefined : { scale: 0.9 }}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent md:hidden"
            >
              <span aria-hidden className="flex h-4 w-4 flex-col items-center justify-center gap-[7px]">
                <motion.span
                  className="block h-[1.5px] w-4 rounded-full bg-current"
                  initial={false}
                  animate={open ? { y: 4.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 32 }}
                />
                <motion.span
                  className="block h-[1.5px] w-4 rounded-full bg-current"
                  initial={false}
                  animate={open ? { y: -4.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 32 }}
                />
              </span>
            </motion.button>
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
            variants={panel}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-30 bg-paper pt-16 md:hidden"
          >
            <div className="shell flex flex-col py-8">
              {sections.map((section, index) => (
                <motion.div key={section.id} variants={item} className="border-b border-line">
                  <a
                    href={`${prefix}#${section.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className="font-display text-3xl text-ink">{section.label}</span>
                    <span className="label text-muted">0{index + 1}</span>
                  </a>
                </motion.div>
              ))}
              <motion.div variants={item} className="border-b border-line">
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="font-display text-3xl text-ink">Résumé</span>
                  <span className="label text-muted">06</span>
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <a href={`mailto:${site.email}`} className="mt-8 inline-block text-sm text-accent" onClick={() => setOpen(false)}>
                  {site.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
