from dotenv import load_dotenv
import os
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")
    UPLOAD_DIR: str = "uploaded_docs"
    VECTORSTORE_DIR: str = "vectorstores"

    class Config:
        env_file = ".env"

settings = Settings()