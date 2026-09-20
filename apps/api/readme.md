# Skimit API

```
uv sync
uv run python app.py        # or: uvicorn app:app --reload --port 5000
```

Layout: `routes/` (HTTP) -> `services/` (logic) -> `models/` (tables), `schemas/` (request/response DTOs).
Requires `ffmpeg` on PATH and `AI_API_KEY` in `.env`. Optional env: `WHISPER_MODEL`, `WHISPER_DEVICE`, `WHISPER_COMPUTE_TYPE`, `LLM_MODEL`, `DATABASE_URL`.
