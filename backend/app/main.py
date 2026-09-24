from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.review import router as review_router

app = FastAPI(title="AI Code Review API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(review_router, prefix="/api")