from fastapi import APIRouter, UploadFile, File
from app.services.document_service import upload_document
from app.models.schemas import SessionResponse

router = APIRouter()

@router.post("/upload", response_model=SessionResponse)
async def upload_document_endpoint(file: UploadFile = File(...)):
    return upload_document(file)