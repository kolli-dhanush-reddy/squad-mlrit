import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { AdminPanel } from '@/components/admin-panel'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CustomCursor } from '@/components/custom-cursor'
import { LayoutWrapper } from '@/components/layout-wrapper'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SQUAD — College Technical Club',
  description:
    'SQUAD is a college technical club dedicated to innovation, engineering excellence, and a community of builders. Explore our events: CodeX, Project Expo, Outreach, and Unplugged.',
  generator: 'v0.app',
  keywords: [
    'SQUAD',
    'technical club',
    'CodeX',
    'Project Expo',
    'hackathon',
    'college club',
    'innovation',
    'MLRIT',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f1a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: 'dark' }}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">
        <CustomCursor />
        <LayoutWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LayoutWrapper>
        <AdminPanel />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
