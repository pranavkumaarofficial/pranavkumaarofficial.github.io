import Link from 'next/link'

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-medium-border z-50">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <Link
            href="/"
            className="text-medium-dark hover:text-medium-green transition-colors no-underline font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Article content */}
      <article className="prose-medium py-16">
        {children}
      </article>
    </div>
  )
}
