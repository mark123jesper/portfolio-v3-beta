'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element is on screen and the tab is visible.
 * Starts paused, so nothing animates before the first observation.
 */
export function useViewportActive<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '80px' })
    observer.observe(element)

    const onVisibility = () => setTabVisible(document.visibilityState === 'visible')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return { ref, active: inView && tabVisible }
}
