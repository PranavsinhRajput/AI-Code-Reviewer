import { useState } from 'react'
import Editor, { DiffEditor } from '@monaco-editor/react'
import CopyButton from './CopyButton.jsx'
import Loader from './Loader.jsx'

export default function OutputPanel({ original, code, language, loading }) {
  const [view, setView] = useState('code') // 'code' | 'diff'

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-surface px-3 py-2">
        <span className="text-sm font-medium text-text-secondary">Reviewed Code</span>
        <div className="flex items-center gap-2">
          {code && (
            <div className="flex rounded-md border border-border bg-white p-0.5 text-xs">
              <button
                onClick={() => setView('code')}
                className={`rounded px-2 py-1 font-medium transition-colors ${
                  view === 'code' ? 'bg-accent-soft text-accent' : 'text-text-secondary'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setView('diff')}
                className={`rounded px-2 py-1 font-medium transition-colors ${
                  view === 'diff' ? 'bg-accent-soft text-accent' : 'text-text-secondary'
                }`}
              >
                Diff
              </button>
            </div>
          )}
          {code && <CopyButton text={code} />}
        </div>
      </div>

      {loading ? (
        <div className="flex h-[420px] items-center justify-center">
          <Loader />
        </div>
      ) : code ? (
        view === 'diff' ? (
          <DiffEditor
            height="420px"
            language={language}
            original={original}
            modified={code}
            theme="vs-dark"
            options={{
              readOnly: true,
              renderSideBySide: false,
              renderIndicators: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              renderOverviewRuler: false,
            }}
          />
        ) : (
          <Editor
            height="420px"
            language={language}
            value={code}
            theme="vs-dark"
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 12 },
            }}
          />
        )
      ) : (
        <div className="flex h-[420px] items-center justify-center px-6 text-center text-sm text-text-secondary">
          Your reviewed code will appear here
        </div>
      )}
    </div>
  )
}