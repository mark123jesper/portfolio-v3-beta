'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="group inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {mounted && isDark ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
          <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
          <path
            d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="hidden text-[11px] uppercase tracking-label sm:inline">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
