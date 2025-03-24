import { FiFile, FiCheckCircle, FiChevronDown, FiCopy, FiBook, FiList, FiStar, FiHelpCircle, FiCheck } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/chatBubble.png";

export const Chat = ({ messages, isProcessing, processingProgress, modelType, sessionId }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [copiedIndices, setCopiedIndices] = useState({});
  
  useEffect(() => {
    const styleId = "custom-scrollbar-styles";
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.innerHTML = `
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(129, 140, 248, 0.5) transparent;
        }

        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 8px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: rgba(129, 140, 248, 0.5);
          border-radius: 8px;
          border: 2px solid transparent;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background-color: rgba(99, 102, 241, 0.7);
        }

        .dark .scrollbar-custom {
          scrollbar-color: rgba(99, 102, 241, 0.5) rgba(17, 24, 39, 0.3);
        }

        .dark .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.3);
        }

        .dark .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.5);
        }

        .dark .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background-color: rgba(129, 140, 248, 0.7);
        }
        
        .question-card:hover .copy-button {
          opacity: 1;
        }
        
        .welcome-card {
          animation: fadeIn 0.5s ease-out, floatUp 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes floatUp {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        
        .question-card {
          transition: all 0.2s ease-out;
        }
        
        .question-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }
        
        .copy-indicator {
          animation: fadeOut 1.5s forwards;
          animation-delay: 1.5s;
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    // Clean up on component unmount
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  // Scroll to bottom when messages change or when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll events to show/hide the scroll button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Show button when not at bottom (with a small threshold)
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollButton(!isAtBottom);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      // Set copied status for this index
      setCopiedIndices(prev => ({ ...prev, [index]: true }));
      
      // Reset copied status after 3 seconds
      setTimeout(() => {
        setCopiedIndices(prev => ({ ...prev, [index]: false }));
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  // Sample questions for any PDF document
  const sampleQuestions = [
    {
      text: "Summarize the main points of this document",
      icon: <FiBook className="text-indigo-500" />
    },
    {
      text: "What are the key findings or conclusions in this document?",
      icon: <FiStar className="text-amber-500" />
    },
    {
      text: "Identify and explain the most important concepts in this document",
      icon: <FiHelpCircle className="text-emerald-500" />
    },
    {
      text: "Extract all tables and lists from this document",
      icon: <FiList className="text-purple-500" />
    }
  ];

  return (
    <div className="flex-1 mx-5 h-full pb-20 relative">
      <div className="h-full bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div 
          ref={containerRef}
          className="h-full overflow-y-auto p-4 scrollbar-custom"
        >
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="welcome-card text-center py-3 flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-indigo-100 dark:border-indigo-900">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 p-2 rounded-full mb-4 shadow-inner">
                  <img src={logo} className="w-14"/>
                </div>
                <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-1">Your Document is Ready!</h2>
                <p className="text-sm mt-1 max-w-md text-gray-600 dark:text-gray-400">
                  Start a conversation with your document by asking one of these questions:
                </p>
                
                <div className="mt-5 space-y-3 w-full max-w-5xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {sampleQuestions.map((question, index) => (
                    <div 
                      key={index}
                      className="question-card group relative bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-200 flex items-center"
                      onClick={() => copyToClipboard(question.text, index)}
                    >
                      <div className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 mr-3">
                        {question.icon}
                      </div>
                      <span>{question.text}</span>
                      <div 
                        className="absolute right-3 transition-all duration-200"
                      >
                        {copiedIndices[index] ? (
                          <div className="flex items-center copy-indicator bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 text-xs rounded-full">
                            <FiCheck className="h-3 w-3 mr-1" />
                            Copied!
                          </div>
                        ) : (
                          <button 
                            className="copy-button opacity-0 hover:bg-gray-100 dark:hover:bg-gray-600 p-1.5 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(question.text, index);
                            }}
                            aria-label="Copy question"
                          >
                            <FiCopy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
                
                <p className="text-xs mt-6 text-gray-500 dark:text-gray-500">
                  Click on any question to copy it, then paste it in the input field below
                </p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-sm transition-all duration-200 animate-fade-in ${
                  message.role === "user"
                    ? "bg-indigo-100 dark:bg-indigo-900/40 ml-72 border-l-4 border-indigo-400 dark:border-indigo-600"
                    : message.role === "assistant"
                    ? "bg-white dark:bg-gray-800 mr-72 border border-gray-200 dark:border-gray-700 hover:shadow-md"
                    : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-center text-sm border border-green-100 dark:border-green-800 max-w-lg mx-auto"
                }`}
              >
                <div className="flex items-start">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-indigo-200 dark:bg-indigo-700"
                      : message.role === "assistant"
                      ? "bg-purple-100 dark:bg-purple-800"
                      : "bg-green-100 dark:bg-green-800"
                  }`}>
                    {message.role === "user" ? (
                      <span className="text-indigo-700 dark:text-indigo-200 font-medium">U</span>
                    ) : message.role === "assistant" ? (
                      <span className="text-purple-700 dark:text-purple-200 font-medium">AI</span>
                    ) : (
                      <FiCheckCircle className="text-green-700 dark:text-green-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium mb-1 ${
                      message.role === "user"
                        ? "text-indigo-700 dark:text-indigo-300"
                        : message.role === "assistant"
                        ? "text-purple-700 dark:text-purple-300"
                        : "text-green-700 dark:text-green-300"
                    }`}>
                      {message.role === "user"
                        ? "You"
                        : message.role === "assistant"
                        ? "AI Assistant"
                        : "System"}
                    </p>
                    <p className={`text-sm ${
                      message.role === "user"
                        ? "text-indigo-900 dark:text-indigo-100"
                        : message.role === "assistant"
                        ? "text-gray-700 dark:text-gray-200"
                        : "text-green-800 dark:text-green-200"
                    }`}>{message.content}</p>
                  </div>
                </div>

                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                      <FiFile className="mr-1" /> Sources:
                    </p>
                    <ul className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg">
                      {message.sources.map((source, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 rounded-full h-4 w-4 inline-flex items-center justify-center text-xs mr-2 mt-0.5">
                            {idx + 1}
                          </span>
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mr-12 border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="flex items-start">
                  <div className="rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0 bg-purple-100 dark:bg-purple-800">
                    <span className="text-purple-700 dark:text-purple-200 font-medium">AI</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1 text-purple-700 dark:text-purple-300">AI Assistant</p>
                    <div className="flex items-center space-x-2">
                      <div className="bg-indigo-100 dark:bg-indigo-800 rounded-full p-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-indigo-400 dark:bg-indigo-300 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Analyzing document using {modelType === "langgraph" ? "LangGraph workflow" : "Standard chain"}...
                        <span className="ml-2 font-medium text-indigo-600 dark:text-indigo-400">{processingProgress.toFixed(0)}%</span>
                      </p>
                    </div>
                    {/* Processing progress bar */}
                    <div className="w-full mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-200"
                        style={{ width: `${processingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible element at the end to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 animate-fade-in flex items-center justify-center"
          aria-label="Scroll to bottom"
        >
          <FiChevronDown size={20} />
        </button>
      )}
    </div>
  );
};