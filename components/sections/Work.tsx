import Link from 'next/link'

import { Reveal, SectionLabel, Tag, ArrowUpRight } from '@/components/ui'
import { clientWork, featuredProjects, moreProjects } from '@/lib/site'
import { avifSrcSet, colorOf, sizeOf, webpSrcSet } from '@/lib/images'

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-b border-line">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="02">Selected work</SectionLabel>
              <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,3.6vw,2.9rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
                Things I’ve built, from bootcamp to production.
              </h2>
            </div>
            <div className="md:text-right">
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Personal and client projects — the early ones in plain HTML, the newer ones in React, Next.js and
                Laravel.
              </p>
              <Link
                href="/work"
                className="label link-underline mt-4 inline-flex items-center gap-1.5 text-ink hover:text-accent"
              >
                All case studies
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index % 2 === 0 ? 0 : 0.08}>
              <article className="group">
                <a
                  href={project.live ?? project.source}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-2xl border border-line bg-surface"
                >
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={avifSrcSet(project.image)}
                      sizes="(min-width: 768px) 44vw, 92vw"
                    />
                    <source
                      type="image/webp"
                      srcSet={webpSrcSet(project.image)}
                      sizes="(min-width: 768px) 44vw, 92vw"
                    />
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      width={sizeOf(project.image)[0]}
                      height={sizeOf(project.image)[1]}
                      loading="lazy"
                      decoding="async"
                      style={{ backgroundColor: colorOf(project.image) }}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  </picture>
                </a>

                <div className="mt-5 flex items-start justify-between gap-6">
                  <h3 className="font-display text-2xl leading-tight text-ink">
                    {project.caseStudy ? (
                      <Link href={project.caseStudy} className="link-underline hover:text-accent">
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <span className="label mt-1 shrink-0 text-muted">{project.year}</span>
                </div>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-5">
                  {project.caseStudy && (
                    <Link
                      href={project.caseStudy}
                      className="label link-underline inline-flex items-center gap-1.5 text-ink hover:text-accent"
                    >
                      Case study
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="label link-underline inline-flex items-center gap-1.5 text-accent"
                    >
                      Live site
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noreferrer"
                      className="label link-underline inline-flex items-center gap-1.5 text-muted hover:text-ink"
                    >
                      Source
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24">
            <h3 className="label text-muted">More experiments</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {moreProjects.map((project, index) => (
                <li key={project.title}>
                  <div className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                    <span className="label text-muted md:col-span-1">{String(index + 1).padStart(2, '0')}</span>
                    <div className="md:col-span-6">
                      <a
                        href={project.live ?? project.source}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline font-display text-xl text-ink hover:text-accent"
                      >
                        {project.title}
                      </a>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:col-span-4">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noreferrer"
                      className="label inline-flex items-center gap-1 text-muted hover:text-accent md:col-span-1 md:justify-end"
                      aria-label={`${project.title} source code`}
                    >
                      Code
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 rounded-3xl border border-line bg-surface/60 p-8 md:p-10">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-2xl text-ink">Client work at Fligno</h3>
              <p className="label text-muted">Corporate · no public links</p>
            </div>
            <ul className="mt-7 grid gap-x-10 gap-y-7 md:grid-cols-2">
              {clientWork.map((project) => (
                <li key={project.title} className="border-t border-line pt-5">
                  <h4 className="text-sm font-medium text-ink">{project.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
