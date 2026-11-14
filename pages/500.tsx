import Link from 'next/link'

export default function ServerError() {
  return (
    <main className="shell flex min-h-screen flex-col justify-center py-24">
      <p className="label text-accent">Error 500</p>
      <h1 className="mt-5 max-w-xl font-display text-[clamp(2.4rem,6vw,4rem)] font-light leading-[1.02] tracking-[-0.03em] text-ink">
        Something broke on my end.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
        Try reloading the page. If it keeps happening, the home page is a safe place to start again.
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
  )
}
