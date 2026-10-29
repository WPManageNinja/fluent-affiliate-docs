#!/usr/bin/env node
/**
 * Generates branded 1200x630 featured/OG images for every doc page, so a link
 * shared on Slack / X / Facebook / LinkedIn previews with that page's own title
 * instead of one generic dashboard screenshot for the whole site.
 *
 * Sources: `index.md` (home) and `docs/**\/*.md` (excluding `docs/public/`).
 * Output:  docs/public/images/featured/<section>--<page-slug>.png
 *          (`docs/public` is the configured publicDir, so these are served at
 *          `/images/featured/<section>--<page-slug>.png`.)
 *
 * NAMING RULE — the source folder is `docs/`, but `rewrites` in the VitePress config
 * serves it at `/guide/...` (`docs/<section>/<slug>.md` -> `/guide/<section>/<slug>`).
 * The card name folds the section and slug into one filename:
 *   <section>--<page-slug>.png, where section = the folder under docs/ and
 *   page-slug = the md filename without its extension. The home page uses
 *   index.png.
 * Page slugs happen to be unique across sections today, but nothing enforces
 * that here, so the section prefix is kept to make a future collision
 * impossible. `.vitepress/config.mts` recomputes the same name in
 * `featuredImageFor()` — keep the two in sync if this rule ever changes.
 *
 * A `default.png` is also emitted as the fallback for any page with no card.
 *
 * Idempotent: skips any output file that already exists unless --force is
 * passed. Run via `npm run featured:generate` (or `featured:regenerate`).
 */

import { readdirSync, statSync, readFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, relative, dirname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..')
const GUIDE_DIR = join(REPO_ROOT, 'docs')
const GUIDE_PUBLIC_DIR = join(GUIDE_DIR, 'public')
const OUTPUT_DIR = join(GUIDE_PUBLIC_DIR, 'images', 'featured')
const HOME_PATH = join(REPO_ROOT, 'index.md')
const LOGO_PATH = join(GUIDE_PUBLIC_DIR, 'images', 'brand', 'main_logo_inverted.png')

const FORCE = process.argv.includes('--force')

// FluentAffiliate blue is #2C6AE2 (the `theme-color` meta in config.mts), darkened
// into a navy so the white title holds contrast and the logo's blue mark still reads.
const BRAND_BLUE = '#2C6AE2'
const BRAND_NAVY = '#101B4A'
const EYEBROW_COLOR = '#A9C2FF'
const FONT_STACK = 'Helvetica, Arial, sans-serif'

const CANVAS_W = 1200
const CANVAS_H = 630
const MARGIN_X = 80
const TEXT_MAX_W = 980

// Logo is 464x87; 320px wide keeps the lockup readable without dominating.
const LOGO_W = 320
const LOGO_X = MARGIN_X
const LOGO_Y = 84

const FOOTER_TEXT = 'docs.fluentaffiliate.com'

// -------------------------------------------------------------------------
// File discovery
// -------------------------------------------------------------------------

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      if (full === GUIDE_PUBLIC_DIR) continue
      walk(full, files)
    } else if (stat.isFile() && entry.endsWith('.md')) {
      files.push(full)
    }
  }
  return files
}

// -------------------------------------------------------------------------
// Naming + labels
// -------------------------------------------------------------------------

/**
 * relPath: path relative to docs/, forward slashes,
 *          e.g. "admin-portal/managing-affiliates.md"
 * Returns { section, slug }.
 */
function buildNameParts(relPath) {
  const parts = relPath.split('/')
  if (parts.length < 2) {
    throw new Error(
      `Invalid path: docs/${relPath} must live inside a section folder ` +
        `(docs/<section>/<slug>.md), never directly under docs/.`
    )
  }
  return {
    section: parts[0],
    slug: parts[parts.length - 1].replace(/\.md$/, ''),
  }
}

function titleCaseSlug(slug) {
  return slug
    .split('-')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
}

/** First `# H1` in the file, else the home hero, else the slug. */
function extractTitle(mdPath, fallbackSlug) {
  const content = readFileSync(mdPath, 'utf8')

  for (const line of content.split(/\r?\n/)) {
    const match = line.trim().match(/^#\s+(.+)$/)
    if (match) return stripMarkdown(match[1])
  }

  // The home page uses `layout: home` with no H1 — fall back to its hero.
  const heroName = content.match(/^\s{2}name:\s*["']?(.+?)["']?\s*$/m)
  const heroText = content.match(/^\s{2}text:\s*["']?(.+?)["']?\s*$/m)
  if (heroName) return heroText ? `${heroName[1]} ${heroText[1]}` : heroName[1]

  return titleCaseSlug(fallbackSlug)
}

function escapeXml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// -------------------------------------------------------------------------
// Title layout
// -------------------------------------------------------------------------
//
// librsvg returns no text metrics, so line breaking approximates: bold Helvetica
// averages ~0.55em per character over mixed-case English. Walk the sizes from
// largest down and take the first that fits, so short titles stay big and long
// ones step down instead of running off the canvas.

const CHAR_WIDTH_RATIO = 0.55
const FONT_SIZE_TIERS = [66, 58, 50, 44, 38]
const MAX_LINES = 3

function wrapAt(title, fontSize) {
  const budget = Math.floor(TEXT_MAX_W / (fontSize * CHAR_WIDTH_RATIO))
  const lines = []
  let current = ''

  for (const word of title.split(/\s+/)) {
    const attempt = current ? `${current} ${word}` : word
    if (attempt.length <= budget || !current) {
      current = attempt
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)

  return { lines, budget }
}

function layoutTitle(title) {
  for (const fontSize of FONT_SIZE_TIERS) {
    const { lines } = wrapAt(title, fontSize)
    if (lines.length <= MAX_LINES) return { fontSize, lines }
  }

  const fontSize = FONT_SIZE_TIERS[FONT_SIZE_TIERS.length - 1]
  const { lines, budget } = wrapAt(title, fontSize)
  lines.length = MAX_LINES
  lines[MAX_LINES - 1] = `${lines[MAX_LINES - 1].slice(0, budget - 1).replace(/\s+$/, '')}…`
  return { fontSize, lines }
}

// -------------------------------------------------------------------------
// SVG template
// -------------------------------------------------------------------------

function buildSvg({ title, eyebrow }) {
  const { fontSize, lines } = layoutTitle(title)
  const lineHeight = Math.round(fontSize * 1.2)

  // Bottom-anchored above the footer, so one-, two- and three-line cards share
  // the same optical baseline.
  const blockBottom = 500
  const firstBaseline = blockBottom - (lines.length - 1) * lineHeight

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="${MARGIN_X}" y="${firstBaseline + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('')

  return `<svg width="${CANVAS_W}" height="${CANVAS_H}" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="${BRAND_NAVY}"/>
    </linearGradient>
  </defs>
  <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="url(#bg)"/>
  <g fill="none" stroke="#FFFFFF" stroke-opacity="0.09">
    <circle cx="1090" cy="560" r="140" stroke-width="2"/>
    <circle cx="1090" cy="560" r="215" stroke-width="2"/>
    <circle cx="1090" cy="560" r="290" stroke-width="2"/>
  </g>
  <circle cx="1090" cy="560" r="140" fill="#FFFFFF" opacity="0.05"/>
  <rect x="${MARGIN_X - 24}" y="0" width="4" height="${CANVAS_H}" fill="#FFFFFF" opacity="0.12"/>
  <text x="${MARGIN_X}" y="268" font-family="${FONT_STACK}" font-size="22" font-weight="700" letter-spacing="4" fill="${EYEBROW_COLOR}">${escapeXml(
    eyebrow.toUpperCase()
  )}</text>
  <text font-family="${FONT_STACK}" font-weight="700" font-size="${fontSize}" fill="#FFFFFF">${tspans}</text>
  <text x="${MARGIN_X}" y="574" font-family="${FONT_STACK}" font-size="18" font-weight="400" letter-spacing="1" fill="#FFFFFF" opacity="0.58">${FOOTER_TEXT}</text>
</svg>`
}

async function renderCard({ title, eyebrow, outPath, logo }) {
  await sharp(Buffer.from(buildSvg({ title, eyebrow })))
    .composite([{ input: logo, left: LOGO_X, top: LOGO_Y }])
    // Flat gradient + text compresses well at max effort, and this is lossless.
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(outPath)
}

// -------------------------------------------------------------------------
// Main
// -------------------------------------------------------------------------

async function main() {
  if (!existsSync(LOGO_PATH)) {
    throw new Error(`Logo source not found at ${LOGO_PATH}`)
  }
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Resized once and reused — re-decoding the same PNG 55+ times is pure waste.
  const logo = await sharp(LOGO_PATH).resize({ width: LOGO_W }).png().toBuffer()

  const jobs = [
    {
      outPath: join(OUTPUT_DIR, 'default.png'),
      title: 'FluentAffiliate Documentation',
      eyebrow: 'Documentation',
    },
  ]

  if (existsSync(HOME_PATH)) {
    jobs.push({
      outPath: join(OUTPUT_DIR, 'index.png'),
      title: extractTitle(HOME_PATH, 'fluentaffiliate'),
      eyebrow: 'Documentation',
    })
  }

  for (const filePath of walk(GUIDE_DIR).sort()) {
    const relPath = relative(GUIDE_DIR, filePath).split(sep).join('/')
    const { section, slug } = buildNameParts(relPath)
    jobs.push({
      outPath: join(OUTPUT_DIR, `${section}--${slug}.png`),
      title: extractTitle(filePath, slug),
      eyebrow: titleCaseSlug(section),
    })
  }

  let generated = 0
  let skipped = 0

  for (const job of jobs) {
    if (existsSync(job.outPath) && !FORCE) {
      skipped++
      continue
    }
    await renderCard({ ...job, logo })
    generated++
  }

  console.log(`Featured images: generated ${generated}, skipped ${skipped}.`)

  // A renamed or deleted page leaves its card behind, and nothing else would
  // ever notice. Report them rather than deleting — the call is the author's.
  const expected = new Set(jobs.map((job) => job.outPath.split(sep).pop()))
  const orphans = readdirSync(OUTPUT_DIR).filter(
    (name) => name.endsWith('.png') && !expected.has(name)
  )
  if (orphans.length) {
    console.log(
      `\n${orphans.length} card(s) no longer match a page — delete them if the page is gone:`
    )
    orphans.forEach((name) => console.log(`  docs/public/images/featured/${name}`))
  }
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exitCode = 1
})
