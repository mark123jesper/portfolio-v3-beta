#!/usr/bin/env node
/**
 * Recomputes the dates the sitemap publishes, from git.
 *
 * Case studies: the newer of the last commit touching the study's entry in
 * lib/case-studies.ts and the last commit touching its cover or gallery images.
 * The site itself (home page): the newer of the newest study and the last commit
 * touching the copy or layout the home page renders.
 *
 *   npm run lastmod          rewrite any stale dates
 *   npm run lastmod:check    exit 1 if any date is stale (no writes)
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = 'lib/case-studies.ts'
const SITE_SOURCE = 'lib/site.ts'
const checkOnly = process.argv.includes('--check')

/** Files whose commits change what the home page and its sitemap entry describe. */
const SITE_FILES = [
  SITE_SOURCE,
  'pages/index.tsx',
  'pages/work/index.tsx',
  'components/sections',
  'components/Nav.tsx',
  'components/Footer.tsx',
  'components/PageHead.tsx',
  'styles/globals.css',
]

const git = (...args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })

const isoDate = (seconds) => new Date(seconds * 1000).toISOString().slice(0, 10)

/** Committer date of the last commit touching `file`, or null if it was never committed. */
const fileDate = (file) => git('log', '-1', '--format=%cs', '--', file).trim() || null

/**
 * Last commit date for the lines of one block. The `updated` line is skipped:
 * blaming it would feed the previous run's answer back into the next one.
 */
const codeDate = (file, start, end, skip = /^\t\s*updated: '/) => {
  const range = start && end ? [`-L${start},${end}`] : []
  const out = git('blame', '--line-porcelain', ...range, '--', file)
  let stamp = 0
  let latest = 0
  for (const line of out.split('\n')) {
    const time = line.match(/^committer-time (\d+)$/)
    if (time) {
      stamp = Number(time[1])
      continue
    }
    if (!line.startsWith('\t')) continue
    if (skip.test(line)) continue
    latest = Math.max(latest, stamp)
  }
  return latest ? isoDate(latest) : null
}

const lines = readFileSync(join(root, SOURCE), 'utf8').split('\n')
git('rev-parse', '--git-dir')

const studies = []
lines.forEach((line, index) => {
  const match = line.match(/^ {4}slug: '([a-z0-9-]+)',$/)
  if (match) studies.push({ slug: match[1], start: index + 1 })
})

if (studies.length === 0) {
  console.error(`No case studies found in ${SOURCE}.`)
  process.exit(1)
}

const stale = []
const studyDates = []
const uncommitted = new Set()

// Work back to front so inserted `updated` lines cannot shift the indexes still to come.
for (let i = studies.length - 1; i >= 0; i -= 1) {
  const study = studies[i]
  study.end = i + 1 < studies.length ? studies[i + 1].start - 1 : lines.length
  const block = lines.slice(study.start - 1, study.end)

  const images = [...new Set((block.join('\n').match(/'\/(?:case|projects)\/[^']+'/g) ?? []).map((src) => src.slice(1, -1)))]
  const imageDates = images.map((src) => {
    const date = fileDate(`public${src}`)
    if (!date) uncommitted.add(src)
    return date
  })

  const dates = [codeDate(SOURCE, study.start, study.end), ...imageDates].filter(Boolean).sort()
  const latest = dates.pop()
  if (!latest) continue

  studyDates.push(latest)

  const offset = block.findIndex((line) => /^ {4}updated: '/.test(line))
  const current = offset === -1 ? null : block[offset].match(/^ {4}updated: '([^']*)'/)[1]
  if (current === latest) continue

  stale.push({ name: study.slug, from: current, to: latest })
  if (checkOnly) continue

  if (offset === -1) lines.splice(study.start, 0, `    updated: '${latest}',`)
  else lines[study.start - 1 + offset] = `    updated: '${latest}',`
}

// The home page is as fresh as the newest study or the last change to its own copy.
const siteFileDates = SITE_FILES.map((file) =>
  file === SITE_SOURCE ? codeDate(SITE_SOURCE) : fileDate(file),
)
const siteLatest = [...studyDates, ...siteFileDates].filter(Boolean).sort().pop()

if (siteLatest) {
  const siteLines = readFileSync(join(root, SITE_SOURCE), 'utf8').split('\n')
  const offset = siteLines.findIndex((line) => /^ {2}updated: '/.test(line))
  const current = offset === -1 ? null : siteLines[offset].match(/^ {2}updated: '([^']*)'/)[1]

  if (current !== siteLatest) {
    stale.push({ name: 'site (home)', from: current, to: siteLatest })
    if (!checkOnly) {
      if (offset === -1) siteLines.splice(2, 0, `  updated: '${siteLatest}',`)
      else siteLines[offset] = `  updated: '${siteLatest}',`
      writeFileSync(join(root, SITE_SOURCE), siteLines.join('\n'))
    }
  }
}

const label = (value) => value ?? '(missing)'

if (uncommitted.size > 0) {
  console.warn(`Skipping uncommitted images (no commit date yet): ${[...uncommitted].join(', ')}`)
}

if (checkOnly) {
  if (stale.length === 0) {
    console.log(`All ${studies.length} case study dates and the site date match their latest commits.`)
    process.exit(0)
  }
  console.error('Stale dates:')
  for (const { name, from, to } of stale) console.error(`  ${name}: ${label(from)} -> ${to}`)
  console.error('Run `npm run lastmod` and include the result in your commit.')
  process.exit(1)
}

if (stale.length === 0) {
  console.log(`All ${studies.length} case study dates and the site date match their latest commits — nothing to change.`)
} else {
  writeFileSync(join(root, SOURCE), lines.join('\n'))
  console.log(`Updated ${stale.length} date${stale.length === 1 ? '' : 's'}:`)
  for (const { name, from, to } of stale) console.log(`  ${name}: ${label(from)} -> ${to}`)
}
