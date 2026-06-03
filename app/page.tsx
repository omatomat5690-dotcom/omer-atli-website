import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedArticles } from '@/lib/articles'
import { topics } from '@/lib/topics'
import KineticHeading from '@/components/effects/KineticHeading'
import NewsletterBand from '@/components/NewsletterBand'

export default function HomePage() {
  const articles = getFeaturedArticles(3)

  return (
    <>
      {/* HERO */}
      <header className="hero wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker kicker reveal">Dr — Emergency Medicine · Healthcare AI</div>
            <KineticHeading text="OMER ATLI" className="name" />
            <div className="role reveal">
              Emergency Physician <i>·</i> Clinical Safety <i>·</i> Digital Health
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
              <span className="portrait-tag">GMC 8126471 · UK</span>
              <span className="portrait-frame" />
            </div>
          </div>
        </div>
      </header>

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

      {/* NEWSLETTER */}
      <section className="section wrap">
        <NewsletterBand />
      </section>
    </>
  )
}
