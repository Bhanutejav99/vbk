import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from './providers'

export const metadata: Metadata = {
  title: 'VBK Designs | Exclusive Bridal & Maggam Boutique',
  description: 'VBK Designs - Premier Maggam Work, Bridal Stitching & Boutique in Hindupuram. Explore blouses, wedding collections, lehangas, and more.',
  keywords: 'maggam work, bridal blouse, boutique, hindupuram, wedding, lehanga, embroidery',
  openGraph: {
    title: 'VBK Designs | Exclusive Bridal & Maggam Boutique',
    description: 'Premier Maggam Work, Bridal Stitching & Boutique in Hindupuram.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
