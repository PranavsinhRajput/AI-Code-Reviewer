import Editor from '@monaco-editor/react'

export default function CodeEditor({ value, onChange, language, title = 'Your Code' }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-surface px-3 py-2">
        <span className="text-sm font-medium text-text-secondary">{title}</span>
      </div>
      <Editor
        height="420px"
        language={language}
        value={value}
        onChange={(val) => onChange(val ?? '')}
        theme="vs-dark"
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