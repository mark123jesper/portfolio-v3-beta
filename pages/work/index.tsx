import { useMemo, useState } from 'react'
import type { GetStaticProps } from 'next'
import Link from 'next/link'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import PageHead from '@/components/PageHead'
import TextReveal from '@/components/TextReveal'
import { Reveal, SectionLabel, Tag, ArrowUpRight } from '@/components/ui'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import { avifSrcSet, colorOf, sizeOf, webpSrcSet } from '@/lib/images'
import { site } from '@/lib/site'

type Props = {
  studies: CaseStudy[]
}

const newest = caseStudies.reduce((latest, study) => (study.updated > latest ? study.updated : latest), site.updated)

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${site.url}/work#page`,
      name: `Case studies — ${site.name}`,
      url: `${site.url}/work`,
      description: 'Long-form write-ups of the projects Mark Jesper Pillerva has designed and built.',
      isPartOf: { '@type': 'WebSite', url: site.url, name: `${site.brand} — ${site.name}` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: caseStudies.length,
        itemListElement: caseStudies.map((study, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${site.url}/work/${study.slug}`,
          name: study.title,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Case studies', item: `${site.url}/work` },
      ],
    },
  ],
}

export default function WorkIndex({ studies }: Props) {
  const [filter, setFilter] = useState('All')

  // Only stacks shared by more than one study: a chip that matches one page
  // is a button that does nothing useful.
  const filters = useMemo(() => {
    const counts = new Map<string, number>()
    for (const study of studies) {
      for (const tech of study.stack) counts.set(tech, (counts.get(tech) ?? 0) + 1)
    }
    return Array.from(counts.entries())
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([name]) => name)
  }, [studies])

  const visible = filter === 'All' ? studies : studies.filter((study) => study.stack.includes(filter))

  return (
    <>
      <PageHead
        title={`Case studies — ${site.name}`}
        description={`Long-form write-ups of ${studies.length} builds: what each one needed, what it took and what it left behind.`}
        path="/work"
      />
      <JsonLd data={graph} />

      <a
        href="#case-index"
        className="sr-only rounded-full bg-ink px-5 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <Nav />

      <main id="case-index">
        <header className="shell pb-12 pt-28 md:pt-36">
          <Link
            href="/#work"
            className="label link-underline inline-flex items-center gap-2 text-muted hover:text-accent"
          >
            <span aria-hidden>←</span> Home
          </Link>

          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="label text-accent">Case studies</p>
              <TextReveal
                as="h1"
                className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-ink"
              >
                The longer versions of the work.
              </TextReveal>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted md:col-span-5 md:justify-self-end">
              {studies.length} builds, newest first, ordered by what they forced me to learn — a Bible PWA that reads
              offline back to a bootcamp magazine in plain HTML.
            </p>
          </div>

          <div role="group" aria-label="Filter case studies by stack" className="mt-10 flex flex-wrap items-center gap-2">
            {['All', ...filters].map((name) => {
              const active = filter === name
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFilter(name)}
                  aria-pressed={active}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] leading-none transition-colors ${
                    active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line text-muted hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {name}
                </button>
              )
            })}
            <p aria-live="polite" className="label ml-auto text-muted">
              {visible.length} of {studies.length}
            </p>
          </div>
        </header>

        <section className="shell pb-24">
          <div key={filter} className="divide-y divide-line border-t border-line">
            {visible.map((study, index) => {
              const [width, height] = sizeOf(study.cover.src)
              return (
                <Reveal key={study.slug}>
                  <article className="grid gap-8 py-12 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-5">
                      <Link href={`/work/${study.slug}`} className="group block">
                        <picture>
                          <source
                            type="image/avif"
                            srcSet={avifSrcSet(study.cover.src)}
                            sizes="(min-width: 768px) 38vw, 92vw"
                          />
                          <source
                            type="image/webp"
                            srcSet={webpSrcSet(study.cover.src)}
                            sizes="(min-width: 768px) 38vw, 92vw"
                          />
                          <img
                            src={study.cover.src}
                            alt={study.cover.alt}
                            width={width}
                            height={height}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            style={{ backgroundColor: colorOf(study.cover.src) }}
                            className="w-full rounded-xl border border-line transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                          />
                        </picture>
                      </Link>
                    </div>

                    <div className="md:col-span-7">
                      <p className="label text-muted">
                        {String(studies.indexOf(study) + 1).padStart(2, '0')} · {study.kicker} · {study.year}
                      </p>
                      <h2 className="mt-3 font-display text-2xl leading-tight text-ink md:text-3xl">
                        <Link href={`/work/${study.slug}`} className="link-underline hover:text-accent">
                          {study.title}
                        </Link>
                      </h2>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{study.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {study.stack.map((item) => (
                          <Tag key={item}>{item}</Tag>
                        ))}
                      </div>
                      <Link
                        href={`/work/${study.slug}`}
                        className="label link-underline mt-5 inline-flex items-center gap-1.5 text-ink hover:text-accent"
                      >
                        Read the case study
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section className="border-y border-line bg-surface/50">
          <div className="shell flex flex-col gap-4 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionLabel index="01">Last updated</SectionLabel>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Most recent change across these studies: <time dateTime={newest}>{newest}</time>.
              </p>
            </div>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-white"
            >
              See every project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    studies: caseStudies,
  },
})
