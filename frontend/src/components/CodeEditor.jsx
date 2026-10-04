import Editor from '@monaco-editor/react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function CodeEditor({ value, onChange, language, title = 'Your Code' }) {
  const { dark } = useTheme()

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-line">
      <div className="border-b border-line bg-elevated px-3 py-2">
        <span className="text-sm font-medium text-muted">{title}</span>
      </div>
      <Editor
        height="420px"
        language={language}
        value={value}
        onChange={(val) => onChange(val ?? '')}
        theme={dark ? 'vs-dark' : 'light'}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 12 },
        }}
      />
    </div>
  )
}
