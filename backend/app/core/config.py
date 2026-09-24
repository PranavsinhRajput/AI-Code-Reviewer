import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "openai/gpt-oss-120b")
MAX_LINES = int(os.getenv("MAX_LINES", 150))

# Free-tier budget guardrails (see project.md §7)
MAX_REQUEST_TOKENS = 6500   # input + expected output, leaves buffer under 8,000 TPM
REASONING_EFFORT = "low"    # keep gpt-oss's hidden reasoning tokens down