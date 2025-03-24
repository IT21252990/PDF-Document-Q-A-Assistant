from pydantic import BaseModel

class QuestionRequest(BaseModel):
    session_id: str
    question: str

class SessionResponse(BaseModel):
    session_id: str
    filename: str