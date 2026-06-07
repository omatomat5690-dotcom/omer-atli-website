/**
 * Extract Q&A pairs from article markdown for FAQPage structured data.
 *
 * Every `## Heading?` (an H2 ending in a question mark) becomes a question, with
 * the prose up to the next heading as the answer. Statement headings are ignored,
 * so only genuine questions are emitted. Returns [] unless at least 2 are found
 * (a single-item FAQ is not worth marking up).
 */

export interface FaqItem {
  question: string
  answer: string
}

/** Reduce markdown to clean plain text suitable for a schema answer field. */
function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → text
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/[*_>#]/g, '') // emphasis / blockquote / stray hashes
    .replace(/^\s*[-*+]\s+/gm, '') // bullets
    .replace(/^\s*\d+\.\s+/gm, '') // ordered markers
    .replace(/\|/g, ' ') // table pipes
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractFaq(
  content: string,
  { max = 8, answerChars = 700 }: { max?: number; answerChars?: number } = {}
): FaqItem[] {
  const lines = content.split('\n')
  const items: FaqItem[] = []

  for (let i = 0; i < lines.length; i++) {
    const m = /^##\s+(.*\?)\s*$/.exec(lines[i])
    if (!m) continue
    const question = m[1].trim()
    const body: string[] = []
    let j = i + 1
    while (j < lines.length && !/^#{1,4}\s/.test(lines[j]) && !/^---\s*$/.test(lines[j])) {
      body.push(lines[j])
      j++
    }
    const full = stripMarkdown(body.join('\n'))
    if (!question || !full) continue
    const answer =
      full.length > answerChars ? full.slice(0, answerChars).replace(/\s+\S*$/, '') + '…' : full
    items.push({ question, answer })
  }

  return items.length >= 2 ? items.slice(0, max) : []
}
