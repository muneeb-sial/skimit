from sqlmodel import Session
from config.db.engine import db_engine

def get_db_session():
    with Session(db_engine) as session:
        yield session