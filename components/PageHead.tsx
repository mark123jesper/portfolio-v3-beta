import Head from 'next/head'
import { site } from '@/lib/site'

type Props = {
  title?: string
  description?: string
  path?: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  type?: 'website' | 'article'
}

const PageHead = ({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  type = 'website',
}: Props) => {
  const pageTitle = title ?? `${site.name} — ${site.role}`
  const pageDescription = description ?? site.description
  const pageUrl = `${site.url}${path}`
  const wideImage = image ?? `${site.url}/og.png`
  const wideAlt = imageAlt ?? `${site.name} — ${site.role}`

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={pageDescription} />
      <meta name="author" content={site.name} />
      <meta
        name="keywords"
        content="Mark Jesper Pillerva, White Cat Dev, front-end developer, React developer, Next.js, Tailwind CSS, portfolio, Ontario"
      />
      <meta name="creator" content={site.name} />
      <meta name="theme-color" content="#FBF6EF" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#121110" media="(prefers-color-scheme: dark)" />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={`${site.name} — ${site.brand}`} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={wideImage} />
      <meta property="og:image:alt" content={wideAlt} />
      {image ? (
        <>
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content={String(imageWidth)} />
          <meta property="og:image:height" content={String(imageHeight)} />
        </>
      ) : (
        <>
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image" content={`${site.url}/og-square.png`} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="1200" />
          <meta property="og:image:alt" content={wideAlt} />
        </>
      )}
      <meta property="og:locale" content="en_CA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@shironekomaru69" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={wideImage} />
      <meta name="twitter:image:alt" content={wideAlt} />

      <title>{pageTitle}</title>
    </Head>
  )
}

export default PageHead
