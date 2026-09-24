import tiktoken

from app.core.config import MAX_REQUEST_TOKENS
from app.core.prompts import SYSTEM_PROMPT

# tiktoken is an approximation — Groq doesn't expose GPT-OSS's exact tokenizer,
# but this is close enough to gate requests against the free-tier TPM budget.
_encoding = tiktoken.get_encoding("cl100k_base")


def count_tokens(text: str) -> int:
    return len(_encoding.encode(text))


def estimate_request_tokens(code: str, language: str) -> int:
    prompt_tokens = count_tokens(SYSTEM_PROMPT) + count_tokens(f"Language: {language}\n\nCode:\n{code}")
    # rough output estimate: rewritten code (~1.1x input) + issues JSON overhead
    estimated_output = int(count_tokens(code) * 1.1) + 350
    return prompt_tokens + estimated_output


def within_budget(code: str, language: str) -> bool:
    return estimate_request_tokens(code, language) <= MAX_REQUEST_TOKENS