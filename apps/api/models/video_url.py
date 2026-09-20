from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship

from config.db.base import BaseModel

if TYPE_CHECKING:
    from models.audio import Audio
    from models.transcription import Transcription


class VideoUrl(BaseModel, table=True):
    __tablename__ = "video_urls"

    id: Optional[int] = Field(default=None, primary_key=True)
    url: str = Field(unique=True, index=True)
    title: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    audios: list["Audio"] = Relationship(back_populates="video_url")
    transcriptions: list["Transcription"] = Relationship(back_populates="video_url")
