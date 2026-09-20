from sqlmodel import create_engine

from core.settings import DATABASE_URL

# check_same_thread=False: background jobs open their own sessions on worker threads
db_engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
