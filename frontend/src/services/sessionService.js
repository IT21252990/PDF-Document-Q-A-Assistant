import api from "./api";

export const endSession = async (sessionId) => {
  const response = await api.delete(`/session/session/${sessionId}`);
  return response.data;
};