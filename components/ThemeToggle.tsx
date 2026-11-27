'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTheme } from 'next-themes'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.18, ease: EASE }}
      className="group inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span className="relative h-4 w-4" aria-hidden>
        <AnimatePresence initial={false}>
          {mounted && (
            <motion.span
              key={isDark ? 'sun' : 'moon'}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: isDark ? -90 : 90, scale: 0.55 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: isDark ? 90 : -90, scale: 0.55 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {isDark ? (
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="hidden text-[11px] uppercase tracking-label sm:inline">{isDark ? 'Light' : 'Dark'}</span>
    </motion.button>
  )
}
