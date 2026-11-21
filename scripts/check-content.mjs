#!/usr/bin/env node
/**
 * Guards the hand-edited content: every case study and project card has to
 * point at files that exist, carry alt text and keep its dates honest.
 *
 *   npm run check:content
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => readFileSync(join(root, file), 'utf8')

const errors = []
const warn = (message) => errors.push(message)
const publicPath = (src) => join(root, 'public', src.replace(/^\//, ''))
const quoted = (block, key) => block.match(new RegExp(`${key}:\\s*'([^']*)'`))?.[1]
const list = (block, key) => {
  const raw = block.match(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`))?.[1] ?? ''
  return [...raw.matchAll(/'([^']*)'/g)].map((match) => match[1])
}

const studySource = read('lib/case-studies.ts')
const studyBlocks = []
const slugMatches = [...studySource.matchAll(/^ {4}slug: '([a-z0-9-]+)',$/gm)]
slugMatches.forEach((match, index) => {
  const end = index + 1 < slugMatches.length ? slugMatches[index + 1].index : studySource.length
  studyBlocks.push({ slug: match[1], block: studySource.slice(match.index, end) })
})

const seen = new Set()
for (const { slug, block } of studyBlocks) {
  if (seen.has(slug)) warn(`duplicate case study slug: ${slug}`)
  seen.add(slug)

  for (const key of ['title', 'kicker', 'year', 'role', 'summary']) {
    if (!quoted(block, key)) warn(`${slug}: missing ${key}`)
  }

  const updated = quoted(block, 'updated')
  if (!updated || !/^\d{4}-\d{2}-\d{2}$/.test(updated)) {
    warn(`${slug}: updated must be a YYYY-MM-DD date (found ${updated ?? 'nothing'})`)
  }

  const cover = block.match(/cover:\s*\{\s*src:\s*'([^']+)',\s*alt:\s*'([^']*)'/s)
  if (!cover) {
    warn(`${slug}: cover needs a src and alt`)
  } else if (!existsSync(publicPath(cover[1]))) {
    warn(`${slug}: cover image missing: public${cover[1]}`)
  } else if (!cover[2].trim()) {
    warn(`${slug}: cover alt is empty`)
  }

  if (list(block, 'stack').length === 0) warn(`${slug}: stack is empty`)

  const sectionTitles = [...block.matchAll(/sections:\s*\[[\s\S]*?\n {4}\],/g)].join('').match(/title: '/g) ?? []
  if (sectionTitles.length < 3) warn(`${slug}: expected at least 3 sections`)

  const shotsBlock = block.match(/shots:\s*\[([\s\S]*?)\n {4}\],/)
  if (shotsBlock) {
    for (const shot of shotsBlock[1].matchAll(/\{([\s\S]*?)\n {6}\}/g)) {
      const src = quoted(shot[1], 'src')
      const alt = quoted(shot[1], 'alt')
      const caption = quoted(shot[1], 'caption')
      if (!src) warn(`${slug}: shot without src`)
      else if (!existsSync(publicPath(src))) warn(`${slug}: shot image missing: public${src}`)
      if (!alt || !caption) warn(`${slug}: shot ${src ?? '(unknown)'} needs alt and caption`)
    }
  }
}

const siteSource = read('lib/site.ts')
const featuredSource = siteSource.slice(
  siteSource.indexOf('export const featuredProjects'),
  siteSource.indexOf('export const moreProjects'),
)
const projectBlocks = featuredSource.split(/\n  \{\n/).slice(1)
for (const block of projectBlocks) {
  const title = quoted(block, 'title')
  if (!title) continue

  const image = quoted(block, 'image')
  if (!image) warn(`${title}: project card has no image`)
  else if (!existsSync(publicPath(image))) warn(`${title}: card image missing: public${image}`)

  const caseSlug = block.match(/caseStudy:\s*'\/work\/([a-z0-9-]+)'/)?.[1]
  if (caseSlug && !seen.has(caseSlug)) warn(`${title}: caseStudy points at unknown study ${caseSlug}`)

  for (const key of ['live', 'source']) {
    const url = quoted(block, key)
    if (url && !/^https?:\/\//.test(url)) warn(`${title}: ${key} is not an http(s) URL`)
  }
}

if (errors.length > 0) {
  console.error(`Content check failed with ${errors.length} problem${errors.length === 1 ? '' : 's'}:`)
  for (const error of errors) console.error(`  ${error}`)
  process.exit(1)
}

console.log(`Content check passed: ${studyBlocks.length} case studies, ${projectBlocks.length} project cards.`)
