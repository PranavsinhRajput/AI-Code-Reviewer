import re

from app.core.config import MAX_LINES
from app.utils.languages import SUPPORTED_LANGUAGES

_CODE_SIGNALS = [
    re.compile(r"[{};]"),
    re.compile(r"\b(function|def|class|const|let|var)\b"),
    re.compile(r"^\s*(#|//|/\*)", re.MULTILINE),
    re.compile(r"=>|==|!=|&&|\|\|"),
]


def validate_language(language: str) -> tuple[bool, str | None]:
    if language not in SUPPORTED_LANGUAGES:
        return False, f"Unsupported language: {language}"
    return True, None


def validate_code(code: str) -> tuple[bool, str | None]:
    trimmed = code.strip()

    if not trimmed:
        return False, "Code is empty."

    if trimmed.count("\n") + 1 > MAX_LINES:
        return False, f"Code exceeds the {MAX_LINES}-line limit."

    if not any(p.search(trimmed) for p in _CODE_SIGNALS):
        return False, "Input doesn't look like code."

    return True, None