import { site, socials } from '@/lib/site'
import { SocialIcon } from '@/components/ui'

export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${site.name} on ${social.label}`}
            title={social.label}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <SocialIcon name={social.label} />
          </a>
        </li>
      ))}
      <li>
        <a
          href={`mailto:${site.email}`}
          aria-label={`Email ${site.name}`}
          title="Email"
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <SocialIcon name="Mail" className="h-4 w-4" />
        </a>
      </li>
    </ul>
  )
}
