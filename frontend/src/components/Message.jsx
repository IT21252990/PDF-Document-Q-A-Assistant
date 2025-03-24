import { FiFile } from "react-icons/fi";

export const Message = ({ role, content, sources }) => {
  return (
    <div className={`p-4 rounded-xl shadow-sm transition-all duration-200 animate-fade-in ${
      role === "user"
        ? "bg-indigo-100 dark:bg-indigo-900/40 ml-12 border-l-4 border-indigo-400 dark:border-indigo-600"
        : role === "assistant"
        ? "bg-white dark:bg-gray-800 mr-12 border border-gray-200 dark:border-gray-700 hover:shadow-md"
        : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-center text-sm border border-green-100 dark:border-green-800 max-w-lg mx-auto"
    }`}>
      <div className="flex items-start">
        <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0 ${
          role === "user"
            ? "bg-indigo-200 dark:bg-indigo-700"
            : role === "assistant"
            ? "bg-purple-100 dark:bg-purple-800"
            : "bg-green-100 dark:bg-green-800"
        }`}>
          {role === "user" ? (
            <span className="text-indigo-700 dark:text-indigo-200 font-medium">U</span>
          ) : role === "assistant" ? (
            <span className="text-purple-700 dark:text-purple-200 font-medium">AI</span>
          ) : (
            <FiCheckCircle className="text-green-700 dark:text-green-300" />
          )}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium mb-1 ${
            role === "user"
              ? "text-indigo-700 dark:text-indigo-300"
              : role === "assistant"
              ? "text-purple-700 dark:text-purple-300"
              : "text-green-700 dark:text-green-300"
          }`}>
            {role === "user"
              ? "You"
              : role === "assistant"
              ? "AI Assistant"
              : "System"}
          </p>
          <p className={`text-sm ${
            role === "user"
              ? "text-indigo-900 dark:text-indigo-100"
              : role === "assistant"
              ? "text-gray-700 dark:text-gray-200"
              : "text-green-800 dark:text-green-200"
          }`}>{content}</p>
        </div>
      </div>

      {sources && sources.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
            <FiFile className="mr-1" /> Sources:
          </p>
          <ul className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg">
            {sources.map((source, idx) => (
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
  );
};