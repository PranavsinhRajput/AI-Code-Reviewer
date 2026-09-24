import { useState } from 'react'
import LanguageSelector from '../components/LanguageSelector.jsx'
import CodeEditor from '../components/CodeEditor.jsx'
import OutputPanel from '../components/OutputPanel.jsx'
import IssuesList from '../components/IssuesList.jsx'
import Toast from '../components/Toast.jsx'
import { useCodeReview } from '../hooks/useCodeReview.js'
import { DEFAULT_LANGUAGE } from '../utils/languageConfig.js'
import { validateCode } from '../utils/codeValidator.js'

export default function ReviewPage() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
  const {
    result,
    loading,
    toastMessage,
    clearToast,
    runReview,
    showValidationError,
  } = useCodeReview()

  const hasCode = code.trim().length > 0

  const handleReview = () => {
    const { valid, reason } = validateCode(code)
    if (!valid) {
      showValidationError(reason)
      return
    }
    runReview(code, language)
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-4 flex items-center justify-between">
        <LanguageSelector value={language} onChange={setLanguage} />
        <button
          onClick={handleReview}
          disabled={!hasCode || loading}
          className="rounded-md bg-accent-gradient px-5 py-2 text-sm font-medium
                     text-white shadow-sm transition-opacity hover:opacity-90
                     disabled:cursor-not-allowed disabled:opacity-40"
        >
          Review Code
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CodeEditor value={code} onChange={setCode} language={language} />
        <OutputPanel original={code} code={result?.rewritten_code} language={language} loading={loading} />
      </div>

      {result && !loading && (
        <div className="mt-8">
          <IssuesList issues={result.issues} />
        </div>
      )}

      <Toast message={toastMessage} onClose={clearToast} />
    </main>
  )
}