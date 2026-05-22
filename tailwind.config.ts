import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blood-red': '#C0392B',
        'deep-red': '#8B0000',
        'jet-black': '#0A0A0A',
        'cream': '#F5F0E8',
        'gold': '#D4A017',
        'charcoal': '#1A1A1A',
      },
      fontFamily: {
        oswald: ['var(--font-oswald)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
