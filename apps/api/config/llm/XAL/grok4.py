from langchain_groq import ChatGroq

from core.settings import LLM_MODEL, get_env

llm = ChatGroq(
    model=LLM_MODEL,
    api_key=get_env("AI_API_KEY"),
    temperature=0,
)
