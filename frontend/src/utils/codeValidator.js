// Lightweight "is this actually code" check before sending to the LLM —
// keeps garbage input from burning tokens and producing a garbage review.

const CODE_SIGNALS = [
  /[{};]/,           // braces, semicolons
  /\bfunction\b|\bdef\b|\bclass\b|\bconst\b|\blet\b|\bvar\b/,
  /^\s*(#|\/\/|\/\*)/m, // comment markers
  /=>|==|!=|&&|\|\|/,
]

export function validateCode(code) {
  const trimmed = code.trim()

  if (!trimmed) {
    return { valid: false, reason: 'Paste some code first.' }
  }

  const signalCount = CODE_SIGNALS.filter((pattern) => pattern.test(trimmed)).length
  if (signalCount === 0) {
    return { valid: false, reason: "This doesn't look like code — check what you pasted." }
  }

  if (trimmed.split('\n').length > 150) {
    return { valid: false, reason: 'Keep it under 150 lines for a review.' }
  }

  return { valid: true, reason: null }
}