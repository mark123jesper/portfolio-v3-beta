import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name} — {site.brand}
        </p>
        <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
          <span>Built with Next.js &amp; Tailwind CSS</span>
          <a href="#top" className="label link-underline hover:text-accent">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
