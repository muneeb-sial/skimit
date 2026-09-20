from datetime import datetime, timezone
from enum import Enum
from typing import TYPE_CHECKING, Any, Optional

from sqlalchemy import JSON, Column
from sqlmodel import Field, Relationship

from config.db.base import BaseModel

if TYPE_CHECKING:
    from models.audio import Audio
    from models.summary import Summary
    from models.video_url import VideoUrl


class SkimStatus(str, Enum):
    PENDING = "pending"
    DOWNLOADING = "downloading"
    TRANSCRIBING = "transcribing"
    SUMMARIZING = "summarizing"
    DONE = "done"
    FAILED = "failed"


class Transcription(BaseModel, table=True):
    __tablename__ = "transcriptions"

    id: Optional[int] = Field(default=None, primary_key=True)
    status: SkimStatus = Field(default=SkimStatus.PENDING, index=True)
    error: Optional[str] = None
    language: Optional[str] = None
    text: Optional[str] = None
    segments: Optional[list[dict[str, Any]]] = Field(default=None, sa_column=Column(JSON))
    whisper_model: Optional[str] = None
    audio_id: Optional[int] = Field(default=None, foreign_key="audios.id")
    video_url_id: Optional[int] = Field(default=None, foreign_key="video_urls.id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    audio: Optional["Audio"] = Relationship(back_populates="transcriptions")
    video_url: Optional["VideoUrl"] = Relationship(back_populates="transcriptions")
    summary: Optional["Summary"] = Relationship(back_populates="transcription")
