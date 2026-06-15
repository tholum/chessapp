/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0E1116',
        surface: '#161B22',
        raised: '#1E242E',
        border: '#272E3A',
        primary: {
          DEFAULT: '#6E8BFF',
          hover: '#8AA0FF',
          fg: '#0E1116',
        },
        accent: {
          DEFAULT: '#E8B86D',
          soft: '#C9A45F',
        },
        content: {
          DEFAULT: '#ECEFF4',
          muted: '#9AA4B2',
          subtle: '#5C6675',
        },
        success: '#5FD49A',
        danger: '#F2737B',
        board: {
          light: '#EBE4D2',
          dark: '#6E7E9B',
          highlight: '#E8B86D',
          move: '#5FD49A',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.01em',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
        raised: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 16px 40px -16px rgba(0,0,0,0.7)',
        glow: '0 0 0 1px rgba(110,139,255,0.35), 0 0 32px -8px rgba(110,139,255,0.45)',
        board: '0 24px 60px -24px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(120% 90% at 50% -10%, rgba(110,139,255,0.16) 0%, rgba(110,139,255,0) 55%), radial-gradient(80% 70% at 85% 10%, rgba(232,184,109,0.10) 0%, rgba(232,184,109,0) 50%)',
        'card-sheen':
          'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 30%)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        prose: '68ch',
        shell: '1200px',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(95,212,154,0.5)' },
          '100%': { boxShadow: '0 0 0 12px rgba(95,212,154,0)' },
        },
      },
      animation: {
        shake: 'shake 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-up': 'fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        'pulse-ring': 'pulse-ring 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
