import Head from 'next/head'
import { site } from '@/lib/site'

const PageHead = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={site.description} />
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
      <link rel="canonical" href={`${site.url}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${site.name} — ${site.brand}`} />
      <meta property="og:title" content={`${site.name} — ${site.role}`} />
      <meta property="og:description" content={site.description} />
      <meta property="og:url" content={`${site.url}/`} />
      <meta property="og:image" content={`${site.url}/android-chrome-512x512.png`} />
      <meta property="og:locale" content="en_CA" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@shironekomaru69" />
      <meta name="twitter:title" content={`${site.name} — ${site.role}`} />
      <meta name="twitter:description" content={site.description} />
      <meta name="twitter:image" content={`${site.url}/android-chrome-512x512.png`} />

      <title>{`${site.name} — ${site.role}`}</title>
    </Head>
  )
}

export default PageHead
