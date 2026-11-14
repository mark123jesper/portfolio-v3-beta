import { Reveal, SectionLabel } from '@/components/ui'
import { facts, site } from '@/lib/site'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-line">
      <div className="shell grid gap-12 py-24 md:grid-cols-12 md:gap-10 md:py-32">
        <div className="md:col-span-4">
          <Reveal>
            <SectionLabel index="01">About</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              Engineering habits, applied to interfaces.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <Reveal delay={0.06}>
            <div className="space-y-5 text-[15px] leading-[1.75] text-muted">
              <p>
                I started out as an <span className="text-ink">electrical engineer</span> — site surveys, power
                upgrades, equipment commissioning — before moving into software. The engineering habit stuck:
                measure twice, keep the details honest, and make sure the thing actually works.
              </p>
              <p>
                Since 2021 I’ve been building web applications with React and its ecosystem. Two years at{' '}
                <span className="text-ink">Fligno Software Philippines</span> took me through fintech products used by
                real merchants, alongside a steady run of personal and bootcamp projects. Today I’m based in{' '}
                {site.location}, working under the {site.brand} name.
              </p>
              <p>
                I care about the parts of an interface people don’t notice until they’re missing: type that breathes,
                motion that explains itself, and layouts that hold up on a phone at arm’s length.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="label text-muted">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
