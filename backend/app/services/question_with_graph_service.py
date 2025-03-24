from fastapi import HTTPException
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from app.core.config import settings
from app.models.session import active_sessions
from app.graph.graph import create_document_qa_graph, DocumentQAState
from app.utils.logging_utils import logger

def ask_with_graph(session_id: str, question: str):
    if session_id not in active_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session_info = active_sessions[session_id]
    
    try:
        # Load the vector store
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vectorstore = FAISS.load_local(session_info["vectorstore_path"], embeddings, allow_dangerous_deserialization=True)
        retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
        
        # Create the graph
        graph = create_document_qa_graph(retriever)
        
        # Initialize state
        initial_state: DocumentQAState = {
            "question": question,
            "context": [],
            "messages": [],
            "next": "retrieve"
        }
        
        logger.info("Executing LangGraph workflow...")
        # Execute the graph
        result = graph.invoke(initial_state)
        
        # Get the last AI message
        if result["messages"] and len(result["messages"]) > 0:
            last_message = result["messages"][-1].content
        else:
            last_message = "No answer was generated. Please try again with a different question."
        
        logger.info("Successfully processed question with LangGraph")
        
        # Return answer and message history
        return {
            "answer": last_message,
            "source_documents": [doc.page_content[:200] + "..." for doc in result["context"][:3]] if "context" in result else [],
            "message_history": [{"role": msg.type, "content": msg.content} for msg in result["messages"]] if "messages" in result else []
        }
    
    except Exception as e:
        logger.error(f"Error in ask_with_graph: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")