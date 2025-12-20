import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Medium-style typography
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        // Medium-inspired color palette
        'medium-dark': '#242424',
        'medium-gray': '#6B6B6B',
        'medium-light': '#F7F7F7',
        'medium-border': '#E6E6E6',
        'medium-green': '#1A8917',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '680px',
            color: '#242424',
            lineHeight: '1.75',
            fontSize: '20px',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: '#242424',
            },
            h1: {
              fontSize: '42px',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '0.5em',
            },
            h2: {
              fontSize: '32px',
              lineHeight: '1.3',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            h3: {
              fontSize: '26px',
              lineHeight: '1.4',
            },
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            a: {
              color: '#242424',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: '#6B6B6B',
              },
            },
            code: {
              backgroundColor: '#F7F7F7',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontSize: '0.9em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
