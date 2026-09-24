import { DiffEditor } from '@monaco-editor/react'

export default function DiffViewer({ original, modified, language }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <DiffEditor
        height="420px"
        language={language}
        original={original}
        modified={modified}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          renderSideBySide: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  )
}