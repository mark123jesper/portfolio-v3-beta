import { useCallback, useEffect, useId, useRef } from 'react'

import type { CaseShot } from '@/lib/case-studies'
import { avifSrcSet, webpSrcSet } from '@/lib/images'

type Props = {
  shots: CaseShot[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Lightbox({ shots, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const captionId = useId()
  const shot = shots[index]

  const step = useCallback(
    (direction: number) => onNavigate((index + direction + shots.length) % shots.length),
    [index, onNavigate, shots.length],
  )

  // Give focus back to the thumbnail that opened the dialog, once it closes.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key !== 'Tab') return

      // Keep tabbing inside the dialog instead of walking into the page behind it.
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, step])

  if (!shot) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Screenshot ${index + 1} of ${shots.length}`}
      aria-describedby={captionId}
      className="fixed inset-0 z-[60] flex flex-col gap-4 bg-black/95 p-4 text-white md:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="label text-white/60">
          {index + 1} / {shots.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="label rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        >
          Close
        </button>
      </div>

      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <picture>
          <source type="image/avif" srcSet={avifSrcSet(shot.src)} />
          <source type="image/webp" srcSet={webpSrcSet(shot.src)} />
          <img
            src={shot.src}
            alt={shot.alt}
            className="max-h-[72vh] w-auto max-w-full rounded-xl border border-white/10 object-contain"
          />
        </picture>
        <figcaption id={captionId} className="max-w-2xl text-center text-sm leading-relaxed text-white/70">
          {shot.caption}
        </figcaption>
      </figure>

      {shots.length > 1 && (
        <div className="flex items-center justify-center gap-3 pb-1">
          <button
            type="button"
            onClick={() => step(-1)}
            className="label rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="label rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            Next
          </button>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        Screenshot {index + 1} of {shots.length}: {shot.alt}
      </p>
    </div>
  )
}
