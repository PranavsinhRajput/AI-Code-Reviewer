# AI Code Review Tool — Project Doc

_Living document — edited/appended as the project evolves. Last updated: turn 2._

---

## 1. Problem Statement
Junior developers frequently push buggy or unoptimized code because peer reviews are slow and senior engineers become a bottleneck. There's no scalable tool that can instantly review a code snippet, catch bugs, flag security vulnerabilities, and suggest improvements with clear explanations.

## 2. Solution
- User pastes code (no file upload — see Edge Cases) into a VS Code–style editor and selects the language.
- The code is sent to an LLM (Groq API, free tier) with a structured system prompt requesting JSON output covering: bugs, security issues, performance suggestions, and a cleaned/rewritten version.
- Results are rendered in a **side-by-side diff view** so the developer can instantly compare original vs. improved code.

## 3. Key Features
- Select language, then paste code — instant review in seconds
- Side-by-side original vs. suggested rewrite with diff highlighting
- Severity tags per issue: **Critical / Warning / Suggestion**
- One-click "Copy improved code" button

## 4. Expected Outcomes / Benefits
- Instant, structured feedback for junior developers — no waiting on senior review
- Consistent code quality across teams, zero reviewer bottleneck
- Security issues caught before reaching production
- Scalable to any language/codebase with a single prompt adjustment

## 5. Tech Stack
| Layer | Tech |
|---|---|
| Frontend | Vite + React + Tailwind CSS |
| Code editor / diff | Monaco Editor (`@monaco-editor/react`) — same engine as VS Code, used for both the paste-in editor and the side-by-side `DiffEditor` |
| Backend | FastAPI (REST API + LLM orchestration) |
| LLM | Groq API — **free tier** |

## 6. Model Choice (Groq, verified against current docs)

`llama-3.3-70b-versatile` is now **Enterprise-only** (Contact Sales pricing) on Groq — it's off the free tier and shouldn't be used for this project. The current free-tier-usable models with published pricing are:

| Model | Context | Max output | Price (in/out per 1M) | Free-tier limits (RPM / RPD / TPM / TPD) |
|---|---|---|---|---|
| `openai/gpt-oss-120b` | 131,072 | 65,536 | $0.15 / $0.60 | 30 / 1,000 / **8,000** / 200,000 |
| `openai/gpt-oss-20b` | 131,072 | 65,536 | $0.075 / $0.30 | 30 / 1,000 / **8,000** / 200,000 |

**Decision: `openai/gpt-oss-120b`** as primary — strongest reasoning/code quality of the free-tier options, same rate limits as the smaller model so there's no free-tier cost to picking it. Keep `openai/gpt-oss-20b` as an easy config swap (`MODEL_NAME` env var) if `120b` ever gets rate-limited or deprecated. Both are reasoning models — set `reasoning_effort: "low"` in the API call to keep hidden reasoning-token usage down, since that's part of what counts against the token budget below.

## 7. Token Budget & Line Cap (sized to the free tier)

The binding constraint isn't the model's context window (131K) — it's Groq's **free-tier rate limits**, specifically:
- **TPM = 8,000 tokens/minute** (input + output combined) — this is the tight one
- **TPD = 200,000 tokens/day** — caps total reviews per day, not per-request size
- RPM (30) / RPD (1,000) are not the limiting factor at this request size

**Estimate per request** (code tokenizes denser than prose — symbols, indentation, camelCase splits):
- Fixed overhead: system prompt + JSON schema instructions + low-effort reasoning trace ≈ **900 tokens**
- Code tokens ≈ **12 tokens/line** (average across languages)
- Output = rewritten code (≈1.1× input code tokens) + issues JSON (≈350 tokens)

`Total ≈ 900 + 12L (input code) + 13.2L (output code) + 350 ≈ 1,250 + 25.2L`

| Lines (L) | Est. total tokens |
|---|---|
| 100 | ~3,770 |
| 130 | ~4,530 |
| 150 | ~5,030 |

**Decision: `MAX_LINES = 150`** stays safe — even at 150 lines a request uses ~5,000 of the 8,000 TPM budget, leaving buffer for variance in reasoning-token usage. The practical limit this creates: roughly **one review every ~40 seconds** if requests are back-to-back at max size (8,000 TPM ÷ ~5,000 tokens/request), and **~35–45 full reviews per day** before hitting the 200K TPD cap. Both of these are UX-relevant, not just line-cap math — see Edge Cases below.

Implementation: `backend/app/services/token_utils.py` counts actual tokens (via `tiktoken` as an approximation — Groq doesn't expose GPT-OSS's exact tokenizer) and is the source of truth for rejecting oversized requests; `frontend/src/utils/tokenEstimator.js` mirrors this client-side just for instant feedback before submit.

## 8. Folder Structure
```
code-review-ai/
├── frontend/                      Vite + React + Tailwind
│   ├── index.html
│   ├── vite.config.js             (dev proxy → backend)
│   └── src/
│       ├── components/
│       │   ├── LanguageSelector.jsx
│       │   ├── CodeEditor.jsx     ← Monaco editor (paste-in only, no upload)
│       │   ├── DiffViewer.jsx     ← Monaco DiffEditor, side-by-side
│       │   ├── IssuesList.jsx / SeverityBadge.jsx
│       │   ├── CopyButton.jsx / Loader.jsx
│       │   └── Toast.jsx          ← rate-limit / error messages
│       ├── pages/ReviewPage.jsx
│       ├── hooks/useCodeReview.js
│       ├── api/reviewApi.js
│       └── utils/languageConfig.js, tokenEstimator.js, codeValidator.js
└── backend/                       FastAPI
    └── app/
        ├── main.py
        ├── api/routes/review.py   ← POST /review
        ├── core/config.py, prompts.py
        ├── services/groq_client.py, token_utils.py
        ├── models/schemas.py      ← Pydantic request/response
        └── utils/validators.py    ← language + line-count + "is this code" checks
```
_Note: `FileUpload.jsx` removed — paste-only, per Edge Cases decision._

## 9. Edge Case Decisions
1. **Malformed LLM output** → Mitigated primarily with a strict, well-specified system prompt (exact JSON schema, explicit "no markdown fences, no prose outside JSON" instruction, few-shot example) so the model doesn't drift. *(System prompt draft is the next open item — see below.)*
2. **File upload** → Not supported. Users can only paste code into the Monaco editor (VS Code–style canvas). Code is validated before sending to the LLM (non-empty, plausibly code, within line cap) so the LLM gets a clean input and produces a proper structured output. Multi-file upload question is therefore N/A.
3. — (n/a per above)
4. **Rate limit hit (429 from Groq)** → Backend surfaces the error; frontend shows a toast: "Rate limit reached, please try again in a moment." No auto-retry queue for v1.
5. **No code present** → "Review" button stays disabled/non-clickable until the editor has non-empty content.

## 10. Open Items / Next Steps
- Draft the system prompt (JSON schema: bugs, security_issues, performance_suggestions, rewritten_code, severity per issue) — ties into Edge Case #1
- Draft `POST /review` FastAPI endpoint implementation
- Decide "is this code" validation heuristic (edge case 2) — e.g. reject if it looks like plain prose
