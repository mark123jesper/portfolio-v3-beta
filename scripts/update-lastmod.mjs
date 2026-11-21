#!/usr/bin/env node
/**
 * Recomputes every case study's `updated` date from git, so the sitemap's
 * <lastmod> values follow the real commits instead of being bumped by hand.
 *
 * A study's date is the newer of:
 *   - the last commit touching its entry in lib/case-studies.ts
 *   - the last commit touching its cover or gallery images under public/
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
const checkOnly = process.argv.includes('--check')

const git = (...args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })

const isoDate = (seconds) => new Date(seconds * 1000).toISOString().slice(0, 10)

/** Committer date of the last commit touching `file`, or null if it was never committed. */
const fileDate = (file) => git('log', '-1', '--format=%cs', '--', file).trim() || null

/**
 * Last commit date for the lines of one study. The `updated` line is skipped:
 * blaming it would feed the previous run's answer back into the next one.
 */
const codeDate = (start, end) => {
  const out = git('blame', '--line-porcelain', `-L${start},${end}`, '--', SOURCE)
  let stamp = 0
  let latest = 0
  for (const line of out.split('\n')) {
    const time = line.match(/^committer-time (\d+)$/)
    if (time) {
      stamp = Number(time[1])
      continue
    }
    if (!line.startsWith('\t')) continue
    if (/^\t\s*updated: '/.test(line)) continue
    latest = Math.max(latest, stamp)
  }
  return latest ? isoDate(latest) : null
}

let lines
try {
  lines = readFileSync(join(root, SOURCE), 'utf8').split('\n')
  git('rev-parse', '--git-dir')
} catch {
  console.error(`Could not read ${SOURCE} or the git history. Run this inside the repository clone.`)
  process.exit(1)
}

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
const missing = []
const uncommitted = new Set()

// Work back to front so inserted `updated` lines cannot shift the indexes still to come.
for (let i = studies.length - 1; i >= 0; i -= 1) {
  const study = studies[i]
  study.end = i + 1 < studies.length ? studies[i + 1].start - 1 : lines.length
  const block = lines.slice(study.start - 1, study.end)
  const text = block.join('\n')

  const images = [...new Set((text.match(/'\/(?:case|projects)\/[^']+'/g) ?? []).map((src) => src.slice(1, -1)))]
  const imageDates = images.map((src) => {
    const date = fileDate(`public${src}`)
    if (!date) uncommitted.add(src)
    return date
  })

  const dates = [codeDate(study.start, study.end), ...imageDates].filter(Boolean).sort()
  const latest = dates.pop()
  if (!latest) {
    missing.push(study.slug)
    continue
  }

  const offset = block.findIndex((line) => /^ {4}updated: '/.test(line))
  const current = offset === -1 ? null : block[offset].match(/^ {4}updated: '([^']*)'/)[1]
  if (current === latest) continue

  stale.push({ slug: study.slug, from: current, to: latest })
  if (checkOnly) continue

  if (offset === -1) lines.splice(study.start, 0, `    updated: '${latest}',`)
  else lines[study.start - 1 + offset] = `    updated: '${latest}',`
}

const label = (value) => value ?? '(missing)'

if (uncommitted.size > 0) {
  console.warn(`Skipping uncommitted images (no commit date yet): ${[...uncommitted].join(', ')}`)
}
if (missing.length > 0) {
  console.warn(`No commits found for: ${missing.join(', ')} — left unchanged.`)
}

if (checkOnly) {
  if (stale.length === 0) {
    console.log(`All ${studies.length} case study dates match their latest commits.`)
    process.exit(0)
  }
  console.error('Stale case study dates:')
  for (const { slug, from, to } of stale) console.error(`  ${slug}: ${label(from)} -> ${to}`)
  console.error('Run `npm run lastmod` and include the result in your commit.')
  process.exit(1)
}

if (stale.length === 0) {
  console.log(`All ${studies.length} case study dates match their latest commits — nothing to change.`)
} else {
  writeFileSync(join(root, SOURCE), lines.join('\n'))
  console.log(`Updated ${stale.length} of ${studies.length} case study dates in ${SOURCE}:`)
  for (const { slug, from, to } of stale) console.log(`  ${slug}: ${label(from)} -> ${to}`)
}
