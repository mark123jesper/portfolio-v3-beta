'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const root = document.documentElement
    root.classList.add('custom-cursor')

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let hovering = false
    let revealed = false
    let frame = 0

    const place = () => {
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
    }

    // The ring only follows while the pointer is moving. Once it has caught up
    // (or the reader stops), the loop ends instead of compositing forever
    // alongside the hero's WebGL frame loop.
    const tick = () => {
      frame = 0
      const dx = pointerX - ringX
      const dy = pointerY - ringY

      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        ringX = pointerX
        ringY = pointerY
        place()
        return
      }

      ringX += dx * 0.16
      ringY += dy * 0.16
      place()
      frame = requestAnimationFrame(tick)
    }

    const follow = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`

      if (!revealed) {
        revealed = true
        ringX = pointerX
        ringY = pointerY
        place()
        root.classList.add('cursor-ready')
      }

      const target = event.target as HTMLElement | null
      const isInteractive = Boolean(target?.closest('a, button, [data-cursor="hover"]'))
      if (isInteractive !== hovering) {
        hovering = isInteractive
        ring.dataset.hover = String(hovering)
      }

      follow()
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
      root.classList.remove('custom-cursor', 'cursor-ready')
    }
  }, [])

  return (
    <div aria-hidden className="hidden md:block">
      <div ref={ringRef} className="cursor-ring h-9 w-9 rounded-full border border-ink/40" />
      <div ref={dotRef} className="cursor-dot h-[5px] w-[5px] rounded-full bg-accent" />
    </div>
  )
}
