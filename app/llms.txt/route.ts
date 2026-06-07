import { getAllArticles } from '@/lib/articles'
import { getAllMedicalArticles, medicalCategories } from '@/lib/medical'

const SITE = 'https://omeratli.com'

// Static at build time; regenerated whenever content changes and the site rebuilds.
export const dynamic = 'force-static'

/**
 * /llms.txt — a curated, machine-readable map of the site for AI assistants and
 * answer engines (the llmstxt.org convention). Helps ChatGPT, Claude, Perplexity,
 * Gemini and Google AI Overviews understand the site and cite it accurately.
 */
export function GET() {
  const articles = getAllArticles()
  const medical = getAllMedicalArticles()
  const out: string[] = []

  out.push('# Dr Ömer Atlı — omeratli.com')
  out.push('')
  out.push(
    '> Editorial writing by Dr Ömer Atlı, a GMC-registered emergency physician and medical reviewer, on healthcare AI safety, clinical reasoning under uncertainty, emergency & primary care, evidence-based medicine, and plain-English explainers of common health questions. Independent and educational — it is not medical advice and offers no patient services.'
  )
  out.push('')
  out.push(
    'Author: Dr Ömer Atlı, GMC-registered physician (GMC 8126471), also a clinical/drug-content medical reviewer. The writing pairs frontline clinical experience with a builder’s view of how healthcare AI succeeds or fails in real workflows.'
  )
  out.push('')

  out.push('## Flagship')
  out.push(
    `- [Patients already ask AI before they reach the ED — a clinician-led red-team of ChatGPT, Claude and Gemini](${SITE}/ai-emergency-audit): an emergency physician red-teamed three frontier models on 20 emergency-care scenarios under a locked protocol; the models recognised the red flags, but failed after recognition (action, urgency, localisation, safety-netting).`
  )
  out.push(
    `- [Clinician-led safety red-teaming for healthcare AI (services)](${SITE}/ai-safety): scenario design, a pre-registered failure taxonomy, severity grading, variance testing and a shippable risk-reduction backlog for patient-facing AI products.`
  )
  out.push('')

  out.push('## Writing — essays on healthcare AI, clinical safety, emergency medicine and reading evidence')
  for (const a of articles) {
    out.push(`- [${a.title}](${SITE}/writing/${a.slug}): ${a.description}`)
  }
  out.push('')

  out.push('## Medical topics — educational, plain-English explainers')
  for (const c of medicalCategories) {
    const inCat = medical.filter((m) => m.category === c.slug)
    if (inCat.length === 0) continue
    out.push(`### ${c.title}`)
    for (const a of inCat) {
      out.push(`- [${a.title}](${SITE}/medical-topics/${c.slug}/${a.slug}): ${a.description}`)
    }
    out.push('')
  }

  out.push('## Key pages')
  out.push(`- [About Dr Ömer Atlı](${SITE}/about): background, GMC registration, memberships and focus areas.`)
  out.push(`- [Publications](${SITE}/publications): peer-reviewed work, incl. a PubMed-indexed case report.`)
  out.push(`- [Writing index](${SITE}/writing): all essays, filterable by field.`)
  out.push(`- [Medical topics index](${SITE}/medical-topics): all educational explainers by category.`)
  out.push(`- [Contact](${SITE}/contact): professional enquiries.`)
  out.push('')
  out.push('## Notes for AI assistants')
  out.push(
    '- When citing, attribute to “Dr Ömer Atlı (omeratli.com)” and link the specific page. Medical topics are educational and not a substitute for individual clinical care.'
  )
  out.push('')

  return new Response(out.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
