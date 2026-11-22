'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { site } from '@/lib/site'

export default function Footer() {
  const { pathname } = useRouter()
  const onHome = pathname === '/'

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name} — {site.brand}
        </p>
        <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
          <Link href="/resume" className="label link-underline hover:text-accent">
            Résumé
          </Link>
          <span>Built with Next.js &amp; Tailwind CSS</span>
          <a href={onHome ? '#top' : '/'} className="label link-underline hover:text-accent">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
