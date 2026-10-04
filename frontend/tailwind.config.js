/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — driven by CSS variables, auto-switch with data-theme
        app:            'var(--color-app)',
        panel:          'var(--color-panel)',
        elevated:       'var(--color-elevated)',
        sidebar:        'var(--color-sidebar)',
        primary:        'var(--color-text)',
        muted:          'var(--color-muted)',
        line:           'var(--color-line)',
        accent:         'var(--color-accent)',
        'accent-strong':'var(--color-accent-strong)',
        'soft-accent':  'var(--color-soft-accent)',
        // Severity (unchanged)
        critical:   '#ef4444',
        warning:    '#f59e0b',
        suggestion: '#3b82f6',
      },
      backgroundImage: {
        // Orange harvest gradient for the Review Code button
        'accent-gradient': 'linear-gradient(135deg, hsl(28 100% 52%) 0%, hsl(28 100% 40%) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft:   'var(--shadow-soft)',
        button: 'var(--shadow-button)',
      },
    },
  },
  plugins: [],
}
