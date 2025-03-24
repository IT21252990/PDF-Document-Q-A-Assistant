import api from "./api";

export const askQuestion = async (sessionId, question, modelType) => {
  const endpoint = modelType === "langgraph" ? "/question/ask_with_graph" : "/question/ask";

  const response = await api.post(endpoint, {
    session_id: sessionId,
    question: question,
  });

  return response.data;
};