from typing import Literal, Optional
from pydantic import BaseModel


class ReviewRequest(BaseModel):
    code: str
    language: str


class Issue(BaseModel):
    category: Literal["bugs", "security_issues", "performance_suggestions"]
    severity: Literal["critical", "warning", "suggestion"]
    message: str
    line: Optional[int] = None


class ReviewResponse(BaseModel):
    issues: list[Issue]
    rewritten_code: str