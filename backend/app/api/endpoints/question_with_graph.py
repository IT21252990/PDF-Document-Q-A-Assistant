from fastapi import APIRouter, HTTPException
from app.models.schemas import QuestionRequest
from app.services.question_with_graph_service import ask_with_graph
from app.utils.logging_utils import logger

router = APIRouter()

@router.post("/ask_with_graph")
async def ask_with_graph_endpoint(request: QuestionRequest):
    try:
        return ask_with_graph(request.session_id, request.question)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error in ask_with_graph_endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")