'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const normalise = (word: string) => word.replace(/[^\p{L}\p{N}’'-]/gu, '').toLowerCase()

/**
 * Headline reveal: each word rises through its own mask instead of the whole
 * block fading in. One observer per heading, staggered words, and no movement
 * at all when the reader prefers reduced motion.
 */
export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  accent = [],
  delay = 0,
}: {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  accent?: string[]
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = children.trim().split(/\s+/)
  const accented = new Set(accent.map(normalise))

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] pr-[0.06em] -mr-[0.06em] align-bottom">
              <motion.span
                className={`inline-block ${accented.has(normalise(word)) ? 'italic text-accent' : ''}`}
                variants={{
                  hidden: { y: reduce ? 0 : '112%' },
                  visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
