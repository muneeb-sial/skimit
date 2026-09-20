from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel

from models.transcription import SkimStatus, Transcription


class SkimRead(BaseModel):
    id: int
    status: SkimStatus
    error: Optional[str] = None
    source_url: Optional[str] = None
    title: Optional[str] = None
    language: Optional[str] = None
    transcript: Optional[str] = None
    segments: Optional[list[dict[str, Any]]] = None
    summary: Optional[str] = None
    created_at: datetime

    @classmethod
    def from_transcription(cls, t: Transcription, *, detail: bool = True) -> "SkimRead":
        if t.video_url:
            title = t.video_url.title
        else:
            title = t.audio.original_filename if t.audio else None
        return cls(
            id=t.id,
            status=t.status,
            error=t.error,
            source_url=t.video_url.url if t.video_url else None,
            title=title,
            language=t.language,
            transcript=t.text if detail else None,
            segments=t.segments if detail else None,
            summary=t.summary.content if detail and t.summary else None,
            created_at=t.created_at,
        )
