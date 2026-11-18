import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHead from '@/components/PageHead'
import { Reveal, SectionLabel, Tag, ArrowUpRight } from '@/components/ui'
import { caseStudies, getCaseStudy, type CaseStudy } from '@/lib/case-studies'
import { site } from '@/lib/site'

type Props = {
  study: CaseStudy
  next: { slug: string; title: string; summary: string }
}

export default function CaseStudyPage({ study, next }: Props) {
  return (
    <>
      <PageHead
        title={`${study.title} — ${site.name}`}
        description={study.summary}
        path={`/work/${study.slug}`}
        image={`${site.url}${study.cover.src}`}
        imageAlt={study.cover.alt}
        type="article"
      />

      <a
        href="#case-body"
        className="sr-only rounded-full bg-ink px-5 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <Nav />

      <main id="case-body">
        <article>
          <header className="shell pb-10 pt-28 md:pt-36">
            <Link
              href="/#work"
              className="label link-underline inline-flex items-center gap-2 text-muted hover:text-accent"
            >
              <span aria-hidden>←</span> All work
            </Link>

            <div className="mt-8 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="label text-accent">
                  {study.kicker} · {study.year}
                </p>
                <h1 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4rem)] font-light leading-[1.02] tracking-[-0.03em] text-ink">
                  {study.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{study.summary}</p>
              </div>

              <dl className="self-end text-sm md:col-span-5 md:justify-self-end">
                <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                  <dt className="label text-muted">Role</dt>
                  <dd className="text-ink">{study.role}</dd>
                  <dt className="label text-muted">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {study.stack.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </dd>
                  <dt className="label text-muted">Live</dt>
                  <dd>
                    <a
                      href={study.live}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline inline-flex items-center gap-1.5 text-accent"
                    >
                      {study.liveLabel}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </dd>
                  {study.source && (
                    <>
                      <dt className="label text-muted">Source</dt>
                      <dd>
                        <a
                          href={study.source}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline inline-flex items-center gap-1.5 text-muted hover:text-ink"
                        >
                          GitHub
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </dd>
                    </>
                  )}
                </div>
                {study.sourceNote && <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">{study.sourceNote}</p>}
              </dl>
            </div>
          </header>

          <Reveal>
            <div className="shell">
              <img
                src={study.cover.src}
                alt={study.cover.alt}
                width={1280}
                height={800}
                className="w-full rounded-2xl border border-line bg-surface object-cover"
              />
            </div>
          </Reveal>

          <section className="shell py-20 md:py-28">
            <Reveal>
              <SectionLabel index="01">What the build involved</SectionLabel>
            </Reveal>

            <div className="mt-12 divide-y divide-line border-t border-line">
              {study.sections.map((section, index) => (
                <Reveal key={section.title}>
                  <div className="grid gap-5 py-9 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-4">
                      <p className="label text-accent">{String(index + 1).padStart(2, '0')}</p>
                      <h2 className="mt-3 font-display text-xl leading-snug text-ink">{section.title}</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-muted md:col-span-8">{section.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="shell pb-20 md:pb-28">
            <Reveal>
              <SectionLabel index="02">Inside the product</SectionLabel>
            </Reveal>

            <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-start">
              {study.shots.map((shot) => (
                <Reveal key={shot.src}>
                  <figure>
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      className="w-full rounded-2xl border border-line bg-surface"
                    />
                    <figcaption className="mt-4 text-sm leading-relaxed text-muted">{shot.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="border-y border-line bg-surface/50">
            <div className="shell grid gap-6 py-14 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <p className="label text-muted">Next case study</p>
                <p className="mt-3 font-display text-2xl leading-snug text-ink">{next.title}</p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{next.summary}</p>
              </div>
              <div className="flex flex-wrap gap-4 md:col-span-5 md:justify-end">
                <Link
                  href={`/work/${next.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-white"
                >
                  Read it
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/#work"
                  className="label inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-muted hover:text-ink"
                >
                  All work
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseStudies.map((study) => ({ params: { slug: study.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug)
  const study = getCaseStudy(slug)

  if (!study) return { notFound: true }

  const next = caseStudies.find((item) => item.slug !== slug) ?? study

  return {
    props: {
      study,
      next: { slug: next.slug, title: next.title, summary: next.summary },
    },
  }
}
