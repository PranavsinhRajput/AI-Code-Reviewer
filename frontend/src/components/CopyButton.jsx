import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy code'}
      className="rounded-md p-1.5 text-text-secondary transition-colors
                 hover:bg-accent-soft hover:text-accent"
    >
      {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
    </button>
  )
}