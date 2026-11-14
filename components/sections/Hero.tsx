import { Reveal, ArrowUpRight } from '@/components/ui'
import SocialLinks from '@/components/SocialLinks'
import { site, stats } from '@/lib/site'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-surface/70 to-transparent"
      />

      <div className="shell relative pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="grid gap-16 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label flex items-center gap-3 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {site.brand} — {site.location}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5rem)] font-light leading-[0.94] tracking-[-0.025em] text-ink">
                Front-end developer with an <em className="italic text-accent">engineer’s</em> eye.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted">
                I’m {site.name}. I build considered interfaces — React, Next.js and Tailwind — for products that
                deserve more care than the default template.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-white"
                >
                  View selected work
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <SocialLinks className="mt-10" />
            </Reveal>
          </div>

          <Reveal delay={0.2} className="md:col-span-5">
            <div className="relative mx-auto max-w-[340px] md:ml-auto md:mr-0">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[190px_190px_32px_32px] bg-accent/10"
              />
              <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[170px_170px_24px_24px] border border-line bg-surface">
                <img
                  src="/logo-mark-light.png"
                  alt="White Cat Dev logo"
                  width={1100}
                  height={1100}
                  className="w-[76%] dark:hidden"
                />
                <img
                  src="/logo-mark-dark.png"
                  alt=""
                  aria-hidden
                  width={1100}
                  height={1100}
                  className="hidden w-[76%] dark:block"
                />
              </div>
              <div className="relative -mt-9 mx-4 rounded-2xl border border-line bg-paper px-5 py-4 shadow-[0_24px_50px_-36px_rgba(0,0,0,0.55)] md:mx-6">
                <p className="font-display text-lg leading-none text-ink">{site.name}</p>
                <p className="label mt-2 text-muted">{site.role}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-16 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
            <dl className="grid max-w-lg grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="label text-muted">{stat.label}</dt>
                  <dd className="mt-2 font-display text-2xl leading-none text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <a href="#about" className="label group flex items-center gap-3 text-muted hover:text-accent">
              Scroll to explore
              <span className="h-px w-10 bg-line transition-all group-hover:w-14 group-hover:bg-accent" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
