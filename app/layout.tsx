import type { Metadata } from 'next'
import { Newsreader, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteEffects from '@/components/effects/SiteEffects'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Omer Atli — Healthcare AI, Emergency Medicine, Clinical Safety',
    template: '%s — Omer Atli',
  },
  description:
    'Dr Omer Atli writes about the clinical reality behind modern medicine — emergency care, healthcare AI, digital health, and patient safety.',
  metadataBase: new URL('https://omeratli.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://omeratli.com',
    siteName: 'Omer Atli',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omer Atli — Healthcare AI, Emergency Medicine, Clinical Safety',
    description:
      'Dr Omer Atli writes about the clinical reality behind modern medicine — emergency care, healthcare AI, digital health, and patient safety.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://omeratli.com/#person',
      name: 'Dr Omer Atli',
      honorificPrefix: 'Dr',
      url: 'https://omeratli.com/about',
      image: 'https://omeratli.com/dr-omer-atli.jpg',
      jobTitle: ['Emergency Physician', 'Medical Reviewer'],
      description:
        'GMC-registered physician writing on healthcare AI, emergency and primary care, clinical safety, and medical content review.',
      sameAs: ['https://www.linkedin.com/in/dromeratli'],
      identifier: { '@type': 'PropertyValue', propertyID: 'GMC', value: '8126471' },
      memberOf: [
        { '@type': 'Organization', name: 'British Medical Association' },
        { '@type': 'Organization', name: 'Independent Doctors Federation' },
        { '@type': 'Organization', name: 'Turkish Medical Association' },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'Doctor of Medicine (MD)',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'license',
          name: 'Registered physician — General Medical Council (UK)',
          recognizedBy: { '@type': 'Organization', name: 'General Medical Council' },
        },
      ],
      knowsAbout: [
        'Healthcare AI',
        'Emergency Medicine',
        'Primary Care',
        'Clinical Safety',
        'Medical content review',
        'Evidence-based medicine',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://omeratli.com/#website',
      url: 'https://omeratli.com',
      name: 'Omer Atli',
      inLanguage: 'en-GB',
      publisher: { '@id': 'https://omeratli.com/#person' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${newsreader.variable} ${hanken.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <SiteEffects />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
