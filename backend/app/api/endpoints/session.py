from fastapi import APIRouter
from app.services.session_service import delete_session

router = APIRouter()

@router.delete("/session/{session_id}")
async def delete_session_endpoint(session_id: str):
    return delete_session(session_id)