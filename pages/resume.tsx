import type { ReactNode } from 'react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import PageHead from '@/components/PageHead'
import { education, experience, featuredProjects, site, skillGroups, socials } from '@/lib/site'

const selected = featuredProjects.slice(0, 4)

const contact = [
  { label: site.email, href: `mailto:${site.email}` },
  { label: site.url.replace(/^https?:\/\//, ''), href: site.url },
  { label: 'GitHub', href: socials[0].href },
  { label: 'LinkedIn', href: socials[1].href },
]

const Section = ({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) => (
  <section aria-labelledby={id} className="mt-12 border-t border-line pt-8">
    <div className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
      <h2 id={id} className="label pt-1 text-muted">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  </section>
)

export default function Resume() {
  return (
    <>
      <PageHead
        title={`Résumé — ${site.name}`}
        description={`Résumé for ${site.name}, ${site.role.toLowerCase()} in ${site.location}: experience, selected work, skills and education.`}
        path="/resume"
      />

      <div className="print:hidden">
        <Nav />
      </div>

      <main className="resume shell max-w-4xl pb-24 pt-28 md:pt-36">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label text-accent">Résumé</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em] text-ink">
              {site.name}
            </h1>
            <p className="mt-3 text-sm text-muted">
              {site.role} · {site.location}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-ink/40 hover:text-accent print:hidden"
          >
            Print or save as PDF
          </button>
        </header>

        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {contact.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-underline hover:text-accent" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Section id="profile" title="Profile">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Front-end developer working in React, Next.js and TypeScript, with the back end close behind: Node,
            Laravel, Supabase and MongoDB. Two years in software, first at Fligno on payment products — Finpay,
            Kwikpay and ChangeGPS — then on independent builds: a meal planner on Groq, a wedding planner on Gemini, a
            Bible PWA that reads offline, and a booking site a cleaning company runs its week from. Before software, an
            electrical engineering background: commissioning, calibration and field service, including a team lead role.
            That route is the reason the interfaces here tend to be measured — fewer screens, tested against what
            actually happens in the room.
          </p>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-8">
            {experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="resume-entry">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-sm font-medium text-ink">{job.role}</h3>
                  <p className="label text-muted">{job.period}</p>
                </div>
                <p className="mt-1 text-sm text-accent">
                  {job.company} <span className="text-muted">· {job.location}</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="selected-work" title="Selected work">
          <div className="space-y-7">
            {selected.map((project) => (
              <article key={project.title} className="resume-entry">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-sm font-medium text-ink">
                    {project.caseStudy ? (
                      <a href={project.caseStudy} className="link-underline hover:text-accent">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="label text-muted">{project.year}</p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.description}</p>
                <p className="mt-1.5 text-xs text-muted/80">{project.tags.join(' · ')}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Longer write-ups for every build at{' '}
            <Link href="/work" className="link-underline text-accent">
              {site.url.replace(/^https?:\/\//, '')}/work
            </Link>
            .
          </p>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-sm text-ink">{group.title}</dt>
                <dd className="text-sm leading-relaxed text-muted">{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <div className="space-y-5">
            {education.map((item) => (
              <article key={`${item.title}-${item.period}`} className="resume-entry">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                  <p className="label text-muted">{item.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {item.school} · {item.location}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          References on request · Last updated <time dateTime={site.updated}>{site.updated}</time>
        </p>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm;
          }

          html,
          body {
            background: #fff !important;
          }

          .resume,
          .resume * {
            background: transparent !important;
            color: #111 !important;
            border-color: #d9d2c7 !important;
          }

          .resume {
            max-width: none !important;
            padding: 0 !important;
          }

          .resume a {
            text-decoration: none;
          }

          .resume-entry,
          .resume section {
            break-inside: avoid;
          }
        }
      `}</style>
    </>
  )
}
