from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship

from config.db.base import BaseModel

if TYPE_CHECKING:
    from models.message import Message
    from models.summary import Summary


class Conversation(BaseModel, table=True):
    __tablename__ = "conversations"

    id: Optional[int] = Field(default=None, primary_key=True)
    summary_id: int = Field(foreign_key="summaries.id", index=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    summary: Optional["Summary"] = Relationship(back_populates="conversations")
    messages: list["Message"] = Relationship(back_populates="conversation")
