import { useState } from 'react'
import { reviewCode } from '../api/reviewApi.js'

export function useCodeReview() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const runReview = async (code, language) => {
    setLoading(true)
    setResult(null)
    try {
      const data = await reviewCode(code, language)
      setResult(data)
    } catch (err) {
      if (err.response?.status === 429) {
        setToastMessage('Rate limit reached — please try again in a moment.')
      } else {
        setToastMessage('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    result,
    loading,
    toastMessage,
    clearToast: () => setToastMessage(''),
    runReview,
    showValidationError: setToastMessage,
  }
}