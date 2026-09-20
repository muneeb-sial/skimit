from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship

from config.db.base import BaseModel

if TYPE_CHECKING:
    from models.conversation import Conversation


class Message(BaseModel, table=True):
    __tablename__ = "messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversations.id", index=True)
    role: str  # "user" | "assistant"
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    conversation: Optional["Conversation"] = Relationship(back_populates="messages")
