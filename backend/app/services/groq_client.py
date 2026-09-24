from groq import Groq

from app.core.config import GROQ_API_KEY, MODEL_NAME, REASONING_EFFORT
from app.core.prompts import SYSTEM_PROMPT

client = Groq(api_key=GROQ_API_KEY)

_RETRY_NUDGE = (
    "\n\nYour previous response was not valid JSON matching the schema. "
    "Respond again with ONLY the valid JSON object — no markdown, no extra text."
)


def get_review(code: str, language: str, retry: bool = False) -> str:
    """Calls Groq and returns the raw JSON string response."""
    user_content = f"Language: {language}\n\nCode:\n{code}"
    if retry:
        user_content += _RETRY_NUDGE

    response = client.chat.completions.create(
        model=MODEL_NAME,
        reasoning_effort=REASONING_EFFORT,
        temperature=0.2,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_content},
        ],
    )
    return response.choices[0].message.content