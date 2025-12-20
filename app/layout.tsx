import type { Metadata } from 'next'
import { Inter, Lora, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Medium uses Charter/Georgia for headings and SF Pro/Inter for body
const serif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pranav Kumaar Sridhar - Software Engineer & AI/ML Developer',
  description: 'Software Engineer specializing in AI/ML systems, enterprise interoperability, and full-stack development. Currently at Baxter International.',
  authors: [{ name: 'Pranav Kumaar Sridhar' }],
  keywords: ['Software Engineer', 'AI/ML', 'Machine Learning', 'LLM', 'RAG', 'Full Stack Developer', 'Next.js', 'Python'],
  openGraph: {
    title: 'Pranav Kumaar Sridhar - Software Engineer & AI/ML Developer',
    description: 'Software Engineer specializing in AI/ML systems, enterprise interoperability, and full-stack development.',
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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-white text-medium-dark">
        {children}
      </body>
    </html>
  )
}
