import { Chat } from "../components/Chat";

export const ChatPage = ({
  messages,
  isProcessing,
  processingProgress,
  modelType,
  question,
  setQuestion,
  handleQuestionSubmit,
  sessionId
}) => {
  return (
    <>
      <Chat
        messages={messages}
        isProcessing={isProcessing}
        processingProgress={processingProgress}
        modelType={modelType}
      />
    </>
  );
};