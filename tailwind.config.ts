import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0E0E0E',
        secondary: '#1C1C1C',
        text: '#F5F5F5',
        muted: '#8B8B8B',
        border: '#2C2C2C',
        dark: {
          bg: '#000000',
          text: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      }
    },
  },
  plugins: [],
}
export default config
