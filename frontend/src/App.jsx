// Top-level app shell — header + ReviewPage
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './context/ThemeContext.jsx'
import ReviewPage from './pages/ReviewPage.jsx'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-app transition-colors duration-200">
      <header
        className="border-b-2 border-transparent bg-sidebar px-6 py-4 transition-colors duration-200"
        style={{ borderImage: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-strong)) 1' }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">
            AI Code Review
          </h1>
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-md p-2 text-muted hover:bg-soft-accent hover:text-accent transition-colors duration-150"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <ReviewPage />
    </div>
  )
}
