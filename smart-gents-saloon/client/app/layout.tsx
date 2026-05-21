import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: {
    default: 'Smart Gents Saloon | Premium Grooming for Modern Gentlemen',
    template: '%s | Smart Gents Saloon',
  },
  description:
    'Experience luxury grooming at Smart Gents Saloon. Professional haircuts, beard trims, facials, and premium salon services.',
  keywords: ['barbershop', 'saloon', 'haircut', 'beard trim', 'grooming', 'premium', 'luxury'],
  openGraph: {
    type: 'website',
    siteName: 'Smart Gents Saloon',
    title: 'Smart Gents Saloon | Premium Grooming for Modern Gentlemen',
    description:
      'Experience luxury grooming at Smart Gents Saloon. Professional haircuts, beard trims, and premium salon services.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-white font-sans antialiased min-h-screen flex flex-col">
        <QueryProvider>
          <Navbar />
          <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
