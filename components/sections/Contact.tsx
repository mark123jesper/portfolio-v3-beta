import { Reveal, SectionLabel, ArrowUpRight, SocialIcon } from '@/components/ui'
import { site, socials } from '@/lib/site'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <SectionLabel index="05">Contact</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2.3rem,5.2vw,3.9rem)] font-light leading-[1.02] tracking-[-0.03em] text-ink">
                Let’s build something <em className="italic text-accent">considered</em>.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
                Open to front-end roles, freelance builds and long conversations about interface detail. Email is the
                fastest way to reach me.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-9 inline-flex items-center gap-3 border-b border-ink/25 pb-2 font-display text-2xl text-ink transition-colors hover:border-accent hover:text-accent md:text-3xl"
              >
                {site.email}
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:pl-8">
            <Reveal delay={0.1}>
              <p className="label text-muted">Elsewhere</p>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-center gap-3 text-sm text-ink">
                        <SocialIcon name={social.label} className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                        {social.label}
                      </span>
                      <span className="flex items-center gap-2 text-xs text-muted">
                        {social.handle}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Based in {site.location}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
