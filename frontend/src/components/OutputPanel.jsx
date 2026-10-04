import { useState } from 'react'
import Editor, { DiffEditor } from '@monaco-editor/react'
import CopyButton from './CopyButton.jsx'
import Loader from './Loader.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function OutputPanel({ original, code, language, loading }) {
  const [view, setView] = useState('code') // 'code' | 'diff'
  const { dark } = useTheme()

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-line">
      <div className="flex items-center justify-between border-b border-line bg-elevated px-3 py-2">
        <span className="text-sm font-medium text-muted">Reviewed Code</span>
        <div className="flex items-center gap-2">
          {code && (
            <div className="flex rounded-md border border-line bg-panel p-0.5 text-xs">
              <button
                onClick={() => setView('code')}
                className={`rounded px-2 py-1 font-medium transition-colors ${
                  view === 'code'
                    ? 'bg-soft-accent text-accent'
                    : 'text-muted'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setView('diff')}
                className={`rounded px-2 py-1 font-medium transition-colors ${
                  view === 'diff'
                    ? 'bg-soft-accent text-accent'
                    : 'text-muted'
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
            theme={dark ? 'vs-dark' : 'light'}
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
            theme={dark ? 'vs-dark' : 'light'}
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
        <div className="flex h-[420px] items-center justify-center px-6 text-center text-sm text-muted">
          Your reviewed code will appear here
        </div>
      )}
    </div>
  )
}
