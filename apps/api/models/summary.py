from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship

from config.db.base import BaseModel

if TYPE_CHECKING:
    from models.conversation import Conversation
    from models.transcription import Transcription


class Summary(BaseModel, table=True):
    __tablename__ = "summaries"

    id: Optional[int] = Field(default=None, primary_key=True)
    transcription_id: int = Field(foreign_key="transcriptions.id", unique=True)
    content: str
    llm_model: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    transcription: Optional["Transcription"] = Relationship(back_populates="summary")
    conversations: list["Conversation"] = Relationship(back_populates="summary")
