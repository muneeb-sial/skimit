from sqlmodel import SQLModel

from config.db.engine import db_engine
from models import audio, conversation, message, summary, transcription, video_url  # noqa: F401  (register tables)


def init_db() -> None:
    SQLModel.metadata.create_all(db_engine)
