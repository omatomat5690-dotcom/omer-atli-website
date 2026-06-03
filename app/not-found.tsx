import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-content mx-auto text-center">
        <h1 className="font-sans font-semibold text-text-heading text-4xl mb-4">
          404
        </h1>
        <p className="text-text-muted text-lg mb-8">
          This page doesn&rsquo;t exist.
        </p>
        <Link
          href="/"
          className="font-sans font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-all duration-200"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
