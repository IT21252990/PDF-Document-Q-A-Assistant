import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { FiFile } from "react-icons/fi";

import { Header } from "./components/Header";
import { QuestionInput } from "./components/QuestionInput";
import { ModelSelector } from "./components/ModelSelector";
import { EndSessionButton } from "./components/EndSessionButton";
import { HomePage } from "./pages/HomePage";
import { ChatPage } from "./pages/ChatPage";
import { useFileUpload } from "./hooks/useFileUpload";
import { useChat } from "./hooks/useChat";
import { useSession } from "./hooks/useSession";

function App() {
  const [question, setQuestion] = useState("");
  const [modelType, setModelType] = useState("langgraph");
  const [dragActive, setDragActive] = useState(false);
  
  const dropAreaRef = useRef(null);

  const {
    file,
    fileName,
    isUploading,
    uploadProgress,
    error,
    handleFileSelection,
    handleUpload,
  } = useFileUpload();

  const {
    messages,
    isProcessing,
    processingProgress,
    handleQuestionSubmit: handleChatQuestionSubmit,
    clearMessages
  } = useChat();

  const { sessionId, setSessionId, handleEndSession } = useSession({
    resetFile: () => {
      handleFileSelection(null);
      clearMessages();
    }
  });

  // Handle file drop events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelection(selectedFile);
    }
  };

  const handleUploadWithSession = async () => {
    const response = await handleUpload();
    if (response && response.session_id) {
      setSessionId(response.session_id); // Set sessionId
      Swal.fire({
        icon: 'success',
        title: 'Upload Complete',
        text: `PDF "${response.filename}" uploaded successfully !!!`,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        background: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
        color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
      });
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    await handleChatQuestionSubmit(question, sessionId, modelType);
    setQuestion("");
  };

  const handleModelChange = (e) => {
    setModelType(e.target.value);
  };

  const getMainContentHeight = () => {
    // Base height minus header (56px) and question input (72px)
    let height = 'calc(100vh - 128px)';
    
    // If session is active, subtract the session info bar height (approx 70px)
    if (sessionId) {
      height = 'calc(100vh - 198px)';
    }
    
    return height;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      {/* Session Info - Fixed below header when available */}
      {sessionId && (
        <div className="fixed top-14 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto py-2 px-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full shadow-md flex items-center justify-center">
                  <FiFile className="text-indigo-600 dark:text-indigo-300 h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{fileName}</p>
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask questions about this document</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <ModelSelector modelType={modelType} handleModelChange={handleModelChange} />
                <EndSessionButton handleEndSession={handleEndSession} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Grows to fill available space */}
      <main 
        className="flex-grow bg-white dark:bg-gray-800 overflow-hidden"
        style={{ 
          marginTop: sessionId ? '128px' : '56px',
          height: getMainContentHeight(),
          overflowY: 'auto'
        }}
      >
        <div className="h-full bg-white dark:bg-gray-800 flex flex-col">
          {!sessionId ? (
            <HomePage
              handleFileChange={handleFileChange}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              dragActive={dragActive}
              fileName={fileName}
              file={file}
              error={error}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              handleUpload={handleUploadWithSession}
            />
          ) : (
            <ChatPage
              messages={messages}
              isProcessing={isProcessing}
              processingProgress={processingProgress}
              modelType={modelType}
              question={question}
              setQuestion={setQuestion}
              handleQuestionSubmit={handleQuestionSubmit}
              sessionId={sessionId}
            />
          )}
        </div>
      </main>

      {/* Fixed Question Input at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <QuestionInput
          question={question}
          handleQuestionSubmit={handleQuestionSubmit}
          isProcessing={isProcessing}
          sessionId={sessionId}
          setQuestion={setQuestion}
        />
      </div>
    </div>
  );
}

export default App;