from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship

from config.db.base import BaseModel

if TYPE_CHECKING:
    from models.transcription import Transcription
    from models.video_url import VideoUrl


class Audio(BaseModel, table=True):
    __tablename__ = "audios"

    id: Optional[int] = Field(default=None, primary_key=True)
    file_path: str
    original_filename: Optional[str] = None
    content_hash: Optional[str] = Field(default=None, unique=True, index=True)
    duration_s: Optional[float] = None
    video_url_id: Optional[int] = Field(default=None, foreign_key="video_urls.id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    video_url: Optional["VideoUrl"] = Relationship(back_populates="audios")
    transcriptions: list["Transcription"] = Relationship(back_populates="audio")
