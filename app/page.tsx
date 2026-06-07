import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedArticles } from '@/lib/articles'
import { topics } from '@/lib/topics'
import { getFeaturedMedical, medicalCategories } from '@/lib/medical'
import KineticHeading from '@/components/effects/KineticHeading'

const medicalCategoryTitle = (slug: string) =>
  medicalCategories.find((c) => c.slug === slug)?.title ?? 'Medical Topics'

export default function HomePage() {
  const articles = getFeaturedArticles(3)
  const medicalReads = getFeaturedMedical(3)

  return (
    <>
      {/* HERO */}
      <header className="hero wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker kicker reveal">Emergency &amp; Primary Care · Healthcare AI</div>
            <KineticHeading text="OMER ATLI" className="name" />
            <div className="role reveal">
              Emergency &amp; Primary Care <i>·</i> Medical Reviewer <i>·</i> Clinical Safety
            </div>
            <p className="hero-lead lead serif reveal">
              I write about the clinical reality behind modern medicine — emergency care,
              healthcare AI, digital health, and patient safety.
            </p>
            <div className="hero-cta reveal">
              <Link className="btn btn-primary" data-magnetic="0.25" href="/writing">
                Read the writing <span className="arr">→</span>
              </Link>
              <Link className="btn btn-ghost" href="/about">
                About
              </Link>
            </div>
          </div>

          <div className="hero-media reveal">
            <div className="portrait">
              <Image
                src="/dr-omer-atli.jpg"
                alt="Dr Omer Atli"
                fill
                priority
                sizes="(max-width: 880px) 86vw, 460px"
              />
              <span className="portrait-frame" />
            </div>
          </div>
        </div>
      </header>

      {/* FEATURED INVESTIGATION */}
      <section className="section wrap" id="featured" style={{ paddingTop: 0 }}>
        <div className="shead">
          <div>
            <div className="kicker reveal">Featured — clinician-led investigation</div>
            <h2 className="reveal">When patients ask AI before they reach the ED</h2>
          </div>
          <Link className="linkmore reveal" href="/ai-safety">
            AI safety red-teaming <span className="arr">→</span>
          </Link>
        </div>
        <div className="essays">
          <Link className="essay reveal" href="/ai-emergency-audit">
            <div className="e-tag">Healthcare AI</div>
            <div className="e-body">
              <h3>Patients already ask AI before they reach the ED. I tested what happens next.</h3>
              <p>
                An emergency physician red-teamed ChatGPT, Claude and Gemini on 20 emergency-care
                scenarios under a locked protocol — the models recognised the red flags; the
                failures came after recognition.
              </p>
            </div>
            <div className="e-read">
              <span className="arr">→</span>
              Read
            </div>
          </Link>
        </div>
      </section>

      {/* TOPICS */}
      <section className="section wrap" id="topics">
        <div className="shead">
          <div>
            <div className="kicker reveal">01 — Fields</div>
            <h2 className="reveal">What I write about</h2>
          </div>
          <div className="meta reveal">Five through-lines</div>
        </div>
        <div className="topics">
          {topics.map((topic, i) => (
            <Link key={topic.slug} className="topic reveal" href={`/topics/${topic.slug}`}>
              <span className="glow" />
              <div className="idx">{String(i + 1).padStart(2, '0')}</div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <span className="go">
                Explore <span className="arr">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SELECTED WRITING */}
      {articles.length > 0 && (
        <section className="section wrap" id="writing">
          <div className="shead">
            <div>
              <div className="kicker reveal">02 — Selected</div>
              <h2 className="reveal">Selected Writing</h2>
            </div>
            <Link className="linkmore reveal" href="/writing">
              See all writing <span className="arr">→</span>
            </Link>
          </div>
          <div className="essays">
            {articles.map((article) => (
              <Link key={article.slug} className="essay reveal" href={`/writing/${article.slug}`}>
                <div className="e-tag">{article.theme}</div>
                <div className="e-body">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
                <div className="e-read">
                  <span className="arr">→</span>
                  {article.readingTime.replace(' read', '')}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* POPULAR MEDICAL READS */}
      {medicalReads.length > 0 && (
        <section className="section wrap" id="medical">
          <div className="shead">
            <div>
              <div className="kicker reveal">03 — Health</div>
              <h2 className="reveal">Popular Medical Reads</h2>
            </div>
            <Link className="linkmore reveal" href="/medical-topics">
              Browse medical topics <span className="arr">→</span>
            </Link>
          </div>
          <div className="essays">
            {medicalReads.map((article) => (
              <Link
                key={article.slug}
                className="essay reveal"
                href={`/medical-topics/${article.category}/${article.slug}`}
              >
                <div className="e-tag">{medicalCategoryTitle(article.category)}</div>
                <div className="e-body">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
                <div className="e-read">
                  <span className="arr">→</span>
                  {article.readingTime.replace(' read', '')}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
