import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        card: '#1e1e1e',
        border: '#2a2a2a',
        primary: {
          DEFAULT: '#f97316',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1a1a1a',
          foreground: '#71717a',
        },
        accent: {
          DEFAULT: '#f97316',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        success: '#22c55e',
        warning: '#eab308',
        danger: '#ef4444',
        foreground: '#f5f5f5',
        input: '#2a2a2a',
        ring: '#f97316',
        therapy: {
          bg: '#060d14',
          surface: '#0d1b2a',
          card: '#112236',
          border: '#1e3a5f',
          primary: '#0ea5e9',
          accent: '#06b6d4',
          text: '#e2f4ff',
          muted: '#4a7fa5',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
