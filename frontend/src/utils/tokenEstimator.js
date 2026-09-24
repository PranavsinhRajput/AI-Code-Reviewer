// Mirrors the backend's token budget (see project.md §7) for instant
// client-side feedback before a request is even sent. Backend's
// tiktoken-based count in token_utils.py remains the source of truth.

const TOKENS_PER_LINE = 12
const MAX_LINES = 150

export function estimateTokens(code) {
  const lines = code.split('\n').length
  return lines * TOKENS_PER_LINE
}

export function exceedsLineCap(code) {
  return code.split('\n').length > MAX_LINES
}

export { MAX_LINES }