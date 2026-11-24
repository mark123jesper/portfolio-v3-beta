'use client'

import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef } from 'react'

const words = [
  { text: 'Front-end', accent: false },
  { text: 'developer', accent: false },
  { text: 'with', accent: false },
  { text: 'an', accent: false },
  { text: 'engineer’s', accent: true },
  { text: 'eye.', accent: false },
]

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function HeroHeadline() {
  const root = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()

  useIsomorphicLayoutEffect(() => {
    if (!root.current || reduceMotion) return

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-word]',
        { yPercent: 118 },
        { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay: 0.12 },
      )
    }, root)

    return () => context.revert()
  }, [reduceMotion])

  return (
    <h1
      ref={root}
      className="mt-6 font-display text-[clamp(2.7rem,7vw,5rem)] font-light leading-[0.94] tracking-[-0.025em] text-ink"
    >
      {words.map((word) => (
        <span key={word.text} className="mr-[0.24em] inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <span data-word className={`inline-block ${word.accent ? 'italic text-accent' : ''}`}>
            {word.text}
          </span>
        </span>
      ))}
    </h1>
  )
}
