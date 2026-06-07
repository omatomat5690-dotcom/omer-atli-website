import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

/** Minimal hast node shape for the bits we inspect. */
type HastNode = { type?: string; tagName?: string; value?: string; children?: HastNode[] }

function hastText(node?: HastNode): string {
  if (!node) return ''
  if (node.type === 'text') return node.value ?? ''
  return (node.children ?? []).map(hastText).join('')
}

const components: Components = {
  // Figures render full content-width with a subtle border (see globals.css).
  img({ src, alt }) {
    const url = typeof src === 'string' ? src : ''
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={alt ?? ''} className="article-figure" loading="lazy" />
  },

  p({ node, children }) {
    const n = node as HastNode | undefined
    const kids = (n?.children ?? []).filter(
      (c) => !(c.type === 'text' && !(c.value ?? '').trim())
    )
    // A paragraph that is just an image: unwrap it so the figure isn't boxed in a <p>.
    if (kids.length === 1 && kids[0].tagName === 'img') {
      return <>{children}</>
    }
    // Figure captions ("Figure 1 — …") get their own caption styling.
    if (/^Figure\b/.test(hastText(n).trim())) {
      return <p className="figure-caption">{children}</p>
    }
    return <p>{children}</p>
  },

  // Wrap tables so they can scroll horizontally on narrow screens.
  table({ children }) {
    return (
      <div className="table-scroll">
        <table>{children}</table>
      </div>
    )
  },

  a({ href, children }) {
    const url = href ?? ''
    // Same-origin PDFs download rather than navigate.
    if (/\.pdf(\?|#|$)/i.test(url)) {
      return (
        <a href={url} download>
          {children}
        </a>
      )
    }
    // Internal links use the Next router.
    if (url.startsWith('/')) {
      return <Link href={url}>{children}</Link>
    }
    // External links open in a new, safe tab.
    if (/^https?:/i.test(url)) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return <a href={url}>{children}</a>
  },
}

/**
 * Long-form markdown renderer matching the site's `.prose-article` treatment,
 * with figure, caption, table and link handling for the flagship pages.
 */
export default function Prose({
  children,
  className,
  style,
}: {
  children: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={`prose-article${className ? ` ${className}` : ''}`} style={style}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
