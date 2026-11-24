'use client'

import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { useViewportActive } from '@/lib/useViewport'

/** Counts a stat up while it is on screen; otherwise leaves the server value in place. */
export default function StatValue({ value }: { value: string }) {
  const { ref, active } = useViewportActive<HTMLSpanElement>()
  const tween = useRef<gsap.core.Tween | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    const match = /^(\d+)(.*)$/.exec(value)
    if (!element || !match || reduceMotion) return

    const target = Number(match[1])
    const suffix = match[2]
    const counter = { value: 0 }

    const animation = gsap.to(counter, {
      value: target,
      duration: 1.3,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => {
        element.textContent = `${Math.round(counter.value)}${suffix}`
      },
      onComplete: () => {
        element.textContent = value
      },
    })

    tween.current = animation

    return () => {
      animation.kill()
      tween.current = null
      element.textContent = value
    }
  }, [reduceMotion, ref, value])

  // Count only while visible; pausing mid-count and resuming keeps it off the clock when away.
  useEffect(() => {
    const animation = tween.current
    if (!animation || animation.progress() === 1) return
    if (active) animation.play()
    else animation.pause()
  }, [active])

  return <span ref={ref}>{value}</span>
}
