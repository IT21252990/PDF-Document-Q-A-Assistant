import { useState } from "react";
import { askQuestion } from "../services/chatService";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState("");

  const handleQuestionSubmit = async (question, sessionId, modelType) => {
    if (!question.trim() || !sessionId) return;

    // Add user question to messages
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setIsProcessing(true);
    setProcessingProgress(5); // Start progress tracking

    try {
      const response = await askQuestion(sessionId, question, modelType);

      // Add AI response to messages
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          sources: response.source_documents,
        },
      ]);
      
      // Complete the progress
      setProcessingProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
      }, 300);
    } catch (err) {
      setError(err.response?.data?.detail || "Error processing question");
      console.error(err);
      setIsProcessing(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isProcessing,
    processingProgress,
    error,
    handleQuestionSubmit,
    clearMessages 
  };
};