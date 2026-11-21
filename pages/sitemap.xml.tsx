import type { GetServerSideProps } from 'next'

import { caseStudies } from '@/lib/case-studies'
import { site } from '@/lib/site'

const entry = (path: string, changefreq: string, priority: string, lastmod: string) =>
  `  <url><loc>${site.url}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const newestStudy = caseStudies.reduce((latest, study) => (study.updated > latest ? study.updated : latest), '')

  // The home page carries every card, so it is as fresh as the newest case study or the site copy.
  const homeLastmod = [newestStudy, site.updated].reduce((latest, date) => (date > latest ? date : latest), '')

  const urls = [
    entry('/', 'monthly', '1.0', homeLastmod),
    entry('/work', 'monthly', '0.8', newestStudy),
    ...caseStudies.map((study) => entry(`/work/${study.slug}`, 'yearly', '0.7', study.updated)),
  ]

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400')
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
      '\n',
    )}\n</urlset>\n`,
  )
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
