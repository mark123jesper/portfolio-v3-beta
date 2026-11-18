import Link from 'next/link'

import PageHead from '@/components/PageHead'
import { site } from '@/lib/site'

export default function NotFound() {
  return (
    <>
      <PageHead title={`Page not found — ${site.name}`} path="/404" />
      <main className="shell flex min-h-screen flex-col justify-center py-24">
      <p className="label text-accent">Error 404</p>
      <h1 className="mt-5 max-w-xl font-display text-[clamp(2.4rem,6vw,4rem)] font-light leading-[1.02] tracking-[-0.03em] text-ink">
        This page wandered off.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
        The link may be out of date, or the page may have moved somewhere quieter.
      </p>
      <div className="mt-9">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-white"
        >
          Back home
        </Link>
      </div>
      </main>
    </>
  )
}
