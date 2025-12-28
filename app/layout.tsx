import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeScript } from '@/components/theme-script'
import { SimpleThemeToggle } from '@/components/simple-theme-toggle'

// Google-style typography: Inter for everything
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Pranav Kumaar Sridhar - Software Engineer & AI/ML Developer',
  description: 'Software Engineer specializing in AI/ML systems, LLM orchestration, and production ML infrastructure. Currently at Baxter International.',
  authors: [{ name: 'Pranav Kumaar Sridhar' }],
  keywords: ['Software Engineer', 'AI/ML', 'Machine Learning', 'LLM', 'RAG', 'Multi-Agent Systems', 'Python', 'TypeScript'],
  openGraph: {
    title: 'Pranav Kumaar Sridhar - Software Engineer & AI/ML Developer',
    description: 'Software Engineer specializing in AI/ML systems, LLM orchestration, and production ML infrastructure.',
    type: 'website',
    url: 'https://pranavkumaarofficial.github.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <SimpleThemeToggle />
        {children}
      </body>
    </html>
  )
}
