from fastapi.middleware.cors import CORSMiddleware
from app import app
from app.api.endpoints import document, question, session, question_with_graph

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(document.router, prefix="/api/v1/document", tags=["document"])
app.include_router(question.router, prefix="/api/v1/question", tags=["question"])
app.include_router(session.router, prefix="/api/v1/session", tags=["session"])
app.include_router(question_with_graph.router, prefix="/api/v1/question", tags=["question"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)