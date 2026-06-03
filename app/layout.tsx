import type { Metadata } from 'next'
import { Lora, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-GB"
      className={`${lora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-primary text-text-primary font-serif antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
