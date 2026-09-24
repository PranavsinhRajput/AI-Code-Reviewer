// Top-level app shell — header + ReviewPage
import ReviewPage from './pages/ReviewPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b-2 border-transparent bg-white px-6 py-4"
        style={{ borderImage: 'linear-gradient(135deg, #E14A82, #9C1F54) 1' }}>
        <h1 className="text-lg font-semibold text-text-primary">
          AI Code Review
        </h1>
      </header>
      <ReviewPage />
    </div>
  )
}