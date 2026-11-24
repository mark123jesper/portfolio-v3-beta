'use client'

import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { marqueeWords } from '@/lib/site'
import { useViewportActive } from '@/lib/useViewport'

export default function Marquee() {
  const { ref: root, active } = useViewportActive<HTMLDivElement>()
  const loopRef = useRef<gsap.core.Tween | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = root.current
    const track = element?.querySelector<HTMLElement>('[data-track]')
    if (!element || !track || reduceMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const loop = gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })
    loop.pause()
    loopRef.current = loop
    let settle = 0

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Scrolling speeds the loop up, then it settles back to its idle pace.
        loop.timeScale(gsap.utils.clamp(1, 3.5, 1 + Math.abs(self.getVelocity()) / 900))
        window.clearTimeout(settle)
        settle = window.setTimeout(() => loop.timeScale(1), 160)
      },
    })

    const pause = () => loop.pause()
    const resume = () => loop.play()
    element.addEventListener('mouseenter', pause)
    element.addEventListener('mouseleave', resume)

    return () => {
      window.clearTimeout(settle)
      trigger.kill()
      loop.kill()
      loopRef.current = null
      element.removeEventListener('mouseenter', pause)
      element.removeEventListener('mouseleave', resume)
    }
  }, [reduceMotion, root])

  // Run only while the strip is on screen and the tab is visible.
  useEffect(() => {
    const loop = loopRef.current
    if (!loop) return
    if (active) loop.play()
    else loop.pause()
  }, [active])

  return (
    <div ref={root} className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div data-track className="flex w-max will-change-transform">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center">
            {marqueeWords.map((word) => (
              <span key={word} className="flex items-center">
                <span className="label px-6 text-muted">{word}</span>
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
