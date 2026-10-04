import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!message) return null

  return (
    <div
      className="fixed bottom-6 right-6 flex items-center gap-2 rounded-lg
                 border border-line border-l-4 border-l-accent
                 bg-panel px-4 py-3 text-sm text-primary shadow-soft"
    >
      {message}
    </div>
  )
}
