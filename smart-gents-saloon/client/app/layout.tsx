import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import QueryProvider from '@/components/providers/QueryProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const viewport: Viewport = {
  themeColor: '#0F0F0F',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: 'Smart Gents Saloon | Premium Grooming for Modern Gentlemen',
    template: '%s | Smart Gents Saloon',
  },
  description:
    'Experience luxury grooming at Smart Gents Saloon. Professional haircuts, beard sculpting, straight-razor shaves, and premium salon services for the modern gentleman.',
  keywords: [
    'barbershop', 'saloon', 'haircut', 'beard trim', 'beard sculpting',
    'straight razor shave', 'grooming', 'premium', 'luxury', 'mens grooming',
    'hot towel shave', 'fade', 'barber',
  ],
  authors: [{ name: 'Smart Gents Saloon' }],
  creator: 'Smart Gents Saloon',

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE,
    siteName: 'Smart Gents Saloon',
    title: 'Smart Gents Saloon | Premium Grooming for Modern Gentlemen',
    description:
      'Experience luxury grooming at Smart Gents Saloon. Professional haircuts, beard sculpting, straight-razor shaves, and premium salon services.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "Smart Gents Saloon — Premium Men's Grooming",
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Smart Gents Saloon | Premium Grooming for Modern Gentlemen',
    description:
      'Professional haircuts, beard sculpting, and luxury grooming for the modern gentleman.',
    images: ['/opengraph-image'],
  },

  alternates: {
    canonical: BASE,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Local business JSON-LD schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Smart Gents Saloon',
  description:
    "Premium men's grooming experience — haircuts, beard sculpting, straight-razor shaves, and luxury treatments.",
  url: BASE,
  telephone: '+44 20 7123 4567',
  email: 'hello@smartgentssaloon.com',
  priceRange: '££',
  image: `${BASE}/opengraph-image`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15 Savile Row',
    addressLocality: 'London',
    postalCode: 'W1S 3PJ',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.5096,
    longitude: -0.1432,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/smartgentssaloon',
    'https://www.facebook.com/smartgentssaloon',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to Cloudinary CDN for faster image loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-background text-white font-sans antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <QueryProvider>
          <Navbar />
          <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
