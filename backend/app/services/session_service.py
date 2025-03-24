import os
import shutil
from fastapi import HTTPException
from app.models.session import active_sessions

def delete_session(session_id: str):
    if session_id not in active_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session_info = active_sessions[session_id]
    
    if os.path.exists(session_info["file_path"]):
        os.remove(session_info["file_path"])
    if os.path.exists(session_info["vectorstore_path"]):
        shutil.rmtree(session_info["vectorstore_path"])
    
    del active_sessions[session_id]
    
    return {"message": "Session deleted successfully"}