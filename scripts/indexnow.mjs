#!/usr/bin/env node
/**
 * Tells Bing, Yandex and Seznam which URLs changed, right after a deploy.
 *
 *   npm run indexnow            ping every URL in the live sitemap
 *   npm run indexnow -- --dry   print what would be sent
 *
 * The key file lives in public/<key>.txt, so the key URL is public by design.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dry = process.argv.includes('--dry')

const siteSource = readFileSync(join(root, 'lib', 'site.ts'), 'utf8')
const siteUrl = siteSource.match(/url:\s*'(https?:\/\/[^']+)'/)?.[1]
if (!siteUrl) {
  console.error('Could not read site.url from lib/site.ts')
  process.exit(1)
}

const keyFile = readdirSync(join(root, 'public')).find((name) => /^[a-f0-9]{32}\.txt$/.test(name))
if (!keyFile) {
  console.error('No IndexNow key file found in public/ (expected a 32-character hex name ending in .txt)')
  process.exit(1)
}
const key = keyFile.replace(/\.txt$/, '')

const sitemapUrl = `${siteUrl}/sitemap.xml`
const sitemap = await fetch(sitemapUrl).then((response) => {
  if (!response.ok) throw new Error(`${sitemapUrl} returned ${response.status}`)
  return response.text()
})
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())

if (urlList.length === 0) {
  console.error(`No URLs found in ${sitemapUrl}`)
  process.exit(1)
}

const payload = {
  host: new URL(siteUrl).host,
  key,
  keyLocation: `${siteUrl}/${keyFile}`,
  urlList,
}

if (dry) {
  console.log(`Would submit ${urlList.length} URLs to IndexNow for ${payload.host}:`)
  for (const url of urlList) console.log(`  ${url}`)
  process.exit(0)
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
})

console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URLs`)
if (!response.ok) {
  console.error(await response.text().catch(() => ''))
  process.exit(1)
}
