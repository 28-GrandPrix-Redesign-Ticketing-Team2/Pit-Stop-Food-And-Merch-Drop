import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pitstop: {
          background: '#050505',
          surface: '#0B0B0F',
          border: '#2A2A2E',
          text: '#FFFFFF',
          'text-secondary': '#C7C7CC',
          brand: '#E10600',
          urgent: '#FF3B30',
          success: '#00D67A',
          location: '#2F80FF',
          price: '#DFFF19',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Big Shoulders Display', 'sans-serif'],
        sans: ['var(--font-geist-sans)', 'Geist', 'sans-serif'],
      },
      fontSize: {
        'screen-title': ['32px', { lineHeight: '1.1', fontWeight: '800' }],
        'section-title': ['24px', { lineHeight: '1.2', fontWeight: '800' }],
        'card-title': ['20px', { lineHeight: '1.2', fontWeight: '800' }],
        'compact-title': ['18px', { lineHeight: '1.25', fontWeight: '800' }],
        'body-large': ['16px', { lineHeight: '1.4' }],
        body: ['14px', { lineHeight: '1.4' }],
        label: ['12px', { lineHeight: '1.3', fontWeight: '700' }],
        'label-compact': ['10px', { lineHeight: '1.3', fontWeight: '900' }],
      },
      spacing: {
        micro: '4px',
        compact: '8px',
        small: '12px',
        standard: '16px',
        screen: '20px',
        section: '24px',
      },
      borderRadius: {
        tiny: '4px',
        small: '8px',
        card: '12px',
        large: '16px',
        icon: '30px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 8px 16px rgba(0, 0, 0, 0.50)',
        raised: '0 8px 24px rgba(0, 0, 0, 0.50)',
      },
      minWidth: {
        tap: '44px',
      },
      minHeight: {
        tap: '44px',
      },
    },
  },
  plugins: [],
};

export default config;
