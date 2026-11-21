import { useCallback, useEffect, useRef } from 'react'

import type { CaseShot } from '@/lib/case-studies'

type Props = {
  shots: CaseShot[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ shots, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const shot = shots[index]

  const step = useCallback(
    (direction: number) => onNavigate((index + direction + shots.length) % shots.length),
    [index, onNavigate, shots.length],
  )

  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
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
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.alt} — screenshot ${index + 1} of ${shots.length}`}
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
        <img
          src={shot.src}
          alt={shot.alt}
          className="max-h-[72vh] w-auto max-w-full rounded-xl border border-white/10 object-contain"
        />
        <figcaption className="max-w-2xl text-center text-sm leading-relaxed text-white/70">{shot.caption}</figcaption>
      </figure>

      <div className="flex items-center justify-center gap-3 pb-1">
        <button
          type="button"
          onClick={() => step(-1)}
          className="label rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white/60"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="label rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white/60"
        >
          Next
        </button>
      </div>
    </div>
  )
}
