from fastapi import APIRouter
from app.services.question_service import ask_question
from app.models.schemas import QuestionRequest

router = APIRouter()

@router.post("/ask")
async def ask_question_endpoint(request: QuestionRequest):
    return ask_question(request.session_id, request.question)