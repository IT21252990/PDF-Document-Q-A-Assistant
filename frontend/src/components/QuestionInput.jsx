import { FiSend } from "react-icons/fi";

export const QuestionInput = ({ question, setQuestion, handleQuestionSubmit, sessionId, isProcessing }) => {
  return (
    <form onSubmit={handleQuestionSubmit} className="fixed bottom-0 left-0 right-0 py-2 mx-5 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={!sessionId || isProcessing}
            placeholder={
              sessionId
                ? "Ask a question..."
                : "Upload a document first"
            }
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
          />
          <button
            type="submit"
            disabled={!sessionId || !question.trim() || isProcessing}
            className="inline-flex items-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
          >
            <FiSend className="mr-2" /> Send
          </button>
        </div>
      </div>
      <div className="text-center mt-1 text-[10px] text-gray-500">
        <p>PDF Document Q&A Assistant • Get insights from your documents in seconds</p>
      </div>
    </form>
  );
};