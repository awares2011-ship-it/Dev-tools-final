/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  // NO dark mode — light gray theme only
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          orange:     '#f97316',
          'orange-d': '#ea580c',
          'orange-l': '#fff7ed',
          green:      '#22c55e',
          'green-d':  '#16a34a',
          'green-l':  '#f0fdf4',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #f97316, #ea580c)',
        'green-gradient':  'linear-gradient(135deg, #22c55e, #16a34a)',
      },
    },
  },
  plugins: [],
}
