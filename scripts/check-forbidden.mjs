#!/usr/bin/env node
/**
 * Guard rail: scan published content for SERVICE-OFFERING language that breaches
 * reference/FORBIDDEN_WORDS.md. Editorial commentary, safety-netting (e.g.
 * "needs same-day assessment"), and the locked disclaimer are allowed — so this
 * deliberately targets high-confidence service phrases and the always-forbidden
 * contact mechanisms, NOT bare clinical words (treat/assess/diagnosis/etc.).
 *
 * Run: npm run check:content
 */
import fs from 'node:fs'
import path from 'node:path'

const DIRS = ['content/medical', 'content/articles']

const PATTERNS = [
  /\bwhatsapp\b/i,
  /\bbook (a |an |your )?(consultation|appointment|session|slot|call)\b/i,
  /\bbook now\b/i,
  /\bavailable (now|today)\b/i,
  /\bsame[- ]day (appointment|consultation|booking|service)\b/i,
  /\bonline (doctor|gp)\b/i,
  /\bvirtual (doctor|gp)\b/i,
  /\bprivate (clinic|practice|gp|practitioner)\b/i,
  /\btele(medicine|health) clinic\b/i,
  /\bfree consultation\b/i,
  /\bcomplimentary (session|consultation)\b/i,
  /\bstarts at £/i,
  /\bcall me\b/i,
  /\bphone number\b/i,
  /\btrusted by patients\b/i,
  /\bpatients across the uk\b/i,
  /\bdm me\b/i,
]

const violations = []
for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue
  for (const f of fs.readdirSync(dir).filter((x) => /\.mdx?$/.test(x))) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n')
    lines.forEach((line, i) => {
      for (const re of PATTERNS) {
        if (re.test(line)) violations.push(`${dir}/${f}:${i + 1}  ${line.trim().slice(0, 110)}`)
      }
    })
  }
}

if (violations.length) {
  console.error(`✗ Forbidden service-offering language found (${violations.length}):`)
  violations.forEach((v) => console.error('  ' + v))
  process.exit(1)
}
console.log('✓ No forbidden service-offering language in content/.')
