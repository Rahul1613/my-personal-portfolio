/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        grotesk: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: '#0A0B0D',
        surface: '#111318',
        text: '#F2F3F5',
        muted: '#6B7280',
        // Dev accent
        'dev-from': '#3B82F6',
        'dev-to': '#22D3EE',
        // Marketer accent
        'mkt-from': '#F59E0B',
        'mkt-to': '#F97316',
        // Security accent
        'sec-base': '#10B981',
        'sec-alert': '#EF4444',
      },
      backgroundImage: {
        'dev-gradient': 'linear-gradient(135deg, #3B82F6, #22D3EE)',
        'mkt-gradient': 'linear-gradient(135deg, #F59E0B, #F97316)',
        'sec-gradient': 'linear-gradient(135deg, #10B981, #059669)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'ticker': 'ticker 25s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glitch': 'glitch 0.3s steps(2) infinite',
        'radar': 'radarSpin 4s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glitch: {
          '0%': { clipPath: 'inset(0 0 90% 0)' },
          '50%': { clipPath: 'inset(40% 0 30% 0)' },
          '100%': { clipPath: 'inset(80% 0 0 0)' },
        },
        radarSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
