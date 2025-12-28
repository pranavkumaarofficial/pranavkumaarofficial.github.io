'use client'

import { ThemeProvider } from '@/lib/hooks/use-theme'
import { ThemeToggle } from './theme-toggle'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {children}
    </ThemeProvider>
  )
}
