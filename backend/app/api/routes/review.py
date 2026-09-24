import json

from fastapi import APIRouter, HTTPException
from groq import RateLimitError

from app.models.schemas import ReviewRequest, ReviewResponse
from app.services.groq_client import get_review
from app.services.token_utils import within_budget
from app.utils.validators import validate_code, validate_language

router = APIRouter()


def _call_and_parse(code: str, language: str, retry: bool = False) -> dict:
    raw = get_review(code, language, retry=retry)
    return json.loads(raw)


@router.post("/review", response_model=ReviewResponse)
def review_code(payload: ReviewRequest):
    ok, reason = validate_language(payload.language)
    if not ok:
        raise HTTPException(status_code=400, detail=reason)

    ok, reason = validate_code(payload.code)
    if not ok:
        raise HTTPException(status_code=400, detail=reason)

    if not within_budget(payload.code, payload.language):
        raise HTTPException(status_code=400, detail="Code is too large for the free-tier token budget.")

    try:
        try:
            parsed = _call_and_parse(payload.code, payload.language)
        except json.JSONDecodeError:
            parsed = _call_and_parse(payload.code, payload.language, retry=True)
    except RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit reached. Try again shortly.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="Model returned malformed output. Please retry.")

    return ReviewResponse(**parsed) 