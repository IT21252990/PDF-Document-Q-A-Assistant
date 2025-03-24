from typing import List, Dict, Any, Annotated, TypedDict, Literal
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.documents import Document
from langgraph.graph import END, StateGraph
from langchain_google_genai import ChatGoogleGenerativeAI
import os

class DocumentQAState(TypedDict):
    question: str
    context: List[Document]
    messages: List[BaseMessage]
    next: Literal["retrieve", "generate_answer", "end"]

def retrieve(state: DocumentQAState, retriever):
    question = state["question"]
    docs = retriever.get_relevant_documents(question)
    return {
        "context": docs,
        "next": "generate_answer"
    }

def generate_answer(state: DocumentQAState, llm):
    question = state["question"]
    context = state["context"]
    context_str = "\n\n".join([doc.page_content for doc in context])
    messages = [
        HumanMessage(content=f"Context:\n{context_str}\n\nQuestion: {question}\n\nAnswer the question based only on the provided context.")
    ]
    response = llm.invoke(messages)
    updated_messages = state["messages"].copy()
    updated_messages.append(HumanMessage(content=question))
    updated_messages.append(AIMessage(content=response.content))
    return {
        "messages": updated_messages,
        "next": "end"
    }

def create_document_qa_graph(retriever, api_key: str = None):
    if api_key is None:
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set")
    
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)
    workflow = StateGraph(DocumentQAState)
    workflow.add_node("retrieve", lambda state: retrieve(state, retriever))
    workflow.add_node("generate_answer", lambda state: generate_answer(state, llm))
    workflow.add_edge("retrieve", "generate_answer")
    workflow.add_edge("generate_answer", END)
    workflow.set_entry_point("retrieve")
    return workflow.compile()