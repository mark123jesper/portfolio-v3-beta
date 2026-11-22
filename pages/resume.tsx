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
  <section aria-labelledby={id} className="mt-12 border-t border-line pt-8 print:mt-5 print:pt-4">
    <div className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10 print:gap-5">
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

      <main className="resume shell max-w-4xl pb-24 pt-28 md:pt-36 print:pb-0 print:pt-0">
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

        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted print:mt-3">
          {contact.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-underline hover:text-accent" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Section id="profile" title="Profile">
          <p className="max-w-2xl text-sm leading-relaxed text-muted print:max-w-none print:text-[12px] print:leading-[1.45]">
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
          <div className="space-y-8 print:space-y-4">
            {experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="resume-entry">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-sm font-medium text-ink">{job.role}</h3>
                  <p className="label text-muted">{job.period}</p>
                </div>
                <p className="mt-1 text-sm text-accent">
                  {job.company} <span className="text-muted">· {job.location}</span>
                </p>
                <ul className="mt-3 space-y-1.5 print:mt-2 print:space-y-1">
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
          <div className="space-y-7 print:space-y-4">
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
          <dl className="space-y-4 print:space-y-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-sm text-ink">{group.title}</dt>
                <dd className="text-sm leading-relaxed text-muted">{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <div className="space-y-5 print:space-y-3">
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

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted print:mt-5 print:pt-3">
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
            margin: 12mm 14mm;
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
            font-size: 12px;
            line-height: 1.45;
          }

          .resume h1 {
            font-size: 30px;
          }

          /* 12.5px is about 9.5pt: readable on paper and enough to keep the
             whole sheet to two pages instead of a third holding one section. */
          .resume p,
          .resume li,
          .resume dd,
          .resume dt {
            font-size: 12.5px;
            line-height: 1.44;
          }

          .resume h3 {
            font-size: 13.5px;
          }

          .resume .label {
            font-size: 10px;
          }

          .resume a {
            text-decoration: none;
          }

          /* An entry stays whole; a section is allowed to flow, so a long run of
             roles does not push a blank half-page. A break-after: avoid on the
             headings looks helpful but pushes the whole first section to page 2,
             leaving the header alone, so it is deliberately absent. */
          .resume-entry {
            break-inside: avoid;
          }
        }
      `}</style>
    </>
  )
}
